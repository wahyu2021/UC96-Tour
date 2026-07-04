import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const session = await requireAdmin();
    if (!session)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Ambil input tanggal jika ada
    let targetDate = new Date();
    try {
      const body = await req.json();
      if (body.date) {
        targetDate = new Date(body.date);
      }
    } catch {
      // Body kosong, gunakan hari ini
    }

    // Format tanggal untuk nama (DD/MM/YYYY)
    const formatter = new Intl.DateTimeFormat('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
    const dateName = formatter.format(targetDate);
    const tournamentName = `Daily Scrim - ${dateName}`;

    // Cek apakah turnamen dengan nama ini sudah ada
    const existing = await prisma.tournament.findUnique({
      where: { name: tournamentName },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Turnamen Daily Scrim untuk tanggal ini sudah dibuat!' },
        { status: 400 }
      );
    }

    // Set waktu mulai (jam 20:00) dan selesai (jam 23:59)
    const startDate = new Date(targetDate);
    startDate.setHours(20, 0, 0, 0);

    const endDate = new Date(targetDate);
    endDate.setHours(23, 59, 59, 999);

    // Buat Turnamen dan Matches dalam satu transaksi
    const newTournament = await prisma.tournament.create({
      data: {
        name: tournamentName,
        description: 'Fast-paced daily scrim tournament.',
        bannerUrl:
          'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80', // Default banner esport
        maxSlots: 16,
        startDate,
        endDate,
        status: 'ONGOING',
        matches: {
          create: [
            {
              map: 'Erangel',
              group: 'A',
              scheduledAt: new Date(new Date(startDate).setHours(20, 10, 0, 0)),
              status: 'SCHEDULED',
            },
            {
              map: 'Miramar',
              group: 'A',
              scheduledAt: new Date(new Date(startDate).setHours(20, 50, 0, 0)),
              status: 'SCHEDULED',
            },
            {
              map: 'Sanhok',
              group: 'A',
              scheduledAt: new Date(new Date(startDate).setHours(21, 30, 0, 0)),
              status: 'SCHEDULED',
            },
          ],
        },
      },
      include: {
        matches: true,
      },
    });

    return NextResponse.json(
      { message: 'Daily Scrim berhasil dibuat!', tournament: newTournament },
      { status: 201 }
    );
  } catch (error) {
    console.error('Auto-Generate Scrim error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat men-generate turnamen.' },
      { status: 500 }
    );
  }
}
