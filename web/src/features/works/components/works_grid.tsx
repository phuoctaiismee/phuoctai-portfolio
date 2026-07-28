"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import ProjectCard from '@/components/shared/project-card'
import Button from '@/components/ui/button'
import { WorkItem } from '@/core/entities'

type WorksGridProps = {
  initialWorks: WorkItem[]
}

export default function WorksGrid({ initialWorks }: WorksGridProps) {
  const [visibleCount, setVisibleCount] = useState(4)

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4)
  }

  const visibleWorks = initialWorks.slice(0, visibleCount)
  const hasMore = initialWorks.length > visibleCount

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-[40px]"
    >
      {/* Top right label & Grid header */}
      <div className="flex items-end justify-between">
        <div></div>
        <motion.h5
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-[19px] md:text-[24px] xl:text-[30px] font-medium tracking-[-0.03em] text-black">
          projects 2024 - {new Date().getFullYear()}
        </motion.h5>
      </div>

      {initialWorks.length === 0 ? (
        <div className="py-[100px] text-center border border-dashed border-[#E0E0E0]">
          <p className="text-[16px] xl:text-[20px] text-[#808080]">
            No projects found in the archive.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
          {visibleWorks.map((work, index) => (
            <motion.div
              key={work._id}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
            >
              <ProjectCard work={work as any} />
            </motion.div>
          ))}
        </div>
      )}

      {/* Pagination Load More Button at bottom right of grid */}
      {hasMore && (
        <div className="flex justify-end mt-[20px]">
          <Button onClick={handleLoadMore} className="font-semibold text-[16px] xl:text-[20px]">
            Load More
          </Button>
        </div>
      )}
    </motion.div>
  )
}
