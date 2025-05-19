"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import UploadFormInput from "./upload-form-input";
import { z } from "zod";

const schema = z.object({
    file: typeof File !== "undefined"
      ? z.instanceof(File, { message: "Invalid file" })
          .refine((file) => file.size <= 20 * 1024 * 1024, {
            message: "File must be less than 20MB",
          })
      : z.any(),
  });

export default function UploadForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;

    // validate file
    const validationResult = schema.safeParse({file});
    if (!validationResult.success) {
      console.log(validationResult.error.flatten().fieldErrors.file?.[0] ?? "Invalid file");
      return;
    }
    // schema validation with zod
    // upload file to uploadthing
    // parse the file with langchain
    // summarize the pdf with ai
    // save the summary to the database
    // redirect to the [id] summary page
  };
  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl ">
      <UploadFormInput onSubmit={handleSubmit} />
    </div>
  );
}
