// Shared layout helpers for consistent header/footer across pages
const BASE = window.location.pathname.includes('/pages/') || window.location.pathname.includes('/admin/') ? '../' : '';

function getHeaderHTML(active = '') {
  return `
  <div class="bg-primary text-white text-sm py-2">
    <div class="container mx-auto px-4 flex flex-wrap justify-between items-center gap-2">
      <div class="flex items-center gap-4">
        <span><i class="fas fa-phone-alt mr-1"></i> 0763-32418</span>
        <span class="hidden sm:inline"><i class="fas fa-envelope mr-1"></i> sman1tt_selpa@yahoo.co.id</span>
      </div>
      <div class="flex items-center gap-3">
        <a href="#" class="hover:text-accent transition"><i class="fab fa-facebook-f"></i></a>
        <a href="#" class="hover:text-accent transition"><i class="fab fa-instagram"></i></a>
        <a href="#" class="hover:text-accent transition"><i class="fab fa-youtube"></i></a>
        <a href="${BASE}admin/login.html" class="hover:text-accent transition ml-2"><i class="fas fa-user-shield"></i> Admin</a>
      </div>
    </div>
  </div>
  <header class="bg-white shadow-md sticky top-0 z-50">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between py-3">
        <a href="${BASE}index.html" class="flex items-center gap-3">
          <img src="${BASE}assets/logo.png" alt="Logo" class="h-14 w-14 object-contain">
          <div>
            <h1 class="text-lg md:text-xl font-bold text-primary leading-tight">SMA NEGERI 1</h1>
            <p class="text-xs md:text-sm text-gray-600">TEBING TINGGI</p>
          </div>
        </a>
        <nav class="hidden lg:flex items-center gap-1">
          <a href="${BASE}index.html" class="px-3 py-2 rounded-lg font-medium ${active==='beranda'?'bg-green-50 text-primary':''} hover:bg-green-50">Beranda</a>
          <div class="relative group">
            <button class="px-3 py-2 rounded-lg font-medium hover:bg-green-50 flex items-center gap-1">Profil <i class="fas fa-chevron-down text-xs"></i></button>
            <div class="absolute left-0 mt-1 w-56 bg-white shadow-xl rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all border z-50">
              <a href="${BASE}pages/sejarah.html" class="block px-4 py-2 hover:bg-green-50">Sejarah</a>
              <a href="${BASE}pages/sambutan.html" class="block px-4 py-2 hover:bg-green-50">Sambutan Kepsek</a>
              <a href="${BASE}pages/visi-misi.html" class="block px-4 py-2 hover:bg-green-50">Visi & Misi</a>
              <a href="${BASE}pages/prestasi.html" class="block px-4 py-2 hover:bg-green-50">Prestasi</a>
              <a href="${BASE}pages/ekstrakurikuler.html" class="block px-4 py-2 hover:bg-green-50">Ekstrakurikuler</a>
              <a href="${BASE}pages/ptk.html" class="block px-4 py-2 hover:bg-green-50">Pendidik & Tenaga Kependidikan</a>
            </div>
          </div>
          <div class="relative group">
            <button class="px-3 py-2 rounded-lg font-medium hover:bg-green-50 flex items-center gap-1">Informasi <i class="fas fa-chevron-down text-xs"></i></button>
            <div class="absolute left-0 mt-1 w-56 bg-white shadow-xl rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all border z-50">
              <a href="${BASE}pages/berita-kegiatan.html" class="block px-4 py-2 hover:bg-green-50">Berita Kegiatan Sekolah</a>
              <a href="${BASE}pages/berita-pendidikan.html" class="block px-4 py-2 hover:bg-green-50">Berita Pendidikan</a>
              <a href="${BASE}pages/artikel.html" class="block px-4 py-2 hover:bg-green-50">Artikel Sekolah</a>
              <a href="${BASE}pages/agenda.html" class="block px-4 py-2 hover:bg-green-50">Agenda Kegiatan</a>
              <a href="${BASE}pages/pengumuman.html" class="block px-4 py-2 hover:bg-green-50">Pengumuman</a>
            </div>
          </div>
          <div class="relative group">
            <button class="px-3 py-2 rounded-lg font-medium hover:bg-green-50 flex items-center gap-1">Perpustakaan Digital <i class="fas fa-chevron-down text-xs"></i></button>
            <div class="absolute left-0 mt-1 w-64 bg-white shadow-xl rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all border z-50">
              <a href="${BASE}pages/buku-merdeka.html" class="block px-4 py-2 hover:bg-green-50">Buku Teks Kurikulum Merdeka</a>
              <a href="${BASE}pages/buku-k13.html" class="block px-4 py-2 hover:bg-green-50">Buku Teks Kurikulum 2013</a>
              <a href="${BASE}pages/buku-nonteks.html" class="block px-4 py-2 hover:bg-green-50">Buku Non Teks</a>
            </div>
          </div>
          <a href="${BASE}pages/pendaftaran.html" class="px-3 py-2 rounded-lg font-medium hover:bg-green-50">Pendaftaran</a>
          <div class="relative group">
            <button class="px-3 py-2 rounded-lg font-medium hover:bg-green-50 flex items-center gap-1">PPID Sekolah <i class="fas fa-chevron-down text-xs"></i></button>
            <div class="absolute left-0 mt-1 w-72 bg-white shadow-xl rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all border z-50">
              <a href="${BASE}pages/ksp.html" class="block px-4 py-2 hover:bg-green-50">Kurikulum Satuan Pendidikan (KSP)</a>
              <a href="${BASE}pages/rkjm.html" class="block px-4 py-2 hover:bg-green-50">Rencana Kerja Jangka Menengah (RKJM)</a>
              <a href="${BASE}pages/rkt.html" class="block px-4 py-2 hover:bg-green-50">Rencana Kerja Tahunan (RKT)</a>
              <a href="${BASE}pages/rkas.html" class="block px-4 py-2 hover:bg-green-50">RKAS</a>
              <a href="${BASE}pages/rapor-pendidikan.html" class="block px-4 py-2 hover:bg-green-50">Rapor Pendidikan Sekolah</a>
            </div>
          </div>
        </nav>
        <button id="mobileMenuBtn" class="lg:hidden p-2 rounded-full hover:bg-gray-100">
          <i class="fas fa-bars text-primary text-xl"></i>
        </button>
      </div>
    </div>
    <div id="mobileMenu" class="hidden lg:hidden bg-white border-t">
      <div class="container mx-auto px-4 py-3 space-y-1 text-sm">
        <a href="${BASE}index.html" class="block py-2 font-medium">Beranda</a>
        <a href="${BASE}pages/sejarah.html" class="block py-2">Sejarah</a>
        <a href="${BASE}pages/visi-misi.html" class="block py-2">Visi & Misi</a>
        <a href="${BASE}pages/ptk.html" class="block py-2">PTK</a>
        <a href="${BASE}pages/pengumuman.html" class="block py-2">Pengumuman</a>
        <a href="${BASE}pages/pendaftaran.html" class="block py-2 font-medium">Pendaftaran</a>
        <a href="${BASE}pages/buku-merdeka.html" class="block py-2">Perpustakaan Digital</a>
      </div>
    </div>
  </header>`;
}

