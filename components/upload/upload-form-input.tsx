"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { cn } from "../../lib/utils";
import { Loader2Icon } from "lucide-react";
import React, { FormEvent, RefObject } from "react";

interface UploadFormInputProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  ref: RefObject<HTMLFormElement>;
}

const UploadFormInput = React.forwardRef<
  HTMLFormElement,
  Omit<UploadFormInputProps, "ref">
>(({ onSubmit, isLoading }, ref) => {
  return (
    <form ref={ref} className="flex flex-col gap-6" onSubmit={onSubmit}>
      <div className="flex items-center justify-end gap-1.5">
        <Input
          type="file"
          id="file"
          name="file"
          accept="application/pdf"
          required
          className={cn(isLoading && "cursor-not-allowed opacity-50")}
          disabled={isLoading}
        />
        <Button
          disabled={isLoading}
          className="bg-blue-600 hover:cursor-pointer hover:bg-blue-700"
        >
          {isLoading ? (
            <>
              <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Upload Your Pdf"
          )}
        </Button>
      </div>
    </form>
  );
});

UploadFormInput.displayName = "UploadFormInput";

export default UploadFormInput;
