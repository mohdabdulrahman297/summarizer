"use client";

import { Trash, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useState, useTransition } from "react";
import { deleteSummaryAction } from "../../actions/summary-actions";
import { toast } from "sonner";
interface DeleteButtonProps {
  summaryId: string;
}

export default function DeleteButton({ summaryId }: DeleteButtonProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    startTransition(async () => {
      const result = await deleteSummaryAction(summaryId);
      if (result?.success) {
        toast.success(result.message);
      } else {
        toast.error(result?.message || "Failed to delete summary");
      }
      setOpen(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"destructive"}
          size={"icon"}
          className="absolute top-2 right-2 hover:bg-gray-400 cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Summary</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this summary?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={handleDelete}
            variant={"destructive"}
            size={"icon"}
            className=" hover:bg-gray-400 cursor-pointer px-12
           py-2"
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
          <Button
            variant={"outline"}
            size={"icon"}
            className=" hover:bg-gray-400 cursor-pointer px-12
           py-2"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
