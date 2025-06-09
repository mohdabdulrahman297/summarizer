import Link from "next/link";
import { Button } from "../ui/button";
import { Badge, Calendar, ChevronLeft, Clock, Sparkles } from "lucide-react";

export default function SummaryHeader({
  title,
  createdAt,
  readingTime,
}: {
  title: string;
  createdAt: string;
  readingTime: string;
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-4 items-center justify-between">
      {/* Added items-center for vertical alignment */}
      <div className="space-y-10">
        <div className="inline-flex flex-wrap items-center text-blue-500 mt-6 px-4 py-2">
          <Button className="px-6 text-blue-700 border border-blue-300 rounded-full hover:shadow-md hover:bg-white cursor-pointer bg-white">
            <Sparkles className="h-4 w-4 mr-1.5 text-blue-500" />
            <span className="text-blue-700">AI summary</span>
          </Button>
          <div className="flex items-center mt-2 sm:mt-0">
            <Calendar className="h-4 w-4 ml-5" />
            <span className="text-sm sm:text-base ml-1">
              {new Date(createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center mt-2 sm:mt-0">
            <Clock className="h-4 w-4 ml-5 mr-1 text-blue-500" />
            <span className="text-sm sm:text-base">{readingTime} min read</span>
          </div>
        </div>
      </div>
      <div>
        <Link href={"/dashboard"}>
          <Button
            variant={"link"}
            size="sm"
            className="group flex items-center gap-1 sm:gap-2 mt-6 hover:no-underline cursor-pointer hover:bg-blue-500 bg-blue-500 hover:text-white hover:scale-105 transition-all duration-300 font-bold text-white px-6 py-2 shadow hover:shadow-lg"
          >
            <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 text-white group-hover:translate-x-0.5 transition-transform" />
            Back <span className="hidden sm:inline">to Dashboard</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
