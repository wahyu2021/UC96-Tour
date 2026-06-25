import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const tournamentSchema = z.object({
  name: z.string().min(3, 'Nama turnamen minimal 3 karakter'),
  description: z.string().optional(),
  startDate: z.string(),
  endDate: z.string(),
  maxSlots: z.number().int().min(2).default(32),
  prizePool: z.string().optional(),
});

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!session || (session.user as any)?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const tournaments = await prisma.tournament.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { teams: true },
        },
      },
    });

    // Menghitung status dinamis berdasarkan tanggal jika masih berstatus ONGOING/DRAFT di DB
    const processedTournaments = tournaments.map((tour) => {
      let dynamicStatus = tour.status;
      const now = new Date();
      if (tour.status !== 'COMPLETED') {
        if (now < tour.startDate) {
          dynamicStatus = 'DRAFT'; // atau 'UPCOMING' tapi kita gunakan enum yang ada
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
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!session || (session.user as any)?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = tournamentSchema.parse(body);

    const tournament = await prisma.tournament.create({
      data: {
        ...validatedData,
        startDate: new Date(validatedData.startDate),
        endDate: new Date(validatedData.endDate),
        status: 'ONGOING', // Default aktif, perhitungan dinamis dilakukan di FE/GET API
      },
    });

    return NextResponse.json(tournament, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Data tidak valid', details: error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
