"use client";
import React, { useState, useEffect } from "react";
import * as z from "zod";
import { formSchema } from "../form-schema";
import { serverAction } from "./server-action";
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
import { createProduct } from "@/app/action/products";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categoryType, imagesTpye } from "@/types/itemTypes";
import { getRandomColor } from "@/app/action/helper";
const CreateForm = ({ categories }: { categories: categoryType[] }) => {
  const router = useRouter();
  const [randomColor, setRadomColort] = useState<string>("");
  const [isLoadingFile, setIsLoadingFile] = useState(false);
  useEffect(() => {
    setRadomColort(getRandomColor());
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      price: 0,
      categoryId: "",
      productsImages: [],
    },
  });
  const [isPending, setIsPending] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsPending(true);
      setIsSubmit(true);
      const response = await createProduct(data);
      if (response.ok) {
        toast.success(response.message);
        form.reset();
        router.push("/");
      } else {
        toast.error(response.message);
      }
      setIsSubmit(false);
      setIsPending(false);
    } catch (error) {
      toast.error("Failed to create product");
    }
  };
  console.log("form", form.getValues("productsImages"));
  useEffect(() => {
    console.log("submit", isSubmit);
  });
  return (
    <div className="w-full p-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col p-2 md:p-5 w-full mx-auto rounded-md max-w-3xl gap-2 border"
        >
          <h2 className={"text-2xl font-bold"} style={{ color: randomColor }}>
            Create product
          </h2>

          <p className="text-base">
            Please fill the form below to create product
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
                    <Input
                      placeholder="Enter your name"
                      name="productName"
                      type={"text"}
                      value={field.value}
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
                      type={"number"}
                      name="price"
                      value={field.value}
                      onChange={(e) => {
                        const val = e.target.value;
                        field.onChange(+val);
                      }}
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
            name="productsImages" // bug here
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
                    isSubmit={isSubmit}
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
                  Submitting...{" "}
                  <span className="loading loading-dots loading-xs"></span>
                </div>
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateForm;
