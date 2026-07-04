/* eslint-disable @typescript-eslint/no-explicit-any */
import { GET, POST } from '@/app/api/admin/matches/route';
import { PATCH, DELETE } from '@/app/api/admin/matches/[id]/route';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/db';
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('next-auth', () => ({
  getServerSession: vi.fn(),
}));

vi.mock('@/lib/db', () => ({
  prisma: {
    match: {
      findMany: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    tournament: {
      findUnique: vi.fn(),
    },
  },
}));

describe('Admin Matches API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /api/admin/matches', () => {
    it('returns 401 if not authenticated or not admin', async () => {
      vi.mocked(getServerSession).mockResolvedValueOnce(null);

      const response = await GET();
      expect(response.status).toBe(401);

      const json = await response.json();
      expect(json).toEqual({ error: 'Unauthorized' });
    });

    it('returns matches if admin', async () => {
      vi.mocked(getServerSession).mockResolvedValueOnce({
        user: { role: 'ADMIN' },
      } as any);

      const mockMatches = [{ id: '1', map: 'Erangel' }];
      vi.mocked(prisma.match.findMany).mockResolvedValueOnce(
        mockMatches as any
      );

      const response = await GET();
      expect(response.status).toBe(200);

      const json = await response.json();
      expect(json).toEqual(mockMatches);
      expect(prisma.match.findMany).toHaveBeenCalled();
    });
  });

  describe('POST /api/admin/matches', () => {
    it('returns 401 if not admin', async () => {
      vi.mocked(getServerSession).mockResolvedValueOnce(null);
      const req = new Request('http://localhost', {
        method: 'POST',
        body: JSON.stringify({}),
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
        body: JSON.stringify({ tournamentId: '' }), // Invalid, missing fields
      });

      const response = await POST(req);
      expect(response.status).toBe(400);
    });

    it('creates a match and returns 201', async () => {
      vi.mocked(getServerSession).mockResolvedValueOnce({
        user: { role: 'ADMIN' },
      } as any);

      const mockData = {
        tournamentId: 't1',
        scheduledAt: '2026-10-10T10:00:00Z',
        map: 'Miramar',
        group: 'A',
      };

      vi.mocked(prisma.match.create).mockResolvedValueOnce({
        id: 'm1',
        ...mockData,
        status: 'SCHEDULED',
      } as any);

      vi.mocked(prisma.tournament.findUnique).mockResolvedValueOnce({
        id: 't1',
        startDate: new Date('2026-10-09T00:00:00Z'),
        endDate: new Date('2026-10-11T23:59:59Z'),
      } as any);

      const req = new Request('http://localhost', {
        method: 'POST',
        body: JSON.stringify(mockData),
      });

      const response = await POST(req);
      expect(response.status).toBe(201);
      const json = await response.json();
      expect(json.id).toBe('m1');
    });
  });

  describe('PATCH /api/admin/matches/[id]', () => {
    it('returns 400 for invalid status update', async () => {
      vi.mocked(getServerSession).mockResolvedValueOnce({
        user: { role: 'ADMIN' },
      } as any);

      const req = new Request('http://localhost', {
        method: 'PATCH',
        body: JSON.stringify({ status: 'INVALID_STATUS' }),
      });

      const response = await PATCH(req, {
        params: Promise.resolve({ id: 'm1' }),
      });
      expect(response.status).toBe(400);
    });

    it('updates status and returns 200', async () => {
      vi.mocked(getServerSession).mockResolvedValueOnce({
        user: { role: 'ADMIN' },
      } as any);

      vi.mocked(prisma.match.update).mockResolvedValueOnce({
        id: 'm1',
        status: 'ONGOING',
      } as any);

      const req = new Request('http://localhost', {
        method: 'PATCH',
        body: JSON.stringify({ status: 'ONGOING' }),
      });

      const response = await PATCH(req, {
        params: Promise.resolve({ id: 'm1' }),
      });
      expect(response.status).toBe(200);
      expect(prisma.match.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: 'm1' },
          data: { status: 'ONGOING' },
        })
      );
    });
  });

  describe('DELETE /api/admin/matches/[id]', () => {
    it('deletes a match and returns success', async () => {
      vi.mocked(getServerSession).mockResolvedValueOnce({
        user: { role: 'ADMIN' },
      } as any);

      vi.mocked(prisma.match.delete).mockResolvedValueOnce({} as any);

      const req = new Request('http://localhost', { method: 'DELETE' });

      const response = await DELETE(req, {
        params: Promise.resolve({ id: 'm1' }),
      });
      expect(response.status).toBe(200);
      expect(prisma.match.delete).toHaveBeenCalledWith({ where: { id: 'm1' } });
    });
  });
});
