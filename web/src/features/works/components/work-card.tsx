import React from 'react'
import Link from 'next/link'
import { cn } from '@/utils/cn'

interface WorkCardProps {
  slug: string
  title: string
  excerpt: string
  mainImageUrl?: string
  mainImageAlt?: string
  techStack?: string[]
  githubLink?: string
  liveLink?: string
  featured?: boolean
  completionDate?: string
  className?: string
}

export function WorkCard({
  slug,
  title,
  excerpt,
  mainImageUrl,
  mainImageAlt,
  techStack,
  githubLink,
  liveLink,
  featured,
  completionDate,
  className,
}: WorkCardProps) {
  const formattedDate = completionDate
    ? new Date(completionDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
      })
    : null

  return (
    <article
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300',
        className
      )}
    >
      {featured && (
        <div className="absolute top-4 right-4 z-10">
          <span className="px-2.5 py-1 text-xs font-semibold bg-indigo-500 text-white rounded-full shadow-lg">
            Featured
          </span>
        </div>
      )}

      {mainImageUrl && (
        <div className="relative aspect-video overflow-hidden bg-zinc-800">
          <img
            src={mainImageUrl}
            alt={mainImageAlt || title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 via-transparent to-transparent" />
        </div>
      )}

      <div className="flex flex-1 flex-col p-6 gap-4">
        <div className="flex items-start justify-between gap-2">
          <h2 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
            <Link href={`/works/${slug}`} className="after:absolute after:inset-0">
              {title}
            </Link>
          </h2>
          {formattedDate && (
            <span className="text-xs text-zinc-500 whitespace-nowrap mt-1">{formattedDate}</span>
          )}
        </div>

        <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2 flex-1">{excerpt}</p>

        {techStack && techStack.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {techStack.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 bg-zinc-800 text-zinc-400 text-xs rounded-md border border-zinc-700"
              >
                {tech}
              </span>
            ))}
            {techStack.length > 5 && (
              <span className="px-2.5 py-1 bg-zinc-800 text-zinc-500 text-xs rounded-md border border-zinc-700">
                +{techStack.length - 5} more
              </span>
            )}
          </div>
        )}

        {(githubLink || liveLink) && (
          <div className="flex items-center gap-4 pt-2 border-t border-zinc-800">
            {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors z-10 relative"
                onClick={(e) => e.stopPropagation()}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
            )}
            {liveLink && (
              <a
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-indigo-400 transition-colors z-10 relative"
                onClick={(e) => e.stopPropagation()}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Live Demo
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  )
}
