# Implementation Plan: 019-frontend-polish

- [ ] **Phase 1: Otentikasi & Navigasi (Navbar)**
  - [ ] Task: Menambahkan integrasi `useSession` dari `next-auth/react` (atau alternatif komponen _Server/Client_) di `src/components/layouts/Navbar.tsx` untuk membaca status _login_.
  - [ ] Task: Mengondisikan _rendering_ menu "Admin" agar disembunyikan bagi pengguna yang tidak memiliki `role: 'ADMIN'`.
  - [ ] Task: Conductor - User Manual Verification 'Phase 1' (Protocol in workflow.md)

- [ ] **Phase 2: Pemolesan UI (Light Mode & Modal)**
  - [ ] Task: Memperbaiki variabel warna pada file _Hero Section_ (di `src/app/page.tsx` atau `src/components/features/home/HeroSection.tsx`) agar beradaptasi dengan _Light/Dark Mode_.
  - [ ] Task: Menambahkan properti CSS _transition/animate_ dasar ke komponen `src/components/ui/Modal.tsx`.
  - [ ] Task: Conductor - User Manual Verification 'Phase 2' (Protocol in workflow.md)

- [ ] **Phase 3: Penambahan Metadata SEO**
  - [ ] Task: Menambahkan konstruksi ekspor `metadata` (_Metadata object_ dari Next.js) pada `layout.tsx` atau `page.tsx` utama untuk mengatur informasi _Open Graph_.
  - [ ] Task: Conductor - User Manual Verification 'Phase 3' (Protocol in workflow.md)

- [ ] **Phase 4: Automated Testing & Validasi**
  - [ ] Task: Menjalankan `npm run test` untuk memastikan pembaruan logika rendering di `Navbar.tsx` (misalnya karena `useSession`) tidak merusak _Snapshot_ pengujian komponen yang sudah ada.
  - [ ] Task: Conductor - User Manual Verification 'Phase 4' (Protocol in workflow.md)
