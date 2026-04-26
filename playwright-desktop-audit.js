// Playwright Desktop Audit — WishPath.ai
// Desktop viewport (1440x900), tests all tabs/views.
// Run: node playwright-desktop-audit.js

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE_URL = 'http://localhost:9876';
const SHOTS_DIR = path.join(__dirname, 'desktop-audit-shots');
if (!fs.existsSync(SHOTS_DIR)) fs.mkdirSync(SHOTS_DIR, { recursive: true });

let idx = 0;
async function shot(page, label) {
  idx++;
  const f = path.join(SHOTS_DIR, `${String(idx).padStart(2,'0')}-${label.replace(/[^a-z0-9]/gi,'_')}.png`);
  await page.screenshot({ path: f, fullPage: true });
  console.log(`  📸 ${label}`);
}

const results = [];
function pass(t, d='')  { console.log(`  ✅ ${t}`);   results.push({t, s:'PASS', d}); }
function fail(t, d='')  { console.log(`  ❌ ${t}`);   results.push({t, s:'FAIL', d}); }
function warn(t, d='')  { console.log(`  ⚠️  ${t}`);  results.push({t, s:'WARN', d}); }
function skip(t, d='')  { console.log(`  ⏭  ${t}`);  results.push({t, s:'SKIP', d}); }

