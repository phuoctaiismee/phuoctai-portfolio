import { type Metadata } from 'next'
import { sanityFetch } from '@/lib/sanity/live'
import { PROFILE_QUERY } from '@/lib/sanity/queries'
import { ProfileData } from '@/core/entities'
import { SkillsList } from '@/features/about/components/skills-list'
import Bounded from '@/components/layout/bounded'
import Heading from '@/components/ui/heading'
import Button from '@/components/ui/button'
import DividerLine from '@/components/ui/divider-line'
import * as motion from 'framer-motion/client'
import { PortableText } from 'next-sanity'

export const metadata: Metadata = {
  title: 'About | PhuocTai Portfolio',
  description: "Learn more about PhuocTai — software engineer, background, experience, and skills.",
}

const portableTextComponents = {
  block: {
    normal: ({ children }: any) => (
      <p className="text-lg lg:text-xl font-medium text-black leading-relaxed tracking-tighter mb-4 text-justify">
        {children}
      </p>
    ),
  },
}

export default async function AboutPage() {
  const profileResult = await sanityFetch({ query: PROFILE_QUERY })
  const profile = profileResult.data as ProfileData | null

  const firstName = profile?.firstName || 'PHUOC'
  const lastName = profile?.lastName || 'TAI'
  const cvUrl = profile?.cvUrl || '#'
  const statement =
    profile?.aboutStatement ||
    'I build high-performance web applications and scalable cloud systems, specialized in modern React ecosystems, Node.js and system design.'
  const aboutImageUrl = profile?.aboutImageUrl || '/default-avatar.png'
  const aboutDescription =
    profile?.aboutDescription ||
    "I'm dedicated to crafting clean code, optimizing performance, and building functional architectures that seamlessly align with technical needs and user requirements."

  return (
    <div className="bg-white pb-[100px]">
      {/* Hero Section */}
      <Bounded
        as="section"
        paddingY="py-24"
        className="flex items-center justify-center overflow-hidden text-center"
      >
        <div>
          <Heading tag="h1" animateEntrance={true} className="text-center text-black">
            {firstName}
          </Heading>
          <Heading tag="h1" animateEntrance={true} className="text-center text-black -mt-6">
            {lastName}
          </Heading>
        </div>
      </Bounded>

      {/* About Intro Section */}
      <Bounded as="section" paddingY="py-20">
        <div className="flex flex-col gap-20">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 160 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '100px 0px' }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-end justify-between pb-2 border-b border-[#F5F5F5]"
          >
            <h2 className="text-[19px] md:text-[24px] xl:text-[30px] font-medium tracking-[-0.03em] text-black">
              about.
            </h2>
            <Button href={cvUrl}>Read.cv</Button>
          </motion.div>

          {/* Statement */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '50px 0px' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-[759px]"
          >
            <p className="text-[28px] md:text-[40px] xl:text-[50px] font-medium leading-[1.1] tracking-[-0.06em] text-black">
              {statement}
            </p>
          </motion.div>

          {/* Media row */}
          <motion.div
            initial={{ opacity: 0, y: 160 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row gap-[40px] md:gap-[90px] items-center w-full"
          >
            <div className="w-full md:w-[70%] aspect-6/4 bg-[#F5F5F5] overflow-hidden select-none">
              <img
                src={aboutImageUrl}
                alt="Workspace profile"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="w-full md:w-[30%]">
              <p className="text-xl font-medium text-black leading-tight">
                {aboutDescription}
              </p>
            </div>
          </motion.div>
        </div>
      </Bounded>

      {/* Divider */}
      <Bounded>
        <DividerLine />
      </Bounded>

      {/* Long Bio Section (Rich text) */}
      {profile?.longBio && profile.longBio.length > 0 && (
        <Bounded as="section" paddingY="py-20">
          <div className="flex flex-col md:flex-row gap-8 justify-between">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full md:w-[30%] shrink-0"
            >
              <h3 className="text-[19px] md:text-[24px] xl:text-[30px] font-medium tracking-[-0.03em] uppercase text-black">
                biography.
              </h3>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="w-full md:w-[65%]"
            >
              <PortableText value={profile.longBio} components={portableTextComponents} />
            </motion.div>
          </div>
        </Bounded>
      )}

      {/* Divider */}
      {profile?.longBio && profile.longBio.length > 0 && (
        <Bounded>
          <DividerLine />
        </Bounded>
      )}

      {/* Skills Groups Section */}
      {profile?.skillsGroups && profile.skillsGroups.length > 0 && (
        <Bounded as="section" paddingY="py-20">
          <div className="flex flex-col md:flex-row gap-8 justify-between">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full md:w-[30%] shrink-0"
            >
              <h3 className="text-[19px] md:text-[24px] xl:text-[30px] font-medium tracking-[-0.03em] uppercase text-black">
                skills.
              </h3>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="w-full md:w-[65%]"
            >
              <SkillsList skillsGroups={profile.skillsGroups as any[]} />
            </motion.div>
          </div>
        </Bounded>
      )}
    </div>
  )
}
