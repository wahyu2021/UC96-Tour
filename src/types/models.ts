import { Prisma } from '@prisma/client';

export type TournamentWithTeams = Prisma.TournamentGetPayload<{
  include: { teams: true };
}>;

export type TournamentWithMatches = Prisma.TournamentGetPayload<{
  include: { matches: true };
}>;

export type TeamWithPlayers = Prisma.TeamGetPayload<{
  include: { players: true };
}>;

export type MatchWithResults = Prisma.MatchGetPayload<{
  include: { matchResults: true };
}>;

export type TeamWithAllRelations = Prisma.TeamGetPayload<{
  include: { players: true; matchResults: true };
}>;
