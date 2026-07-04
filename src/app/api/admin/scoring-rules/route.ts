import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import { UpdateScoringRulesRequest } from '@/types';

export async function GET() {
  try {
    const session = await requireAdmin();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });const rules = await prisma.scoringConfig.findMany({
      orderBy: { rank: 'asc' },
    });
    return NextResponse.json(rules);
  } catch (error) {
    console.error('Failed to fetch scoring rules:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil aturan poin' },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  const session = await requireAdmin();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!session || session.user?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body: UpdateScoringRulesRequest = await req.json();
    const { rules } = body;

    if (!Array.isArray(rules)) {
      return NextResponse.json(
        { error: 'Payload tidak valid' },
        { status: 400 }
      );
    }

    // Delete ranks that are no longer in the payload
    const ranksToKeep = rules.map((r: { rank: number }) => r.rank);

    await prisma.$transaction([
      prisma.scoringConfig.deleteMany({
        where: {
          rank: { notIn: ranksToKeep },
        },
      }),
      ...rules.map((rule: { rank: number; placementPoints: number }) =>
        prisma.scoringConfig.upsert({
          where: { rank: rule.rank },
          update: { placementPoints: rule.placementPoints },
          create: { rank: rule.rank, placementPoints: rule.placementPoints },
        })
      ),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to update scoring rules:', error);
    return NextResponse.json(
      { error: 'Gagal memperbarui aturan poin' },
      { status: 500 }
    );
  }
}
