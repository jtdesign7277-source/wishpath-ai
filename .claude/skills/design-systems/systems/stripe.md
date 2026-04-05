# Design System: Stripe

## 1. Visual Theme & Atmosphere

Luxurious-yet-technical aesthetic. sohne-var font with OpenType "ss01" stylistic sets, weight 300 for headlines. Signature blue-tinted shadows create chromatic depth.

- Stripe Purple (#533afd) primary accent
- Deep Navy (#061b31) text
- Weight 300 headlines (light = authority)
- Blue-tinted chromatic shadows: rgba(50,50,93,0.25)
- Conservative border-radius (4-8px)

## 2. Color Palette

| Role | Color | Hex |
|------|-------|-----|
| Primary Brand | Stripe Purple | #533afd |
| Text | Deep Navy | #061b31 |
| Background | White | #ffffff |
| Accent Ruby | Red | #ea2261 |
| Accent Magenta | Pink | #f96bee |
| Primary Shadow | Blue-tint | rgba(50,50,93,0.25) |
| Secondary Shadow | Neutral | rgba(0,0,0,0.12) |

## 3. Typography

Font: sohne-var with OpenType "ss01" enabled globally.

| Role | Size | Weight | Notes |
|------|------|--------|-------|
| Display Hero | 56px | 300 | Light weight = authority |
| Headline | 40px | 300 | Signature light |
| Sub-heading | 24px | 400 | Regular weight |
| Body | 16px | 400 | Standard |
| Button | 14px | 500-600 | Medium/semibold |
| Nano | 8px | 500 | Smallest |

16 text styles from 56px down to 8px.

## 4. Components

**Primary Button**: bg #533afd, radius 4-8px, chromatic shadow
**Ghost Button**: bg transparent, text matching
**Cards**: radius 4-8px, blue-tinted shadow system
**Badges**: small, subtle

## 5. Shadows (Chromatic Depth)

Four shadow levels using blue-gray primary shadows:
- Level 1: rgba(50,50,93,0.25) 0px 2px 5px, rgba(0,0,0,0.08) 0px 1px 1px
- Level 2: rgba(50,50,93,0.25) 0px 6px 12px, rgba(0,0,0,0.08) 0px 3px 7px
- Level 3: rgba(50,50,93,0.25) 0px 13px 27px, rgba(0,0,0,0.12) 0px 8px 16px
- Level 4: rgba(50,50,93,0.25) 0px 30px 60px, rgba(0,0,0,0.12) 0px 18px 36px

Always use blue-tinted shadows, never pure black.

## 6. Layout

Max width: ~1080px. Base spacing: 8px.
Border radius: conservative 4-8px (no pills).
Breakpoints: <640px (mobile), 640-1024px (tablet), >1280px (desktop)
