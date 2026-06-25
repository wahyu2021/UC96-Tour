import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  try {
    const rules = await prisma.scoringConfig.findMany({
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
  const session = await getServerSession(authOptions);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!session || (session.user as any)?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { rules } = body; // Array of { rank: number, placementPoints: number }

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
