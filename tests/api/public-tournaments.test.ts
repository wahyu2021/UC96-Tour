import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET as getTournaments } from '@/app/api/tournaments/route';
import { GET as getTournamentDetail } from '@/app/api/tournaments/[id]/route';
import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

// Mock Prisma
vi.mock('@/lib/db', () => ({
  prisma: {
    tournament: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
    },
  },
}));

describe('Public Tournaments API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('GET /api/tournaments - should return list of tournaments with dynamic status', async () => {
    const mockTournaments = [
      {
        id: '1',
        name: 'UC96 Cup',
        status: 'ONGOING',
        startDate: new Date(Date.now() - 10000), // Past
        endDate: new Date(Date.now() + 100000), // Future
        _count: { teams: 16 },
      },
    ];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (prisma.tournament.findMany as any).mockResolvedValue(mockTournaments);

    const response = await getTournaments();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.length).toBe(1);
    expect(data[0].dynamicStatus).toBe('ONGOING');
  });

  it('GET /api/tournaments/[id] - should return detail of a tournament', async () => {
    const mockTournament = {
      id: '1',
      name: 'UC96 Cup',
      status: 'ONGOING',
      startDate: new Date(Date.now() - 10000),
      endDate: new Date(Date.now() + 100000),
      registrations: [{ team: { id: 't1', name: 'Evos', players: [] } }],
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (prisma.tournament.findUnique as any).mockResolvedValue(mockTournament);

    const request = new Request('http://localhost:3000/api/tournaments/1');
    const params = Promise.resolve({ id: '1' });

    const response = await getTournamentDetail(request, { params });
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.name).toBe('UC96 Cup');
    expect(data.teams.length).toBe(1);
  });
});
