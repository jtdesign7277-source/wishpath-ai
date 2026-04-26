# Design System: Vercel

## 1. Visual Theme & Atmosphere

Extreme minimalism. Developer infrastructure made invisible. Near-pure white canvas with near-black text. Signature shadow-as-border technique.

- Text: #171717 (Vercel Black)
- Background: #ffffff (Pure White)
- Console: #000000 (True Black)
- Geist Sans with aggressive negative letter-spacing
- Shadow-as-border: rgba(0,0,0,0.08) 0px 0px 0px 1px
- Minimal border-radius: 6px (buttons), 8-12px (cards)

## 2. Color Palette

| Role | Color | Hex |
|------|-------|-----|
| Text | Vercel Black | #171717 |
| Background | Pure White | #ffffff |
| Console | True Black | #000000 |
| Ship | Red | #ff5b4f |
| Preview | Pink | #de1d8d |
| Develop | Blue | #0a72ef |
| Link | Blue | #0072f5 |
| Focus | Blue | hsla(212,100%,48%,1) |
| Badge BG | Light Blue | #ebf5ff |
| Badge Text | Dark Blue | #0068d6 |

## 3. Typography

Font: Geist Sans (aggressive negative tracking)
Mono: Geist Mono with OpenType "liga"

| Role | Size | Weight | Letter Spacing |
|------|------|--------|----------------|
| Display | 48px | 600 | -2.4px to -2.88px |
| Headline | 40px | 600 | -2.4px |
| Subheading | 32px | 500 | -1.28px |
| Body | 16px | 400 | normal |
| Button | 14px | 500-600 | normal |

## 4. Signature: Shadow-as-Border

Replaces CSS borders: `rgba(0,0,0,0.08) 0px 0px 0px 1px`

Multi-layer card shadow: border + elevation + ambient + inner highlight in one declaration.

## 5. Components

**Buttons**: 6px radius, minimal padding (0-8px), weight 500/600
**Cards**: 8-12px radius, shadow-based borders, #fafafa inner glow
**Badges**: 9999px pill, #ebf5ff bg, #0068d6 text
**Focus**: 2px solid hsla(212,100%,48%,1)

## 6. Layout

Max width: ~1200px. Base: 8px.
Section spacing: 80-120px.
Breakpoints: Mobile, Tablet, Desktop.
Touch targets: minimum 44-48px.
