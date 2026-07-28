"use client"

import { useState } from 'react'

type EmailCopyProps = {
  emailAddress?: string
  className?: string
}

export default function EmailCopy({
  emailAddress = 'kthuytrang606@gmail.com',
  className = '',
}: EmailCopyProps) {
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <div className={`flex flex-col items-start gap-[20px] ${className}`}>
      <button
        onClick={handleCopyEmail}
        data-cursor-text={copied ? 'Copied' : 'Copy'}
        className="flex items-center gap-[12px] text-2xl font-medium text-black cursor-pointer group hover:opacity-75 transition-opacity"
      >
        <span>{emailAddress}</span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="square"
          strokeLinejoin="miter"
          className="group-hover:translate-x-1 transition-transform"
        >
          <rect x="9" y="9" width="12" height="12" />
          <path d="M5 15H3V3h12v2" />
        </svg>
      </button>
    </div>
  )
}
