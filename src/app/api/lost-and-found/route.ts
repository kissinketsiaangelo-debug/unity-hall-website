import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const createItemSchema = z.object({
  title: z.string().min(3).max(150),
  description: z.string().min(10).max(2000),
  location: z.string().min(3).max(100),
  dateLost: z.string().datetime(),
  images: z.array(z.string().url()).optional(),
  type: z.enum(['LOST', 'FOUND']),
});

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '20');

    const where: any = {};
    if (type) where.type = type;
    if (status) where.status = status;

    const items = await prisma.lostFoundItem.findMany({
      where,
      include: {
        user: { select: { id: true, name: true, email: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });

    return NextResponse.json(items);
  } catch (error) {
    console.error('GET /api/lost-and-found error:', error);
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
    const validated = createItemSchema.parse(body);
    const { type, dateLost, ...rest } = validated;

    const item = await prisma.lostFoundItem.create({
      data: {
        ...rest,
        type,
        dateLost: new Date(dateLost),
        userId: session.user.id,
        status: 'REPORTED',
      },
      include: { user: { select: { id: true, name: true, email: true } } },
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }
    console.error('POST /api/lost-and-found error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