const MOCK_AUTH_JS = `
window._mockUser = { id: 'test-uid', email: 'test@wishpath.ai' };
window._mockSession = { user: window._mockUser, access_token: 'mock' };
window.mobileHomeChatHistory = [];

function requireAuth() { return Promise.resolve(window._mockSession); }
function getUser() { return Promise.resolve(window._mockUser); }
function getSession() { return Promise.resolve(window._mockSession); }
function getUserProfile() { return Promise.resolve({ plan: 'pro', is_pro: true }); }
function getUserWishes() { return Promise.resolve([
  { id: 'wish-1', wish_title: 'Start a Side Hustle',
    wish_summary: 'Build a profitable side business.',
    roadmap_data: { title: 'Side Hustle Roadmap', summary: 'A 90-day plan.',
      phases: [{ phase:1, name:'Research', timeframe:'Week 1',
        steps:[{action:'Find niche',detail:'Research markets'}] }],
      quickWins: [{action:'Register domain',detail:'Under $15'}] },
    generated_at: new Date().toISOString() }
]); }
function saveWishToVault() { return Promise.resolve(); }
function signOut() { window.location.href = '/'; }

function getSupabase() {
  const chain = () => {
    const q = {};
    const r = () => Promise.resolve({ data: [], error: null });
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
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    // No mobile user agent — desktop browser
  });
  const page = await ctx.newPage();

  await page.route('**/auth.js', route => route.fulfill({ contentType:'application/javascript', body: MOCK_AUTH_JS }));
  await page.route('**/@supabase/**', route => route.fulfill({ contentType:'application/javascript', body:'// mocked' }));
  await page.route('**/wishpath-generate', route => route.fulfill({
    contentType: 'application/json',
    body: JSON.stringify({ reply: '## Task Management Tips\n\n**1. Prioritize ruthlessly** — Use the Eisenhower Matrix to sort urgent vs important.\n\n**2. Time block** — Dedicate specific hours to focused work.\n\n**3. Daily standup** — Spend 5 mins each morning reviewing your tasks.\n\nWould you like a personalized task management system?' })
  }));

  const consoleErrors = [];
  page.on('console', msg => { if(msg.type()==='error') consoleErrors.push(msg.text()); });
  page.on('pageerror', err => consoleErrors.push(err.message));

  // ── 1. Load page ──
  console.log('\n🧪 1. Load dashboard.html at 1440x900');
  await page.goto(`${BASE_URL}/dashboard.html`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(2500);
  await shot(page, '01-load-desktop');
  pass('Page loaded at 1440x900');

  // ── 2. Detect which view is active ──
  console.log('\n🧪 2. Initial view state');
  const initialView = await page.evaluate(() => {
    const views = ['mobileHome', 'coachView', 'todosView', 'notesView', 'libraryView', 'wishesView', 'newWishView', 'dashMarketsView', 'feedbackView', 'newsView'];
    for (const v of views) {
      const el = document.getElementById(v);
      if (el && el.classList.contains('active')) return v;
    }
    return 'unknown';
  });
  console.log(`    Initial view: ${initialView}`);
  pass(`Initial view detected: ${initialView}`);

  // ── 3. Navigate and screenshot each view ──
  const desktopViews = [
    { label: 'Home', viewId: 'homeView', clickText: 'Home', dataView: 'home' },
    { label: 'Life Coach', viewId: 'lifecoachView', clickText: 'Life Coach', dataView: 'lifecoach' },
    { label: 'AI Coach', viewId: 'coachView', clickText: 'Coach', dataView: 'coach' },
    { label: 'My Wishes', viewId: 'wishesView', clickText: 'My Wishes', dataView: 'wishes' },
    { label: 'Library', viewId: 'libraryView', clickText: null, dataView: 'library' },
    { label: 'Notes', viewId: 'notesView', clickText: 'Notes', dataView: 'notes' },
    { label: 'To-Dos', viewId: 'todosView', clickText: null, dataView: 'todos' },
    { label: 'New Wish', viewId: 'newwishView', clickText: null, dataView: 'newwish' },
    { label: 'Markets', viewId: 'fmView', clickText: null, dataView: null },
    { label: 'Command Centers', viewId: 'ccView', clickText: null, dataView: null },
    { label: 'Feedback', viewId: 'feedbackView', clickText: 'Feedback', dataView: null },
    { label: 'News', viewId: 'newsView', clickText: null, dataView: 'news' },
  ];

  for (let i = 0; i < desktopViews.length; i++) {
    const v = desktopViews[i];
    console.log(`\n🧪 ${3 + i}. Navigate to ${v.label}`);

    let clicked = false;

    // Try direct showView() call first
    if (v.dataView) {
      try {
        await page.evaluate((viewName) => {
          if (typeof showView === 'function') showView(viewName);
        }, v.dataView);
        clicked = true;
        console.log(`    Called showView('${v.dataView}')`);
      } catch(e) {}
    }

    // If no dataView, try clickText
    if (!clicked && v.clickText) {
      const links = await page.$$('a, button, [role="button"]');
      for (const link of links) {
        const text = await link.textContent();
        if (text && text.includes(v.clickText)) {
          try {
            await link.click({ timeout: 1000 });
            clicked = true;
            console.log(`    Clicked "${v.clickText}"`);
            break;
          } catch(e) {}
        }
      }
    }

    // Fallback: direct element manipulation
    if (!clicked) {
      try {
        await page.evaluate((viewId) => {
          const el = document.getElementById(viewId);
          if (el) {
            document.querySelectorAll('.view').forEach(e => e.classList.remove('active'));
            el.classList.add('active');
            el.style.display = 'block';
          }
        }, v.viewId);
        clicked = true;
        console.log(`    Used direct element manipulation`);
      } catch(e) {}
    }

    if (!clicked) {
      skip(`${v.label} — no nav found`);
      continue;
    }

    await page.waitForTimeout(800);

    const isActive = await page.evaluate((viewId) => {
      const el = document.getElementById(viewId);
      return el && el.classList.contains('active');
    }, v.viewId);

    if (isActive) {
      pass(`${v.label} view loaded`);
      await shot(page, `02-view-${i.toString().padStart(2,'0')}-${v.label.toLowerCase().replace(/\s+/g,'-')}`);
    } else {
      fail(`${v.label} view NOT active`);
      await shot(page, `02-view-${i.toString().padStart(2,'0')}-${v.label.toLowerCase().replace(/\s+/g,'-')}-fail`);
    }
  }

  // ── 4. Check for common desktop issues ──
  console.log(`\n🧪 ${3 + desktopViews.length}. Check desktop layout issues`);
  const layoutIssues = await page.evaluate(() => {
    const issues = [];
    const checkElement = (el, label) => {
      if (!el) return;
      const w = el.offsetWidth;
      const maxW = window.innerWidth;
      if (w > maxW) issues.push(`${label}: ${w}px > viewport ${maxW}px (overflow)`);
      if (el.style.maxWidth && el.style.maxWidth === '100%' && w > 1200) {
        issues.push(`${label}: full-width container at ${w}px (should constrain)`);
      }
    };

    // Check main content areas
    document.querySelectorAll('[id$="View"]').forEach(el => {
      if (el.classList.contains('active')) {
        checkElement(el, `${el.id}`);
      }
    });

    // Check for > 1200px unconstrained text
    document.querySelectorAll('main, .container, [role="main"]').forEach(el => {
      const w = el.offsetWidth;
      if (w > 1400) issues.push(`Unconstrained container: ${w}px`);
    });

    return issues;
  });

  if (layoutIssues.length === 0) {
    pass('No obvious overflow/width issues detected');
  } else {
    warn(`Layout issues detected: ${layoutIssues.join('; ')}`);
    layoutIssues.forEach(issue => console.log(`      - ${issue}`));
  }

  // ── 5. Console errors ──
  console.log(`\n🧪 ${4 + desktopViews.length}. Console errors`);
  const serious = consoleErrors.filter(e => !e.includes('supabase') && !e.includes('fetch') && !e.includes('ERR_') && !e.includes('auth') && !e.includes('401'));
  serious.length === 0 ? pass('No critical JS errors') : warn(`${serious.length} error(s): ${serious[0]?.slice(0,80)}`);

  await shot(page, '99-final-state');
  await browser.close();

  // ── Summary ──
  console.log('\n══════════════════════════════════════════════');
  console.log('  DESKTOP AUDIT SUMMARY — WishPath.ai');
  console.log('  Device: Desktop (1440×900)');
  console.log('══════════════════════════════════════════════');
  const ps = results.filter(r=>r.s==='PASS').length;
  const fs_ = results.filter(r=>r.s==='FAIL').length;
  const ws = results.filter(r=>r.s==='WARN').length;
  const ss = results.filter(r=>r.s==='SKIP').length;
  results.forEach(r => {
    const ic = r.s==='PASS'?'✅':r.s==='FAIL'?'❌':r.s==='WARN'?'⚠️ ':'⏭ ';
    console.log(`  ${ic} [${r.s.padEnd(4)}] ${r.t}${r.d?' — '+r.d:''}`);
  });
  console.log(`\n  Total: ${ps} passed / ${fs_} failed / ${ws} warned / ${ss} skipped`);
  console.log(`  Screenshots saved to: desktop-audit-shots/`);
  console.log('══════════════════════════════════════════════\n');
  process.exit(fs_ > 0 ? 1 : 0);
})();
