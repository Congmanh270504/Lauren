import React from "react";
import { PrismaClient } from "@prisma/client";
import ProductTable from "./product-table";

async function getData() {
  const prisma = new PrismaClient();
  const data = await prisma.products.findMany({
    include: {
      img: true,
      Category: true,
    },
  });
  return data;
}

const page = async () => {
  const product = await getData();
  return (
    <div>
      <h1>Product</h1>
      <ProductTable product={product} />
    </div>
  );
};

export default page;
