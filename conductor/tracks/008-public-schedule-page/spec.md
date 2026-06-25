# Specification: Halaman Jadwal Pertandingan Publik (/schedule)

## 1. Overview

Halaman ini didedikasikan bagi penonton dan pemain untuk melihat daftar pertandingan turnamen secara publik. Jadwal disusun untuk memudahkan pelacakan waktu tanding, status pertandingan, serta lokasi map yang dimainkan.

## 2. Functional Requirements

- **Tampilan Jadwal (Match Cards):** Setiap kartu jadwal akan menampilkan Waktu/Jam, Info Grup (opsional), jenis Map, dan Status (_Scheduled, Ongoing, Completed_).
- **Filter Tanggal:** Navigasi berbasis hari/tanggal untuk memilah daftar pertandingan agar tidak menumpuk dalam satu layar.
- **Live Indicator:** Pertandingan berstatus `ONGOING` akan ditandai dengan _badge_ khusus yang mencolok (misal: ikon berkedip/animasi _pulse_ merah) agar mudah disadari pengunjung.
- **Grup Fleksibel:** Jika sebuah pertandingan tidak memiliki grup (misal babak final gabungan), label grup akan otomatis disembunyikan.

## 3. Non-Functional Requirements

- **Desain & UX:** Responsif di _mobile_ dan menggunakan kontras tinggi sesuai standar _product-guidelines_.
- **URL Sync:** Penyaringan tanggal disimpan pada URL Parameter (contoh: `?date=2023-10-15`) sehingga halaman mudah dibagikan.

## 4. Acceptance Criteria

- [ ] Pengunjung dapat melihat jadwal dengan informasi map, status, dan waktu yang terformat rapi.
- [ ] Navigasi filter tanggal berfungsi akurat mengambil jadwal yang relevan.
- [ ] Indikator LIVE muncul dengan efek visual dinamis saat status _match_ sedang berlangsung.

## 5. Out of Scope

- Fitur panitia untuk mengubah status jadwal (ini akan dikerjakan di Admin Panel pada _track_ selanjutnya).
- Penayangan video _live streaming_ (hanya berupa jadwal dan status teks).
