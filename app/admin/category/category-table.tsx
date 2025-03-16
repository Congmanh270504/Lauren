"use client";
import React, { useState } from "react";
import { Prisma } from "@prisma/client";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DeleteDialog from "./delete/delete-dialog";
import { categoryType } from "@/types/itemTypes";
import { EditDeleteDialog } from "@/components/editDelete-dialog";
import { useDispatch, useSelector } from "react-redux";
import { handleClickOutside } from "@/app/state/modify/modifyItem";
import { FaPlus } from "react-icons/fa6";
interface CategoryTableProps {
  category: categoryType[];
}

const CategoryTable: React.FC<CategoryTableProps> = ({ category }) => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  return (
    <div className="w-full p-4" onClick={() => dispatch(handleClickOutside())}>
      <div className="bg-white rounded-lg shadow overflow-hidden">
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
                  Category name
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Create at
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
              {category.map((cat) => (
                <tr key={cat.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center sm:table-cell">
                      {cat.categoryName ? (
                        <span className="aspect-square rounded-md object-cover w-16 h-16 flex justify-center items-center bg-gray-200 text-xl">
                          {cat.categoryName.charAt(0)}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                    {cat.categoryName}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-600">
                    {cat.createdAt
                      ? new Date(cat.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {cat.updatedAt
                      ? new Date(cat.updatedAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                    <EditDeleteDialog id={cat.id.toString()} />
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
                className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-2 py-1 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
              className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
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

      {/* Help button */}
      <div className="fixed bottom-6 right-6">
        <Link href={`/admin/category/create`}>
          <button className="relative bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg group">
            <span className="absolute left-[-125px] top-1/2 transform -translate-y-1/2 bg-gray-500 text-white text-sm rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
              Create Category
            </span>
            <FaPlus />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CategoryTable;
