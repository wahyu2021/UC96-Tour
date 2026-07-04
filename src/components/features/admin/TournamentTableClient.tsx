'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/Button';
const Modal = dynamic(
  () => import('@/components/ui/Modal').then((mod) => mod.Modal),
  {
    ssr: false,
  }
);
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { ConfirmModal } from '@/components/ui/ConfirmModal';
import { UploadCloud, Pencil } from 'lucide-react';
import { formatRupiah } from '@/lib/utils';
import { toast } from 'sonner';

type TournamentData = {
  id: string;
  name: string;
  description: string | null;
  bannerUrl: string | null;
  backgroundUrl: string | null;
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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    maxSlots: 32,
    prizePool: '',
    bannerUrl: '',
    backgroundUrl: '',
    status: 'UPCOMING',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const router = useRouter();

  const handleOpenModal = (t?: TournamentData) => {
    if (t) {
      setEditingId(t.id);
      setFormData({
        name: t.name,
        description: t.description || '',
        startDate: new Date(t.startDate).toISOString().split('T')[0],
        endDate: new Date(t.endDate).toISOString().split('T')[0],
        maxSlots: t.maxSlots,
        prizePool: t.prizePool || '',
        bannerUrl: t.bannerUrl || '',
        backgroundUrl: t.backgroundUrl || '',
        status: t.status,
      });
    } else {
      setEditingId(null);
      setFormData({
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        maxSlots: 32,
        prizePool: '',
        bannerUrl: '',
        backgroundUrl: '',
        status: 'UPCOMING',
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const url = editingId
        ? `/api/admin/tournaments/${editingId}`
        : '/api/admin/tournaments';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          maxSlots: Number(formData.maxSlots),
        }),
      });
      if (res.ok) {
        const updatedTour = await res.json();
        if (editingId) {
          setTournaments(
            tournaments.map((t) => (t.id === editingId ? updatedTour : t))
          );
          toast.success('Turnamen berhasil diperbarui!');
        } else {
          setTournaments([updatedTour, ...tournaments]);
          toast.success('Turnamen berhasil ditambahkan!');
        }
        setIsModalOpen(false);
        setEditingId(null);
        router.refresh();
      } else {
        toast.error('Gagal menyimpan turnamen. Pastikan nama belum dipakai.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Terjadi kesalahan pada server');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGenerateDaily = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/admin/tournaments/generate-daily', {
        method: 'POST',
      });
      const data = await res.json();
      if (res.ok) {
        setIsConfirmModalOpen(false);
        toast.success(data.message);
        router.refresh();
        window.location.reload();
      } else {
        toast.error(data.error || 'Gagal generate turnamen.');
        setIsConfirmModalOpen(false);
      }
    } catch (err) {
      console.error(err);
      toast.error('Terjadi kesalahan pada server');
      setIsConfirmModalOpen(false);
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
        <div className="flex w-full items-center gap-2 sm:w-auto">
          <Button
            onClick={() => setIsConfirmModalOpen(true)}
            disabled={isSubmitting}
            variant="secondary"
            className="w-full bg-green-100 text-green-700 hover:bg-green-200 sm:w-auto dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50"
          >
            Generate Daily Scrim
          </Button>
          <Button
            onClick={() => handleOpenModal()}
            className="w-full sm:w-auto"
          >
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
                <th className="px-6 py-5 text-center">Status</th>
                <th className="px-6 py-5 text-right">Aksi</th>
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
                    {t.prizePool ? (
                      <span className="font-bold text-yellow-600 dark:text-yellow-500">
                        {formatRupiah(t.prizePool)}
                      </span>
                    ) : (
                      <span className="text-neutral-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-5 text-center">
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
                  <td className="px-6 py-5 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hover:text-brand-600 dark:hover:text-brand-400 h-8 px-2 text-neutral-400"
                      onClick={() => handleOpenModal(t)}
                      title="Edit Turnamen"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
              {filteredTournaments.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
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
        onClose={() => {
          setIsModalOpen(false);
          setEditingId(null);
        }}
        title={editingId ? 'Edit Turnamen' : 'Tambah Turnamen Baru'}
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

          {editingId && (
            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Status Turnamen *
              </label>
              <Select
                value={formData.status}
                onChange={(v) => setFormData({ ...formData, status: v })}
                options={[
                  { value: 'UPCOMING', label: 'UPCOMING' },
                  { value: 'ONGOING', label: 'ONGOING' },
                  { value: 'COMPLETED', label: 'COMPLETED' },
                ]}
              />
            </div>
          )}

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
                value={formData.prizePool}
                onChange={(e) =>
                  setFormData({ ...formData, prizePool: e.target.value })
                }
                placeholder="Contoh: 10000000"
              />
              {formData.prizePool && !isNaN(Number(formData.prizePool)) && (
                <p className="mt-1 text-xs text-neutral-500">
                  Preview: {formatRupiah(formData.prizePool)}
                </p>
              )}
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Upload Banner Image *
            </label>
            <div className="mt-2 flex justify-center rounded-xl border border-dashed border-neutral-300 px-6 py-8 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800/50">
              <div className="text-center">
                <UploadCloud className="mx-auto h-10 w-10 text-neutral-400" />
                <div className="mt-4 flex text-sm leading-6 text-neutral-600 dark:text-neutral-400">
                  <label
                    htmlFor="banner-upload"
                    className="hover:text-brand-600 dark:hover:text-brand-400 relative cursor-pointer rounded-md font-semibold text-[var(--color-primary)] focus-within:ring-2 focus-within:ring-[var(--color-primary)] focus-within:outline-none"
                  >
                    <span>Pilih file gambar</span>
                    <input
                      id="banner-upload"
                      name="banner-upload"
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setFormData({
                              ...formData,
                              bannerUrl: reader.result as string,
                            });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                  <p className="pl-1">atau tarik ke sini</p>
                </div>
                <p className="text-xs leading-5 text-neutral-500">
                  PNG, JPG, GIF hingga 5MB
                </p>
              </div>
            </div>
            {formData.bannerUrl && (
              <div className="mt-4 flex justify-center">
                <div className="aspect-[9/16] h-64 w-auto overflow-hidden rounded-xl border border-neutral-200 shadow-sm dark:border-neutral-700">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={formData.bannerUrl}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Upload Landscape Background (Opsional 16:9)
            </label>
            <Input
              type="file"
              accept="image/*"
              className="cursor-pointer file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-neutral-100 file:px-4 file:py-2 file:text-sm file:font-bold file:text-neutral-700 hover:file:bg-neutral-200 dark:file:bg-neutral-800 dark:file:text-neutral-300 dark:hover:file:bg-neutral-700"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setFormData({
                      ...formData,
                      backgroundUrl: reader.result as string,
                    });
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
            {formData.backgroundUrl && (
              <div className="mt-2 flex w-full justify-center overflow-hidden rounded-xl border border-neutral-200 shadow-sm dark:border-neutral-700">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={formData.backgroundUrl}
                  alt="Preview BG"
                  className="aspect-[16/9] w-full object-cover"
                />
              </div>
            )}
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

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleGenerateDaily}
        title="Generate Daily Scrim"
        description="Apakah Anda yakin ingin men-generate turnamen Daily Scrim hari ini beserta 3 jadwal Matches secara otomatis?"
        confirmText="Generate Sekarang"
        variant="default"
        isLoading={isSubmitting}
      />
    </div>
  );
}
