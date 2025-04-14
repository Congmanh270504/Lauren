import React from "react";
import { DataTable } from "@/components/ui/table/data-table";
import { columnsCategories } from "@/app/admin/categories/colums-categories";
import { PrismaClient } from "@prisma/client";

async function getData() {
  const prisma = new PrismaClient();
  const data = await prisma.categories.findMany();
  return data;
}

const page = async () => {
  const data = await getData();
  return (
    <div className="container mx-auto py-auto">
      <DataTable columns={columnsCategories} data={data} />
    </div>
  );
};

export default page;
