# Implementation Plan: Public Tournaments Page (Track 014)

## Phase 1: Setup & Database Schema

- [ ] Task: Update model `Tournament` di file `prisma/schema.prisma` untuk menambahkan kolom `bannerUrl String?`.
- [ ] Task: Jalankan `npx prisma db push` dan `npx prisma generate` untuk mengaplikasikan skema ke database lokal.
- [ ] Task: Conductor - User Manual Verification 'Setup Database' (Protocol in workflow.md)

## Phase 2: Pengembangan API & Backend

- [ ] Task: Perbarui logika API `GET /api/admin/tournaments` dan `POST /api/admin/tournaments` agar menyimpan dan mengembalikan `bannerUrl`.
- [ ] Task: Buat endpoint publik `GET /api/tournaments` untuk mengambil daftar turnamen publik.
- [ ] Task: Buat endpoint publik `GET /api/tournaments/[id]` untuk mengambil detail turnamen dan daftar tim yang berpartisipasi.
- [ ] Task: Conductor - User Manual Verification 'Backend API' (Protocol in workflow.md)

## Phase 3: Pengembangan UI / Frontend

- [ ] Task: Update `TournamentFormModal` di panel Admin agar memiliki fitur _upload/input URL_ gambar _banner_ turnamen.
- [ ] Task: Buat halaman `src/app/tournaments/page.tsx` untuk menampilkan daftar _card_ turnamen.
- [ ] Task: Buat halaman `src/app/tournaments/[id]/page.tsx` untuk menampilkan detail turnamen dan daftar timnya.
- [ ] Task: Tambahkan _link_ navigasi "Turnamen" di `Navbar` utama agar pengunjung bisa mengakses halamannya.
- [ ] Task: Conductor - User Manual Verification 'Frontend UI' (Protocol in workflow.md)

## Phase 4: Automated Testing & Validasi

- [ ] Task: Tulis _Unit Tests_ untuk endpoint `GET /api/tournaments` dan halaman UI barunya.
- [ ] Task: Jalankan `npm run test` untuk memastikan semua fungsi berjalan baik tanpa memutus fitur lain.
- [ ] Task: Conductor - User Manual Verification 'Pengujian Otomatis' (Protocol in workflow.md)
