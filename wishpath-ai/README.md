# WishPath.ai

**One Wish. One Click. Your Perfect Path — $4.99.**

WishPath.ai generates custom, AI-powered goal roadmaps for any life situation. Describe your goal, pay once, get a beautiful PDF roadmap delivered instantly — no subscription, no fluff.

## What It Does

- User describes a goal (side hustle, career switch, travel, fitness, finance, etc.)
- Pays $4.99 via Stripe (Apple Pay / Google Pay supported)
- Receives a personalized, research-backed, phase-by-phase roadmap as a PDF + email

## Stack

- Frontend: Vanilla HTML/CSS/JS (single file, no build step)
- Payments: Stripe Payment Links / Checkout
- AI Backend: Claude API (goal analysis + roadmap generation)
- Email delivery: TBD (Resend / SendGrid)

## Setup

1. Replace `STRIPE_PAYMENT_LINK` in `index.html` with your actual Stripe Payment Link
2. Deploy `index.html` to any static host (Vercel, Netlify, Cloudflare Pages)
3. Wire up a serverless function to handle post-payment webhook → AI generation → PDF → email

## Project Structure

```
wishpath-ai/
├── index.html       # Landing page (single-file, no build step)
└── README.md
```
