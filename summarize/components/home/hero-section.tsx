import React from "react";
import { Button } from "../ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { MotionDiv, MotionH1, MotionH2, MotionSection, MotionSpan } from "../common/motion-wrapper";
import { containerVariants, itemVariants } from "@/utils/constraints";
import { scale } from "motion/react";

const buttonVariants = {
  scale: 1.05,
  hover: {
    scale: 1.1, 
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
  tap: {
    scale: 0.95,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

export default function HeroSection() {
  return (
    <MotionSection variants={containerVariants} initial="hidden" animate="visible" className="relative mx-auto flex flex-col z-0 items-center justify-center py-16 sm:py-20 lg:pb-28 transition-all animate-in lg:px-12 max-w-7xl">
     
        <MotionDiv variants={itemVariants} className="relative p-[1px] overflow-hidden rounded-full bg-gradient-to-r from-blue-50 via-blue-500 to-purple-500 animate-gradient-x-group">
          <Badge variant={'secondary'} className="relative px-6 py-2 text-base font-medium bg-white rounded-full group-hover:bg-gray-300 transition-colors duration-200">
          <Sparkles className="w-6 h-6 mr-2 text-blue-500 animate-pulse" />
          <p className="text-base text-blue-500">Powerful AI Summarizer</p>
          </Badge>
        </MotionDiv>
     

      <MotionH1 className="font-bold py-6 text-center text-4xl">Summarize your PDFs with {' '}
        <span className="relative inline-block">
          <span className="relative z-10 px-2">Artifical Intelligence</span>
          <span className="absolute inset-0 bg-blue-200/50 -rotate-2 rounded-lg transform -skew-y-1" aria-hidden="true"></span>

        </span>{' '}
      </MotionH1>
      <MotionH2 variants={itemVariants} className="text-lg sm:text-xl lg:text-2xl text-center px-4 lg:px-0 lg:max-w-4xl text-gray-600">Get a summary of your PDF in seconds</MotionH2>
      <MotionDiv variants={itemVariants} whileHover={buttonVariants}>
      <Button variant={'link'} className="text-white font-bold bg-gradient-to-r from-blue-500 to-purple-500 mt-6 text-base sm:text-lg lg:text-xl rounded-lg px-8 sm:px-10 lg:px-12 py-6 sm:py-7 lg:py-8 lg:mt-16 hover:to-slate-900 hover:no-underline shadow-lg transition-all duration-300">
        <Link href={"/#pricing"} className="flex gap-2 items-center">
        <MotionSpan>Get Started</MotionSpan>
        <ArrowRight className="w-6 h-6 animate-pulse" />
        </Link>
      </Button>
      </MotionDiv>
    </MotionSection>
  );
}
