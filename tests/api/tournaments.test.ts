/* eslint-disable @typescript-eslint/no-explicit-any */
import { GET, POST } from '@/app/api/admin/tournaments/route';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/db';
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('next-auth', () => ({
  getServerSession: vi.fn(),
}));

vi.mock('@/lib/db', () => ({
  prisma: {
    tournament: {
      findMany: vi.fn(),
      create: vi.fn(),
    },
  },
}));

describe('Tournaments API (/api/tournaments)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET', () => {
    it('returns list of tournaments', async () => {
      vi.mocked(getServerSession).mockResolvedValue({
        user: { role: 'ADMIN' },
      } as any);
      const mockTournaments = [{ id: '1', name: 'UC96' }];
      vi.mocked(prisma.tournament.findMany).mockResolvedValueOnce(
        mockTournaments as any
      );

      const req = new Request('http://localhost/api/tournaments');
      const response = await GET(req);

      expect(response.status).toBe(200);
      const json = await response.json();
      expect(json).toEqual(mockTournaments);
    });
  });

  describe('POST', () => {
    it('returns 401 if not admin', async () => {
      vi.mocked(getServerSession).mockResolvedValueOnce(null);
      const req = new Request('http://localhost', {
        method: 'POST',
        body: JSON.stringify({ name: 'T1' }),
      });

      const response = await POST(req);
      expect(response.status).toBe(401);
    });

    it('returns 400 for invalid data', async () => {
      vi.mocked(getServerSession).mockResolvedValueOnce({
        user: { role: 'ADMIN' },
      } as any);

      const req = new Request('http://localhost', {
        method: 'POST',
        body: JSON.stringify({ name: '' }), // Invalid
      });

      const response = await POST(req);
      expect(response.status).toBe(400);
    });

    it('creates tournament successfully', async () => {
      vi.mocked(getServerSession).mockResolvedValueOnce({
        user: { role: 'ADMIN' },
      } as any);

      const mockData = {
        name: 'UC96 S2',
        startDate: '2026-01-01',
        endDate: '2026-01-10',
        status: 'DRAFT',
        bannerUrl: '/path/to/banner.jpg',
      };
      vi.mocked(prisma.tournament.create).mockResolvedValueOnce({
        id: 't1',
        ...mockData,
      } as any);

      const req = new Request('http://localhost', {
        method: 'POST',
        body: JSON.stringify(mockData),
      });

      const response = await POST(req);
      expect(response.status).toBe(201);
    });
  });
});
