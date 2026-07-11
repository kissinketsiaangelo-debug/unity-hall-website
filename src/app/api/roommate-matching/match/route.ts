import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

interface ProfileScore {
  sleepSchedule: string;
  studyHabits: string;
  cleanliness: number;
  quietHours: string;
  interests: string[];
  preferredBlock: string | null;
}

function calculateScore(a: ProfileScore, b: ProfileScore): number {
  let score = 0;

  const shared = a.interests.filter((i) => b.interests.includes(i));
  score += shared.length * 10;

  const cleanlinessDiff = Math.abs(a.cleanliness - b.cleanliness);
  score += Math.max(0, (5 - cleanlinessDiff) * 5);

  if (a.sleepSchedule === b.sleepSchedule) score += 15;
  if (a.studyHabits === b.studyHabits) score += 10;
  if (a.quietHours === b.quietHours) score += 10;
  if (a.preferredBlock && b.preferredBlock && a.preferredBlock === b.preferredBlock) score += 10;

  return score;
}

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const profile = await prisma.roommateProfile.findUnique({
      where: { userId: session.user.id },
    });
    if (!profile) {
      return NextResponse.json({ error: 'Create a profile first' }, { status: 400 });
    }

    const matches = await prisma.roommateMatch.findMany({
      where: {
        OR: [
          { profile1Id: profile.id },
          { profile2Id: profile.id },
        ],
      },
      include: {
        profile1: { include: { user: { select: { id: true, name: true, email: true, image: true } } } },
        profile2: { include: { user: { select: { id: true, name: true, email: true, image: true } } } },
      },
      orderBy: { score: 'desc' },
    });

    const result = matches.map((m) => {
      const other = m.profile1Id === profile.id ? m.profile2 : m.profile1;
      return { id: m.id, score: m.score, status: m.status, profile: other };
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('GET /api/roommate-matching/match error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const profile = await prisma.roommateProfile.findUnique({
      where: { userId: session.user.id },
    });
    if (!profile) {
      return NextResponse.json({ error: 'Create a profile first' }, { status: 400 });
    }

    const otherProfiles = await prisma.roommateProfile.findMany({
      where: {
        userId: { not: session.user.id },
        isActive: true,
      },
      include: {
        user: { select: { id: true, name: true, email: true, image: true } },
      },
    });

    const scored = otherProfiles.map((other) => ({
      profile: other,
      score: calculateScore(profile, other),
    }));

    scored.sort((a, b) => b.score - a.score);
    const top = scored.slice(0, 10);

    const data = top.map(({ profile: other, score }) => ({
      profile1Id: profile.id,
      profile2Id: other.id,
      score,
    }));

    await prisma.roommateMatch.createMany({ data, skipDuplicates: true });

    return NextResponse.json(top.map((t) => ({ profile: t.profile, score: t.score })), { status: 201 });
  } catch (error) {
    console.error('POST /api/roommate-matching/match error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
