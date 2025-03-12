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
import { productType } from "@/types/productType";
import { deleteProduct } from "@/app/action/toDoAction";
import { Toaster, toast } from "sonner";

export default function DeleteDialog({ product }: { product: productType }) {
  const handleDeleteProduct = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      try {
        const response = await deleteProduct(formData);
        if (response && response.success) {
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
        <Button variant="outline">Delete Product</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Product</DialogTitle>
          <DialogDescription>
            Make sure you want to delete product here. Click save when you're
            done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form onSubmit={handleDeleteProduct}>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="productName" className="text-right">
                Product Name
              </Label>
              <Input
                id="productName"
                name="productName"
                defaultValue={product.productName}
                className="col-span-3"
                readOnly
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                CategoryId
              </Label>
              <Input
                id="categoryId"
                defaultValue={product.categoryId.toString()}
                className="col-span-3"
                readOnly
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Price
              </Label>
              <Input
                id="price"
                defaultValue={product.price.toString()}
                className="col-span-3"
                readOnly
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Price
              </Label>
              <Input
                id="price"
                defaultValue={product.price.toString()}
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
