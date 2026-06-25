'use client';

import * as React from 'react';
import { toast } from 'sonner';

type Player = {
  id: string;
  ign: string;
  inGameId: string;
  role: string;
};

type Team = {
  id: string;
  name: string;
  tag: string;
  logoUrl: string | null;
  status: string;
  createdAt: Date;
  players: Player[];
};

export function TeamTableClient({ initialTeams }: { initialTeams: Team[] }) {
  const [teams, setTeams] = React.useState<Team[]>(initialTeams);
  const [filterQuery, setFilterQuery] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('ALL');

  const handleStatusChange = async (teamId: string, newStatus: string) => {
    const toastId = toast.loading('Menyimpan perubahan status...');
    try {
      const res = await fetch(`/api/admin/teams/${teamId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Gagal memperbarui status');
      }

      setTeams((prev) =>
        prev.map((t) => (t.id === teamId ? { ...t, status: newStatus } : t))
      );
      toast.success(data.message, { id: toastId });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message, { id: toastId });
      }
    }
  };

  const filteredTeams = teams.filter((t) => {
    const matchQuery =
      t.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
      t.tag.toLowerCase().includes(filterQuery.toLowerCase());
    const matchStatus = statusFilter === 'ALL' || t.status === statusFilter;
    return matchQuery && matchStatus;
  });

  return (
    <div className="space-y-6">
      {/* Bilah Filter & Pencarian */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <input
          type="text"
          placeholder="Cari nama atau tag tim..."
          value={filterQuery}
          onChange={(e) => setFilterQuery(e.target.value)}
          className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm transition-colors focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] focus:outline-none sm:max-w-xs dark:border-neutral-700 dark:bg-[#121212] dark:text-white"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-neutral-300 px-4 py-2.5 text-sm font-medium transition-colors focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] focus:outline-none dark:border-neutral-700 dark:bg-[#121212] dark:text-white"
        >
          <option value="ALL">Semua Status</option>
          <option value="PENDING">Menunggu (Pending)</option>
          <option value="APPROVED">Diterima (Approved)</option>
          <option value="REJECTED">Ditolak (Rejected)</option>
        </select>
      </div>

      {/* Tabel Data Tim */}
      <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-[#121212]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-neutral-600 dark:text-neutral-400">
            <thead className="border-b border-neutral-200 bg-neutral-50/50 text-xs font-bold tracking-wider text-neutral-700 uppercase dark:border-neutral-800 dark:bg-[#0a0a0a] dark:text-neutral-300">
              <tr>
                <th className="px-6 py-5">Profil Tim</th>
                <th className="px-6 py-5">Kapten (IGN)</th>
                <th className="px-6 py-5">Status Pendaftaran</th>
                <th className="px-6 py-5 text-right">Aksi Panel</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {filteredTeams.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-12 text-center text-neutral-500"
                  >
                    Tidak ada data tim yang sesuai dengan filter pencarian.
                  </td>
                </tr>
              ) : (
                filteredTeams.map((team) => {
                  const captain = team.players.find(
                    (p) => p.role === 'CAPTAIN'
                  );
                  return (
                    <tr
                      key={team.id}
                      className="transition-colors hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          {team.logoUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={team.logoUrl}
                              alt={team.name}
                              className="h-12 w-12 rounded-full border border-neutral-200 object-cover dark:border-neutral-700"
                            />
                          ) : (
                            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-dashed border-neutral-300 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800">
                              <span className="text-xs font-bold text-neutral-400 uppercase">
                                {team.tag.substring(0, 2)}
                              </span>
                            </div>
                          )}
                          <div>
                            <p className="font-bold text-neutral-900 dark:text-white">
                              {team.name}
                            </p>
                            <p className="mt-0.5 text-xs font-semibold tracking-wider text-[var(--color-primary)]">
                              [{team.tag}]
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <p className="font-semibold text-neutral-900 dark:text-white">
                          {captain?.ign || 'N/A'}
                        </p>
                        <p className="mt-0.5 text-xs text-neutral-500">
                          ID: {captain?.inGameId}
                        </p>
                      </td>
                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold tracking-wider uppercase ${
                            team.status === 'APPROVED'
                              ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400'
                              : team.status === 'REJECTED'
                                ? 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400'
                                : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400'
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              team.status === 'APPROVED'
                                ? 'bg-green-500'
                                : team.status === 'REJECTED'
                                  ? 'bg-red-500'
                                  : 'bg-yellow-500'
                            }`}
                          ></span>
                          {team.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <select
                          value={team.status}
                          onChange={(e) =>
                            handleStatusChange(team.id, e.target.value)
                          }
                          className="cursor-pointer rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-xs font-bold text-neutral-700 shadow-sm transition-colors hover:border-neutral-400 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:border-neutral-600"
                        >
                          <option value="PENDING">PENDING</option>
                          <option value="APPROVED">APPROVE</option>
                          <option value="REJECTED">REJECT</option>
                        </select>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
