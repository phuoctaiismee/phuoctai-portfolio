"use client"

import { motion } from 'framer-motion'
import Button from '@/components/ui/button'
import StatusDot from '@/components/ui/status_dot'
import { ProfileData, AppSettingsData } from '@/core/entities'

interface FooterBarProps {
  profile?: ProfileData | null
  appSettings?: AppSettingsData | null
}

export default function FooterBar({ profile, appSettings }: FooterBarProps) {
  // Social links fallback
  const defaultSocials = [
    { platformName: 'LinkedIn', url: 'https://linkedin.com' },
    { platformName: 'GitHub', url: 'https://github.com' },
  ]
  const socialLinks =
    appSettings?.socialLinks && appSettings.socialLinks.length > 0
      ? appSettings.socialLinks
      : defaultSocials

  // Content configuration with dynamic fallbacks
  const footerCta =
    appSettings?.footerCta ||
    'Curious about what we can create together? Let’s bring something extraordinary to life!'
  const isAvailable = appSettings?.isAvailable ?? true
  const availabilityText = appSettings?.availabilityText || 'Available For Work'
  const phoneNumber = appSettings?.phoneNumber || '+84 999 999 999'
  const email = profile?.email || 'imphuoctai@gmail.com'
  const copyrightName =
    appSettings?.copyrightName ||
    profile?.displayName ||
    'PHUOC TAI'

  return (
    <footer
      className="fixed bottom-0 left-0 w-full h-screen bg-black text-white z-0
      p-[20px] md:p-[30px] xl:px-[80px] xl:py-16 flex flex-col justify-between"
    >
      {/* Top Section: Social Links */}
      <div className="flex items-center justify-end gap-8 text-base font-medium select-none">
        {socialLinks.map((social: { platformName: string; url: string }) => (
          <a
            key={social.platformName}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-60 transition-opacity"
          >
            {social.platformName}
          </a>
        ))}
      </div>

      {/* Center Section: Editorial CTA & Button */}
      <div className="max-w-[1100px] flex flex-col gap-[40px] items-start my-auto">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl lg:text-5xl bg-gradient-to-r from-white to-transparent bg-clip-text text-transparent font-medium leading-tight"
        >
          {footerCta}
        </motion.h2>

        <div className="flex items-center gap-8">
          <Button
            href="/contact"
            className="bg-white text-black hover:bg-transparent hover:text-white border border-white px-[40px] py-[20px]"
          >
            Get in Touch
          </Button>
          <div className="flex items-center gap-[12px] select-none">
            <StatusDot active={isAvailable} />
            <span className="text-base font-medium tracking-wider text-white">
              {availabilityText}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Section: Availability, Contact, & Copyright */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-[30px] border-t border-[#333333] pt-[30px]">
        {/* Contact Info */}
        <div className="flex flex-col gap-1.5 text-base text-white font-medium">
          <a href={`tel:${phoneNumber.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">
            {phoneNumber}
          </a>
          <a href={`mailto:${email}`} className="hover:text-white transition-colors">
            {email}
          </a>
        </div>

        {/* Copyright */}
        <div className="text-base text-white font-medium leading-loose">
          © {new Date().getFullYear()} {copyrightName.toUpperCase()} <br /> All Rights Reserved.
        </div>
      </div>
    </footer>
  )
}
