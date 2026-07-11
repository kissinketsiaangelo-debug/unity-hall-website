import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const mentorshipSchema = z.object({
  menteeEmail: z.string().email(),
  pillar: z.enum(['ACADEMIC', 'CAREER', 'LEADERSHIP', 'PERSONAL_GROWTH']),
  goals: z.string().min(50).max(2000),
});

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const role = searchParams.get('role');

    if (session.user.role === 'ALUMNI' || session.user.role === 'ADMIN') {
      const where = role === 'mentor' 
        ? { mentorId: session.user.id } 
        : role === 'mentee' 
          ? { menteeId: session.user.id } 
          : { OR: [{ mentorId: session.user.id }, { menteeId: session.user.id }] };

      const matches = await prisma.mentorshipMatch.findMany({
        where,
        include: {
          mentor: { select: { id: true, name: true, email: true, image: true } },
          mentee: { select: { id: true, name: true, email: true, image: true } },
        },
        orderBy: { createdAt: 'desc' },
      });

      return NextResponse.json(matches);
    }

    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  } catch (error) {
    console.error('GET /api/mentorship error:', error);
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
    const validated = mentorshipSchema.parse(body);

    const mentee = await prisma.user.findUnique({
      where: { email: validated.menteeEmail },
    });

    if (!mentee) {
      return NextResponse.json({ error: 'Mentee not found' }, { status: 404 });
    }

    if (session.user.role !== 'ALUMNI' && session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Only alumni can be mentors' }, { status: 403 });
    }

    const existing = await prisma.mentorshipMatch.findUnique({
      where: { mentorId_menteeId: { mentorId: session.user.id, menteeId: mentee.id } },
    });

    if (existing) {
      return NextResponse.json({ error: 'Match already exists' }, { status: 409 });
    }

    const match = await prisma.mentorshipMatch.create({
      data: {
        mentorId: session.user.id,
        menteeId: mentee.id,
        pillar: validated.pillar,
        goals: validated.goals,
        status: 'PENDING',
      },
      include: {
        mentor: { select: { id: true, name: true, email: true } },
        mentee: { select: { id: true, name: true, email: true } },
      },
    });

    return NextResponse.json(match, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }
    console.error('POST /api/mentorship error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}