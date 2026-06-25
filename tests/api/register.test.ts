/* eslint-disable @typescript-eslint/no-explicit-any */
import { POST } from '@/app/api/register/route';
import { prisma } from '@/lib/db';
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@/lib/db', () => ({
  prisma: {
    tournament: {
      findUnique: vi.fn(),
    },
    team: {
      findFirst: vi.fn(),
      create: vi.fn(),
    },
    player: {
      findMany: vi.fn(),
    },
  },
}));

describe('Register API (/api/register)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns 400 for invalid validation', async () => {
    const req = new Request('http://localhost', {
      method: 'POST',
      body: JSON.stringify({ name: '' }), // Invalid data
    });

    const response = await POST(req);
    expect(response.status).toBe(400);
  });

  it('returns 404 if tournament not found', async () => {
    const mockData = {
      name: 'Team A',
      tag: 'TMA',
      tournamentId: 't1',
      players: [
        { ign: 'P1', inGameId: '12345' },
        { ign: 'P2', inGameId: '12346' },
        { ign: 'P3', inGameId: '12347' },
        { ign: 'P4', inGameId: '12348' },
      ],
    };

    vi.mocked(prisma.tournament.findUnique).mockResolvedValueOnce(null);

    const req = new Request('http://localhost', {
      method: 'POST',
      body: JSON.stringify(mockData),
    });

    const response = await POST(req);
    expect(response.status).toBe(404);
  });

  it('registers team successfully', async () => {
    const mockData = {
      name: 'Team A',
      tag: 'TMA',
      tournamentId: 't1',
      players: [
        { ign: 'P1', inGameId: '12345' },
        { ign: 'P2', inGameId: '12346' },
        { ign: 'P3', inGameId: '12347' },
        { ign: 'P4', inGameId: '12348' },
      ],
    };

    vi.mocked(prisma.tournament.findUnique).mockResolvedValueOnce({
      id: 't1',
      status: 'ONGOING',
      endDate: new Date(Date.now() + 100000),
      maxSlots: 16,
      _count: { teams: 0 },
    } as any);

    vi.mocked(prisma.team.findFirst).mockResolvedValueOnce(null);
    vi.mocked(prisma.player.findMany).mockResolvedValueOnce([]);
    vi.mocked(prisma.team.create).mockResolvedValueOnce({
      id: 't1',
      name: 'Team A',
    } as any);

    const req = new Request('http://localhost', {
      method: 'POST',
      body: JSON.stringify(mockData),
    });

    const response = await POST(req);
    expect(response.status).toBe(201);
  });
});