function getFooterHTML() {
  return `
  <footer class="bg-dark text-gray-300 pt-12 pb-6 mt-12">
    <div class="container mx-auto px-4">
      <div class="grid md:grid-cols-4 gap-8 mb-8">
        <div>
          <h4 class="text-white font-semibold mb-4">Kontak Person & Alamat</h4>
          <p class="text-sm mb-2"><i class="fas fa-school mr-2 text-accent"></i> SMA Negeri 1 Tebing Tinggi</p>
          <p class="text-sm mb-2"><i class="fas fa-map-marker-alt mr-2 text-accent"></i> Jl. Pembangunan II, Selatpanjang Kota, Kec. Tebing Tinggi, Kab. Kepulauan Meranti, Riau 28753</p>
          <p class="text-sm mb-2"><i class="fas fa-phone mr-2 text-accent"></i> 0763-32418</p>
          <p class="text-sm"><i class="fas fa-envelope mr-2 text-accent"></i> sman1tt_selpa@yahoo.co.id</p>
        </div>
        <div>
          <h4 class="text-white font-semibold mb-4">Link Cepat</h4>
          <ul class="space-y-2 text-sm">
            <li><a href="${BASE}pages/pendaftaran.html" class="hover:text-accent">Pendaftaran Siswa Baru</a></li>
            <li><a href="${BASE}pages/pengumuman.html" class="hover:text-accent">Pengumuman</a></li>
            <li><a href="${BASE}pages/buku-merdeka.html" class="hover:text-accent">Perpustakaan Digital</a></li>
            <li><a href="${BASE}pages/ptk.html" class="hover:text-accent">Data PTK</a></li>
          </ul>
        </div>
        <div>
          <h4 class="text-white font-semibold mb-4">Link Resmi</h4>
          <ul class="space-y-2 text-sm">
            <li><a href="https://www.kemdikbud.go.id" target="_blank" class="hover:text-accent">Kemendikbudristek</a></li>
            <li><a href="https://dapo.kemdikbud.go.id" target="_blank" class="hover:text-accent">Dapodik</a></li>
            <li><a href="https://www.riau.go.id" target="_blank" class="hover:text-accent">Provinsi Riau</a></li>
            <li><a href="https://www.merantikab.go.id" target="_blank" class="hover:text-accent">Kab. Kepulauan Meranti</a></li>
          </ul>
        </div>
        <div>
          <h4 class="text-white font-semibold mb-4">Media Sosial</h4>
          <div class="flex gap-3">
            <a href="#" class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent hover:text-dark transition"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent hover:text-dark transition"><i class="fab fa-instagram"></i></a>
            <a href="#" class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent hover:text-dark transition"><i class="fab fa-youtube"></i></a>
          </div>
        </div>
      </div>
      <div class="border-t border-gray-700 pt-6 text-center text-sm">
        <p>&copy; 2025-2026 SMA Negeri 1 Tebing Tinggi. Semua hak dilindungi. | NPSN 10400816</p>
      </div>
    </div>
  </footer>`;
}

function initLayout(activePage = '') {
  const headerEl = document.getElementById('site-header');
  const footerEl = document.getElementById('site-footer');
  if (headerEl) headerEl.innerHTML = getHeaderHTML(activePage);
  if (footerEl) footerEl.innerHTML = getFooterHTML();

  // Mobile menu
  const btn = document.getElementById('mobileMenuBtn');
  const menu = document.getElementById('mobileMenu');
  if (btn && menu) {
    btn.addEventListener('click', () => menu.classList.toggle('hidden'));
  }
}
