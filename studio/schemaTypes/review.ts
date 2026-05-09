import {defineType, defineField} from 'sanity'
import {orderRankField} from '@sanity/orderable-document-list'

export const review = defineType({
  name: 'review',
  title: 'Review',
  type: 'document',
  fields: [
    orderRankField({type: 'review'}),
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
  ],
  preview: {
    select: {
      title: 'reviewerName',
      subtitle: 'reviewText',
    },
    prepare({title, subtitle}) {
      return {title: title || 'Review', subtitle}
    },
  },
})
