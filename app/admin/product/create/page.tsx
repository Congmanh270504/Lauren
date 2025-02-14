"use client";
import { create } from "@/app/action/toDoAction";
import Button from "@/components/own/Button";
import Form from "@/components/own/Form";
// import Input from "@/components/own/Input";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

const page = () => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [imageURL, setImageURL] = useState<string[]>([]);
  useEffect(() => {
    console.log(imageURL);
  }, [imageURL]);
  return (
    <>
      <Form action={create} className="w-1/2 m-auto">
        <div className="flex flex-col gap-4">
          <Input name="productName" type="text" placeholder="Add Todo..." />
          <Input name="price" type="number" placeholder="Add Todo..." />
          <Input name="categoryId" type="number" placeholder="Add Todo..." />
          <div className="pt-10 flex flex-col">
            <div className="flex flex-wrap gap-1 p-5 bg-zinc-200  w-[650px] min-h-[300px] mx-auto mt-6 mb-10 rounded-md shadow-sm">
              {imageURL.map((url) => (
                <div
                  className="relative flex-1 basis-[300px] h-[200px]"
                  key={url}
                >
                  <Image src={url} alt="Picture of the author" fill />
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="picture">Picture</Label>
                <Input
                  id="picture"
                  type="file"
                  name="productsImages"
                  ref={fileInputRef}
                  disabled={isUploading}
                  onChange={async (e) => {
                    const file = e.target.files?.[0] as File;
                    setIsUploading(true);
                    const data = new FormData();
                    data.set("file", file);
                    const response = await fetch("/api/uploadFiles", {
                      method: "POST",
                      body: data,
                    });
                    const signURL = await response.json();
                    setImageURL((prev) => [...prev, signURL]);
                    setIsUploading(false);
                  }}
                />
              </div>
              {/* <button
                className="bg-blue-500 px-4 py-2 Itext-white rounded-sm self-center font-semibold"
                onClick={() => fileInputRef.current?.click()}
              >
                {isUploading ? "Uploading..." : "Upload imgae"}
              </button> */}
            </div>
          </div>
          <Button type="submit" text="Add" />
        </div>
      </Form>
    </>
  );
};

export default page;
