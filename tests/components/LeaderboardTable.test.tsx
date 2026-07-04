import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { LeaderboardTable } from '@/components/features/public/LeaderboardTable';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock fetch
global.fetch = vi.fn();

describe('LeaderboardTable Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state initially', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (global.fetch as any).mockImplementationOnce(() => new Promise(() => {}));
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <LeaderboardTable />
      </QueryClientProvider>
    );
    expect(screen.getByText(/Menganalisis data pertandingan/i)).toBeInTheDocument();
  });

  it('renders leaderboard data', async () => {
    const mockData = {
      leaderboard: [
        {
          rank: 1,
          teamId: 't1',
          teamName: 'Team Alpha',
          matchesPlayed: 2,
          wwcd: 1,
          totalKills: 10,
          placementPoints: 10,
          totalPoints: 20,
        },
        {
          rank: 2,
          teamId: 't2',
          teamName: 'Team Beta',
          matchesPlayed: 2,
          wwcd: 0,
          totalKills: 5,
          placementPoints: 6,
          totalPoints: 11,
        },
      ],
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <LeaderboardTable />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Team Alpha')).toBeInTheDocument();
      expect(screen.getByText('Team Beta')).toBeInTheDocument();
    });

    // Check points are displayed
    expect(screen.getByText('20')).toBeInTheDocument();
    expect(screen.getByText('11')).toBeInTheDocument();
  });
});
