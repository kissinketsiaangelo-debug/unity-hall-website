import { type SchemaTypeDefinition } from 'sanity';

import { homePage } from './homePage';
import { aboutPage } from './aboutPage';
import { facilitiesPage } from './facilitiesPage';
import { traditionsPage } from './traditionsPage';
import { rivalryPage } from './rivalryPage';
import { event } from './event';
import { news } from './news';
import { galleryImage } from './galleryImage';
import { leadership } from './leadership';
import { siteSettings } from './siteSettings';

export const schemaTypes: SchemaTypeDefinition[] = [
  homePage,
  aboutPage,
  facilitiesPage,
  traditionsPage,
  rivalryPage,
  event,
  news,
  galleryImage,
  leadership,
  siteSettings,
];