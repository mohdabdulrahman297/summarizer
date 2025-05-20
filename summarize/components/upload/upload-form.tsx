"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import UploadFormInput from "./upload-form-input";
import { z } from "zod";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";

const schema = z.object({
  file:
    typeof File !== "undefined"
      ? z
          .instanceof(File, { message: "Invalid file" })
          .refine((file) => file.size <= 20 * 1024 * 1024, {
            message: "File must be less than 20MB",
          })
      : z.any(),
});

export default function UploadForm() {
  const { startUpload } = useUploadThing("pdfUploader");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;

    await toast.promise(
      async () => {
        // 1) Validate
        const validation = schema.safeParse({ file });
        if (!validation.success) {
          throw new Error(
            validation.error.flatten().fieldErrors.file?.[0] ?? "Invalid file"
          );
        }

        // 2) Upload
        const resp = await startUpload([file]);
        if (!resp) {
          throw new Error("Failed to upload file");
        }

        // 3) (Optional) further processing, e.g. summarization, DB save, redirect...
      },
      {
        loading: "Processing & uploading file…",
        
        success: "File uploaded successfully!",
        error: (err) => `Error: ${err.message}`,
      }
    );
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl">
      <UploadFormInput onSubmit={handleSubmit} />
    </div>
  );
}
