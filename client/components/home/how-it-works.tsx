import { BrainCircuit, FileOutput, FileText, MoveRight } from "lucide-react";
import React, { ReactNode } from "react";

type Step = {
  icon: ReactNode;
  label: string;
  description: string;
};

const steps: Step[] = [
  {
    icon: <FileText size={64} strokeWidth={1.5} />,
    label: "Upload your PDF",
    description: "Drag and drop your PDF file here or click to upload",
  },
  {
    icon: <BrainCircuit size={64} strokeWidth={1.5} />,
    label: "AI analysis",
    description: "Our advanced AI analyzes the uploaded PDF and generates a summary",
  },
  {
    icon: <FileOutput size={64} strokeWidth={1.5} />,
    label: "get your summary",
    description: "Receive your summary in a neatly formatted document",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-gray-50">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl">
        <div
          className="relative left-[calc(50%-3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-linear-to-br from-emerald-500 via-teal-500 to-cyan-500 opacity-20 sm:left-[calc(40%-30rem)] sm:w-[40.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
        </div>

        <div className="text-center">
          <h2 className="font-bold text-xl uppercase mb-4 text-blue-600">How it works</h2>
          <h3 className="font-bold text-3xl max-w-2xl mx-auto mb-16">
            Summarize is a simple AI powered tool that allows you to summarize
            text in three simple steps.
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3  gap-4 max-w-6xl mx-auto relative">
          {steps.map((step, index) => (
           <div className="relative flex items-stretch" key={index}>
             <StepItem  {...step} />
             {  index < steps.length - 1 && (
             <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
             <MoveRight size={32} strokeWidth={1} className="text-blue-500"></MoveRight>
             </div>
             )}
          </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StepItem({ icon, label, description }: Step) {
  return (
    <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-xs border border-white/10 hover:border-blue-600/5 transition-colors group w-full ">
      <div className="flex flex-col gap-4 h-full">
        <div className="flex items-center justify-center h-24 w-24 mx-auto rounded-2xl bg-linear-to-br from-blue-500/10 to-transparent group-hover:from-blue-500/20 transition-colors">
        <div className="text-blue-500">{icon}</div>
        </div>
        <div className="flex flex-col flex-1 gap-1 justify-between">
        <h4 className="text-lg font-bold text-center">{label}</h4>
        <p className="text-sm text-center text-gray-800">{description}</p>
        </div>
      </div>
      
    </div>
  );
}
