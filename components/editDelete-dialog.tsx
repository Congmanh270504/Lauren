"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MdEditDocument } from "react-icons/md";
import { MoreVertical } from "lucide-react";
import { toggleDropdown } from "@/app/state/modify/modifyItem";
import { RootState } from "@/app/state/store"; // Import RootState
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import DeleteDialog from "@/app/admin/category/delete/delete-dialog";

interface EditDeleteDialogProps {
  id: string;
}
export function EditDeleteDialog({ id }: EditDeleteDialogProps) {
  const activeDropdown = useSelector(
    (state: RootState) => state.modifyItem.activeDropdown
  );
  const dispatch = useDispatch();
  return (
    <>
      <button
        className="text-gray-400 hover:text-gray-500"
        onClick={(e) => {
          e.stopPropagation();
          dispatch(toggleDropdown(id));
        }}
      >
        <MoreVertical className="h-5 w-5" />
      </button>
      {activeDropdown === id && (
        <div
          className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <Link href={`/admin/category/edit/${id}`}>
              <button
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left justify-around"
                role="menuitem"
              >
                Edit
                <MdEditDocument />
              </button>
            </Link>
           
              <DeleteDialog id={id} />
          </div>
        </div>
      )}
    </>
  );
}
