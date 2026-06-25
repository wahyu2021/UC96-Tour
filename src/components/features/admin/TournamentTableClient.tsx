'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';

export function TournamentTableClient({ initialTournaments }: { initialTournaments: any[] }) {
  const [tournaments, setTournaments] = useState(initialTournaments);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '', startDate: '', endDate: '', maxSlots: 32, prizePool: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleOpenModal = () => {
    setFormData({ name: '', description: '', startDate: '', endDate: '', maxSlots: 32, prizePool: '' });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/admin/tournaments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, maxSlots: Number(formData.maxSlots) }),
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

  return (
    <div className="space-y-6">
      <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex justify-end">
        <Button onClick={handleOpenModal}>
          + Tambah Turnamen
        </Button>
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
              {tournaments.map((t) => (
                <tr key={t.id} className="transition-colors hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30">
                  <td className="px-6 py-5">
                    <p className="font-bold text-neutral-900 dark:text-white">{t.name}</p>
                  </td>
                  <td className="px-6 py-5 font-medium">{new Date(t.startDate).toLocaleDateString('id-ID')} - {new Date(t.endDate).toLocaleDateString('id-ID')}</td>
                  <td className="px-6 py-5 font-bold">{t._count?.teams || 0} / {t.maxSlots}</td>
                  <td className="px-6 py-5 font-medium">{t.prizePool || '-'}</td>
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
              {tournaments.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-neutral-500">
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
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Nama Turnamen *</label>
            <Input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Ex: UC96 Summer Cup" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Tanggal Mulai *</label>
              <Input required type="date" value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Tanggal Selesai *</label>
              <Input required type="date" value={formData.endDate} onChange={e => setFormData({...formData, endDate: e.target.value})} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Maks Slot Tim *</label>
              <Input required type="number" min="2" value={formData.maxSlots} onChange={e => setFormData({...formData, maxSlots: Number(e.target.value)})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Prize Pool</label>
              <Input type="text" placeholder="Rp 10.000.000" value={formData.prizePool} onChange={e => setFormData({...formData, prizePool: e.target.value})} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Aturan / Deskripsi</label>
            <textarea className="w-full flex rounded-md border border-neutral-300 px-4 py-2.5 text-sm transition-colors outline-none bg-white text-neutral-900 dark:border-neutral-700 dark:bg-[#121212] dark:text-white focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]" rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Syarat dan ketentuan khusus..." />
          </div>
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Batal</Button>
            <Button type="submit" isLoading={isSubmitting}>
              {isSubmitting ? 'Menyimpan...' : 'Simpan Turnamen'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
