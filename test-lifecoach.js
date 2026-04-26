const { chromium } = require('playwright');

const BASE_URL = 'http://localhost:9876';

const MOCK_AUTH_JS = `
window._mockUser = { id: 'test-uid', email: 'test@wishpath.ai' };
window._mockSession = { user: window._mockUser, access_token: 'mock' };
function requireAuth() { return Promise.resolve(window._mockSession); }
function getUser() { return Promise.resolve(window._mockUser); }
function getSession() { return Promise.resolve(window._mockSession); }
function getUserProfile() { return Promise.resolve({ plan: 'pro', is_pro: true }); }
function getUserWishes() { return Promise.resolve([
  { id: 'wish-1', wish_title: 'Test Wish', wish_summary: 'Test',
    roadmap_data: { title: 'Test', summary: 'Test', phases: [], quickWins: [] },
    generated_at: new Date().toISOString() }
]); }
function getSupabase() {
  const chain = () => {
    const q = {};
    q.select = () => chain();
    q.insert = () => ({ select: () => ({ single: () => Promise.resolve({ data:{id:'new-id'}, error:null }) }) });
    q.update = () => ({ eq: () => Promise.resolve({ data:null, error:null }) });
    q.delete = () => ({ eq: () => Promise.resolve({ data:null, error:null }) });
    q.eq = () => chain();
    q.order = () => chain();
    q.limit = () => chain();
    q.single = () => Promise.resolve({ data:null, error:null });
    q.not = () => chain();
    q.or = () => chain();
    q.then = (fn) => Promise.resolve({ data:[], error:null }).then(fn);
    return q;
  };
  return { from: () => chain(), auth: { getSession: () => Promise.resolve({ data:{ session: window._mockSession } }) } };
}
`;

(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  
  await page.route('**/auth.js', route => route.fulfill({ contentType:'application/javascript', body: MOCK_AUTH_JS }));
  await page.route('**/@supabase/**', route => route.fulfill({ contentType:'application/javascript', body:'// mocked' }));

  await page.goto(`${BASE_URL}/dashboard.html`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(2500);

  // Try to open Life Coach via the function
  console.log('Opening Life Coach...');
  await page.evaluate(() => {
    if (typeof openLifeCoachView === 'function') {
      openLifeCoachView();
    }
  });

  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'desktop-audit-shots/lifecoach-desktop.png', fullPage: true });
  
  console.log('Screenshot saved');
  await browser.close();
})();
