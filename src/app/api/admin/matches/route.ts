import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const matchSchema = z.object({
  tournamentId: z.string().min(1, 'Turnamen harus dipilih'),
  scheduledAt: z.string().min(1, 'Tanggal dan jam harus diisi'),
  group: z.string().optional(),
  map: z.string().min(1, 'Map harus dipilih'),
});

export async function GET() {
  try {
    const session = await requireAdmin();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

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
}

export async function POST(request: Request) {
  try {
    const session = await requireAdmin();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = matchSchema.parse(body);

    const match = await prisma.match.create({
      data: {
        tournamentId: validatedData.tournamentId,
        scheduledAt: new Date(validatedData.scheduledAt),
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
}
