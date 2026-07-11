import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const claimSchema = z.object({
  status: z.enum(['CLAIMED']),
});

const updateStatusSchema = z.object({
  status: z.enum(['REPORTED', 'MATCHED', 'CLAIMED', 'CLOSED']),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();

    const item = await prisma.lostFoundItem.findUnique({
      where: { id: params.id },
    });

    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    if (body.status === 'CLAIMED') {
      const validated = claimSchema.parse(body);
      const updated = await prisma.lostFoundItem.update({
        where: { id: params.id },
        data: {
          status: validated.status,
          claimedById: session.user.id,
          claimedAt: new Date(),
        },
        include: { user: { select: { id: true, name: true, email: true } } },
      });
      return NextResponse.json(updated);
    }

    const validated = updateStatusSchema.parse(body);
    const updated = await prisma.lostFoundItem.update({
      where: { id: params.id },
      data: { status: validated.status },
      include: { user: { select: { id: true, name: true, email: true } } },
    });

    return NextResponse.json(updated);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }
    console.error('PATCH /api/lost-and-found/[id] error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const item = await prisma.lostFoundItem.findUnique({
      where: { id: params.id },
    });

    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    if (item.userId !== session.user.id && session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await prisma.lostFoundItem.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('DELETE /api/lost-and-found/[id] error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
