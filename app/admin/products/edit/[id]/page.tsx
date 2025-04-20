import { PrismaClient } from "@prisma/client";
import { ObjectId } from "mongodb";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import EditForm from "./editForm";
const prisma = new PrismaClient();

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const product = await prisma.products.findUnique({
    where: {
      id: new ObjectId(id).toString(),
    },
    include: {
      img: true,
    },
  });
  const categories = await prisma.categories.findMany({});

  if (!product) {
    return <div>Product not found</div>;
  }

  return <EditForm product={product} categories={categories} />;
};

export default page;
