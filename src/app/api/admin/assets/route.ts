import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const createSchema = z.object({
  name: z.string().min(2).max(200),
  type: z.enum(['FURNITURE', 'ELECTRONICS', 'APPLIANCE', 'SPORTS_EQUIPMENT', 'VEHICLE', 'OTHER']),
  location: z.string().min(2).max(200),
  condition: z.enum(['EXCELLENT', 'GOOD', 'FAIR', 'POOR', 'DAMAGED', 'REPLACED']).default('GOOD'),
  serialNumber: z.string().max(100).optional(),
  purchaseDate: z.string().optional(),
  notes: z.string().max(5000).optional(),
});

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');
    const status = searchParams.get('status');
    const condition = searchParams.get('condition');
    const limit = parseInt(searchParams.get('limit') || '50');

    const where: any = {};
    if (type) where.type = type;
    if (status) where.status = status;
    if (condition) where.condition = condition;

    const assets = await prisma.asset.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit,
    });

    return NextResponse.json(assets);
  } catch (error) {
    console.error('GET /api/admin/assets error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await req.json();
    const validated = createSchema.parse(body);

    const data: any = { ...validated };
    if (data.purchaseDate) {
      data.purchaseDate = new Date(data.purchaseDate);
    }

    const asset = await prisma.asset.create({
      data,
    });

    return NextResponse.json(asset, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }
    console.error('POST /api/admin/assets error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
