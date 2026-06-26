import { prisma } from '@/lib/db';
import Link from 'next/link';
import { Trophy, Users, CalendarDays, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Dashboard | Admin Panel',
};

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  // Fetch statistics concurrently
  const [
    totalTournaments,
    activeTournaments,
    totalTeams,
    approvedTeams,
    totalMatches,
    liveMatches,
  ] = await Promise.all([
    prisma.tournament.count(),
    prisma.tournament.count({ where: { status: 'ONGOING' } }),
    prisma.team.count(),
    prisma.team.count({ where: { status: 'APPROVED' } }),
    prisma.match.count(),
    prisma.match.count({ where: { status: 'ONGOING' } }),
  ]);

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
          Dashboard Admin
        </h1>
        <p className="mt-2 text-sm text-neutral-600 sm:text-base dark:text-neutral-400">
          Ringkasan statistik dan status terkini dari platform turnamen esports
          Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Card: Tournaments */}
        <div className="relative overflow-hidden rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-neutral-800 dark:bg-[#121212]">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
              <Trophy className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                Total Turnamen
              </p>
              <h3 className="font-heading text-2xl font-bold text-neutral-900 dark:text-white">
                {totalTournaments}
              </h3>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-4 dark:border-neutral-800/50">
            <span className="text-xs text-neutral-500">
              <strong className="text-blue-600 dark:text-blue-400">
                {activeTournaments}
              </strong>{' '}
              Aktif Berjalan
            </span>
            <Link
              href="/admin/tournaments"
              className="group flex items-center text-xs font-semibold text-neutral-600 hover:text-blue-600 dark:text-neutral-400 dark:hover:text-blue-400"
            >
              Kelola{' '}
              <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Card: Teams */}
        <div className="relative overflow-hidden rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-neutral-800 dark:bg-[#121212]">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                Total Tim
              </p>
              <h3 className="font-heading text-2xl font-bold text-neutral-900 dark:text-white">
                {totalTeams}
              </h3>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-4 dark:border-neutral-800/50">
            <span className="text-xs text-neutral-500">
              <strong className="text-emerald-600 dark:text-emerald-400">
                {approvedTeams}
              </strong>{' '}
              Tim Disetujui
            </span>
            <Link
              href="/admin/teams"
              className="group flex items-center text-xs font-semibold text-neutral-600 hover:text-emerald-600 dark:text-neutral-400 dark:hover:text-emerald-400"
            >
              Kelola{' '}
              <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Card: Matches */}
        <div className="relative overflow-hidden rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-neutral-800 dark:bg-[#121212]">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400">
              <CalendarDays className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                Total Pertandingan
              </p>
              <h3 className="font-heading text-2xl font-bold text-neutral-900 dark:text-white">
                {totalMatches}
              </h3>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-4 dark:border-neutral-800/50">
            <span className="text-xs text-neutral-500">
              <strong className="text-purple-600 dark:text-purple-400">
                {liveMatches}
              </strong>{' '}
              Sedang LIVE
            </span>
            <Link
              href="/admin/matches"
              className="group flex items-center text-xs font-semibold text-neutral-600 hover:text-purple-600 dark:text-neutral-400 dark:hover:text-purple-400"
            >
              Kelola{' '}
              <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
