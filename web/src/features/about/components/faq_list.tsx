"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import FaqItem from './faq_item'
import { FaqItem as FaqEntity } from '@/core/entities'

const DEFAULT_FAQS: FaqEntity[] = [
  {
    question: 'What is your development process?',
    answer:
      'My workflow starts with requirement analysis and layout architecture, followed by iterative development using Next.js/React and TypeScript. I write clean, modular components, set up robust state management, and ensure a seamless integration with backend APIs or headless CMS like Sanity. I also set up automated workflows for deployment.',
  },
  {
    question: 'What technologies do you specialize in?',
    answer:
      'I specialize in the modern TypeScript/JavaScript ecosystem, centering around React, Next.js, Node.js, and Tailwind CSS. I also build headless CMS setups, structure API endpoints, and design databases using PostgreSQL, MongoDB, and Redis.',
  },
  {
    question: 'How do you handle project collaboration and hand-off?',
    answer:
      'I believe in writing self-documenting code, thorough API docs, and clear git history. I use GitHub for version control and task management, Figma for design review, and communicate transparently. When handing off, I ensure the codebase is easily buildable and structured for future scalability.',
  },
  {
    question: 'How do you ensure optimal web performance and SEO?',
    answer:
      'I leverage Server-Side Rendering (SSR), Static Site Generation (SSG), Next.js Image optimization, and optimized font loading to keep Core Web Vitals healthy. I also configure dynamic metadata, check page semantics (HTML5), and implement schema markup to guarantee high search engine rankings.',
  },
  {
    question: 'Are you available for freelance work or remote contract roles?',
    answer:
      'Yes, I am currently open to select freelance projects, long-term agency partnerships, and remote contract roles. Please feel free to share your project scope, tech stack, and timeline via the contact form so we can discuss the details.',
  },
]

interface FaqListProps {
  faqs?: FaqEntity[]
}

export default function FaqList({ faqs = DEFAULT_FAQS }: FaqListProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const faqItems = faqs && faqs.length > 0 ? faqs : DEFAULT_FAQS

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 160 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-[20px] w-full md:w-[70%] pt-12 md:ms-auto"
    >
      {faqItems.map((faq, idx) => (
        <FaqItem
          key={idx}
          question={faq.question}
          answer={faq.answer}
          isOpen={activeIndex === idx}
          onToggle={() => handleToggle(idx)}
        />
      ))}
    </motion.div>
  )
}
