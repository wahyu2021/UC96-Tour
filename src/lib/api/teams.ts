import { prisma } from '@/lib/db';

interface GetPublicTeamsParams {
  search?: string;
  tournamentId?: string;
  page?: number;
  limit?: number;
}

export async function getPublicTeams(params: GetPublicTeamsParams = {}) {
  const { search, tournamentId, page = 1, limit = 12 } = params;
  const skip = (page - 1) * limit;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const whereClause: any = {
    status: 'APPROVED',
  };

  if (search) {
    whereClause.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { tag: { contains: search, mode: 'insensitive' } },
    ];
  }

  if (tournamentId && tournamentId !== 'ALL') {
    whereClause.tournamentId = tournamentId;
  }

  // Execute query
  const [teams, total] = await Promise.all([
    prisma.team.findMany({
      where: whereClause,
      include: {
        players: true,
        tournament: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: limit,
    }),
    prisma.team.count({
      where: whereClause,
    }),
  ]);

  return {
    teams,
    metadata: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getActiveTournaments() {
  return prisma.tournament.findMany({
    where: {
      status: {
        in: ['DRAFT', 'ONGOING'],
      },
    },
    orderBy: {
      startDate: 'asc',
    },
    select: {
      id: true,
      name: true,
      status: true,
    },
  });
}
