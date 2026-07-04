/* eslint-disable @typescript-eslint/no-explicit-any */
import { PATCH } from '@/app/api/admin/teams/[id]/route';
import { getServerSession } from 'next-auth';
import { requireAdmin } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('next-auth', () => ({
  getServerSession: vi.fn(),
}));

vi.mock('@/lib/auth', () => ({
  requireAdmin: vi.fn(),
}));

vi.mock('@/lib/db', () => ({
  prisma: {
    tournamentRegistration: {
      updateMany: vi.fn(),
    },
  },
}));

describe('Admin Teams API (/api/admin/teams/[id])', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('PATCH', () => {
    it('returns 401 if not admin', async () => {
      vi.mocked(requireAdmin).mockResolvedValueOnce(null);
      const req = new Request('http://localhost', {
        method: 'PATCH',
        body: JSON.stringify({ status: 'APPROVED' }),
      });

      const response = await PATCH(req, {
        params: Promise.resolve({ id: '1' }),
      });
      expect(response.status).toBe(401);
    });

    it('updates team status successfully', async () => {
      vi.mocked(requireAdmin).mockResolvedValueOnce({
        user: { role: 'ADMIN' },
      } as any);
      vi.mocked(prisma.tournamentRegistration.updateMany).mockResolvedValueOnce({
        count: 1,
      } as any);

      const req = new Request('http://localhost', {
        method: 'PATCH',
        body: JSON.stringify({ status: 'APPROVED' }),
      });

      const response = await PATCH(req, {
        params: Promise.resolve({ id: '1' }),
      });
      expect(response.status).toBe(200);
      expect(prisma.tournamentRegistration.updateMany).toHaveBeenCalledWith({
        where: { teamId: '1' },
        data: { status: 'APPROVED' },
      });
    });
  });
});
