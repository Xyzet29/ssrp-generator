# SSRP Generator

SSRP Generator adalah aplikasi berbasis web yang dibuat untuk mempermudah pembuatan Screenshot Roleplay (SSRP) pada GTA San Andreas Multiplayer (SA:MP) maupun Open.MP.

Dengan aplikasi ini, pengguna tidak perlu lagi mengedit screenshot menggunakan Photoshop atau aplikasi sejenis. Cukup unggah gambar, masukkan chat roleplay, atur posisi gambar, lalu hasilnya siap digunakan.

---

## ✨ Fitur

- Canvas tetap berukuran **800 × 600**
- Upload screenshot
- Paste gambar menggunakan **Ctrl + V**
- Drag & Drop gambar ke canvas
- Geser gambar menggunakan mouse
- Zoom menggunakan scroll mouse
- Kontrol zoom dan posisi gambar
- Chat bagian atas dan bawah
- Mendukung warna chat SA:MP (`{FFFFFF}`)
- Parser chat (`/me`, `/do`, `/m`, `/s`, `/lme`, `/ldo`)
- Pengaturan ukuran font
- Antarmuka modern bertema gelap
- Upload hasil gambar ke Imgur

---

## 🛠️ Teknologi

- React
- Vite
- HTML5 Canvas
- html2canvas
- Imgur API

---

## 🚀 Instalasi

Clone repository

```bash
git clone https://github.com/USERNAME/ssrp-generator.git
```

Masuk ke folder project

```bash
cd ssrp-generator
```

Install dependency

```bash
npm install
```

Buat file **.env**

```env
VITE_IMGUR_CLIENT_ID=CLIENT_ID_IMGUR_KAMU
```

Jalankan project

```bash
npm run dev
```

---

## 📂 Struktur Folder

```
src
├── components
├── utils
├── assets
├── App.jsx
└── main.jsx
```

---

## 📌 Roadmap

- [x] Upload gambar
- [x] Drag & Drop gambar
- [x] Paste gambar
- [x] Zoom dan geser gambar
- [x] Overlay chat
- [x] Parser chat SA:MP
- [x] Upload ke Imgur

---

## 📄 Catatan

Project ini dibuat sebagai media pembelajaran sekaligus untuk membantu komunitas GTA SA:MP/Open.MP dalam membuat Screenshot Roleplay (SSRP) dengan lebih cepat dan praktis.

Pengembangan project ini juga mengambil inspirasi dari **Syahram SSRP Editor**, terutama pada alur penggunaan (workflow) dan beberapa konsep editor. Seluruh aplikasi dibangun kembali menggunakan **React** dan **Vite** dengan struktur, antarmuka, serta implementasi yang disesuaikan dan dikembangkan secara mandiri.

---

## 📄 Lisensi

Project ini menggunakan lisensi **MIT**.