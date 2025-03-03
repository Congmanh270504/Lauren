"use client";
import React from "react";
import * as z from "zod";
import { formSchema } from "./form-schema";
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

const initialState = {
  success: false,
  message: "",
};

const page = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const [state, action, isPending] = React.useActionState(
    serverAction,
    initialState
  );
  return (
    <div>
      <Form {...form}>
        <form
          action={action}
          className="flex flex-col p-2 md:p-5 w-full mx-auto rounded-md max-w-3xl gap-2 border"
        >
          <h2 className="text-2xl font-bold">Create product</h2>
          <p className="text-base">Please fill the form below to contact us</p>

          <div className="flex items-center justify-between flex-wrap sm:flex-nowrap w-full gap-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Name</FormLabel> *
                  <FormControl>
                    <Input
                      placeholder="Enter your name"
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
                  <FormLabel>Price</FormLabel> *
                  <FormControl>
                    <Input
                      placeholder="Enter product price"
                      type={"number"}
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
            name="category"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Category</FormLabel> *
                <FormControl>
                  <Input
                    placeholder="Enter your text"
                    type={"number"}
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
          <div className="flex justify-end items-center w-full pt-3">
            
            <Button className="rounded-lg" size="sm">
              {isPending ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
export default page;
