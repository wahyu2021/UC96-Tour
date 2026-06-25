# Track Specification: Pendaftaran Tim & Pemain

## Overview

Track ini berfokus pada pembuatan antarmuka (UI) dan _backend_ (API) untuk pendaftaran turnamen UC96. Sistem akan memproses data tim dan pemain, **mengunggah logo tim langsung ke memori lokal server (VPS)**, dan menyimpannya ke MySQL dengan status awal _Pending_.

## Functional Requirements

- **Data Tim & Pemain:** Mengumpulkan Nama Tim, Logo Tim, serta data 4 pemain (1 Kapten dan 3 Anggota yang mencakup _In-Game Name_ & _In-Game ID_).
- **Upload Logo (Lokal):** Membuat fungsi API khusus di Next.js untuk menerima file gambar dan menyimpannya secara fisik di dalam direktori `public/uploads` pada server VPS.
- **Penyimpanan Database:** Melakukan penyimpanan data relasional (Tim & Pemain) sekaligus melalui Prisma.
- **Status Awal:** Semua tim baru otomatis berstatus `PENDING` (menunggu _approval_ panitia).

## Non-Functional Requirements (UX & Code Quality)

- **Multi-step Form:** Formulir dibagi ke dalam langkah logis (Step 1: Info Tim, Step 2: Info Pemain) agar lebih ramah pengguna.
- **Validasi _Real-time_:** Menggunakan `Zod` dan `React Hook Form` untuk mencegah input kosong dan memastikan format _upload_ gambar valid (.jpg, .png).
- **Notifikasi (_Toast_):** Menampilkan _pop-up_ yang modern jika pendaftaran berhasil atau gagal.
- **Pengujian (_Testing_):** Formulir pendaftaran harus dilindungi oleh file pengujian dasar (Vitest).

## Acceptance Criteria

- [ ] Formulir _multi-step_ berfungsi penuh di halaman `/register`.
- [ ] Fitur _upload_ gambar sukses menyimpan file fisik ke folder `public/uploads`.
- [ ] Setelah _submit_, data berhasil tersimpan relasional ke _database_ MySQL.
- [ ] Pengguna menerima peringatan _error_ otomatis jika _form_ tidak valid, atau pesan sukses jika berhasil.
