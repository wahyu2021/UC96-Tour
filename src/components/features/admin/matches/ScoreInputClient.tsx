'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Save, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { getPlacementPoints, DEFAULT_RULES } from '@/lib/scoring';
import {
  Team,
  ExistingScore,
  ScoreInputClientProps,
  ScoringRule,
} from '@/types';

export function ScoreInputClient({
  match,
  teams,
  initialScores,
  scoringRules,
}: ScoreInputClientProps) {
  const router = useRouter();
  const rulesToUse = scoringRules.length > 0 ? scoringRules : DEFAULT_RULES;

  // Initialize state from existing scores
  const [scores, setScores] = React.useState<
    Record<string, { rank: string; kills: string }>
  >(() => {
    const initialState: Record<string, { rank: string; kills: string }> = {};
    initialScores.forEach((score) => {
      initialState[score.teamId] = {
        rank: score.finishPosition.toString(),
        kills: score.killPoints.toString(),
      };
    });
    return initialState;
  });

  const [isSaving, setIsSaving] = React.useState(false);

  const handleInputChange = (
    teamId: string,
    field: 'rank' | 'kills',
    value: string
  ) => {
    setScores((prev) => ({
      ...prev,
      [teamId]: {
        ...(prev[teamId] || { rank: '', kills: '' }),
        [field]: value,
      },
    }));
  };

  const handleSave = async () => {
    // Validation
    const emptyTeams = teams.filter((team) => {
      const s = scores[team.id];
      return !s || !s.rank || !s.kills;
    });

    if (emptyTeams.length > 0) {
      const confirmSave = confirm(
        `Terdapat ${emptyTeams.length} tim yang belum diinput skornya. Mereka tidak akan disimpan. Lanjutkan?`
      );
      if (!confirmSave) return;
    }

    const payload = teams
      .map((team) => {
        const s = scores[team.id];
        if (!s || !s.rank || !s.kills) return null;
        return {
          teamId: team.id,
          finishPosition: parseInt(s.rank, 10),
          kills: parseInt(s.kills, 10),
        };
      })
      .filter(Boolean);

    if (payload.length === 0) {
      alert('Tidak ada skor valid untuk disimpan.');
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch(`/api/admin/matches/${match.id}/scores`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scores: payload }),
      });

      if (res.ok) {
        alert('Skor berhasil disimpan!');
        router.push('/admin');
      } else {
        const data = await res.json();
        alert(data.error || 'Gagal menyimpan skor');
      }
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan sistem.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-200 pb-6 dark:border-neutral-800">
        <div>
          <button
            onClick={() => router.back()}
            className="mb-4 flex items-center text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Kembali ke Jadwal
          </button>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">
            Input Skor Pertandingan
          </h1>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">
            {match.tournament?.name || 'Turnamen'} • {match.map} • Grup{' '}
            {match.group || '-'}
          </p>
        </div>
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="min-w-[140px]"
        >
          {isSaving ? (
            'Menyimpan...'
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Simpan Semua
            </>
          )}
        </Button>
      </div>

      {/* Warning Box */}
      <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/30 dark:bg-amber-900/10">
        <AlertCircle className="mt-0.5 h-5 w-5 text-amber-600 dark:text-amber-500" />
        <div>
          <h3 className="text-sm font-semibold text-amber-800 dark:text-amber-400">
            Panduan Pengisian
          </h3>
          <p className="mt-1 text-sm text-amber-700 dark:text-amber-500">
            Pastikan mengisi kolom <strong>Rank</strong> (peringkat keberapa
            mati) dan <strong>Kills</strong> untuk semua tim yang bertanding.
            Total Poin akan dihitung otomatis berdasarkan konfigurasi sistem
            poin.
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-[#121212]">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-neutral-200 bg-neutral-50/50 text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900/50 dark:text-neutral-400">
            <tr>
              <th className="px-6 py-4 font-semibold tracking-wider uppercase">
                Tim
              </th>
              <th className="px-6 py-4 font-semibold tracking-wider uppercase">
                Rank
              </th>
              <th className="px-6 py-4 font-semibold tracking-wider uppercase">
                Kills
              </th>
              <th className="px-6 py-4 text-center font-semibold tracking-wider uppercase">
                Total Poin (Auto)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {teams.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-neutral-500">
                  Tidak ada tim yang terdaftar di turnamen ini.
                </td>
              </tr>
            ) : (
              teams.map((team) => {
                const teamScore = scores[team.id] || { rank: '', kills: '' };
                const rankVal = parseInt(teamScore.rank, 10);
                const killsVal = parseInt(teamScore.kills, 10);

                const isValidRank = !isNaN(rankVal) && rankVal > 0;
                const isValidKills = !isNaN(killsVal) && killsVal >= 0;

                const placementPoints = isValidRank
                  ? getPlacementPoints(rankVal, rulesToUse)
                  : 0;
                const totalPoints =
                  (isValidRank ? placementPoints : 0) +
                  (isValidKills ? killsVal : 0);

                return (
                  <tr
                    key={team.id}
                    className="transition-colors hover:bg-neutral-50/50 dark:hover:bg-neutral-900/20"
                  >
                    <td className="px-6 py-4">
                      <div className="font-bold text-neutral-900 dark:text-white">
                        {team.name}{' '}
                        <span className="text-[var(--color-primary)]">
                          [{team.tag}]
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        min="1"
                        placeholder="Rank 1-16+"
                        value={teamScore.rank}
                        onChange={(e) =>
                          handleInputChange(team.id, 'rank', e.target.value)
                        }
                        className="focus:border-brand-500 focus:ring-brand-500 w-28 rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:placeholder:text-neutral-600"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        min="0"
                        placeholder="Jumlah Kill"
                        value={teamScore.kills}
                        onChange={(e) =>
                          handleInputChange(team.id, 'kills', e.target.value)
                        }
                        className="focus:border-brand-500 focus:ring-brand-500 w-28 rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:placeholder:text-neutral-600"
                      />
                    </td>
                    <td className="px-6 py-4 text-center">
                      {isValidRank && isValidKills ? (
                        <span className="bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-400 inline-flex items-center justify-center rounded-full px-3 py-1 font-bold">
                          {totalPoints} Pts
                        </span>
                      ) : (
                        <span className="text-neutral-400">-</span>
                      )}
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
