# Figma Design System

## Core Visual Philosophy

Figma's design system exemplifies "the design tool that designed itself." The interface employs a **strict black-and-white palette** (`#000000` and `#ffffff`) for all chrome, reserving vibrant multi-color gradients exclusively for product content and hero sections. This creates a gallery-like presentation where the interface becomes invisible scaffolding around colorful creative output.

## Typography Architecture

The system centers on **figmaSans**, a custom variable font with unusual weight stops (320, 330, 340, 450, 480, 540, 700) rather than conventional increments. This granular control enables hierarchy through micro-weight differences. Body text typically uses weights 320–340 (lighter than standard 400), creating an ethereal aesthetic. All text features:
- Kern enabled globally
- Negative letter-spacing (-0.1px to -1.72px on body text)
- figmaMono for uppercase labels with positive spacing (0.54px–0.6px)

## Color Palette

**Colors Limited To:**
- Pure Black (#000000)
- Pure White (#ffffff)
- Glass Dark: `rgba(0, 0, 0, 0.08)`
- Glass Light: `rgba(255, 255, 255, 0.16)`

Vibrant multi-color gradients reserved exclusively for product content and hero sections.

## Component Language

**Buttons & Interactive Elements:**
- Pill geometry (50px radius) for buttons and tabs
- Circle geometry (50%) for icon buttons
- Colors limited to pure black/white or semi-transparent glass effects
- Dashed 2px focus outlines (referencing Figma editor selection handles)

**Input Fields:**
- Minimal design with focus states
- Pure white or black text on appropriate backgrounds
- Glass effects for translucency

## Layout & Spacing

The 8px base unit scales across breakpoints (559px–1920px). Spacing uses:
- 1px, 2px, 4px, 8px, 16px, 24px, 32px, 50px

**Border Radius Hierarchy:**
- 2px (minimal elements)
- 6px (subtle containers)
- 8px (comfortable surfaces)
- 50px (pill-shaped buttons)
- 50% (perfect circles)

## Depth & Elevation

Depth relies on **background contrast** rather than shadows. White content floating on colored sections provides dimensionality. The minimalist shadow approach maintains focus on content hierarchy through color and contrast.

## Responsive Behavior

- **Desktop first**: Design for widest viewport, collapse down
- Breakpoints scale proportionally: 559px–1920px
- All spacing scales with 8px base unit

## Do's

- Use figmaSans with exact weight stops (320-340 for body)
- Apply negative letter-spacing on body text
- Use dashed 2px focus outlines
- Create hierarchy through weight micro-differences
- Reserve gradients for product content only
- Maintain pure black/white chrome aesthetic

## Don'ts

- Don't use conventional font weights (400, 700)
- Avoid positive letter-spacing on body text
- Don't apply color to interface chrome
- Avoid drop shadows (use contrast instead)
- Don't use rounded corners larger than 50px (unless circular)
- Avoid using multiple accent colors in UI

## Component Examples

**Primary Button:**
- Radius: 50px
- Padding: spacious (likely 12-16px vertical, 24px+ horizontal)
- Color: Black text on white or white text on black
- Focus: Dashed 2px outline

**Toggle/Switch:**
- Circular thumb with glass effects
- Glass Dark or Glass Light for inactive states
- Smooth transitions

**Card/Container:**
- White background on dark sections or vice versa
- Minimal or no border
- Relies on contrast for elevation

## Agent Prompt Guide

When requesting UI generation from this system:
- "Build this using pure black and white, like Figma's interface"
- "Use figmaSans with negative letter-spacing for ethereal feel"
- "Create invisible scaffolding—the UI should frame content, not compete with it"
- "Apply glass effects sparingly for depth without visual weight"
