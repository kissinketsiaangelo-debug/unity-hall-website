import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const gallerySchema = z.object({
  url: z.string().url(),
  caption: z.string().max(300).optional(),
  category: z.string().min(2).max(50),
  year: z.number().int().min(1968).max(2100).optional(),
  photographer: z.string().max(100).optional(),
  isFeatured: z.boolean().default(false),
  order: z.number().int().default(0),
  tags: z.array(z.string()).optional(),
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured') === 'true';
    const year = searchParams.get('year');
    const limit = parseInt(searchParams.get('limit') || '50');

    const where: any = {};
    if (category) where.category = category;
    if (featured) where.isFeatured = true;
    if (year) where.year = parseInt(year);

    const images = await prisma.galleryImage.findMany({
      where,
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
      take: limit,
    });

    return NextResponse.json(images);
  } catch (error) {
    console.error('GET /api/gallery error:', error);
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
    const validated = gallerySchema.parse(body);

    const image = await prisma.galleryImage.create({ data: validated });
    return NextResponse.json(image, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }
    console.error('POST /api/gallery error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}