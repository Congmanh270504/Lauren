"use client";
import React, { useState, useEffect } from "react";
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
import UploadFile from "@/components/custom/upload-file";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { updateProduct } from "@/app/action/products";
import { productType } from "@/types/itemTypes";
import { categoryType } from "@/types/itemTypes";
import { getRandomColor } from "@/app/action/helper";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
interface EditFormProps {
  categories: categoryType[];
  product: productType;
}
const EditForm = ({ product, categories }: EditFormProps) => {
  const router = useRouter();
  const [randomColor, setRadomColort] = useState<string>("");
  const [isLoadingFile, setIsLoadingFile] = useState(false);
  useEffect(() => {
    setRadomColort(getRandomColor());
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: product.productName,
      price: product.price,
      categoryId: product.categoryId,
      productsImages: product.img ? product.img.map((image) => image.url) : [], // Initialize with existing images
    },
  });
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsPending(true);
      if (!product.id) {
        toast.error("Product ID is required.");
        setIsPending(false);
        return;
      }
      const response = await updateProduct(data, product.id); // error
      if (response.ok) {
        toast.success("Product updated successfully.");
        setIsPending(false);
        // router.push("/");
        // router.refresh();
      } else {
        toast.error("An error occurred. Please try again.");
        setIsPending(false);
      }
    } catch (error) {
      toast.error(
        "An error occurred while updating the product. Please try again."
      );
    } 
  };

  console.log("form", form.getValues("productsImages"));

  return (
    <div className="w-full p-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col p-2 md:p-5 w-full mx-auto rounded-md max-w-3xl gap-2 border"
        >
          <h2 className={"text-2xl font-bold"} style={{ color: randomColor }}>
            Edit product
          </h2>
          <p className="text-base">
            Please fill the form below to update the product
          </p>

          <div className="flex items-center justify-between flex-wrap sm:flex-nowrap w-full gap-2">
            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    Product name <span className="text-red-600">*</span>
                  </FormLabel>
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
                  <FormLabel>
                    Price <span className="text-red-600">*</span>
                  </FormLabel>
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
                <FormLabel>
                  Category <span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.categoryName}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
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
                <FormLabel>
                  Upload file image <span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <UploadFile
                    field={field} // Pass the field object to the UploadFile component
                    randomColor={randomColor}
                    isLoadingFile={isLoadingFile}
                    setIsLoadingFile={setIsLoadingFile}
                    productImages={product.img} // Pass the product
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
              className="rounded-lg cursor-pointer"
              size="sm"
              type="submit"
              variant="submit"
              disabled={isPending || isLoadingFile} // Disable if form is invalid or pending
            >
              {isPending ? (
                <div>
                  Updating{" "}
                  <span className="loading loading-dots loading-xs"></span>
                </div>
              ) : (
                "Update product"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditForm;
