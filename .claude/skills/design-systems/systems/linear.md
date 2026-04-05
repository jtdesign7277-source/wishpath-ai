# Design System: Linear

## 1. Visual Theme & Atmosphere

Dark-mode-native. Near-black canvas (#08090a) where content emerges through luminance gradation. Semi-transparent white borders and opacity-based elevation instead of shadows.

- Primary bg: #010102 (marketing), #0f1011 (panels), #191a1b (elevated)
- Inter Variable with OpenType "cv01" and "ss03"
- Signature weight 510 (between regular and medium)
- Aggressive negative letter-spacing on display text
- Borders: rgba(255,255,255,0.05) to rgba(255,255,255,0.08)

## 2. Color Palette

| Role | Color | Hex |
|------|-------|-----|
| Marketing BG | Deepest Black | #010102 |
| Panel BG | Dark | #0f1011 |
| Elevated Surface | Lighter | #191a1b |
| Primary Text | Near White | #f7f8f8 |
| Secondary Text | Silver | #d0d6e0 |
| Tertiary Text | Muted | #8a8f98 |
| Brand Accent | Indigo | #5e6ad2 |
| Bright Accent | Violet | #7170ff |
| Hover Accent | Light Violet | #828fff |
| Success | Green | #27a644 / #10b981 |
| Subtle Border | Transparent White | rgba(255,255,255,0.05) |
| Standard Border | Transparent White | rgba(255,255,255,0.08) |

## 3. Typography

Font: Inter Variable with OpenType features "cv01", "ss03"
Monospace: Berkeley Mono (fallback: ui-monospace, SF Mono, Menlo)

| Role | Size | Weight | Line Height | Letter Spacing |
|------|------|--------|-------------|----------------|
| Display XL | 72px | 510 | tight | -1.584px |
| Display | 48px | 510 | tight | -1.056px |
| Heading | 32px | 510 | normal | -0.5px |
| Sub-heading | 24px | 510 | normal | -0.3px |
| Body | 16px | 400 | 1.50 | normal |
| Nav | 13-14px | 510 | 1.00 | normal |
| Small | 12px | 400 | 1.33 | normal |
| Tiny | 10px | 400 | 1.00 | normal |

## 4. Components

**Buttons**: near-transparent bg rgba(255,255,255,0.02-0.05), subtle borders
**Cards**: 8px radius, borders rgba(255,255,255,0.05-0.08)
**Pills**: 9999px radius, neutral styling
**Nav**: weight 510 at 13-14px

## 5. Layout

Base: 8px. Max width: 1200px.
Radius: 2px (micro), 4px, 8px, 12px, 9999px (pills), 50% (circles)
Elevation via luminance stepping, not shadows.
Breakpoints: <600px (mobile), 600-1024px (tablet), >1280px (desktop)
