import React from 'react'
import { Button } from '../ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function CTASection() {
  return (
   <section className='bg-gray-50 py-12'>
    <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className='flex flex-col items-center justify-center space-y-4 text-center'>
            <div className='space-y-2'>
                <h2 className='text-3xl font-bold  mb-8'>Ready to save hours of time ?</h2>
                <p>Transform lengthy documents into concise summaries with our AI-powered tool. Start summarizing today!</p>
            </div>
        </div>
        <div className='flex flex-col gap-2 min-[400px]:flex-row justify-center'>
        <Button variant={'link'} className="text-white font-bold bg-blue-500 mt-6 text-base sm:text-lg lg:text-xl rounded-lg px-8 sm:px-10 lg:px-12 py-6 sm:py-7 lg:py-8 lg:mt-16 hover:to-slate-900 hover:no-underline shadow-lg transition-all duration-300">
        <Link href={"/#pricing"} className="flex gap-2 items-center justify-center">
        <span>Now it's your turn</span>
        <ArrowRight className="w-6 h-6 animate-pulse" />
        </Link>
      </Button>
        </div>
    </div>
   </section>
  )
}
