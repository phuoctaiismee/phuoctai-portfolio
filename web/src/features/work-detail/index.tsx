import React from 'react'
import { notFound } from 'next/navigation'
import { sanityFetch } from '@/lib/sanity/live'
import { WORK_DETAIL_QUERY, RELATED_WORKS_QUERY } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import { PortableText } from 'next-sanity'
import ProjectCard from '@/components/shared/project-card'
import Button from '@/components/ui/button'
import * as motion from 'framer-motion/client'
import GalleryGrid from './components/gallery_grid'
import Bounded from '@/components/layout/bounded'
import { CaseStudyDetail, WorkItem } from '@/core/entities'

const portableTextComponents = {
  block: {
    normal: ({ children }: any) => (
      <p className="text-lg lg:text-xl font-medium text-black leading-tight tracking-tighter">
        {children}
      </p>
    ),
  },
}

type Props = {
  params: Promise<{ slug: string }>
}

export default async function WorkDetailPage({ params }: Props) {
  const { slug } = await params

  const [workResult, relatedResult] = await Promise.all([
    sanityFetch({ query: WORK_DETAIL_QUERY, params: { slug } }),
    sanityFetch({ query: RELATED_WORKS_QUERY, params: { slug, limit: 2 } }),
  ])

  const work = workResult.data as CaseStudyDetail | null
  const relatedWorks = (relatedResult.data || []) as WorkItem[]

  if (!work) {
    return notFound()
  }

  return (
    <Bounded className="bg-white">
      {/* 100vh Hero Area */}
      <section
        className="min-h-screen flex flex-col justify-end relative
        pt-[80px] pb-[80px]
        md:pb-[60px]
        xl:pb-[80px]"
      >
        {/* Metadata in top right */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
          className="flex flex-row flex-wrap lg:flex-col gap-x-8 gap-y-4 lg:gap-2 text-left lg:text-right lg:-mb-32 lg:-mt-10 z-10"
        >
          <div>
            <span className="text-base uppercase text-[#B3B3B3] block">
              Industry
            </span>
            <motion.span
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.20 }}
              className="text-lg uppercase font-medium text-black block">
              {work.industry || '—'}
            </motion.span>
          </div>
          {work.client && (
            <div>
              <span className="text-base uppercase text-[#B3B3B3] block">
                Client
              </span>
              <motion.span
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.40 }}
                className="text-lg uppercase font-medium text-black block">
                {work.client}
              </motion.span>
            </div>
          )}
          <div>
            <span className="text-base uppercase text-[#B3B3B3] block">
              Year
            </span>
            <motion.span
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.60 }}
              className="text-lg uppercase font-medium text-black block">
              {work.year || '—'}
            </motion.span>
          </div>
          {work.experience && (
            <div>
              <span className="text-base uppercase text-[#B3B3B3] block">
                Position
              </span>
              <motion.span
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.80 }}
                className="text-lg uppercase font-medium text-black block">
                {work.experience}
              </motion.span>
            </div>
          )}
          {work.skills && work.skills.length > 0 && (
            <div className="max-w-[200px] lg:ms-auto">
              <span className="text-base uppercase text-[#B3B3B3] block">
                Tech Stack
              </span>
              <div className="flex flex-wrap gap-1 justify-start lg:justify-end mt-1">
                {work.skills.map((skill) => (
                  <span key={skill} className="text-xs uppercase bg-[#F5F5F5] text-black px-1.5 py-0.5 font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Main Cover & Title Layout */}
        <motion.div
          initial={{ opacity: 0, y: 175 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex flex-col md:flex-row items-start md:items-end gap-[40px] xl:gap-[70px] mt-12 lg:mt-0"
        >
          {/* Cover image left */}
          <div className="w-full md:w-[50%] h-[300px] md:h-[475px] bg-[#F5F5F5] overflow-hidden select-none">
            {work.coverImage ? (
              <img
                src={urlFor(work.coverImage).width(1000).height(800).url()}
                alt={work.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[16px] xl:text-[20px] text-[#B3B3B3]">
                No Cover Image
              </div>
            )}
          </div>

          {/* Large title right */}
          <div className="w-full md:w-[50%] text-left">
            <h2 className="text-[40px] md:text-[56px] xl:text-[100px] font-bold leading-tight tracking-tighter text-black capitalize">
              {work.title}
            </h2>
          </div>
        </motion.div>
      </section>

      {/* Case Study Sections */}

      {/* 1. ABOUT SECTION */}
      <section className="flex flex-col w-full gap-[30px] py-12">
        <motion.div
          initial={{ opacity: 0, y: 160 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '100px 0px' }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-end justify-between pb-2 border-b border-[#F5F5F5]"
        >
          <h2 className="text-[19px] md:text-[24px] xl:text-[30px] font-medium tracking-[-0.03em]">about.</h2>
          <div className="flex gap-4">
            {work.githubLink && (
              <Button href={work.githubLink} className="bg-black text-white hover:bg-[#333]">
                GitHub
              </Button>
            )}
            {work.liveLink && (
              <Button href={work.liveLink}>See It Live</Button>
            )}
          </div>
        </motion.div>

        <div className="w-full flex flex-col gap-[40px]">
          {work.aboutRichText && (
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '50px 0px' }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-justify max-w-[800px] ms-auto"
            >
              <PortableText
                value={work.aboutRichText}
                components={portableTextComponents}
              />
            </motion.div>
          )}
          {work.aboutGallery && work.aboutGallery.length > 0 && (
            <GalleryGrid images={work.aboutGallery as any[]} alt="About gallery image" />
          )}
        </div>
      </section>

      {/* 2. CHALLENGE SECTION (CONDITIONAL) */}
      {work.challengeRichText && (
        <section className="flex flex-col w-full gap-[30px] py-12">
          <motion.div
            initial={{ opacity: 0, y: 160 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '100px 0px' }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-end justify-between pb-2 border-b border-[#F5F5F5]"
          >
            <h2 className="text-[19px] md:text-[24px] xl:text-[30px] font-medium tracking-[-0.03em]">challenge.</h2>
          </motion.div>

          <div className="w-full flex flex-col gap-[40px]">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '50px 0px' }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-justify max-w-[800px] ms-auto"
            >
              <PortableText
                value={work.challengeRichText}
                components={portableTextComponents}
              />
            </motion.div>
            {work.challengeGallery && work.challengeGallery.length > 0 && (
              <GalleryGrid images={work.challengeGallery as any[]} alt="Challenge gallery image" />
            )}
          </div>
        </section>
      )}

      {/* 3. RESULTS SECTION (CONDITIONAL) */}
      {work.resultRichText && (
        <section className="flex flex-col w-full gap-[30px] py-12">
          <motion.div
            initial={{ opacity: 0, y: 160 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '100px 0px' }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-end justify-between pb-2 border-b border-[#F5F5F5]"
          >
            <h2 className="text-[19px] md:text-[24px] xl:text-[30px] font-medium tracking-[-0.03em]">results.</h2>
          </motion.div>

          <div className="w-full flex flex-col gap-[40px]">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '50px 0px' }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-justify max-w-[800px] ms-auto"
            >
              <PortableText
                value={work.resultRichText}
                components={portableTextComponents}
              />
            </motion.div>
            {work.resultGallery && work.resultGallery.length > 0 && (
              <GalleryGrid images={work.resultGallery as any[]} alt="Result gallery image" />
            )}
          </div>
        </section>
      )}

      {/* 4. TESTIMONIAL SECTION (CONDITIONAL) */}
      {work.testimonialQuote && (
        <section className="flex flex-col w-full gap-[30px] py-12">
          <motion.div
            initial={{ opacity: 0, y: 160 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '100px 0px' }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-end justify-between pb-2 border-b border-[#F5F5F5]"
          >
            <h2 className="text-[19px] md:text-[24px] xl:text-[30px] font-medium tracking-[-0.03em]">testimonial.</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 160 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex flex-col items-center justify-center text-center gap-[40px] py-[40px]"
          >
            {/* Quote Icon SVG */}
            <svg
              width="54"
              height="54"
              viewBox="0 0 54 54"
              fill="none"
              className="text-black"
            >
              <path
                d="M11.25 36H18V29.25H11.25V18H22.5V6.75H11.25C8.767 6.75 6.75 8.767 6.75 11.25V31.5C6.75 33.983 8.767 36 11.25 36ZM38.25 36H45V29.25H38.25V18H49.5V6.75H38.25C35.767 6.75 33.75 8.767 33.75 11.25V31.5C33.75 33.983 35.767 36 38.25 36Z"
                fill="currentColor"
              />
            </svg>

            <blockquote className="text-2xl md:text-[40px] xl:text-[50px] font-medium leading-tight tracking-tighter text-black max-w-full lg:max-w-[75%]">
              &ldquo;{work.testimonialQuote}&rdquo;
            </blockquote>

            {/* Author Row */}
            <div className="flex flex-row items-center gap-4">
              {work.testimonialAuthorAvatar ? (
                <img
                  src={urlFor(work.testimonialAuthorAvatar)
                    .width(160)
                    .height(160)
                    .url()}
                  alt={work.testimonialAuthorName || 'Author'}
                  className="w-[80px] h-[80px] rounded-full object-cover select-none"
                />
              ) : (
                <div className="w-[80px] h-[80px] rounded-full bg-[#F5F5F5] flex items-center justify-center text-[16px] xl:text-[20px] text-[#B3B3B3]">
                  —
                </div>
              )}
              <div className='flex flex-col gap-1 items-start'>
                <cite className="not-italic font-medium text-3xl text-black block text-left">
                  {work.testimonialAuthorName}
                </cite>
                <span className="text-xl text-[#808080] tracking-wider block text-left">
                  {work.testimonialAuthorRole}
                </span>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* MORE TO EXPLORE */}
      {relatedWorks && relatedWorks.length > 0 && (
        <section className="flex flex-col w-full gap-[30px] py-12">
          <motion.div
            initial={{ opacity: 0, y: 160 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '100px 0px' }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-end justify-between pb-2 border-b border-[#F5F5F5]"
          >
            <h2 className="text-[19px] md:text-[24px] xl:text-[30px] font-medium tracking-[-0.03em]">more to explore.</h2>
            <Button href="/works">Show More</Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 160 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 gap-[20px]"
          >
            {relatedWorks.map((rw) => (
              <ProjectCard
                key={rw._id}
                work={rw}
                aspectRatio="aspect-[4/3]"
              />
            ))}
          </motion.div>
        </section>
      )}
    </Bounded>
  )
}
