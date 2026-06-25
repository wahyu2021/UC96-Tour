# Implementation Plan: Score Input Page Refactor & Dynamic Scoring System

## Phase 1: Database & Backend (Dynamic Scoring)

- [ ] Task: Update Prisma Schema
  - [ ] Sub-task: Tambahkan model `ScoringConfig` (Rank, Placement Points).
  - [ ] Sub-task: Jalankan `prisma db push`.
- [ ] Task: Buat API Endpoint Scoring Configuration
  - [ ] Sub-task: Buat `GET /api/admin/scoring-rules` untuk mengambil aturan poin.
  - [ ] Sub-task: Buat `PUT /api/admin/scoring-rules` untuk memperbarui aturan poin.
  - [ ] Sub-task: Buat `POST /api/admin/scoring-rules/reset` untuk mengembalikan ke aturan PUBG standar.
- [ ] Task: Update Fungsi Utility Scoring
  - [ ] Sub-task: Modifikasi `src/lib/scoring.ts` agar mengambil parameter referensi poin (tidak di-hardcode lagi).
- [ ] Task: Conductor - User Manual Verification 'Backend' (Protocol in workflow.md)

## Phase 2: Refactor UI Input Skor

- [ ] Task: Buat Halaman Input Skor Baru
  - [ ] Sub-task: Buat halaman `src/app/admin/matches/[id]/scores/page.tsx` yang secara otomatis mengambil data seluruh tim di dalam turnamen terkait.
  - [ ] Sub-task: Buat komponen UI tabel _input_ skor interaktif yang menghitung total poin langsung berdasarkan referensi data `ScoringConfig`.
  - [ ] Sub-task: Terapkan peringatan validasi jika ada kolom skor yang kosong sebelum di-"Simpan Semua".
- [ ] Task: Integrasi Ulang Match Table & Cleanup
  - [ ] Sub-task: Ubah navigasi tombol "Input Skor" di `MatchTable.tsx` agar menuju halaman `/admin/matches/[id]/scores`.
  - [ ] Sub-task: Hapus file `ScoreInputModal.tsx` secara keseluruhan karena sudah tidak dipakai.
- [ ] Task: Conductor - User Manual Verification 'Input Skor UI' (Protocol in workflow.md)

## Phase 3: UI Konfigurasi Scoring (Admin)

- [ ] Task: Buat Halaman Pengaturan Poin
  - [ ] Sub-task: Tambahkan menu _link_ "Pengaturan Poin" di _Sidebar_ admin.
  - [ ] Sub-task: Buat halaman antarmuka `/admin/scoring-rules/page.tsx`.
  - [ ] Sub-task: Implementasikan _form_/tabel edit poin untuk setiap peringkat, beserta tombol aksi "Reset to PUBG Global Rules".
- [ ] Task: Conductor - User Manual Verification 'Admin UI' (Protocol in workflow.md)

## Phase 4: Automated Testing

- [ ] Task: Update & Tulis Test Suite
  - [ ] Sub-task: Sesuaikan `scoring.test.ts` untuk mengakomodasi aturan dinamis.
  - [ ] Sub-task: Hapus/perbarui komponen _test_ terkait `ScoreInputModal` dan `MatchTable`.
  - [ ] Sub-task: Tambahkan _test_ baru untuk memastikan halaman `Scoring Rules` dan halaman `Input Skor` bekerja sebagaimana mestinya.
  - [ ] Sub-task: Jalankan `npm run test`.
- [ ] Task: Conductor - User Manual Verification 'Pengujian' (Protocol in workflow.md)
