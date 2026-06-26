# Implementation Plan: Public Tournaments Page (Track 014)

## Phase 1: Setup & Database Schema

- [x] Task: Update model `Tournament` di file `prisma/schema.prisma` untuk menambahkan kolom `bannerUrl String?`.
- [x] Task: Jalankan `npx prisma db push` dan `npx prisma generate` untuk mengaplikasikan skema ke database lokal.
- [x] Task: Conductor - User Manual Verification 'Setup Database' (Protocol in workflow.md)

## Phase 2: Pengembangan API & Backend

- [x] Task: Perbarui logika API `GET /api/admin/tournaments` dan `POST /api/admin/tournaments` agar menyimpan dan mengembalikan `bannerUrl`.
- [x] Task: Buat endpoint publik `GET /api/tournaments` untuk mengambil daftar turnamen publik.
- [x] Task: Buat endpoint publik `GET /api/tournaments/[id]` untuk mengambil detail turnamen dan daftar tim yang berpartisipasi.
- [x] Task: Conductor - User Manual Verification 'Backend API' (Protocol in workflow.md)

## Phase 3: Pengembangan UI / Frontend

- [x] Task: Update `TournamentFormModal` di panel Admin agar memiliki fitur _upload/input URL_ gambar _banner_ turnamen.
- [x] Task: Buat halaman `src/app/tournaments/page.tsx` untuk menampilkan daftar _card_ turnamen.
- [x] Task: Buat halaman `src/app/tournaments/[id]/page.tsx` untuk menampilkan detail turnamen dan daftar timnya.
- [x] Task: Tambahkan _link_ navigasi "Turnamen" di `Navbar` utama agar pengunjung bisa mengakses halamannya.
- [x] Task: Conductor - User Manual Verification 'Frontend UI' (Protocol in workflow.md)

## Phase 4: Automated Testing & Validasi

- [x] Task: Tulis _Unit Tests_ untuk endpoint `GET /api/tournaments` dan halaman UI barunya.
- [x] Task: Jalankan `npm run test` untuk memastikan semua fungsi berjalan baik tanpa memutus fitur lain.
- [x] Task: Conductor - User Manual Verification 'Pengujian Otomatis' (Protocol in workflow.md)
