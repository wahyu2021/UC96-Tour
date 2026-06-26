import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const id = resolvedParams.id;
    
    const tournament = await prisma.tournament.findUnique({
      where: { id },
      include: {
        teams: {
          where: { status: 'APPROVED' },
          select: {
            id: true,
            name: true,
            tag: true,
            logoUrl: true,
            players: {
              select: {
                ign: true,
                role: true,
              }
            }
          },
          orderBy: { name: 'asc' }
        },
      },
    });

    if (!tournament) {
      return NextResponse.json({ error: 'Turnamen tidak ditemukan' }, { status: 404 });
    }

    let dynamicStatus = tournament.status;
    const now = new Date();
    if (tournament.status !== 'COMPLETED') {
      if (now < tournament.startDate) {
        dynamicStatus = 'DRAFT';
      } else if (now >= tournament.startDate && now <= tournament.endDate) {
        dynamicStatus = 'ONGOING';
      } else if (now > tournament.endDate) {
        dynamicStatus = 'COMPLETED';
      }
    }

    return NextResponse.json({ ...tournament, dynamicStatus });
  } catch (error) {
    console.error('Failed to fetch tournament detail:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
