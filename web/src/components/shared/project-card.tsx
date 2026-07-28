import Link from 'next/link'
import { WorkItem } from '@/core/entities'
import { urlFor } from '@/lib/sanity/image'

type ProjectCardProps = {
  work: WorkItem
  aspectRatio?: string
  className?: string
}

export default function ProjectCard({
  work,
  aspectRatio = 'aspect-square',
  className = '',
}: ProjectCardProps) {
  return (
    <Link
      href={`/works/${work.slug}`}
      className={`group relative block w-full overflow-hidden bg-[#F5F5F5] select-none ${aspectRatio} ${className}`}
    >
      {work.coverImage ? (
        <img
          src={urlFor(work.coverImage).width(800).height(600).url()}
          alt={work.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-110"
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-[16px] xl:text-[20px] text-[#B3B3B3]">
          No Image
        </div>
      )}
      {/* Hover dark overlay */}
      <div className="absolute inset-0 bg-black/0 transition-colors duration-[600ms] ease-out group-hover:bg-black/50" />

      {/* Title at the bottom of the card */}
      <div className="absolute bottom-[30px] left-[30px] right-[30px] translate-y-[20px] opacity-0 transition-all duration-[600ms] ease-out group-hover:translate-y-0 group-hover:opacity-100">
        {work.industry && (
          <span className="text-[12px] uppercase tracking-wider text-[#B3B3B3] block mb-1">
            {work.industry} {work.year ? `• ${work.year}` : ''}
          </span>
        )}
        <h3 className="text-white text-[19px] md:text-[24px] xl:text-[30px] font-medium tracking-[-0.03em]">{work.title}</h3>
      </div>
    </Link>
  )
}
