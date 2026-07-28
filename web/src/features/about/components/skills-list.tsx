import React from 'react'
import { cn } from '@/utils/cn'

interface SkillGroup {
  _key: string
  category: string
  skills: string[]
}

interface SkillsListProps {
  skillsGroups: SkillGroup[]
  className?: string
}

export function SkillsList({ skillsGroups, className }: SkillsListProps) {
  return (
    <div className={cn('grid grid-cols-1 sm:grid-cols-2 gap-8', className)}>
      {skillsGroups.map((group) => (
        <div
          key={group._key}
          className="bg-[#F5F5F5] border border-[#EAEAEA] rounded-none p-6 hover:bg-black hover:text-white transition-all duration-300 group"
        >
          <h3 className="text-sm font-semibold uppercase tracking-widest text-[#808080] group-hover:text-[#B3B3B3] mb-4 transition-colors">
            {group.category}
          </h3>
          <div className="flex flex-wrap gap-2">
            {group.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 bg-white border border-[#EAEAEA] text-black text-sm rounded-none group-hover:bg-[#333] group-hover:border-[#444] group-hover:text-white transition-all duration-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
