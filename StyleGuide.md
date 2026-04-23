# Narrative Indigo Portfolio

## Product Overview

**The Pitch:** An editorial-grade, horizontally scrolling digital portfolio named 'CTRL-ALT-SPACE'. It frames case studies not as static grids, but as cinematic, unfolding narratives that demand attention.

**For:** Creative Directors, Design Leads, and Recruiters seeking high-tier product design talent capable of immersive storytelling.

**Device:** desktop

**Design Direction:** Sophisticated editorial storyboard. Horizontal progression, high-contrast serif typography against deep indigo backgrounds, layered parallax imagery.

**Inspired by:** Awwwards-winning digital exhibitions, high-end editorial magazines (like Kinfolk transposed to dark mode), and cinematic storyboards.

---

## Screens

- **Hero / Intro Pane:** Establishes the 'CTRL-ALT-SPACE' brand, narrative tone, and horizontal scroll affordance.
- **Project 1: Nexus FinTech:** First narrative pane, heavy on product imagery and problem-solving typography.
- **Project 2: Aura E-Commerce:** Second narrative pane, showcasing visual design and interaction models.
- **Project 3: Lumina AI:** Third narrative pane, focusing on complex systems and architecture.
- **Outro / Contact Pane:** Call to action, resume download, and 'View All Projects' link.

---

## Key Flows

**The Horizontal Narrative:** Viewing the designer's body of work as a single cohesive story.

1. User lands on **Hero / Intro Pane** -> sees large serif typography, deep indigo background, and a subtle "Scroll Right" trackpad indicator.
2. User scrolls down (mapped to horizontal scroll via JS) -> UI slides left, revealing **Project 1: Nexus FinTech**.
3. User reaches **Outro Pane** -> clicks **'View All Projects'** -> transitions to a vertical grid archive (future scope, acts as a list page for now).

---

<details>
<summary>Design System</summary>

## Color Palette

- **Primary:** `#D9C2F0` - Soft lavender for CTAs, prominent links, active states
- **Background:** `#0A0A14` - Void navy/black for the infinite canvas
- **Surface:** `#18182B` - Deep indigo for overlapping project cards and image containers
- **Text:** `#F5F5FA` - Crisp off-white for high legibility on dark backgrounds
- **Muted:** `#7E7E9A` - Dusty violet for secondary text, metadata, structural lines
- **Accent:** `#FF6B6B` - Muted coral for hover interactions, minor alerts, focal points

## Typography

- **Headings:** `Playfair Display`, 400 (Italic) & 700, 48-120px
- **Body:** `DM Sans`, 400, 16px, 1.6 line height
- **Small text:** `JetBrains Mono`, 400, 12px, uppercase, 2px letter-spacing
- **Buttons:** `DM Sans`, 500, 14px, uppercase, 1px letter-spacing

**Style notes:** Sharp 0px border radii. 1px `#7E7E9A` borders defining rigid structural grids. Heavy use of negative space. No drop shadows; depth is achieved through parallax movement and stark color contrast.

## Design Tokens

```css
:root {
  --color-primary: #D9C2F0;
  --color-background: #0A0A14;
  --color-surface: #18182B;
  --color-text: #F5F5FA;
  --color-muted: #7E7E9A;
  --color-accent: #FF6B6B;
  --font-headings: 'Playfair Display', serif;
  --font-body: 'DM Sans', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  --radius: 0px;
  --spacing-base: 8px;
}
```

</details>

---

<details>
<summary>Screen Specifications</summary>

### Hero / Intro Pane

**Purpose:** Initial hook and brand establishment.

**Layout:** 100vw x 100vh viewport. Left-aligned typography. Bottom-right scroll indicator.

**Key Elements:**
- **Main Headline:** `Playfair Display`, 120px, `#F5F5FA`. Text: "CTRL-ALT-SPACE".
- **Subheadline:** `DM Sans`, 24px, `#7E7E9A`, max-width 400px. Text: "Redefining digital dimensions through intentional product design."
- **Scroll Affordance:** `JetBrains Mono`, 12px, `#D9C2F0`. Text: "[ SCROLL TO EXPLORE ]" alongside a 40px horizontal line that fills on scroll.

