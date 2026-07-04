import { NextResponse } from 'next/server';
import { withAdminRoute } from '@/lib/api-middleware';
import { prisma } from '@/lib/db';
import { getPlacementPoints } from '@/lib/scoring';
import { UpdateMatchScoresRequest } from '@/types';

export const GET = withAdminRoute(async (req, context) => {
  const resolvedParams = await context.params;
  const matchId = resolvedParams.id;

  try {
    const scores = await prisma.matchResult.findMany({
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
});

export const POST = withAdminRoute(async (req, context) => {
  const resolvedParams = await context.params;
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
});
