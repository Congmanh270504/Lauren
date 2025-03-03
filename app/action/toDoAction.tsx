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
  console.log(productsImages);
  if (!productName.trim()) {
    return;
  }
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
