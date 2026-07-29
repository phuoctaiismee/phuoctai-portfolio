"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { urlFor } from '@/lib/sanity/image'
import Image from 'next/image'
import { cn } from '@/utils/cn'

function getImageDimensions(image: any) {
  const ref = image?.asset?._ref || image?.asset?._id
  if (!ref) return { width: 720, height: 1520 }
  const parts = ref.split('-')
  if (parts.length < 3) return { width: 720, height: 1520 }
  const [wStr, hStr] = parts[2].split('x')
  const width = parseInt(wStr, 10)
  const height = parseInt(hStr, 10)
  if (isNaN(width) || isNaN(height)) return { width: 720, height: 1520 }
  return { width, height }
}

/** Smart gallery grid:
 *  1 image  → full width, aspect-video
 *  2 images → 2 columns, aspect-square each
 *  3 images → 1 full (video) + 2 columns (square)
 *  4 images → 2 columns × 2 rows (square)
 *  5 images → 1 full (video) + 2 columns + 2 columns
 *  Each element animates independently on scroll.
 */
export default function GalleryGrid({
  images,
  alt,
  projectType = 'desktop',
  imageFit = 'cover',
}: {
  images: any[]
  alt: string
  projectType?: 'desktop' | 'mobile'
  imageFit?: 'cover' | 'contain'
}) {
  if (!images || images.length === 0) return null

  const count = images.length
  const ease = [0.16, 1, 0.3, 1] as const

  if (projectType === 'mobile') {
    return (
      <div className="flex flex-wrap justify-center gap-6 md:gap-8 w-full">
        {images.map((image, idx) => {
          const { width, height } = getImageDimensions(image)
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '50px 0px' }}
              transition={{ duration: 1.2, ease, delay: idx * 0.1 }}
              className="w-[calc(50%-12px)] md:w-[calc(33.333%-22px)] lg:w-[calc(25%-24px)] max-w-[220px] md:max-w-[260px] flex-shrink-0 animate-none"
            >
              <div className="relative border-[6px] md:border-[8px] border-black rounded-[20px] md:rounded-[28px] shadow-2xl overflow-hidden bg-black select-none">
                <Image
                  src={urlFor(image).width(720).url()}
                  alt={`${alt} Screenshot ${idx + 1}`}
                  width={width}
                  height={height}
                  className="w-full h-auto block"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  loading="lazy"
                />
              </div>
            </motion.div>
          )
        })}
      </div>
    )
  }

  // Full-width cell → aspect-video
  const SoloCell = ({ image, index, delay = 0 }: { image: any; index: number; delay?: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '50px 0px' }}
      transition={{ duration: 1.2, ease, delay }}
      className="w-full aspect-16/8 bg-[#F5F5F5] overflow-hidden select-none relative"
    >
      <Image
        src={imageFit === 'contain'
          ? urlFor(image).width(1600).url()
          : urlFor(image).width(1600).height(900).url()
        }
        alt={`${alt} ${index + 1}`}
        fill
        sizes="100vw"
        className={cn(
          "w-full h-full",
          imageFit === 'contain' ? 'object-contain' : 'object-cover'
        )}
        loading="lazy"
      />
    </motion.div>
  )

  // Half-width paired cell → aspect-square
  const PairCell = ({ image, index, delay = 0 }: { image: any; index: number; delay?: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '50px 0px' }}
      transition={{ duration: 1.2, ease, delay }}
      className="w-full aspect-square bg-[#F5F5F5] overflow-hidden select-none relative"
    >
      <Image
        src={imageFit === 'contain'
          ? urlFor(image).width(1200).url()
          : urlFor(image).width(1200).height(1200).url()
        }
        alt={`${alt} ${index + 1}`}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className={cn(
          "w-full h-full",
          imageFit === 'contain' ? 'object-contain' : 'object-cover'
        )}
        loading="lazy"
      />
    </motion.div>
  )

  // Row of 2 paired cells — left animates first, right staggers by 0.1s
  const PairRow = ({ left, right, leftIdx, rightIdx, baseDelay = 0 }: {
    left: any; right: any; leftIdx: number; rightIdx: number; baseDelay?: number
  }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
      <PairCell image={left} index={leftIdx} delay={baseDelay} />
      <PairCell image={right} index={rightIdx} delay={baseDelay + 0.1} />
    </div>
  )

  if (count === 1) {
    return <SoloCell image={images[0]} index={0} />
  }

  if (count === 2) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
        <PairCell image={images[0]} index={0} delay={0} />
        <PairCell image={images[1]} index={1} delay={0.1} />
      </div>
    )
  }

  if (count === 3) {
    return (
      <div className="flex flex-col gap-[20px]">
        <SoloCell image={images[0]} index={0} delay={0} />
        <PairRow left={images[1]} right={images[2]} leftIdx={1} rightIdx={2} baseDelay={0} />
      </div>
    )
  }

  if (count === 4) {
    return (
      <div className="flex flex-col gap-[20px]">
        <PairRow left={images[0]} right={images[1]} leftIdx={0} rightIdx={1} baseDelay={0} />
        <PairRow left={images[2]} right={images[3]} leftIdx={2} rightIdx={3} baseDelay={0} />
      </div>
    )
  }

  // 5+ images: 1 full-width → remaining in pairs
  const rows: React.ReactNode[] = []
  let i = 0
  rows.push(<SoloCell key="solo-0" image={images[i]} index={i} delay={0} />)
  i++
  while (i < images.length) {
    const pair = images.slice(i, i + 2)
    const rowKey = `row-${i}`
    if (pair.length === 2) {
      rows.push(
        <PairRow
          key={rowKey}
          left={pair[0]}
          right={pair[1]}
          leftIdx={i}
          rightIdx={i + 1}
          baseDelay={0}
        />
      )
    } else {
      // Trailing odd image → solo video ratio
      rows.push(<SoloCell key={rowKey} image={pair[0]} index={i} delay={0} />)
    }
    i += 2
  }

  return <div className="flex flex-col gap-[20px]">{rows}</div>
}
