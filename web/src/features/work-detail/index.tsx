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
import Image from 'next/image'
import SectionHeader from '@/components/ui/section-header'

const portableTextComponents = {
  block: {
    normal: ({ children }: any) => (
      <p className="text-lg lg:text-xl font-medium text-black leading-tight tracking-tighter mb-6 last:mb-0">
        {children}
      </p>
    ),
    h1: ({ children }: any) => (
      <h1 className="text-3xl lg:text-4xl font-bold text-black mt-8 mb-4 tracking-tighter">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl lg:text-3xl font-bold text-black mt-6 mb-3 tracking-tighter">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl lg:text-2xl font-semibold text-black mt-4 mb-2 tracking-tighter">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-lg lg:text-xl font-semibold text-black mt-3 mb-2 tracking-tighter">
        {children}
      </h4>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-black pl-4 italic my-4 text-gray-700">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc pl-6 my-4 space-y-2 text-lg lg:text-xl font-medium text-black leading-tight tracking-tighter">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal pl-6 my-4 space-y-2 text-lg lg:text-xl font-medium text-black leading-tight tracking-tighter">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="text-lg lg:text-xl font-medium text-black leading-tight tracking-tighter">
        {children}
      </li>
    ),
    number: ({ children }: any) => (
      <li className="text-lg lg:text-xl font-medium text-black leading-tight tracking-tighter">
        {children}
      </li>
    ),
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-bold text-black">{children}</strong>,
    em: ({ children }: any) => <em className="italic">{children}</em>,
    code: ({ children }: any) => (
      <code className="bg-[#F5F5F5] text-black px-1.5 py-0.5 rounded font-mono text-sm">
        {children}
      </code>
    ),
    link: ({ value, children }: any) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="text-black underline underline-offset-4 hover:opacity-75 transition-opacity font-semibold"
        >
          {children}
        </a>
      )
    },
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
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.08,
                delayChildren: 0.6,
              },
            },
          }}
          initial="hidden"
          animate="visible"
          className="flex flex-row flex-wrap lg:flex-col gap-x-8 gap-y-4 lg:gap-2 text-left lg:text-right lg:-mb-32 lg:-mt-10 z-10"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
              },
            }}
          >
            <span className="text-base uppercase text-[#B3B3B3] block">
              Industry
            </span>
            <span className="text-lg uppercase font-medium text-black block">
              {work.industry || '—'}
            </span>
          </motion.div>

          {work.client && (
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                },
              }}
            >
              <span className="text-base uppercase text-[#B3B3B3] block">
                Client
              </span>
              <span className="text-lg uppercase font-medium text-black block">
                {work.client}
              </span>
            </motion.div>
          )}

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
              },
            }}
          >
            <span className="text-base uppercase text-[#B3B3B3] block">
              Year
            </span>
            <span className="text-lg uppercase font-medium text-black block">
              {work.year || '—'}
            </span>
          </motion.div>

          {work.experience && (
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                },
              }}
            >
              <span className="text-base uppercase text-[#B3B3B3] block">
                Position
              </span>
              <span className="text-lg uppercase font-medium text-black block">
                {work.experience}
              </span>
            </motion.div>
          )}

          {work.skills && work.skills.length > 0 && (
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className="max-w-[200px] lg:ms-auto"
            >
              <span className="text-base uppercase text-[#B3B3B3] block">
                Tech Stack
              </span>
              <div className="flex flex-wrap gap-1 justify-start lg:justify-end mt-1">
                {work.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs uppercase bg-[#F5F5F5] text-black hover:bg-black hover:text-white transition-colors duration-300 px-2.5 py-1.5 font-semibold"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
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
          <div className="w-full md:w-[50%] h-[300px] md:h-[475px] bg-[#F5F5F5] overflow-hidden select-none flex items-center justify-center relative">
            {work.coverImage ? (
              <Image
                src={urlFor(work.coverImage).width(1000).url()}
                alt={work.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
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
        <SectionHeader title="about.">
          <div className="flex flex-wrap gap-4">
            {[
              { url: work.liveLink, label: 'See It Live' },
              { url: work.appStoreLink, label: 'App Store' },
              { url: work.playStoreLink, label: 'Google Play' },
              { url: work.githubLink, label: 'GitHub' },
              { url: work.figmaLink, label: 'Figma' },
            ]
              .filter((link) => link.url)
              .map((link, idx) => (
                <Button
                  key={link.url}
                  href={link.url}
                  className={idx === 0 ? 'bg-black text-white hover:bg-[#333]' : ''}
                >
                  {link.label}
                </Button>
              ))}
          </div>
        </SectionHeader>

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
            <GalleryGrid images={work.aboutGallery as any[]} alt="About gallery image" projectType={work.projectType} />
          )}
        </div>
      </section>

      {/* 2. CHALLENGE SECTION (CONDITIONAL) */}
      {work.challengeRichText && (
        <section className="flex flex-col w-full gap-[30px] py-12">
          <SectionHeader title="challenge." />

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
              <GalleryGrid images={work.challengeGallery as any[]} alt="Challenge gallery image" imageFit="contain" />
            )}
          </div>
        </section>
      )}

      {/* 3. RESULTS SECTION (CONDITIONAL) */}
      {work.resultRichText && (
        <section className="flex flex-col w-full gap-[30px] py-12">
          <SectionHeader title="results." />

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
              <GalleryGrid images={work.resultGallery as any[]} alt="Result gallery image" imageFit='contain' />
            )}
          </div>
        </section>
      )}

      {/* 4. TESTIMONIAL SECTION (CONDITIONAL) */}
      {work.testimonialQuote && (
        <section className="flex flex-col w-full gap-[30px] py-12">
          <SectionHeader title="testimonial." />

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
                <div className="w-[80px] h-[80px] rounded-full overflow-hidden relative select-none">
                  <Image
                    src={urlFor(work.testimonialAuthorAvatar)
                      .width(160)
                      .height(160)
                      .url()}
                    alt={work.testimonialAuthorName || 'Author'}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
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
