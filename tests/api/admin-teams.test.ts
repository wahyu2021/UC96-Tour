/* eslint-disable @typescript-eslint/no-explicit-any */
import { PATCH } from '@/app/api/admin/teams/[id]/route';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/db';
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('next-auth', () => ({
  getServerSession: vi.fn(),
}));

vi.mock('@/lib/db', () => ({
  prisma: {
    team: {
      update: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

describe('Admin Teams API (/api/admin/teams/[id])', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('PATCH', () => {
    it('returns 401 if not admin', async () => {
      vi.mocked(getServerSession).mockResolvedValueOnce(null);
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
      vi.mocked(getServerSession).mockResolvedValueOnce({
        user: { role: 'ADMIN' },
      } as any);
      vi.mocked(prisma.team.update).mockResolvedValueOnce({
        id: '1',
        status: 'APPROVED',
      } as any);

      const req = new Request('http://localhost', {
        method: 'PATCH',
        body: JSON.stringify({ status: 'APPROVED' }),
      });

      const response = await PATCH(req, {
        params: Promise.resolve({ id: '1' }),
      });
      expect(response.status).toBe(200);
      expect(prisma.team.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: { status: 'APPROVED' },
      });
    });
  });
});
