import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const bookingSchema = z.object({
  amenity: z.string().min(2).max(50),
  date: z.string().datetime(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  purpose: z.string().max(500).optional(),
});

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const date = searchParams.get('date');
    const amenity = searchParams.get('amenity');
    const status = searchParams.get('status');

    const where: any = {};
    if (amenity) where.amenity = amenity as any;
    if (date) {
      const start = new Date(date);
      const end = new Date(start);
      end.setDate(end.getDate() + 1);
      where.date = { gte: start, lt: end };
    }
    if (status) where.status = status;

    const bookings = await prisma.amenityBooking.findMany({
      where,
      include: { user: { select: { id: true, name: true, email: true } } },
      orderBy: { startTime: 'asc' },
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error('GET /api/bookings error:', error);
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
    const validated = bookingSchema.parse(body);

    const startTime = new Date(validated.startTime);
    const endTime = new Date(validated.endTime);

    if (endTime <= startTime) {
      return NextResponse.json({ error: 'End time must be after start time' }, { status: 400 });
    }

    const conflict = await prisma.amenityBooking.findFirst({
      where: {
        amenity: validated.amenity as any,
        status: { in: ['PENDING', 'CONFIRMED'] },
        OR: [
          { startTime: { lt: endTime }, endTime: { gt: startTime } },
        ],
      },
    });

    if (conflict) {
      return NextResponse.json({ error: 'Time slot already booked' }, { status: 409 });
    }

    const booking = await prisma.amenityBooking.create({
      data: {
        amenity: validated.amenity as any,
        purpose: validated.purpose,
        userId: session.user.id,
        date: new Date(validated.date),
        startTime,
        endTime,
        status: 'PENDING',
      },
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }
    console.error('POST /api/bookings error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}