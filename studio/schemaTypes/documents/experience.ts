import { defineType, defineField, defineArrayMember } from 'sanity'
import { TimelineIcon } from '@sanity/icons/Timeline'

export const experience = defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  icon: TimelineIcon,
  fields: [
    defineField({
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role / Position',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'currentJob',
      title: 'Current Job',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM',
      },
      hidden: ({ parent }) => parent?.currentJob === true,
      validation: (Rule) =>
        Rule.custom((endDate, context) => {
          const { currentJob, startDate } = context.parent as {
            currentJob?: boolean
            startDate?: string
          }
          if (currentJob) return true
          if (!endDate) return 'End date is required if this is not your current job'
          if (startDate && new Date(endDate) < new Date(startDate)) {
            return 'End date must be after the start date'
          }
          return true
        }),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'techStack',
      title: 'Technologies Used',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: {
        layout: 'tags',
      },
    }),
  ],
  preview: {
    select: {
      title: 'companyName',
      subtitle: 'role',
    },
  },
})
