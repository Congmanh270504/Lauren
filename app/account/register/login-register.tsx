"use client";

import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { PhoneInput } from "@/components/ui/phone-input";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

const formSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters long" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string().min(10, { message: "Phone number must be valid" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" })
      .max(20, {
        message: "Password must be at most 20 characters long",
      })
      .regex(/[a-zA-Z0-9]/, { message: "Password must be alphanumeric" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export default function LoginRegister({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsPending(true);
      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(values),
      });
      console.log(response);
      const data = await response.json();
      console.log(data);

      if (response.status === 400) {
        toast.error(data.error);
        return;
      }

      if (data.error) {
        toast.error("Failed to create account. Please try again.");
        return;
      }
      toast.success(data.success);
      router.push("/login/sign-in");
      form.reset();
      setIsPending(true);
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          "flex flex-col gap-9 w-full max-w-xl mx-auto p-8 border-2 border-gray-200 rounded-lg shadow-md",
          className
        )}
        {...props}
      >
        <div className="flex flex-col items-center gap-3 text-center">
          <h1 className="text-3xl font-bold">Register your account</h1>
          <p className="text-balance text-base text-muted-foreground">
            Enter your details below to create a new account
          </p>
        </div>
        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel htmlFor="name">Full Name</FormLabel>
                <FormControl>
                  <Input id="name" placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    placeholder="johndoe@mail.com"
                    type="email"
                    autoComplete="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel htmlFor="phone">Phone Number</FormLabel>
                <FormControl>
                  <PhoneInput {...field} defaultCountry="VN" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel htmlFor="password">Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    id="password"
                    placeholder="******"
                    autoComplete="new-password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel htmlFor="confirmPassword">
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <PasswordInput
                    id="confirmPassword"
                    placeholder="******"
                    autoComplete="new-password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isPending ? (
            <Button
              type="submit"
              className="w-full h-12 text-lg font-medium mt-2"
              disabled
            >
              Register <span className="loading loading-dots loading-lg"></span>
            </Button>
          ) : (
            <Button
              type="submit"
              className="cursor-pointer w-full h-12 text-lg font-medium mt-2 bg-black text-white hover:bg-gray-800 transition-colors duration-200"
            >
              Register
            </Button>
          )}
        </div>
        <div className="text-center text-base mt-2">
          Already have an account?{" "}
          <Link
            href="/login/sign-in"
            className="underline underline-offset-4 font-medium"
          >
            Login
          </Link>
        </div>
      </form>
    </Form>
  );
}
