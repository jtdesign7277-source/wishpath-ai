# Notion Design System

## Core Philosophy

The Notion design system embodies "a blank canvas that gets out of your way" through warm minimalism rather than cold sterility. The interface prioritizes approachability through careful color choices and restrained visual hierarchy. Everything is designed to feel welcoming and human, not corporate.

## Visual Foundation

**Typography:** NotionInter (modified Inter) with aggressive negative letter-spacing at display sizes (-2.125px at 64px), progressively relaxing toward normal spacing at body text. Four weights employed:
- 400: Body text
- 500: UI labels and accents
- 600: Emphasis and secondary headings
- 700: Display/hero headings

**Primary Color Palette:**
- Primary text: Near-black via `rgba(0,0,0,0.95)`
- Accent: Notion Blue (#0075de) — the **singular saturated color**
- Warm White: #f6f5f4 (section backgrounds)
- Warm Dark: #31302e (text on light backgrounds)
- Pure White: #ffffff (primary background)

**Semantic Colors:**
- Success: Teal
- Warning: Orange
- Highlight: Pink
- Error: Red (implied)

## Depth Treatment

Multi-layer shadow stacks with cumulative opacity never exceeding 0.05, creating "depth that's felt rather than seen." Shadows are so subtle they require careful observation:

**Card Shadows (4-layer stack):**
- Layer 1: `rgba(15,15,15,0.05)`
- Layer 2: `rgba(15,15,15,0.04)`
- Layer 3: `rgba(15,15,15,0.03)`
- Layer 4: `rgba(15,15,15,0.02)`

**Modal Shadows (5-layer stack):** Extends shadow reach to 52px blur for deep layering without visual heaviness.

## Component Standards

**Buttons:**
- Primary: Notion Blue (#0075de) background, white text
- Secondary: Translucent warm gray (`rgba(0,0,0,0.05)`) background
- Tertiary: Text-only with hover underline
- Border Radius: 4px standard
- Padding: 8px-16px (vertical-horizontal)
- Focus: 2px solid focus outline with accompanying shadow

**Badge/Pill Components:**
- Full radius: 9999px (pill shape)
- Tinted blue backgrounds for emphasis
- 4px radius for rectangular badges

**Cards:**
- Background: #ffffff
- Border: 1px solid `rgba(0,0,0,0.1)` — a whisper, not a line
- Radius: 12px standard, 16px for featured content
- Top-rounded images: 12px 12px 0px 0px radius
- Subtle shadow stack (cumulative < 0.05 opacity)

**Input Fields:**
- White background
- 1px border: `rgba(0,0,0,0.1)`
- 4px radius
- Padding: 8px-12px
- Focus state: 2px outline + shadow reinforcement

**Focus System:** All interactive elements receive 2px solid focus outlines with accompanying shadow reinforcement for keyboard navigation accessibility. Focus indicators maintain visibility without jarring visual breaks.

## Spacing System

**Base Unit:** 8px

**Spacing Scale:** 2-32px with organic progression

**Section Rhythm:** Large vertical padding (64-120px between sections) creates "islands of readable content in a sea of white space." This generous spacing prevents information density fatigue.

**Horizontal Spacing:**
- Content padding: 16-32px
- Section margins: 64-120px
- Max content width: ~1200px

## Layout Principles

**Content Width:** Maximum approximately 1200px for desktop readability.

**Section Backgrounds:** Full-width section backgrounds alternate between white (#ffffff) and warm white (#f6f5f4) for gentle visual rhythm without harsh breaks. Dark sections are avoided in favor of warm tones.

**Grid Collapse:** Multi-column grids collapse to single columns on mobile while maintaining consistent border radii and spacing ratios.

## Accessibility Features

**Text Hierarchy:** Achieves WCAG AAA contrast (18:1 for primary text). The near-black `rgba(0,0,0,0.95)` provides strong readability without the harshness of pure black.

**Disabled States:** Rendered in warm gray (#a39e98) rather than cold gray, maintaining the system's warm aesthetic even for inactive elements.

**Focus Indicators:** Keyboard navigation is fully supported with visible 2px outlines and shadow reinforcement.

## Do's

- Use NotionInter with aggressive negative letter-spacing on display sizes
- Employ only ONE saturated color (#0075de blue) for accents
- Create multi-layer shadow stacks with cumulative opacity < 0.05
- Maintain warm gray tones (#31302e, #a39e98) rather than cool neutrals
- Use large vertical spacing (64-120px) between sections
- Apply 4px radius to buttons and inputs, 12px to cards
- Maintain 8px base unit for all spacing
- Use WCAG AAA contrast for accessibility

## Don'ts

- Don't use cold gray tones (avoid #808080 style grays)
- Avoid multiple saturated accent colors (blue only)
- Don't create heavy shadows (cumulative opacity must stay subtle)
- Don't use large border-radius (16px+ only for featured content)
- Avoid creating busy layouts—prefer generous whitespace
- Don't use pure black (#000000) anywhere; use near-black `rgba(0,0,0,0.95)`
- Don't compress spacing on mobile beyond necessity
- Avoid complex focus indicators—keep them simple and consistent
- Don't use semantic colors for anything other than their purpose (teal=success, orange=warning)

## Responsive Behavior

**Mobile First Approach:**
- Single column layout
- Reduced font sizes for displays (56px → 40-48px)
- Maintained spacing ratios proportionally
- Hamburger navigation if needed
- Full-width sections with same alternating rhythm

**Touch Targets:** Minimum 44px for interactive elements on mobile.

## Typography Deep Dive

**Display/Hero (64px):** NotionInter 700, -2.125px letter-spacing
**Display Large (48px):** NotionInter 700, -1.5px letter-spacing
**Display Medium (36px):** NotionInter 600-700, -1px letter-spacing
**Body (16px):** NotionInter 400, 0px letter-spacing (normalized)
**Small (14px):** NotionInter 400, 0.5px letter-spacing (slightly positive)

The aggressive negative letter-spacing on headlines creates visual impact and modern sophistication, while body text normalizes to standard spacing for readability.

## Agent Prompt Guide

When requesting UI generation from this system:
- "Build this with Notion's warm minimalism: one blue accent, subtle shadows, generous whitespace"
- "Use NotionInter with aggressive negative tracking on headlines for visual impact"
- "Apply multi-layer shadow stacks so subtle they require close observation"
- "Alternate white and warm-white sections for rhythm"
- "Make it feel welcoming and human, not corporate"
- "4px radius for buttons, 12px for cards—keep it refined"
- "Use near-black, not pure black; warm grays, not cool neutrals"
