import React from "react";
import { getProducts } from "@/app/action/products";
import { DataTable } from "@/components/ui/table/data-table";
import { columnsProducts } from "./colums-products";

const page = async () => {
  const products = await getProducts();

  return (
    <div className="container mx-auto py-auto">
      <DataTable columns={columnsProducts} data={products} type={"product"} />
    </div>
  );
};

export default page;
