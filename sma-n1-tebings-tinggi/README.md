# Website Resmi SMA Negeri 1 Tebing Tinggi
## Tahap 1–4 (Production Ready)

Website sekolah lengkap: frontend, admin portal, database cloud-ready, dan siap deploy.

---

## Jalankan Lokal

```bash
cd sma-n1-tebings-tinggi
python3 -m http.server 8080
```

| Halaman | URL |
|---------|-----|
| Website | http://localhost:8080 |
| Admin   | http://localhost:8080/admin/login.html |

**Login Admin:** `admin` / `admin123`

---

## Ringkasan Fitur per Tahap

| Tahap | Isi |
|-------|-----|
| **1** | Beranda, navigasi, struktur menu, logo, lokasi + Maps |
| **2** | Semua submenu, PTK real, admin lengkap, formulir pendaftaran |
| **3** | Integrasi Supabase (schema, DataService, real-time ready) |
| **4** | Deploy config (Vercel/Netlify), PDF viewer, PWA manifest, security headers, panduan deploy |

---

## Fitur Utama

### Publik
- Beranda dengan quick menu, berita, prestasi, PTK, Maps
- Profil: Sejarah, Sambutan Kepsek, Visi & Misi, Prestasi, Ekstrakurikuler, PTK
- Informasi: Pengumuman, Berita, Artikel, Agenda
- Perpustakaan Digital + **PDF Viewer**
- Pendaftaran siswa baru
- PPID (KSP, RKJM, RKT, RKAS, Rapor)
- PWA-ready (bisa ditambahkan ke homescreen)

### Admin
- Login terproteksi
- Dashboard + statistik
- Kelola konten, pengumuman, data pendaftaran (export)
- Log aktivitas
- Indikator mode DB (localStorage / Supabase Cloud)
- Notifikasi real-time (saat Supabase aktif)

---

## Aktifkan Database Cloud (Supabase)

1. Buat project di https://supabase.com (region Singapore)
2. Jalankan `supabase/schema.sql` di SQL Editor
3. Buat bucket Storage `books` (public)
4. Edit `js/supabase-config.js`:
   ```js
   url: 'https://xxxx.supabase.co',
   anonKey: 'eyJ...',
   USE_SUPABASE: true
   ```
5. Refresh → indikator admin jadi **☁️ Supabase Cloud**

Panduan detail: **supabase/SETUP.md**

---

## Deploy ke Internet

Lihat **DEPLOY.md** untuk panduan Vercel / Netlify / GitHub Pages.

Singkat (Vercel):
```bash
npm i -g vercel
vercel
```

---

## Struktur Project

```
sma-n1-tebings-tinggi/
├── index.html              # Beranda
├── manifest.json           # PWA
├── robots.txt
├── vercel.json / netlify.toml
├── css/  js/  assets/  data/
├── admin/                  # Portal admin
├── pages/                  # Semua halaman submenu + PDF viewer
├── supabase/
│   ├── schema.sql
│   └── SETUP.md
├── DEPLOY.md
└── README.md
```

---

## Data Sekolah

- **Nama:** SMA NEGERI 1 TEBING TINGGI  
- **NPSN:** 10400816  
- **Kepala Sekolah:** Poyadi (NIP 196802111992031006)  
- **Alamat:** Jl. Pembangunan II, Selatpanjang Kota, Kec. Tebing Tinggi, Kab. Kepulauan Meranti, Riau 28753  
- **Koordinat:** 1.0075, 102.7127  
- **Telp / Email:** 0763-32418 / sman1tt_selpa@yahoo.co.id  

---

## Checklist Produksi

- [ ] Isi kredensial Supabase & set `USE_SUPABASE: true`
- [ ] Ganti password admin default
- [ ] Deploy (Vercel/Netlify)
- [ ] Uji pendaftaran & admin dari perangkat berbeda
- [ ] Isi link media sosial resmi
- [ ] Upload PDF buku (setelah Storage aktif)

---

Website siap digunakan dan siap dipublikasikan.
