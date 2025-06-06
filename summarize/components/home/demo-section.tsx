import { Pizza } from "lucide-react";
import { SummaryViewer } from "../summaries/summary-viewer";
import { MotionDiv, MotionH3 } from "../common/motion-wrapper";

const DEMO_SUMMARY = `# Sample PDF Summary
This summary provides a clear and concise overview of a sample PDF document. It distills the essential information to help readers quickly grasp the key themes and insights without reading the full document.

## Key Highlights
- Focuses on the role of strategic communication in professional settings.
- Covers techniques for crafting impactful messages across different platforms.
- Emphasizes clarity, brevity, and audience awareness in business writing.
- Identifies common communication barriers and how to overcome them.
- Provides actionable tips to improve collaboration through better messaging.

## Summary Insights
The document underscores the necessity of communication as a core business skill. It explains how targeted messaging improves teamwork, decision-making, and customer relations. It also outlines methods for evaluating the effectiveness of communication strategies.

## Conclusion
This summary captures the essence of the original PDF, highlighting the importance of communication in achieving organizational goals. By focusing on key points and actionable insights, it offers a fast-track understanding of the content’s value.`;


export default function DemoSection() {
    return (
      <section className="relative">
        <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className="flex flex-col items-center text-center space-y-4">
            <div className="inline-flex items-center justify-center rounded-full bg-gray-100/80 backdrop-blur-sm border border-gray-700/20 mb-4">
            <Pizza className="w-6 h-6 text-blue-500" />
            </div>
            <div className="text-center mb-16">
            <MotionH3
              className="text-3xl font-bold max-w-2xl mx-auto px-4 sm:px-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}>
                Watch how it converts a PDF into a{' '}
                <span className="bg-linear-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">consice summary</span>{' '}
            </MotionH3>
            </div>
            <p className="text-gray-600">
                This is a demo of Summarize. It is a simple demo that
                converts a PDF into a consice summary.
            </p>
            <MotionDiv initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}>
              <SummaryViewer summary={DEMO_SUMMARY}/>
            </MotionDiv>
        </div>
        </div>
      </section>
    );
  }