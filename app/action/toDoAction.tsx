"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/utils/prisma";
export async function createProduct(
  formData: FormData,
  productsImages: string[]
) {
  const productName = formData.get("productName") as string;
  const price = parseFloat(formData.get("price") as string);
  const categoryId = parseInt(formData.get("categoryId") as string, 10);
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
    return { success: true, message: "Product deleted successfully" };
  } catch (error) {
    return { success: false, message: "Failed to delete product" };
  }
}
export async function updateProduct(
  formData: FormData,
  productsImages: string[]
) {
  const productName = formData.get("productName") as string;
  const price = parseFloat(formData.get("price") as string);
  const categoryId = parseInt(formData.get("categoryId") as string, 10);
  if (!productName.trim()) {
    return;
  }
  await prisma.products.update({
    where: {
      productName: productName,
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
}
