# Implementation Plan: 020-typescript-refactor

- [ ] **Phase 1: Setup Infrastruktur & Tipe Prisma (Database)**
  - [ ] Task: Membuat file `types/index.ts` untuk mengatur titik masuk (_entry point_) modul, serta `types/models.ts` untuk menampung _types_ basis data/model relasi kompleks dengan menggunakan utilitas `Prisma.<Model>GetPayload`.
  - [ ] Task: Mengganti impor tipe prisma langsung (seperti dari `@prisma/client`) dengan _types_ bentukan kustom di seluruh file jika diperlukan.
  - [ ] Task: Conductor - User Manual Verification 'Phase 1' (Protocol in workflow.md)

- [x] **Phase 2: Ekstraksi Tipe Frontend (Komponen UI)**
  - [x] Task: Membuat file `types/components.ts` untuk mengumpulkan seluruh _Interface Props_.
  - [x] Task: Melakukan refaktorisasi berulang ke dalam folder `src/components/` (terutama _Layouts_ dan _UI/Features_) untuk menghapus pendefinisian `interface XProps` yang statis di dalam file tersebut dan menggantinya dengan jalur impor dari `types/`.
  - [x] Task: Conductor - User Manual Verification 'Phase 2' (Protocol in workflow.md)

# Implementation Plan: 020-typescript-refactor

- [ ] **Phase 1: Setup Infrastruktur & Tipe Prisma (Database)**
  - [ ] Task: Membuat file `types/index.ts` untuk mengatur titik masuk (_entry point_) modul, serta `types/models.ts` untuk menampung _types_ basis data/model relasi kompleks dengan menggunakan utilitas `Prisma.<Model>GetPayload`.
  - [ ] Task: Mengganti impor tipe prisma langsung (seperti dari `@prisma/client`) dengan _types_ bentukan kustom di seluruh file jika diperlukan.
  - [ ] Task: Conductor - User Manual Verification 'Phase 1' (Protocol in workflow.md)

- [x] **Phase 2: Ekstraksi Tipe Frontend (Komponen UI)**
  - [x] Task: Membuat file `types/components.ts` untuk mengumpulkan seluruh _Interface Props_.
  - [x] Task: Melakukan refaktorisasi berulang ke dalam folder `src/components/` (terutama _Layouts_ dan _UI/Features_) untuk menghapus pendefinisian `interface XProps` yang statis di dalam file tersebut dan menggantinya dengan jalur impor dari `types/`.
  - [x] Task: Conductor - User Manual Verification 'Phase 2' (Protocol in workflow.md)

- [x] **Phase 3: Standarisasi Payload API**
  - [x] Task: Membuat file `types/api.ts` untuk mendeklarasikan _interface_ bentuk Data _Request_ (`Body`) dan Data _Response_ yang masuk/keluar ke direktori `src/app/api/`.
  - [x] Task: Mengimplementasikan tipe API tersebut ke seluruh _route handlers_ agar selaras.
  - [x] Task: Conductor - User Manual Verification 'Phase 3' (Protocol in workflow.md)

- [x] **Phase 4: Pembersihan Tipe `any` & Validasi Akhir**
  - [x] Task: Melakukan pemindaian massal terhadap penggunaan `any` dan memperbaikinya menjadi tipe/referensi eksplisit.
  - [x] Task: Menjalankan `npm run build` dan `tsc --noEmit` untuk mengonfirmasi nol kompilasi _error_.
  - [x] Task: Menjalankan pengujian `npm run test` demi memastikan logika _runtime_ tidak hancur akibat salah penggantian _Types_.
  - [x] Task: Conductor - User Manual Verification 'Phase 4' (Protocol in workflow.md)
