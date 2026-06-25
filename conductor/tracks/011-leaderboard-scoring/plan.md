# Implementation Plan: Sistem Scoring & Leaderboard Dinamis

## Phase 1: Setup & Database Schema

- [ ] Task: Update Prisma Schema
  - [ ] Sub-task: Buat model `MatchScore` (ID, Match ID, Team ID, Kills, Placement, PlacementPoints, TotalPoints).
  - [ ] Sub-task: Jalankan `prisma db push` atau `prisma migrate dev` untuk memperbarui database.
- [ ] Task: Conductor - User Manual Verification 'Setup & Database' (Protocol in workflow.md)

## Phase 2: Pengembangan API / Backend

- [ ] Task: Buat Endpoint Kalkulasi Skor Otomatis
  - [ ] Sub-task: Buat fungsi _utility_ untuk pemetaan regulasi poin PUBG (misal: Rank 1 = 10 pts, Rank 2 = 6 pts, dst).
  - [ ] Sub-task: Buat API `POST /api/admin/matches/[id]/scores` yang menerima input { rank, kills } dan menghitung total poin secara otomatis di server.
  - [ ] Sub-task: Buat API `GET /api/leaderboard` untuk agregasi skor.
- [ ] Task: Conductor - User Manual Verification 'Backend' (Protocol in workflow.md)

## Phase 3: Pengembangan UI / Frontend

- [ ] Task: Bangun Form Input Skor Pintar (Admin Panel)
  - [ ] Sub-task: Buat halaman/modal input skor dengan _dropdown_ pilihan peringkat (Rank 1, 2, dst) dan kolom input _Kills_.
  - [ ] Sub-task: Tampilkan _preview_ perhitungan skor secara otomatis (Auto-calculated) sesaat sebelum Admin menekan tombol Simpan.
- [ ] Task: Bangun UI Leaderboard (Publik)
  - [ ] Sub-task: Buat halaman `/leaderboard` dengan tabel klasemen.
  - [ ] Sub-task: Terapkan _sorting_ otomatis berdasarkan Total Poin tertinggi.
- [ ] Task: Conductor - User Manual Verification 'Frontend' (Protocol in workflow.md)

## Phase 4: Automated Testing & Validasi

- [ ] Task: Buat Test Suite (Testing Library & Vitest)
  - [ ] Sub-task: Tulis API Test untuk kalkulasi poin otomatis.
  - [ ] Sub-task: Tulis Component Test untuk UI Input Skor dan Leaderboard.
  - [ ] Sub-task: Jalankan `npm run test`.
- [ ] Task: Conductor - User Manual Verification 'Pengujian' (Protocol in workflow.md)
