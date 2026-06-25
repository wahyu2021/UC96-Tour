import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ScoreInputClient } from '@/components/features/admin/matches/ScoreInputClient';
import { DEFAULT_RULES } from '@/lib/scoring';
import React from 'react';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    back: vi.fn(),
  }),
}));

global.fetch = vi.fn();

describe('ScoreInputClient Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockMatch = {
    id: 'm1',
    map: 'Erangel',
    group: 'A',
    scheduledAt: new Date(),
    tournament: { name: 'UC96 S1' },
  };

  const mockTeams = [
    { id: 't1', name: 'Alpha', tag: 'ALP', logoUrl: null },
    { id: 't2', name: 'Beta', tag: 'BET', logoUrl: null },
  ];

  it('renders teams and allows score input', () => {
    render(
      <ScoreInputClient
        match={mockMatch}
        teams={mockTeams}
        initialScores={[]}
        scoringRules={DEFAULT_RULES}
      />
    );

    expect(screen.getByText(/Alpha/i)).toBeInTheDocument();
    expect(screen.getByText(/Beta/i)).toBeInTheDocument();
    expect(screen.getByText('Input Skor Pertandingan')).toBeInTheDocument();
  });

  it('populates initial scores correctly', () => {
    const initialScores = [{ teamId: 't1', finishPosition: 1, killPoints: 5 }];

    render(
      <ScoreInputClient
        match={mockMatch}
        teams={mockTeams}
        initialScores={initialScores}
        scoringRules={DEFAULT_RULES}
      />
    );

    const rankInputs = screen.getAllByPlaceholderText(/Rank 1-16\+/i);
    const killInputs = screen.getAllByPlaceholderText(/Jumlah Kill/i);

    expect(rankInputs[0]).toHaveValue(1);
    expect(killInputs[0]).toHaveValue(5);
  });
});
