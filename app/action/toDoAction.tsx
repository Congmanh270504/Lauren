"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/utils/prisma";

export async function create(formData: FormData) {
  const productName = formData.get("productName") as string;
  const price = parseFloat(formData.get("price") as string);
  const categoryId = parseInt(formData.get("categoryId") as string, 10);
  const productsImages = formData.getAll("productsImages").map((image) => ({ url: image as string }));//bug 
  if (!productName.trim()) {
    return;
  }

  await prisma.products.create({
    data: {
      productName: productName,
      price: price,
      categoryId: categoryId,
      img: {
        create: productsImages,
      },
    },
  });

  revalidatePath("/");
}

// export async function edit(formData: FormData) {
//   const input = formData.get("newTitle") as string;
//   const inputId = formData.get("inputId") as string;

//   await prisma.todo.update({
//     where: {
//       id: inputId,
//     },
//     data: {
//       title: input,
//     },
//   });

//   revalidatePath("/");
// }

// export async function deleteTodo(formData: FormData) {
//   const inputId = formData.get("inputId") as string;

//   await prisma.todo.delete({
//     where: {
//       id: inputId,
//     },
//   });

//   revalidatePath("/");
// }

// export async function todoStatus(formData: FormData) {
//   const inputId = formData.get("inputId") as string;
//   const todo = await prisma.todo.findUnique({
//     where: {
//       id: inputId,
//     },
//   });

//   if (!todo) {
//     return;
//   }

//   const updatedStatus = !todo.isCompleted;

//   await prisma.todo.update({
//     where: {
//       id: inputId,
//     },
//     data: {
//       isCompleted: updatedStatus,
//     },
//   });

//   revalidatePath("/");

//   return updatedStatus;
// }
