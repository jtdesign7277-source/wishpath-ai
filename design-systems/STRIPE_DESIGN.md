# Stripe Design System

## Core Design Principles

Stripe's design balances "technical and luxurious, precise and warm" aesthetics for fintech applications. The system creates an impression of reliability, sophistication, and accessibility simultaneously.

## Visual Foundation

**Canvas & Backgrounds:**
- Canvas: Pure white (#ffffff)
- Deep navy headings: #061b31
- Brand sections: Dark brand color (#1c1e54)
- Accent sections: Alternates between white and dark for visual rhythm

**Signature Font:** sohne-var variable font with OpenType "ss01" stylistic set enabled globally. Display weight: 300 (extraordinarily light for headlines).

**Shadow System:** "Multi-layer, blue-tinted shadows" using:
- Primary: `rgba(50,50,93,0.25)`
- Secondary: `rgba(0,0,0,0.1)`
- Creates "chromatic depth" with blue-gray undertone tied to brand palette

## Typography Hierarchy

The system uses weight 300 as the signature headline weight across all display sizes. Key specifications:

**Display Hero:** 56px, weight 300, -1.4px letter-spacing
**Display Large:** 48px, weight 300, -0.96px tracking
**Body:** 16px, weight 300-400
**Monospace Fallback:** SourceCodePro for code blocks

All text should have "ss01" stylistic set enabled globally. Apply "tnum" for tabular/financial numbers.

## Color Palette

| Role | Color | Use Case |
|------|-------|----------|
| Primary Purple | #533afd | Brand color, interactive elements, CTAs |
| Deep Navy | #061b31 | Headings, critical text |
| Ruby | #ea2261 | Alerts, errors, critical actions |
| Magenta | #f96bee | Secondary accent |
| Success Green | #15be53 | Success states, confirmations |
| Border Default | #e5edf5 | Card borders, dividers |
| Brand Dark | #1c1e54 | Section backgrounds |

## Component Specifications

**Primary Button:**
- Background: #533afd
- Text: #ffffff
- Padding: 8px 16px
- Border Radius: 4px
- Hover State: #4434d4

**Secondary Button:**
- Border: 1px solid #b9b9f9
- Background: Transparent
- Text: #533afd
- Radius: 4px

**Cards:**
- Background: #ffffff
- Border: 1px solid #e5edf5
- Radius: 4-8px scale
- Shadow: `rgba(50,50,93,0.25) 0px 30px 45px -30px, rgba(0,0,0,0.1) 0px 18px 36px -18px`

**Badges:**
- Success: `rgba(21,190,83,0.2)` background with `#108c3d` text
- Neutral: #ffffff with 1px border
- Error: `rgba(234,34,97,0.2)` background with `#a71d45` text

**Input Fields:**
- Border: 1px solid #e5edf5
- Focus: Purple highlight
- Padding: 8px 12px
- Radius: 4px

## Layout & Spacing

**Base Unit:** 8px

**Max Content Width:** ~1080px

**Spacing Scale:** 8px, 16px, 24px, 32px, 48px, 64px, 96px

**Border Radius Scale:**
- 4px (standard elements)
- 8px (featured elements)

**Section Rhythm:** White alternates with dark brand sections (#1c1e54) for visual movement without jarring breaks.

## Depth & Elevation

Five elevation levels defined by shadow composition:

**Level 0 (Flat):** No shadow
**Level 1 (Ambient):** `rgba(23,23,23,0.06)`
**Level 2 (Standard):** `rgba(23,23,23,0.08) 0px 15px 35px`
**Level 3 (Elevated):** Blue-tinted + black layering (for cards, popovers)
**Level 4 (Deep):** Dark blue shadow for modals and overlays

The shadow philosophy employs "chromatic depth" where the blue-gray undertone of the primary shadow ties directly to the navy-purple brand palette.

## Responsive Behavior

**Breakpoints:**
- Mobile: <640px (single column, reduced sizes)
- Tablet: 640-1024px (2-column grids)
- Desktop: 1024-1280px (3-column features)
- Large: >1280px (centered with margins)

**Mobile Collapse Patterns:**
- Hero: 56px → 32px
- Navigation: Links → hamburger menu
- Grid: 3-col → 1-col stack
- Spacing: Proportionally reduced

## Critical Do's

- Apply "ss01" stylistic set to **every** sohne-var text element
- Use weight 300 for headlines and body text
- Apply blue-tinted shadows to elevated elements
- Use #061b31 (navy) instead of black for headings
- Maintain 4px-8px border-radius (conservative rounding)
- Apply "tnum" for tabular/financial numbers
- Alternate white and dark sections for rhythm
- Use purple (#533afd) as primary interactive color

## Critical Don'ts

- Avoid weight 600+ for sohne-var headlines
- Don't use large border-radius (12px+) or pill shapes
- Don't use neutral gray shadows (must be blue-tinted)
- Don't skip "ss01" on any sohne-var text
- Don't use pure black (#000000) for headings
- Don't use warm accent colors for interactive elements
- Don't apply positive letter-spacing at display sizes
- Don't create all-white backgrounds without rhythm breaks
- Avoid using success green (#15be53) for non-confirmation states

## Agent Prompt Guide

When requesting UI generation from this system:
- "Build this with Stripe's fintech elegance: navy headings, purple CTAs, blue-tinted shadows"
- "Use sohne-var weight 300 with negative tracking for sophisticated headlines"
- "Alternate white and dark sections for visual rhythm, like a modern financial dashboard"
- "Apply multi-layer blue-tinted shadows for chromatic depth"
- "Keep border-radius conservative (4-8px) for a precise, trustworthy feel"
