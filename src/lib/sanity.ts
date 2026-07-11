import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const sanityConfig = {
  projectId: process.env['NEXT_PUBLIC_SANITY_PROJECT_ID'] || 'demo',
  dataset: process.env['NEXT_PUBLIC_SANITY_DATASET'] || 'production',
  apiVersion: '2024-07-07',
  useCdn: process.env.NODE_ENV === 'production',
  perspective: 'published' as const,
  stega: {
    enabled: process.env.NODE_ENV === 'development',
    studioUrl: '/studio',
  },
};

export const sanityClient = createClient(sanityConfig);

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export async function getSanityImage(
  source: SanityImageSource,
  options?: { width?: number; height?: number; fit?: 'crop' | 'fill' | 'max' | 'min'; format?: 'webp' | 'avif' | 'png' | 'jpg' }
) {
  return urlFor(source)
    .width(options?.width || 800)
    .height(options?.height || 600)
    .fit(options?.fit || 'max')
    .format((options?.format || 'webp') as any)
    .auto('format')
    .url();
}

export const SANITY_QUERIES = {
  homePage: `*[_type == "homePage"][0]{
    hero,
    stats,
    featuredEvents[],
    latestNews[],
    cta
  }`,
  aboutPage: `*[_type == "aboutPage"][0]{
    history,
    mission,
    governance,
    architects,
    timeline
  }`,
  facilitiesPage: `*[_type == "facilitiesPage"][0]{
    blocks[],
    amenities[],
    virtualTour
  }`,
  traditionsPage: `*[_type == "traditionsPage"][0]{
    deity,
    rituals,
    symbols,
    anthem,
    taboos,
    hallWeek
  }`,
  rivalryPage: `*[_type == "rivalryPage"][0]{
    history,
    dimensions,
    incidents,
    evolution,
    healthyCompetition
  }`,
  alumniPage: `*[_type == "alumniPage"][0]{
    notableAlumni[],
    oca,
    mentorship,
    homecoming,
    giving
  }`,
  events: `*[_type == "event" && date >= now()] | order(date asc) {
    _id,
    title,
    slug,
    description,
    date,
    endDate,
    location,
    image,
    category,
    rsvpLink,
    isFeatured
  }`,
  news: `*[_type == "news"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    content,
    publishedAt,
    author,
    image,
    category,
    isFeatured
  }`,
  gallery: `*[_type == "galleryImage"] | order(order asc) {
    _id,
    image,
    caption,
    category,
    year,
    isFeatured
  }`,
  leadership: `*[_type == "leadership"] | order(order asc) {
    _id,
    name,
    role,
    image,
    bio,
    term,
    socialLinks,
    isCurrent
  }`,
  settings: `*[_type == "siteSettings"][0]{
    siteName,
    tagline,
    logo,
    favicon,
    socialLinks,
    contactInfo,
    seo,
    analytics
  }`,
};