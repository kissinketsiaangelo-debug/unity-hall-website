import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const createSchema = z.object({
  title: z.string().min(5).max(200),
  description: z.string().max(5000).optional(),
  options: z.array(z.string().min(1)).min(2),
  category: z.enum(['GENERAL', 'ELECTION', 'EVENT', 'DINING', 'FACILITIES']).default('GENERAL'),
  startsAt: z.string().refine((v) => !isNaN(Date.parse(v)), 'Invalid date'),
  endsAt: z.string().refine((v) => !isNaN(Date.parse(v)), 'Invalid date'),
});

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const polls = await prisma.poll.findMany({
      include: {
        createdBy: { select: { id: true, name: true, email: true } },
        _count: { select: { votes: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(polls);
  } catch (error) {
    console.error('GET /api/admin/polls error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await req.json();
    const validated = createSchema.parse(body);

    const poll = await prisma.poll.create({
      data: {
        title: validated.title,
        description: validated.description,
        options: validated.options,
        category: validated.category,
        startsAt: new Date(validated.startsAt),
        endsAt: new Date(validated.endsAt),
        createdById: session.user.id,
      },
      include: {
        createdBy: { select: { id: true, name: true, email: true } },
      },
    });

    return NextResponse.json(poll, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }
    console.error('POST /api/admin/polls error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
