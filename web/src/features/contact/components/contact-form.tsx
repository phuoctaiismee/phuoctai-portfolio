"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/ui/button'

interface ContactFormProps {
  email?: string
}

export function ContactForm({ email = 'imphuoctai@gmail.com' }: ContactFormProps) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [formStatus, setFormStatus] = useState<
    'incomplete' | 'pending' | 'success' | 'error'
  >('incomplete')

  // Email validation helper
  const isValidEmail = (emailStr: string) => /\S+@\S+\.\S+/.test(emailStr)
  const isFormValid =
    formData.name.trim() !== '' &&
    isValidEmail(formData.email) &&
    formData.message.trim() !== ''

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (formStatus === 'success' || formStatus === 'error') {
      setFormStatus('incomplete')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isFormValid) return

    setFormStatus('pending')

    try {
      // Build mailto link to launch user's default client (Mail, Gmail, Outlook...)
      const subject = encodeURIComponent(`Contact Request from ${formData.name}`)
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )

      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`

      // Simulate successful trigger
      setTimeout(() => {
        setFormStatus('success')
        setFormData({ name: '', email: '', message: '' })
      }, 800)
    } catch (err) {
      setFormStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-[20px] w-full">
      {/* Field 1: Name */}
      <div className="flex flex-col">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          placeholder="Your Name"
          className="bg-[#F5F5F5] text-[18px] text-black placeholder-[#B3B3B3] px-[30px] h-[80px] w-full rounded-none focus:outline-none focus:bg-[#EAEAEA] transition-colors"
        />
      </div>

      {/* Field 2: Email */}
      <div className="flex flex-col">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          placeholder="Your Email"
          className="bg-[#F5F5F5] text-[18px] text-black placeholder-[#B3B3B3] px-[30px] h-[80px] w-full rounded-none focus:outline-none focus:bg-[#EAEAEA] transition-colors"
        />
      </div>

      {/* Field 3: Message */}
      <div className="flex flex-col">
        <textarea
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          required
          placeholder="Your Message"
          className="bg-[#F5F5F5] text-[18px] text-black placeholder-[#B3B3B3] p-[30px] h-[180px] w-full rounded-none resize-none focus:outline-none focus:bg-[#EAEAEA] transition-colors"
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={!isFormValid || formStatus === 'pending'}
        className={`w-full h-[80px] flex items-center justify-center border-none transition-all duration-300 ${!isFormValid
          ? 'bg-black text-white cursor-pointer opacity-80'
          : formStatus === 'pending'
            ? 'bg-gray-400 text-white cursor-wait'
            : formStatus === 'success'
              ? 'bg-green-500 text-white hover:bg-green-500'
              : formStatus === 'error'
                ? 'bg-red-500 text-white hover:bg-red-500'
                : 'bg-black text-white hover:bg-neutral-800 hover:text-white cursor-pointer'
          }`}
      >
        {formStatus === 'pending' && 'Opening Email App...'}
        {formStatus === 'success' && 'Sent!'}
        {formStatus === 'error' && 'Error, Try Again'}
        {formStatus === 'incomplete' && 'Send It!'}
      </Button>

      {/* Status messages */}
      <AnimatePresence>
        {formStatus === 'success' && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-green-500 font-semibold text-[14px]"
          >
            Thank you! Your email client has been opened to send the message.
          </motion.p>
        )}
        {formStatus === 'error' && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-red-500 font-semibold text-[14px]"
          >
            Something went wrong. Please try again.
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  )
}
