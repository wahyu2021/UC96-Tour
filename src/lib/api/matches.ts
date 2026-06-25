import { prisma } from '@/lib/db';

interface GetPublicMatchesParams {
  date?: string; // Format: YYYY-MM-DD
}

export async function getPublicMatches(params: GetPublicMatchesParams = {}) {
  const { date } = params;

  // Build where clause
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const whereClause: any = {};

  if (date) {
    // Parsing date string to match start and end of the day in UTC
    // Assuming the tournament operates in a specific timezone, ideally we should handle timezone properly.
    // For simplicity, we treat the input date as the start of the day in UTC.
    const startDate = new Date(`${date}T00:00:00.000Z`);
    const endDate = new Date(`${date}T23:59:59.999Z`);

    whereClause.scheduledAt = {
      gte: startDate,
      lte: endDate,
    };
  }

  // Execute query
  const matches = await prisma.match.findMany({
    where: whereClause,
    orderBy: {
      scheduledAt: 'asc',
    },
    // Jika kita perlu data turnamen, asumsikan model Match punya relasi ke Tournament.
    // Di schema saat ini, Match tidak memiliki relasi langsung ke Tournament, hanya Group & Map.
  });

  return matches;
}

export async function getMatchDates() {
  // Ambil semua tanggal unik dari jadwal pertandingan yang ada
  // Karena Prisma tidak mendukung SELECT DISTINCT untuk tanggal dari DateTime secara native,
  // kita ambil semua scheduledAt lalu ekstrak tanggalnya di JavaScript.

  const matches = await prisma.match.findMany({
    select: {
      scheduledAt: true,
    },
    orderBy: {
      scheduledAt: 'asc',
    },
  });

  // Ekstrak tanggal unik (YYYY-MM-DD)
  const uniqueDates = new Set<string>();

  matches.forEach((match) => {
    // Konversi ke string format ISO Date (YYYY-MM-DD)
    const dateStr = match.scheduledAt.toISOString().split('T')[0];
    uniqueDates.add(dateStr);
  });

  return Array.from(uniqueDates);
}
