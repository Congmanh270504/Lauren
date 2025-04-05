"use client";

import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { pinata } from "@/utils/config";
import { imagesTpye } from "@/types/itemTypes";
import SkeletionImages from "./loading";

interface UploadFileProps {
  imageURL: imagesTpye[];
  setImageURL: React.Dispatch<React.SetStateAction<imagesTpye[]>>;
  field: any; // Add this line to accept the field object from react-hook-form
}

const UploadFile: React.FC<UploadFileProps> = ({
  imageURL,
  setImageURL,
  field, // Add this line to accept the field object from react-hook-form
}) => {
  const prevImageURLRef = useRef<imagesTpye[]>(imageURL);
  const [isPending, setIsPending] = useState(false);
  const dropZoneConfig = {
    accept: ["jpg", "jpeg", "png"],
    maxSize: 1024 * 1024 * 10,
  };
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      toast.error("No file selected. Please upload a valid image file.");
      return;
    }
    const file = files.item(0);
    console.log("files", file?.type.split("/").pop(), file?.size);
    // Validate file type
    if (!dropZoneConfig.accept.includes(file?.type.split("/", 2).pop() ?? "")) {
      toast.error("File type not supported. Please upload a valid image file.");
      return;
    }

    if ((files?.item(0)?.size ?? 0) > dropZoneConfig.maxSize) {
      toast.error("Size image is to big. Please upload a valid image file.");
      return;
    }
    setIsPending(true);
    if (files) {
      try {
        const uploadedURLs = await Promise.all(
          Array.from(files).map(async (file) => {
            const data = new FormData();
            data.set("file", file);
            const response = await fetch("/api/uploadFiles", {
              method: "POST",
              body: data,
            });
            if (!response.ok) {
              throw new Error("Failed to upload file");
            }
            const signURL = await response.json();
            return signURL;
          })
        );
        if (imageURL.find((item) => uploadedURLs.includes(item))) {
          toast.error("Already uploaded");
        } else {
          const newImageURLs = [...imageURL, ...uploadedURLs];
          setImageURL(newImageURLs);

          // Dispatch the setImages action to update the Redux state
        }
      } catch (error) {
        console.error("Error uploading files:", error);
        toast.error("Failed to upload files. Please try again.");
      }
    }
    setIsPending(false);
  };

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleClosed = async (id: string) => {
    const data = new FormData();
    data.set("id", id);
    const response = await fetch("/api/deleteFiles", {
      method: "DELETE",
      body: data,
    });
    if (!response.ok) {
      throw new Error("Failed to delete file");
    }

    const updatedImages = imageURL.filter((item) => item.id !== id);
    setImageURL(updatedImages);

    // Dispatch the setImages action to update the Redux state
  };

  // Update the form field when imageURL changes
  useEffect(() => {
    if (prevImageURLRef.current !== imageURL) {
      field.onChange(
        imageURL
          .map((item) => item.cid)
          .filter((cid) => cid !== undefined) as string[]
      );
      prevImageURLRef.current = imageURL;
    }
  }, [imageURL, field]);

  return (
    <div className="flex items-center justify-center w-full">
      <Label
        htmlFor="productsImages"
        className="flex items-center justify-center w-full min-h-64 h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        {imageURL.length > 0 ? (
          isPending ? (
            <SkeletionImages />
          ) : (
            <div className="grid grid-cols-3 gap-2 p-2">
              {imageURL.map((img, i) => (
                <div
                  className="relative w-[200px] h-[150px] rounded-md overflow-hidden border border-gray-500 dark:border-gray-500"
                  key={i}
                >
                  <Image // if get error 500, make the user can't upload the image
                    src={img.url || "/placeholder.svg"}
                    alt="Uploaded image"
                    fill
                    className="object-cover"
                    sizes="200px"
                    quality={100}
                  />
                  <Button
                    className="absolute top-1 right-1 shadow-none text-red-600 border-none rounded-full bg-transparent hover:bg-white hover:border-solid"
                    onClick={() => handleClosed(img.id)}
                  >
                    X
                  </Button>
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop //{" "}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              PNG, JPG or JPEG(MAX. 10MB)
            </p>
          </div>
        )}
        <Input
          id="productsImages"
          type="file"
          className="hidden"
          name="productsImages"
          ref={fileInputRef}
          disabled={isPending}
          onChange={handleFileChange}
        />
      </Label>
    </div>
  );
};

export default UploadFile;
