"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
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
import { deleteCategory, getData, updateCategory } from "@/app/action/category";
import { Toaster, toast } from "sonner";
import { fetchCategory } from "@/app/state/categories/categories";
import { RootState, AppDispatch } from "@/app/state/store";
import { useDispatch, useSelector } from "react-redux";
import { FaRegTrashAlt } from "react-icons/fa";
import { categoryType } from "@/types/itemTypes";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { formSchema } from "../form-schema";
import { useForm } from "react-hook-form";
import { MdEditDocument } from "react-icons/md";

interface EditFormDialogProps {
  id: string;
}
const EditFormDialog = ({ id }: EditFormDialogProps) => {
  const dispatch: AppDispatch = useDispatch();
  const category = useSelector((state: RootState) => state.category);

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryName: "",
    },
  });
  const cat = category.find((cat) => cat.id === id);
  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const response = await updateCategory(id, data);
      if (response.ok) {
        toast.success(response.message);
        router.push("/");
        router.refresh();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to update category");
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 hover:text-red-700 w-full text-left text-md justify-around"
          role="menuitem"
        >
          Edit <MdEditDocument />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit category</DialogTitle>
          <DialogDescription>
            Make sure you want to delete category here. Click save when you're
            done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="grid  items-center gap-4">
                <FormField
                  control={form.control}
                  name="categoryName"
                  render={({ field }) => (
                    <FormItem className="w-full ">
                      <FormLabel>Category Name</FormLabel> *
                      <FormControl>
                        <Input
                          placeholder="Enter category name"
                          type={"text"}
                          name="categoryName"
                          defaultValue={cat ? cat.categoryName : ""}
                          onChange={(e) => {
                            const val = e.target.value;
                            field.onChange(val);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
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
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditFormDialog;
