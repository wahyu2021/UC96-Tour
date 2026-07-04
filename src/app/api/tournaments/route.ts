import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const tournaments = await prisma.tournament.findMany({
      orderBy: { startDate: 'desc' },
      include: {
        _count: {
          select: { registrations: { where: { status: 'APPROVED' } } },
        },
      },
    });

    // Menghitung status dinamis berdasarkan tanggal jika masih berstatus ONGOING/DRAFT di DB
    const processedTournaments = tournaments.map((tour) => {
      let dynamicStatus = tour.status;
      const now = new Date();
      if (tour.status !== 'COMPLETED') {
        if (now < tour.startDate) {
          dynamicStatus = 'DRAFT';
        } else if (now >= tour.startDate && now <= tour.endDate) {
          dynamicStatus = 'ONGOING';
        } else if (now > tour.endDate) {
          dynamicStatus = 'COMPLETED';
        }
      }
      return { ...tour, dynamicStatus };
    });

    return NextResponse.json(processedTournaments);
  } catch (err) {
    console.error('Failed to fetch public tournaments:', err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
