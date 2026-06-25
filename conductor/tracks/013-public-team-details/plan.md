# Implementation Plan: Halaman Detail Tim Publik

## Phase 1: Data Fetching API

- [ ] Task: Buat endpoint publik untuk data detail tim
  - [ ] Sub-task: Buat route `GET /api/teams/[id]/details`.
  - [ ] Sub-task: Implementasi fungsi Prisma untuk mengambil data `Team` beserta relasi `players` dan `scores` (beserta data `match`).
- [ ] Task: Conductor - User Manual Verification 'API Detail Tim' (Protocol in workflow.md)

## Phase 2: Frontend UI Detail Tim

- [ ] Task: Buat Server Component `src/app/teams/[id]/page.tsx`
  - [ ] Sub-task: Ambil data tim, roster pemain, dan riwayat skor.
- [ ] Task: Desain Antarmuka (UI)
  - [ ] Sub-task: Buat Hero/Header profil tim dengan informasi nama, logo, dan asal tim.
  - [ ] Sub-task: Buat grid/kartu daftar anggota tim (Roster) menggunakan desain modern.
  - [ ] Sub-task: Buat tabel responsif berkelas untuk merangkum riwayat pertandingan beserta skornya.
- [ ] Task: Integrasi Navigasi Publik
  - [ ] Sub-task: Tambahkan _link_ pada teks/logo komponen `LeaderboardTable` agar mengarah ke halaman profil tim.
  - [ ] Sub-task: Tambahkan _link_ pada komponen _Team Card_ di halaman utama `/teams`.
- [ ] Task: Conductor - User Manual Verification 'UI Detail Tim' (Protocol in workflow.md)

## Phase 3: Automated Testing

- [ ] Task: Buat Unit/Integration Tests
  - [ ] Sub-task: Buat pengujian untuk komponen halaman tim.
  - [ ] Sub-task: Pastikan perubahan di `LeaderboardTable` di-tes dengan benar.
  - [ ] Sub-task: Pastikan semua tes berjalan lulus dengan `npm run test`.
- [ ] Task: Conductor - User Manual Verification 'Pengujian Detail Tim' (Protocol in workflow.md)
