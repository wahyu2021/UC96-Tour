import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trophy, ArrowRight, ShieldAlert, BarChart3 } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';
import { MiniLeaderboardProps } from '@/types';

export function MiniLeaderboard({ data }: MiniLeaderboardProps) {
  return (
    <section className="relative w-full overflow-hidden bg-[#121212] py-24">
      {/* Abstract Background Decoration */}
      <div className="pointer-events-none absolute top-0 right-0 -mt-48 -mr-48 h-96 w-96 rounded-full bg-[var(--color-primary)]/5 blur-[120px]"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-3">
          {/* Left Description */}
          <div className="lg:col-span-1">
            <Badge variant="danger" className="mb-4">
              Klasemen Live
            </Badge>
            <h2 className="font-heading mb-4 text-3xl font-black text-white uppercase italic md:text-4xl">
              Papan Peringkat <br />{' '}
              <span className="text-[var(--color-primary)]">Teratas</span>
            </h2>
            <p className="mb-6 text-lg text-neutral-400">
              {data && data.tournament ? (
                <>
                  Persaingan ketat di turnamen{' '}
                  <strong>{data.tournament.name}</strong>. Tim mana yang akan
                  keluar sebagai juara bertahan?
                </>
              ) : (
                <>
                  Belum ada kompetisi yang berlangsung saat ini. Klasemen akan
                  diperbarui saat pertandingan dimulai.
                </>
              )}
            </p>
            <Link
              href="/leaderboard"
              className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 font-bold text-black transition-colors hover:bg-neutral-200"
            >
              Lihat Klasemen Lengkap
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Right Leaderboard Card */}
          <div className="lg:col-span-2">
            {!data || data.leaderboard.length === 0 ? (
              <EmptyState
                icon={BarChart3}
                title="Klasemen Kosong"
                description="Belum ada data pertandingan atau skor yang dimasukkan ke dalam sistem."
                className="border-neutral-800 bg-[#0a0a0a]"
              />
            ) : (
              <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-[#0a0a0a] shadow-2xl">
                <div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-900/50 px-6 py-4">
                  <span className="text-sm font-bold tracking-wider text-neutral-300 uppercase">
                    Top 5 Teams
                  </span>
                  <Trophy className="h-4 w-4 text-yellow-500" />
                </div>

                <div className="divide-y divide-neutral-800">
                  {data.leaderboard.map((team) => (
                    <Link
                      href={`/teams/${team.id}`}
                      key={team.id}
                      className="group flex items-center px-6 py-4 transition-colors hover:bg-neutral-900"
                    >
                      <div className="font-heading flex w-10 shrink-0 items-center justify-center text-2xl font-black text-neutral-500 group-hover:text-[var(--color-primary)]">
                        #{team.rank}
                      </div>

                      <div className="mx-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-neutral-700 bg-neutral-800">
                        {team.logoUrl ? (
                          <Image
                            src={team.logoUrl}
                            alt={team.tag}
                            width={48}
                            height={48}
                            className="h-full w-full rounded-full object-cover"
                          />
                        ) : (
                          <ShieldAlert className="h-6 w-6 text-neutral-500" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="truncate text-lg font-bold text-white">
                          {team.name}
                        </div>
                        <div className="text-sm text-neutral-500">
                          {team.tag}
                        </div>
                      </div>

                      <div className="ml-4 flex items-center gap-6">
                        <div className="hidden text-center sm:block">
                          <div className="text-sm font-bold text-neutral-300">
                            {team.killPoints}
                          </div>
                          <div className="text-xs text-neutral-600">Kills</div>
                        </div>
                        <div className="hidden text-center sm:block">
                          <div className="text-sm font-bold text-yellow-500">
                            {team.wwcdCount}
                          </div>
                          <div className="text-xs text-neutral-600">WWCD</div>
                        </div>
                        <div className="text-right">
                          <div className="font-heading text-2xl font-black text-[var(--color-primary)]">
                            {team.totalScore}
                          </div>
                          <div className="text-xs text-neutral-500">
                            Total Pts
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
