/* eslint-disable @typescript-eslint/no-explicit-any */
import { GET } from '@/app/api/teams/[id]/details/route';
import { prisma } from '@/lib/db';
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@/lib/db', () => ({
  prisma: {
    team: {
      findUnique: vi.fn(),
    },
  },
}));

describe('Team Details API (/api/teams/[id]/details)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET', () => {
    it('returns 400 if team ID is missing', async () => {
      const req = new Request('http://localhost/api/teams//details');
      const response = await GET(req, { params: Promise.resolve({ id: '' }) });

      expect(response.status).toBe(400);
      const json = await response.json();
      expect(json.error).toBe('Team ID is required');
    });

    it('returns 404 if team not found', async () => {
      vi.mocked(prisma.team.findUnique).mockResolvedValueOnce(null);

      const req = new Request('http://localhost/api/teams/t1/details');
      const response = await GET(req, {
        params: Promise.resolve({ id: 't1' }),
      });

      expect(response.status).toBe(404);
      const json = await response.json();
      expect(json.error).toBe('Team not found');
    });

    it('returns 404 if team is not APPROVED', async () => {
      vi.mocked(prisma.team.findUnique).mockResolvedValueOnce({
        id: 't1',
        status: 'PENDING',
      } as any);

      const req = new Request('http://localhost/api/teams/t1/details');
      const response = await GET(req, {
        params: Promise.resolve({ id: 't1' }),
      });

      expect(response.status).toBe(404);
      const json = await response.json();
      expect(json.error).toBe('Team not found or not approved');
    });

    it('returns team data successfully if APPROVED', async () => {
      const mockTeam = {
        id: 't1',
        name: 'UC96 Team',
        status: 'APPROVED',
        players: [],
        matchResults: [],
      };

      vi.mocked(prisma.team.findUnique).mockResolvedValueOnce(mockTeam as any);

      const req = new Request('http://localhost/api/teams/t1/details');
      const response = await GET(req, {
        params: Promise.resolve({ id: 't1' }),
      });

      expect(response.status).toBe(200);
      const json = await response.json();
      expect(json).toEqual(mockTeam);
    });
  });
});
