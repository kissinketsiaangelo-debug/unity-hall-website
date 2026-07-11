import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const eventSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(20).max(5000),
  date: z.string().datetime(),
  endDate: z.string().datetime().optional(),
  location: z.string().min(2).max(200),
  category: z.string().min(2).max(50),
  image: z.string().url().optional(),
  rsvpLink: z.string().url().optional(),
  isFeatured: z.boolean().default(false),
  isPublic: z.boolean().default(true),
  maxAttendees: z.number().int().positive().optional(),
  tags: z.array(z.string()).optional(),
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const upcoming = searchParams.get('upcoming') === 'true';
    const featured = searchParams.get('featured') === 'true';
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '20');
    const page = parseInt(searchParams.get('page') || '1');

    const where: any = {};
    if (upcoming) where.date = { gte: new Date() };
    if (featured) where.isFeatured = true;
    if (category) where.category = category;
    where.isPublic = true;

    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where,
        orderBy: { date: 'asc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.event.count({ where }),
    ]);

    return NextResponse.json({ events, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
  } catch (error) {
    console.error('GET /api/events error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'ALUMNI')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const validated = eventSchema.parse(body);

    const event = await prisma.event.create({
      data: {
        ...validated,
        date: new Date(validated.date),
        endDate: validated.endDate ? new Date(validated.endDate) : null,
        slug: validated.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now(),
      },
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }
    console.error('POST /api/events error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}