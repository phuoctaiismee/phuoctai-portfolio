import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import UserIcon from '@sanity/icons/User'
import CaseIcon from '@sanity/icons/Case'
import CogIcon from '@sanity/icons/Cog'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'portfolio',

  projectId: 'i59ktymw',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Profile Singleton
            S.listItem()
              .title('Profile Settings')
              .icon(UserIcon)
              .child(S.document().schemaType('profile').documentId('profile')),
            
            // App Settings Singleton
            S.listItem()
              .title('App Settings')
              .icon(CogIcon)
              .child(S.document().schemaType('app-settings').documentId('app-settings')),
            
            S.divider(),
            
            // Works & Experience
            S.listItem()
              .title('Works / Projects')
              .icon(CaseIcon)
              .child(S.documentTypeList('work').title('Works')),
            S.documentTypeListItem('experience').title('Experiences'),
            S.divider(),
            
            // Blog (future)
            S.documentTypeListItem('post').title('Posts'),
            S.documentTypeListItem('author').title('Authors'),
            S.documentTypeListItem('category').title('Categories'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    // For singleton types, filter out actions that are not explicitly allowed
    actions: (input, context) => {
      const singletonTypes = ['profile', 'app-settings']
      return singletonTypes.includes(context.schemaType)
        ? input.filter(({ action }) => action && ['publish', 'discardChanges', 'restore'].includes(action))
        : input
    },
    // Filter out singleton types from creation templates
    newDocumentOptions: (prev, context) => {
      const singletonTypes = ['profile', 'app-settings']
      return prev.filter((templateItem) => !singletonTypes.includes(templateItem.templateId))
    },
  },
})
