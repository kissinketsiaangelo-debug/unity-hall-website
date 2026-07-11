import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const patchSchema = z.object({
  isActive: z.boolean().optional(),
  startsAt: z.string().refine((v) => !isNaN(Date.parse(v)), 'Invalid date').optional(),
  endsAt: z.string().refine((v) => !isNaN(Date.parse(v)), 'Invalid date').optional(),
  title: z.string().min(5).max(200).optional(),
  description: z.string().max(5000).optional(),
});

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await req.json();
    const validated = patchSchema.parse(body);

    const updateData: any = {};
    if (validated.isActive !== undefined) updateData.isActive = validated.isActive;
    if (validated.title !== undefined) updateData.title = validated.title;
    if (validated.description !== undefined) updateData.description = validated.description;
    if (validated.startsAt) updateData.startsAt = new Date(validated.startsAt);
    if (validated.endsAt) updateData.endsAt = new Date(validated.endsAt);

    const poll = await prisma.poll.update({
      where: { id: params.id },
      data: updateData,
      include: {
        createdBy: { select: { id: true, name: true, email: true } },
        _count: { select: { votes: true } },
      },
    });

    return NextResponse.json(poll);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }
    console.error('PATCH /api/admin/polls/[id] error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await prisma.poll.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Poll deleted successfully' });
  } catch (error) {
    console.error('DELETE /api/admin/polls/[id] error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
