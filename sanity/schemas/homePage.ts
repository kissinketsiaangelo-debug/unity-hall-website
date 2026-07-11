import { defineField, defineType } from 'sanity';

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        { name: 'tagline', title: 'Tagline', type: 'string' },
        { name: 'subtitle', title: 'Subtitle', type: 'text' },
        { name: 'ctaPrimary', title: 'Primary CTA', type: 'object', fields: [
          { name: 'text', title: 'Text', type: 'string' },
          { name: 'href', title: 'Link', type: 'string' },
        ]},
        { name: 'ctaSecondary', title: 'Secondary CTA', type: 'object', fields: [
          { name: 'text', title: 'Text', type: 'string' },
          { name: 'href', title: 'Link', type: 'string' },
        ]},
        { name: 'backgroundVideo', title: 'Background Video', type: 'file' },
      ],
    }),
    defineField({
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'value', title: 'Value', type: 'string' },
        { name: 'label', title: 'Label', type: 'string' },
        { name: 'icon', title: 'Icon (emoji)', type: 'string' },
        { name: 'prefix', title: 'Prefix', type: 'string' },
        { name: 'suffix', title: 'Suffix', type: 'string' },
      ] }],
    }),
    defineField({
      name: 'featuredEvents',
      title: 'Featured Events',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'event' }] }],
    }),
    defineField({
      name: 'latestNews',
      title: 'Latest News',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'news' }] }],
    }),
    defineField({
      name: 'cta',
      title: 'Bottom CTA Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'description', title: 'Description', type: 'text' },
        { name: 'buttonText', title: 'Button Text', type: 'string' },
        { name: 'buttonLink', title: 'Button Link', type: 'string' },
      ],
    }),
  ],
});