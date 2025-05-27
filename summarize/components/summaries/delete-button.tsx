import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DeleteButton() {
    return (
        <Button variant={"destructive"} size={"icon"} className="absolute top-2 right-2 hover:bg-gray-400 cursor-pointer">
            <Trash className="w-4 h-4" />
        </Button>
    )
}
