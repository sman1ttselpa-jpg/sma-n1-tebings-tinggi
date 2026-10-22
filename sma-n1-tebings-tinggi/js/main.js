// Main JavaScript for SMA N1 Tebing Tinggi Website

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Search Overlay
  const searchBtn = document.getElementById('searchBtn');
  const searchOverlay = document.getElementById('searchOverlay');
  const closeSearch = document.getElementById('closeSearch');
  const searchInput = document.getElementById('searchInput');

  if (searchBtn && searchOverlay) {
    searchBtn.addEventListener('click', () => {
      searchOverlay.classList.remove('hidden');
      searchOverlay.classList.add('flex');
      searchInput?.focus();
    });
  }
  if (closeSearch) {
    closeSearch.addEventListener('click', () => {
      searchOverlay.classList.add('hidden');
      searchOverlay.classList.remove('flex');
    });
  }
  // Close on outside click
  searchOverlay?.addEventListener('click', (e) => {
    if (e.target === searchOverlay) {
      searchOverlay.classList.add('hidden');
      searchOverlay.classList.remove('flex');
    }
  });

  // Simple client-side search (demo)
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase();
      const results = document.getElementById('searchResults');
      if (!results) return;
      if (q.length < 2) {
        results.innerHTML = '';
        return;
      }
      // Demo data
      const items = [
        { title: 'Jadwal Ujian Tengah Semester', type: 'Pengumuman', url: 'pages/pengumuman.html' },
        { title: 'Kegiatan Upacara Hari Sumpah Pemuda', type: 'Berita', url: 'pages/berita-kegiatan.html' },
        { title: 'Visi dan Misi Sekolah', type: 'Profil', url: 'pages/visi-misi.html' },
        { title: 'Pendaftaran Siswa Baru', type: 'PMB', url: 'pages/pendaftaran.html' },
        { title: 'Buku Teks Kurikulum Merdeka', type: 'Perpustakaan', url: 'pages/buku-merdeka.html' }
      ];
      const filtered = items.filter(i => i.title.toLowerCase().includes(q));
      results.innerHTML = filtered.length
        ? filtered.map(i => `<a href="${i.url}" class="block p-2 hover:bg-green-50 rounded"><span class="text-xs text-gray-500">${i.type}</span><br>${i.title}</a>`).join('')
        : '<p class="text-gray-500 p-2">Tidak ditemukan</p>';
    });
  }

  // Real-time notification simulation (for demo)
  // In production, connect to WebSocket / Supabase Realtime / Firebase
  function showNotification(message) {
    const notif = document.createElement('div');
    notif.className = 'fixed bottom-4 right-4 bg-primary text-white px-5 py-3 rounded-lg shadow-lg z-50 flex items-center gap-3 animate-pulse';
    notif.innerHTML = `<i class="fas fa-bell"></i> <span>${message}</span>`;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 4000);
  }

  // Demo: show a notification after 5 seconds
  // setTimeout(() => showNotification('Ada pengumuman baru dari Admin!'), 5000);
});
