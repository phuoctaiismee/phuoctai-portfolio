import Bounded from '@/components/layout/bounded'
import Heading from '@/components/ui/heading'
import * as motion from 'framer-motion/client'
import { sanityFetch } from '@/lib/sanity/live'
import { PROFILE_QUERY, FEATURED_WORKS_QUERY } from '@/lib/sanity/queries'
import { ProfileData, WorkItem } from '@/core/entities'
import Button from '@/components/ui/button'
import EmailCopy from '@/components/shared/email-copy'
import ProjectCard from '@/components/shared/project-card'

const HomeScreen = async () => {
  const [worksResult, profileResult] = await Promise.all([
    sanityFetch({ query: FEATURED_WORKS_QUERY, params: { limit: 4 } }),
    sanityFetch({ query: PROFILE_QUERY }),
  ])

  const works = (worksResult.data || []) as WorkItem[]
  const profile = profileResult.data as ProfileData | null

  const firstName = profile?.firstName || 'PHUOC'
  const lastName = profile?.lastName || 'TAI'
  const email = profile?.email || 'imphuoctai@gmail.com'
  const avatarUrl = profile?.avatarUrl || '/default-avatar.png'
  const shortBio =
    profile?.shortBio ||
    "Full-stack developer with a passion for building innovative and user-friendly web applications. Let's collaborate!"
  const aboutStatement =
    profile?.aboutStatement ||
    'I build high-performance web applications and scalable cloud systems, specialized in modern React ecosystems, Node.js and system design.'
  const aboutImageUrl = profile?.aboutImageUrl || '/default-avatar.png'
  const aboutDescription =
    profile?.aboutDescription ||
    "I'm dedicated to crafting clean code, optimizing performance, and building functional architectures that seamlessly align with technical needs and user requirements."

  return (
    <Bounded className="space-y-8 lg:space-y-16 py-8 lg:pt-16 lg:pb-32 bg-white">
      <div className="flex flex-col-reverse gap-4 lg:flex-row items-start justify-between mb-10">
        <div className="flex flex-col">
          <Heading tag="h1" animateEntrance={true} className="text-left text-black">
            {firstName}
          </Heading>
          <Heading tag="h1" animateEntrance={true} delay={0.15} className="text-left leading-normal -mt-12 text-black">
            {lastName}
          </Heading>
        </div>
        <motion.img
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          src={avatarUrl}
          alt={`${firstName} ${lastName}`}
          className="size-28 lg:size-40 object-cover rounded-full overflow-hidden select-none"
        />
      </div>

      {/* Hero Intro */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start justify-between mb-16">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full lg:w-auto"
        >
          <EmailCopy emailAddress={email} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full lg:max-w-2xl"
        >
          <p className="text-[28px] lg:text-[38px] font-medium leading-tight tracking-tighter text-left lg:text-right text-black">
            {shortBio}
          </p>
        </motion.div>
      </div>

      <hr className="border-t border-[#F5F5F5]" />

      {/* Featured Works Section */}
      <section className="flex flex-col gap-[30px]">
        <motion.div
          initial={{ opacity: 0, y: 160 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '100px 0px' }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-end justify-between pb-2"
        >
          <h2 className="text-[19px] md:text-[24px] xl:text-[30px] font-medium tracking-[-0.03em] text-black">
            work.
          </h2>
          {works.length > 0 && <Button href="/works">Show More</Button>}
        </motion.div>

        {works.length === 0 ? (
          <div className="py-[80px] text-center border border-dashed border-[#E0E0E0]">
            <p className="text-[16px] xl:text-[20px] text-[#808080] mb-[20px]">
              No projects added yet.
            </p>
            <Button href="/works">Go to Archive</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
            {works.map((work, index) => (
              <motion.div
                initial={{ opacity: 0, y: 160 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '100px 0px' }}
                transition={{
                  duration: 1.4,
                  ease: [0.16, 1, 0.3, 1],
                  delay: index * 0.1,
                }}
                key={work._id}
              >
                <ProjectCard work={work as any} aspectRatio="aspect-square" />
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <hr className="border-t border-[#F5F5F5]" />

      {/* About Section */}
      <section className="flex flex-col gap-[30px]">
        <motion.div
          initial={{ opacity: 0, y: 160 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '100px 0px' }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-end justify-between pb-2"
        >
          <h2 className="text-[19px] md:text-[24px] xl:text-[30px] font-medium tracking-[-0.03em] text-black">
            about.
          </h2>
          <Button href="/about">Show More</Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 160 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '100px 0px' }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-[40px] lg:text-[48px] font-medium leading-tight tracking-tighter max-w-[750px] text-black"
        >
          {aboutStatement}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mx-auto mt-12 w-full">
          <motion.img
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            src={aboutImageUrl}
            alt="About workspace"
            className="w-[500px] aspect-4/3 object-cover overflow-hidden select-none"
          />
          <motion.p
            initial={{ opacity: 0, y: 160 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '100px 0px' }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg max-w-[350px] lg:text-xl font-medium leading-tight tracking-tighter text-black"
          >
            {aboutDescription}
          </motion.p>
        </div>
      </section>
    </Bounded>
  )
}

export default HomeScreen