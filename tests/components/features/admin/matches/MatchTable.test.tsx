import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MatchTable } from '@/components/features/admin/matches/MatchTable';

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

    render(<MatchTable activeTournaments={[]} />);

    expect(await screen.findByText('Erangel')).toBeInTheDocument();
  });
});
