import { Metadata } from 'next';
import { ScoreInputClient } from '@/components/features/admin/matches/ScoreInputClient';
import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Input Skor Pertandingan - UC96 Tournament',
};

export default async function ScoreInputPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== 'ADMIN') {
    redirect('/auth/login');
  }

  const resolvedParams = await params;
  const matchId = resolvedParams.id;

  const match = await prisma.match.findUnique({
    where: { id: matchId },
    include: {
      tournament: true,
    },
  });

  if (!match) {
    notFound();
  }

  const teams = match.tournamentId
    ? await prisma.team.findMany({
        where: {
          registrations: {
            some: {
              tournamentId: match.tournamentId,
              status: 'APPROVED',
            },
          },
        },
        select: {
          id: true,
          name: true,
          tag: true,
          logoUrl: true,
        },
        orderBy: { name: 'asc' },
      })
    : [];

  const existingScores = await prisma.matchResult.findMany({
    where: { matchId },
  });

  const rules = await prisma.scoringConfig.findMany({
    orderBy: { rank: 'asc' },
  });

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <ScoreInputClient
        match={match}
        teams={teams}
        initialScores={existingScores}
        scoringRules={rules}
      />
    </div>
  );
}
