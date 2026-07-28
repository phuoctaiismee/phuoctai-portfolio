import React from 'react'
import { cn } from '@/utils/cn'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({ title, subtitle, align = 'left', className }: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'mb-12 flex flex-col gap-3',
        {
          'items-start text-left': align === 'left',
          'items-center text-center': align === 'center',
        },
        className
      )}
    >
      <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
        {title}
      </h2>
      {subtitle && (
        <p className="text-zinc-600 dark:text-zinc-400 text-lg max-w-2xl">
          {subtitle}
        </p>
      )}
      <div className="h-1.5 w-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mt-1" />
    </div>
  )
}
