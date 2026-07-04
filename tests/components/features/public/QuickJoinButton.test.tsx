import { render, screen, fireEvent } from '@testing-library/react';
import { QuickJoinButton } from '@/components/features/public/QuickJoinButton';
import { describe, it, expect, vi } from 'vitest';

// Mock useRouter
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    refresh: vi.fn(),
  }),
}));

// Mock sonner
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe('QuickJoinButton', () => {
  it('should show login modal when not logged in and clicked', () => {
    render(
      <QuickJoinButton
        tournamentId="t1"
        tournamentName="Test Tour"
        isLoggedIn={false}
      />
    );

    // Initial state: button is visible, modal is hidden
    const button = screen.getByText('Daftarkan Tim Anda');
    expect(button).toBeDefined();

    // Click button
    fireEvent.click(button);

    // Modal should appear
    expect(screen.getByText('Login Diperlukan')).toBeDefined();
    
    // Clicking confirm should redirect to login
    const confirmButton = screen.getByText('Login / Daftar');
    fireEvent.click(confirmButton);
    expect(mockPush).toHaveBeenCalledWith('/login');
  });

  it('should show confirm modal when logged in and clicked', () => {
    render(
      <QuickJoinButton
        tournamentId="t1"
        tournamentName="Test Tour"
        isLoggedIn={true}
      />
    );

    const button = screen.getByText('Daftarkan Tim Anda');
    fireEvent.click(button);

    // Confirm modal should appear
    expect(screen.getByText('Konfirmasi Pendaftaran')).toBeDefined();
    expect(screen.getByText(/Apakah Anda yakin ingin mendaftarkan tim Anda/)).toBeDefined();
  });
});
