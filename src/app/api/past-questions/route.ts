import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const uploadSchema = z.object({
  courseCode: z.string().min(1).max(20),
  courseName: z.string().min(1).max(200),
  year: z.number().int().min(1900).max(2100),
  examType: z.enum(['MAIN_EXAM', 'MID_SEM', 'QUIZ', 'ASSIGNMENT', 'OTHER']).default('MAIN_EXAM'),
  fileUrl: z.string().url(),
  description: z.string().max(2000).optional(),
});

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const courseCode = searchParams.get('courseCode');
    const year = searchParams.get('year');
    const examType = searchParams.get('examType');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    const where: any = {};
    if (courseCode) where.courseCode = { contains: courseCode, mode: 'insensitive' };
    if (year) where.year = parseInt(year);
    if (examType) where.examType = examType;

    const [questions, total] = await Promise.all([
      prisma.pastQuestion.findMany({
        where,
        include: {
          user: { select: { id: true, name: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.pastQuestion.count({ where }),
    ]);

    return NextResponse.json({ questions, total, page, limit, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    console.error('GET /api/past-questions error:', error);
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
    const validated = uploadSchema.parse(body);

    const question = await prisma.pastQuestion.create({
      data: {
        ...validated,
        userId: session.user.id,
      },
      include: {
        user: { select: { id: true, name: true } },
      },
    });

    return NextResponse.json(question, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }
    console.error('POST /api/past-questions error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
