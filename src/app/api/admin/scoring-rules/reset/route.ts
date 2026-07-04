import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

const DEFAULT_PUBG_RULES = [
  { rank: 1, placementPoints: 10 },
  { rank: 2, placementPoints: 6 },
  { rank: 3, placementPoints: 5 },
  { rank: 4, placementPoints: 4 },
  { rank: 5, placementPoints: 3 },
  { rank: 6, placementPoints: 2 },
  { rank: 7, placementPoints: 1 },
  { rank: 8, placementPoints: 1 },
];

export async function POST() {
  const session = await requireAdmin();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!session || session.user?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Generate rules for rank 1 to 20
    const rules = Array.from({ length: 20 }, (_, i) => {
      const rank = i + 1;
      const defaultRule = DEFAULT_PUBG_RULES.find((r) => r.rank === rank);
      return {
        rank,
        placementPoints: defaultRule ? defaultRule.placementPoints : 0,
      };
    });

    // Clear existing rules and insert default
    await prisma.$transaction([
      prisma.scoringConfig.deleteMany({}),
      prisma.scoringConfig.createMany({
        data: rules,
      }),
    ]);

    return NextResponse.json({
      success: true,
      message: 'Rules reset to default',
    });
  } catch (error) {
    console.error('Failed to reset scoring rules:', error);
    return NextResponse.json(
      { error: 'Gagal mereset aturan poin' },
      { status: 500 }
    );
  }
}
