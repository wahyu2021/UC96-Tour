import { render, screen, fireEvent } from '@testing-library/react';
import { ConfirmModal } from '@/components/ui/ConfirmModal';
import { describe, it, expect, vi } from 'vitest';

describe('ConfirmModal Component', () => {
  it('does not render when isOpen is false', () => {
    render(
      <ConfirmModal
        isOpen={false}
        onClose={vi.fn()}
        onConfirm={vi.fn()}
        title="Test Title"
        description="Test Description"
      />
    );
    expect(screen.queryByText('Test Title')).not.toBeInTheDocument();
  });

  it('renders correctly when isOpen is true', () => {
    render(
      <ConfirmModal
        isOpen={true}
        onClose={vi.fn()}
        onConfirm={vi.fn()}
        title="Delete Item"
        description="Are you sure you want to delete this?"
      />
    );
    expect(screen.getByText('Delete Item')).toBeInTheDocument();
    expect(
      screen.getByText('Are you sure you want to delete this?')
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /konfirmasi/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /batal/i })).toBeInTheDocument();
  });

  it('calls onClose when cancel button is clicked', () => {
    const handleClose = vi.fn();
    render(
      <ConfirmModal
        isOpen={true}
        onClose={handleClose}
        onConfirm={vi.fn()}
        title="Title"
        description="Desc"
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /batal/i }));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls onConfirm when confirm button is clicked', () => {
    const handleConfirm = vi.fn();
    render(
      <ConfirmModal
        isOpen={true}
        onClose={vi.fn()}
        onConfirm={handleConfirm}
        title="Title"
        description="Desc"
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /konfirmasi/i }));
    expect(handleConfirm).toHaveBeenCalledTimes(1);
  });

  it('disables buttons and shows loading text when isLoading is true', () => {
    render(
      <ConfirmModal
        isOpen={true}
        onClose={vi.fn()}
        onConfirm={vi.fn()}
        title="Title"
        description="Desc"
        isLoading={true}
      />
    );
    expect(screen.getByRole('button', { name: /batal/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /memproses/i })).toBeDisabled();
  });
});
