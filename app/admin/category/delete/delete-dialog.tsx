"use client";
import React, { useCallback, useEffect } from "react";
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
import { deleteCategory } from "@/app/action/category";
import { Toaster, toast } from "sonner";
import { fetchCategory } from "@/app/state/category/category";
import { RootState, AppDispatch } from "@/app/state/store";
import { useDispatch, useSelector } from "react-redux";
import { FaRegTrashAlt } from "react-icons/fa";

interface DeleteDialogProps {
  id: string;
}

export default function DeleteDialog({ id }: DeleteDialogProps) {
  const dispatch: AppDispatch = useDispatch();

  const category = useSelector((state: RootState) => state.category);
  
  useEffect(() => {
    dispatch(fetchCategory());
    console.log("Category state:", category); // Log the category state
  }, [dispatch]);
  
  const cat = category.find((cat) => cat.id === id);
  const handleDeletecategory = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
        const response = await deleteCategory(id);
        if (response && response.ok) {
          toast.success("Delete category has been successfully");
          dispatch(fetchCategory()); // Refresh the category list after deletion
        } else {
          toast.error("Delete category has not been failed");
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
                category Name
              </Label>
              <Input
                id="categoryName"
                name="categoryName"
                defaultValue={cat ? cat.categoryName : ""}
                className="col-span-3"
                readOnly
              />
            </div>

            <DialogFooter>
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
