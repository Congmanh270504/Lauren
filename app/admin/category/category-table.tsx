import React from "react";
import { Prisma } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DeleteDialog from "./delete/page";
import { categoryType } from "@/types/productType";

interface CategoryTableProps {
  category: categoryType[];
}

const CategoryTable: React.FC<CategoryTableProps> = ({ category }) => {
  return (
    <div>
      <Button>
        <Link href="/admin/product/create">Create Product</Link>
      </Button>
      <Table>
        <TableCaption>Product Table.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Images</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-right">Category ID</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {category.map((cat) => (
            <TableRow key={cat.id}>
              <TableCell>{cat.categoryName}</TableCell>
              <TableCell>{cat.updatedAt?.toLocaleDateString()}</TableCell>
              <TableCell>{cat.createdAt?.toLocaleDateString()}</TableCell>
              <TableCell>
                {/* <DeleteDialog category={cat} />
                 */}
                delete
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CategoryTable;
