import {defineType, defineField} from 'sanity'

export const hero = defineType({
  name: 'hero',
  title: 'Site Header',
  type: 'document',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: 'Large title shown in the hero section.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'bodyText',
      title: 'Body Text',
      type: 'text',
      rows: 4,
      description: 'Paragraph text shown below the headline.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ctaText',
      title: 'Button Text',
      type: 'string',
      description: 'Label on the call-to-action button (e.g. "Our Services").',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Hero Image',
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
})
