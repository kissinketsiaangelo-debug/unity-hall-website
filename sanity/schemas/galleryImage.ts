import { defineField, defineType } from 'sanity';

export const galleryImage = defineType({
  name: 'galleryImage',
  title: 'Gallery Image',
  type: 'document',
  fields: [
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({ name: 'caption', title: 'Caption', type: 'string' }),
    defineField({ name: 'category', title: 'Category', type: 'string', options: { list: ['Architecture', 'Events', 'Traditions', 'Sports', 'Alumni', 'Facilities', 'Historical', 'Aerial', 'Student Life'] } }),
    defineField({ name: 'year', title: 'Year', type: 'number' }),
    defineField({ name: 'photographer', title: 'Photographer', type: 'string' }),
    defineField({ name: 'isFeatured', title: 'Featured', type: 'boolean', initialValue: false }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
    defineField({ name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] }),
  ],
});