import { z } from 'zod';

export const playerSchema = z.object({
  ign: z
    .string()
    .min(2, 'IGN minimal 2 karakter')
    .max(30, 'IGN maksimal 30 karakter'),
  inGameId: z
    .string()
    .min(5, 'In-Game ID minimal 5 karakter')
    .max(20, 'In-Game ID maksimal 20 karakter'),
});

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
    .length(
      4,
      'Sebuah tim harus mendaftarkan tepat 4 pemain (1 Kapten, 3 Anggota)'
    ),
});

export type TeamRegistrationInput = z.infer<typeof teamRegistrationSchema>;
