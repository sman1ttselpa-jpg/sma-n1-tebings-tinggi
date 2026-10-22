# Panduan Aktivasi Supabase – Langkah demi Langkah

Ikuti urutan di bawah. Estimasi waktu: **15–25 menit**.

---

## Langkah 1 — Buat Akun & Project

1. Buka **https://supabase.com** di browser
2. Klik **Start your project** / Sign in (bisa pakai GitHub atau email)
3. Setelah masuk dashboard, klik **New Project**
4. Isi form:
   - **Name:** `sma-n1-tebings-tinggi` (bebas)
   - **Database Password:** buat password kuat (contoh: `SmaN1TT@2026!`) — **SIMPAN** password ini
   - **Region:** pilih **Southeast Asia (Singapore)**
   - Plan: **Free**
5. Klik **Create new project**
6. Tunggu 1–2 menit sampai status project **Active** (hijau)

---

## Langkah 2 — Ambil URL & API Key

1. Di sidebar kiri bawah, klik ikon **Settings** (gear)
2. Pilih menu **API**
3. Anda akan melihat:
   - **Project URL** → contoh: `https://abcdefghijk.supabase.co`
   - **Project API keys** → bagian **anon** / **public**
4. **Salin** kedua nilai tersebut (jangan salin `service_role`)

---

## Langkah 3 — Buat Tabel Database

1. Sidebar kiri → klik **SQL Editor**
2. Klik **New query**
3. Buka file project: `supabase/schema.sql`
4. **Select All** (Ctrl+A) isi file tersebut → **Copy**
5. Paste ke SQL Editor Supabase
6. Klik tombol **Run** (atau Ctrl+Enter)
7. Pastikan muncul pesan sukses (tidak ada error merah)

Yang dibuat:
- Tabel: contents, pendaftaran, pengumuman, books, activity_logs, ptk
- Index + Row Level Security (RLS)

---

## Langkah 4 — Buat Storage untuk PDF Buku

1. Sidebar → **Storage**
2. Klik **New bucket**
3. **Name:** `books`
4. Centang **Public bucket**
5. Klik **Create bucket**

---

## Langkah 5 — Hubungkan ke Website

1. Buka file di project: `js/supabase-config.js`
2. Ganti isinya menjadi:

```javascript
const SUPABASE_CONFIG = {
  url: 'https://XXXXXXXX.supabase.co',     // ← paste Project URL
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',  // ← paste anon key
  USE_SUPABASE: true                        // ← wajib true
};

window.SUPABASE_CONFIG = SUPABASE_CONFIG;
```

3. Simpan file

---

## Langkah 6 — Uji Coba

1. Jalankan website lokal:
   ```bash
   python3 -m http.server 8080
   ```
2. Buka http://localhost:8080/admin/login.html
3. Login: `admin` / `admin123`
4. Perhatikan indikator di kanan atas:
   - **☁️ Supabase Cloud** = berhasil
   - **💾 localStorage (Demo)** = masih belum terhubung (cek URL/key/USE_SUPABASE)
5. Coba **Tambah Konten** di menu Kelola Konten
6. Buka Supabase Dashboard → **Table Editor** → tabel `contents` → data harus muncul
7. Buka website di browser/HP lain → data yang sama harus tampil

---

## Langkah 7 (Opsional) — Real-time Notification

Setelah terhubung, admin dashboard otomatis berlangganan perubahan tabel `pendaftaran`.  
Saat ada siswa mengisi formulir pendaftaran, notifikasi akan muncul di admin.

---

## Troubleshooting

| Gejala | Penyebab & Solusi |
|--------|-------------------|
| Masih tampil localStorage | `USE_SUPABASE` masih `false`, atau URL/key salah |
| Error di console browser | Buka DevTools (F12) → tab Console, baca pesan error |
| Data tidak masuk | Pastikan schema.sql sudah di-Run tanpa error |
| CORS / blocked | Di Supabase → Authentication → URL Configuration, tambahkan domain website Anda |
| RLS policy error | Jalankan ulang bagian policy di schema.sql |

---

## Keamanan Penting

- **Jangan** pernah memasukkan `service_role` key ke file frontend
- Key `anon` aman dipakai di browser (sudah dilindungi RLS)
- Setelah production, ganti password login admin default
- Disarankan aktifkan Supabase Auth (email + password) untuk admin di tahap berikutnya

---

Selesai. Database sekolah Anda sekarang bisa diakses dari mana saja.
