import { z } from 'zod';

export const tournamentSchema = z.object({
  name: z.string().min(3, 'Nama turnamen minimal 3 karakter'),
  description: z.string().optional(),
  bannerUrl: z.string().min(1, 'Banner wajib diunggah'),
  backgroundUrl: z.string().optional(),
  startDate: z.string(),
  endDate: z.string(),
  maxSlots: z.number().int().min(2).default(32),
  prizePool: z.string().optional(),
});

export type TournamentInput = z.infer<typeof tournamentSchema>;

export const updateTournamentSchema = z.object({
  name: z.string().min(3).optional(),
  description: z.string().optional(),
  bannerUrl: z.string().min(1).optional(),
  backgroundUrl: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  maxSlots: z.number().int().min(2).optional(),
  prizePool: z.string().optional(),
  status: z.enum(['DRAFT', 'ONGOING', 'COMPLETED']).optional(),
});
