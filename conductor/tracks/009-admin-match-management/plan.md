# Implementation Plan: Admin Match Management

## Phase 1: Setup & Database Schema

- [x] Task: Update Prisma Schema
  - [x] Sub-task: Tambahkan relasi `tournamentId` ke model `Match`.
  - [x] Sub-task: Jalankan `npx prisma db push` dan generate ulang client.
- [x] Task: Conductor - User Manual Verification 'Setup' (Protocol in workflow.md)

## Phase 2: Pengembangan API / Backend

- [x] Task: Buat API Endpoint `/api/admin/matches`
  - [x] Sub-task: Implementasi `GET` untuk mengambil daftar Match beserta nama Turnamennya.
  - [x] Sub-task: Implementasi `POST` untuk membuat jadwal Match baru (termasuk validasi Zod).
- [x] Task: Buat API Endpoint `/api/admin/matches/[id]`
  - [x] Sub-task: Implementasi `PATCH` untuk _override_ status Match menjadi "Live" atau "Selesai" secara manual.
  - [x] Sub-task: Implementasi `DELETE` untuk membatalkan/menghapus jadwal Match.
- [ ] Task: Conductor - User Manual Verification 'Backend' (Protocol in workflow.md)

## Phase 3: Pengembangan UI / Frontend

- [ ] Task: Buat Halaman Admin `/admin/matches`
  - [ ] Sub-task: Buat struktur halaman dasar dan tambahkan _link_ di Sidebar admin.
- [ ] Task: Buat Komponen Interaktif
  - [ ] Sub-task: Buat `MatchTable` untuk menampilkan data jadwal yang rapi.
  - [ ] Sub-task: Buat `MatchFormModal` (Dropdown turnamen cerdas, Input Tanggal, Jam, Map, Grup opsional).
  - [ ] Sub-task: Buat tombol aksi di tabel untuk Update Status Cepat & Hapus.
- [ ] Task: Integrasi API
  - [ ] Sub-task: Hubungkan UI form & tabel dengan API backend.
- [ ] Task: Conductor - User Manual Verification 'Frontend' (Protocol in workflow.md)

## Phase 4: Pengujian & Validasi

- [ ] Task: Verifikasi Fungsi Inti
  - [ ] Sub-task: Pastikan dropdown otomatis terpilih jika turnamen aktif hanya ada 1.
  - [ ] Sub-task: Cek sinkronisasi data jadwal yang dibuat di Admin Panel dengan yang tampil di `/schedule` publik.
- [ ] Task: Conductor - User Manual Verification 'Pengujian' (Protocol in workflow.md)
