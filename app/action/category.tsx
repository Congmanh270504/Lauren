"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/utils/prisma";
import { object } from "zod";
import { ObjectId } from "mongodb";
interface Data {
  categoryName: string;
  categoryId?: string;
}
export async function createCategory(data: Data) {
  const { categoryName } = data;
  console.log(categoryName);
  if (!categoryName.trim()) {
    return { ok: false, message: "Category name is required" };
  }
  try {
    const category = await prisma.category.create({
      data: {
        categoryName: categoryName,
      },
    });
    revalidatePath("/");
    return { ok: true, message: "Category created successfully" };
  } catch (error) {
    console.error("Error creating category:", error);
    return { ok: false, message: "Failed to create category" };
  }
}
