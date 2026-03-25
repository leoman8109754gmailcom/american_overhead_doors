// Add this file to your Sanity studio's schemas folder,
// then register it in your schema index.
//
// In your studio's schemaTypes/index.js (or .ts), add:
//   import galleryImage from './galleryImage'
//   export const schemaTypes = [galleryImage, ...otherTypes]

export default {
  name: 'galleryImage',
  title: 'Gallery Image',
  type: 'document',
  fields: [
    {
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      description: 'Brief description of the image (for accessibility & SEO).',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'alt',
      media: 'image',
    },
  },
};
