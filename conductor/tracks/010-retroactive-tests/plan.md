# Implementation Plan: Retroactive Automated Tests

## Phase 1: Setup & Folder Restructuring

- [x] Task: Konfigurasi Organisasi Folder
  - [x] Sub-task: Buat direktori utama `tests/` (terdiri dari sub-folder `api/`, `components/`, `app/`).
  - [x] Sub-task: Pindahkan file `*.test.tsx` yang sudah berserakan (seperti `Navbar`, `Button`, `ThemeToggle`) ke dalam folder `tests/` dan perbarui _import paths_-nya.
  - [x] Sub-task: Pastikan `npm run test` tetap berjalan sukses pasca-restrukturisasi.
- [x] Task: Conductor - User Manual Verification 'Setup' (Protocol in workflow.md)

## Phase 2: Pengujian API / Backend

- [x] Task: Buat Test Suite untuk Endpoint API
  - [x] Sub-task: Tulis test untuk `/api/admin/matches` (termasuk penanganan Zod, pengecekan otorisasi admin).
  - [x] Sub-task: Tulis test untuk API Tim dan Turnamen (termasuk _edge case_ data kosong).
- [x] Task: Conductor - User Manual Verification 'Backend' (Protocol in workflow.md)

## Phase 3: Pengujian UI / Frontend

- [ ] Task: Buat Test Suite untuk Komponen & Halaman
  - [ ] Sub-task: Tulis test untuk UI Publik: Form Registrasi Tim, Halaman Jadwal (`/schedule`), dan Daftar Tim (`/teams`).
  - [ ] Sub-task: Tulis test untuk UI Admin: `MatchFormModal` dan `MatchTable` (simulasi klik tombol 'Live'/'Selesai').
- [ ] Task: Conductor - User Manual Verification 'Frontend' (Protocol in workflow.md)

## Phase 4: Automated Testing & Validasi

- [ ] Task: Final Test Run & Refinements
  - [ ] Sub-task: Jalankan keseluruhan paket tes untuk memastikan sistem tidak regresi.
  - [ ] Sub-task: Pastikan semua _edge case_ tertangani tanpa memunculkan error atau peringatan _memory-leak_ di konsol.
- [ ] Task: Conductor - User Manual Verification 'Pengujian' (Protocol in workflow.md)
