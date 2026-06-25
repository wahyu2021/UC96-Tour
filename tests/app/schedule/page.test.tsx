/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SchedulePage from '@/app/schedule/page';
import * as matchesApi from '@/lib/api/matches';

vi.mock('@/lib/api/matches', () => ({
  getPublicMatches: vi.fn(),
  getMatchDates: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), prefetch: vi.fn() }),
  usePathname: () => '/schedule',
  useSearchParams: () => new URLSearchParams(),
}));

describe('SchedulePage', () => {
  it('renders matches list successfully', async () => {
    vi.mocked(matchesApi.getMatchDates).mockResolvedValueOnce(['2026-10-10']);
    vi.mocked(matchesApi.getPublicMatches).mockResolvedValueOnce([
      {
        id: '1',
        scheduledAt: new Date('2026-10-10T10:00:00Z'),
        map: 'Erangel',
        group: 'A',
        status: 'SCHEDULED',
        tournament: { name: 'T1' },
      },
    ] as any);

    const jsx = await SchedulePage({ searchParams: Promise.resolve({}) });
    render(jsx);

    expect(screen.getByText('Erangel')).toBeInTheDocument();
  });
});
