'use client';

import * as React from 'react';
import {
  Trophy,
  RefreshCw,
  Crown,
  Medal,
  Crosshair,
  Flame,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { LeaderboardTeam } from '@/types';

export function LeaderboardTable() {
  const [data, setData] = React.useState<LeaderboardTeam[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchLeaderboard = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/leaderboard');
      if (res.ok) {
        const json = await res.json();
        setData(json.leaderboard || []);
      }
    } catch (error) {
      console.error('Failed to fetch leaderboard', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  const top3 = data.slice(0, 3);
  const restOfTeams = data.slice(3);

  // Fungsi untuk mengatur urutan visual podium: Juara 2 (Kiri), Juara 1 (Tengah), Juara 3 (Kanan)
  const getPodiumCards = () => {
    if (top3.length === 0) return null;

    // Susun secara visual: [2, 1, 3]
    const arranged = [];
    if (top3[1]) arranged.push({ ...top3[1], pos: 2 });
    if (top3[0]) arranged.push({ ...top3[0], pos: 1 });
    if (top3[2]) arranged.push({ ...top3[2], pos: 3 });

    return (
      <div className="mt-10 mb-16 flex flex-col items-center justify-center gap-6 sm:flex-row sm:items-end sm:gap-4 md:gap-8">
        {arranged.map((team, idx) => {
          const isFirst = team.pos === 1;
          const isSecond = team.pos === 2;
          const isThird = team.pos === 3;

          // Definisi style berdasarkan rank
          const containerClasses = cn(
            'relative flex flex-col items-center rounded-2xl border p-5 sm:p-6 transition-all duration-500 hover:-translate-y-2',
            'backdrop-blur-md shadow-xl w-full max-w-[280px] sm:w-1/3',
            isFirst &&
              'z-10 bg-gradient-to-b from-yellow-50 to-white dark:from-yellow-900/20 dark:to-[#121212] border-yellow-300 dark:border-yellow-600/50 sm:-mt-8 shadow-yellow-500/20 dark:shadow-yellow-500/10',
            isSecond &&
              'bg-gradient-to-b from-slate-50 to-white dark:from-slate-800/30 dark:to-[#121212] border-slate-300 dark:border-slate-600/50 shadow-slate-500/10',
            isThird &&
              'bg-gradient-to-b from-amber-50 to-white dark:from-amber-900/20 dark:to-[#121212] border-amber-300 dark:border-amber-700/50 shadow-amber-500/10'
          );

          const badgeClasses = cn(
            'absolute -top-6 flex h-12 w-12 items-center justify-center rounded-full border-4 border-white shadow-md dark:border-[#0a0a0a]',
            isFirst && 'bg-yellow-400 text-yellow-900',
            isSecond && 'bg-slate-300 text-slate-800',
            isThird && 'bg-amber-600 text-amber-50'
          );

          return (
            <Link
              href={`/teams/${team.teamId}`}
              key={team.teamId}
              className={cn(
                containerClasses,
                'animate-in slide-in-from-bottom-8 fade-in'
              )}
              style={{
                animationDelay: `${(idx + 1) * 150}ms`,
                animationFillMode: 'both',
              }}
            >
              <div className={badgeClasses}>
                {isFirst ? (
                  <Crown className="h-6 w-6" />
                ) : (
                  <Medal className="h-6 w-6" />
                )}
              </div>

              <div className="mt-4 text-center">
                <h3 className="font-heading truncate text-lg font-black text-neutral-900 dark:text-white">
                  {team.teamName}
                </h3>
                <span className="text-xs font-bold tracking-widest text-neutral-500 dark:text-neutral-400">
                  [{team.tag}]
                </span>
              </div>

              <div className="my-4 flex items-center gap-3 rounded-xl bg-white/60 px-4 py-2 dark:bg-black/20">
                <div className="text-center">
                  <p className="text-[10px] font-bold text-neutral-500 uppercase">
                    Kills
                  </p>
                  <p className="text-sm font-black text-red-600 dark:text-red-400">
                    {team.totalKills}
                  </p>
                </div>
                <div className="h-6 w-px bg-neutral-200 dark:bg-neutral-800"></div>
                <div className="text-center">
                  <p className="text-[10px] font-bold text-neutral-500 uppercase">
                    WWCD
                  </p>
                  <p className="text-brand-600 dark:text-brand-400 text-sm font-black">
                    {team.wwcd}
                  </p>
                </div>
              </div>

              <div className="flex w-full flex-col items-center rounded-xl bg-neutral-900 px-4 py-3 dark:bg-neutral-800">
                <p className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
                  Total Poin
                </p>
                <p
                  className={cn(
                    'text-3xl font-black',
                    isFirst
                      ? 'text-yellow-400'
                      : isSecond
                        ? 'text-slate-300'
                        : 'text-amber-500'
                  )}
                >
                  {team.totalPoints}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div>
          <h2 className="flex items-center gap-3 text-3xl font-black tracking-tight text-neutral-900 dark:text-white">
            <Trophy className="text-brand-500 h-8 w-8" />
            Papan Klasemen
          </h2>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            Peringkat tim berdasarkan total akumulasi poin eliminasi dan posisi
            akhir.
          </p>
        </div>
        <Button
          variant="outline"
          onClick={fetchLeaderboard}
          className="rounded-full shadow-sm"
        >
          <RefreshCw
            className={cn(
              'text-brand-500 mr-2 h-4 w-4',
              isLoading && 'animate-spin'
            )}
          />
          {isLoading ? 'Memperbarui...' : 'Perbarui Peringkat'}
        </Button>
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center rounded-2xl border border-neutral-200 bg-white/50 dark:border-neutral-800 dark:bg-[#121212]/50">
          <div className="flex flex-col items-center gap-4">
            <RefreshCw className="h-8 w-8 animate-spin text-neutral-400" />
            <p className="text-sm font-medium text-neutral-500">
              Menganalisis data pertandingan...
            </p>
          </div>
        </div>
      ) : data.length === 0 ? (
        <div className="flex h-64 items-center justify-center rounded-2xl border border-neutral-200 bg-white/50 dark:border-neutral-800 dark:bg-[#121212]/50">
          <p className="text-center text-neutral-500">
            Belum ada tim atau data skor pertandingan.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Section Podium untuk Top 3 */}
          {getPodiumCards()}

          {/* Section List untuk Rank 4+ */}
          {restOfTeams.length > 0 && (
            <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm sm:p-6 dark:border-neutral-800 dark:bg-[#121212]">
              <h3 className="mb-4 text-sm font-bold tracking-widest text-neutral-500 uppercase dark:text-neutral-400">
                Peringkat Tim Lainnya
              </h3>
              <div className="flex flex-col gap-3">
                {/* Header Kolom Desktop */}
                <div className="hidden grid-cols-12 gap-4 px-4 py-2 text-xs font-bold tracking-wider text-neutral-400 uppercase sm:grid">
                  <div className="col-span-1 text-center">Rank</div>
                  <div className="col-span-5">Identitas Tim</div>
                  <div className="col-span-2 text-center">Kills</div>
                  <div className="col-span-2 text-center">WWCD</div>
                  <div className="col-span-2 text-right">Pts</div>
                </div>

                {/* Baris List Tim */}
                {restOfTeams.map((team, idx) => (
                  <Link
                    key={team.teamId}
                    href={`/teams/${team.teamId}`}
                    className="animate-in fade-in slide-in-from-bottom-4 group flex grid-cols-12 flex-col items-center gap-4 rounded-xl border border-transparent bg-neutral-50 p-4 transition-all hover:-translate-y-0.5 hover:border-neutral-200 hover:bg-white hover:shadow-md sm:grid sm:py-3 dark:bg-neutral-900/30 dark:hover:border-neutral-700 dark:hover:bg-neutral-800"
                    style={{
                      animationDelay: `${(idx + 1) * 50}ms`,
                      animationFillMode: 'both',
                    }}
                  >
                    {/* Rank */}
                    <div className="col-span-1 flex w-full justify-between sm:block sm:w-auto sm:text-center">
                      <span className="text-xs font-bold text-neutral-400 uppercase sm:hidden">
                        Rank
                      </span>
                      <span className="font-heading text-lg font-black text-neutral-500 dark:text-neutral-400">
                        {team.rank}
                      </span>
                    </div>

                    {/* Identitas */}
                    <div className="col-span-5 flex w-full items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neutral-200 font-bold text-neutral-500 dark:bg-neutral-800">
                        {team.logoUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={team.logoUrl}
                            alt={team.teamName}
                            className="h-full w-full rounded-lg object-cover"
                          />
                        ) : (
                          team.teamName.substring(0, 2).toUpperCase()
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-neutral-900 transition-colors group-hover:text-[var(--color-primary)] dark:text-white">
                          {team.teamName}
                        </span>
                        <span className="text-xs font-semibold text-[var(--color-primary)]">
                          [{team.tag}]
                        </span>
                      </div>
                    </div>

                    {/* Statistik (Mobile: flex row, Desktop: grid cols) */}
                    <div className="col-span-6 flex w-full justify-between sm:contents">
                      <div className="col-span-2 flex flex-col sm:items-center">
                        <span className="text-[10px] font-bold text-neutral-400 uppercase sm:hidden">
                          Kills
                        </span>
                        <div className="flex items-center gap-1.5 font-bold text-red-600 dark:text-red-400">
                          <Crosshair className="hidden h-3.5 w-3.5 sm:block" />
                          {team.totalKills}
                        </div>
                      </div>

                      <div className="col-span-2 flex flex-col sm:items-center">
                        <span className="text-[10px] font-bold text-neutral-400 uppercase sm:hidden">
                          WWCD
                        </span>
                        {team.wwcd > 0 ? (
                          <div className="flex items-center gap-1 rounded-md bg-orange-100 px-2 py-0.5 text-xs font-bold text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">
                            <Flame className="h-3 w-3" />
                            {team.wwcd}
                          </div>
                        ) : (
                          <span className="text-neutral-300 dark:text-neutral-600">
                            -
                          </span>
                        )}
                      </div>

                      <div className="col-span-2 flex flex-col items-end sm:items-end">
                        <span className="text-[10px] font-bold text-neutral-400 uppercase sm:hidden">
                          Total
                        </span>
                        <span className="font-heading text-brand-600 dark:text-brand-400 text-xl font-black">
                          {team.totalPoints}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
