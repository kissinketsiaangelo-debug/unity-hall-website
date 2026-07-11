import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const createTicketSchema = z.object({
  subject: z.string().min(5).max(150),
  description: z.string().min(20).max(2000),
  category: z.enum(['MAINTENANCE', 'ACADEMIC', 'ACCOMMODATION', 'SECURITY', 'DINING', 'OTHER']).default('OTHER'),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT', 'EMERGENCY']).default('MEDIUM'),
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

    const tickets = await prisma.helpdeskTicket.findMany({
      where,
      include: {
        user: { select: { id: true, name: true, email: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });

    return NextResponse.json(tickets);
  } catch (error) {
    console.error('GET /api/helpdesk error:', error);
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
    const validated = createTicketSchema.parse(body);

    const ticket = await prisma.helpdeskTicket.create({
      data: {
        ...validated,
        userId: session.user.id,
        status: 'OPEN',
      },
      include: { user: { select: { id: true, name: true, email: true } } },
    });

    return NextResponse.json(ticket, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }
    console.error('POST /api/helpdesk error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
