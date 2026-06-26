# Implementation Plan: Manajemen Turnamen & Relasi Tim

## Phase 1: Modifikasi Skema Database

- [ ] Task: Tambahkan model `Tournament` ke `schema.prisma` dengan _fields_ `name`, `description`, `startDate`, `endDate`, `maxSlots`, dan `prizePool`.
- [ ] Task: Tambahkan relasi `tournamentId` ke model `Team`.
- [ ] Task: Jalankan push Prisma dan perbaiki tipe data Prisma Client.
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Modifikasi Skema Database'

## Phase 2: API Manajemen Turnamen & Validasi

- [ ] Task: Buat endpoint `GET`, `POST`, `PATCH`, `DELETE` di `/api/admin/tournaments` dengan proteksi peran Admin.
- [ ] Task: Perbarui endpoint `/api/register` untuk memvalidasi `tournamentId` dan menolak pendaftaran jika `maxSlots` sudah penuh atau turnamen ditutup.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: API Manajemen Turnamen & Validasi'

## Phase 3: UI Dasbor Admin (Turnamen)

- [ ] Task: Tambahkan link "Turnamen" di Sidebar Admin.
- [ ] Task: Buat halaman `/admin/tournaments` beserta tabel data.
- [ ] Task: Buat _Modal Form_ untuk Tambah/Edit Turnamen.
- [ ] Task: Perbarui Dasbor Tim (`/admin`) agar memuat kolom Turnamen.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: UI Dasbor Admin (Turnamen)'

## Phase 4: Pembaruan Form Registrasi Publik

- [ ] Task: Modifikasi form di `/register` agar menarik daftar turnamen aktif dari API dan mewajibkan pengguna memilih turnamen sebelum mendaftar.
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Pembaruan Form Registrasi Publik'
