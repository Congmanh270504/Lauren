"use client";
import { updateProduct } from "@/app/action/toDoAction";
import Button from "@/components/own/Button";
import Form from "@/components/own/Form";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useRouter } from "next/navigation";

const page = () => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [imageURL, setImageURL] = useState<string[]>([]);
  const router = useRouter();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    await updateProduct(formData, imageURL);
    router.push("/");
  };

  return (
    <Form onSubmit={handleSubmit} className="w-1/2 m-auto">
      <div className="flex flex-col gap-4"></div>
      <Input name="productName" type="text" placeholder="Add Todo..." />
      <Input name="price" type="number" placeholder="Add Todo..." />
      <Input name="categoryId" type="number" placeholder="Add Todo..." />
      <Button type="submit" text="Update" />
    </Form>
  );
};

export default page;
