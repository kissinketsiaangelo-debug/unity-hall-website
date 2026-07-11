import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const profileSchema = z.object({
  sleepSchedule: z.string().min(1).max(100),
  studyHabits: z.string().min(1).max(200),
  cleanliness: z.number().int().min(1).max(5),
  quietHours: z.string().min(1).max(100),
  bio: z.string().min(1).max(2000),
  course: z.string().max(100).optional(),
  yearOfStudy: z.number().int().min(1).max(8).optional(),
  interests: z.array(z.string().max(50)).optional(),
  preferredBlock: z.enum(['BLOCK_A', 'BLOCK_B', 'ANNEX', 'FLATS', 'COMMON']).optional(),
  isActive: z.boolean().optional(),
});

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const profile = await prisma.roommateProfile.findUnique({
      where: { userId: session.user.id },
    });

    return NextResponse.json(profile ?? {});
  } catch (error) {
    console.error('GET /api/roommate-matching/profile error:', error);
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
    const validated = profileSchema.parse(body);

    const profile = await prisma.roommateProfile.upsert({
      where: { userId: session.user.id },
      update: validated,
      create: {
        ...validated,
        userId: session.user.id,
      },
    });

    return NextResponse.json(profile, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }
    console.error('POST /api/roommate-matching/profile error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
