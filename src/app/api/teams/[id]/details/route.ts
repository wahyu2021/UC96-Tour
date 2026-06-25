import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const p = await params;
    const teamId = p.id;

    if (!teamId) {
      return NextResponse.json(
        { error: 'Team ID is required' },
        { status: 400 }
      );
    }

    const team = await prisma.team.findUnique({
      where: { id: teamId },
      include: {
        players: true,
        matchResults: {
          include: {
            match: {
              include: {
                tournament: true,
              },
            },
          },
          orderBy: {
            match: {
              scheduledAt: 'desc',
            },
          },
        },
      },
    });

    if (!team) {
      return NextResponse.json({ error: 'Team not found' }, { status: 404 });
    }

    // Only allow APPROVED teams to be viewed publicly
    if (team.status !== 'APPROVED') {
      return NextResponse.json(
        { error: 'Team not found or not approved' },
        { status: 404 }
      );
    }

    return NextResponse.json(team);
  } catch (error) {
    console.error('Failed to fetch team details:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
