import { NextResponse } from 'next/server';
import { withAuthRoute } from '@/lib/api-middleware';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const joinSchema = z.object({
  tournamentId: z.string(),
});

export const POST = withAuthRoute(async (request, context, session) => {
  try {
    const body = await request.json();
    const validatedData = joinSchema.safeParse(body);
    if (!validatedData.success) {
      return NextResponse.json(
        { error: 'Invalid data', details: validatedData.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { tournamentId } = validatedData.data;

    // Fetch the captain's base team
    const team = await prisma.team.findFirst({
      where: { ownerId: session.user.id },
      include: {
        players: true,
        registrations: {
          where: { tournamentId },
        },
      },
    });

    if (!team) {
      return NextResponse.json(
        { error: 'Anda belum membuat profil tim. Silakan buat tim terlebih dahulu di Dashboard Kapten.' },
        { status: 404 }
      );
    }

    if (team.registrations.length > 0) {
      return NextResponse.json(
        { error: 'Tim Anda sudah terdaftar di turnamen ini.' },
        { status: 409 }
      );
    }

    // Validations: Logo
    if (!team.logoUrl) {
      return NextResponse.json(
        { error: 'Tim Anda belum memiliki logo. Silakan unggah logo tim terlebih dahulu.' },
        { status: 400 }
      );
    }

    // Validations: Roster (minimum 4 players)
    if (team.players.length < 4) {
      return NextResponse.json(
        { error: 'Tim Anda belum melengkapi minimal 4 pemain (1 Kapten + 3 Anggota).' },
        { status: 400 }
      );
    }

    // Validate Tournament
    const tournament = await prisma.tournament.findUnique({
      where: { id: tournamentId },
      include: {
        _count: {
          select: {
            registrations: {
              where: { status: 'APPROVED' },
            },
          },
        },
      },
    });

    if (!tournament) {
      return NextResponse.json({ error: 'Turnamen tidak ditemukan.' }, { status: 404 });
    }

    const now = new Date();
    if (tournament.status === 'COMPLETED' || now > tournament.endDate) {
      return NextResponse.json(
        { error: 'Pendaftaran turnamen ini sudah ditutup.' },
        { status: 400 }
      );
    }

    if (tournament._count.registrations >= tournament.maxSlots) {
      return NextResponse.json(
        { error: 'Kuota tim untuk turnamen ini sudah penuh.' },
        { status: 400 }
      );
    }

    // Create TournamentRegistration
    const registration = await prisma.tournamentRegistration.create({
      data: {
        teamId: team.id,
        tournamentId: tournament.id,
        status: 'PENDING',
      },
    });

    return NextResponse.json(
      {
        message: 'Berhasil mendaftar turnamen! Silakan tunggu verifikasi admin.',
        registration,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Quick Join error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan pada server saat memproses pendaftaran.' },
      { status: 500 }
    );
  }
});
