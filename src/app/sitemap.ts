import { MetadataRoute } from 'next';
import { sanityClient } from '@/lib/sanity';

const BASE_URL = process.env['NEXT_PUBLIC_SITE_URL'] || 'https://unityhall.knust.edu.gh';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/facilities`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/traditions`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/rivalry`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/alumni`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/news`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/admissions`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/events`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/gallery`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
  ];

  let dynamicPages: MetadataRoute.Sitemap = [];

  try {
    const events = await sanityClient.fetch(`*[_type == "event" && isPublic == true] | order(date asc) {
      slug,
      date,
      _updatedAt
    }`);

    dynamicPages = events.map((event: any) => ({
      url: `${BASE_URL}/events/${event.slug}`,
      lastModified: event._updatedAt ? new Date(event._updatedAt) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.warn('Failed to fetch events for sitemap:', error);
  }

  try {
    const news = await sanityClient.fetch(`*[_type == "news"] | order(publishedAt desc) {
      slug,
      publishedAt,
      _updatedAt
    }`);

    const newsPages = news.map((article: any) => ({
      url: `${BASE_URL}/news/${article.slug}`,
      lastModified: article._updatedAt ? new Date(article._updatedAt) : new Date(article.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }));

    dynamicPages = [...dynamicPages, ...newsPages];
  } catch (error) {
    console.warn('Failed to fetch news for sitemap:', error);
  }

  return [...staticPages, ...dynamicPages];
}