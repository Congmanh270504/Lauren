"use client";
import React, { useCallback } from "react";
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
import { categoryType } from "@/types/productType";
import { deleteCategory } from "@/app/action/category";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";

export default function DeleteDialog({ category }: { category: categoryType }) {
  const router = useRouter();
  const handleDeleteProduct = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
        const response = await deleteCategory(category.id);
        if (response.ok) {
          toast.success(response.message);
          router.push("/");
        } else {
          toast.error("Delete product has not been failed");
        }
      } catch (error) {
        toast.error("Event has not been created");
      }
    },
    []
  );
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete Category</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Category</DialogTitle>
          <DialogDescription>
            Make sure you want to delete category here. Click save when you're
            done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form onSubmit={handleDeleteProduct}>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="productName" className="text-right">
                Category Name
              </Label>
              <Input
                id="productName"
                name="productName"
                defaultValue={category.categoryName}
                className="col-span-3"
                readOnly
              />
            </div>
            <DialogFooter className="mt-3 gap-2">
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
