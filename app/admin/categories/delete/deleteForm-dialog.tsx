"use client";
import React, { useCallback, useEffect, useState } from "react";
import Form from "@/components/own/Form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { deleteCategory, getData } from "@/app/action/category";
import { Toaster, toast } from "sonner";
import { fetchCategory } from "@/app/state/categories/categories";
import { RootState, AppDispatch } from "@/app/state/store";
import { useDispatch, useSelector } from "react-redux";
import { FaRegTrashAlt } from "react-icons/fa";
import { categoryType } from "@/types/itemTypes";

interface DeleteFormDialogProps {
  id: string;
}

export default function DeleteFormDialog({ id }: DeleteFormDialogProps) {
  const dispatch: AppDispatch = useDispatch();

  const category: categoryType[] = useSelector(
    (state: RootState) => state.category
  );

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  const cat = category.find((cat) => cat.id === id);
  const handleDeletecategory = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
        const response = await deleteCategory(id);
        if (response && response.ok) {
          toast.success(response.message);
          dispatch(fetchCategory()); // Refresh the category list after deletion
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error("Event has not been created");
      }
    },
    [dispatch, id]
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 hover:text-red-700 w-full text-left text-md justify-around"
          role="menuitem"
        >
          Delete
          <FaRegTrashAlt />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete category</DialogTitle>
          <DialogDescription>
            Make sure you want to delete category here. Click save when you're
            done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form onSubmit={handleDeletecategory}>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="categoryName" className="text-right">
                Category Name
              </Label>
              <Input
                id="categoryName"
                name="categoryName"
                defaultValue={cat ? cat.categoryName : ""}
                className="col-span-3"
                readOnly
              />
            </div>
            <DialogFooter className="mt-3 gap-2 ">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button type="submit" variant="destructive">
                  Submit
                </Button>
              </DialogClose>
            </DialogFooter>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
