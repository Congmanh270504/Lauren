"use client";

import type React from "react";

import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
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
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { TypographyH4 } from "@/components/ui/typography";
import { signIn } from "next-auth/react";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .regex(/[a-zA-Z0-9]/, { message: "Password must be alphanumeric" }),
});

export default function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
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
          <h1 className="text-3xl font-bold">Login to your account</h1>
          <p className="text-balance text-base text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>
        <div className="grid gap-6">
          <Button
            variant="outline"
            className="w-full h-12 text-base font-medium border-2"
          >
            <FaGoogle /> Login with Google
          </Button>
          <Button
            variant="outline"
            className="w-full h-12 text-base font-medium border-2"
            onClick={() => {
              signIn("github", {
                callbackUrl: "/",
              });
            }}
          >
            <FaGithub /> Login with Github
          </Button>
          <div className="relative text-center text-base my-2 after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-4 text-muted-foreground">
              Or continue with
            </span>
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="grid gap-3">
                <FormLabel htmlFor="email" className="text-lg font-medium">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    placeholder="norx@test.com"
                    type="email"
                    autoComplete="email"
                    className="h-12 text-base px-4"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="grid gap-3">
                <div className="flex justify-between items-center">
                  <FormLabel htmlFor="password" className="text-lg font-bold">
                    Password
                  </FormLabel>
                  <Link
                    href="#"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <FormControl>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••"
                      autoComplete="current-password"
                      className="h-12 text-base px-4 pr-12"
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                      <span className="sr-only">
                        Toggle password visibility
                      </span>
                    </Button>
                  </div>
                </FormControl>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full h-12 text-lg font-medium mt-2"
          >
            Login
          </Button>
        </div>
        <div className="text-center text-base mt-2">
          Don&apos;t have an account?{" "}
          <Link href="/login/register" className="underline underline-offset-4 font-medium">
            Sign up
          </Link>
        </div>
      </form>
    </Form>
  );
}
