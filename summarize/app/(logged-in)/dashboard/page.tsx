import BgGradient from "@/components/common/bg-gradient";
import EmptyStateSummary from "@/components/summaries/empty-state-summary";
import SummaryCard from "@/components/summaries/summary-card";
import { Button } from "@/components/ui/button";
import { getSummaries } from "@/lib/summary";
import { hasReachedUploadLimit } from "@/lib/user";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowRight, Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await currentUser();
  const userId = user?.id;
  if (!userId) {
    redirect("/sign-in");
  }
  const { hasReachedLimit, uploadLimit, uploadCount } =
    await hasReachedUploadLimit(userId);
  const summaries = await getSummaries(userId);
  return (
    <main className="min-h-screen">
      <BgGradient className="from-emerald-200 via-teal-200 to-cyan-200" />
      <div className="container mx-auto flex-col gap-4">
        <div className="px-2 py-12 sm:py-24">
          <div className="flex gap-4 mb-8 justify-between">
            <h1 className="text-4xl font-bold text-center">Your Summaries</h1>

            {!hasReachedLimit && (
              <Button
                variant={"link"}
                className="text-white font-bold bg-blue-500 hover:no-underline hover:scale-105 transition-all duration-300"
              >
                <Link href={"/upload"} className="flex items-center text-white">
                  <Plus className="w-6 h-6 mr-2" />
                  New Summary
                </Link>
              </Button>
            )}
          </div>
          {hasReachedLimit && (
            <div className="mb-6">
              <div className="bg-rose-100 border rounded-lg p-4 text-rose-800">
                <p className="text-sm">
                  You have reached your limit of 5 summaries on basic plan.
                  <Link
                    href={"/pricing"}
                    className="text-rose-500 hover:text-rose-600 underline"
                  >
                    {" "}
                    Upgrade to Pro{" "}
                    <ArrowRight className="w-4 h-4 inline-block" />
                  </Link>
                </p>
              </div>
            </div>
          )}
          {summaries.length === 0 ? (
            <EmptyStateSummary />
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 sm:px-0">
              {summaries.map((summary, index) => (
                <SummaryCard key={index} summary={summary} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
