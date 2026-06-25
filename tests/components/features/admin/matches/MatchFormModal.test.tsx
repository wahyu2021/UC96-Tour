import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MatchFormModal } from '@/components/features/admin/matches/MatchFormModal';

describe('MatchFormModal', () => {
  it('renders the modal when isOpen is true', () => {
    render(
      <MatchFormModal
        isOpen={true}
        onClose={vi.fn()}
        onSuccess={vi.fn()}
        tournaments={[]}
      />
    );
    expect(screen.getByText(/Tambah Jadwal Baru/i)).toBeInTheDocument();
  });
});
