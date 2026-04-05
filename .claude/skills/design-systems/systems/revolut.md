# Design System: Revolut

## 1. Visual Theme & Atmosphere

Massive typography, generous whitespace, disciplined neutral palette. Aeonik Pro at 136px weight 500. All buttons use 9999px pill radius. Zero shadows — depth via color contrast only.

- Aeonik Pro 136px weight 500 with -2.72px tracking
- Near-black + white binary with semantic tokens
- Universal pill buttons (9999px radius, 14px 32px padding)
- Inter body text with positive letter-spacing (+0.16px to +0.24px)
- Zero shadows — flat by design

## 2. Color Palette

| Role | Color | Hex |
|------|-------|-----|
| Primary Dark | Revolut Dark | #191c1f |
| Primary Light | Pure White | #ffffff |
| Secondary Surface | Light | #f4f4f4 |
| Brand Blue | Revolut Blue | #494fdf |
| Action Blue | Interactive | #4f55f1 |
| Danger | Red | #e23b4a |
| Deep Pink | Accent | #e61e49 |
| Warning | Orange | #ec7e00 |
| Success | Teal | #00a87e |
| Secondary Text | Mid Slate | #505a63 |
| Muted Text | Cool Gray | #8d969e |
| Borders | Gray Tone | #c9c9cd |

## 3. Typography

| Role | Font | Size | Weight | Line Height | Letter Spacing |
|------|------|------|--------|-------------|----------------|
| Display Mega | Aeonik Pro | 136px | 500 | 1.00 | -2.72px |
| Display Hero | Aeonik Pro | 80px | 500 | 1.00 | -0.8px |
| Section Heading | Aeonik Pro | 48px | 500 | 1.21 | -0.48px |
| Sub-heading | Aeonik Pro | 40px | 500 | 1.20 | -0.4px |
| Card Title | Aeonik Pro | 32px | 500 | 1.19 | -0.32px |
| Nav / UI | Aeonik Pro | 20px | 500 | 1.40 | normal |
| Body Large | Inter | 18px | 400 | 1.56 | -0.09px |
| Body | Inter | 16px | 400 | 1.50 | 0.24px |
| Body Semibold | Inter | 16px | 600 | 1.50 | 0.16px |

## 4. Components

**Primary Dark Pill**: bg #191c1f, text #fff, padding 14px 32px, radius 9999px, hover opacity 0.85
**Secondary Light Pill**: bg #f4f4f4, text #000, padding 14px 34px, radius 9999px
**Outlined Pill**: bg transparent, text #191c1f, border 2px solid #191c1f, radius 9999px
**Ghost on Dark**: bg rgba(244,244,244,0.1), text #f4f4f4, border 2px solid #f4f4f4, radius 9999px
**Cards**: radius 12px (small), 20px (cards), no shadows

## 5. Spacing & Layout

Base: 8px. Scale: 4-120px. Large section spacing: 80px-120px
Radius: 12px (nav), 20px (cards), 9999px (all buttons)
No shadows. Zero. Flat is the identity.
Breakpoints: <400px, 400-720px, 720-1024px, 1024-1280px, 1280-1920px
