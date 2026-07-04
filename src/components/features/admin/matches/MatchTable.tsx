'use client';

import * as React from 'react';
import {
  Plus,
  Trash2,
  Play,
  CheckCircle,
  RefreshCw,
  CalendarDays,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Select } from '@/components/ui/Select';
import { EmptyState } from '@/components/ui/EmptyState';
import { ConfirmModal } from '@/components/ui/ConfirmModal';
import { MatchFormModal } from './MatchFormModal';
import Link from 'next/link';
import { MatchInfo } from '@/types';

interface TournamentInfo {
  id: string;
  name: string;
}

export function MatchTable({
  activeTournaments,
}: {
  activeTournaments: TournamentInfo[];
}) {
  const [matches, setMatches] = React.useState<MatchInfo[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedTournamentId, setSelectedTournamentId] =
    React.useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = React.useState<string>('ALL');
  const [selectedGroup, setSelectedGroup] = React.useState<string>('ALL');
  const [confirmDeleteId, setConfirmDeleteId] = React.useState<string | null>(
    null
  );
  const [isDeleting, setIsDeleting] = React.useState(false);

  const uniqueGroups = React.useMemo(() => {
    const groups = new Set<string>();
    matches.forEach((m) => {
      if (m.group) groups.add(m.group);
    });
    return Array.from(groups).sort();
  }, [matches]);

  const filteredMatches = React.useMemo(() => {
    return matches.filter((m) => {
      const matchTournament =
        selectedTournamentId === 'ALL' ||
        m.tournament?.id === selectedTournamentId;
      const matchStatus =
        selectedStatus === 'ALL' || m.status === selectedStatus;
      const matchGroup =
        selectedGroup === 'ALL' || (m.group || '') === selectedGroup;
      return matchTournament && matchStatus && matchGroup;
    });
  }, [matches, selectedTournamentId, selectedStatus, selectedGroup]);

  const fetchMatches = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/matches');
      if (res.ok) {
        const data = await res.json();
        setMatches(data);
      }
    } catch (error) {
      console.error('Failed to fetch matches', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchMatches();
  }, [fetchMatches]);

  const handleDelete = async () => {
    if (!confirmDeleteId) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/matches/${confirmDeleteId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setConfirmDeleteId(null);
        fetchMatches();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/matches/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) fetchMatches();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
          Daftar Pertandingan
        </h2>
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <div className="flex w-full gap-2 sm:w-auto">
            <div className="w-full sm:w-48">
              <Select
                value={selectedTournamentId}
                onChange={setSelectedTournamentId}
                options={[
                  { value: 'ALL', label: 'Semua Turnamen' },
                  ...activeTournaments.map((t) => ({
                    value: t.id,
                    label: t.name,
                  })),
                ]}
              />
            </div>
            <div className="w-full sm:w-40">
              <Select
                value={selectedStatus}
                onChange={setSelectedStatus}
                options={[
                  { value: 'ALL', label: 'Semua Status' },
                  { value: 'SCHEDULED', label: 'Akan Datang' },
                  { value: 'ONGOING', label: 'LIVE' },
                  { value: 'COMPLETED', label: 'Selesai' },
                ]}
              />
            </div>
            {uniqueGroups.length > 0 && (
              <div className="w-full sm:w-36">
                <Select
                  value={selectedGroup}
                  onChange={setSelectedGroup}
                  options={[
                    { value: 'ALL', label: 'Semua Grup' },
                    ...uniqueGroups.map((g) => ({
                      value: g,
                      label: `Grup ${g}`,
                    })),
                  ]}
                />
              </div>
            )}
          </div>
          <div className="flex w-full justify-end gap-2 sm:w-auto">
            <Button variant="outline" onClick={fetchMatches} title="Refresh">
              <RefreshCw
                className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`}
              />
            </Button>
            <Button onClick={() => setIsModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Tambah Jadwal
            </Button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-800">
        <table className="w-full text-left text-sm text-neutral-600 dark:text-neutral-400">
          <thead className="bg-neutral-50 text-neutral-700 uppercase dark:bg-neutral-900/50 dark:text-neutral-300">
            <tr>
              <th className="px-4 py-3 font-semibold">Waktu & Map</th>
              <th className="px-4 py-3 font-semibold">Turnamen / Grup</th>
              <th className="px-4 py-3 text-center font-semibold">Status</th>
              <th className="px-4 py-3 text-right font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center">
                  Memuat data...
                </td>
              </tr>
            ) : filteredMatches.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8">
                  <EmptyState
                    icon={CalendarDays}
                    title="Tidak ada jadwal"
                    description="Belum ada jadwal pertandingan yang sesuai dengan filter."
                  />
                </td>
              </tr>
            ) : (
              filteredMatches.map((match) => {
                const isLive = match.status === 'ONGOING';
                const isCompleted = match.status === 'COMPLETED';
                const d = new Date(match.scheduledAt);
                const timeStr = d.toLocaleTimeString('id-ID', {
                  hour: '2-digit',
                  minute: '2-digit',
                });
                const dateStr = d.toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                });

                return (
                  <tr
                    key={match.id}
                    className="border-t border-neutral-200 dark:border-neutral-800"
                  >
                    <td className="px-4 py-3">
                      <div className="font-bold text-neutral-900 dark:text-white">
                        {match.map}
                      </div>
                      <div className="text-xs text-neutral-500">
                        {dateStr} • {timeStr}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-neutral-700 dark:text-neutral-300">
                        {match.tournament?.name || '-'}
                      </div>
                      <div className="text-xs">
                        {match.group ? `Grup ${match.group}` : 'Tanpa Grup'}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {isLive ? (
                        <Badge className="animate-pulse bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/40 dark:text-red-400">
                          LIVE
                        </Badge>
                      ) : isCompleted ? (
                        <Badge variant="outline">Selesai</Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="bg-neutral-100 dark:bg-neutral-800"
                        >
                          Akan Datang
                        </Badge>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {!isCompleted && !isLive && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 border-red-200 px-2 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-900/20"
                            onClick={() =>
                              handleUpdateStatus(match.id, 'ONGOING')
                            }
                            title="Set Live"
                          >
                            <Play className="h-4 w-4" />
                          </Button>
                        )}
                        {isLive && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 border-emerald-200 px-2 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 dark:border-emerald-900/50 dark:text-emerald-400 dark:hover:bg-emerald-900/20"
                            onClick={() =>
                              handleUpdateStatus(match.id, 'COMPLETED')
                            }
                            title="Set Selesai"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        )}
                        {isCompleted && (
                          <Link
                            href={`/admin/matches/${match.id}/scores`}
                            className="border-brand-200 text-brand-600 hover:bg-brand-50 hover:text-brand-700 dark:border-brand-900/50 dark:text-brand-400 dark:hover:bg-brand-900/20 inline-flex h-8 items-center justify-center rounded-md border px-3 text-sm font-medium transition-colors"
                            title="Input Skor"
                          >
                            Input Skor
                          </Link>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 px-2 text-neutral-400 hover:text-red-600"
                          onClick={() => setConfirmDeleteId(match.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <MatchFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchMatches}
        tournaments={activeTournaments}
      />

      <ConfirmModal
        isOpen={!!confirmDeleteId}
        onClose={() => setConfirmDeleteId(null)}
        onConfirm={handleDelete}
        title="Hapus Jadwal"
        description="Apakah Anda yakin ingin menghapus jadwal pertandingan ini? Data yang dihapus tidak dapat dikembalikan."
        confirmText="Ya, Hapus"
        variant="danger"
        isLoading={isDeleting}
      />
    </div>
  );
}
