import { FileText} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function EmptyStateSummary() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 bg-gray-50 rounded-2xl shadow-md animate-fade-in">
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6 shadow-inner">
        <FileText className="w-10 h-10 text-gray-500" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800">No Summaries Yet</h3>
      <p className="mt-2 text-sm text-gray-600 max-w-xs text-center">
        You haven’t created any summaries. Let’s get you started with your first one!
      </p>
     <Link href={"/upload"}>
     <Button variant="outline" className="mt-6 cursor-pointer hover:bg-blue-500 bg-blue-500 hover:text-white hover:scale-105 transition-all duration-300 font-bold text-white px-6 py-2 shadow hover:shadow-lg">
        Create New Summary
      </Button>
     </Link>
    </div>
  );
}
