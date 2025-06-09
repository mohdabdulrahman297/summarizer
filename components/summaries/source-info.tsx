import { ExternalLink, FileText } from "lucide-react";
import { Button } from "../ui/button";
import { DownloadButtonSummary } from "./download-button";

export default function SourceInfo({
  file_name,
  originalFileUrl,
  title,
  summaryText,
  createdAt,
}: {
  file_name: string;
  originalFileUrl?: string;
  title?: string;
  summaryText?: string;
  createdAt?: string;
}) {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-6 p-4 border rounded-lg shadow-sm bg-white text-sm text-muted-foreground">
      <div className="flex items-center gap-2">
        <FileText className="h-5 w-5 text-blue-500" />
        <span className="font-semibold text-blue-600">Source: {file_name}</span>
      </div>
      <div className="flex gap-4">
        <Button
          variant="link"
          className="text-blue-500 hover:no-underline cursor pointer flex items-center gap-2"
          asChild
        >
          <a
            href={originalFileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <ExternalLink className="h-5 w-5" />
            <span>View Original File</span>
          </a>
        </Button>
        <DownloadButtonSummary
          title={title}
          summaryText={summaryText}
          file_name={file_name}
          createdAt={createdAt}
        />
      </div>
    </div>
  );
}
