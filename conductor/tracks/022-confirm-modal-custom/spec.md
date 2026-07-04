# Specification: 022-confirm-modal-custom

## 1. Overview

Mengembangkan komponen `ConfirmModal` kustom (_Reusable Component_) untuk menggantikan fungsi bawaan browser (`window.confirm`). Komponen ini dirancang untuk memberikan pengalaman pengguna yang lebih mulus dan selaras dengan _branding_ UI UC96, khususnya untuk aksi-aksi kritikal seperti penghapusan data atau konfirmasi _generate_ jadwal.

## 2. Functional Requirements

- **Global Reusability:** Komponen dapat dipanggil dengan mudah dari komponen klien mana saja.
- **Dynamic Content:** Menerima `title` (judul), `description` (pesan konfirmasi), `confirmText` (teks tombol konfirmasi), dan `cancelText` (teks tombol batal).
- **Varian Tema Aksi (Variants):** Mendukung properti varian warna untuk tombol aksi, seperti `danger` (merah) untuk penghapusan dan `default`/`primary` untuk aksi biasa.
- **Loading State:** Menerima parameter `isLoading` atau memproses aksi secara _asynchronous_, sehingga menampilkan efek _loading_ (teks berubah menjadi 'Memproses...' atau indikator visual) saat aksi konfirmasi sedang berjalan, mencegah klik ganda.

## 3. Non-Functional Requirements & UX

- **Design System:** Tampilan harus bergaya _dark mode_ minimalis (menggunakan Tailwind CSS) dengan _backdrop_ redup yang konsisten dengan estetika e-sports UC96.
- **Animation:** Menggunakan animasi masuk _Fade-In_ yang elegan (_smooth transition_).
- **Responsiveness:** Modal wajib _mobile-friendly_ dan berada persis di tengah layar perangkat apa pun.
- **Accessibility:** Mendukung _keyboard navigation_ (bisa ditutup dengan tombol ESC).

## 4. Acceptance Criteria

- Komponen `ConfirmModal` berhasil dibuat di folder `src/components/ui/`.
- Komponen tersebut sukses digunakan untuk menggantikan setidaknya satu pemanggilan `window.confirm` yang ada sebelumnya (contoh: pada fitur Auto-Generate Scrim atau Hapus Tim).
- Indikator _loading_ berfungsi baik dan menonaktifkan (_disable_) tombol lain saat aksi konfirmasi diklik.
- Tampilan UI lolos uji responsivitas dan konsisten dengan _dark mode_.

## 5. Out of Scope

- Tidak mengubah logika bisnis _backend_ (hanya mengubah antarmuka konfirmasi di _frontend_).
- Tidak merombak _framework_ CSS atau mengganti struktur UI di luar cakupan modal ini.
