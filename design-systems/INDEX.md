# Design System Reference Collection

This directory contains the Awesome DESIGN.md collection overview plus 3 comprehensive design system references selected for their depth and applicability as general-purpose UI design system references.

## Files Included

### 1. REPO_INFO.md
Overview of the Awesome DESIGN.md repository, including:
- Repository URL and purpose
- Standard file structure for each design system
- Complete list of 54+ available design systems
- License and contribution information

**Repository:** https://github.com/VoltAgent/awesome-design-md

---

## Selected Design Systems

### 2. FIGMA_DESIGN.md

**Key Characteristics:**
- **Philosophy:** Invisible scaffolding—UI fades away to frame content
- **Color:** Ultra-minimal (pure black/white only, reserving gradients for content)
- **Typography:** Custom figmaSans with granular weight stops (320-700) and aggressive negative letter-spacing
- **Components:** Pill-shaped buttons, circle icons, glass effects
- **Depth:** Contrast-based, no shadows

**Best For:**
- Clean, minimal interfaces
- Content-focused applications
- When you need the UI to disappear
- Design/creative tools

**Key Techniques:**
- Micro-weight differences for subtle hierarchy
- Glass effects (semi-transparent layers)
- 8px base unit spacing
- Dashed 2px focus outlines

---

### 3. STRIPE_DESIGN.md

**Key Characteristics:**
- **Philosophy:** Technical and luxurious, precise and warm
- **Color:** Navy headings, purple CTAs, blue-tinted shadows
- **Typography:** sohne-var weight 300 with "ss01" stylistic set globally
- **Components:** 4px conservative border-radius, multi-layer shadows
- **Depth:** Chromatic depth with blue-gray undertone

**Best For:**
- Fintech/payment platforms
- High-trust, professional applications
- Complex data visualization
- Financial dashboards

**Key Techniques:**
- Alternating white/dark sections for rhythm
- Multi-layer blue-tinted shadows (not gray)
- Weight 300 as the standard headline weight
- 4-8px border-radius (conservative rounding)
- Tabular number formatting for financial data

---

### 4. NOTION_DESIGN.md

**Key Characteristics:**
- **Philosophy:** Warm minimalism—blank canvas that gets out of your way
- **Color:** Single saturated accent (blue #0075de), warm neutrals
- **Typography:** NotionInter with aggressive negative tracking (-2.125px at 64px)
- **Components:** 4px radius buttons, 12px radius cards
- **Depth:** Barely-visible multi-layer shadows (cumulative opacity < 0.05)

**Best For:**
- Productivity/collaboration tools
- User-generated content platforms
- Approachable, welcoming interfaces
- Knowledge management systems

**Key Techniques:**
- Generous vertical spacing (64-120px between sections)
- Warm gray tones instead of cold neutrals
- Subtle shadows that must be observed closely
- Single saturated accent color (blue only)
- WCAG AAA accessibility compliance

---

## Comparison Matrix

| Aspect | Figma | Stripe | Notion |
|--------|-------|--------|--------|
| **Accent Colors** | None (black/white) | Purple + navy | Single blue |
| **Typography Weight** | 320-700 (granular) | 300 (light) | 400-700 (standard) |
| **Letter Spacing** | Negative (-1.72px body) | Negative at display | Negative (-2.125px at 64px) |
| **Shadows** | Contrast-based (none) | Multi-layer blue-tinted | Barely-visible multi-layer |
| **Border Radius** | 2px-50px | 4-8px | 4px-16px |
| **Base Unit** | 8px | 8px | 8px |
| **Tone** | Minimal, invisible | Professional, technical | Warm, approachable |
| **Best For** | Creative tools | Financial systems | Productivity apps |

---

## Key Takeaways for General-Purpose Design Systems

### Color Strategy
- **Figma approach:** Monochromatic chrome, colorful content
- **Stripe approach:** Chromatic depth with brand-aligned shadows
- **Notion approach:** Warm tones with single saturated accent

**Lesson:** Choose your chromatic anchor early. All three systems make this choice explicit and consistent.

### Typography Hierarchy
All three use negative letter-spacing on display sizes for visual impact:
- Figma: -1.72px on body
- Stripe: -1.4px on 56px hero
- Notion: -2.125px on 64px display

**Lesson:** Negative letter-spacing is a sophisticated design technique; positive letter-spacing rarely works well.

### Spacing & Rhythm
All use 8px base units, but differ in philosophy:
- Figma: Minimal, functional spacing
- Stripe: Alternating sections for visual breaks
- Notion: Generous vertical spacing (64-120px between sections)

**Lesson:** Spacing conveys message. Tight spacing feels urgent; generous spacing feels confident.

### Shadow & Depth
Three distinct approaches:
- Figma: No shadows (contrast only)
- Stripe: Multi-layer chromatic (blue-tinted)
- Notion: Barely-visible (< 0.05 cumulative opacity)

**Lesson:** Choose your depth metaphor and commit. Don't mix approaches.

### Buttons & Interactive Elements
Consistent across all three:
- 4px-8px border-radius (avoid large rounding)
- Clear focus states (2px outline + optional shadow)
- Generous padding (8px-16px)

**Lesson:** Refined interactions don't require extreme styling.

---

## Next Steps

To use these as references for your project:

1. **Pick your foundation:** Which design philosophy aligns with your product?
   - Content-focused? → Figma
   - Financial/professional? → Stripe
   - Approachable/collaborative? → Notion

2. **Apply the core principles:**
   - Choose your color anchor (what's your purple, navy, or blue?)
   - Select your typography weights and letter-spacing rules
   - Define your spacing rhythm (tight, alternating, or generous?)
   - Decide on shadow/depth approach (contrast, chromatic, or minimal?)

3. **Extend the system:** These serve as foundations; layer in your domain-specific components while maintaining the underlying philosophy.

4. **Explore more:** The Awesome DESIGN.md repository has 50+ more systems. Check it out for additional references in your domain.

---

## Repository Source

All design systems extracted from: https://github.com/VoltAgent/awesome-design-md

MIT License. These are design system documents representing publicly visible CSS values from public websites.
