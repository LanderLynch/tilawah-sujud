# Ayat Sajadah · Sujud Tilawah

Website interaktif Praktikum Al-Qur’an Kelompok 11. React 18 + Vite + Tailwind CSS 3.4 + GSAP + Framer Motion.

## Menjalankan

```bash
npm install
npm run dev       # pengembangan, http://localhost:5173
npm run build     # hasil di dist/
npm run preview   # coba hasil build
```

## Struktur penting

- `src/data/content.js` : semua teks (nama anggota, ayat, hukum, hikmah, dll.)
- `src/components/PrayerFigure.jsx` : siluet SVG; `TataCara.jsx` : timeline GSAP
- `tailwind.config.cjs` : warna (navy, gold, sky), font, keyframes, animasi
- `src/index.css` : token warna, kelas kustom (`card-base`, `note-box`, `eyebrow`, `icon-ring`, dll.)

## Yang diubah dari versi arsip sebelumnya

- Konfigurasi Tailwind **direkonstruksi** dari CSS terkompilasi. Kelas baru sekarang bisa ditambahkan.
- Verifikasi: 502 kelas yang dipakai di `src/` semuanya ada di CSS baru, dan 10 section identik piksel demi piksel dengan situs lama (mode animasi dikurangi, 1280 px).
- Build pindah dari esbuild ke Vite; `@tanstack/react-query` dihapus (tidak dipakai).
- Bug: teks doa tidak lagi menabrak label fase di panggung siluet.

## Yang masih perlu diisi

- 11 dari 15 ayat belum punya teks Arab (`arab: ""` di `content.js`, bertanda TODO). Isi dari mushaf.
- Terjemahan Kemenag pada 4 ayat dalil ditambahkan di luar PDF; cocokkan dengan sumber resmi.
- NIM anggota tampil di halaman depan; hapus dari `anggota` jika situs dipublikasikan.
