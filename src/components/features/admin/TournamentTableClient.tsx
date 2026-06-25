'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';

type TournamentData = {
  id: string;
  name: string;
  description: string | null;
  startDate: string | Date;
  endDate: string | Date;
  maxSlots: number;
  prizePool: string | null;
  status: string;
  _count?: { teams: number };
};

export function TournamentTableClient({
  initialTournaments,
}: {
  initialTournaments: TournamentData[];
}) {
  const [tournaments, setTournaments] = useState(initialTournaments);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    maxSlots: 32,
    prizePool: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleOpenModal = () => {
    setFormData({
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      maxSlots: 32,
      prizePool: '',
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/admin/tournaments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          maxSlots: Number(formData.maxSlots),
        }),
      });
      if (res.ok) {
        const newTour = await res.json();
        setTournaments([newTour, ...tournaments]);
        setIsModalOpen(false);
        router.refresh();
      } else {
        alert('Gagal menyimpan turnamen. Pastikan nama belum dipakai.');
      }
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan pada server');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredTournaments = tournaments.filter((t) => {
    const matchQuery = t.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === 'ALL' || t.status === statusFilter;
    return matchQuery && matchStatus;
  });

  return (
    <div className="space-y-6">
      <div className="relative z-10 mb-4 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
          <div className="w-full sm:w-64">
            <Input
              type="text"
              placeholder="Cari nama turnamen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="w-full sm:w-48">
            <Select
              value={statusFilter}
              onChange={setStatusFilter}
              options={[
                { value: 'ALL', label: 'Semua Status' },
                { value: 'UPCOMING', label: 'UPCOMING' },
                { value: 'ONGOING', label: 'ONGOING' },
                { value: 'COMPLETED', label: 'COMPLETED' },
              ]}
            />
          </div>
        </div>
        <div className="w-full sm:w-auto">
          <Button onClick={handleOpenModal} className="w-full sm:w-auto">
            + Tambah Turnamen
          </Button>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-[#121212]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-neutral-600 dark:text-neutral-400">
            <thead className="border-b border-neutral-200 bg-neutral-50/50 text-xs font-bold tracking-wider text-neutral-700 uppercase dark:border-neutral-800 dark:bg-[#0a0a0a] dark:text-neutral-300">
              <tr>
                <th className="px-6 py-5">Nama Turnamen</th>
                <th className="px-6 py-5">Tanggal</th>
                <th className="px-6 py-5">Slot Terisi</th>
                <th className="px-6 py-5">Prize Pool</th>
                <th className="px-6 py-5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {filteredTournaments.map((t) => (
                <tr
                  key={t.id}
                  className="transition-colors hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30"
                >
                  <td className="px-6 py-5">
                    <p className="font-bold text-neutral-900 dark:text-white">
                      {t.name}
                    </p>
                  </td>
                  <td className="px-6 py-5 font-medium">
                    {new Date(t.startDate).toLocaleDateString('id-ID')} -{' '}
                    {new Date(t.endDate).toLocaleDateString('id-ID')}
                  </td>
                  <td className="px-6 py-5 font-bold">
                    {t._count?.teams || 0} / {t.maxSlots}
                  </td>
                  <td className="px-6 py-5 font-medium">
                    {t.prizePool || '-'}
                  </td>
                  <td className="px-6 py-5 text-right">
                    <Badge
                      variant={
                        t.status === 'ONGOING'
                          ? 'success'
                          : t.status === 'COMPLETED'
                            ? 'default'
                            : 'warning'
                      }
                      dot
                    >
                      {t.status}
                    </Badge>
                  </td>
                </tr>
              ))}
              {filteredTournaments.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-neutral-500"
                  >
                    Belum ada turnamen aktif.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Tambah Turnamen Baru"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Nama Turnamen *
            </label>
            <Input
              required
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Ex: UC96 Summer Cup"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Tanggal Mulai *
              </label>
              <Input
                required
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Tanggal Selesai *
              </label>
              <Input
                required
                type="date"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Maks Slot Tim *
              </label>
              <Input
                required
                type="number"
                min="2"
                value={formData.maxSlots}
                onChange={(e) =>
                  setFormData({ ...formData, maxSlots: Number(e.target.value) })
                }
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Prize Pool
              </label>
              <Input
                type="text"
                placeholder="Rp 10.000.000"
                value={formData.prizePool}
                onChange={(e) =>
                  setFormData({ ...formData, prizePool: e.target.value })
                }
              />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Aturan / Deskripsi
            </label>
            <textarea
              className="flex w-full rounded-md border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900 transition-colors outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] dark:border-neutral-700 dark:bg-[#121212] dark:text-white"
              rows={3}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Syarat dan ketentuan khusus..."
            />
          </div>
          <div className="mt-6 flex justify-end gap-3 border-t border-neutral-100 pt-4 dark:border-neutral-800">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsModalOpen(false)}
            >
              Batal
            </Button>
            <Button type="submit" isLoading={isSubmitting}>
              {isSubmitting ? 'Menyimpan...' : 'Simpan Turnamen'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
