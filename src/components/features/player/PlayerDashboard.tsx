'use client';

import * as React from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

type PlayerRole = 'CAPTAIN' | 'MEMBER' | 'STANDBY';

interface Player {
  id?: string;
  ign: string;
  inGameId: string;
  role?: PlayerRole;
}

interface Team {
  id: string;
  name: string;
  tag: string;
  logoUrl?: string | null;
  players: Player[];
}

interface PlayerDashboardProps {
  initialTeam: Team | null;
}

export function PlayerDashboard({ initialTeam }: PlayerDashboardProps) {
  const [team, setTeam] = React.useState<Team | null>(initialTeam);
  const [isEditing, setIsEditing] = React.useState(!initialTeam);
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  // State form
  const [name, setName] = React.useState(team?.name || '');
  const [tag, setTag] = React.useState(team?.tag || '');
  const [logoUrl, setLogoUrl] = React.useState(team?.logoUrl || '');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Ukuran logo maksimal 5MB!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    const toastId = toast.loading('Mengunggah logo...');

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal mengunggah logo');

      setLogoUrl(data.url);
      toast.success('Logo tim berhasil diunggah!', { id: toastId });
    } catch (error) {
      toast.error('Gagal mengunggah logo', { id: toastId });
    }
  };

  // Default 5 players form
  const defaultPlayers = Array.from({ length: 5 }, (_, i) => {
    const existing = team?.players[i];
    return {
      ign: existing?.ign || '',
      inGameId: existing?.inGameId || '',
      role: (i === 0
        ? 'CAPTAIN'
        : i === 4
          ? 'STANDBY'
          : 'MEMBER') as PlayerRole,
    };
  });

  const [players, setPlayers] = React.useState<Player[]>(defaultPlayers);

  const handlePlayerChange = (
    index: number,
    field: keyof Player,
    value: string
  ) => {
    const newPlayers = [...players];
    newPlayers[index] = { ...newPlayers[index], [field]: value };
    setPlayers(newPlayers);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    // Filter out empty players, but require at least 4
    const filledPlayers = players.filter(
      (p) => p.ign.trim() !== '' && p.inGameId.trim() !== ''
    );

    if (filledPlayers.length < 4) {
      toast.error('Tim minimal harus memiliki 4 pemain!');
      return;
    }

    if (!logoUrl) {
      toast.error('Logo tim wajib diunggah!');
      return;
    }

    setIsLoading(true);
    const toastId = toast.loading('Menyimpan profil tim...');

    try {
      const payload = {
        name,
        tag,
        logoUrl,
        players: filledPlayers,
      };

      const url = team ? `/api/player/teams/${team.id}` : '/api/player/teams';
      const method = team ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Gagal menyimpan profil.');
      }

      setTeam(data);
      setIsEditing(false);
      toast.success('Profil tim berhasil disimpan!', { id: toastId });
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message, { id: toastId });
      } else {
        toast.error('Gagal memverifikasi data', { id: toastId });
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!isEditing && team) {
    return (
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-[#121212]">
        <div className="flex items-center justify-between border-b border-neutral-200 pb-4 dark:border-neutral-800">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
              [{team.tag}] {team.name}
            </h2>
            <span className="mt-1 inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
              Profil Master Aktif
            </span>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="rounded-lg bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-200 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700"
          >
            Edit Profil
          </button>
        </div>

        <div className="mt-6">
          <h3 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-white">
            Roster Pemain
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {team.players.map((p, i) => (
              <div
                key={p.id || i}
                className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900/50"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-neutral-900 dark:text-white">
                    {p.ign}
                  </span>
                  <span className="rounded bg-[var(--color-primary)]/10 px-2 py-1 text-xs font-semibold text-[var(--color-primary)]">
                    {p.role}
                  </span>
                </div>
                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                  Discord: {p.inGameId}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSave}
      className="space-y-8 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8 dark:border-neutral-800 dark:bg-[#121212]"
    >
      <div>
        <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
          Informasi Tim Utama
        </h2>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          Data ini akan digunakan untuk pendaftaran 1-Klik turnamen.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Nama Tim <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-neutral-300 bg-transparent px-4 py-2.5 text-sm transition-colors outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] dark:border-neutral-700"
            placeholder="Ketik nama tim"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Tag Tim <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="w-full rounded-lg border border-neutral-300 bg-transparent px-4 py-2.5 text-sm uppercase transition-colors outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] dark:border-neutral-700"
            placeholder="Cth: UC96"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Logo Tim <span className="text-red-500">*</span>
        </label>
        <div className="flex items-center gap-5 rounded-md border border-dashed border-neutral-300 p-4 dark:border-neutral-700 dark:bg-[#121212]">
          {logoUrl ? (
            <Image
              src={
                logoUrl.startsWith('http') ||
                logoUrl.startsWith('/') ||
                logoUrl.startsWith('data:')
                  ? logoUrl
                  : `/uploads/${logoUrl}`
              }
              alt="Logo Preview"
              width={80}
              height={80}
              className="h-20 w-20 rounded-md border border-neutral-200 object-cover dark:border-neutral-700"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-md border border-neutral-200 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800">
              <span className="text-[10px] text-neutral-400 uppercase">
                Wajib
              </span>
            </div>
          )}
          <div className="flex-1">
            <input
              type="file"
              accept="image/jpeg, image/png, image/webp"
              onChange={handleFileUpload}
              className="block w-full text-sm text-neutral-500 file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-[var(--color-primary)] file:px-4 file:py-2.5 file:text-sm file:font-medium file:text-white file:transition-colors hover:file:bg-[var(--color-primary-hover)] dark:text-neutral-400"
            />
            <p className="mt-2 text-xs text-neutral-500">
              Gunakan file JPG, PNG, atau WEBP beresolusi tinggi (Maksimal 5MB).
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-neutral-200 pt-8 dark:border-neutral-800">
        <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
          Susunan Pemain (Roster)
        </h3>
        <p className="mt-1 mb-4 text-sm text-neutral-500 dark:text-neutral-400">
          Pemain 1 adalah Kapten. Pemain 5 adalah Cadangan (opsional).
        </p>

        <div className="space-y-4">
          {players.map((p, i) => (
            <div
              key={i}
              className="flex flex-col gap-4 sm:flex-row sm:items-end"
            >
              <div className="w-16 flex-shrink-0 pt-2 text-sm font-semibold text-neutral-500 sm:pt-0 sm:pb-3 dark:text-neutral-400">
                {p.role === 'CAPTAIN'
                  ? 'P1 (C)'
                  : p.role === 'STANDBY'
                    ? 'P5 (S)'
                    : `P${i + 1}`}
              </div>
              <div className="flex-1">
                <label className="mb-1 block text-xs font-medium text-neutral-600 dark:text-neutral-400">
                  ID PUBG (IGN)
                </label>
                <input
                  type="text"
                  required={i < 4}
                  value={p.ign}
                  onChange={(e) => handlePlayerChange(i, 'ign', e.target.value)}
                  className="w-full rounded-lg border border-neutral-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-[var(--color-primary)] dark:border-neutral-700"
                  placeholder="Contoh: UC96xZux"
                />
              </div>
              <div className="flex-1">
                <label className="mb-1 block text-xs font-medium text-neutral-600 dark:text-neutral-400">
                  ID Discord
                </label>
                <input
                  type="text"
                  required={i < 4}
                  value={p.inGameId}
                  onChange={(e) =>
                    handlePlayerChange(i, 'inGameId', e.target.value)
                  }
                  className="w-full rounded-lg border border-neutral-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-[var(--color-primary)] dark:border-neutral-700"
                  placeholder="Contoh: discorduser"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 border-t border-neutral-200 pt-6 dark:border-neutral-800">
        {team && (
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="rounded-lg px-4 py-2.5 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
          >
            Batal
          </button>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="rounded-lg bg-[var(--color-primary)] px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[var(--color-primary-hover)] disabled:opacity-70"
        >
          {isLoading ? 'Menyimpan...' : 'Simpan Profil Tim'}
        </button>
      </div>
    </form>
  );
}
