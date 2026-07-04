import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAdmin();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!session || session.user?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const resolvedParams = await params;
  const tournamentId = resolvedParams.id;

  try {
    const teams = await prisma.team.findMany({
      where: { tournamentId, status: 'APPROVED' },
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
}
