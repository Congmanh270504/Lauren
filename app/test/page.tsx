import { columnsCategories } from "@/components/ui/table/colums-categories";
import { DataTable } from "@/components/ui/table/data-table";
import { categoryType } from "@/types/itemTypes";
import { PrismaClient } from "@prisma/client";

async function getData(): Promise<categoryType[]> {
  const prisma = new PrismaClient();
  const data = await prisma.categories.findMany();
  return data;
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-auto">
      <DataTable columns={columnsCategories} data={data} />
    </div>
  );
}
