# Design Brief

## Direction

GrowthMind AI Blog — A futuristic, motion-rich showcase exploring AI's role in digital marketing with premium visual polish and engaging animations.

## Tone

Bold Modern meets Dark Editorial — high-energy, confident, tech-forward with a deep dark atmosphere that makes glowing accents and animated gradients pop with impact.

## Differentiation

Animated gradient backgrounds shifting between purple→blue→teal as users scroll, combined with 3D title animations and staggered content reveals create an unforgettable, premium first impression that stands apart from generic tech blogs.

## Color Palette

| Token      | OKLCH          | Role                                           |
| ---------- | -------------- | ---------------------------------------------- |
| background | 0.11 0.01 280  | Deep dark charcoal base, minimal chromatic     |
| foreground | 0.92 0.008 280 | Near-white text, high readability              |
| card       | 0.16 0.015 280 | Elevated surface for content sections          |
| primary    | 0.68 0.28 300  | Vivid violet/purple, AI/innovation brand       |
| accent     | 0.72 0.22 195  | Cyan/teal complement, secondary highlight      |
| muted      | 0.2 0.02 280   | Subtle surface for secondary content           |
| border     | 0.24 0.015 280 | Soft dividers between zones                    |

## Typography

- Display: Space Grotesk — modern, geometric, tech-forward brand identity
- Body: DM Sans — clean, contemporary, highly readable body copy
- Scale: hero `text-6xl md:text-8xl font-bold tracking-tight`, h2 `text-4xl md:text-6xl font-bold`, label `text-sm font-semibold tracking-widest`, body `text-base md:text-lg`

## Elevation & Depth

Layered surfaces with card-based separation: background (0.11) → muted (0.2) → card (0.16) create visual hierarchy. Soft glowing shadows on primary/accent elements using OKLCH alpha values. No harsh shadows — ambient glow replaces traditional elevation.

## Structural Zones

| Zone    | Background         | Border                    | Notes                                        |
| ------- | ------------------ | ------------------------- | -------------------------------------------- |
| Header  | card (0.16)        | border-b, opacity 20%     | Sticky, subtle elevation                     |
| Hero    | gradient-shift     | none                      | Full viewport, animated gradient background |
| Content | card (0.16)        | none                      | Sections alternate subtle muted (0.2)       |
| Footer  | muted (0.2)        | border-t, opacity 20%     | Grounded contrast with content               |

## Spacing & Rhythm

Spacious sections (gap-16 between major blocks) with generous padding (px-6 md:px-12) create breathing room. Micro-spacing (gap-4 within cards) maintains hierarchy. Staggered reveals with 100ms delays between elements choreograph attention flow.

## Component Patterns

- Buttons: primary violet bg with cyan glow on hover, rounded corners (md), scale-105 transform
- Cards: card bg with subtle border, soft shadows via glow-primary/accent utilities, scale-on-hover
- Section Headers: uppercase label (text-sm tracking-widest) in accent color, followed by bold h2 with fade-in animation

## Motion

- Entrance: fade-in with 10px translateY on page load, staggered 100ms delays per element (stagger-1 through stagger-5)
- Hover: smooth scale-105 transform + glow intensification on cards and buttons (0.3s easing)
- Decorative: continuous gradient-pulse animation (8s cycle) on hero background, float-subtle (4s) on accent orbs, parallax scroll effects on section backgrounds

## Constraints

- Use dark mode exclusively (no light mode toggle)
- All color values must use OKLCH CSS variables; no hex or raw RGB values in components
- Animations tied to scroll position (parallax depth) or entrance stagger (no random bouncing)
- Maintain 0.8+ contrast ratio on all text against backgrounds

## Signature Detail

3D animated title in hero section using Three.js/React Three Fiber with rotating geometry and glowing vertices, elevated by synchronized background gradient shifts and foreground accent orbs creating a layered parallax depth effect — the central visual anchor that signals premium production value.
