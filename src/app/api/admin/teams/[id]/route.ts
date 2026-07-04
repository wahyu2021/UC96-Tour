import { NextResponse } from 'next/server';

import { withAdminRoute } from '@/lib/api-middleware';
import { prisma } from '@/lib/db';

export const PATCH = withAdminRoute(async (request, context) => {
  try {
    const { id } = await context.params;

    const { status } = await request.json();

    if (!['PENDING', 'APPROVED', 'REJECTED'].includes(status)) {
      return NextResponse.json(
        { error: 'Status yang dikirim tidak valid' },
        { status: 400 }
      );
    }

    const updatedTeam = await prisma.tournamentRegistration.updateMany({
      where: { teamId: id },
      data: { status },
    });

    return NextResponse.json({
      message: `Status tim berhasil diubah menjadi ${status}`,
      team: updatedTeam,
    });
  } catch (error) {
    console.error('Error updating team status:', error);
    return NextResponse.json(
      { error: 'Gagal mengubah status tim. Terjadi kesalahan pada server.' },
      { status: 500 }
    );
  }
});
