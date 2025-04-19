"use client";

import { productType } from "@/types/itemTypes";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { convertToVNDay, wait } from "@/app/action/helper";
import { useDispatch, useSelector } from "react-redux";
import {
  checkAll,
  clearDeleteChecked,
  setDeleteChecked,
} from "@/app/state/deleteChecked/deleteChecked";
import Image from "next/image";
import { getProductImages } from "@/app/action/products";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
import { AppDispatch, RootState } from "@/app/state/store";
import { Skeleton } from "@/components/ui/skeleton";

export const columnsProducts: ColumnDef<productType>[] = [
  {
    id: "id",
    header: ({ table }) => {
      const dispatch = useDispatch();
      return (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value);
            value
              ? table.getRowModel().rows.forEach((row) => {
                  dispatch(
                    setDeleteChecked({ id: row.original.id, checked: true }) // Corrected payload
                  );
                })
              : dispatch(
                  clearDeleteChecked() // Corrected payload
                );
          }}
          aria-label="Select all"
        />
      );
    },
    cell: ({ row }) => {
      const dispatch = useDispatch();
      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);
            dispatch(
              setDeleteChecked({ id: row.original.id, checked: !!value }) // Corrected payload
            );
          }}
          aria-label="Select row"
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "images",
    header: "Images",
    cell: ({ row }) => {
      const images = useSelector((state: RootState) => state.images);
      const productUrl = images.find((url) => url.id === row.original.id);
      return productUrl ? (
        <span className="aspect-square rounded-md object-cover w-16 h-16 flex justify-center items-center bg-gray-200 text-xl">
          <Image
            src={productUrl.url}
            width={100}
            height={100}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover rounded-xl"
          />
        </span>
      ) : (
        <span className="loading loading-spinner loading-xl"></span>
      );
    },
  },
  {
    accessorKey: "productName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product Name
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize ml-2.5">{row.getValue("productName")}</div>
    ),
  },
  {
    accessorKey: "categoryName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category Name
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const category = row.original.Category; // Access the Category object
      return (
        <div className="capitalize ml-2.5">
          {category?.categoryName || "N/A"}{" "}
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = row.getValue("price") as number;
      return (
        <span className="ml-2.5">{price.toLocaleString("en-US")} VND</span>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      return (
        <span>
          {row.getValue("createdAt")
            ? convertToVNDay(row.getValue("createdAt") as Date)
            : "N/A"}
        </span>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }) => {
      return (
        <span>
          {row.getValue("updatedAt")
            ? convertToVNDay(row.getValue("updatedAt") as Date)
            : "N/A"}
        </span>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const product = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(product.id ? product.id : "")
              }
            >
              Copy category ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit category details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
