import { NextResponse } from 'next/server';
import { withAdminRoute } from '@/lib/api-middleware';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const matchSchema = z.object({
  tournamentId: z.string().min(1, 'Turnamen harus dipilih'),
  scheduledAt: z.string().min(1, 'Tanggal dan jam harus diisi'),
  group: z.string().optional(),
  map: z.string().min(1, 'Map harus dipilih'),
});

export const GET = withAdminRoute(async () => {
  try {
    const matches = await prisma.match.findMany({
      orderBy: { scheduledAt: 'desc' },
      include: {
        tournament: {
          select: { id: true, name: true },
        },
      },
    });

    return NextResponse.json(matches);
  } catch {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
});

export const POST = withAdminRoute(async (request) => {
  try {
    const body = await request.json();
    const validatedData = matchSchema.parse(body);

    const matchDate = new Date(validatedData.scheduledAt);

    const tournament = await prisma.tournament.findUnique({
      where: { id: validatedData.tournamentId }
    });

    if (!tournament) {
      return NextResponse.json({ error: 'Turnamen tidak ditemukan' }, { status: 404 });
    }

    // Set matchDate to end of day if we want to allow matches until the end of the tournament day
    // or just compare directly.
    const tourStart = new Date(tournament.startDate);
    tourStart.setHours(0, 0, 0, 0);
    const tourEnd = new Date(tournament.endDate);
    tourEnd.setHours(23, 59, 59, 999);

    if (matchDate < tourStart || matchDate > tourEnd) {
      return NextResponse.json({ 
        error: `Tanggal match harus berada dalam rentang turnamen (${tourStart.toLocaleDateString('id-ID')} - ${tourEnd.toLocaleDateString('id-ID')})` 
      }, { status: 400 });
    }

    const match = await prisma.match.create({
      data: {
        tournamentId: validatedData.tournamentId,
        scheduledAt: matchDate,
        group: validatedData.group || '',
        map: validatedData.map,
        status: 'SCHEDULED', // Default
      },
      include: {
        tournament: {
          select: { id: true, name: true },
        },
      },
    });

    return NextResponse.json(match, { status: 201 });
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
});
