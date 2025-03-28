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

export async function getData() {
  try {
    const categories = await prisma.categories.findMany();
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function createCategory(data: Data) {
  const { categoryName } = data;
  if (!categoryName.trim()) {
    return { ok: false, message: "Category name is required" };
  }
  try {
    const existingCategory = await prisma.categories.findFirst({
      where: {
        categoryName: categoryName,
      },
    });
    console.log(existingCategory);

    if (existingCategory !== null) {
      return { ok: false, message: "Category name already exists" };
    }

    // Create the new category
    const category = await prisma.categories.create({
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
    const existingCategory = await prisma.categories.findUnique({
      where: {
        id: new ObjectId(categoryId).toString(),
      },
      include: {
        Products: true,
      },
    });
    if (existingCategory) {
      return { ok: false, message: "Still have products in category" };
    }
    const category = await prisma.categories.delete({
      where: {
        id: new ObjectId(categoryId).toString(),
      },
    });
    revalidatePath("/");
    return { ok: true, message: "Category deleted successfully" };
  } catch (error) {
    console.error("Error deleting category:", error);
    return { ok: false, message: "Failed to delete category" };
  }
}
export async function updateCategory(id: string, data: Data) {
  const { categoryName } = data;
  if (!categoryName.trim()) {
    return { ok: false, message: "Category name is required" };
  }
  try {
    const existingCategory = await prisma.categories.findFirst({
      where: {
        categoryName: categoryName,
      },
    });
    if (existingCategory !== null) {
      return { ok: false, message: "Category name already exists" };
    }
    const category = await prisma.categories.update({
      where: {
        id: new ObjectId(id).toString(),
      },
      data: {
        categoryName: categoryName,
      },
    });
    revalidatePath("/");
    return { ok: true, message: "Category updated successfully" };
  } catch (error) {
    console.error("Error updating category:", error);
    return { ok: false, message: "Failed to update category" };
  }
}
