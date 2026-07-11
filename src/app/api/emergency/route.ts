import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const respondSchema = z.object({
  headcountId: z.string(),
  status: z.enum(['SAFE', 'IN_DANGER']),
  location: z.string().max(200).optional(),
});

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const active = await prisma.emergencyHeadcount.findFirst({
      where: { status: 'ACTIVE' },
      orderBy: { triggeredAt: 'desc' },
      include: { responses: true },
    });

    return NextResponse.json({ active: !!active, headcount: active ?? null });
  } catch (error) {
    console.error('GET /api/emergency error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const existing = await prisma.emergencyHeadcount.findFirst({
      where: { status: 'ACTIVE' },
    });
    if (existing) {
      return NextResponse.json({ error: 'An active headcount already exists' }, { status: 409 });
    }

    const headcount = await prisma.emergencyHeadcount.create({
      data: { triggeredBy: session.user.id },
    });

    await prisma.emergencyResponse.create({
      data: {
        headcountId: headcount.id,
        userId: session.user.id,
        status: 'SAFE',
      },
    });

    return NextResponse.json(headcount, { status: 201 });
  } catch (error) {
    console.error('POST /api/emergency error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const validated = respondSchema.parse(body);

    const headcount = await prisma.emergencyHeadcount.findUnique({
      where: { id: validated.headcountId },
    });
    if (!headcount || headcount.status !== 'ACTIVE') {
      return NextResponse.json({ error: 'No active headcount found' }, { status: 404 });
    }

    const response = await prisma.emergencyResponse.upsert({
      where: {
        headcountId_userId: { headcountId: validated.headcountId, userId: session.user.id },
      },
      update: {
        status: validated.status,
        location: validated.location,
      },
      create: {
        headcountId: validated.headcountId,
        userId: session.user.id,
        status: validated.status,
        location: validated.location,
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }
    console.error('PATCH /api/emergency error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
