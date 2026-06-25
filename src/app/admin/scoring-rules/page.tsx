'use client';

import * as React from 'react';
import { Save, RefreshCcw, Info } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ScoringRule } from '@/lib/scoring';

export default function ScoringRulesPage() {
  const [rules, setRules] = React.useState<ScoringRule[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSaving, setIsSaving] = React.useState(false);

  const fetchRules = React.useCallback(async () => {
    try {
      const res = await fetch('/api/admin/scoring-rules');
      if (res.ok) {
        const data = await res.json();
        // If DB is empty, generate 1-20 default view
        // Or we just show whatever is in DB. If DB is empty, user can just click "Reset" first.
        // But for better UX, let's fetch, if empty, we populate locally with 1-16.
        if (data && data.length > 0) {
          setRules(data);
        } else {
          // Initialize empty 1-16 array locally so they can edit
          const emptyRules = Array.from({ length: 16 }, (_, i) => ({
            rank: i + 1,
            placementPoints: 0,
          }));
          setRules(emptyRules);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchRules();
  }, [fetchRules]);

  const handleInputChange = (rank: number, value: string) => {
    setRules((prev) =>
      prev.map((r) =>
        r.rank === rank
          ? { ...r, placementPoints: parseInt(value, 10) || 0 }
          : r
      )
    );
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/admin/scoring-rules', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rules }),
      });
      if (res.ok) {
        alert('Aturan Poin berhasil disimpan!');
        fetchRules();
      } else {
        const data = await res.json();
        alert(data.error || 'Gagal menyimpan aturan.');
      }
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan sistem.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = async () => {
    if (
      !confirm(
        'Anda yakin ingin mengembalikan semua poin ke Aturan Standar Global PUBG? Data sebelumnya akan tertimpa.'
      )
    )
      return;

    setIsSaving(true);
    try {
      const res = await fetch('/api/admin/scoring-rules/reset', {
        method: 'POST',
      });
      if (res.ok) {
        alert('Aturan berhasil dikembalikan ke standar PUBG.');
        fetchRules();
      } else {
        alert('Gagal mereset aturan.');
      }
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan sistem.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        Memuat konfigurasi poin...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
            Pengaturan Sistem Poin
          </h2>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            Sesuaikan jumlah poin yang didapat untuk setiap peringkat
            (Placement).
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="border-neutral-300 hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
            onClick={handleReset}
            disabled={isSaving}
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            Reset ke Standar PUBG
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? 'Menyimpan...' : 'Simpan Aturan'}
          </Button>
        </div>
      </div>

      <div className="border-brand-200 bg-brand-50 dark:border-brand-900/30 dark:bg-brand-900/10 flex items-start gap-3 rounded-lg border p-4">
        <Info className="text-brand-600 dark:text-brand-500 mt-0.5 h-5 w-5" />
        <div className="text-brand-800 dark:text-brand-400 text-sm">
          <strong>Poin per Kill:</strong> Sistem ini secara otomatis memberikan{' '}
          <strong>1 Poin</strong> untuk setiap Kill. Tabel di bawah ini hanya
          mengatur tambahan poin berdasarkan urutan bertahan hidup (Placement).
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {rules.map((rule) => (
          <div
            key={rule.rank}
            className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-[#121212]"
          >
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-neutral-500 dark:text-neutral-400">
                Peringkat
              </span>
              <span className="text-2xl font-black text-neutral-900 dark:text-white">
                #{rule.rank}
              </span>
            </div>
            <div className="flex flex-col items-end">
              <label className="text-xs font-semibold text-neutral-400 uppercase">
                Poin
              </label>
              <input
                type="number"
                min="0"
                value={rule.placementPoints}
                onChange={(e) => handleInputChange(rule.rank, e.target.value)}
                className="focus:border-brand-500 focus:ring-brand-500 mt-1 w-20 rounded-md border border-neutral-300 bg-neutral-50 px-3 py-1.5 text-center text-lg font-bold text-[var(--color-primary)] focus:outline-none dark:border-neutral-700 dark:bg-neutral-900"
              />
            </div>
          </div>
        ))}
      </div>

      {rules.length < 24 && (
        <div className="mt-4 flex justify-center">
          <Button
            variant="outline"
            onClick={() => {
              const maxRank =
                rules.length > 0 ? Math.max(...rules.map((r) => r.rank)) : 0;
              setRules([...rules, { rank: maxRank + 1, placementPoints: 0 }]);
            }}
          >
            + Tambah Slot Peringkat
          </Button>
        </div>
      )}
    </div>
  );
}
