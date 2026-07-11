import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const checkInSchema = z.object({
  semester: z.string().min(1).max(50),
  academicYear: z.string().min(1).max(20),
  location: z.object({
    building: z.string().optional(),
    room: z.string().optional(),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number(),
    }).optional(),
  }).optional(),
});

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const checkIn = await prisma.semesterCheckIn.findFirst({
      where: { userId: session.user.id },
      orderBy: { checkInAt: 'desc' },
    });

    return NextResponse.json({ checkIn });
  } catch (error) {
    console.error('GET /api/semester-checkin error:', error);
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
    const validated = checkInSchema.parse(body);

    const activeCheckIn = await prisma.semesterCheckIn.findFirst({
      where: { userId: session.user.id, status: 'IN_HALL' },
    });

    if (activeCheckIn) {
      return NextResponse.json({ error: 'Already checked in for this semester' }, { status: 409 });
    }

    const checkIn = await prisma.semesterCheckIn.create({
      data: {
        userId: session.user.id,
        semester: validated.semester,
        academicYear: validated.academicYear,
        location: validated.location ?? undefined,
        status: 'IN_HALL',
      },
    });

    return NextResponse.json(checkIn, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }
    console.error('POST /api/semester-checkin error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const activeCheckIn = await prisma.semesterCheckIn.findFirst({
      where: { userId: session.user.id, status: 'IN_HALL' },
    });

    if (!activeCheckIn) {
      return NextResponse.json({ error: 'No active check-in found' }, { status: 404 });
    }

    const checkIn = await prisma.semesterCheckIn.update({
      where: { id: activeCheckIn.id },
      data: {
        checkOutAt: new Date(),
        status: 'OUT_HALL',
      },
    });

    return NextResponse.json(checkIn);
  } catch (error) {
    console.error('PATCH /api/semester-checkin error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
