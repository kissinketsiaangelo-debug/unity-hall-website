import { defineField, defineType } from 'sanity';

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'history',
      title: 'History Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'content', title: 'Content', type: 'array', of: [{ type: 'block' }] },
        { name: 'foundingDate', title: 'Founding Date', type: 'date' },
        { name: 'founders', title: 'Founders', type: 'array', of: [{ type: 'string' }] },
      ],
    }),
    defineField({
      name: 'mission',
      title: 'Mission & Values',
      type: 'object',
      fields: [
        { name: 'missionStatement', title: 'Mission Statement', type: 'text' },
        { name: 'values', title: 'Core Values', type: 'array', of: [{ type: 'object', fields: [
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'description', title: 'Description', type: 'text' },
          { name: 'icon', title: 'Icon', type: 'string' },
        ] }] },
      ],
    }),
    defineField({
      name: 'governance',
      title: 'Governance Structure',
      type: 'object',
      fields: [
        { name: 'jcr', title: 'Junior Common Room', type: 'object', fields: [
          { name: 'description', title: 'Description', type: 'text' },
          { name: 'executives', title: 'Executive Roles', type: 'array', of: [{ type: 'string' }] },
        ]},
        { name: 'traditionalCouncil', title: 'Traditional Council', type: 'object', fields: [
          { name: 'description', title: 'Description', type: 'text' },
          { name: 'roles', title: 'Roles', type: 'array', of: [{ type: 'string' }] },
        ]},
        { name: 'hallMaster', title: 'Hall Master', type: 'object', fields: [
          { name: 'name', title: 'Name', type: 'string' },
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'since', title: 'Since', type: 'date' },
        ]},
      ],
    }),
    defineField({
      name: 'architects',
      title: 'Architects',
      type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'name', title: 'Name', type: 'string' },
        { name: 'role', title: 'Role', type: 'string' },
        { name: 'nationality', title: 'Nationality', type: 'string' },
        { name: 'years', title: 'Years at KNUST', type: 'string' },
        { name: 'bio', title: 'Biography', type: 'array', of: [{ type: 'block' }] },
        { name: 'achievements', title: 'Achievements', type: 'array', of: [{ type: 'string' }] },
        { name: 'quote', title: 'Notable Quote', type: 'text' },
        { name: 'image', title: 'Portrait', type: 'image' },
      ] }],
    }),
    defineField({
      name: 'timeline',
      title: 'Historical Timeline',
      type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'year', title: 'Year', type: 'string' },
        { name: 'date', title: 'Specific Date', type: 'string' },
        { name: 'title', title: 'Event Title', type: 'string' },
        { name: 'description', title: 'Description', type: 'text' },
        { name: 'icon', title: 'Icon (emoji)', type: 'string' },
        { name: 'color', title: 'Color Theme', type: 'string', options: { list: ['knust-lust', 'knust-yellow', 'knust-forest', 'destructive'] } },
      ] }],
    }),
  ],
});