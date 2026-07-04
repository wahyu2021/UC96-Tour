import { prisma } from '@/lib/db';
import { GetPublicTeamsParams } from '@/types';

export async function getPublicTeams(params: GetPublicTeamsParams = {}) {
  const { search, tournamentId, page = 1, limit = 12 } = params;
  const skip = (page - 1) * limit;
  const whereClause: import('@prisma/client').Prisma.TeamWhereInput = {
    registrations: {
      some: {
        status: 'APPROVED',
      },
    },
  };

  if (search) {
    whereClause.OR = [
      { name: { contains: search } },
      { tag: { contains: search } },
    ];
  }

  if (tournamentId && tournamentId !== 'ALL') {
    whereClause.registrations = {
      some: {
        status: 'APPROVED',
        tournamentId: tournamentId,
      },
    };
  }

  // Execute query
  const [teams, total] = await Promise.all([
    prisma.team.findMany({
      where: whereClause,
      include: {
        players: true,
        registrations: {
          include: {
            tournament: true,
          },
        },
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
