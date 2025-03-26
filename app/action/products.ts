"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/utils/prisma";
import { array, object } from "zod";
import { ObjectId } from "mongodb";
import { imagesTpye } from "@/types/itemTypes";
import { productType } from "@/types/itemTypes";
import { pinata } from "@/utils/config";

interface dataType {
  productName: string;
  price: number;
  categoryId: string;
  productsImages: string[];
}
export async function createProduct(data: dataType) {
  if (!data.productName.trim()) {
    return { ok: false, message: "Product name is required" };
  }
  console.log("fadfasdf");
  try {
    const product = await prisma.products.create({
      data: {
        productName: data.productName,
        price: data.price,
        categoryId: data.categoryId, // updated
        img: {
          create: data.productsImages.map((img) => ({
            url: img,
          })),
        },
      },
    });
    revalidatePath("/");
    return { ok: true, message: "Product created successfully" };
  } catch (error) {
    console.error("Error creating product:", error);
    return { ok: false, message: "Failed to create product" };
  }
}
export async function deleteProduct(id: string) {
  try {
    if (!id.trim()) {
      return;
    }
    await prisma.images.deleteMany({
      where: {
        productId: new ObjectId(id).toString(),
      },
    });
    await prisma.products.delete({
      where: {
        id: new ObjectId(id).toString(),
      },
    });
    revalidatePath("/");
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
export async function getProductsImages(products: productType[]) {
  if (!products || products.length === 0) {
    return { ok: false, message: "No products found" };
  }
  try {
    // Map through the products and extract the first image URL for each product
    const images = await Promise.all(
      products.map(async (product) => {
        if (product.img && product.img.length > 0) {
          const firstImage = product.img[0];
          const url = await pinata.gateways.private.createAccessLink({
            cid: firstImage.url || "",
            expires: 30,
          });
          return url;
        }
        return null; // Return null if no images are available
      })
    );

    // Filter out null values
    const validImages = images.filter((url) => url !== null) as string[];

    return { ok: true, images: validImages };
  } catch (error) {
    console.error("Error getting product images:", error);
    return { ok: false, message: "Failed to get product images" };
  }
}
