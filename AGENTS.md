# AGENTS.md — WishPath.ai Current State

*Last updated: April 5, 2026 · v99*

## What This Is

AI-powered goal roadmap generator. Pay $4.99, describe any goal, get a personalized roadmap built with real-time web data and step-by-step actions. Free dashboard with AI coaching, notes, to-dos after purchase.

**Live:** https://wishpath.ai · **X:** @WishpathAI · **Repo:** jtdesign7277-source/wishpath-ai

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | Static HTML/CSS/JS — no build step, Cloudflare Pages auto-deploy from `main` |
| Backend | Supabase Edge Functions (Deno) — project `mszilrexlupzthauoaxb` |
| Auth | Supabase Auth — email/password only (no Google OAuth yet) |
| Payments | Stripe — $4.99 one-time roadmap, $19.99/mo Pro (webhook NOT wired) |
| AI Coach | Codex Opus 4 with web search tools |
| AI Roadmap | Codex Sonnet 4 |
| Email | Resend — currently sends from hello@rivalbriefs.com (needs domain change) |
| Analytics | Meta Pixel ID 2302108240316680 |
| Market Data | TradingView embeds, Alpaca, MarketAux + Redis caching |

---

## Files

| File | Purpose |
|------|---------|
| `dashboard.html` | THE app — 12,350-line monolith, all views/features (677KB) |
| `index.html` | Landing page — sells $4.99 roadmap |
| `success.html` | Post-purchase — polls for roadmap, renders, download |
| `login.html` | Email/password login + signup |
| `bonus.html` | $2.99 upsell page |
| `auth.js` | Shared Supabase auth helper |
| `_headers` | Cloudflare Pages custom headers |

---

## Dashboard Views

`dashboard.html` contains 10+ views: Home (mobile tiles), Life Coach (Opus 4 chat with web search), AI Coach (per-roadmap coaching with tab bar), My Wishes (saved roadmaps), Library (filterable table), Notes (swipe-to-delete, filters out `__WP_` internal notes), To-Dos, New Wish (in-dashboard generator), Financial Markets (Mag 7, crypto, TradingView, watchlists, chart studio), Command Centers, Feedback, News.

Mobile-first: safe areas, bottom nav, sticky inputs, `touch-action: manipulation`, responsive at 768px.

Streak celebration: canvas-confetti fireworks on black screen before app loads (localStorage streak counter).

---

## Payment Flows

**$4.99 Roadmap (working):** `index.html` → `wishpath-checkout` → Stripe → `wishpath-webhook` → Codex Sonnet generates roadmap → saves to `wishpath_orders` → emails via Resend → `success.html` polls and renders.

**$19.99/mo Pro (BROKEN):** Payment link works (`buy.stripe.com/00w4gB2OP7ZT8tm0a41ck08`), but webhook to flip `user_profiles.is_pro = true` is NOT implemented. Free tier: 3 AI messages then paywall modal.

**$2.99 Upsell:** `bonus.html` exists, status unclear.

---

## Database Tables

| Table | Purpose |
|-------|---------|
| `wishpath_orders` | Purchased roadmaps (wish, roadmap JSON, email, status) |
| `user_profiles` | Plan info (is_pro, agent_messages_used, wishes_remaining) |
| `user_wishes` | Saved roadmaps vault |
| `coach_conversations` | AI chat histories (messages JSONB, per wish_id) |
| `user_notes` | Notes + magic-prefix state (see below) |
| `user_todos` | To-do lists (title, items JSONB) |

**Magic-prefix notes (tech debt):** Portfolio (`__WP_PORTFOLIO__`), watchlists (`__WP_WATCHLIST__*`), charts (`__WP_CHART__*`), command centers (`__WP_CC__*`) stored as fake notes in `user_notes`.

---

## Edge Functions (WishPath Only)

**Core:** wishpath-generate, wishpath-webhook, wishpath-checkout, wishpath-admin, send-auth-email, wishpath-x-test

**Markets:** watchlist-quotes, quote, xray-quote, xray, stocks, stock-search, chart-candles, sparkline, latest-quote, bars, crypto-price, odds-events, alpaca-stream-auth

**Content:** chat, news, article-reader, feedback-notify, stripe-webhook

All have `verify_jwt: false` — zero server-side auth. Backend function source is split into the `rival-briefs` repo under `supabase/functions/`.

---

## Known Issues (Priority Order)

1. **Pro webhook not wired** — users pay $19.99 but is_pro never flips
2. **All edge functions have verify_jwt: false** — no server-side auth
3. **Email sends from rivalbriefs.com** — needs WishPath domain
4. **Stripe descriptor says "STRATIFY"** — change in Stripe dashboard
5. **12,350-line monolith** — dashboard.html is 677KB single file
6. **Magic-prefix notes** — portfolio/watchlist/chart state in user_notes
7. **No Google OAuth** — email/password only
8. **Client-side-only rate limiting** — easily bypassed
9. **15 Rival Briefs edge functions still deployed** — delete from Supabase dashboard

---

## Deploy Pipeline

1. Edit files → bump `APP_VERSION` in dashboard.html (localStorage cache buster)
2. `git push origin main` → Cloudflare Pages auto-deploys
3. Edge functions deployed separately via Supabase CLI or MCP

---

## Critical Rules

- **Never commit from sandbox** — edit files, give Jeff one add+commit+push command
- **Mobile-first** — iPhone width is the primary viewport
- **APP_VERSION** — bump on every deploy or users get stale cache
- **`__WP_` prefix notes** — always filter these from user-facing note lists
- **Supabase project** — `mszilrexlupzthauoaxb` (WishPath only, Rival Briefs cleaned out)
