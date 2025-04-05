"use client";
import React, { useEffect, useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { categoryType } from "@/types/itemTypes";
import { EditDeleteDialog } from "@/app/admin/categories/editDelete-dialog";
import { useDispatch, useSelector } from "react-redux";
import { handleClickOutside } from "@/app/state/modify/modifyItem";
import { FaPlus } from "react-icons/fa6";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";

interface CategoryTableProps {
  category: categoryType[];
}
interface RowPageProps {
  numberItems: number;
  page: number;
}

const CategoryTable: React.FC<CategoryTableProps> = ({ category }) => {
  const [categoriesItem, setCategoriesItem] = useState(category.slice(0, 2));
  const numberItems = [2, 4, 6, 8, 10];
  const [setting, setSetting] = useState<RowPageProps>({
    numberItems: 2,
    page: 1,
  });
  const dispatch = useDispatch();

  const handleChangeNumberItems = (value: string) => {
    setSetting({ ...setting, numberItems: Number(value) });
    setCategoriesItem(category.slice(0, Number(value)));
  };

  const handleChangePage = (value: number, type: string) => {
    if (type === "next") {
      setSetting({ ...setting, page: value + 1 });
      setCategoriesItem(
        category.slice(
          value * setting.numberItems,
          (value + 1) * setting.numberItems
        )
      );
    } else {
      setSetting({ ...setting, page: value - 1 });
      setCategoriesItem(
        category.slice(
          (value - 2) * setting.numberItems,
          (value - 1) * setting.numberItems
        )
      );
    }
  };
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
              {categoriesItem.map((cat) => (
                <tr key={cat.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center sm:table-cell">
                      {cat.categoryName ? (
                        <span
                          className="aspect-square rounded-md object-cover w-16 h-16 flex justify-center items-center bg-gray-200 text-xl"
                          style={{
                            color: `#${(
                              parseInt(
                                cat.categoryName.charCodeAt(0).toString(),
                                10
                              ) * 123456
                            )
                              .toString(16)
                              .slice(0, 6)}`,
                          }}
                        >
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
              <Select onValueChange={handleChangeNumberItems}>
                <SelectTrigger className="w-[70px]">
                  <SelectValue placeholder={numberItems[0]} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {numberItems.map((row, id) => (
                      <SelectItem value={row.toString()} key={id}>
                        {row}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Link href={`/admin/categories/create`}>
              <Button className="ml-2" variant="destructive">
                Create Category
                <FaPlus className="ml-2" size={16} />
              </Button>
            </Link>
          </div>

          <div className="flex items-center">
            <nav
              className="relative z-0 inline-flex rounded-md  "
              aria-label="Pagination"
            >
              <button
                className="relative shadow-xs inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 cursor-pointer hover:bg-gray-50"
                disabled={setting.page - 1 <= 0 ? true : false}
                style={
                  setting.page - 1 <= 0 ? { backgroundColor: "#DBDBDB" } : {}
                }
                onClick={() => handleChangePage(setting.page, "prev")}
              >
                <span className="sr-only">Previous</span>
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <span className="text-sm text-gray-700  content-center mx-[1rem]">
                Page {setting.page}
              </span>
              <button
                className="relative shadow-xs inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 cursor-pointer hover:bg-gray-50"
                onClick={() => handleChangePage(setting.page, "next")}
                disabled={
                  setting.page * setting.numberItems >= category.length
                    ? true
                    : false
                }
                style={
                  setting.page * setting.numberItems >= category.length
                    ? { backgroundColor: "#DBDBDB" }
                    : {}
                }
              >
                <span className="sr-only">Next</span>
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryTable;
