# Specification: Retroactive Automated Tests (Track 010)

## 1. Overview

Melunasi _technical debt_ dengan menambahkan _Automated Testing_ untuk fitur-fitur yang sudah dirilis sebelumnya (API, Halaman Publik, dan Admin Panel). Seluruh file pengujian akan diorganisasi dengan rapi di dalam struktur folder khusus agar tidak bercampur dengan _production code_ dan mudah dipelihara.

## 2. Scope of Testing

- **Organisasi Folder**: Memigrasikan file pengujian UI yang sudah ada (seperti `Button.test.tsx`) dan membuat _test_ baru ke dalam struktur folder terpusat yang rapi (misalnya di folder `tests/api/`, `tests/components/`, `tests/app/`).
- **API Endpoints**: Pengujian logika _backend_, validasi _Zod_, _error handling_, dan _authorization_ (akses admin).
- **UI & Pages**: Pengujian interaksi (klik tombol, _render_ modal, dsb) untuk fitur Pendaftaran, Jadwal (`/schedule`), Daftar Tim (`/teams`), serta panel admin.
- **Edge Cases**: Meng-cover skenario tak terduga (_null handling_, manipulasi _search params_, dsb).

## 3. Execution Strategy

- Pekerjaan dibagi secara modular dan di-_commit_ bertahap (satu modul/fitur = satu commit).
- Menggunakan _framework_ `vitest` dan `@testing-library/react`.

## 4. Acceptance Criteria

- [ ] Folder pengujian telah direstrukturisasi agar terorganisir dengan rapi.
- [ ] Test untuk API dan integrasi antarmuka/halaman utama tersedia.
- [ ] Seluruh skenario tambahan (termasuk _edge case_) berjalan sukses di _vitest_.
- [ ] `npm run test` menghasilkan 100% _passed_ tanpa mengganggu kestabilan sistem utama.
