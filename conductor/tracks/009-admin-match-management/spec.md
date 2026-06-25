# Specification: Admin Match Management

## 1. Overview

Fitur ini menambahkan antarmuka bagi panitia (Admin) di dalam Admin Panel untuk membuat, mengedit, dan menghapus jadwal pertandingan (Match) dari suatu turnamen.

## 2. Functional Requirements

- **Manajemen Jadwal**: Admin dapat membuat jadwal pertandingan baru dengan atribut: Turnamen Induk, Tanggal & Waktu, Map (mis. Erangel, Miramar), dan Grup (opsional).
- **Pemilihan Turnamen Cerdas**: Saat membuat jadwal, sistem akan menampilkan dropdown Turnamen. Jika hanya ada 1 turnamen aktif, sistem akan otomatis memilihnya tanpa perlu dropdown.
- **Manajemen Status Kombinasi**:
  - Status pertandingan (`UPCOMING`, `ONGOING`, `COMPLETED`) akan berubah secara otomatis berdasarkan waktu saat ini.
  - Namun, Admin memiliki tombol manual (override) untuk memaksa status menjadi "Live" (ONGOING) atau "Selesai" (COMPLETED) kapan pun dibutuhkan.
- **Pemisahan Input Skor**: Untuk menjaga kesederhanaan, _track_ ini **hanya** berfokus pada manajemen jadwal pertandingan. Sistem input skor per tim akan dibuat di _track_ terpisah berikutnya.

## 3. Non-Functional Requirements

- **UI/UX**: Menggunakan desain minimalis (Monokrom + Merah) dengan Modal/Dialog untuk pembuatan data agar panitia tidak perlu pindah halaman.

## 4. Acceptance Criteria

- [ ] Tersedia halaman `/admin/matches` yang menampilkan tabel daftar pertandingan.
- [ ] Admin dapat menambah, mengedit, dan menghapus jadwal Match.
- [ ] Pilihan turnamen otomatis terpilih jika hanya ada 1 turnamen aktif.
- [ ] Admin dapat memaksa (_override_) status Match menjadi "Live" atau "Selesai" secara manual.
- [ ] Jadwal yang dibuat di Admin Panel ini otomatis sinkron dan tampil di halaman publik `/schedule`.
