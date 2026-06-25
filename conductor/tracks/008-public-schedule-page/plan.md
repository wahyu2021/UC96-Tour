# Implementation Plan: Halaman Jadwal Pertandingan Publik (/schedule)

## Phase 1: Pengambilan Data (Server & Database)

- [ ] Task: Buat fungsi `getPublicMatches` (contoh: di `src/lib/api/matches.ts`).
  - [ ] Sub-task: Konfigurasi pengambilan data tabel `Match` dari Prisma.
  - [ ] Sub-task: Implementasikan logika filter berdasarkan tanggal (`scheduledAt`).
  - [ ] Sub-task: Terapkan pengurutan (_sorting_) berdasarkan waktu terdekat (ASC).

## Phase 2: Konstruksi Komponen Visual (UI)

- [ ] Task: Buat komponen `MatchCard.tsx`.
  - [ ] Sub-task: Rakit tata letak (_layout_) untuk menampilkan Map, Waktu, dan Grup.
  - [ ] Sub-task: Buat lencana (_badge_) beranimasi _pulse_ merah untuk status `ONGOING` (Live Indicator).
  - [ ] Sub-task: Buat pengkondisian agar label Grup hanya muncul bila diisi.
- [ ] Task: Buat komponen navigasi `DateFilter.tsx`.
  - [ ] Sub-task: Desain deretan tombol hari/tanggal (_tabs_).
  - [ ] Sub-task: Sinkronisasikan pilihan tanggal dengan parameter URL `?date=...` menggunakan `useRouter`.

## Phase 3: Perakitan Halaman Publik (/schedule)

- [ ] Task: Siapkan _Server Component_ rute `src/app/schedule/page.tsx`.
  - [ ] Sub-task: Tangkap _search parameters_ dari Next.js Router.
  - [ ] Sub-task: Berikan data parameter ke fungsi pemanggil basis data.
  - [ ] Sub-task: Gabungkan komponen `DateFilter` dan daftar `MatchCard` menjadi satu halaman responsif.

## Phase 4: Pengujian (_Testing & Verification_)

- [ ] Task: Uji kesesuaian fungsional dan estetika.
  - [ ] Sub-task: Pastikan transisi antar-tanggal bekerja tanpa memuat ulang seluruh halaman dengan kasar.
  - [ ] Sub-task: Evaluasi animasi _Live Indicator_ apakah terlihat jelas dan memukau sesuai standar _premium_.
- [ ] Task: Conductor - User Manual Verification 'Pengujian' (Protocol in workflow.md)
