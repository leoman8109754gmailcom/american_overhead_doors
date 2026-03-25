import {defineType, defineField} from 'sanity'

export const review = defineType({
  name: 'review',
  title: 'Review',
  type: 'document',
  fields: [
    defineField({
      name: 'reviewText',
      title: 'Review Text',
      type: 'text',
      rows: 4,
      description: 'The customer review.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'reviewerName',
      title: 'Reviewer Name',
      type: 'string',
      description: 'Name of the person who left the review.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Lower numbers appear first.',
    }),
  ],
  preview: {
    select: {
      title: 'reviewerName',
      subtitle: 'reviewText',
    },
  },
})
