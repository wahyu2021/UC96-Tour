import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Verifikasi keamanan ganda di level API
    const session = await getServerSession(authOptions);

    if (!session || (session.user as { role?: string }).role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Tidak berwenang mengubah data!' },
        { status: 401 }
      );
    }

    const { status } = await request.json();

    if (!['PENDING', 'APPROVED', 'REJECTED'].includes(status)) {
      return NextResponse.json(
        { error: 'Status yang dikirim tidak valid' },
        { status: 400 }
      );
    }

    const updatedTeam = await prisma.team.update({
      where: { id: params.id },
      data: { status },
    });

    return NextResponse.json({
      message: `Status tim ${updatedTeam.name} berhasil diubah menjadi ${status}`,
      team: updatedTeam,
    });
  } catch (error) {
    console.error('Error updating team status:', error);
    return NextResponse.json(
      { error: 'Gagal mengubah status tim. Terjadi kesalahan pada server.' },
      { status: 500 }
    );
  }
}
