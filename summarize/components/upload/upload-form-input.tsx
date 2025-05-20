"use client";

import React from 'react'

import { Button } from '../ui/button'
import { Input } from '../ui/input'
interface UploadFormInputProps {
    onSubmitAction: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function UploadFormInput({onSubmitAction}: UploadFormInputProps) {
  return (
    <form className='flex flex-col gap-6' onSubmit={onSubmitAction}>
    <div className='flex justify-end items-center gap-2'>
    <Input id='file' name='file' accept='application/pdf' required type='file' className='' />
    <Button>Upload your PDF</Button>
    </div>
  </form>
  )
}
