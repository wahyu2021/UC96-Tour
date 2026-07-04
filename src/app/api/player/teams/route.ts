import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { z } from 'zod';

import { masterTeamSchema } from '@/lib/validations/team';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Ambil tim Master milik user ini (tournamentId = null)
    const teams = await prisma.team.findMany({
      where: {
        ownerId: session.user.id,
        tournamentId: null,
      },
      include: {
        players: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(teams, { status: 200 });
  } catch (error) {
    console.error('Fetch player teams error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const result = masterTeamSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Data tidak valid', details: result.error.format() },
        { status: 400 }
      );
    }

    const data = result.data;

    // Cek apakah ada master tim dengan nama/tag yang sama milik user ini
    const existingTeam = await prisma.team.findFirst({
      where: {
        ownerId: session.user.id,
        tournamentId: null,
        OR: [{ name: data.name }, { tag: data.tag }],
      },
    });

    if (existingTeam) {
      return NextResponse.json(
        { error: 'Anda sudah memiliki profil tim dengan Nama atau Tag ini.' },
        { status: 409 }
      );
    }

    // Atur role pemain (0 = CAPTAIN, 1-3 = MEMBER, 4 = STANDBY)
    const playersData = data.players.map((p, index) => ({
      ign: p.ign,
      inGameId: p.inGameId,
      role:
        index === 0
          ? ('CAPTAIN' as const)
          : index === 4
            ? ('STANDBY' as const)
            : ('MEMBER' as const),
    }));

    // Buat profil tim master
    const newTeam = await prisma.team.create({
      data: {
        name: data.name,
        tag: data.tag,
        logoUrl: data.logoUrl,
        ownerId: session.user.id,
        // tournamentId dibiarkan null
        status: 'APPROVED', // Profil master otomatis approved untuk dirinya sendiri
        players: {
          create: playersData,
        },
      },
      include: {
        players: true,
      },
    });

    return NextResponse.json(newTeam, { status: 201 });
  } catch (error) {
    console.error('Create master team error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
