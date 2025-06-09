"use client";

import { z } from "zod";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";
import {
  generatePdfSummary,
  storePdfSummaryAction,
} from "@/actions/upload-actions";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import UploadFormInput from "./upload-form-input";

const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid File" })
    .refine((file) => file.size <= 24 * 1024 * 1024, {
      message: "File size must be less than 20MB",
    })
    .refine((file) => file.type.startsWith("application/pdf"), {
      message: "File must be a PDF",
    }),
});

export default function UploadForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoadiing, setIsLoading] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const router = useRouter();

  const { startUpload, routeConfig } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      console.log("uploaded successfully!");
    },
    onUploadError: (err) => {
      console.error("error occurred while uploading", err);
      toast.error("Error occured while uploading", {
        description: err.message,
      });
    },
    onUploadBegin: (fileName) => {
      console.warn("upload has begun for", fileName);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setIsLoading(true);
      e.preventDefault();
      console.log("Submit");

      const formData = new FormData(e.currentTarget);
      const file = formData.get("file") as File;

      const validatedFields = schema.safeParse({ file });
      console.log(validatedFields);

      if (!validatedFields.success) {
        toast.error("❌ Something went wrong", {
          description:
            validatedFields.error.flatten().fieldErrors.file?.[0] ??
            "Invalid File",
        });
        setIsLoading(false);
        return;
      }

      toast.info("📄 Processing PDF...", {
        description: `Hang Tight, AI is reading through your doc ✨`,
      });


      const uploadResponse = await startUpload([file]);
      if (!uploadResponse || uploadResponse.length === 0) {
        toast.error("❌ Something went wrong", {
          description: "Please use a different file",
        });
        setIsLoading(false);
        return;
      }
      console.log("Uploaded Successfully", file.name);
      toast.success("📄 Uploading PDF...", {
        description: `We are uploading your doc!`,
      });

       const uploadFileUrl = uploadResponse[0].serverData.fileUrl;

      const result = await generatePdfSummary({
        fileUrl: uploadResponse[0].serverData.fileUrl,
        fileName: file.name,
      });
      console.log(summary);

      const { data = null, message = null } = result || {};
      if (data) {
        let storeResult : any;
        toast.success("✅ Saving PDF...", {
          description: `Hang tight, we are saving the summary`,
        });

        if (data.summary) {
          storeResult = await storePdfSummaryAction({
            summary: data.summary,
            fileUrl:uploadFileUrl,
            title: data.title || "PDF Summary",
            fileName: file.name,
          });
          toast.success("✨ Summary Generated!", {
            description: `Your PDF has been successfully summarized and saved!`,
          });
          setSummary(data.summary);
          formRef.current?.reset();
          // redirect to the [:id] summary page.
          router.push(`/summaries/${storeResult.data?.id}`);
        }
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      formRef.current?.reset();
      toast.error("❌ Something went wrong", {
        description: "Please try again later",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput
        isLoading={isLoadiing}
        ref={formRef}
        onSubmit={handleSubmit}
      />
    </div>
  );
}