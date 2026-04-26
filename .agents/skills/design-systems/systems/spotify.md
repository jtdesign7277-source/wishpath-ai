# Design System: Spotify

## 1. Visual Theme & Atmosphere

Content-first darkness. Near-black backgrounds (#121212, #181818, #1f1f1f) where album art is the primary color source. Pill-shaped buttons and circular controls. Heavy shadows for depth.

- Near-black: #121212 (base), #181818 (surface), #1f1f1f (elevated)
- Spotify Green (#1ed760) used functionally only, never decoratively
- SpotifyMixUI font with global script support
- Pill buttons (500px-9999px), circular controls (50%)
- Uppercase buttons with 1.4px-2px letter-spacing
- Heavy shadows: rgba(0,0,0,0.5) 0px 8px 24px

## 2. Color Palette

| Role | Color | Hex |
|------|-------|-----|
| Brand | Spotify Green | #1ed760 |
| Base BG | Near Black | #121212 |
| Surface | Dark | #181818 |
| Elevated | Mid Dark | #1f1f1f |
| Card | Dark Card | #252525 |
| Primary Text | White | #ffffff |
| Secondary Text | Silver | #b3b3b3 |
| Border | Gray | #4d4d4d |
| Light Border | Mid Gray | #7c7c7c |
| Negative | Red | #f3727f |
| Warning | Orange | #ffa42b |
| Info | Blue | #539df5 |
| Green Border | Brand | #1db954 |

## 3. Typography

Font: SpotifyMixUI / SpotifyMixUITitle (with Arabic, Hebrew, Cyrillic, CJK fallbacks)

| Role | Size | Weight | Notes |
|------|------|--------|-------|
| Section Title | 24px | 700 | Bold |
| Body | 16px | 400 | Regular |
| Button | 14px | 700 | UPPERCASE, 1.4-2px tracking |
| Caption | 12px | 400 | Muted |
| Micro | 10px | 400 | Smallest |

Binary weight system: 700 (bold) or 400 (regular). Nothing in between.

## 4. Components

**Dark Pill**: bg dark, text white, radius 500px-9999px
**Light Pill**: bg white, text dark
**Circular Play**: 50% radius, centered icon
**Cards**: bg #181818/#1f1f1f, radius 6-8px, shadow on elevation
**Inputs**: bg #1f1f1f, radius 500px, inset border

## 5. Shadows

- Heavy: rgba(0,0,0,0.5) 0px 8px 24px
- Medium: rgba(0,0,0,0.3) 0px 8px 8px
- Inset: rgb(18,18,18) 0px 1px 0px, rgb(124,124,124) 0px 0px 0px 1px inset

## 6. Layout

Base: 8px. Sidebar + main + fixed bottom bar.
Radius: 2px (minimal), 4px, 6-8px (cards), 9999px (pills), 50% (circles)
Breakpoints: <425px, 425-576px, 576-768px, 768-896px, 896-1024px, 1024-1280px, >1280px
