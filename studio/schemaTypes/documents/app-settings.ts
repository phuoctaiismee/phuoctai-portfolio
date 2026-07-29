import { defineType, defineField, defineArrayMember } from 'sanity'
import SettingsIcon from '@sanity/icons/Cog'

export const appSettings = defineType({
  name: 'app-settings',
  title: 'App Settings',
  type: 'document',
  icon: SettingsIcon,
  fields: [
    defineField({
      name: 'logoText',
      title: 'Logo Text',
      description: 'Text logo shown in the navigation bar. e.g. REIN.',
      type: 'string',
      initialValue: 'REIN',
    }),
    // ─── Navigation ───────────────────────────────────────────────────────────
    defineField({
      name: 'navLinks',
      title: 'Navigation Links',
      description: 'Links shown in the main navigation bar.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'navLink',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'href', title: 'Path / URL', type: 'string', validation: (Rule) => Rule.required() }),
          ],
          preview: { select: { title: 'label', subtitle: 'href' } },
        }),
      ],
    }),

    // ─── Footer ───────────────────────────────────────────────────────────────
    defineField({
      name: 'footerCta',
      title: 'Footer CTA Headline',
      description: 'Large text shown in the footer call-to-action area.',
      type: 'string',
      initialValue: "Curious about what we can create together? Let's bring something extraordinary to life!",
    }),
    defineField({
      name: 'isAvailable',
      title: 'Available For Work',
      description: 'Toggle the availability status dot in the footer.',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'availabilityText',
      title: 'Availability Status Text',
      description: 'e.g. "Available For Work" or "Currently Booked"',
      type: 'string',
      initialValue: 'Available For Work',
    }),
    defineField({
      name: 'phoneNumber',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'copyrightName',
      title: 'Copyright Name',
      description: 'Name shown in footer copyright. e.g. PHUOCTAI or PHUOC TAI.',
      type: 'string',
    }),

    // ─── Social Links ─────────────────────────────────────────────────────────
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      description: 'Shown in the footer social row.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'socialLink',
          fields: [
            defineField({
              name: 'platformName',
              title: 'Platform Name',
              description: 'e.g. GitHub, LinkedIn, Twitter',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https'] }),
            }),
          ],
          preview: { select: { title: 'platformName', subtitle: 'url' } },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'App Settings' }
    },
  },
})
