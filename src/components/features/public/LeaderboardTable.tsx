'use client';

import * as React from 'react';
import { Trophy, RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface LeaderboardTeam {
  rank: number;
  teamId: string;
  teamName: string;
  logoUrl: string | null;
  matchesPlayed: number;
  totalKills: number;
  placementPoints: number;
  totalPoints: number;
  wwcd: number;
}

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

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-neutral-900 dark:text-white">
          <Trophy className="text-brand-500 h-6 w-6" />
          Overall Leaderboard
        </h2>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchLeaderboard}
          title="Refresh"
        >
          <RefreshCw
            className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`}
          />
          Perbarui
        </Button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        <table className="w-full text-left text-sm text-neutral-600 dark:text-neutral-400">
          <thead className="bg-brand-50 text-brand-900 dark:bg-brand-900/20 dark:text-brand-300">
            <tr>
              <th className="w-16 px-6 py-4 text-center font-bold">#</th>
              <th className="px-6 py-4 font-bold">Tim</th>
              <th className="px-6 py-4 text-center font-bold">Matches</th>
              <th className="px-6 py-4 text-center font-bold">WWCD</th>
              <th className="px-6 py-4 text-center font-bold">Kills</th>
              <th className="px-6 py-4 text-center font-bold">Placement</th>
              <th className="px-6 py-4 text-center font-bold">Total Poin</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-12 text-center text-neutral-500"
                >
                  Memuat klasemen...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-12 text-center text-neutral-500"
                >
                  Belum ada data skor pertandingan.
                </td>
              </tr>
            ) : (
              data.map((team, index) => {
                return (
                  <tr
                    key={team.teamId}
                    className="border-t border-neutral-100 transition-colors hover:bg-neutral-50 dark:border-neutral-800/50 dark:hover:bg-neutral-800/50"
                  >
                    <td className="px-6 py-4 text-center">
                      {index === 0 ? (
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100 font-bold text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                          1
                        </span>
                      ) : index === 1 ? (
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                          2
                        </span>
                      ) : index === 2 ? (
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 font-bold text-amber-800 dark:bg-amber-900/30 dark:text-amber-500">
                          3
                        </span>
                      ) : (
                        <span className="font-medium">{team.rank}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-base font-bold text-neutral-900 dark:text-white">
                      {team.teamName}
                    </td>
                    <td className="px-6 py-4 text-center font-medium">
                      {team.matchesPlayed}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {team.wwcd > 0 ? (
                        <Badge
                          variant="outline"
                          className="bg-brand-50 text-brand-700 border-brand-200 dark:bg-brand-900/20 dark:text-brand-400 dark:border-brand-800"
                        >
                          {team.wwcd}
                        </Badge>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="px-6 py-4 text-center font-semibold text-red-600 dark:text-red-400">
                      {team.totalKills}
                    </td>
                    <td className="px-6 py-4 text-center font-semibold text-blue-600 dark:text-blue-400">
                      {team.placementPoints}
                    </td>
                    <td className="text-brand-600 dark:text-brand-400 px-6 py-4 text-center text-lg font-black">
                      {team.totalPoints}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
