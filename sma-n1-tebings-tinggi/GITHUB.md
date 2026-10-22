# Panduan Push ke GitHub + Deploy Vercel

Repository sudah diinisialisasi (branch `main`, commit awal siap).

---

## Bagian A — Push ke GitHub

### 1. Buat Repository di GitHub

1. Login ke **https://github.com**
2. Klik **New repository** (tombol hijau)
3. Isi:
   - **Repository name:** `sma-n1-tebings-tinggi` (atau nama lain)
   - **Description:** Website resmi SMA Negeri 1 Tebing Tinggi
   - Pilih **Public** (agar mudah deploy gratis) atau Private
   - **Jangan** centang "Add a README" (sudah ada di project)
4. Klik **Create repository**

### 2. Hubungkan & Push dari Komputer Anda

Salin perintah yang ditampilkan GitHub, atau jalankan ini di folder project:

```bash
cd sma-n1-tebings-tinggi

# Ganti USERNAME dan NAMA_REPO sesuai akun Anda
git remote add origin https://github.com/USERNAME/sma-n1-tebings-tinggi.git
git push -u origin main
```

Jika diminta login:
- Gunakan **Personal Access Token** (bukan password biasa)
- Buat token: GitHub → Settings → Developer settings → Personal access tokens → Generate new token (classic) → centang `repo`

Setelah berhasil, refresh halaman repository GitHub — semua file harus muncul.

---

## Bagian B — Deploy ke Vercel

### Cara 1: Langsung dari GitHub (Paling Mudah)

1. Buka **https://vercel.com** → Login (bisa pakai akun GitHub)
2. Klik **Add New…** → **Project**
3. Import repository `sma-n1-tebings-tinggi`
4. Biarkan pengaturan default:
   - Framework Preset: **Other**
   - Root Directory: `.`
   - Build Command: (kosong)
   - Output Directory: `.`
5. Klik **Deploy**
6. Tunggu 30–60 detik → dapat URL seperti:
   `https://sma-n1-tebings-tinggi.vercel.app`

### Cara 2: Pakai Vercel CLI

```bash
npm i -g vercel
cd sma-n1-tebings-tinggi
vercel
# ikuti pertanyaan interaktif
vercel --prod   # untuk production
```

---

## Bagian C — Setelah Deploy

1. **Aktifkan Supabase** (lihat `supabase/SETUP.md`)
2. Edit `js/supabase-config.js` → isi URL & anon key → `USE_SUPABASE: true`
3. Commit & push perubahan:
   ```bash
   git add js/supabase-config.js
   git commit -m "Aktifkan Supabase"
   git push
   ```
   Vercel akan **otomatis redeploy**
4. Uji website di URL Vercel:
   - Buka beranda
   - Login admin
   - Submit pendaftaran
   - Cek data di Supabase Table Editor

### Custom Domain (Opsional)

- Vercel → Project → Settings → Domains
- Tambahkan domain sekolah (contoh: `www.sman1ttselpa.sch.id`)
- Arahkan DNS sesuai instruksi Vercel

---

## Perintah Git yang Sering Dipakai

```bash
# Lihat status
git status

# Simpan perubahan
git add -A
git commit -m "Pesan perubahan"
git push

# Ambil update terbaru
git pull
```

---

## Catatan Keamanan

- File `js/supabase-config.js` berisi **anon key** (aman untuk frontend)
- Jangan pernah commit `service_role` key
- Setelah live, segera ganti password admin default (`admin123`)

---

Selesai. Website sekolah Anda bisa diakses publik di internet.
EOF
