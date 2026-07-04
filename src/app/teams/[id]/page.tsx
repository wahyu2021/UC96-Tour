import { Metadata } from 'next';
import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';
import {
  Users,
  Trophy,
  Target as TargetIcon,
  Crown,
  ArrowLeft,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const p = await params;
  const team = await prisma.team.findUnique({
    where: { id: p.id },
    select: { name: true },
  });

  if (!team) return { title: 'Tim Tidak Ditemukan - UC96 Tournament' };

  return {
    title: `${team.name} - UC96 Tournament`,
    description: `Profil dan riwayat pertandingan tim ${team.name} di turnamen UC96.`,
  };
}

export default async function TeamDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const p = await params;
  const team = await prisma.team.findUnique({
    where: { id: p.id },
    include: {
      players: true,
      tournament: true,
      matchResults: {
        include: {
          match: {
            include: {
              tournament: true,
            },
          },
        },
        orderBy: {
          match: {
            scheduledAt: 'desc',
          },
        },
      },
    },
  });

  const session = await getServerSession(authOptions);
  const isAdmin = session?.user?.role === 'ADMIN';

  if (!team || (team.status !== 'APPROVED' && !isAdmin)) {
    notFound();
  }

  // Calculate aggregates
  const totalMatches = team.matchResults.length;
  const totalKills = team.matchResults.reduce(
    (acc, curr) => acc + curr.killPoints,
    0
  );
  const totalPoints = team.matchResults.reduce(
    (acc, curr) => acc + curr.totalPoints,
    0
  );
  const totalWwcd = team.matchResults.filter((r) => r.isWwcd).length;
  const initials = team.name.substring(0, 2).toUpperCase();

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        href="/leaderboard"
        className="mb-8 inline-flex items-center text-sm font-semibold text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Kembali ke Leaderboard
      </Link>

      {/* Hero Section */}
      <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-[#121212]">
        <div className="h-32 w-full bg-gradient-to-r from-neutral-900 to-neutral-800 md:h-48 dark:from-black dark:to-neutral-900"></div>
        <div className="relative px-6 pb-8 sm:px-10">
          <div className="-mt-16 mb-6 flex items-end justify-between sm:-mt-24">
            <div className="flex h-32 w-32 items-center justify-center rounded-2xl border-4 border-white bg-neutral-100 text-4xl font-black text-neutral-400 shadow-md sm:h-48 sm:w-48 sm:text-6xl dark:border-[#121212] dark:bg-neutral-800 dark:text-neutral-500">
              {team.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={team.logoUrl}
                  alt={team.name}
                  className="h-full w-full rounded-xl object-cover"
                />
              ) : (
                initials
              )}
            </div>
          </div>
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <h1 className="font-heading text-3xl font-black text-neutral-900 md:text-5xl dark:text-white">
                {team.name}
              </h1>
              <p className="mt-2 text-xl font-bold text-[var(--color-primary)]">
                [{team.tag}]
              </p>
              {team.tournament && (
                <div className="mt-4">
                  <Badge
                    variant="outline"
                    className="border-neutral-300 dark:border-neutral-700"
                  >
                    {team.tournament.name}
                  </Badge>
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="mt-4 flex flex-wrap gap-4 md:mt-0">
              <div className="flex flex-col rounded-xl border border-neutral-200 bg-neutral-50 px-5 py-3 dark:border-neutral-800 dark:bg-neutral-900/50">
                <span className="text-xs font-bold text-neutral-500 uppercase dark:text-neutral-400">
                  Total Poin
                </span>
                <span className="text-brand-600 dark:text-brand-400 text-2xl font-black">
                  {totalPoints}
                </span>
              </div>
              <div className="flex flex-col rounded-xl border border-neutral-200 bg-neutral-50 px-5 py-3 dark:border-neutral-800 dark:bg-neutral-900/50">
                <span className="text-xs font-bold text-neutral-500 uppercase dark:text-neutral-400">
                  Total Kills
                </span>
                <span className="text-2xl font-black text-red-600 dark:text-red-400">
                  {totalKills}
                </span>
              </div>
              <div className="flex flex-col rounded-xl border border-neutral-200 bg-neutral-50 px-5 py-3 dark:border-neutral-800 dark:bg-neutral-900/50">
                <span className="text-xs font-bold text-neutral-500 uppercase dark:text-neutral-400">
                  WWCD
                </span>
                <span className="text-2xl font-black text-yellow-600 dark:text-yellow-500">
                  {totalWwcd}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Roster Section */}
      <div className="mt-12">
        <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-neutral-900 dark:text-white">
          <Users className="h-6 w-6 text-[var(--color-primary)]" />
          Roster Pemain
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {team.players.map((player) => (
            <div
              key={player.id}
              className="flex items-center gap-4 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:border-neutral-800 dark:bg-[#121212]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 text-neutral-500 dark:bg-neutral-900">
                {player.role === 'CAPTAIN' ? (
                  <Crown className="h-6 w-6 text-yellow-500" />
                ) : (
                  <TargetIcon className="h-6 w-6 opacity-50" />
                )}
              </div>
              <div className="overflow-hidden">
                <p className="truncate font-bold text-neutral-900 dark:text-white">
                  {player.ign}
                </p>
                <p className="truncate text-xs font-medium text-neutral-500 dark:text-neutral-400">
                  ID: {player.inGameId}
                </p>
              </div>
            </div>
          ))}
          {team.players.length === 0 && (
            <p className="text-neutral-500 italic">Belum ada data pemain.</p>
          )}
        </div>
      </div>

      {/* Match History Section */}
      <div className="mt-12">
        <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-neutral-900 dark:text-white">
          <Trophy className="h-6 w-6 text-[var(--color-primary)]" />
          Riwayat Pertandingan
        </h2>
        <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-[#121212]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-neutral-600 dark:text-neutral-400">
              <thead className="bg-neutral-50 font-semibold text-neutral-900 dark:bg-neutral-900/50 dark:text-neutral-300">
                <tr>
                  <th className="px-6 py-4">Match</th>
                  <th className="px-6 py-4">Grup / Map</th>
                  <th className="px-6 py-4 text-center">Posisi</th>
                  <th className="px-6 py-4 text-center">Kills</th>
                  <th className="px-6 py-4 text-center">Placement</th>
                  <th className="px-6 py-4 text-center font-bold">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                {team.matchResults.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-12 text-center text-neutral-500"
                    >
                      Belum ada data pertandingan untuk tim ini.
                    </td>
                  </tr>
                ) : (
                  team.matchResults.map((result) => (
                    <tr
                      key={result.id}
                      className="transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                    >
                      <td className="px-6 py-4 font-bold text-neutral-900 dark:text-white">
                        {result.match.tournament?.name || 'Turnamen'}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-center">
                          <Badge variant="outline" className="w-fit">
                            {result.match.group}
                          </Badge>
                          <span className="text-xs sm:text-sm">
                            {result.match.map}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {result.finishPosition === 1 ? (
                          <Badge className="bg-yellow-500 text-white hover:bg-yellow-600">
                            #1 WWCD
                          </Badge>
                        ) : (
                          <span className="font-bold">
                            #{result.finishPosition}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center font-bold text-red-600 dark:text-red-400">
                        {result.killPoints}
                      </td>
                      <td className="px-6 py-4 text-center font-bold text-blue-600 dark:text-blue-400">
                        {result.placementPoints}
                      </td>
                      <td className="text-brand-600 dark:text-brand-400 px-6 py-4 text-center text-lg font-black">
                        {result.totalPoints}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
