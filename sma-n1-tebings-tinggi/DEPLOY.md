# Panduan Deploy – SMA Negeri 1 Tebing Tinggi

## Opsi 1: Vercel (Direkomendasikan)

1. Buat akun di https://vercel.com
2. Install Vercel CLI (opsional):
   ```bash
   npm i -g vercel
   ```
3. Dari folder project:
   ```bash
   vercel
   ```
   Atau hubungkan repo GitHub → Import Project → Deploy
4. Setelah deploy, set domain custom (opsional) di Project Settings → Domains

File `vercel.json` sudah disiapkan (security headers + routing).

---

## Opsi 2: Netlify

1. Buat akun di https://netlify.com
2. Drag & drop folder project, atau hubungkan GitHub
3. Publish directory: `.` (root)
4. File `netlify.toml` sudah disiapkan

---

## Opsi 3: GitHub Pages

1. Push project ke repository GitHub
2. Settings → Pages → Source: Deploy from branch `main` / root
3. Website akan tersedia di `https://username.github.io/repo-name`

**Catatan:** Untuk GitHub Pages, pastikan path relatif sudah benar (sudah memakai path relatif).

---

## Setelah Deploy

1. **Aktifkan Supabase** (lihat `supabase/SETUP.md`)
2. Di `js/supabase-config.js` isi URL & anon key, set `USE_SUPABASE: true`
3. Commit & push ulang (atau redeploy)
4. Uji:
   - Buka website di HP & laptop
   - Login admin
   - Submit pendaftaran → cek muncul di admin & di Supabase Table Editor
5. Ganti password default admin
6. (Opsional) Pasang custom domain sekolah

---

## Checklist Produksi

- [ ] Supabase project aktif + schema dijalankan
- [ ] `USE_SUPABASE: true` di config
- [ ] Password admin diganti
- [ ] Domain custom (jika ada) sudah diarahkan
- [ ] HTTPS aktif (otomatis di Vercel/Netlify)
- [ ] Logo & data sekolah sudah benar
- [ ] Link media sosial diisi
- [ ] Uji formulir pendaftaran
- [ ] Uji di mobile

---

## Keamanan

- Jangan commit file yang berisi `service_role` key
- `anon` key aman untuk frontend (dilindungi RLS)
- Header keamanan sudah diatur di `vercel.json` / `netlify.toml`
EOF
