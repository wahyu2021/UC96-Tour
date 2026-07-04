import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { teamRegistrationSchema } from '@/lib/validations/team';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Validasi Zod
    const result = teamRegistrationSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Data tidak valid', details: result.error.format() },
        { status: 400 }
      );
    }

    const data = result.data;

    // 1.5 Cek kuota dan ketersediaan Turnamen
    const tournament = await prisma.tournament.findUnique({
      where: { id: data.tournamentId },
      include: {
        _count: {
          select: {
            teams: {
              where: { status: 'APPROVED' },
            },
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

    // Hitung status dinamis
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

    // 2. Cek apakah Nama Tim atau Tag sudah dipakai
    const existingTeam = await prisma.team.findFirst({
      where: {
        OR: [{ name: data.name }, { tag: data.tag }],
      },
    });

    if (existingTeam) {
      return NextResponse.json(
        {
          error:
            'Nama Tim atau Tag Tim sudah terdaftar. Silakan pilih yang lain.',
        },
        { status: 409 }
      );
    }

    // 3. Cek apakah ada pemain yang sudah terdaftar di tim lain (berdasarkan In-Game ID)
    const inGameIds = data.players.map((p) => p.inGameId);
    const existingPlayers = await prisma.player.findMany({
      where: {
        inGameId: { in: inGameIds },
      },
    });

    if (existingPlayers.length > 0) {
      return NextResponse.json(
        {
          error: `Pemain dengan In-Game ID (${existingPlayers.map((p) => p.inGameId).join(', ')}) sudah terdaftar di tim lain!`,
        },
        { status: 409 }
      );
    }

    // 4. Atur Role: Pemain ke-1 Kapten, 2-4 Anggota, 5 Cadangan (STANDBY)
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

    // 5. Simpan ke Database (Relasional Transaction)
    const newTeam = await prisma.team.create({
      data: {
        name: data.name,
        tag: data.tag,
        logoUrl: data.logoUrl,
        status: 'PENDING',
        tournamentId: data.tournamentId,
        players: {
          create: playersData,
        },
      },
    });

    return NextResponse.json(
      {
        message:
          'Pendaftaran tim berhasil disubmit dan menunggu verifikasi panitia!',
        team: newTeam,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan pada server saat memproses pendaftaran.' },
      { status: 500 }
    );
  }
}
