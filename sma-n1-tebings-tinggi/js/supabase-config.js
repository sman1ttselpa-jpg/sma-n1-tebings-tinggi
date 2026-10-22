/**
 * Konfigurasi Supabase - SMA Negeri 1 Tebing Tinggi
 * Project sudah dihubungkan.
 */

const SUPABASE_CONFIG = {
  // Base URL project (tanpa /rest/v1/)
  url: 'https://cgpuhgeslniuamuvvgsm.supabase.co',

  // Anon / publishable key
  anonKey: 'sb_publishable_BcPUw3--sbaydZ0rteGXDA_wo7ryr4j',

  // Aktifkan koneksi cloud
  USE_SUPABASE: true
};

window.SUPABASE_CONFIG = SUPABASE_CONFIG;
