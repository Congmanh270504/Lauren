import React from "react";
import CreateForm from "./create-form";
import { PrismaClient } from "@prisma/client";
const page = async () => {
  const prisma = new PrismaClient();
  const categories = await prisma.categories.findMany();

  return <CreateForm categories={categories} />;
};

export default page;
