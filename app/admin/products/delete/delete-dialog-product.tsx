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
import { deleteAllProduct } from "@/app/action/products";
import { Toaster, toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/state/store";
import { Trash2 } from "lucide-react";

export default function DeleteDialogProduct() {
  const deleteChecked = useSelector((state: RootState) => state.deleteChecked);
  const handleDeleteAllProduct = async () => {
    try {
      const response = await deleteAllProduct(deleteChecked);
      if (response && response.ok) {
        toast.success("Delete product has been successfully");
      } else {
        toast.error("Delete product has not been failed");
      }
    } catch (error) {
      toast.error("Event has not been created");
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" className="ml-auto my-1 cursor-pointer">
          Delete <Trash2 className="ml-2 h-4 w-4" />
        </Button>
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
          <DialogFooter className="mt-3 gap-2 ">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                type="submit"
                variant="destructive"
                onClick={handleDeleteAllProduct}
              >
                Submit
              </Button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
