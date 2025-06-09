import BgGradient from "@/components/common/bg-gradient";
import SourceInfo from "@/components/summaries/source-info";
import SummaryHeader from "@/components/summaries/summary-header";
import { SummaryViewer } from "@/components/summaries/summary-viewer";
import { getSummaryId } from "@/lib/summary";
import { FileText } from "lucide-react";
import { notFound } from "next/navigation";

export default async function SummaryPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const id = params.id;
  const cleanId = decodeURIComponent(params.id).replace(/[^\w-]/g, "");
  const summary = await getSummaryId(cleanId);
  if (!summary) {
    notFound();
  }

  const { title, summary_text, file_name, word_count, created_at } = summary;

  const readingTime = Math.ceil((word_count || 0) / 200).toLocaleString();

  return (
    <div className="relative isolate min-h-screen bg-linear-to-b from-rose-50/40 to-white">
      <BgGradient className="from-blue-500 via-blue-300 to-green-200" />

      <div className="container mx-auto flex flex-col gap-4">
        <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-12 lg:py-24">
          <div className="flex flex-col">
            <SummaryHeader
              title={title}
              createdAt={created_at}
              readingTime={readingTime}
            />
          </div>
          <SourceInfo
            file_name={file_name}
            originalFileUrl={summary.original_file_url}
            title={title}
            summaryText={summary_text}
            createdAt={created_at}
          />
          <div className="relative mt-4 sm:mt-8 lg:mt-16">
            <div
              className="relative p-4 sm:p-6 lg:p-8
        bg-white/80 backdrop-blur-md rounded-2xl
        sm:rounded-3xl shadow-xl border border-rose-100/30
        transition-all duration-300 hover:shadow-2xl
        hover:bg-white/90 max-w-4xl mx-auto"
            >
              <div
                className="absolute inset-0
          bg-gradient-to-br from-rose-50/50 via-orange-50/30
          to-transparent opacity-50 rounded-2xl
          sm:rounded-3xl"
              />
              <div
                className="absolute top-2 sm:top-4
          right-2 sm:right-4 flex items-center gap-1.5
          sm:gap-2 text-xs sm:text-sm
          text-muted-foreground bg-white/90 px-2 sm:px-3
          py-1 sm:py-1.5 rounded-full shadow-xs"
              >
                <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500" />
                {word_count?.toLocaleString()} words
              </div>

              <div className="relative mt-8 sm:mt-6 flex justify-center">
                <SummaryViewer summary={summary.summary_text} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
