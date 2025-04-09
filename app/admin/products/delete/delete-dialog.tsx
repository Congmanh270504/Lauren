"use client";
import React, { useCallback } from "react";
import Form from "@/components/custom/form";
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
import { productType } from "@/types/itemTypes";
import { deleteProduct } from "@/app/action/products";
import { Toaster, toast } from "sonner";
import { FaRegTrashAlt } from "react-icons/fa";
export default function DeleteFormDialog({
  products,
}: {
  products: productType;
}) {
  const handleDeleteProduct = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
        if (!products.id) {
          toast.error("Product ID is missing");
          return;
        }
        const response = await deleteProduct(products.id);
        if (response && response.ok) {
          toast.success("Delete product has been successfully");
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
        <button
          className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 hover:text-red-700 w-full text-left text-md justify-around"
          role="menuitem"
        >
          Delete <FaRegTrashAlt />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle className="text-red-600">Delete Product</DialogTitle>
          <DialogDescription>
            Make sure you want to delete product here. Click save when you're
            done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-6 ">
          <Form onSubmit={handleDeleteProduct}>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="productName" className="text-right">
                Product Name
              </Label>
              <Input
                id="productName"
                name="productName"
                defaultValue={products.productName}
                className="col-span-3"
                readOnly
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4 mt-2">
              <Label htmlFor="username" className="text-right">
                Category name
              </Label>
              <Input
                id="categoryId"
                defaultValue={products.Category?.categoryName}
                className="col-span-3"
                readOnly
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4 mt-2">
              <Label htmlFor="username" className="text-right">
                Price
              </Label>
              <Input
                id="price"
                defaultValue={products.price.toString()}
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
