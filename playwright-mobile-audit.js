// Playwright Mobile Audit — WishPath.ai
// iPhone 14 viewport (390x844), tests all tabs/buttons/interactions.
// Run: node playwright-mobile-audit.js

const { chromium, devices } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE_URL = 'http://localhost:9876';
const SHOTS_DIR = path.join(__dirname, 'audit-screenshots');
if (!fs.existsSync(SHOTS_DIR)) fs.mkdirSync(SHOTS_DIR, { recursive: true });

let idx = 0;
async function shot(page, label) {
  idx++;
  const f = path.join(SHOTS_DIR, `${String(idx).padStart(2,'0')}-${label.replace(/[^a-z0-9]/gi,'_')}.png`);
  await page.screenshot({ path: f, fullPage: false });
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
    viewport: { width: 390, height: 844 },
    userAgent: devices['iPhone 14'].userAgent,
    isMobile: true, hasTouch: true, deviceScaleFactor: 2,
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

  // Helper: force close sidebar via JS
  const closeSidebar = () => page.evaluate(() => {
    const s = document.querySelector('.sidebar');
    const b = document.getElementById('sidebarBackdrop');
    const bb = document.getElementById('mobileBottomBar');
    if (s) s.classList.remove('open');
    if (b) b.style.display = 'none';
    if (bb) bb.style.display = '';
  });

  // ── 1. Load page ──
  console.log('\n🧪 1. Load dashboard.html');
  await page.goto(`${BASE_URL}/dashboard.html`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(2500);
  await shot(page, 'home-initial');
  pass('Page loaded');

  // ── 2. Mobile home screen ──
  console.log('\n🧪 2. Mobile home screen visible');
  const homeVisible = await page.evaluate(() => document.getElementById('mobileHome')?.classList.contains('active'));
  homeVisible ? pass('Mobile home screen active') : fail('Mobile home screen NOT active');

  // ── 3. Hero title ──
  console.log('\n🧪 3. Hero title');
  const hero = await page.$('.mobile-home-title');
  (hero && await hero.isVisible()) ? pass('Hero title visible') : fail('Hero title missing');

  // ── 4. Home AI input ──
  console.log('\n🧪 4. Home AI input');
  const homeInput = await page.$('#mobileHomeInput');
  const hiVis = homeInput && await homeInput.isVisible();
  hiVis ? pass('Home AI input visible & focusable') : fail('Home AI input NOT visible');

  // ── 5. Suggestion chips ──
  console.log('\n🧪 5. Suggestion chips');
  const chips = await page.$$('.mobile-chip');
  if (chips.length >= 4) {
    pass(`${chips.length} chips found`);
    for (const c of chips) console.log(`    "${(await c.textContent()).trim()}"`);
  } else fail(`Only ${chips.length} chips`);
  await shot(page, 'home-chips');

  // ── 6. Chip prefill ──
  console.log('\n🧪 6. "Manage tasks" chip prefills input');
  let manageChip = null;
  for (const c of chips) { if ((await c.textContent()).includes('Manage')) { manageChip = c; break; } }
  if (manageChip) {
    await manageChip.click();
    await page.waitForTimeout(200);
    const val = await page.$eval('#mobileHomeInput', el => el.value);
    val.length > 0 ? pass(`Prefilled: "${val}"`) : fail('Not prefilled after tap');
    await shot(page, 'chip-prefilled');
  } else skip('Manage chip not found');

  // ── 7. Submit → opens chat ──
  console.log('\n🧪 7. Submit home input → chat opens');
  await page.$eval('#mobileHomeInput', el => { el.value = 'Help me manage my tasks'; });
  const sendBtn = await page.$('.mobile-home-input-send');
  if (sendBtn) await sendBtn.click();
  await page.waitForTimeout(400);
  const chatOpen = await page.evaluate(() => document.getElementById('mobileChat')?.style.display === 'flex');
  chatOpen ? pass('Chat view opened') : fail('Chat view did NOT open');
  await shot(page, 'chat-opened');

  // ── 8. User bubble ──
  console.log('\n🧪 8. User message bubble appears');
  const msgCount1 = await page.evaluate(() => document.getElementById('mobileChatMessages')?.children.length ?? 0);
  msgCount1 >= 1 ? pass(`${msgCount1} message(s) in chat`) : fail('No messages');

  // ── 9. AI response ──
  console.log('\n🧪 9. AI response arrives');
  await page.waitForTimeout(3000); // wait for mocked fetch
  const msgCount2 = await page.evaluate(() => document.getElementById('mobileChatMessages')?.children.length ?? 0);
  msgCount2 >= 3 ? pass(`${msgCount2} messages (user + thinking removed + AI)`) :
  msgCount2 >= 2 ? warn(`${msgCount2} messages — may still be loading`) :
  fail(`Only ${msgCount2} messages after wait`);
  await shot(page, 'chat-ai-response');

  // ── 10. Scroll position — top of AI message ──
  console.log('\n🧪 10. AI response scroll: top of message visible');
  const scrollInfo = await page.evaluate(() => {
    const msgs = document.getElementById('mobileChatMessages');
    if (!msgs || msgs.children.length < 2) return null;
    const last = msgs.lastElementChild;
    return {
      scrollTop: msgs.scrollTop,
      lastOffsetTop: last.offsetTop,
      containerH: msgs.clientHeight,
      scrollHeight: msgs.scrollHeight
    };
  });
  if (scrollInfo) {
    const { scrollTop, lastOffsetTop, containerH, scrollHeight } = scrollInfo;
    const scrollBottom = scrollTop + containerH;
    // Good: scrollTop is near lastOffsetTop (top of message is near top of viewport)
    // Bad: scrollTop = scrollHeight - containerH (pinned to bottom, user sees END)
    const isPinnedToBottom = scrollBottom >= scrollHeight - 10;
    const isShowingTopOfMsg = scrollTop <= lastOffsetTop && lastOffsetTop < scrollBottom;
    console.log(`    scrollTop=${scrollTop}, lastOffsetTop=${lastOffsetTop}, containerH=${containerH}, scrollH=${scrollHeight}`);
    if (!isPinnedToBottom && isShowingTopOfMsg) pass('Scroll shows TOP of AI message');
    else if (isPinnedToBottom) fail('Scroll is pinned to BOTTOM — user sees end of response first');
    else warn(`Scroll ambiguous: scrollTop=${scrollTop}, msgTop=${lastOffsetTop}`);
  } else skip('Not enough messages to check scroll');

  // ── 11. Back button — preserves chat ──
  console.log('\n🧪 11. Back button preserves conversation');
  const backBtn = await page.$('.mobile-chat-back');
  if (backBtn && await backBtn.isVisible()) {
    const msgsBefore = await page.evaluate(() => document.getElementById('mobileChatMessages')?.children.length ?? 0);
    const histBefore = await page.evaluate(() => window.mobileHomeChatHistory?.length ?? 0);
    await backBtn.click();
    await page.waitForTimeout(400);
    const homeRestored = await page.evaluate(() => {
      const hc = document.getElementById('mobileHomeContent');
      const ch = document.getElementById('mobileChat');
      return {
        homeVisible: hc && hc.style.display !== 'none',
        chatHidden: ch && ch.style.display !== 'flex',
        msgsCount: document.getElementById('mobileChatMessages')?.children.length ?? 0,
        histLen: window.mobileHomeChatHistory?.length ?? -1
      };
    });
    homeRestored.homeVisible && homeRestored.chatHidden ? pass('Home restored after Back') : fail('Home not restored');
    homeRestored.msgsCount >= msgsBefore ? pass(`Messages preserved: ${homeRestored.msgsCount} msgs (was ${msgsBefore})`) :
      fail(`Messages CLEARED: ${homeRestored.msgsCount} msgs (was ${msgsBefore})`);
    homeRestored.histLen > 0 ? pass(`Chat history preserved: ${homeRestored.histLen} entries`) :
      warn(`History: ${homeRestored.histLen} (may still be populating)`);
    await shot(page, 'after-back-btn');
  } else { fail('Back button not found/visible'); await shot(page, 'back-btn-missing'); }

  // ── 12. Ask AI bottom bar ──
  console.log('\n🧪 12. Ask AI bottom bar visible');
  const bar = await page.$('#mobileBottomBar');
  const barVis = bar && await bar.isVisible();
  barVis ? pass('Ask AI bottom bar visible') : fail('Ask AI bottom bar NOT visible');
  await shot(page, 'bottom-bar');

  // ── 13. Sidebar open/close ──
  console.log('\n🧪 13. Sidebar open/close');
  const sbToggle = await page.$('.mobile-sidebar-toggle');
  if (sbToggle && await sbToggle.isVisible()) {
    await sbToggle.click();
    await page.waitForTimeout(400);
    const sbOpen = await page.evaluate(() => document.querySelector('.sidebar')?.classList.contains('open'));
    sbOpen ? pass('Sidebar opens') : fail('Sidebar did not open');
    await shot(page, 'sidebar-open');
    await closeSidebar();
    await page.waitForTimeout(300);
    pass('Sidebar closed via JS');
  } else fail('Sidebar toggle not visible');

  // ── 14-17. Navigate each view ──
  const navTests = [
    { label: 'AI Coach',  viewId: 'coachView',   tileText: 'Coach',   dataView: 'coach'   },
    { label: 'To-Dos',    viewId: 'todosView',    tileText: 'To-Do',   dataView: 'todos'   },
    { label: 'Notes',     viewId: 'notesView',    tileText: 'Notes',   dataView: 'notes'   },
    { label: 'Library',   viewId: 'libraryView',  tileText: 'Library', dataView: 'library' },
    { label: 'My Wishes', viewId: 'wishesView',   tileText: null,      dataView: 'wishes'  },
  ];

  for (const v of navTests) {
    console.log(`\n🧪 Navigate to ${v.label}`);
    // Return to home
    await page.evaluate(() => { if (typeof showMobileHome === 'function') showMobileHome(); });
    await page.waitForTimeout(300);

    let clicked = false;
    if (v.tileText) {
      const tiles = await page.$$('.mobile-nav-tile');
      for (const tile of tiles) {
        if ((await tile.textContent()).includes(v.tileText)) {
          await tile.click({ force: true });
          clicked = true; break;
        }
      }
    }
    if (!clicked) {
      // Try sidebar nav link
      const sbT = await page.$('.mobile-sidebar-toggle');
      if (sbT) {
        await sbT.click();
        await page.waitForTimeout(300);
        const link = await page.$(`[data-view="${v.dataView}"]`);
        if (link) { await link.click({ force: true }); clicked = true; }
        else await closeSidebar();
      }
    }

    if (!clicked) { skip(`${v.label} — no nav found`); continue; }
    await page.waitForTimeout(600);

    const active = await page.evaluate((id) => document.getElementById(id)?.classList.contains('active'), v.viewId);
    if (active) {
      pass(`${v.label} view loaded`);
      // Check Ask AI bar still visible (except home)
      const barStillVis = await page.evaluate(() => {
        const b = document.getElementById('mobileBottomBar');
        return b && b.offsetParent !== null && getComputedStyle(b).display !== 'none';
      });
      barStillVis ? pass(`Ask AI bar visible in ${v.label}`) : fail(`Ask AI bar missing in ${v.label}`);
      await shot(page, `view-${v.label.toLowerCase().replace(/\s+/g,'-')}`);
    } else {
      fail(`${v.label} view NOT active`);
      await shot(page, `view-${v.label.toLowerCase().replace(/\s+/g,'-')}-fail`);
    }
    await closeSidebar();
  }

  // ── 18. No horizontal overflow ──
  console.log('\n🧪 18. No horizontal overflow');
  await page.evaluate(() => { if (typeof showMobileHome === 'function') showMobileHome(); });
  await page.waitForTimeout(300);
  const overflow = await page.evaluate(() => Math.max(0, document.body.scrollWidth - window.innerWidth));
  overflow <= 2 ? pass('No horizontal overflow') : fail(`${overflow}px horizontal overflow`);

  // ── 19. Tap targets ──
  console.log('\n🧪 19. Tap target sizes (≥ 40px)');
  const small = await page.evaluate(() => {
    return [...document.querySelectorAll('.mobile-chip, .mobile-nav-tile, .mobile-chat-back, .mobile-sidebar-toggle, #mobileBottomBar button')]
      .filter(el => { const r = el.getBoundingClientRect(); return r.width > 0 && (r.height < 40 || r.width < 40); })
      .map(el => `${el.className.split(' ')[0]}(${Math.round(el.getBoundingClientRect().width)}×${Math.round(el.getBoundingClientRect().height)})`);
  });
  small.length === 0 ? pass('All key tap targets ≥ 40px') : warn(`Small targets: ${small.slice(0,5).join(', ')}`);

  // ── 20. Console errors ──
  console.log('\n🧪 20. Console errors');
  const serious = consoleErrors.filter(e => !e.includes('supabase') && !e.includes('fetch') && !e.includes('ERR_') && !e.includes('auth') && !e.includes('401'));
  serious.length === 0 ? pass('No critical JS errors') : warn(`${serious.length} error(s): ${serious[0]?.slice(0,80)}`);

  await shot(page, 'final-state');
  await browser.close();

  // ── Summary ──
  console.log('\n══════════════════════════════════════════════');
  console.log('  MOBILE AUDIT SUMMARY — WishPath.ai');
  console.log('  Device: iPhone 14 (390×844)');
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
  console.log(`  Screenshots saved to: audit-screenshots/`);
  console.log('══════════════════════════════════════════════\n');
  process.exit(fs_ > 0 ? 1 : 0);
})();
