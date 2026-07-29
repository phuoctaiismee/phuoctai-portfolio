import React from 'react'
import * as motion from 'framer-motion/client'
import { cn } from '@/utils/cn'

type SectionHeaderProps = {
  title: string
  children?: React.ReactNode // For optional right-aligned elements (like Buttons or badges)
  className?: string
}

export default function SectionHeader({ title, children, className }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 160 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '100px 0px' }}
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "flex items-end justify-between pb-2 border-b border-[#F5F5F5]",
        className
      )}
    >
      <h2 className="text-[19px] md:text-[24px] xl:text-[30px] font-medium tracking-[-0.03em] text-black">
        {title}
      </h2>
      {children}
    </motion.div>
  )
}
