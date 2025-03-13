"use client";
import React, { useState } from "react";
import * as z from "zod";
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
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { formSchema } from "../form-schema";
import { createCategory } from "@/app/action/category";
import { serverAction } from "./server-action";

const page = () => {
  const router = useRouter();
  const initialState = {
    success: false,
    message: "",
  };
  const [state, action, isPending] = React.useActionState(
    serverAction,
    initialState
  );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryName: "",
    },
  });
  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const response = await createCategory(data);
      if (response.ok) {
        toast.success(response.message);
        router.push("/");
        router.refresh();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to create category");
    }
  };
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col p-2 md:p-5 w-full mx-auto rounded-md max-w-3xl gap-2 border"
        >
          <h2 className="text-2xl font-bold">Contact us</h2>
          <p className="text-base">Please fill the form below to contact us</p>
          <FormField
            control={form.control}
            name="categoryName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Category Name</FormLabel> *
                <FormControl>
                  <Input
                    placeholder="Enter category name"
                    type={"text"}
                    name="categoryName"
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
          <div className="flex justify-end items-center w-full pt-3 gap-8">
            <Button className="rounded-lg" size="sm" variant="destructive">
              Cancel
            </Button>
            <Button className="rounded-lg" size="sm" type="submit">
              {isPending ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default page;
