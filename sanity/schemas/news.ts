import { defineField, defineType } from 'sanity';

export const news = defineType({
  name: 'news',
  title: 'News Article',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (r) => r.required() }),
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3 }),
    defineField({ name: 'content', title: 'Content', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'publishedAt', title: 'Published At', type: 'datetime', validation: (r) => r.required() }),
    defineField({ name: 'author', title: 'Author', type: 'string' }),
    defineField({ name: 'image', title: 'Featured Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'category', title: 'Category', type: 'string', options: { list: ['Alumni', 'Academic', 'Media', 'Governance', 'Sports', 'Royal Visit', 'Expansion', 'Tradition', 'Other'] } }),
    defineField({ name: 'isFeatured', title: 'Featured', type: 'boolean', initialValue: false }),
    defineField({ name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'relatedEvents', title: 'Related Events', type: 'array', of: [{ type: 'reference', to: [{ type: 'event' }] }] }),
    defineField({ name: 'seo', title: 'SEO', type: 'object', fields: [
      { name: 'metaTitle', title: 'Meta Title', type: 'string' },
      { name: 'metaDescription', title: 'Meta Description', type: 'text' },
      { name: 'ogImage', title: 'Open Graph Image', type: 'image' },
    ]}),
  ],
});