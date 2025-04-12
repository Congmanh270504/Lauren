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
import { Check } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import CheckboxIconCustom from "@/components/custom/checkbox-icon";
import RowPageFilter from "@/components/custom/row-page-filter";
import { categoryType, productType } from "@/types/itemTypes";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";

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
  const numberItems = [5, 10, 15, 20, 30];
  const [productItem, setProductItem] = useState(products.slice(0, 5));
  const [deleteAllFiles, setDeleteAllFiles] = useState(false);
  const [deleteFilesId, setDeleteFilesId] = useState<string[]>([]);
  const size = 24;

  const dispatch = useDispatch();
  return (
    <div className="w-full p-4" onClick={() => dispatch(handleClickOutside())}>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-3 text-left">
                  <div className="flex items-center">
                    <div
                      className={"relative cursor-pointer "}
                      style={{ width: size, height: size }}
                      onClick={() => {
                        setDeleteAllFiles(!deleteAllFiles);
                        console.log(deleteAllFiles);
                      }}
                      role="checkbox"
                      aria-checked={deleteAllFiles}
                      tabIndex={0}
                    >
                      {deleteAllFiles ? (
                        <div className="flex items-center justify-center w-full h-full rounded-md bg-violet-500 text-white">
                          <Check size={size * 0.6} strokeWidth={3} />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center w-full h-full rounded-md border-2 border-slate-300"></div>
                      )}
                    </div>
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Image
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
                <th scope="col" className="relative px-4 py-3 text-right">
                  {deleteAllFiles ? (
                    // <Button className="ml-2" variant="destructive">
                    //   DELETE
                    //   <Trash2 />
                    // </Button>
                    "âfa"
                  ) : (
                    <span className="sr-only">Actions</span>
                  )}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {productItem.map((pro) => (
                <tr key={pro.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                    {deleteAllFiles ? (
                      <CheckboxIconCustom
                        checked={deleteAllFiles}
                        onChange={(newState) => {
                          setDeleteAllFiles(newState); // Update the state
                        }}
                      />
                    ) : (
                      <div
                        className="relative cursor-pointer"
                        style={{ width: size, height: size }}
                      >
                        <Checkbox className="flex items-center justify-center w-full h-full rounded-md border-2 border-slate-300" />
                      </div>
                    )}
                  </td>
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <RowPageFilter
          data={products}
          numberItems={numberItems}
          setItem={
            setProductItem as React.Dispatch<
              React.SetStateAction<productType[] | categoryType[]>
            >
          }
        />
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
