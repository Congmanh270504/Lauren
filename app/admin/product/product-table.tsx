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
import DeleteDialog from "./delete/delete-dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type ProductWithImages = Prisma.ProductsGetPayload<{
  include: { img: true };
}>;

interface ProductTableProps {
  product: ProductWithImages[];
}

const ProductTable: React.FC<ProductTableProps> = ({ product }) => {
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
          {product.map((prod) => (
            <TableRow key={prod.id}>
              <TableCell>
                {prod.img.length > 0 && (
                  <img
                    key={prod.img[0].id}
                    src={prod.img[0].url}
                    alt={prod.productName}
                    width="50"
                  />
                )}
              </TableCell>
              <TableCell>{prod.productName}</TableCell>
              <TableCell>{prod.price}</TableCell>
              <TableCell className="text-right">{prod.categoryId}</TableCell>
              <TableCell>
                <DeleteDialog product={prod} />
              </TableCell>
              <TableCell>
                <Button>
                  <Link href={`/admin/product/edit/${prod.id}`}>Update</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductTable;
