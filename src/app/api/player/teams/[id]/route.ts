import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

import { updateTeamSchema } from '@/lib/validations/team';

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const resolvedParams = await params;
    const teamId = resolvedParams.id;
    const body = await req.json();
    const result = updateTeamSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Data tidak valid', details: result.error.format() },
        { status: 400 }
      );
    }

    const data = result.data;

    // Pastikan tim adalah milik user dan merupakan master team
    const team = await prisma.team.findFirst({
      where: {
        id: teamId,
        ownerId: session.user.id,
      },
      include: { players: true },
    });

    if (!team) {
      return NextResponse.json(
        { error: 'Tim tidak ditemukan atau bukan milik Anda' },
        { status: 404 }
      );
    }

    // Karena relasi One-to-Many tidak mensupport upsert banyak sekaligus dengan mudah jika ada delete,
    // Kita hapus semua player lama lalu insert yang baru

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

    const updatedTeam = await prisma.$transaction(async (tx) => {
      // Hapus pemain lama
      await tx.player.deleteMany({
        where: { teamId: teamId },
      });

      // Update tim dan tambah pemain baru
      return tx.team.update({
        where: { id: teamId },
        data: {
          name: data.name,
          tag: data.tag,
          logoUrl: data.logoUrl,
          players: {
            create: playersData,
          },
        },
        include: { players: true },
      });
    });

    return NextResponse.json(updatedTeam, { status: 200 });
  } catch (error) {
    console.error('Update master team error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const resolvedParams = await params;
    const teamId = resolvedParams.id;

    const team = await prisma.team.findFirst({
      where: {
        id: teamId,
        ownerId: session.user.id,
      },
    });

    if (!team) {
      return NextResponse.json(
        { error: 'Tim tidak ditemukan atau bukan milik Anda' },
        { status: 404 }
      );
    }

    await prisma.team.delete({
      where: { id: teamId },
    });

    return NextResponse.json(
      { message: 'Tim berhasil dihapus' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete master team error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
