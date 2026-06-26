import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const tournamentId = searchParams.get('tournament');

  try {
    // Cari turnamen yang sedang berjalan jika tidak ada filter
    let targetTournamentId = tournamentId;
    if (!targetTournamentId) {
      const activeTournament = await prisma.tournament.findFirst({
        where: { status: 'ONGOING' },
        orderBy: { createdAt: 'desc' },
      });
      if (activeTournament) {
        targetTournamentId = activeTournament.id;
      }
    }

    const results = await prisma.matchResult.findMany({
      where: targetTournamentId
        ? { match: { tournamentId: targetTournamentId } }
        : undefined,
      include: {
        team: {
          select: { id: true, name: true, tag: true, logoUrl: true },
        },
      },
    });

    const leaderboardMap = new Map();

    results.forEach((result) => {
      const tId = result.teamId;
      if (!leaderboardMap.has(tId)) {
        leaderboardMap.set(tId, {
          teamId: tId,
          teamName: result.team.name,
          tag: result.team.tag,
          logoUrl: result.team.logoUrl,
          matchesPlayed: 0,
          totalKills: 0,
          placementPoints: 0,
          totalPoints: 0,
          wwcd: 0,
        });
      }

      const stats = leaderboardMap.get(tId);
      stats.matchesPlayed += 1;
      stats.totalKills += result.killPoints;
      stats.placementPoints += result.placementPoints;
      stats.totalPoints += result.totalPoints;
      if (result.isWwcd) stats.wwcd += 1;
    });

    const leaderboard = Array.from(leaderboardMap.values());

    // Sort berdasarkan aturan PUBG: Total Points DESC, WWCD DESC, Total Kills DESC
    leaderboard.sort((a, b) => {
      if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;
      if (b.wwcd !== a.wwcd) return b.wwcd - a.wwcd;
      return b.totalKills - a.totalKills;
    });

    // Beri penomoran ranking
    const rankedLeaderboard = leaderboard.map((team, index) => ({
      rank: index + 1,
      ...team,
    }));

    return NextResponse.json(
      { leaderboard: rankedLeaderboard, tournamentId: targetTournamentId },
      { status: 200 }
    );
  } catch (error) {
    console.error('Leaderboard error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leaderboard' },
      { status: 500 }
    );
  }
}
