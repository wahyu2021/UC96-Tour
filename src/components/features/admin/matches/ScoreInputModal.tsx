'use client';

import * as React from 'react';
import { Save, Plus, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface TeamInfo {
  id: string;
  name: string;
  logoUrl: string | null;
}

interface ScoreEntry {
  teamId: string;
  finishPosition: number | '';
  kills: number | '';
}

interface ExistingScore {
  teamId: string;
  finishPosition: number;
  killPoints: number;
  placementPoints: number;
  totalPoints: number;
  isWwcd: boolean;
}

export function ScoreInputModal({
  isOpen,
  onClose,
  matchId,
  tournamentId,
  onSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  matchId: string | null;
  tournamentId: string | null;
  onSuccess: () => void;
}) {
  const [teams, setTeams] = React.useState<TeamInfo[]>([]);
  const [scores, setScores] = React.useState<ScoreEntry[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isFetching, setIsFetching] = React.useState(false);

  React.useEffect(() => {
    if (!isOpen || !tournamentId || !matchId) return;

    const fetchData = async () => {
      setIsFetching(true);
      try {
        // Fetch teams for this tournament
        const resTeams = await fetch(
          `/api/admin/tournaments/${tournamentId}/teams`
        );
        if (resTeams.ok) {
          const dataTeams = await resTeams.json();
          setTeams(dataTeams);
        }

        // Fetch existing scores for this match
        const resScores = await fetch(`/api/admin/matches/${matchId}/scores`);
        if (resScores.ok) {
          const dataScores: ExistingScore[] = await resScores.json();
          if (dataScores.length > 0) {
            setScores(
              dataScores.map((s) => ({
                teamId: s.teamId,
                finishPosition: s.finishPosition,
                kills: s.killPoints,
              }))
            );
          } else {
            setScores([]);
          }
        }
      } catch (error) {
        console.error('Failed to fetch data for score input', error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchData();
  }, [isOpen, tournamentId, matchId]);

  if (!isOpen) return null;

  const handleAddRow = () => {
    setScores([...scores, { teamId: '', finishPosition: '', kills: 0 }]);
  };

  const handleRemoveRow = (index: number) => {
    const newScores = [...scores];
    newScores.splice(index, 1);
    setScores(newScores);
  };

  const handleChange = (
    index: number,
    field: keyof ScoreEntry,
    value: string | number
  ) => {
    const newScores = [...scores];
    newScores[index] = { ...newScores[index], [field]: value };
    setScores(newScores);
  };

  const calculatePreview = (
    finishPosition: number | '',
    kills: number | ''
  ) => {
    if (finishPosition === '' || kills === '') return '-';
    let placement = 0;
    switch (Number(finishPosition)) {
      case 1:
        placement = 10;
        break;
      case 2:
        placement = 6;
        break;
      case 3:
        placement = 5;
        break;
      case 4:
        placement = 4;
        break;
      case 5:
        placement = 3;
        break;
      case 6:
        placement = 2;
        break;
      case 7:
      case 8:
        placement = 1;
        break;
      default:
        placement = 0;
        break;
    }
    return placement + Number(kills);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!matchId) return;

    // Filter out invalid rows
    const validScores = scores
      .filter((s) => s.teamId && s.finishPosition !== '' && s.kills !== '')
      .map((s) => ({
        teamId: s.teamId,
        finishPosition: Number(s.finishPosition),
        kills: Number(s.kills),
      }));

    if (validScores.length === 0) {
      alert('Tambahkan setidaknya satu skor yang valid.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/matches/${matchId}/scores`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scores: validScores }),
      });

      if (res.ok) {
        onSuccess();
        onClose();
      } else {
        alert('Gagal menyimpan skor');
      }
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-3xl rounded-xl bg-white shadow-2xl dark:bg-neutral-900">
        <div className="flex items-center justify-between border-b border-neutral-200 p-6 dark:border-neutral-800">
          <div>
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
              Input Skor Pertandingan
            </h2>
            <p className="mt-1 text-sm text-neutral-500">
              Poin placement dan WWCD akan dihitung otomatis.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-neutral-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          {isFetching ? (
            <div className="py-12 text-center text-neutral-500">
              Memuat data...
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                {scores.length === 0 ? (
                  <div className="rounded-lg border border-dashed border-neutral-300 p-8 text-center dark:border-neutral-700">
                    <p className="text-sm text-neutral-500">
                      Belum ada skor yang diinput.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-neutral-600 dark:text-neutral-400">
                      <thead className="bg-neutral-50 dark:bg-neutral-900/50">
                        <tr>
                          <th className="p-2 font-semibold">Tim</th>
                          <th className="p-2 font-semibold">
                            Ranking (Placement)
                          </th>
                          <th className="p-2 font-semibold">Kills</th>
                          <th className="p-2 font-semibold">Total Poin</th>
                          <th className="p-2 text-right font-semibold">Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {scores.map((score, index) => (
                          <tr
                            key={index}
                            className="border-t border-neutral-100 dark:border-neutral-800/50"
                          >
                            <td className="p-2">
                              <select
                                className="focus:border-brand-500 focus:ring-brand-500 w-full rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-sm outline-none focus:ring-1 dark:border-neutral-700 dark:bg-neutral-950"
                                value={score.teamId}
                                onChange={(e) =>
                                  handleChange(index, 'teamId', e.target.value)
                                }
                                required
                              >
                                <option value="" disabled>
                                  -- Pilih Tim --
                                </option>
                                {teams.map((t) => (
                                  <option key={t.id} value={t.id}>
                                    {t.name}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td className="p-2">
                              <input
                                type="number"
                                min="1"
                                className="focus:border-brand-500 focus:ring-brand-500 w-24 rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-sm outline-none focus:ring-1 dark:border-neutral-700 dark:bg-neutral-950"
                                value={score.finishPosition}
                                onChange={(e) =>
                                  handleChange(
                                    index,
                                    'finishPosition',
                                    e.target.value
                                  )
                                }
                                required
                                placeholder="1-16"
                              />
                            </td>
                            <td className="p-2">
                              <input
                                type="number"
                                min="0"
                                className="focus:border-brand-500 focus:ring-brand-500 w-24 rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-sm outline-none focus:ring-1 dark:border-neutral-700 dark:bg-neutral-950"
                                value={score.kills}
                                onChange={(e) =>
                                  handleChange(index, 'kills', e.target.value)
                                }
                                required
                                placeholder="0"
                              />
                            </td>
                            <td className="p-2">
                              <div className="text-brand-600 dark:text-brand-400 flex h-8 items-center font-bold">
                                {calculatePreview(
                                  score.finishPosition,
                                  score.kills
                                )}
                              </div>
                            </td>
                            <td className="p-2 text-right">
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2 text-red-500 hover:text-red-700"
                                onClick={() => handleRemoveRow(index)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-dashed"
                  onClick={handleAddRow}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Tambah Tim
                </Button>
              </div>

              <div className="flex justify-end gap-3 border-t border-neutral-200 pt-4 dark:border-neutral-800">
                <Button type="button" variant="outline" onClick={onClose}>
                  Batal
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading || scores.length === 0}
                >
                  {isLoading ? (
                    'Menyimpan...'
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Simpan Skor
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
