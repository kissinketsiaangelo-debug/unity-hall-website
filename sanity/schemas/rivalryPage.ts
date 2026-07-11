import { defineField, defineType } from 'sanity';

export const rivalryPage = defineType({
  name: 'rivalryPage',
  title: 'Rivalry Page',
  type: 'document',
  fields: [
    defineField({
      name: 'intro',
      title: 'Introduction',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'description', title: 'Description', type: 'array', of: [{ type: 'block' }] },
        { name: 'quote', title: 'Notable Quote', type: 'text' },
        { name: 'quoteAuthor', title: 'Quote Author', type: 'string' },
      ],
    }),
    defineField({
      name: 'dimensions',
      title: 'Competition Dimensions',
      type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'description', title: 'Description', type: 'text' },
        { name: 'icon', title: 'Icon (emoji)', type: 'string' },
        { name: 'contiApproach', title: 'Conti Approach', type: 'text' },
        { name: 'katangaApproach', title: 'Katanga Approach', type: 'text' },
        { name: 'color', title: 'Color Theme', type: 'string', options: { list: ['knust-lust', 'knust-yellow', 'knust-forest'] } },
      ] }],
    }),
    defineField({
      name: 'incidents',
      title: 'Notable Incidents Timeline',
      type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'year', title: 'Year', type: 'string' },
        { name: 'event', title: 'Event', type: 'string' },
        { name: 'severity', title: 'Severity', type: 'string', options: { list: ['Low', 'Moderate', 'High', 'Critical', 'Transformative'] } },
        { name: 'outcome', title: 'Outcome', type: 'text' },
        { name: 'sources', title: 'Sources', type: 'array', of: [{ type: 'url' }] },
      ] }],
    }),
    defineField({
      name: 'evolution',
      title: 'Rivalry Evolution',
      type: 'object',
      fields: [
        { name: 'preConversion', title: 'Pre-2018 (All-Male Era)', type: 'array', of: [{ type: 'block' }] },
        { name: 'conversionImpact', title: 'Conversion Impact (2018)', type: 'array', of: [{ type: 'block' }] },
        { name: 'postConversion', title: 'Post-2018 (Mixed Era)', type: 'array', of: [{ type: 'block' }] },
        { name: 'currentState', title: 'Current State', type: 'array', of: [{ type: 'block' }] },
      ],
    }),
    defineField({
      name: 'healthyCompetition',
      title: 'Healthy Competition Initiatives',
      type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'description', title: 'Description', type: 'text' },
        { name: 'icon', title: 'Icon (emoji)', type: 'string' },
        { name: 'metric', title: 'Metric/Target', type: 'string' },
        { name: 'frequency', title: 'Frequency', type: 'string' },
        { name: 'partners', title: 'Partners', type: 'array', of: [{ type: 'string' }] },
      ] }],
    }),
    defineField({
      name: 'katangaProfile',
      title: 'Katanga Profile',
      type: 'object',
      fields: [
        { name: 'fullName', title: 'Full Name', type: 'string' },
        { name: 'nickname', title: 'Nickname', type: 'string' },
        { name: 'residentsName', title: 'Residents Called', type: 'string' },
        { name: 'founded', title: 'Founded', type: 'string' },
        { name: 'capacity', title: 'Capacity', type: 'string' },
        { name: 'keyTraditions', title: 'Key Traditions', type: 'array', of: [{ type: 'string' }] },
        { name: 'spiritualFigures', title: 'Spiritual Figures', type: 'array', of: [{ type: 'string' }] },
      ],
    }),
  ],
});