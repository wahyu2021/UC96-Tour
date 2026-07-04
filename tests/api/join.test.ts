import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from '@/app/api/player/tournaments/join/route';
import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';

// Mock dependencies
vi.mock('next-auth', () => ({
  getServerSession: vi.fn(),
}));

vi.mock('@/lib/db', () => ({
  prisma: {
    team: { findFirst: vi.fn() },
    tournament: { findUnique: vi.fn() },
    tournamentRegistration: { create: vi.fn() },
  },
}));

const mockSession = {
  user: { id: 'user-1', name: 'User 1', role: 'USER' },
};

describe('POST /api/player/tournaments/join', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return 401 if user is not logged in', async () => {
    vi.mocked(getServerSession).mockResolvedValueOnce(null);

    const request = new Request('http://localhost/api/player/tournaments/join', {
      method: 'POST',
      body: JSON.stringify({ tournamentId: 'tour-1' }),
    });

    const response = await POST(request);
    expect(response.status).toBe(401);
  });

  it('should return 404 if captain has no team profile', async () => {
    vi.mocked(getServerSession).mockResolvedValueOnce(mockSession);
    vi.mocked(prisma.team.findFirst).mockResolvedValueOnce(null);

    const request = new Request('http://localhost/api/player/tournaments/join', {
      method: 'POST',
      body: JSON.stringify({ tournamentId: 'tour-1' }),
    });

    const response = await POST(request);
    expect(response.status).toBe(404);
    const data = await response.json();
    expect(data.error).toContain('belum membuat profil tim');
  });

  it('should return 400 if team has no logo', async () => {
    vi.mocked(getServerSession).mockResolvedValueOnce(mockSession);
    vi.mocked(prisma.team.findFirst).mockResolvedValueOnce({
      id: 'team-1',
      logoUrl: null,
      players: [{}, {}, {}, {}],
      registrations: [],
    } as any);

    const request = new Request('http://localhost/api/player/tournaments/join', {
      method: 'POST',
      body: JSON.stringify({ tournamentId: 'tour-1' }),
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toContain('belum memiliki logo');
  });

  it('should return 201 on successful registration', async () => {
    vi.mocked(getServerSession).mockResolvedValueOnce(mockSession);
    vi.mocked(prisma.team.findFirst).mockResolvedValueOnce({
      id: 'team-1',
      logoUrl: 'logo.png',
      players: [{}, {}, {}, {}],
      registrations: [],
    } as any);

    vi.mocked(prisma.tournament.findUnique).mockResolvedValueOnce({
      id: 'tour-1',
      status: 'ONGOING',
      endDate: new Date('2099-01-01'),
      maxSlots: 32,
      _count: { registrations: 0 },
    } as any);

    vi.mocked(prisma.tournamentRegistration.create).mockResolvedValueOnce({
      id: 'reg-1',
      teamId: 'team-1',
      tournamentId: 'tour-1',
      status: 'PENDING',
    } as any);

    const request = new Request('http://localhost/api/player/tournaments/join', {
      method: 'POST',
      body: JSON.stringify({ tournamentId: 'tour-1' }),
    });

    const response = await POST(request);
    expect(response.status).toBe(201);
  });
});
