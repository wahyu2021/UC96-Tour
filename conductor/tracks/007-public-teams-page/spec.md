# Specification: Halaman Daftar Tim Publik (/teams)

## 1. Overview

Halaman ini bertindak sebagai direktori publik bagi seluruh tim yang telah berhasil mendaftar dan diverifikasi (status `APPROVED`). Pengunjung dapat melihat profil tim beserta susunan pemain (roster) mereka secara lengkap.

## 2. Functional Requirements

- **Tampilan Utama:** Menampilkan daftar tim dalam bentuk _Card Detail_ yang memuat info dasar tim (Logo, Nama, Tag) serta daftar roster/pemain lengkap (IGN & In-Game ID).
- **Pencarian (Search):** Pengunjung dapat mencari tim spesifik menggunakan bilah pencarian berdasarkan Nama Tim atau Tag.
- **Filter Turnamen:** Dropdown untuk menyaring daftar tim berdasarkan turnamen spesifik yang mereka ikuti.
- **Pagination:** Data tim yang ditampilkan dilimitasi maksimal 12 tim per halaman untuk menjaga kecepatan, lengkap dengan kontrol navigasi halaman (Next/Prev).
- **Kondisi Data:** Hanya mengambil tim dari database yang memiliki status pendaftaran `APPROVED`.

## 3. Non-Functional Requirements

- **Kinerja & SEO:** Filter, pencarian, dan pagination direkomendasikan menggunakan parameter URL (`?q=...&tournament=...&page=...`) secara _Server-Side_ agar halaman bisa dibagikan secara langsung (_shareable_).
- **Desain:** Menggunakan komponen kustom (_Input_, _Select_, dll) yang sudah kita selesaikan di _track_ sebelumnya.

## 4. Acceptance Criteria

- [ ] Halaman `/teams` dapat diakses secara publik tanpa batas.
- [ ] _Card_ tim merender daftar pemain dengan format yang rapi (termasuk indikator Kapten).
- [ ] Fungsionalitas pencarian, filter turnamen, dan _pagination_ bekerja akurat menarik data dari _database_ Prisma.

## 5. Out of Scope

- Halaman profil tim tunggal/individual (misal `/teams/rrq`) belum dikerjakan di _track_ ini.
