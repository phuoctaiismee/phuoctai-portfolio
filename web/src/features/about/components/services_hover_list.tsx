'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ServiceItem } from '@/core/entities'
import Image from 'next/image'
import { cn } from '@/utils/cn'

const DEFAULT_SERVICES: ServiceItem[] = [
  {
    name: 'Web Development',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Mobile Apps',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'UI&UX Design',
    image: 'https://images.unsplash.com/photo-1581291518655-9523c932dedf?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'API & Integrations',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'SEO Optimization',
    image: 'https://images.unsplash.com/photo-1597852074816-d933c7d2b988?auto=format&fit=crop&w=800&q=80',
  },
]

const ASPECT_RATIO_W = 3.5
const ASPECT_RATIO_H = 4

const getRotate = (index: number) => (index % 2 === 0 ? 8 : -8)

const slideUpVariant = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: index * 0.1,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
}

interface ServicesHoverListProps {
  services?: ServiceItem[]
}

export default function ServicesHoverList({ services = DEFAULT_SERVICES }: ServicesHoverListProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [displayIndex, setDisplayIndex] = useState(0)

  // Dynamic Image Dimensions
  const [imgW, setImgW] = useState(450)
  const imgH = imgW * (ASPECT_RATIO_H / ASPECT_RATIO_W)

  const containerRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLLIElement | null)[]>([])

  const rawY = useMotionValue(0)
  const springY = useSpring(rawY, { stiffness: 500, damping: 38, mass: 0.6 })

  useEffect(() => {
    const updateSize = () => {
      if (typeof window !== 'undefined') {
        const calculatedW = Math.min(450, window.innerWidth * 0.65)
        setImgW(calculatedW)
      }
    }

    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  const handleEnter = (index: number) => {
    const container = containerRef.current
    const item = itemRefs.current[index]
    if (container && item) {
      const cRect = container.getBoundingClientRect()
      const iRect = item.getBoundingClientRect()
      const centerY = iRect.top - cRect.top + iRect.height / 2 - imgH / 2
      rawY.set(centerY)
    }
    setDisplayIndex(index)
    setHoveredIndex(index)
  }

  const handleLeave = () => setHoveredIndex(null)

  const activeServices = services && services.length > 0 ? services : DEFAULT_SERVICES
  const service = activeServices[displayIndex] || activeServices[0]

  return (
    <div ref={containerRef} className="relative select-none py-8">
      {/* Floating Image */}
      {service && (
        <motion.div
          animate={{
            opacity: hoveredIndex !== null ? 1 : 0,
            scale: hoveredIndex !== null ? 1 : 0.93,
            rotate: getRotate(displayIndex),
          }}
          transition={{
            opacity: { duration: 0.18, ease: 'easeOut' },
            scale: { duration: 0.18, ease: 'easeOut' },
            rotate: { duration: 0.22, ease: 'easeOut' },
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            marginLeft: -imgW / 2,
            width: imgW,
            y: springY,
            zIndex: 11,
            pointerEvents: 'none',
          }}
        >
          <div
            className="overflow-hidden shadow-2xl transition-all duration-200 relative"
            style={{ aspectRatio: `${ASPECT_RATIO_W}/${ASPECT_RATIO_H}` }}
          >
            <Image
              src={service.image}
              alt={service.name}
              fill
              sizes="(max-width: 768px) 100vw, 450px"
              className="w-full h-full object-cover"
              unoptimized={service.image.startsWith('https://images.unsplash.com')} // Unsplash doesn't need Next.js image loader errors if domain not configured, or we can configure it. Actually, Unsplash domain is not in remotePatterns so we can set unoptimized for fallback Unsplash links to be safe!
            />
          </div>
        </motion.div>
      )}

      {/* Service list */}
      <ul className="relative flex flex-col items-center text-center">
        {activeServices.map((svc, index) => {
          const isHovered = hoveredIndex === index

          return (
            <motion.li
              key={svc.name}
              ref={(el) => {
                itemRefs.current[index] = el
              }}
              custom={index}
              variants={slideUpVariant as any}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              onMouseEnter={() => handleEnter(index)}
              onMouseLeave={handleLeave}
              className={cn(
                "relative w-fit cursor-default flex justify-center py-1",
                isHovered ? "z-20" : "z-10"
              )}
            >
              <motion.span
                animate={{
                  opacity: hoveredIndex === null ? 1 : isHovered ? 1 : 0.05,
                }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                className="block text-[clamp(2.2rem,5.5vw,5.2rem)] font-bold italic leading-none tracking-tighter text-black uppercase"
              >
                {svc.name}
              </motion.span>
            </motion.li>
          )
        })}
      </ul>
    </div>
  )
}
