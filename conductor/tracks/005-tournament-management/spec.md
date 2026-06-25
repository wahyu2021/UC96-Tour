# Specification: Manajemen Turnamen (Admin Panel) & Relasi Tim

## Overview

Fitur ini memberikan kontrol penuh kepada Admin untuk mengelola entitas "Turnamen". Selain itu, sistem pendaftaran tim akan dimodifikasi agar setiap tim wajib mendaftar pada turnamen tertentu.

## Functional Requirements

1. **Manajemen Turnamen (CRUD)**
   - Admin dapat membuat turnamen dengan detail: Nama, Deskripsi, Tanggal Mulai, Tanggal Selesai, Batas Slot Tim, dan Prize Pool.
   - Status turnamen akan dihitung **Otomatis** (misal: Akan Datang, Sedang Berjalan, Selesai) berdasarkan tanggal.
2. **Relasi Tim dan Turnamen**
   - Mengubah skema database agar tabel `Team` wajib terhubung (`tournamentId`) ke tabel `Tournament`.
   - Tim hanya bisa mendaftar jika turnamen masih menerima peserta dan slot belum penuh.
3. **UI Dasbor Admin**
   - Halaman `/admin/tournaments` menampilkan tabel daftar turnamen.
   - Modal Form untuk Tambah/Edit Turnamen.
   - Tabel Tim (di `/admin`) akan dimodifikasi untuk memfilter/menampilkan nama turnamen.

## Acceptance Criteria

- Admin bisa menambah turnamen tanpa error.
- Status turnamen dinamis sesuai tanggal server.
- Validasi slot maksimal pada saat tim mendaftar.
