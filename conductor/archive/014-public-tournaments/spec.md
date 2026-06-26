# Specification: Public Tournaments Page (Track 014)

## 1. Overview

Menambahkan halaman publik khusus untuk menampilkan daftar turnamen yang diselenggarakan oleh UC96, dilengkapi dengan banner/poster grafis, serta interaksi untuk melihat detail turnamen dan daftar tim yang berpartisipasi.

## 2. Functional Requirements

- **Halaman Daftar Turnamen (`/tournaments`)**:
  - Menampilkan grid dari turnamen berdasarkan status (_Draft, Ongoing, Completed_).
  - Tiap _card_ turnamen menampilkan _Banner Image_, Status, Nama Turnamen, Tanggal, Kuota Slot, dan _Prize Pool_.
- **Halaman Detail Turnamen (`/tournaments/[id]`)**:
  - Menampilkan banner besar di bagian atas (_hero image_) beserta deskripsi lengkap turnamen.
  - Menampilkan daftar/klasemen tim yang berpartisipasi khusus pada turnamen tersebut.
- **Update Skema Database (Prisma)**:
  - Menambahkan kolom `bannerUrl` (String, opsional) pada model `Tournament` untuk mengakomodasi gambar banner.
- **Pembaruan Admin Panel**:
  - Menambahkan fitur unggah/input URL banner gambar pada formulir pembuatan & pengeditan Turnamen di panel Admin.

## 3. Non-Functional Requirements

- Desain _card_ dan halaman harus bernuansa premium, modern (sesuai _guideline aesthetics_ aplikasi web ini), menggunakan efek _glassmorphism_ dan animasi _hover_ yang dinamis.
- Harus responsif dan dimuat dengan cepat.

## 4. Out of Scope

- Pendaftaran turnamen terintegrasi langsung di halaman detail turnamen (Sistem pendaftaran tetap menggunakan alur pusat `/register` yang saat ini sudah berjalan).
