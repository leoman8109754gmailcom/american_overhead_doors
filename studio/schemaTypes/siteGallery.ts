import {defineType, defineField} from 'sanity'

export const siteGallery = defineType({
  name: 'siteGallery',
  title: 'Work Gallery',
  type: 'document',
  fields: [
    defineField({
      name: 'images',
      title: 'Photos',
      type: 'array',
      description: 'All photos shown in the gallery. Drag to reorder.',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Brief description for accessibility & SEO.',
            }),
          ],
        },
      ],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    select: {},
    prepare: () => ({title: 'Work Gallery'}),
  },
})
