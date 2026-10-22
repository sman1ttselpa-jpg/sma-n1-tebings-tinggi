-- ============================================================
-- Schema Database SMA Negeri 1 Tebing Tinggi
-- Jalankan di Supabase SQL Editor (Dashboard → SQL Editor)
-- ============================================================

-- 1. Tabel Konten (Berita, Artikel, Agenda, dll)
CREATE TABLE IF NOT EXISTS contents (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,          -- 'Berita Kegiatan', 'Pengumuman', 'Artikel', dll
  body TEXT NOT NULL,
  author TEXT DEFAULT 'admin',
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tabel Pendaftaran Siswa Baru
CREATE TABLE IF NOT EXISTS pendaftaran (
  id BIGSERIAL PRIMARY KEY,
  nama TEXT NOT NULL,
  nisn TEXT,
  jk TEXT CHECK (jk IN ('L', 'P')),
  tgl_lahir DATE,
  tempat_lahir TEXT,
  hp TEXT,
  alamat TEXT,
  asal_sekolah TEXT,
  jurusan TEXT,
  nama_ortu TEXT,
  hp_ortu TEXT,
  status TEXT DEFAULT 'Baru',      -- Baru, Diproses, Diterima, Ditolak
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  notes TEXT
);

-- 3. Tabel Pengumuman
CREATE TABLE IF NOT EXISTS pengumuman (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  is_penting BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ
);

-- 4. Tabel Buku Digital (Perpustakaan)
CREATE TABLE IF NOT EXISTS books (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  kategori TEXT NOT NULL,         -- 'Kurikulum Merdeka', 'Kurikulum 2013', 'Non Teks'
  kelas TEXT,
  mapel TEXT,
  file_url TEXT,                   -- URL dari Supabase Storage
  cover_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Tabel Log Aktivitas
CREATE TABLE IF NOT EXISTS activity_logs (
  id BIGSERIAL PRIMARY KEY,
  user_name TEXT DEFAULT 'admin',
  action TEXT NOT NULL,
  details TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Tabel PTK (opsional, bisa diisi manual atau sync)
CREATE TABLE IF NOT EXISTS ptk (
  id BIGSERIAL PRIMARY KEY,
  nama TEXT NOT NULL,
  jk TEXT,
  nip TEXT,
  jenis TEXT,                      -- Guru, Kepala Sekolah, Tenaga Kependidikan
  status TEXT,
  tgl_lahir DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index untuk performa
CREATE INDEX IF NOT EXISTS idx_contents_category ON contents(category);
CREATE INDEX IF NOT EXISTS idx_contents_created ON contents(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_pendaftaran_status ON pendaftaran(status);
CREATE INDEX IF NOT EXISTS idx_pengumuman_created ON pengumuman(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_books_kategori ON books(kategori);
CREATE INDEX IF NOT EXISTS idx_logs_created ON activity_logs(created_at DESC);

-- ============================================================
-- Row Level Security (RLS) - Keamanan dasar
-- ============================================================

ALTER TABLE contents ENABLE ROW LEVEL SECURITY;
ALTER TABLE pendaftaran ENABLE ROW LEVEL SECURITY;
ALTER TABLE pengumuman ENABLE ROW LEVEL SECURITY;
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE ptk ENABLE ROW LEVEL SECURITY;

-- Policy: Semua orang bisa membaca konten yang published
CREATE POLICY "Public read contents" ON contents
  FOR SELECT USING (is_published = true);

CREATE POLICY "Public read pengumuman" ON pengumuman
  FOR SELECT USING (true);

CREATE POLICY "Public read books" ON books
  FOR SELECT USING (true);

CREATE POLICY "Public read ptk" ON ptk
  FOR SELECT USING (true);

-- Policy: Siapa saja bisa submit pendaftaran (insert only)
CREATE POLICY "Public insert pendaftaran" ON pendaftaran
  FOR INSERT WITH CHECK (true);

-- Policy: Authenticated users (admin) bisa full access
-- Catatan: Gunakan Supabase Auth atau service_role key di backend untuk admin
CREATE POLICY "Admin full contents" ON contents
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full pendaftaran" ON pendaftaran
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full pengumuman" ON pengumuman
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full books" ON books
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full logs" ON activity_logs
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full ptk" ON ptk
  FOR ALL USING (auth.role() = 'authenticated');

-- ============================================================
-- Storage Bucket untuk PDF Buku (jalankan di Storage)
-- ============================================================
-- 1. Buat bucket bernama: books
-- 2. Set public: true (atau private + signed URL)
-- 3. Policy: public read, authenticated upload

-- Trigger updated_at otomatis
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER contents_updated_at
  BEFORE UPDATE ON contents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
