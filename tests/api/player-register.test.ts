/* eslint-disable @typescript-eslint/no-explicit-any */
import { POST } from '@/app/api/player/register/route';
import { prisma } from '@/lib/db';
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('next-auth', () => ({
  getServerSession: vi.fn(),
}));

import { getServerSession } from 'next-auth';

vi.mock('@/lib/db', () => ({
  prisma: {
    team: {
      findFirst: vi.fn(),
      create: vi.fn(),
    },
    tournament: {
      findUnique: vi.fn(),
    },
    player: {
      findMany: vi.fn(),
    },
  },
}));

describe('Player 1-Click Register API (/api/player/register)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns 401 if unauthorized', async () => {
    vi.mocked(getServerSession).mockResolvedValueOnce(null);

    const req = new Request('http://localhost', {
      method: 'POST',
      body: JSON.stringify({ tournamentId: 't1', masterTeamId: 'm1' }),
    });

    const response = await POST(req);
    expect(response.status).toBe(401);
  });

  it('returns 404 if master team not found', async () => {
    vi.mocked(getServerSession).mockResolvedValueOnce({
      user: { id: 'u1' },
    } as any);
    vi.mocked(prisma.team.findFirst).mockResolvedValueOnce(null); // Master team not found

    const req = new Request('http://localhost', {
      method: 'POST',
      body: JSON.stringify({ tournamentId: 't1', masterTeamId: 'm1' }),
    });

    const response = await POST(req);
    expect(response.status).toBe(404);
  });

  it('registers successfully and clones team to PENDING', async () => {
    vi.mocked(getServerSession).mockResolvedValueOnce({
      user: { id: 'u1' },
    } as any);

    // Master Team exists
    vi.mocked(prisma.team.findFirst).mockResolvedValueOnce({
      id: 'm1',
      name: 'Team A',
      tag: 'TMA',
      ownerId: 'u1',
      players: [{ ign: 'P1', inGameId: '123' }],
    } as any);

    // Tournament exists and has slots
    vi.mocked(prisma.tournament.findUnique).mockResolvedValueOnce({
      id: 't1',
      status: 'ONGOING',
      endDate: new Date(Date.now() + 100000),
      maxSlots: 16,
      _count: { teams: 0 },
    } as any);

    // No existing registration for this team
    vi.mocked(prisma.team.findFirst).mockResolvedValueOnce(null);
    // No players already registered in other teams
    vi.mocked(prisma.player.findMany).mockResolvedValueOnce([]);

    // Create success
    vi.mocked(prisma.team.create).mockResolvedValueOnce({
      id: 'new_team',
      name: 'Team A',
      status: 'PENDING',
    } as any);

    const req = new Request('http://localhost', {
      method: 'POST',
      body: JSON.stringify({ tournamentId: 't1', masterTeamId: 'm1' }),
    });

    const response = await POST(req);
    expect(response.status).toBe(201);
    const data = await response.json();
    expect(data.team.status).toBe('PENDING'); // Ensure waiting list logic applies
  });
});
