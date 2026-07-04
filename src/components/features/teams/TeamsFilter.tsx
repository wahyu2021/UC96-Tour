'use client';

import * as React from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { TeamsFilterProps } from '@/types';

export function TeamsFilter({ tournaments }: TeamsFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Ambil state awal dari URL
  const [search, setSearch] = React.useState(searchParams.get('q') || '');
  const [tournamentId, setTournamentId] = React.useState(
    searchParams.get('tournament') || 'ALL'
  );

  // Opsi dropdown
  const tournamentOptions = [
    { value: 'ALL', label: 'Semua Turnamen' },
    ...tournaments.map((t) => ({ value: t.id, label: t.name })),
  ];

  // Fungsi untuk update URL parameter
  const updateUrl = React.useCallback(
    (newSearch: string, newTournamentId: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (newSearch) {
        params.set('q', newSearch);
      } else {
        params.delete('q');
      }

      if (newTournamentId && newTournamentId !== 'ALL') {
        params.set('tournament', newTournamentId);
      } else {
        params.delete('tournament');
      }

      // Reset ke halaman 1 setiap kali filter berubah
      params.delete('page');

      router.push(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams]
  );

  // Debounce effect untuk search input (tunggu 500ms setelah selesai ngetik)
  React.useEffect(() => {
    const timer = setTimeout(() => {
      // Bandingkan dengan parameter URL untuk mencegah loop tak berujung
      const currentQ = searchParams.get('q') || '';
      const currentT = searchParams.get('tournament') || 'ALL';

      if (search !== currentQ || tournamentId !== currentT) {
        updateUrl(search, tournamentId);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search, tournamentId, searchParams, updateUrl]);

  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row">
      <div className="w-full sm:w-80">
        <Input
          type="text"
          placeholder="Cari tim atau tag (ex: UC96)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="w-full sm:w-64">
        <Select
          value={tournamentId}
          onChange={setTournamentId}
          options={tournamentOptions}
        />
      </div>
    </div>
  );
}