**Components:**
- **Navigation:** Fixed top, 24px padding. Left: Logo mark. Right: "About", "Contact". `JetBrains Mono`, 14px, uppercase.

**Interactions:**
- **Scroll:** Mouse wheel down translates to 1:1 horizontal scroll right. Text fades out at 30% scroll depth.
- **Hover Nav:** Text color transitions to `#FF6B6B`, 300ms ease.

### Project 1: Nexus FinTech

**Purpose:** First case study in the narrative sequence.

**Layout:** 120vw width. Split layout: Left 40% text narrative, Right 60% overlapping parallax images.

**Key Elements:**
- **Project Number:** `JetBrains Mono`, 96px, `#18182B` (watermark style behind text). Text: "01".
- **Project Title:** `Playfair Display`, 64px, `#F5F5FA`. Text: "Nexus FinTech".
- **Project Meta:** 3-column grid, `JetBrains Mono`, 12px, `#D9C2F0`. Columns: Role, Timeline, Platform.
- **Narrative Copy:** `DM Sans`, 16px, `#7E7E9A`. 2 paragraphs detailing the UX problem and solution.
- **Hero Image:** 800x600px, 0px radius, 1px `#7E7E9A` border. Shows main app dashboard.

**Interactions:**
- **Parallax Scroll:** Hero image moves horizontally at 0.8x scroll speed, creating depth behind the text overlay.
- **Hover Image:** Grayscale filter drops to 0% (full color), 500ms ease.

### Project 2 & 3: Aura & Lumina

**Purpose:** Continuing the narrative with distinct rhythm.

**Layout:** 120vw width each. Alternating layouts to break monotony (e.g., Image left, Text right for Project 2).

**Key Elements:**
- **Aura Image:** Two cascading portrait images (400x600px each) overlapping by 100px.
- **Lumina Video:** Auto-playing, muted MP4 prototype in a 900x500px container. 1px `#D9C2F0` border.
- **Typography:** Follows Project 1 hierarchy.

**Interactions:**
- **Intersection Observer:** Opacity scales from 0.2 to 1.0 as the pane enters the center 50% of the viewport.

### Outro / Contact Pane

**Purpose:** Off-ramp and conversion.

**Layout:** 80vw width. Centered focal point.

**Key Elements:**
- **CTA Headline:** `Playfair Display`, 80px, `#D9C2F0`. Text: "Let's build the next dimension."
- **Email Link:** `DM Sans`, 32px, `#F5F5FA`, underline.
- **View All Link:** `JetBrains Mono`, 14px, `#7E7E9A`, border-bottom 1px solid. Text: "VIEW ALL PROJECTS ->"

**Interactions:**
- **Hover View All:** Arrow translates right 8px, color shifts to `#F5F5FA`.

**Responsive:**
- **Desktop:** Strict horizontal scrolling.
- **Tablet/Mobile:** JS disables horizontal scroll, stacks panes vertically with 120px gap. Typography scales down 30%.

</details>

---

<details>
<summary>Build Guide</summary>

**Stack:** HTML + Tailwind CSS v3 + GSAP (ScrollTrigger)

**Build Order:**
1. **Global Shell & Typographic Scale:** Set up CSS variables, fonts (Playfair, DM Sans, JetBrains), and dark mode background (`#0A0A14`).
2. **Horizontal Container:** Implement GSAP ScrollTrigger to pin a main container and translate an inner flex-row container horizontally based on vertical scroll delta.
3. **Hero Pane:** Build the initial viewport height/width lock. Ensure scroll indicator works.
4. **Project Panes:** Build the split-pane layout. Apply 1px borders and test parallax image speeds.
5. **Outro Pane:** Final CTA and test the 'View All' hover state.

</details>