import { prisma } from '@/lib/db';

export async function getGlobalStatistics() {
  const [tournamentsCount, teamsCount, playersCount] = await Promise.all([
    prisma.tournament.count(),
    prisma.team.count({ where: { status: 'APPROVED' } }),
    prisma.player.count(),
  ]);

  const now = new Date();
  const availableTournaments = await prisma.tournament.findMany({
    where: {
      endDate: { gte: now },
      status: { not: 'COMPLETED' },
    },
    select: {
      _count: { select: { teams: { where: { status: 'APPROVED' } } } },
      maxSlots: true,
    },
  });

  const hasActiveRegistration = availableTournaments.some(
    (t) => t._count.teams < t.maxSlots
  );

  return {
    tournamentsCount,
    teamsCount,
    playersCount,
    hasActiveRegistration,
  };
}

export async function getFeaturedTournaments() {
  return prisma.tournament.findMany({
    where: {
      status: { in: ['ONGOING', 'DRAFT'] },
    },
    orderBy: { startDate: 'asc' },
    take: 4,
    include: {
      _count: {
        select: { teams: { where: { status: 'APPROVED' } } },
      },
    },
  });
}

export async function getMiniLeaderboard() {
  // Cari turnamen yang ONGOING atau COMPLETED dan memiliki match result
  const latestTournament = await prisma.tournament.findFirst({
    where: {
      status: { in: ['ONGOING', 'COMPLETED'] },
      matches: { some: { matchResults: { some: {} } } },
    },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
    },
  });

  if (!latestTournament) return null;

  // Tarik data tim dan skornya
  const teams = await prisma.team.findMany({
    where: { tournamentId: latestTournament.id, status: 'APPROVED' },
    select: {
      id: true,
      name: true,
      tag: true,
      logoUrl: true,
      matchResults: {
        select: {
          totalPoints: true,
          killPoints: true,
          placementPoints: true,
          isWwcd: true,
        },
      },
    },
  });

  const leaderboard = teams.map((team) => {
    let totalScore = 0;
    let killPoints = 0;
    let placementPoints = 0;
    let wwcdCount = 0;
    const matchesPlayed = team.matchResults.length;

    for (const result of team.matchResults) {
      totalScore += result.totalPoints;
      killPoints += result.killPoints;
      placementPoints += result.placementPoints;
      if (result.isWwcd) wwcdCount++;
    }

    return {
      id: team.id,
      name: team.name,
      tag: team.tag,
      logoUrl: team.logoUrl,
      totalScore,
      killPoints,
      placementPoints,
      wwcdCount,
      matchesPlayed,
    };
  });

  // Urutkan berdasarkan total score -> kill points -> wwcd
  leaderboard.sort((a, b) => {
    if (b.totalScore !== a.totalScore) return b.totalScore - a.totalScore;
    if (b.killPoints !== a.killPoints) return b.killPoints - a.killPoints;
    return b.wwcdCount - a.wwcdCount;
  });

  // Berikan peringkat 1 - N dan ambil 5 teratas
  const rankedLeaderboard = leaderboard.slice(0, 5).map((t, idx) => ({
    ...t,
    rank: idx + 1,
  }));

  return {
    tournament: latestTournament,
    leaderboard: rankedLeaderboard,
  };
}
