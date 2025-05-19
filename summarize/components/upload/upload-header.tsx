import { Sparkles } from 'lucide-react'
import React from 'react'

export default function UploadHeader() {
  return (

      <div className='flex flex-col items-center justify-center gap-6 text-center'>
          <div className='relative px-6 py-2 text-blue-500 font-medium bg-white rounded-full group-hover:bg-gray-50 transition-colors flex items-center'>
            <Sparkles className='h-6 w-6 mr-2 text-blue-500 animate-pulse' />
            <span className='text-blue-500'>AI-Powered content creation</span>
          </div>
          <h1 className="font-bold py-6 text-center text-4xl">Start Uploading {' '}
        <span className="relative inline-block">
          <span className="relative z-10 px-2">Your PDF's</span>
          <span className="absolute inset-0 bg-blue-200/50 -rotate-2 rounded-lg transform -skew-y-1" aria-hidden="true"></span>

        </span>{' '}
      </h1>
          <p className='mt-6 text-lg leading-8 text-gray-600'>
            Upload your PDF and let our AI summarize it for you.
          </p>
        </div>
  )
}
