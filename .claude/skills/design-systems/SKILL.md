# Design Systems Collection (from Awesome DESIGN.md)

A curated collection of real-world design systems extracted from top companies. Drop these into any UI prompt to build pixel-perfect interfaces that match the look and feel of industry leaders.

Source: [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md) — 54+ design systems

## How to Use

1. Read the design system file for the style you want to match
2. Reference the colors, typography, spacing, and component specs when building UI
3. Mix and match — use Kraken's purple palette with Linear's dark-mode depth system

## Available Design Systems

### Finance / Trading (Most Relevant for WishPath & Stratify)
- `systems/coinbase.md` — Clean crypto platform, Coinbase Blue (#0052ff), pill buttons, light/dark sections
- `systems/kraken.md` — Purple-branded crypto exchange, 12px radius buttons, Kraken Purple (#7132f5)
- `systems/revolut.md` — Billboard-scale fintech, pill buttons (9999px), zero shadows, Aeonik Pro font
- `systems/stripe.md` — Luxurious-yet-technical, Stripe Purple (#533afd), chromatic blue-tinted shadows

### Dark Theme / Modern UI
- `systems/linear.md` — Dark-mode-native, Inter Variable, semi-transparent borders, indigo accent (#5e6ad2)
- `systems/supabase.md` — Near-black backgrounds, emerald green accent (#3ecf8e), border-defined depth
- `systems/spotify.md` — Content-first darkness, Spotify Green (#1ed760), heavy shadows, pill buttons
- `systems/vercel.md` — Extreme minimalism, Geist Sans, shadow-as-border technique

### Premium / Brand
- `systems/superhuman.md` — Dramatic purple gradient hero, Super Sans VF, minimal decoration

## Quick Reference: Dark Trading App Palette

For WishPath/Stratify's dark trading UI, the most relevant systems are **Kraken** (already using their purple #7132F5), **Supabase** (dark-mode depth via borders), and **Linear** (opacity-based elevation). Key patterns:

- **Background layers**: #060d18 → #0f0f0f → #171717 → #1f1f1f
- **Borders not shadows**: rgba(255,255,255,0.05) to rgba(255,255,255,0.10)
- **Accent colors**: Purple for brand, green for positive/profit, red for negative/loss
- **Typography**: Tight line-heights (1.00) for display, relaxed (1.50) for body
- **Buttons**: Pill (9999px) for primary CTA, 8-12px for secondary
- **Spacing**: 8px base unit, 16-24px component gaps, 48-80px section gaps
