import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const newsletterSchema = z.object({
  email: z.string().email(),
  name: z.string().max(100).optional(),
  source: z.string().default('website'),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = newsletterSchema.parse(body);

    const existing = await prisma.newsletter.findUnique({
      where: { email: validated.email },
    });

    if (existing) {
      if (existing.status === 'UNSUBSCRIBED') {
        await prisma.newsletter.update({
          where: { email: validated.email },
          data: { status: 'ACTIVE', name: validated.name || existing.name },
        });
        return NextResponse.json({ message: 'Resubscribed successfully' });
      }
      return NextResponse.json({ message: 'Already subscribed' });
    }

    await prisma.newsletter.create({
      data: validated,
    });

    return NextResponse.json({ message: 'Subscribed successfully' }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }
    console.error('POST /api/newsletter error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    await prisma.newsletter.update({
      where: { email },
      data: { status: 'UNSUBSCRIBED' },
    });

    return NextResponse.json({ message: 'Unsubscribed successfully' });
  } catch (error) {
    console.error('DELETE /api/newsletter error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}