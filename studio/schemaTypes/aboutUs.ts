import {defineType, defineField} from 'sanity'

export const aboutUs = defineType({
  name: 'aboutUs',
  title: 'Who We Are',
  type: 'document',
  fields: [
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
      description: 'Bold label above the body text (e.g. "45 Yrs In Business").',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'bodyText',
      title: 'Body Text',
      type: 'text',
      rows: 6,
      description: 'The paragraph about your company.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
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
