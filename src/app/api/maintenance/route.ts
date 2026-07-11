import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const maintenanceSchema = z.object({
  title: z.string().min(5).max(100),
  description: z.string().min(20).max(2000),
  category: z.enum(['PLUMBING', 'ELECTRICAL', 'CARPENTRY', 'CLEANING', 'SECURITY', 'HVAC', 'STRUCTURAL', 'OTHER']),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).default('MEDIUM'),
  roomNumber: z.string().max(20).optional(),
  images: z.array(z.string().url()).optional(),
});

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '20');

    const where: any = {};
    if (session.user.role === 'RESIDENT') {
      where.userId = session.user.id;
    }
    if (status) where.status = status;
    if (category) where.category = category;

    const requests = await prisma.maintenanceRequest.findMany({
      where,
      include: {
        user: { select: { id: true, name: true, email: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });

    return NextResponse.json(requests);
  } catch (error) {
    console.error('GET /api/maintenance error:', error);
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
    const validated = maintenanceSchema.parse(body);

    const request = await prisma.maintenanceRequest.create({
      data: {
        ...validated,
        userId: session.user.id,
        status: 'PENDING',
      },
      include: { user: { select: { id: true, name: true, email: true } } },
    });

    return NextResponse.json(request, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }
    console.error('POST /api/maintenance error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}