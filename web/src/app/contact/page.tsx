import { type Metadata } from 'next'
import { sanityFetch } from '@/lib/sanity/live'
import { PROFILE_QUERY } from '@/lib/sanity/queries'
import { ProfileData } from '@/core/entities'
import Heading from '@/components/ui/heading'
import EmailCopy from '@/components/shared/email-copy'
import { ContactForm } from '@/features/contact/components/contact-form'
import Bounded from '@/components/layout/bounded'
import * as motion from 'framer-motion/client'

export const metadata: Metadata = {
  title: 'Contact | PhuocTai Portfolio',
  description: "Get in touch with PhuocTai — available for freelance projects, collaborations, and opportunities.",
}

export default async function ContactPage() {
  const result = await sanityFetch({ query: PROFILE_QUERY })
  const profile = result.data as ProfileData | null
  const email = profile?.email || 'imphuoctai@gmail.com'

  return (
    <div className="bg-white">
      {/* Hero Title */}
      <Bounded
        as="section"
        paddingY="pt-[120px] pb-[130px]"
        className="overflow-hidden text-left"
      >
        <Heading
          tag="h1"
          animateEntrance={true}
          className="text-black font-semibold uppercase leading-[0.9] tracking-tighter"
        >
          SHOOT A <br /> REQUEST
        </Heading>
      </Bounded>

      {/* Main Contact Section */}
      <Bounded as="section" paddingY="pb-[160px]">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-[60px] xl:gap-[100px] items-start"
        >
          {/* Left Column: Email Address Copy Area (2/5 columns) */}
          <div className="lg:col-span-2">
            <EmailCopy emailAddress={email} />
          </div>

          {/* Right Column: Contact Form (3/5 columns) */}
          <div className="lg:col-span-3 w-full">
            <ContactForm email={email} />
          </div>
        </motion.div>
      </Bounded>
    </div>
  )
}
