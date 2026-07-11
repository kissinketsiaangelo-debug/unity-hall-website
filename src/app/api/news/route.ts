import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const p = prisma as any;

const newsSchema = z.object({
  title: z.string().min(5).max(150),
  excerpt: z.string().max(300).optional(),
  content: z.string().min(50),
  publishedAt: z.string().datetime().optional(),
  author: z.string().min(2).max(100),
  authorRole: z.string().max(50).optional(),
  image: z.string().url().optional(),
  category: z.string().min(2).max(50),
  isFeatured: z.boolean().default(false),
  isBreaking: z.boolean().default(false),
  tags: z.array(z.string()).optional(),
  seo: z.object({
    metaTitle: z.string().max(60).optional(),
    metaDescription: z.string().max(160).optional(),
    ogImage: z.string().url().optional(),
  }).optional(),
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const featured = searchParams.get('featured') === 'true';
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '10');
    const page = parseInt(searchParams.get('page') || '1');

    const where: any = {};
    if (featured) where.isFeatured = true;
    if (category) where.category = category;

    const [articles, total] = await Promise.all([
      p.news.findMany({
        where,
        orderBy: { publishedAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      p.news.count({ where }),
    ]);

    return NextResponse.json({ articles, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
  } catch (error) {
    console.error('GET /api/news error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const validated = newsSchema.parse(body);

    const article = await p.news.create({
      data: {
        ...validated,
        publishedAt: validated.publishedAt ? new Date(validated.publishedAt) : new Date(),
        slug: validated.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now(),
      },
    });

    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }
    console.error('POST /api/news error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}