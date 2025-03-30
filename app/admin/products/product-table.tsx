"use client";
import React, { useState } from "react";
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
import { handleClickOutside } from "@/app/state/modify/modifyItem";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import EditDeleteDialog from "./editDelete-dialog";
import Image from "next/image";
type ProductWithImages = Prisma.ProductsGetPayload<{
  include: { img: true; Category: true };
}>;

interface ProductTableProps {
  products: ProductWithImages[];
  productImages: string[];
}
const ProductTable: React.FC<ProductTableProps> = ({
  products,
  productImages,
}) => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  return (
    <div className="w-full p-4" onClick={() => dispatch(handleClickOutside())}>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-3 text-left">
                  <div className="flex items-center">Image</div>
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Product name
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Price
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Category
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Update at
                </th>
                <th scope="col" className="relative px-4 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((pro) => (
                <tr key={pro.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center sm:table-cell">
                      <span className="aspect-square rounded-md object-cover w-16 h-16 flex justify-center items-center bg-gray-200 text-xl">
                        {pro.img && pro.img.length ? (
                          <Image
                            src={
                              productImages.find((img) =>
                                img.includes(pro.img[0].url)
                              ) || "/path/to/default/image.jpg"
                            }
                            width={100}
                            height={100}
                            alt="Picture of the author"
                            className="w-full h-full object-cover rounded-xl"
                          />
                        ) : (
                          pro.productName.charAt(0)
                        )}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                    {pro.productName}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {pro.price}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {pro.Category.categoryName}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-600">
                    {pro.createdAt
                      ? new Date(pro.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>

                  <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                    <EditDeleteDialog products={pro} />
                    {/* <MoreVertical className="h-5 w-5" /> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex items-center">
            <span className="text-sm text-gray-700">Rows per page:</span>
            <div className="ml-2 relative">
              <button
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-xs px-2 py-1 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                id="rows-menu"
                aria-expanded="true"
                aria-haspopup="true"
              >
                {rowsPerPage}
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <span className="text-sm text-gray-700 mr-4">
              Page {currentPage}
            </span>
            <nav
              className="relative z-0 inline-flex rounded-md shadow-xs -space-x-px"
              aria-label="Pagination"
            >
              <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span className="sr-only">Previous</span>
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span className="sr-only">Next</span>
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </nav>
          </div>
        </div>
      </div>

      <div className="fixed bottom-6 right-6">
        <Link href={`/admin/product/create`}>
          <button className="relative bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg group">
            <span className="absolute left-[-125px] top-1/2 transform -translate-y-1/2 bg-gray-500 text-white text-sm rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
              Create product
            </span>
            <FaPlus />
          </button>
        </Link>
      </div>
    </div>
  );
};
export default ProductTable;
