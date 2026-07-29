"use client"

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, Variants } from 'framer-motion'

const menuContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
}

const menuItemVariants: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    x: -40,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
}

interface NavigationBarProps {
  navLinks?: Array<{
    label: string
    href: string
  }>
  logoText?: string
  copyrightName?: string
}

export default function NavigationBar({
  navLinks: customNavLinks,
  logoText: customLogoText,
  copyrightName: customCopyrightName,
}: NavigationBarProps) {
  const [isOpen, setIsOpen] = useState(false)

  const defaultNavLinks = [
    { href: '/works', label: 'Works' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  const links = customNavLinks && customNavLinks.length > 0 ? customNavLinks : defaultNavLinks
  const logoText = customLogoText || 'REIN'
  const copyrightName = customCopyrightName || 'PHUOC TAI'

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <>
      <nav
        className="w-full z-50 h-20 px-[20px] lg:px-[40px] flex items-center justify-between"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href="/"
            className="font-bold text-[28px] tracking-tight hover:opacity-75 transition-opacity select-none text-black"
          >
            {logoText.toUpperCase()}
          </Link>
        </motion.div>

        {/* Menu icon (4 dots) */}
        <motion.button
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          className="cursor-pointer hover:opacity-75 transition-opacity text-black"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
            <rect x="5" y="5" width="5" height="5" />
            <rect x="14" y="5" width="5" height="5" />
            <rect x="5" y="14" width="5" height="5" />
            <rect x="14" y="14" width="5" height="5" />
          </svg>
        </motion.button>
      </nav>

      {/* Full-screen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 bg-white z-99 flex flex-col
              px-[20px]
              lg:px-[40px] pb-[40px]
              h-screen"
          >
            {/* Header row — exact same height as real nav so logo/× align perfectly */}
            <div className="h-20 shrink-0 flex justify-between items-center w-full">
              <Link
                href="/"
                onClick={toggleMenu}
                className="font-bold text-[28px] tracking-tight select-none text-black"
              >
                {logoText.toUpperCase()}
              </Link>
              <button
                onClick={toggleMenu}
                aria-label="Close menu"
                className="cursor-pointer hover:opacity-75 transition-opacity text-[40px] font-medium text-black"
              >
                {/* SVG Close icon */}
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              </button>
            </div>

            {/* Content: nav links + copyright */}
            <div className="flex flex-col flex-1 justify-between py-[40px]">
              {/* Staggered slide-in links */}
              <motion.nav
                className="flex flex-col gap-[8px] my-auto"
                variants={menuContainerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {links.map(({ href, label }) => (
                  <div key={href} className="overflow-hidden">
                    <motion.div variants={menuItemVariants}>
                      <Link
                        href={href}
                        onClick={toggleMenu}
                        className="text-[52px] md:text-[72px] font-semibold tracking-tighter hover:opacity-40 transition-opacity block text-black animate-none"
                      >
                        {label}
                      </Link>
                    </motion.div>
                  </div>
                ))}
              </motion.nav>

              {/* Copyright — fades in after links */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="text-[14px] text-[#B3B3B3]"
              >
                © {new Date().getFullYear()} {copyrightName.toUpperCase()}. All Rights Reserved.
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
