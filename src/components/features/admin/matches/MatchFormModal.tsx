'use client';

import * as React from 'react';
import { X, Save } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface TournamentInfo {
  id: string;
  name: string;
}

interface MatchFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  tournaments: TournamentInfo[];
}

export function MatchFormModal({
  isOpen,
  onClose,
  onSuccess,
  tournaments,
}: MatchFormModalProps) {
  const defaultTournamentId = tournaments.length === 1 ? tournaments[0].id : '';
  const [tournamentId, setTournamentId] = React.useState(defaultTournamentId);
  const [date, setDate] = React.useState('');
  const [time, setTime] = React.useState('');
  const [mapName, setMapName] = React.useState('Erangel');
  const [group, setGroup] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Gabungkan date dan time menjadi ISO string UTC
      const scheduledAt = new Date(`${date}T${time}:00`).toISOString();

      const res = await fetch('/api/admin/matches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tournamentId,
          scheduledAt,
          map: mapName,
          group,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Terjadi kesalahan');
      }

      onSuccess();
      onClose();
      // Reset form
      setDate('');
      setTime('');
      setGroup('');
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'Gagal menyimpan';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="animate-in fade-in zoom-in-95 w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-6 shadow-xl dark:border-neutral-800 dark:bg-[#121212]">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
            Tambah Jadwal Baru
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              Pilih Turnamen
            </label>
            <select
              required
              value={tournamentId}
              onChange={(e) => setTournamentId(e.target.value)}
              className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
            >
              <option value="" disabled>
                -- Pilih Turnamen --
              </option>
              {tournaments.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                Tanggal
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                Jam (WIB)
              </label>
              <input
                type="time"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                Map
              </label>
              <select
                required
                value={mapName}
                onChange={(e) => setMapName(e.target.value)}
                className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
              >
                <option value="Erangel">Erangel</option>
                <option value="Miramar">Miramar</option>
                <option value="Sanhok">Sanhok</option>
                <option value="Vikendi">Vikendi</option>
                <option value="Taego">Taego</option>
                <option value="Deston">Deston</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                Grup{' '}
                <span className="font-normal text-neutral-500">(Opsional)</span>
              </label>
              <input
                type="text"
                placeholder="Mis: A, B, Final"
                value={group}
                onChange={(e) => setGroup(e.target.value)}
                className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
              />
            </div>
          </div>

          <div className="mt-4 flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Batal
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              <Save className="mr-2 h-4 w-4" />
              {isSubmitting ? 'Menyimpan...' : 'Simpan Jadwal'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
