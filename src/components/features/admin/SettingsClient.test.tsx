import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { test, expect, vi } from 'vitest';
import { SettingsClient } from './SettingsClient';

// Mock sonner toast
vi.mock('sonner', () => ({
  toast: {
    loading: vi.fn(() => 'toast-id'),
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock global fetch
global.fetch = vi.fn();

test('SettingsClient renders properly and handles save', async () => {
  const initialSettings = {
    about_vision: 'Visi awal',
    contact_whatsapp: 'wa.me/123',
  };

  render(<SettingsClient initialSettings={initialSettings} />);

  // Cek apakah input dirender dengan nilai awal
  const visionInput = screen.getByDisplayValue('Visi awal');
  expect(visionInput).toBeDefined();

  // Simulasi pengetikan (mengubah nilai input)
  fireEvent.change(visionInput, { target: { value: 'Visi diubah' } });

  // Menggunakan value dari elemen secara langsung untuk vitest
  expect((visionInput as HTMLTextAreaElement).value).toBe('Visi diubah');

  // Siapkan mock fetch response
  vi.mocked(global.fetch).mockResolvedValueOnce({
    ok: true,
    json: async () => ({ message: 'Sukses' }),
  } as unknown as Response);

  // Klik tombol simpan
  const saveButton = screen.getByText(/Simpan Semua Perubahan/i);
  fireEvent.click(saveButton);

  // Tunggu dan verifikasi fetch dipanggil dengan argumen yang benar
  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/admin/settings',
      expect.objectContaining({
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: expect.stringContaining('Visi diubah'),
      })
    );
  });
});
