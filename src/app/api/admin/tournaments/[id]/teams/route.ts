import { NextResponse } from 'next/server';
import { withAdminRoute } from '@/lib/api-middleware';
import { prisma } from '@/lib/db';

export const GET = withAdminRoute(async (req, context) => {
  const resolvedParams = await context.params;
  const tournamentId = resolvedParams.id;

  try {
    const teams = await prisma.team.findMany({
      where: {
        registrations: {
          some: { tournamentId, status: 'APPROVED' },
        },
      },
      select: { id: true, name: true, logoUrl: true },
      orderBy: { name: 'asc' },
    });

    return NextResponse.json(teams, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch teams' },
      { status: 500 }
    );
  }
});
