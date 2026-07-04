'use client';

import * as React from 'react';
import { Save } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { MatchFormModalProps } from '@/types';

export function MatchFormModal({
  isOpen,
  onClose,
  onSuccess,
  tournaments,
  editingMatch,
}: MatchFormModalProps) {
  const defaultTournamentId = tournaments.length === 1 ? tournaments[0].id : '';

  const initialDate = editingMatch
    ? new Date(editingMatch.scheduledAt).toISOString().split('T')[0]
    : '';
  const initialTime = editingMatch
    ? new Date(editingMatch.scheduledAt).toTimeString().substring(0, 5)
    : '';

  const [tournamentId, setTournamentId] = React.useState(
    editingMatch?.tournament?.id || defaultTournamentId
  );
  const [date, setDate] = React.useState(initialDate);
  const [time, setTime] = React.useState(initialTime);
  const [mapName, setMapName] = React.useState(editingMatch?.map || 'Erangel');
  const [group, setGroup] = React.useState(editingMatch?.group || '');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState('');
  const mapOptions = [
    { value: 'Erangel', label: 'Erangel' },
    { value: 'Miramar', label: 'Miramar' },
    { value: 'Sanhok', label: 'Sanhok' },
    { value: 'Vikendi', label: 'Vikendi' },
    { value: 'Taego', label: 'Taego' },
    { value: 'Deston', label: 'Deston' },
  ];

  const tournamentOptions = tournaments.map((t) => ({
    value: t.id,
    label: t.name,
  }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!tournamentId) {
      setError('Turnamen harus dipilih.');
      return;
    }
    if (!date || !time) {
      setError('Tanggal dan Jam harus diisi.');
      return;
    }

    setIsSubmitting(true);

    try {
      const scheduledAt = new Date(`${date}T${time}:00`).toISOString();

      const url = editingMatch
        ? `/api/admin/matches/${editingMatch.id}`
        : '/api/admin/matches';
      const method = editingMatch ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingMatch ? 'Edit Jadwal' : 'Tambah Jadwal Baru'}
    >
      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-neutral-700 dark:text-neutral-300">
            Pilih Turnamen
          </label>
          <Select
            options={tournamentOptions}
            value={tournamentId}
            onChange={setTournamentId}
            placeholder="-- Pilih Turnamen --"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              Tanggal
            </label>
            <Input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              Jam (WIB)
            </label>
            <Input
              type="time"
              required
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              Map
            </label>
            <Select
              options={mapOptions}
              value={mapName}
              onChange={setMapName}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              Grup{' '}
              <span className="font-normal text-neutral-500">(Opsional)</span>
            </label>
            <Input
              type="text"
              placeholder="Mis: A, B, Final"
              value={group}
              onChange={(e) => setGroup(e.target.value)}
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
    </Modal>
  );
}
