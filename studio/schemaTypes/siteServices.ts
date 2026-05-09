import {defineType, defineField} from 'sanity'

export const siteServices = defineType({
  name: 'siteServices',
  title: 'Services',
  type: 'document',
  fields: [
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      description: 'Up to 4 service panels shown on the site. Drag to reorder.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              description: 'Service name shown on the panel (e.g. "Commercial").',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              description: 'Short paragraph shown when the panel is expanded.',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Panel Image',
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
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              media: 'image',
            },
          },
        },
      ],
      validation: (rule) => rule.max(4).error('Maximum 4 services allowed.'),
    }),
  ],
  preview: {
    select: {},
    prepare: () => ({title: 'Services'}),
  },
})
