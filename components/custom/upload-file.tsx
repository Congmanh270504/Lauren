"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { imagesTpye } from "@/types/itemTypes";
import SkeletionImages from "./loading";

interface UploadFileProps {
  files: Array<{ file: File }>;
  setFiles: React.Dispatch<React.SetStateAction<Array<{ file: File }>>>;
  field: any; // Add this line to accept the field object from react-hook-form
}

const UploadFile: React.FC<UploadFileProps> = ({ files, setFiles, field }) => {
  const [isPending, setIsPending] = useState(false);
  const dropZoneConfig = {
    accept: ["jpg", "jpeg", "png"],
    maxSize: 1024 * 1024 * 10,
  };

  const handleFileChange = async (file: File) => {
    try {
      setIsPending(true);
      const data = new FormData();
      data.set("file", file);
      const uploadFile = await fetch("/api/uploadFiles", {
        method: "POST",
        body: data,
      });
      const response = await uploadFile.json();
      setIsPending(false);
      let list = field.value as string[]; // Get the current value of the field
      list.push(response.cid); // Add the new cid to the list
      console.log("list", list);
      field.onChange(list); // Update the form field with the current cid array
    } catch (error) {
      toast.error("Error uploading file");
      setIsPending(false);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log("acceptedFiles", acceptedFiles);
    acceptedFiles.forEach((file) => {
      if (!dropZoneConfig.accept.some((ext) => file.type.endsWith(ext))) {
        toast.error(
          "File type not supported. Please upload a valid image file."
        );
        return;
      }
      if ((file.size ?? 0) > dropZoneConfig.maxSize) {
        toast.error("Size image is too big. Please upload a valid image file.");
        return;
      }
      setFiles((prev) => [...prev, { file }]);
      handleFileChange(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps({
        className: "flex items-center justify-center w-full",
      })}
    >
      <div className="flex items-center justify-center w-full min-h-64 h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <div>
            {files.length > 0 ? (
              <div className="flex flex-wrap gap-2 mt-4">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="relative w-[200px] h-[150px] rounded-md overflow-hidden border border-gray-500 dark:border-gray-500"
                  >
                    <Image
                      src={URL.createObjectURL(file.file)}
                      alt="Uploaded image"
                      fill
                      objectFit="cover"
                      className="rounded-md object-cover"
                      sizes="200px"
                      quality={100}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PNG, JPG or JPEG (MAX. 10MB)
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      <Input
        {...getInputProps()}
        id="productsImages"
        name="productsImages"
        type="file"
        className="hidden"
      />
    </div>
  );
};

export default UploadFile;
