/* eslint-disable @typescript-eslint/no-explicit-any */
import { POST } from '@/app/api/admin/tournaments/generate-daily/route';
import { prisma } from '@/lib/db';
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('next-auth', () => ({
  getServerSession: vi.fn(),
}));

import { getServerSession } from 'next-auth';

vi.mock('@/lib/db', () => ({
  prisma: {
    tournament: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
  },
}));

describe('Auto-Generate Scrim API (/api/admin/tournaments/generate-daily)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns 401 if unauthorized or not admin', async () => {
    vi.mocked(getServerSession).mockResolvedValueOnce({
      user: { role: 'PLAYER' },
    } as any);

    const req = new Request('http://localhost', {
      method: 'POST',
      body: JSON.stringify({}),
    });

    const response = await POST(req);
    expect(response.status).toBe(401);
  });

  it('returns 400 if tournament for today already exists', async () => {
    vi.mocked(getServerSession).mockResolvedValueOnce({
      user: { role: 'ADMIN' },
    } as any);

    // Existing tournament
    vi.mocked(prisma.tournament.findUnique).mockResolvedValueOnce({
      id: 'existing',
    } as any);

    const req = new Request('http://localhost', {
      method: 'POST',
      body: JSON.stringify({}),
    });

    const response = await POST(req);
    expect(response.status).toBe(400);
  });

  it('generates tournament successfully', async () => {
    vi.mocked(getServerSession).mockResolvedValueOnce({
      user: { role: 'ADMIN' },
    } as any);

    vi.mocked(prisma.tournament.findUnique).mockResolvedValueOnce(null);
    vi.mocked(prisma.tournament.create).mockResolvedValueOnce({
      id: 'new_scrim',
      name: 'Daily Scrim',
      maxSlots: 16,
    } as any);

    const req = new Request('http://localhost', {
      method: 'POST',
      body: JSON.stringify({}),
    });

    const response = await POST(req);
    expect(response.status).toBe(201);
  });
});
