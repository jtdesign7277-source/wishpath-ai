# Design System: Supabase

## 1. Visual Theme & Atmosphere

Dark-mode-native. Near-black backgrounds (#0f0f0f, #171717) with emerald green accent (#3ecf8e). Terminal-inspired functionality with refined marketing. Depth from border hierarchy, not shadows.

- Near-black backgrounds (#0f0f0f, #171717)
- Emerald green accent used selectively (#3ecf8e, #00c573)
- Circular font, weight 400 primary (500 only for buttons/nav)
- Source Code Pro for uppercase technical labels
- Pill buttons (9999px) for primary CTAs
- Neutral border scale: #242424, #2e2e2e, #363636, #393939
- HSL tokens with alpha transparency for layering

## 2. Color Palette

| Role | Color | Hex |
|------|-------|-----|
| Deepest Surface | Near Black | #0f0f0f |
| Page Background | Dark | #171717 |
| Dividers | Dark Border | #242424 |
| Card Borders | Border Dark | #2e2e2e |
| Button Borders | Mid Border | #363636 |
| Secondary Borders | Border Light | #393939 |
| Muted Text | Mid Gray | #898989 |
| Secondary Text | Light Gray | #b4b4b4 |
| Primary Text | Off White | #fafafa |
| Brand | Supabase Green | #3ecf8e |
| Links | Green Link | #00c573 |
| Accent Border | Green at 30% | rgba(62,207,142,0.3) |
| Glass Overlay | Dark Glass | rgba(41,41,41,0.84) |

## 3. Typography

Font: Circular (geometric sans, rounded terminals)
Mono: Source Code Pro

| Role | Font | Size | Weight | Line Height | Notes |
|------|------|------|--------|-------------|-------|
| Display Hero | Circular | 72px | 400 | 1.00 | Maximum density |
| Section Heading | Circular | 36px | 400 | 1.25 | tight |
| Card Title | Circular | 24px | 400 | 1.33 | -0.16px tracking |
| Body | Circular | 16px | 400 | 1.50 | Standard |
| Nav/Button | Circular | 14px | 500 | 1.14 | Interactive only |
| Caption | Circular | 14px | 400-500 | 1.43 | Meta |
| Code Label | Source Code Pro | 12px | 400 | 1.33 | UPPERCASE, 1.2px tracking |

## 4. Components

**Primary Pill**: bg #0f0f0f, text #fafafa, padding 8px 32px, radius 9999px, border 1px solid #fafafa
**Secondary Pill**: bg #0f0f0f, text #fafafa, border 1px solid #2e2e2e, opacity 0.8
**Ghost Button**: bg transparent, text #fafafa, radius 6px
**Cards**: bg #171717, border 1px solid #2e2e2e, radius 8-16px, no shadows
**Tabs**: pill shape (9999px), border 1px solid #2e2e2e

## 5. Depth & Elevation

NO SHADOWS. Depth via border hierarchy:
- Level 0: border #2e2e2e (default)
- Level 1: border #363636 or #393939 (interactive/hover)
- Level 2: focus only — rgba(0,0,0,0.1) 0px 4px 12px
- Level 3: green accent border rgba(62,207,142,0.3) (highlighted)

## 6. Layout

Base: 8px. Section spacing: 90-128px (cinematic pacing).
Dense within sections: 16-24px.
Radius: 6px (ghost), 8px (cards), 12px (panels), 16px (features), 9999px (pills)
Single breakpoint: 600px (mobile-first)
