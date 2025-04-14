"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/utils/prisma";
import { array, object } from "zod";
import { ObjectId } from "mongodb";
import { imagesTpye } from "@/types/itemTypes";
import { productType } from "@/types/itemTypes";
import { pinata } from "@/utils/config";
import { console } from "inspector";

interface dataType {
  productName: string;
  price: number;
  categoryId: string;
  productsImages: string[];
}
export async function getProducts() {
  try {
    const products = await prisma.products.findMany({
      include: {
        img: true,
        Category: true,
      },
    });
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
export async function createProduct(data: dataType) {
  if (!data.productName.trim()) {
    return { ok: false, message: "Product name is required" };
  }
  try {
    const product = await prisma.products.create({
      data: {
        productName: data.productName,
        price: data.price,
        categoryId: data.categoryId, // updated
        img: {
          create: data.productsImages.map((cid) => ({
            url: cid,
          })),
        },
      },
    });
    return { ok: true, message: "Product created successfully" };
  } catch (error) {
    console.error("Error creating product:", error);
    return { ok: false, message: "Failed to create product" };
  }
}
export async function deleteAllProduct(
  products: {
    id: string;
    checked: boolean;
  }[]
) {
  try {
    if (!products) {
      return;
    }
    // store images in array 2d
    const selectImages = await Promise.all(
      products.map(async (product) => {
        const images = await prisma.images.findMany({
          where: {
            productId: new ObjectId(product.id).toString(),
          },
        });
        return images.length > 0 ? images : null; // Return null if no images are found
      })
    ).then((results) => results.filter((images) => images !== null)); // Filter out null values

    // deleteMany image with productId
    products.map(async (product) => {
      await prisma.products.deleteMany({
        where: {
          id: new ObjectId(product.id).toString(),
        },
      });
    });

    // deleteMany product with productId
    selectImages.map(async (img) => {
      if (img && img[0]) {
        await prisma.images.deleteMany({
          where: {
            productId: new ObjectId(img[0].productId).toString(),
          },
        });
      }
    });

    const cidImages = selectImages.flat().map((url) => url.url);
    const deleteFilesPinata = await Promise.all(
      cidImages.map(async (cid) => {
        const files = await pinata.files.private.list().cid(cid);
        return files.files[0].id;
      })
    );
    await pinata.files.private.delete(deleteFilesPinata);
    // revalidatePath("/");
    return { ok: true, message: "Product deleted successfully" };
  } catch (error) {
    return { ok: false, message: "Failed to delete product" };
  }
}
export async function updateProduct(
  formData: FormData,
  productsImages: string[] = [],
  id: string
) {
  const productName = formData.get("productName") as string;
  const price = parseFloat(formData.get("price") as string);
  const categoryId = formData.get("categoryId") as string;
  console.log(productName, price, categoryId);

  if (!productName.trim()) {
    return { ok: false, message: "Product name is required" };
  }
  try {
    await prisma.images.deleteMany({
      where: {
        productId: new ObjectId(id).toString(),
      },
    });

    await prisma.products.update({
      where: {
        id: new ObjectId(id).toString(),
      },
      data: {
        productName: productName,
        price: price,
        categoryId: categoryId,
        // img: {
        //   create: productsImages.map((url) => ({ // bug here
        //     cid: url,
        //   })),
        // },
      },
    });
    return { ok: true, message: "Product updated successfully" };
  } catch (error) {
    return { ok: false, message: "Failed to update product" };
  }
}
export async function getAllProductsImages() {
  try {
    const products = await prisma.products.findMany({
      include: {
        img: true,
        Category: true,
      },
    });
    if (!products || products.length === 0) {
      return [];
    }
    // Map through the products and extract the first image URL for each product
    const images = await Promise.all(
      products.map(async (product) => {
        if (product.img && product.img.length > 0) {
          const firstImage = product.img[0];
          const url = await pinata.gateways.private.createAccessLink({
            cid: firstImage.url || "",
            expires: 30,
          });
          return { id: product.id, url: url };
        }
        return null; // Return null if no image is found
      })
    );

    // Filter out null values
    const validImages = images.filter((image) => image !== null);
    return validImages;
  } catch (error) {
    console.error("Error getting product images:", error);
    return [];
  }
}
export async function getProductImages(productsId: string | undefined) {
  if (productsId === undefined) {
    return null;
  }
  try {
    const images = await prisma.images.findFirst({
      where: {
        productId: new ObjectId(productsId).toString(),
      },
    });
    if (!images) {
      return null;
    }
    const imageUrl = await pinata.gateways.private.createAccessLink({
      cid: images.url,
      expires: 30,
    });
    return imageUrl;
  } catch (error) {
    console.error("Error getting product images:", error);
    return null;
  }
}
