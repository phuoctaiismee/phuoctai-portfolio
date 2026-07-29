import { defineType, defineField, defineArrayMember } from 'sanity'
import CaseIcon from '@sanity/icons/Case'

export const work = defineType({
  name: 'work',
  title: 'Work / Case Study',
  type: 'document',
  icon: CaseIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured Project',
      description: 'Toggle to showcase this project on the homepage.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'industry',
      title: 'Industry',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'string',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'experience',
      title: 'Experience / Position',
      description: 'e.g. Lead Fullstack Engineer, UI Designer',
      type: 'string',
    }),
    defineField({
      name: 'liveLink',
      title: 'Live Link',
      type: 'url',
    }),
    defineField({
      name: 'githubLink',
      title: 'GitHub Link (Developer Portfolio)',
      type: 'url',
    }),
    defineField({
      name: 'projectType',
      title: 'Project Type / Device Type',
      description: 'Used to layout the screenshot galleries.',
      type: 'string',
      options: {
        list: [
          { title: 'Web / Desktop (16:9 & Square Grid)', value: 'desktop' },
          { title: 'Mobile App (Vertical / Phone Mockup)', value: 'mobile' },
        ],
        layout: 'radio',
      },
      initialValue: 'desktop',
    }),
    defineField({
      name: 'figmaLink',
      title: 'Figma Design Link',
      type: 'url',
    }),
    defineField({
      name: 'appStoreLink',
      title: 'App Store Link (iOS)',
      type: 'url',
    }),
    defineField({
      name: 'playStoreLink',
      title: 'Google Play Store Link (Android)',
      type: 'url',
    }),
    defineField({
      name: 'skills',
      title: 'Skills Used',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: {
        layout: 'tags',
      },
    }),
    
    // Case Study Sections
    defineField({
      name: 'aboutRichText',
      title: 'About Rich Text',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'aboutGallery',
      title: 'About Gallery Images',
      type: 'array',
      of: [defineArrayMember({ type: 'image', options: { hotspot: true } })],
    }),
    defineField({
      name: 'challengeRichText',
      title: 'Challenge Rich Text',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
    }),
    defineField({
      name: 'challengeGallery',
      title: 'Challenge Gallery Images',
      type: 'array',
      of: [defineArrayMember({ type: 'image', options: { hotspot: true } })],
    }),
    defineField({
      name: 'resultRichText',
      title: 'Result Rich Text',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
    }),
    defineField({
      name: 'resultGallery',
      title: 'Result Gallery Images',
      type: 'array',
      of: [defineArrayMember({ type: 'image', options: { hotspot: true } })],
    }),

    // Testimonial
    defineField({
      name: 'testimonialQuote',
      title: 'Testimonial Quote',
      type: 'text',
    }),
    defineField({
      name: 'testimonialAuthorName',
      title: 'Testimonial Author Name',
      type: 'string',
    }),
    defineField({
      name: 'testimonialAuthorRole',
      title: 'Testimonial Author Role',
      type: 'string',
    }),
    defineField({
      name: 'testimonialAuthorAvatar',
      title: 'Testimonial Author Avatar',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'industry',
      media: 'coverImage',
    },
  },
})
