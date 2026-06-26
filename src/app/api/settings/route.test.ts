import { expect, test, vi } from 'vitest';
import { GET } from './route';
import { prisma } from '@/lib/db';

vi.mock('@/lib/db', () => ({
  prisma: {
    appSetting: {
      findMany: vi.fn(),
    },
  },
}));

test('GET API Settings returns formatted dictionary', async () => {
  const mockSettings = [
    {
      key: 'about_vision',
      value: 'Visi Turnamen',
      description: '',
      id: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      key: 'contact_discord',
      value: 'discord.gg/abc',
      description: '',
      id: '2',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  vi.mocked(prisma.appSetting.findMany).mockResolvedValue(mockSettings);

  const response = await GET();
  const data = await response.json();

  expect(response.status).toBe(200);
  expect(data).toEqual({
    about_vision: 'Visi Turnamen',
    contact_discord: 'discord.gg/abc',
  });
});
