import { NextResponse } from 'next/server';
import { withAuthRoute } from '@/lib/api-middleware';
import { prisma } from '@/lib/db';

import { masterTeamSchema } from '@/lib/validations/team';

export const GET = withAuthRoute(async (req, context, session) => {
  try {
    // Ambil tim Master milik user ini (tournamentId = null)
    const teams = await prisma.team.findMany({
      where: {
        ownerId: session.user.id,
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
});

export const POST = withAuthRoute(async (req, context, session) => {
  try {
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
    
    // Handle Prisma Unique Constraint Error (P2002)
    if (typeof error === 'object' && error !== null && (error as { code?: string }).code === 'P2002') {
      return NextResponse.json(
        { error: 'Salah satu ID PUBG (In-Game ID) yang dimasukkan sudah terdaftar di tim lain!' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
});
