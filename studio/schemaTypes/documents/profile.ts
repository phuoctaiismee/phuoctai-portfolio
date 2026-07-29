import { defineType, defineField, defineArrayMember } from 'sanity'
import UserIcon from '@sanity/icons/User'

export const profile = defineType({
  name: 'profile',
  title: 'Profile Settings',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'firstName',
      title: 'First Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'lastName',
      title: 'Last Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'displayName',
      title: 'Display Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headline',
      title: 'Headline / Role',
      description: 'e.g. Senior Fullstack Developer | React & Node.js specialist',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'avatar',
      title: 'Avatar Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cvFile',
      title: 'CV / Resume File',
      type: 'file',
      options: {
        accept: '.pdf,.doc,.docx',
      },
    }),
    defineField({
      name: 'shortBio',
      title: 'Short Bio / Intro Paragraph',
      description: 'Intro paragraph under your name on the home page.',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'longBio',
      title: 'Biography (Long Bio)',
      description: 'Full rich-text bio for the about page.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
        }),
      ],
    }),
    defineField({
      name: 'aboutStatement',
      title: 'About Big Statement',
      description: 'Large statement for about section.',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'aboutImage',
      title: 'About Section Image',
      description: 'Image for about section.',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'aboutDescription',
      title: 'About Short Description',
      description: 'Short paragraph for about section.',
      type: 'text',
      rows: 3,
    }),
    
    // Group: Professional Skills
    defineField({
      name: 'skillsGroups',
      title: 'Skills Groups',
      description: 'Group skills by categories (e.g. Frontend, Backend, Databases)',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'skillsGroup',
          fields: [
            defineField({
              name: 'category',
              title: 'Category Name',
              description: 'e.g. Frontend, Backend, Tools & DevOps',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'skills',
              title: 'Skills List',
              type: 'array',
              of: [defineArrayMember({ type: 'string' })],
              options: {
                layout: 'tags',
              },
              validation: (Rule) => Rule.required().min(1),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'services',
      title: 'Services',
      description: 'List the professional services you offer (e.g. Web Development, Mobile Apps)',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'serviceItem',
          title: 'Service Item',
          fields: [
            defineField({
              name: 'name',
              title: 'Service Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Service Hover Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'faqs',
      title: 'Frequently Asked Questions',
      description: 'Frequently Asked Questions displayed on the about page',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'faqItem',
          title: 'FAQ Item',
          fields: [
            defineField({
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'answer',
              title: 'Answer',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'displayName',
      subtitle: 'headline',
      media: 'avatar',
    },
  },
})
