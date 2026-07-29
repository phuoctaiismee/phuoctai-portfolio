"use client"

import { ExperienceData } from '@/core/entities'
import { PortableText } from 'next-sanity'
import * as motion from 'framer-motion/client'

const portableTextComponents = {
  block: {
    normal: ({ children }: any) => (
      <p className="text-base text-black/70 mb-2 leading-relaxed last:mb-0 text-justify">
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc pl-5 my-2 space-y-1 text-base text-black/70 text-justify">
        {children}
      </ul>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => <li>{children}</li>,
  },
}

function formatDate(dateStr: string) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short' }
  return date.toLocaleDateString('en-US', options)
}

export function ExperienceList({ experiences }: { experiences: ExperienceData[] }) {
  return (
    <div className="flex flex-col gap-12 w-full pt-10">
      {experiences.map((exp, idx) => {
        const start = formatDate(exp.startDate)
        const end = exp.currentJob ? 'Present' : formatDate(exp.endDate || '')

        return (
          <motion.div
            key={exp._id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: idx * 0.1 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 pb-12 border-b border-[#EAEAEA] last:border-0 last:pb-0"
          >
            {/* Left side: Role & Company & Dates */}
            <div className="lg:col-span-4 flex flex-col justify-start">
              <h3 className="text-xl md:text-2xl font-bold text-black tracking-tighter leading-tight">
                {exp.role}
              </h3>
              <p className="text-lg font-semibold text-black/60 tracking-tight mt-1">
                {exp.companyName}
              </p>
              {exp.location && (
                <p className="text-sm font-medium text-black/40 mt-1">
                  {exp.location}
                </p>
              )}
              <p className="text-sm font-semibold text-black/40 mt-3 uppercase tracking-wider">
                {start} — {end}
              </p>
            </div>

            {/* Right side: Description & Tech tags */}
            <div className="lg:col-span-8 flex flex-col justify-start">
              <div>
                <PortableText value={exp.description} components={portableTextComponents} />
              </div>
              {exp.techStack && exp.techStack.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {exp.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs uppercase bg-[#F5F5F5] text-black px-2.5 py-1.5 font-semibold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
