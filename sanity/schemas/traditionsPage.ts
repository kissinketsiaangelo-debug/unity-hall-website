import { defineField, defineType } from 'sanity';

export const traditionsPage = defineType({
  name: 'traditionsPage',
  title: 'Traditions Page',
  type: 'document',
  fields: [
    defineField({
      name: 'intro',
      title: 'Introduction',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'description', title: 'Description', type: 'array', of: [{ type: 'block' }] },
      ],
    }),
    defineField({
      name: 'deity',
      title: 'Aboagyewaa (Spiritual Mother)',
      type: 'object',
      fields: [
        { name: 'name', title: 'Name', type: 'string' },
        { name: 'description', title: 'Description', type: 'array', of: [{ type: 'block' }] },
        { name: 'appearance', title: 'Appearance Details', type: 'text' },
        { name: 'location', title: 'Location Description', type: 'text' },
        { name: 'rituals', title: 'Annual Rituals', type: 'array', of: [{ type: 'object', fields: [
          { name: 'name', title: 'Ritual Name', type: 'string' },
          { name: 'date', title: 'Date', type: 'string' },
          { name: 'description', title: 'Description', type: 'text' },
          { name: 'participants', title: 'Participants', type: 'string' },
        ] }] },
        { name: 'taboos', title: 'Taboos & Rules', type: 'array', of: [{ type: 'string' }] },
        { name: 'artisticRendering', title: 'Artistic Rendering', type: 'image' },
      ],
    }),
    defineField({
      name: 'symbols',
      title: 'Symbols & Emblems',
      type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'name', title: 'Name', type: 'string' },
        { name: 'description', title: 'Description', type: 'text' },
        { name: 'meaning', title: 'Meaning', type: 'text' },
        { name: 'image', title: 'Image', type: 'image' },
        { name: 'location', title: 'Location in Hall', type: 'string' },
      ] }],
    }),
    defineField({
      name: 'anthem',
      title: 'Hall Anthem',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'lyrics', title: 'Lyrics', type: 'array', of: [{ type: 'object', fields: [
          { name: 'line', title: 'Line', type: 'string' },
          { name: 'translation', title: 'English Translation', type: 'string' },
        ] }] },
        { name: 'audioFile', title: 'Audio File', type: 'file' },
        { name: 'composer', title: 'Composer/Author', type: 'string' },
        { name: 'yearAdopted', title: 'Year Adopted', type: 'number' },
      ],
    }),
    defineField({
      name: 'moraleNights',
      title: 'Morale Nights (Friday Jama)',
      type: 'object',
      fields: [
        { name: 'description', title: 'Description', type: 'array', of: [{ type: 'block' }] },
        { name: 'schedule', title: 'Schedule', type: 'string' },
        { name: 'location', title: 'Location', type: 'string' },
        { name: 'typicalDuration', title: 'Typical Duration', type: 'string' },
        { name: 'elements', title: 'Elements', type: 'array', of: [{ type: 'string' }] },
        { name: 'recordings', title: 'Audio Recordings', type: 'array', of: [{ type: 'object', fields: [
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'date', title: 'Date', type: 'date' },
          { name: 'audioFile', title: 'Audio File', type: 'file' },
          { name: 'description', title: 'Description', type: 'text' },
        ] }] },
      ],
    }),
    defineField({
      name: 'hallWeek',
      title: 'Hall Week Celebrations',
      type: 'object',
      fields: [
        { name: 'description', title: 'Description', type: 'array', of: [{ type: 'block' }] },
        { name: 'typicalMonth', title: 'Typical Month', type: 'string' },
        { name: 'events', title: 'Events', type: 'array', of: [{ type: 'object', fields: [
          { name: 'day', title: 'Day', type: 'string' },
          { name: 'eventName', title: 'Event Name', type: 'string' },
          { name: 'description', title: 'Description', type: 'text' },
          { name: 'icon', title: 'Icon', type: 'string' },
        ] }] },
      ],
    }),
    defineField({
      name: 'initiation',
      title: 'Initiation Rites',
      type: 'object',
      fields: [
        { name: 'description', title: 'Description', type: 'array', of: [{ type: 'block' }] },
        { name: 'phases', title: 'Phases', type: 'array', of: [{ type: 'object', fields: [
          { name: 'name', title: 'Phase Name', type: 'string' },
          { name: 'description', title: 'Description', type: 'text' },
          { name: 'duration', title: 'Duration', type: 'string' },
        ] }] },
      ],
    }),
    defineField({
      name: 'taboos',
      title: 'Taboos & Sacred Rules',
      type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'name', title: 'Name', type: 'string' },
        { name: 'description', title: 'Description', type: 'text' },
        { name: 'severity', title: 'Severity', type: 'string', options: { list: ['sacred', 'strict', 'advisory'] } },
        { name: 'consequences', title: 'Consequences', type: 'text' },
      ] }],
    }),
    defineField({
      name: 'radio',
      title: 'Continental Radio / Focus FM',
      type: 'object',
      fields: [
        { name: 'history', title: 'History', type: 'array', of: [{ type: 'block' }] },
        { name: 'currentFrequency', title: 'Current Frequency', type: 'string' },
        { name: 'formerFrequency', title: 'Former Frequency', type: 'string' },
        { name: 'programming', title: 'Programming', type: 'array', of: [{ type: 'string' }] },
        { name: 'liveStreamUrl', title: 'Live Stream URL', type: 'url' },
        { name: 'archivesUrl', title: 'Archives URL', type: 'url' },
      ],
    }),
  ],
});