# 🎼 Conductor Plan: UC96 PUBG Tournament Website

## 1. Overview Proyek

Proyek ini bertujuan untuk membangun platform manajemen turnamen PUBG Steam untuk Unit Combat 96 (UC96). Platform ini akan memiliki antarmuka publik untuk pengunjung (Jadwal, Klasemen, Info Turnamen) dan _dashboard_ admin untuk manajemen pertandingan dan pendaftaran.

## 2. Tech Stack (Opsi A - VPS Optimized)

- **Framework Utama:** Next.js (App Router)
- **Styling:** Tailwind CSS + `next-themes` (Mendukung Dark Mode & Light Mode)
- **Database ORM:** Prisma
- **Database Engine:** MySQL / PostgreSQL (Memanfaatkan database yang sudah ada di VPS)
- **Authentication:** NextAuth.js (Untuk keamanan login admin)
- **Deployment:** Node.js _Standalone Build_ di atas VPS (2 vCore, 2GB RAM, 4GB Swap), direkomendasikan menggunakan PM2.

## 3. Fitur Utama

1. **Sistem Tema:** Dukungan penuh untuk pergantian tema _Dark Mode_ dan _Light Mode_.
2. **Landing Page:** Informasi pendaftaran, hitung mundur (countdown), dan _prizepool_.
3. **Pendaftaran Tim:** Form registrasi untuk tim, logo tim, dan pemain (In-Game Name & Steam ID).
4. **Leaderboard:** Klasemen turnamen yang dinamis (menampilkan Poin Kill, Poin Placement, dan WWCD).
5. **Admin Dashboard:** Panel aman untuk panitia UC96 mengelola persetujuan (_approval_) tim dan input skor tiap _match_.

## 4. Fase Pengerjaan (Milestones)

- **Fase 1:** Inisialisasi Proyek & Dokumentasi (Pembuatan `DESIGN.md` & `CONDUCTOR_PLAN.md`) 🟢 _Selesai_
- **Fase 2:** Setup Next.js, instalasi Tailwind CSS, dan inisialisasi Prisma.
- **Fase 3:** Pembuatan UI/UX Komponen Dasar (Navbar, Footer, sistem tema Gelap/Terang).
- **Fase 4:** Pembuatan Halaman Publik (Landing Page, Form Registrasi, Tabel Leaderboard).
- **Fase 5:** Pembuatan Admin Dashboard & Konfigurasi API Database.
- **Fase 6:** Pengujian Keseluruhan & Proses _Deployment_ (Rilis) ke VPS.

## 5. Catatan Arsitektur (Memori Server)

Sistem Next.js ini dirancang dengan mempertimbangkan efisiensi memori pada VPS. Saat tidak ada _traffic_ (idle), proses Next.js akan memanfaatkan _Swap_ (4GB) secara otomatis oleh kernel Linux, sehingga RAM fisik 2GB tetap terjaga lega untuk prioritas aplikasi lain (Laravel & Express) yang Anda miliki.
