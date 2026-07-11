import { defineField, defineType } from 'sanity';

export const leadership = defineType({
  name: 'leadership',
  title: 'Hall Leadership',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'role', title: 'Role', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'category', title: 'Category', type: 'string', options: { list: ['JCR Executive', 'Traditional Council', 'Hall Administration', 'Hall Master', 'Senior Tutor', 'Alumni Leadership'] } }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'bio', title: 'Bio', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'term', title: 'Term', type: 'string' }),
    defineField({ name: 'contact', title: 'Contact', type: 'object', fields: [
      { name: 'email', title: 'Email', type: 'string' },
      { name: 'phone', title: 'Phone', type: 'string' },
      { name: 'office', title: 'Office', type: 'string' },
    ]}),
    defineField({ name: 'isCurrent', title: 'Current', type: 'boolean', initialValue: true }),
    defineField({ name: 'order', title: 'Order', type: 'number' }),
    defineField({ name: 'socialLinks', title: 'Social Links', type: 'object', fields: [
      { name: 'linkedin', title: 'LinkedIn', type: 'url' },
      { name: 'twitter', title: 'Twitter', type: 'url' },
      { name: 'facebook', title: 'Facebook', type: 'url' },
    ]}),
  ],
});