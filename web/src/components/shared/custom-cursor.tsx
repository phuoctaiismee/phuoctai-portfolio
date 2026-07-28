"use client"

import { useEffect, useState } from 'react'
import { motion, useMotionValue, AnimatePresence } from 'framer-motion'

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [cursorText, setCursorText] = useState('')
  const [isClicked, setIsClicked] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    setIsVisible(true)
    document.documentElement.classList.add('custom-cursor-active')

    // Unified helper to update cursor text from the element currently under the mouse
    const updateCursorText = () => {
      const element = document.elementFromPoint(cursorX.get(), cursorY.get()) as HTMLElement | null
      if (element) {
        // 1. Check if it is a custom text-based cursor element
        const cursorTextElement = element.closest('[data-cursor-text]') as HTMLElement | null
        if (cursorTextElement) {
          setCursorText(cursorTextElement.getAttribute('data-cursor-text') || '')
          setIsHovered(true)
          return
        }

        // 2. Check if it is a standard interactive element (links, buttons, images, inputs) to trigger scale hover
        const isInteractive = !!element.closest(
          'a, button, [role="button"], input, textarea, [data-cursor-hover], select, img'
        )
        setIsHovered(isInteractive)
        setCursorText('')
        return
      }
      setIsHovered(false)
      setCursorText('')
    }

    // Observe DOM updates (attribute changes or node replacement/mounts)
    // to instantly update cursor text without requiring mouse movement
    const observer = new MutationObserver(updateCursorText)
    observer.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['data-cursor-text'],
    })

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      updateCursorText()
    }

    const handleMouseDown = () => setIsClicked(true)
    const handleMouseUp = () => setIsClicked(false)

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      observer.disconnect()
      document.documentElement.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [cursorX, cursorY])

  if (!isVisible) return null

  const isPill = !!cursorText

  return (
    <motion.div
      className="fixed top-0 left-0 z-9999 pointer-events-none flex items-center justify-center overflow-hidden"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
        mixBlendMode: isPill ? 'normal' : 'difference',
      }}
      animate={{
        width: isPill ? 'auto' : (isHovered ? 72 : 32),
        height: isPill ? 'auto' : (isHovered ? 72 : 32),
        borderRadius: '9999px',
        backgroundColor: isPill ? '#000000' : '#ffffff',
        scale: isClicked ? 0.85 : 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 32,
        mass: 0.8,
      }}
    >
      <AnimatePresence mode="wait">
        {isPill && (
          <motion.span
            key={cursorText}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.15 }}
            className="text-white text-lg font-semibold tracking-wider py-4 px-6 whitespace-nowrap select-none pointer-events-none"
          >
            {cursorText}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
