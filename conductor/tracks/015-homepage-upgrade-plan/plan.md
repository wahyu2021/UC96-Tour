# Implementation Plan: Homepage Upgrade Plan

## Phase 1: Setup & Data Fetching (Backend)

- [ ] Task: Buat fungsi pengambilan data (fetching) untuk halaman beranda
  - [ ] Buat fungsi untuk mengambil _Global Statistics_ (jumlah total Tournament, Team, dan Roster/Pemain) dari _database_ menggunakan Prisma.
  - [ ] Buat fungsi untuk mengambil 3-4 turnamen _Featured_ dengan status ONGOING atau DRAFT.
  - [ ] Buat fungsi untuk mengambil data klasemen (_Top 3/5 Teams_) dari turnamen terbaru yang aktif.
- [ ] Task: Conductor - User Manual Verification 'Phase 1' (Protocol in workflow.md)

## Phase 2: Pengembangan UI / Frontend (Komponen Visual)

- [ ] Task: Rombak `HeroSection.tsx`
  - [ ] Implementasikan _Cinematic Hero Banner_ menggunakan _background_ `default-bg.webp` dengan _dark gradient overlay_.
  - [ ] Perbarui tipografi agar lebih tegas (Esports style) dan perjelas tombol CTA.
- [ ] Task: Buat komponen `LiveStatistics.tsx`
  - [ ] Desain blok statistik responsif (3 grid) yang akan menampilkan data _Global Statistics_.
- [ ] Task: Buat komponen `FeaturedTournaments.tsx`
  - [ ] Implementasikan _layout_ horizontal (_carousel_ / _scroll-snap_) untuk menampilkan daftar turnamen yang ditarik dari _database_.
- [ ] Task: Buat komponen `MiniLeaderboard.tsx`
  - [ ] Desain antarmuka papan peringkat ringkas yang menampilkan 3-5 tim teratas beserta poin mereka.
- [ ] Task: Integrasi Halaman Beranda (`src/app/page.tsx`)
  - [ ] Rangkai seluruh komponen yang telah dibuat (`HeroSection`, `LiveStatistics`, `FeaturedTournaments`, `MiniLeaderboard`) secara berurutan ke dalam halaman utama.
- [ ] Task: Conductor - User Manual Verification 'Phase 2' (Protocol in workflow.md)

## Phase 3: Automated Testing & Validasi

- [ ] Task: Buat dan jalankan _automated test_
  - [ ] Buat file `__tests__/LiveStatistics.test.tsx` (atau sejenisnya) untuk memvalidasi komponen rendering data.
  - [ ] Eksekusi `npm run test` untuk memastikan semua modul berfungsi stabil.
- [ ] Task: Conductor - User Manual Verification 'Phase 3' (Protocol in workflow.md)
