import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const createPostSchema = z.object({
  title: z.string().min(3).max(200),
  content: z.string().min(10).max(10000),
  category: z.enum(['GENERAL', 'ACADEMICS', 'EVENTS', 'SPORTS', 'ROOMMATE', 'LOST_FOUND', 'BUY_SELL', 'OTHER']).default('GENERAL'),
  tags: z.array(z.string().max(50)).max(10).default([]),
});

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    const where: any = {};
    if (category) where.category = category;

    const [posts, total] = await Promise.all([
      prisma.forumPost.findMany({
        where,
        include: {
          user: { select: { id: true, name: true, email: true, image: true } },
          _count: { select: { comments: true } },
        },
        orderBy: [{ isPinned: 'desc' }, { createdAt: 'desc' }],
        skip,
        take: limit,
      }),
      prisma.forumPost.count({ where }),
    ]);

    return NextResponse.json({ posts, total, page, limit, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    console.error('GET /api/forum/posts error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const validated = createPostSchema.parse(body);

    const post = await prisma.forumPost.create({
      data: {
        ...validated,
        userId: session.user.id,
      },
      include: {
        user: { select: { id: true, name: true, email: true, image: true } },
        _count: { select: { comments: true } },
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }
    console.error('POST /api/forum/posts error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
