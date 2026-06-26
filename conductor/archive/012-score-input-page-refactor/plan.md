# Implementation Plan: Score Input Page Refactor & Dynamic Scoring System

## Phase 1: Database & Backend (Dynamic Scoring)

- [x] Task: Update Prisma Schema
  - [x] Sub-task: Tambahkan model `ScoringConfig` (Rank, Placement Points).
  - [x] Sub-task: Jalankan `prisma db push`.
- [x] Task: Buat API Endpoint Scoring Configuration
  - [x] Sub-task: Buat `GET /api/admin/scoring-rules` untuk mengambil aturan poin.
  - [x] Sub-task: Buat `PUT /api/admin/scoring-rules` untuk memperbarui aturan poin.
  - [x] Sub-task: Buat `POST /api/admin/scoring-rules/reset` untuk mengembalikan ke aturan PUBG standar.
- [x] Task: Update Fungsi Utility Scoring
  - [x] Sub-task: Modifikasi `src/lib/scoring.ts` agar mengambil parameter referensi poin (tidak di-hardcode lagi).
- [x] Task: Conductor - User Manual Verification 'Backend' (Protocol in workflow.md)

## Phase 2: Refactor UI Input Skor

- [x] Task: Buat Halaman Input Skor Baru
  - [x] Sub-task: Buat halaman `src/app/admin/matches/[id]/scores/page.tsx` yang secara otomatis mengambil data seluruh tim di dalam turnamen terkait.
  - [x] Sub-task: Buat komponen UI tabel _input_ skor interaktif yang menghitung total poin langsung berdasarkan referensi data `ScoringConfig`.
  - [x] Sub-task: Terapkan peringatan validasi jika ada kolom skor yang kosong sebelum di-"Simpan Semua".
- [x] Task: Integrasi Ulang Match Table & Cleanup
  - [x] Sub-task: Ubah navigasi tombol "Input Skor" di `MatchTable.tsx` agar menuju halaman `/admin/matches/[id]/scores`.
  - [x] Sub-task: Hapus file `ScoreInputModal.tsx` secara keseluruhan karena sudah tidak dipakai.
- [x] Task: Conductor - User Manual Verification 'Input Skor UI' (Protocol in workflow.md)

## Phase 3: UI Konfigurasi Scoring (Admin)

- [x] Task: Buat Halaman Pengaturan Poin
  - [x] Sub-task: Tambahkan menu _link_ "Pengaturan Poin" di _Sidebar_ admin.
  - [x] Sub-task: Buat halaman antarmuka `/admin/scoring-rules/page.tsx`.
  - [x] Sub-task: Implementasikan _form_/tabel edit poin untuk setiap peringkat, beserta tombol aksi "Reset to PUBG Global Rules".
- [x] Task: Conductor - User Manual Verification 'Admin UI' (Protocol in workflow.md)

## Phase 4: Automated Testing

- [x] Task: Update & Tulis Test Suite
  - [x] Sub-task: Sesuaikan `scoring.test.ts` untuk mengakomodasi aturan dinamis.
  - [x] Sub-task: Hapus/perbarui komponen _test_ terkait `ScoreInputModal` dan `MatchTable`.
  - [x] Sub-task: Tambahkan _test_ baru untuk memastikan halaman `Scoring Rules` dan halaman `Input Skor` bekerja sebagaimana mestinya.
  - [x] Sub-task: Jalankan `npm run test`.
- [x] Task: Conductor - User Manual Verification 'Pengujian' (Protocol in workflow.md)
