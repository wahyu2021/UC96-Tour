'use client';

import * as React from 'react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';
import Image from 'next/image';

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
  createdAt: Date;
  players: Player[];
  registrations: { status: string; tournament: { name: string } }[];
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
        prev.map((t) => (t.id === teamId ? { ...t, registrations: t.registrations.map(r => ({ ...r, status: newStatus })) } : t))
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
    const matchStatus = statusFilter === 'ALL' || t.registrations[0]?.status === statusFilter;
    return matchQuery && matchStatus;
  });

  return (
    <div className="space-y-6">
      {/* Bilah Filter & Pencarian */}
      <div className="relative z-10 flex flex-col gap-4 sm:flex-row">
        <div className="w-full sm:max-w-xs">
          <Input
            type="text"
            placeholder="Cari nama atau tag tim..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
          />
        </div>
        <div className="w-full sm:max-w-[200px]">
          <Select
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              { value: 'ALL', label: 'Semua Status' },
              { value: 'PENDING', label: 'Menunggu (Pending)' },
              { value: 'APPROVED', label: 'Diterima (Approved)' },
              { value: 'REJECTED', label: 'Ditolak (Rejected)' },
            ]}
          />
        </div>
      </div>

      {/* Tabel Data Tim */}
      <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-[#121212]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-neutral-600 dark:text-neutral-400">
            <thead className="border-b border-neutral-200 bg-neutral-50/50 text-xs font-bold tracking-wider text-neutral-700 uppercase dark:border-neutral-800 dark:bg-[#0a0a0a] dark:text-neutral-300">
              <tr>
                <th className="px-6 py-5">Profil Tim</th>
                <th className="px-6 py-5">Kapten (IGN)</th>
                <th className="px-6 py-5">Turnamen</th>
                <th className="px-6 py-5">Status Pendaftaran</th>
                <th className="px-6 py-5 text-right">Aksi Panel</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {filteredTeams.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
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
                            <Image
                              src={team.logoUrl}
                              alt={team.name}
                              width={48}
                              height={48}
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
                        <span className="inline-flex items-center rounded-md bg-neutral-100 px-2.5 py-1 text-xs font-semibold text-neutral-800 dark:bg-neutral-800 dark:text-neutral-300">
                          {team.registrations[0]?.tournament?.name || 'Tanpa Turnamen'}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <Badge
                          variant={
                            team.registrations[0]?.status === 'APPROVED'
                              ? 'success'
                              : team.registrations[0]?.status === 'REJECTED'
                                ? 'danger'
                                : 'warning'
                          }
                          dot
                        >
                          {team.registrations[0]?.status || 'PENDING'}
                        </Badge>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <Link
                            href={`/teams/${team.id}`}
                            target="_blank"
                            className="inline-flex h-10 items-center justify-center rounded-md border border-neutral-300 bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-neutral-50 focus-visible:ring-1 focus-visible:ring-[var(--color-primary)] focus-visible:outline-none dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
                          >
                            Lihat Detail
                          </Link>
                          <div className="w-[130px]">
                            <Select
                              value={team.registrations[0]?.status || 'PENDING'}
                              onChange={(val) =>
                                handleStatusChange(team.id, val)
                              }
                              options={[
                                { value: 'PENDING', label: 'PENDING' },
                                { value: 'APPROVED', label: 'APPROVE' },
                                { value: 'REJECTED', label: 'REJECT' },
                              ]}
                            />
                          </div>
                        </div>
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
