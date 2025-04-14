"use client";

import { categoryType } from "@/types/itemTypes";
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
import { convertToVNDay } from "@/app/action/helper";
import { useDispatch } from "react-redux";
import {
  checkAll,
  clearDeleteChecked,
  setDeleteChecked,
} from "@/app/state/deleteChecked/deleteChecked";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columnsCategories: ColumnDef<categoryType>[] = [
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

            console.log("row", row.original.id);
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
      return (
        <span
          className="aspect-square rounded-md object-cover w-16 h-16 flex justify-center items-center bg-gray-200 text-xl"
          style={{
            color: `#${(
              parseInt(
                (row.getValue("categoryName") as string)
                  .charCodeAt(0)
                  .toString(),
                10
              ) * 123456
            )
              .toString(16)
              .slice(0, 6)}`,
          }}
        >
          {(row.getValue("categoryName") as string).charAt(0)}
        </span>
      );
    },
  },
  {
    accessorKey: "categoryName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("categoryName")}</div>
    ),
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
      const category = row.original;
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
              onClick={() => navigator.clipboard.writeText(category.id)}
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
