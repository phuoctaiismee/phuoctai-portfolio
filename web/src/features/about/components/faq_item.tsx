"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/utils/cn'

type FaqItemProps = {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}

export default function FaqItem({
  question,
  answer,
  isOpen,
  onToggle,
}: FaqItemProps) {
  return (
    <div className="bg-[#F5F5F5] overflow-hidden select-none w-full">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-[30px] text-left cursor-pointer"
      >
        <span className="text-base md:text-lg font-medium text-black">
          {question}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={cn(
            "w-6 h-6 text-black transition-transform duration-500 ease-[0.16,1,0.3,1]",
            isOpen ? "rotate-45" : "rotate-0"
          )}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="p-[30px] pt-2 text-sm md:text-base text-black leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
