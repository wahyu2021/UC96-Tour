import * as React from 'react';
import Link from 'next/link';
import { Trophy, ArrowRight, ShieldAlert, BarChart3 } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';

interface TeamLeaderboard {
  id: string;
  name: string;
  tag: string;
  logoUrl: string | null;
  totalScore: number;
  killPoints: number;
  placementPoints: number;
  wwcdCount: number;
  matchesPlayed: number;
  rank: number;
}

interface Props {
  data: {
    tournament: { id: string; name: string };
    leaderboard: TeamLeaderboard[];
  } | null;
}

export function MiniLeaderboard({ data }: Props) {

  return (
    <section className="w-full bg-[#121212] py-24 relative overflow-hidden">
      {/* Abstract Background Decoration */}
      <div className="absolute right-0 top-0 -mr-48 -mt-48 h-96 w-96 rounded-full bg-[var(--color-primary)]/5 blur-[120px] pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 items-center">
          
          {/* Left Description */}
          <div className="lg:col-span-1">
            <Badge variant="danger" className="mb-4">Klasemen Live</Badge>
            <h2 className="font-heading text-3xl font-black uppercase italic text-white md:text-4xl mb-4">
              Papan Peringkat <br/> <span className="text-[var(--color-primary)]">Teratas</span>
            </h2>
            <p className="text-neutral-400 mb-6 text-lg">
              {data && data.tournament ? (
                <>Persaingan ketat di turnamen <strong>{data.tournament.name}</strong>. Tim mana yang akan keluar sebagai juara bertahan?</>
              ) : (
                <>Belum ada kompetisi yang berlangsung saat ini. Klasemen akan diperbarui saat pertandingan dimulai.</>
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
              <div className="rounded-2xl border border-neutral-800 bg-[#0a0a0a] shadow-2xl overflow-hidden">
                <div className="bg-neutral-900/50 px-6 py-4 border-b border-neutral-800 flex items-center justify-between">
                <span className="font-bold text-neutral-300 uppercase text-sm tracking-wider">Top 5 Teams</span>
                <Trophy className="h-4 w-4 text-yellow-500" />
              </div>
              
              <div className="divide-y divide-neutral-800">
                {data.leaderboard.map((team) => (
                  <Link 
                    href={`/teams/${team.id}`} 
                    key={team.id}
                    className="flex items-center px-6 py-4 hover:bg-neutral-900 transition-colors group"
                  >
                    <div className="flex w-10 shrink-0 items-center justify-center font-heading text-2xl font-black text-neutral-500 group-hover:text-[var(--color-primary)]">
                      #{team.rank}
                    </div>
                    
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-neutral-800 mx-4 border border-neutral-700">
                      {team.logoUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={team.logoUrl} alt={team.tag} className="h-full w-full rounded-full object-cover" />
                      ) : (
                        <ShieldAlert className="h-6 w-6 text-neutral-500" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="truncate font-bold text-white text-lg">{team.name}</div>
                      <div className="text-sm text-neutral-500">{team.tag}</div>
                    </div>
                    
                    <div className="flex items-center gap-6 ml-4">
                      <div className="hidden text-center sm:block">
                        <div className="text-sm font-bold text-neutral-300">{team.killPoints}</div>
                        <div className="text-xs text-neutral-600">Kills</div>
                      </div>
                      <div className="hidden text-center sm:block">
                        <div className="text-sm font-bold text-yellow-500">{team.wwcdCount}</div>
                        <div className="text-xs text-neutral-600">WWCD</div>
                      </div>
                      <div className="text-right">
                        <div className="font-heading text-2xl font-black text-[var(--color-primary)]">{team.totalScore}</div>
                        <div className="text-xs text-neutral-500">Total Pts</div>
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
