import Link from "next/link"; 
import { Card } from "../ui/card";
import DeleteButton from "./delete-button";
import { FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { formatFileName } from "@/lib/utils";

const SummaryHeader = ({fileUrl, title, createdAt}:
    {fileUrl: string, title: string, createdAt: string}
) => {
    return (
        <div className="flex items-start gap-2  sm:gap-4">
            <FileText className="w-6 h-6 text-blue-500 mt-1" />
            <div className="flex-1 min-w-0">
            <h3 className="text-base xl:text-lg font-semibold text-gray-900 truncate w-4/5">{title || formatFileName(fileUrl)}</h3>
            <p className="text-sm text-gray-500">{formatDistanceToNow(new Date(createdAt), {addSuffix: true})}</p>
            </div>
        </div>
    )
}

const StatusBadge = ({status}: {status: string}) => {
    return (
        <span className={cn("inline-flex items-center px-3 py-1 text-sm font-medium rounded-full capitalize", status === "completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800")}>
            {status}
        </span>
    )
}


export default function SummaryCard({ summary }: { summary: any }) {
    return (
        <div>
            <Card className="relative h-full">
                <div className="absolute top-2 right-2">
                    <DeleteButton summaryId={summary.id} />
                </div>
                <Link className="block p-4 sm:p-6" href={`/summaries/${summary.id}}`}>
                <div className="flex flex-col gap-3 sm:gap-4">
                <h3 className="text-base xl:text-lg font-semibold text-gray-900 truncate w-4/5"><SummaryHeader fileUrl={summary.orignal_file_url} title={summary.title} createdAt={summary.created_at} /></h3>
                <p className="text-sm text-gray-500">{summary.summary_text}</p>

                <div className="flex justify-between items-center mt-2">
                    <StatusBadge status={summary.status} />
                </div>
                </div>
               </Link>
            </Card>
        </div>
    )
}
