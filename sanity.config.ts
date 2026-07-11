import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemas';

export default defineConfig({
  name: 'unity-hall-knust',
  title: 'Unity Hall KNUST',

  projectId: 'demo',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Home Page')
              .child(
                S.document()
                  .schemaType('homePage')
                  .documentId('homePage')
              ),
            S.listItem()
              .title('About Page')
              .child(
                S.document()
                  .schemaType('aboutPage')
                  .documentId('aboutPage')
              ),
            S.listItem()
              .title('Facilities Page')
              .child(
                S.document()
                  .schemaType('facilitiesPage')
                  .documentId('facilitiesPage')
              ),
            S.listItem()
              .title('Traditions Page')
              .child(
                S.document()
                  .schemaType('traditionsPage')
                  .documentId('traditionsPage')
              ),
            S.listItem()
              .title('Rivalry Page')
              .child(
                S.document()
                  .schemaType('rivalryPage')
                  .documentId('rivalryPage')
              ),
            S.divider(),
            S.listItem()
              .title('Events')
              .child(S.documentTypeList('event').title('Events')),
            S.listItem()
              .title('News')
              .child(S.documentTypeList('news').title('News')),
            S.listItem()
              .title('Gallery')
              .child(S.documentTypeList('galleryImage').title('Gallery Images')),
            S.listItem()
              .title('Leadership')
              .child(S.documentTypeList('leadership').title('Hall Leadership')),
            S.divider(),
            S.listItem()
              .title('Site Settings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});