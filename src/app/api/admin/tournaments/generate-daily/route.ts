import { NextResponse } from 'next/server';
import { withAdminRoute } from '@/lib/api-middleware';
import { prisma } from '@/lib/db';

export const POST = withAdminRoute(async (req) => {
  try {
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

    // Waktu mulai default untuk match
    const match1Time = new Date(startDate);
    
    const match2Time = new Date(startDate);
    match2Time.setMinutes(match2Time.getMinutes() + 45); // +45 menit
    
    const match3Time = new Date(startDate);
    match3Time.setMinutes(match3Time.getMinutes() + 90); // +90 menit

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
            { group: 'A', map: 'Erangel', scheduledAt: match1Time },
            { group: 'A', map: 'Miramar', scheduledAt: match2Time },
            { group: 'A', map: 'Sanhok', scheduledAt: match3Time },
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
});
