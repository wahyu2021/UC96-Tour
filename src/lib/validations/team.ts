import { z } from 'zod';

export const playerSchema = z.object({
  id: z.string().optional(),
  ign: z.string().min(2, 'ID PUBG minimal 2 karakter'),
  inGameId: z.string().min(2, 'ID Discord minimal 2 karakter'),
});

export const masterTeamSchema = z.object({
  name: z.string().min(3, 'Nama tim minimal 3 karakter'),
  tag: z.string().min(1, 'Tag wajib diisi'),
  logoUrl: z.string().url('Logo harus berupa URL yang valid'),
  players: z
    .array(playerSchema)
    .min(4, 'Minimal 4 pemain')
    .max(5, 'Maksimal 5 pemain'),
});

// Alias for updates
export const updateTeamSchema = masterTeamSchema;

export const teamRegistrationSchema = z.object({
  name: z
    .string()
    .min(3, 'Nama Tim minimal 3 karakter')
    .max(50, 'Nama Tim maksimal 50 karakter'),
  tag: z
    .string()
    .min(2, 'Tag Tim minimal 2 karakter')
    .max(10, 'Tag Tim maksimal 10 karakter'),
  tournamentId: z.string().min(1, 'Turnamen harus dipilih'),
  logoUrl: z.string().url('URL logo tidak valid').optional().or(z.literal('')),
  players: z
    .array(playerSchema)
    .min(4, 'Minimal 4 pemain inti (1 Kapten, 3 Anggota)')
    .max(5, 'Maksimal 5 pemain (termasuk 1 Cadangan)'),
});

export type PlayerInput = z.infer<typeof playerSchema>;
export type MasterTeamInput = z.infer<typeof masterTeamSchema>;
export type TeamRegistrationInput = z.infer<typeof teamRegistrationSchema>;
