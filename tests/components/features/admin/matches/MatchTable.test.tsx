import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MatchTable } from '@/components/features/admin/matches/MatchTable';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

describe('MatchTable', () => {
  it('renders table with matches', async () => {
    const mockMatches = [
      {
        id: '1',
        map: 'Erangel',
        scheduledAt: new Date().toISOString(),
        group: 'A',
        status: 'SCHEDULED',
        tournament: { name: 'T1' },
      },
    ];

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockMatches,
    });

    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <MatchTable activeTournaments={[]} />
      </QueryClientProvider>
    );

    expect(await screen.findByText('Erangel')).toBeInTheDocument();
  });
});
