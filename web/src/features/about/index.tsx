import { sanityFetch } from '@/lib/sanity/live'
import { PROFILE_QUERY, EXPERIENCES_QUERY } from '@/lib/sanity/queries'
import { ProfileData, ExperienceData } from '@/core/entities'
import { SkillsList } from './components/skills-list'
import Bounded from '@/components/layout/bounded'
import Heading from '@/components/ui/heading'
import Button from '@/components/ui/button'
import DividerLine from '@/components/ui/divider-line'
import * as motion from 'framer-motion/client'
import { PortableText } from 'next-sanity'
import Image from 'next/image'
import SectionHeader from '@/components/ui/section-header'
import ServicesHoverList from './components/services_hover_list'
import FaqList from './components/faq_list'
import { ExperienceList } from './components/experience-list'

const portableTextComponents = {
  block: {
    normal: ({ children }: any) => (
      <p className="text-lg lg:text-xl font-medium text-black leading-relaxed tracking-tighter mb-4 text-justify">
        {children}
      </p>
    ),
  },
}

export default async function AboutScreen() {
  const [profileResult, experiencesResult] = await Promise.all([
    sanityFetch({ query: PROFILE_QUERY }),
    sanityFetch({ query: EXPERIENCES_QUERY }),
  ])
  const profile = profileResult.data as ProfileData | null
  const experiences = (experiencesResult.data || []) as ExperienceData[]

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
          <div className="-mt-4 lg:-mt-6">
            <Heading tag="h1" animateEntrance={true} className="text-center text-black">
              {lastName}
            </Heading>
          </div>
        </div>
      </Bounded>

      {/* About Intro Section */}
      <Bounded as="section" paddingY="py-20">
        <div className="flex flex-col gap-20">
          {/* Header */}
          <SectionHeader title="about.">
            <Button href={cvUrl}>Read.cv</Button>
          </SectionHeader>

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
            <div className="w-full md:w-[70%] aspect-6/4 bg-[#F5F5F5] overflow-hidden select-none relative">
              <Image
                src={aboutImageUrl}
                alt="Workspace profile"
                fill
                sizes="(max-width: 768px) 100vw, 70vw"
                className="object-cover"
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

      {/* Services Section */}
      <Bounded as="section" paddingY="py-20">
        <div className="flex flex-col gap-[30px]">
          <SectionHeader title="services." />
          <ServicesHoverList services={profile?.services} />
        </div>
      </Bounded>

      {/* Long Bio Section (Rich text) */}
      {profile?.longBio && profile.longBio.length > 0 && (
        <Bounded as="section" paddingY="py-20">
          <div className="flex flex-col gap-[30px]">
            <SectionHeader title="biography." />
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-justify max-w-[800px] ms-auto"
            >
              <PortableText value={profile.longBio} components={portableTextComponents} />
            </motion.div>
          </div>
        </Bounded>
      )}

      {/* Experience Section */}
      {experiences && experiences.length > 0 && (
        <Bounded as="section" paddingY="py-20">
          <div className="flex flex-col gap-[30px]">
            <SectionHeader title="experience." />
            <ExperienceList experiences={experiences} />
          </div>
        </Bounded>
      )}

      {/* Skills Groups Section */}
      {profile?.skillsGroups && profile.skillsGroups.length > 0 && (
        <Bounded as="section" paddingY="py-20">
          <div className="flex flex-col gap-[30px]">
            <SectionHeader title="skills." />
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <SkillsList skillsGroups={profile.skillsGroups as any[]} />
            </motion.div>
          </div>
        </Bounded>
      )}

      {/* FAQs Section */}
      <Bounded as="section" paddingY="py-20">
        <div className="flex flex-col gap-[30px]">
          <SectionHeader title="FAQs." />
          <FaqList faqs={profile?.faqs} />
        </div>
      </Bounded>
    </div>
  )
}
