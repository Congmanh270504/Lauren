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
    const isExist = await prisma.products.findFirst({
      where: {
        productName: data.productName,
      },
    });
    if (isExist) {
      return { ok: false, message: "Product name already exists" };
    }

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
    products.map(async (prod) => {
      await prisma.images.deleteMany({
        where: {
          productId: new ObjectId(prod.id).toString(),
        },
      });
    });

    // deleteMany product with productId
    products.map(async (product) => {
      await prisma.products.delete({
        where: {
          id: new ObjectId(product.id).toString(),
        },
      });
    });

    const cidImages = selectImages.flat().map((url) => url.url);
    // const deleteFilesPinata = await Promise.all(
    //   cidImages.map(async (cid) => {
    //     const files = await pinata.files.private.list().cid(cid);
    //     return files.files[0].id;
    //   })
    // );
    // await pinata.files.private.delete(deleteFilesPinata);
    const deleteFilesPinata = await Promise.all(
      cidImages.map(async (cid) => {
        try {
          const files = await pinata.files.private.list().cid(cid);
          if (files.files.length > 0) {
            return files.files[0].id; // Return the file ID if it exists
          } else {
            console.warn(`File with CID ${cid} does not exist.`);
            return null; // Skip deletion if the file doesn't exist
          }
        } catch (error) {
          console.error(`Error checking file with CID ${cid}:`, error);
          return null; // Skip deletion if there's an error
        }
      })
    );

    // Filter out null values before deletion
    const validFileIds = deleteFilesPinata.filter((id) => id !== null);
    if (validFileIds.length > 0) {
      await pinata.files.private.delete(validFileIds);
    }
    return {
      ok: true,
      message: "Product deleted successfully",
    };
  } catch (error) {
    return { ok: false, message: "Failed to delete product" };
  }
}
export async function updateProduct(data: dataType, productId: string) {
  if (!data) {
    return { ok: false, message: "Invalid product" };
  }
  try {
    const isExist = await prisma.products.findFirst({
      where: {
        productName: data.productName,
        AND: {
          id: {
            not: new ObjectId(productId).toString(),
          },
        },
      },
    });
    if (isExist) {
      return { ok: false, message: "Product name already exists" };
    }

    // Delete old images if any
    const oldImages = await prisma.images.findMany({
      where: {
        productId: new ObjectId(productId).toString(),
      },
    });

    if (oldImages.length > 0) {
      const deleteImages = await Promise.all(
        oldImages.map(async () => {
          await prisma.images.deleteMany({
            where: {
              productId: new ObjectId(productId).toString(),
            },
          });
        })
      );
      if (!deleteImages) {
        return { ok: false, message: "Failed to delete old images" };
      }
    }

    const product = await prisma.products.update({
      where: {
        id: new ObjectId(productId).toString(),
      },
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
    if (!product) {
      return { ok: false, message: "Failed create product" };
    }

    await Promise.all(
      oldImages.map(async (image) => {
        const countImagesWithSameOldImagesUrl = await prisma.images.count({
          where: {
            url: image.url,
            AND: {
              productId: {
                not: image.productId,
              },
            },
          },
        });
        if (countImagesWithSameOldImagesUrl === 0) {
          const files = await pinata.files.private.list().cid(image.url);
          await pinata.files.private.delete([files.files[0].id]);
        }
      })
    );

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
export async function getProductImages(productsId: string) {
  if (!productsId) {
    return null;
  }
  try {
    const imagesProduct = await prisma.images.findMany({
      where: {
        productId: new ObjectId(productsId).toString(),
      },
    });
    if (!imagesProduct) {
      return null;
    }

    const imageUrl = await Promise.all(
      imagesProduct.map(async (images) => {
        let url = await pinata.gateways.private.createAccessLink({
          cid: images.url,
          expires: 30,
        });
        let file = await pinata.files.private.list().cid(images.url);
        return {
          file: file,
          url: url,
        };
      })
    );
    return imageUrl;
  } catch (error) {
    console.error("Error getting product images:", error);
    return null;
  }
}
