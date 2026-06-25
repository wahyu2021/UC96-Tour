/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TeamsPage from '@/app/teams/page';
import * as teamsApi from '@/lib/api/teams';

vi.mock('@/lib/api/teams', () => ({
  getPublicTeams: vi.fn(),
  getActiveTournaments: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), prefetch: vi.fn() }),
  usePathname: () => '/teams',
  useSearchParams: () => new URLSearchParams(),
}));

describe('TeamsPage', () => {
  it('renders teams list successfully', async () => {
    vi.mocked(teamsApi.getPublicTeams).mockResolvedValueOnce({
      teams: [
        {
          id: '1',
          name: 'Team Alpha',
          tag: 'ALP',
          logoUrl: '',
          players: [],
          tournament: { name: 'T1' },
        },
      ],
      metadata: { total: 1, page: 1, limit: 12, totalPages: 1 },
    } as any);
    vi.mocked(teamsApi.getActiveTournaments).mockResolvedValueOnce([]);

    const jsx = await TeamsPage({ searchParams: Promise.resolve({}) });
    render(jsx);

    expect(screen.getByText('Team Alpha')).toBeInTheDocument();
  });
});
