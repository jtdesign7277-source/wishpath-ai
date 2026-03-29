// WishPath Auth Helper
const SUPABASE_URL = 'https://mszilrexlupzthauoaxb.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zemlscmV4bHVwenRoYXVvYXhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkzMTU3ODksImV4cCI6MjA4NDg5MTc4OX0.zgkl2tTTVXZax_jjT4SAGhl4ILsS__g1qpZUtPOWCaI';

let _supabase = null;

function getSupabase() {
  if (!_supabase) {
    _supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
  return _supabase;
}

async function getSession() {
  const { data } = await getSupabase().auth.getSession();
  return data.session;
}

async function getUser() {
  const session = await getSession();
  return session ? session.user : null;
}

async function signUp(email, password, displayName) {
  const sb = getSupabase();
  const { data, error } = await sb.auth.signUp({ email, password });
  if (error) throw error;
  if (data.user) {
    await sb.from('user_profiles').insert({
      id: data.user.id,
      display_name: displayName || email.split('@')[0],
      plan: 'free',
      wishes_remaining: 0,
    });
  }
  return data;
}

async function signIn(email, password) {
  const { data, error } = await getSupabase().auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

async function signOut() {
  await getSupabase().auth.signOut();
  window.location.href = '/login.html';
}

async function requireAuth() {
  const session = await getSession();
  if (!session) {
    window.location.href = '/login.html?redirect=' + encodeURIComponent(window.location.pathname);
    return null;
  }
  return session;
}

async function saveWishToVault(userId, sessionId, roadmap, wish) {
  const { error } = await getSupabase().from('user_wishes').insert({
    user_id: userId,
    stripe_checkout_session_id: sessionId,
    wish_title: roadmap.title || wish.substring(0, 80),
    wish_summary: roadmap.summary || wish,
    roadmap_data: roadmap,
  });
  return !error;
}

async function getUserWishes() {
  const { data, error } = await getSupabase()
    .from('user_wishes')
    .select('*')
    .order('generated_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

async function getUserProfile() {
  const user = await getUser();
  if (!user) return null;
  const { data } = await getSupabase()
    .from('user_profiles')
    .select('*')
    .eq('id', user.id)
    .single();
  return data;
}

function showToast(msg, type) {
  var t = document.createElement('div');
  t.textContent = msg;
  var bg = type === 'error' ? 'rgba(239,68,68,0.95)' : 'rgba(0,201,167,0.95)';
  Object.assign(t.style, {
    position: 'fixed', bottom: '80px', left: '50%', transform: 'translateX(-50%)',
    background: bg, color: '#fff', padding: '12px 24px',
    borderRadius: '99px', fontSize: '0.9rem', fontWeight: '600',
    zIndex: '9999', whiteSpace: 'nowrap', boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
  });
  document.body.appendChild(t);
  setTimeout(function() { t.style.opacity = '0'; t.style.transition = 'opacity 0.4s'; setTimeout(function() { t.remove(); }, 400); }, 3000);
}
