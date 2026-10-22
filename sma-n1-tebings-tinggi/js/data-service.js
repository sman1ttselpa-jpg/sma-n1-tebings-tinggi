/**
 * Data Service Layer
 * Otomatis pakai Supabase jika dikonfigurasi, fallback ke localStorage
 */

let supabaseClient = null;

async function initSupabase() {
  if (!window.SUPABASE_CONFIG || !window.SUPABASE_CONFIG.USE_SUPABASE) {
    console.log('[DataService] Mode: localStorage (demo)');
    return null;
  }
  if (typeof supabase === 'undefined') {
    console.warn('[DataService] Supabase SDK belum dimuat. Pastikan script CDN ada.');
    return null;
  }
  try {
    supabaseClient = supabase.createClient(
      window.SUPABASE_CONFIG.url,
      window.SUPABASE_CONFIG.anonKey
    );
    console.log('[DataService] Mode: Supabase (cloud)');
    return supabaseClient;
  } catch (e) {
    console.error('[DataService] Gagal init Supabase:', e);
    return null;
  }
}

// ==================== CONTENTS ====================
async function getContents(category = null) {
  if (supabaseClient) {
    let query = supabaseClient.from('contents').select('*').eq('is_published', true).order('created_at', { ascending: false });
    if (category) query = query.eq('category', category);
    const { data, error } = await query;
    if (error) { console.error(error); return []; }
    return data || [];
  }
  // localStorage fallback
  let list = JSON.parse(localStorage.getItem('schoolContents') || '[]');
  if (category) list = list.filter(c => c.category === category);
  return list;
}

async function saveContent(item) {
  if (supabaseClient) {
    const { data, error } = await supabaseClient.from('contents').insert([{
      title: item.title,
      category: item.category,
      body: item.body,
      author: item.author || 'admin'
    }]).select();
    if (error) throw error;
    await addLog(`Menambah ${item.category}: "${item.title}"`);
    return data[0];
  }
  const list = JSON.parse(localStorage.getItem('schoolContents') || '[]');
  const newItem = { id: Date.now(), ...item, createdAt: new Date().toISOString(), author: 'admin' };
  list.unshift(newItem);
  localStorage.setItem('schoolContents', JSON.stringify(list));
  await addLog(`Menambah ${item.category}: "${item.title}"`);
  return newItem;
}

async function deleteContent(id) {
  if (supabaseClient) {
    const { error } = await supabaseClient.from('contents').delete().eq('id', id);
    if (error) throw error;
    await addLog('Menghapus konten ID ' + id);
    return;
  }
  let list = JSON.parse(localStorage.getItem('schoolContents') || '[]');
  list = list.filter(c => c.id !== id);
  localStorage.setItem('schoolContents', JSON.stringify(list));
  await addLog('Menghapus konten ID ' + id);
}

// ==================== PENDAFTARAN ====================
async function getPendaftaran() {
  if (supabaseClient) {
    const { data, error } = await supabaseClient.from('pendaftaran').select('*').order('submitted_at', { ascending: false });
    if (error) { console.error(error); return []; }
    return data || [];
  }
  return JSON.parse(localStorage.getItem('pendaftaran') || '[]');
}

async function submitPendaftaran(formData) {
  if (supabaseClient) {
    const { data, error } = await supabaseClient.from('pendaftaran').insert([{
      nama: formData.nama,
      nisn: formData.nisn,
      jk: formData.jk,
      tgl_lahir: formData.tgl_lahir,
      tempat_lahir: formData.tempat_lahir,
      hp: formData.hp,
      alamat: formData.alamat,
      asal_sekolah: formData.asal_sekolah,
      jurusan: formData.jurusan,
      nama_ortu: formData.nama_ortu,
      hp_ortu: formData.hp_ortu,
      status: 'Baru'
    }]).select();
    if (error) throw error;
    return data[0];
  }
  const list = JSON.parse(localStorage.getItem('pendaftaran') || '[]');
  const item = { ...formData, submittedAt: new Date().toISOString(), status: 'Baru' };
  list.unshift(item);
  localStorage.setItem('pendaftaran', JSON.stringify(list));
  return item;
}

// ==================== PENGUMUMAN ====================
async function getPengumuman() {
  if (supabaseClient) {
    const { data, error } = await supabaseClient.from('pengumuman').select('*').order('created_at', { ascending: false });
    if (error) return [];
    return data || [];
  }
  return JSON.parse(localStorage.getItem('pengumuman') || '[]');
}

async function savePengumuman(item) {
  if (supabaseClient) {
    const { data, error } = await supabaseClient.from('pengumuman').insert([{
      title: item.title,
      body: item.body,
      is_penting: item.is_penting || false
    }]).select();
    if (error) throw error;
    await addLog('Publikasi pengumuman: ' + item.title);
    return data[0];
  }
  const list = JSON.parse(localStorage.getItem('pengumuman') || '[]');
  const newItem = { id: Date.now(), ...item, createdAt: new Date().toISOString() };
  list.unshift(newItem);
  localStorage.setItem('pengumuman', JSON.stringify(list));
  await addLog('Publikasi pengumuman: ' + item.title);
  return newItem;
}

// ==================== LOG ====================
async function addLog(action, details = '') {
  if (supabaseClient) {
    await supabaseClient.from('activity_logs').insert([{
      user_name: 'admin',
      action,
      details
    }]);
    return;
  }
  const logs = JSON.parse(localStorage.getItem('activityLogs') || '[]');
  logs.unshift({ action, user: 'admin', time: new Date().toLocaleString('id-ID'), details });
  localStorage.setItem('activityLogs', JSON.stringify(logs.slice(0, 200)));
}

async function getLogs() {
  if (supabaseClient) {
    const { data, error } = await supabaseClient.from('activity_logs').select('*').order('created_at', { ascending: false }).limit(100);
    if (error) return [];
    return (data || []).map(l => ({
      action: l.action,
      user: l.user_name,
      time: new Date(l.created_at).toLocaleString('id-ID'),
      details: l.details
    }));
  }
  return JSON.parse(localStorage.getItem('activityLogs') || '[]');
}

// ==================== REALTIME (Supabase only) ====================
function subscribeRealtime(table, callback) {
  if (!supabaseClient) {
    console.log('[Realtime] Hanya tersedia saat Supabase aktif');
    return null;
  }
  const channel = supabaseClient
    .channel(`public:${table}`)
    .on('postgres_changes', { event: '*', schema: 'public', table }, payload => {
      console.log('[Realtime]', table, payload.eventType, payload);
      callback(payload);
    })
    .subscribe();
  return channel;
}

// Init saat script dimuat
window.DataService = {
  init: initSupabase,
  getContents,
  saveContent,
  deleteContent,
  getPendaftaran,
  submitPendaftaran,
  getPengumuman,
  savePengumuman,
  addLog,
  getLogs,
  subscribeRealtime,
  isCloud: () => !!supabaseClient
};
