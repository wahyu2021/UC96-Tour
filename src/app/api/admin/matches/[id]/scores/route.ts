import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { getPlacementPoints } from '@/lib/scoring';
import { UpdateMatchScoresRequest } from '@/types';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const matchId = resolvedParams.id;

  try {
    const session = await requireAdmin();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });const scores = await prisma.matchResult.findMany({
      where: { matchId },
      include: {
        team: {
          select: { id: true, name: true, logoUrl: true },
        },
      },
      orderBy: { finishPosition: 'asc' },
    });

    return NextResponse.json(scores, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch scores' },
      { status: 500 }
    );
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAdmin();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!session || session.user?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const resolvedParams = await params;
  const matchId = resolvedParams.id;

  try {
    const body: UpdateMatchScoresRequest = await req.json();
    const { scores } = body;

    if (!Array.isArray(scores)) {
      return NextResponse.json(
        { error: 'Invalid data format' },
        { status: 400 }
      );
    }

    const scoringRules = await prisma.scoringConfig.findMany();
    const rulesToUse = scoringRules.length > 0 ? scoringRules : undefined;

    const savedScores = await prisma.$transaction(
      scores.map((score) => {
        const placementPoints = getPlacementPoints(
          score.finishPosition,
          rulesToUse
        );
        const totalPoints = placementPoints + score.kills;
        const isWwcd = score.finishPosition === 1;

        return prisma.matchResult.upsert({
          where: {
            teamId_matchId: {
              teamId: score.teamId,
              matchId,
            },
          },
          update: {
            killPoints: score.kills,
            placementPoints,
            totalPoints,
            finishPosition: score.finishPosition,
            isWwcd,
          },
          create: {
            matchId,
            teamId: score.teamId,
            killPoints: score.kills,
            placementPoints,
            totalPoints,
            finishPosition: score.finishPosition,
            isWwcd,
          },
        });
      })
    );

    return NextResponse.json(
      { message: 'Scores saved successfully', count: savedScores.length },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error saving match scores:', error);
    return NextResponse.json(
      { error: 'Failed to save scores' },
      { status: 500 }
    );
  }
}
