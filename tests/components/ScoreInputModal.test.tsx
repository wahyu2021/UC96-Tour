import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ScoreInputModal } from '@/components/features/admin/matches/ScoreInputModal';
import React from 'react';

global.fetch = vi.fn();

describe('ScoreInputModal Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('does not render when isOpen is false', () => {
    const { container } = render(
      <ScoreInputModal
        isOpen={false}
        onClose={() => {}}
        matchId="1"
        tournamentId="1"
        onSuccess={() => {}}
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders modal when isOpen is true', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => [],
    });

    render(
      <ScoreInputModal
        isOpen={true}
        onClose={() => {}}
        matchId="1"
        tournamentId="1"
        onSuccess={() => {}}
      />
    );

    expect(
      await screen.findByText(/Input Skor Pertandingan/i)
    ).toBeInTheDocument();
  });
});
