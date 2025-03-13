"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/utils/prisma";
import { object } from "zod";
import { ObjectId } from "mongodb";
import { PrismaClient } from "@prisma/client";

interface Data {
  categoryName: string;
  categoryId?: string;
}

export async function createCategory(data: Data) {
  const { categoryName } = data;
  if (!categoryName.trim()) {
    return { ok: false, message: "Category name is required" };
  }
  try {
    const existingCategory = await prisma.category.findFirst({
      where: {
        categoryName: categoryName,
      },
    });
    console.log(existingCategory);

    if (existingCategory !== null) {
      return { ok: false, message: "Category name already exists" };
    }

    // Create the new category
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
export async function deleteCategory(categoryId: string) {
  if (!categoryId) {
    return { ok: false, message: "Category ID is required" };
  }
  try {
    const category = await prisma.category.delete({
      where: {
        id: categoryId,
      },
    });
    revalidatePath("/");
    return { ok: true, message: "Category deleted successfully" };
  } catch (error) {
    console.error("Error deleting category:", error);
    return { ok: false, message: "Failed to delete category" };
  }
}
