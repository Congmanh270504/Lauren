"use client";
import React, { useState } from "react";
import * as z from "zod";
import { formSchema } from "../../form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import UploadFile from "@/components/own/upload-file";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { updateProduct } from "@/app/action/products";
import { productType } from "@/types/itemTypes";

const EditForm = ({ product }: { product: productType }) => {
  const [imageURL, setImageURL] = useState<string[]>(
    product.img ? product.img.map((img) => img.url) : []
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: product.productName,
      price: product.price,
      categoryId: product.categoryId,
      productsImages: [],
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const response = await updateProduct(formData, imageURL, product.id);
      if (response.ok) {
        toast.success("Product updated successfully.");
        router.push("/");
        router.refresh();
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } catch (error) {
      toast.error(
        "An error occurred while updating the product. Please try again."
      );
    } finally {
      router.push("/");
    }
  };

  return (
    <div className="mt-2">
      <Form {...form}>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col p-2 md:p-5 w-full mx-auto rounded-md max-w-3xl gap-2 border"
        >
          <h2 className="text-2xl font-bold">Edit product</h2>
          <p className="text-base">
            Please fill the form below to update the product
          </p>

          <div className="flex items-center justify-between flex-wrap sm:flex-nowrap w-full gap-2">
            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Product name</FormLabel> *
                  <FormControl>
                    <Input placeholder="Enter product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Price</FormLabel> *
                  <FormControl>
                    <Input
                      placeholder="Enter product price"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Category</FormLabel> *
                <FormControl>
                  <Input
                    placeholder="Enter category ID"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="productsImages"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Upload file image</FormLabel> *
                <FormControl>
                  <UploadFile
                    imageURL={imageURL}
                    setImageURL={setImageURL}
                    field={field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end items-center w-full pt-3 gap-8">
            <Button className="rounded-lg" size="sm" variant="destructive">
              Cancel
            </Button>

            <Button
              className="rounded-lg"
              type="submit"
              size="sm"
              onClick={() => setIsSubmitting(true)}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditForm;
