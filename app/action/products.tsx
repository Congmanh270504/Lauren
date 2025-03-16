"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/utils/prisma";
import { object } from "zod";
import { ObjectId } from "mongodb";
interface Data {
  productName: string;
  price: number;
  categoryId: string;
}
export async function createProduct(data: Data, productsImages: string[]) {
  const { productName, price, categoryId } = data;
  console.log(productName, price, categoryId);
  if (!productName.trim()) {
    return { ok: false, message: "Product name is required" };
  }
  try {
    const product = await prisma.products.create({
      data: {
        productName: productName,
        price: price,
        categoryId: categoryId,
        img: {
          create: productsImages.map((url) => ({
            url,
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
export async function deleteProduct(formData: FormData) {
  try {
    const productName = formData.get("productName") as string;
    if (!productName.trim()) {
      return;
    }
    await prisma.image.deleteMany({
      where: {
        Products: {
          productName: productName,
        },
      },
    });
    await prisma.products.delete({
      where: {
        productName: productName,
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
    await prisma.image.deleteMany({
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
        img: {
          create: productsImages.map((url) => ({
            url,
          })),
        },
      },
    });
    return { ok: true, message: "Product updated successfully" };
  } catch (error) {
    return { ok: false, message: "Failed to update product" };
  }
}
