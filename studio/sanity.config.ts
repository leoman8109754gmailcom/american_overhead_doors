import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
import {schemaTypes} from './schemaTypes'

const SINGLETONS = new Set(['hero', 'aboutUs', 'siteServices', 'siteGallery'])

export default defineConfig({
  name: 'default',
  title: 'American Overhead Doors',

  projectId: '7vgbicbo',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S, context) =>
        S.list()
          .title('Website Content')
          .items([
            S.listItem()
              .title('Site Header')
              .id('hero')
              .child(
                S.document().schemaType('hero').documentId('hero').title('Site Header'),
              ),
            S.listItem()
              .title('Who We Are')
              .id('aboutUs')
              .child(
                S.document().schemaType('aboutUs').documentId('aboutUs').title('Who We Are'),
              ),
            S.listItem()
              .title('Services')
              .id('siteServices')
              .child(
                S.document()
                  .schemaType('siteServices')
                  .documentId('siteServices')
                  .title('Services'),
              ),
            S.listItem()
              .title('Work Gallery')
              .id('siteGallery')
              .child(
                S.document()
                  .schemaType('siteGallery')
                  .documentId('siteGallery')
                  .title('Work Gallery'),
              ),
            S.divider(),
            orderableDocumentListDeskItem({type: 'review', title: 'Reviews', S, context}),
          ]),
    }),
  ],

  tools: (prev) => prev.filter((tool) => tool.name !== 'releases'),

  schema: {
    types: schemaTypes,
  },

  document: {
    newDocumentOptions: (prev, {creationContext}) => {
      if (creationContext.type === 'global') {
        return prev.filter((item) => !SINGLETONS.has(item.templateId))
      }
      return prev
    },
    actions: (prev, {schemaType}) => {
      if (SINGLETONS.has(schemaType)) {
        return prev.filter(({action}) => action !== 'delete' && action !== 'duplicate')
      }
      return prev
    },
  },
})
