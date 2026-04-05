# Design System: Kraken

## 1. Visual Theme & Atmosphere

Professional crypto exchange centered on Kraken Purple (#7132f5). White backgrounds with purple to establish identity. Dual font system: Kraken-Brand (display) + Kraken-Product with IBM Plex Sans fallback (UI).

- Kraken Purple (#7132f5) primary with darker variants (#5741d8, #5b1ecf)
- Near-black (#101114) text with cool blue-gray neutral scale
- 12px radius buttons (rounded but not pill-shaped)
- Subtle shadows: rgba(0,0,0,0.03) 0px 4px 24px
- Green accent (#149e61) for positive/success states

## 2. Color Palette

| Role | Color | Hex |
|------|-------|-----|
| Primary Brand | Kraken Purple | #7132f5 |
| Purple Dark | Button borders | #5741d8 |
| Purple Deep | Deepest purple | #5b1ecf |
| Purple Subtle | 16% bg | rgba(133,91,251,0.16) |
| Text | Near Black | #101114 |
| Neutral | Cool Gray | #686b82 |
| Secondary Text | Silver Blue | #9497a9 |
| Surface | White | #ffffff |
| Border | Gray | #dedee5 |
| Success | Green | #149e61 |
| Success Badge Text | Green Dark | #026b3f |

## 3. Typography

| Role | Font | Size | Weight | Line Height | Letter Spacing |
|------|------|------|--------|-------------|----------------|
| Display Hero | Kraken-Brand | 48px | 700 | 1.17 | -1px |
| Section Heading | Kraken-Brand | 36px | 700 | 1.22 | -0.5px |
| Sub-heading | Kraken-Brand | 28px | 700 | 1.29 | -0.5px |
| Feature Title | Kraken-Product | 22px | 600 | 1.20 | normal |
| Body | Kraken-Product | 16px | 400 | 1.38 | normal |
| Button | Kraken-Product | 16px | 500-600 | 1.38 | normal |
| Caption | Kraken-Product | 14px | 400-700 | 1.43-1.71 | normal |
| Small | Kraken-Product | 12px | 400-500 | 1.33 | normal |

## 4. Components

**Primary Purple Button**: bg #7132f5, text #fff, padding 13px 16px, radius 12px
**Purple Outlined**: bg #fff, text #5741d8, border 1px solid #5741d8, radius 12px
**Purple Subtle**: bg rgba(133,91,251,0.16), text #7132f5, radius 12px
**White Button**: bg #fff, text #101114, radius 10px, shadow rgba(0,0,0,0.03) 0px 4px 24px
**Secondary Gray**: bg rgba(148,151,169,0.08), text #101114, radius 12px
**Success Badge**: bg rgba(20,158,97,0.16), text #026b3f, radius 6px

## 5. Spacing

Base: 8px. Scale: 1-25px
Radius: 3px, 6px, 8px, 10px, 12px, 16px, 9999px, 50%
Shadows: Subtle rgba(0,0,0,0.03) 0px 4px 24px, Micro rgba(16,24,40,0.04) 0px 1px 4px
Breakpoints: 375px, 425px, 640px, 768px, 1024px, 1280px, 1536px
