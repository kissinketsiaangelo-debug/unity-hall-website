import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const donationSchema = z.object({
  amount: z.number().positive().max(100000),
  method: z.enum(['MOBILE_MONEY', 'CARD', 'BANK_TRANSFER', 'CASH', 'CRYPTO', 'USSD']),
  purpose: z.enum([
    'EXPANSION_FUND', 'WASHROOM_RENOVATION', 'WATER_SUPPLY', 
    'ROOF_REPAIRS', 'JCR_RENOVATION', 'SCHOLARSHIP_FUND', 
    'GENERAL', 'EMERGENCY_RELIEF'
  ]),
  isAnonymous: z.boolean().default(false),
  donorName: z.string().max(100).optional(),
  donorEmail: z.string().email().optional(),
  donorPhone: z.string().max(20).optional(),
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const purpose = searchParams.get('purpose');
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');

    const where: any = {};
    if (purpose) where.purpose = purpose;
    if (status) where.status = status;

    const donations = await prisma.donation.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit,
      select: {
        id: true,
        amount: true,
        currency: true,
        method: true,
        purpose: true,
        isAnonymous: true,
        donorName: true,
        status: true,
        createdAt: true,
      },
    });

    const totals = await prisma.donation.groupBy({
      by: ['purpose'],
      where: { status: 'COMPLETED' },
      _sum: { amount: true },
      _count: { id: true },
    });

    return NextResponse.json({ donations, totals });
  } catch (error) {
    console.error('GET /api/donations error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = donationSchema.parse(body);

    const donation = await prisma.donation.create({
      data: {
        ...validated,
        transactionId: `TXN-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
      },
    });

    return NextResponse.json(donation, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }
    console.error('POST /api/donations error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}