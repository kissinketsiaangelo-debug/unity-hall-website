// @ts-nocheck
import { defineField, defineType } from 'sanity';

export const facilitiesPage = defineType({
  name: 'facilitiesPage',
  title: 'Facilities Page',
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
      name: 'blocks',
      title: 'Accommodation Blocks',
      type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'name', title: 'Name', type: 'string' },
        { name: 'description', title: 'Description', type: 'array', of: [{ type: 'block' }] },
        { name: 'floors', title: 'Number of Floors', type: 'number' },
        { name: 'roomsPerFloor', title: 'Rooms Per Floor', type: 'number' },
        { name: 'originalCapacity', title: 'Original Capacity', type: 'number' },
        { name: 'currentOccupancy', title: 'Current Occupancy', type: 'number' },
        { name: 'images', title: 'Images', type: 'array', of: [{ type: 'image' }] },
        { name: 'floorPlans', title: 'Floor Plans', type: 'array', of: [{ type: 'file' }] },
      ] }],
    }),
    defineField({
      name: 'amenities',
      title: 'Amenities Categories',
      type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'category', title: 'Category Name', type: 'string' },
        { name: 'icon', title: 'Icon (emoji)', type: 'string' },
        { name: 'color', title: 'Color Theme', type: 'string', options: { list: ['knust-lust', 'knust-yellow', 'knust-forest', 'knust-black'] } },
        { name: 'items', title: 'Items', type: 'array', of: [{ type: 'object', fields: [
          { name: 'name', title: 'Name', type: 'string' },
          { name: 'description', title: 'Description', type: 'text' },
          { name: 'icon', title: 'Icon (emoji)', type: 'string' },
          { name: 'status', title: 'Status', type: 'string', options: { list: ['operational', 'under-maintenance', 'planned', 'closed'] } },
        ] }] },
      ] }],
    }),
    defineField({
      name: 'virtualTour',
      title: 'Virtual Tour',
      type: 'object',
      fields: [
        { name: 'enabled', title: 'Enabled', type: 'boolean' },
        { name: 'tourUrl', title: 'Tour URL (iframe)', type: 'url' },
        { name: 'scenes', title: 'Tour Scenes', type: 'array', of: [{ type: 'object', fields: [
          { name: 'name', title: 'Scene Name', type: 'string' },
          { name: 'panorama', title: '360° Panorama', type: 'image' },
          { name: 'hotspots', title: 'Hotspots', type: 'array', of: [{ type: 'object', fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
            { name: 'pitch', title: 'Pitch', type: 'number' },
            { name: 'yaw', title: 'Yaw', type: 'number' },
            { name: 'targetScene', title: 'Target Scene', type: 'string' },
          ] }] },
        ] }] },
        { name: 'fallbackVideo', title: 'Fallback Video', type: 'file' },
      ],
    }),
    defineField({
      name: 'overcrowdingStats',
      title: 'Overcrowding Statistics',
      type: 'object',
      fields: [
        { name: 'originalCapacity', title: 'Original Capacity', type: 'number' },
        { name: 'currentPopulation', title: 'Current Population', type: 'number' },
        { name: 'overcapacityPercent', title: 'Overcapacity %', type: 'number' },
        { name: 'studentsPerWashroom', title: 'Students Per Washroom', type: 'number' },
        { name: 'waterRationing', title: 'Water Rationing Details', type: 'text' },
        { name: 'expansionPlans', title: 'Expansion Plans', type: 'array', of: [{ type: 'object', fields: [
          { name: 'title', title: 'Project', type: 'string' },
          { name: 'description', title: 'Description', type: 'text' },
          { name: 'estimatedCost', title: 'Estimated Cost (GHS)', type: 'string' },
          { name: 'status', title: 'Status', type: 'string', options: { list: ['proposed', 'fundraising', 'approved', 'construction', 'completed'] } },
        ] }] },
      ],
    }),
  ],
});