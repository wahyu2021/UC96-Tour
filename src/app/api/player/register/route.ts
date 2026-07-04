import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const oneClickRegisterSchema = z.object({
  tournamentId: z.string(),
  masterTeamId: z.string(),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const result = oneClickRegisterSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Data tidak valid', details: result.error.format() },
        { status: 400 }
      );
    }

    const { tournamentId, masterTeamId } = result.data;

    // 1. Cek Master Team
    const masterTeam = await prisma.team.findFirst({
      where: {
        id: masterTeamId,
        ownerId: session.user.id,
        tournamentId: null,
      },
      include: { players: true },
    });

    if (!masterTeam) {
      return NextResponse.json(
        { error: 'Profil tim tidak ditemukan atau bukan milik Anda' },
        { status: 404 }
      );
    }

    // 2. Cek Kuota & Ketersediaan Turnamen
    const tournament = await prisma.tournament.findUnique({
      where: { id: tournamentId },
      include: {
        _count: {
          select: {
            teams: { where: { status: 'APPROVED' } },
          },
        },
      },
    });

    if (!tournament) {
      return NextResponse.json(
        { error: 'Turnamen tidak ditemukan' },
        { status: 404 }
      );
    }

    const now = new Date();
    if (tournament.status === 'COMPLETED' || now > tournament.endDate) {
      return NextResponse.json(
        { error: 'Pendaftaran turnamen ini sudah ditutup' },
        { status: 400 }
      );
    }

    if (tournament._count.teams >= tournament.maxSlots) {
      return NextResponse.json(
        { error: 'Kuota tim untuk turnamen ini sudah penuh' },
        { status: 400 }
      );
    }

    // 3. Cek apakah tim ini sudah terdaftar (berdasarkan Tag/Name di turnamen ini)
    const existingRegistration = await prisma.team.findFirst({
      where: {
        tournamentId,
        OR: [{ name: masterTeam.name }, { tag: masterTeam.tag }],
      },
    });

    if (existingRegistration) {
      return NextResponse.json(
        { error: 'Tim Anda sudah terdaftar di turnamen ini.' },
        { status: 409 }
      );
    }

    // 4. Cek apakah pemain sudah terdaftar di tim lain dalam turnamen yang sama
    const inGameIds = masterTeam.players.map((p) => p.inGameId);
    const existingPlayersInTournament = await prisma.player.findMany({
      where: {
        inGameId: { in: inGameIds },
        team: {
          tournamentId: tournamentId,
        },
      },
    });

    if (existingPlayersInTournament.length > 0) {
      return NextResponse.json(
        {
          error: `Pemain dengan In-Game ID (${existingPlayersInTournament.map((p) => p.inGameId).join(', ')}) sudah terdaftar di tim lain pada turnamen ini!`,
        },
        { status: 409 }
      );
    }

    // 5. Kloning Master Team menjadi Pendaftaran Turnamen
    const playersData = masterTeam.players.map((p) => ({
      ign: p.ign,
      inGameId: p.inGameId,
      role: p.role,
    }));

    const newTeamRegistration = await prisma.team.create({
      data: {
        name: masterTeam.name,
        tag: masterTeam.tag,
        logoUrl: masterTeam.logoUrl,
        ownerId: session.user.id,
        tournamentId: tournamentId,
        status: 'PENDING',
        players: {
          create: playersData,
        },
      },
    });

    return NextResponse.json(
      {
        message: 'Pendaftaran tim berhasil disubmit dan masuk ke Waiting List!',
        team: newTeamRegistration,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('1-Click Registration error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan pada server saat memproses pendaftaran.' },
      { status: 500 }
    );
  }
}
