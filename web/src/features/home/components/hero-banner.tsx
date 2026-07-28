import React from 'react'
import Link from 'next/link'
import Button from '@/components/ui/button'

interface HeroBannerProps {
  greeting: string
  name: string
  headline: string
  subHeadline: string
  primaryCta?: string
  secondaryCta?: string
  avatarUrl?: string
}

export function HeroBanner({
  greeting,
  name,
  headline,
  subHeadline,
  primaryCta = 'View My Work',
  secondaryCta = 'Contact Me',
  avatarUrl,
}: HeroBannerProps) {
  return (
    <section className="relative overflow-hidden bg-zinc-950 py-24 px-6 md:py-32">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
        <div className="flex-1 flex flex-col gap-6 text-center md:text-left">
          <span className="text-indigo-400 font-semibold tracking-wider text-sm uppercase">
            {greeting}
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
            {name}
          </h1>
          <p className="text-xl sm:text-2xl font-medium bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            {headline}
          </p>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto md:mx-0 leading-relaxed">
            {subHeadline}
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center md:justify-start mt-4">
            <Link href="/works">
              <Button variant="primary" size="lg">
                {primaryCta}
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="border-zinc-800 text-white hover:bg-zinc-900">
                {secondaryCta}
              </Button>
            </Link>
          </div>
        </div>

        {avatarUrl && (
          <div className="flex-1 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur-sm opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt" />
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-2 border-zinc-900 bg-zinc-900">
                <img
                  src={avatarUrl}
                  alt={name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
