# Plan Figma-to-Code

## Overview

Analyze a Figma design and produce a detailed implementation plan for user review. The plan lists components, sub-components, typography specs, assets to download, fonts, and SEO setup (if applicable). The user reviews and approves before building.

## Usage

```
/figma-plan [figma-url]
```

## Instructions

### Step 1 — Parse URL

Extract `fileKey` and `nodeId` (convert `-` to `:` in node-id param).

### Step 2 — Fetch Figma Data

Call the Figma MCP in parallel:

1. `get_design_context({ fileKey, nodeId })` — full structure + screenshot
2. `get_variable_defs({ fileKey, nodeId })` — design tokens
3. `get_code_connect_map({ fileKey, nodeId })` — existing mappings
4. `get_metadata({ fileKey, nodeId })` — structure overview

**CRITICAL: Only fetch data for the provided nodeId. NEVER navigate to parent frames, sibling frames, or the page root. Plan ONLY what the user gives you.**

If the metadata shows many direct children (indicating a large frame), also call `get_design_context` on key children to get detailed data.

### Step 3 — Determine Scope

Examine the fetched node to determine its scope:

**A. Full Page** — the node has many direct children at different Y positions, forming distinct visual sections (e.g., navbar, hero, footer). Typically height > 3000px with 5+ direct child frames.

**B. Single Section** — the node is one self-contained visual block (e.g., a hero banner, a product list, a footer). Typically one logical area.

**C. Single Component** — the node is a small reusable element (e.g., a button, a card, a nav item). Typically < 500px in both dimensions.

This scope determines the plan format (see Step 5).

### Step 4 — Analyze & Build Plan

From the Figma data, determine:

**A. Frame info:**
- Name (kebab-case slug)
- Design frame dimensions (width × height)
- rem divisor (`designWidth / 100`)
- **Viewport target:** `desktop` or `mobile` — determined by design width:
  - ≥ 1024px → `desktop` (common: 1440px, 1600px, 1920px)
  - < 1024px → `mobile` (common: 375px, 390px, 414px)
- **Layout strategy** (for full-page scope):
  - Identify which sections are **full-bleed** vs **contained**
  - Record the **content max-width**

**B. Components breakdown:**

For **Full Page** scope:
- List sections (direct children of root, ordered top-to-bottom by Y)
- For each section: name, nodeId, Figma URL, layout type, complexity, heading level, sub-components

For **Single Section** scope:
- List sub-components within the section
- For each: name, nodeId, what it does, whether it's repeated

For **Single Component** scope:
- List props/variants visible in the design
- Note interactive states if visible

**C. Common components** (reused across 2+ places):
- Buttons, cards, badges, etc. that appear multiple times
- Existing shared components from `src/shared/components/` to reuse

**D. Typography reference:**
Walk every text node, extract unique styles. For each unique style, list:
- Figma px size, font weight, line-height, letter-spacing, text-transform
- The equivalent Tailwind classes to apply directly in JSX
- Example: `text-[2.5rem] font-[800] leading-[1.5] tracking-[0.0625rem] uppercase font-[family-name:var(--font-family-gilroy)]`
- Do NOT generate custom CSS class names (no `pc-*` / `sp-*` classes)

**E. Assets to download:**
- Images → `public/assets/images/{pageName}/` with naming (`d-` prefix for placeholders, descriptive for production)
- Icons → `src/assets/icons/ic-{name}.svg`
- Logos → `src/assets/icons/logo-{name}.svg`

**F. Fonts (must match Figma exactly):**
For each font family found in the design:
1. Search Google Fonts: `https://fonts.google.com/?query={fontName}`
2. Search npm for `@fontsource/{font-name-lowercase}`
3. Search for the font on fontsource.org
4. If the font is a custom/proprietary font (e.g., SVN-Gilroy):
   - Search npm for packages containing the font name
   - Search for free alternatives with similar metrics
   - Note the exact font to acquire from the design team
5. Record: family name, source (google/fontsource/npm/custom), weights needed, installation method

**G. SEO plan (Full Page scope only):**
- JSON-LD schema type (Organization, Product, WebPage, etc.)
- Suggested metadata (title, description, keywords)
- hreflang languages

### Step 5 — Save Plan to File

Write the plan as a structured markdown file at:
- Full Page: `src/features/{pageName}/PLAN.md`
- Single Section: `src/features/{pageName}/PLAN.md` (create feature dir if needed)
- Single Component: `src/features/{pageName}/PLAN.md` or relevant feature dir

### Step 6 — Present Plan to User

Use the appropriate format based on scope:

---

#### Format A: Full Page

```markdown
## Plan: {Page Name}

**Figma:** {url}
**Scope:** Full Page
**Design:** {width}×{height}px | rem divisor: {divisor} | Viewport: {desktop/mobile}
**Layout:** Content max-width: {contentWidth}rem | Full-bleed sections: {list}
**Screenshot:** [embedded]

---

### Sections ({count})

| # | Section | Node ID | Layout | Complexity | Heading | Components |
|---|---------|---------|--------|------------|---------|------------|
| 1 | Navbar | 18:20 | full-bleed | simple | — | — |
| 2 | Hero | 18:35 | full-bleed | medium | **h1** | HeroSlideIndicator |
| ... | ... | ... | ... | ... | ... | ... |

### Common Components (shared across sections)

| Component | Used in | Source |
|-----------|---------|--------|
| Button | Hero, CTA | `@/shared/components/button` (existing) |
| ProductCard | FlashSale, Products | new — `components/product-card/` |

### Typography ({count} unique styles)

| # | Figma | Tailwind Classes | Used in |
|---|-------|-----------------|---------|
| 1 | 40px / 800 / 1.2 | `text-[2.5rem] font-[800] leading-[1.2] uppercase font-[family-name:var(--font-family-gilroy)]` | Hero |
| ... | ... | ... | ... |

### Assets to Download ({count})

| Type | Filename | Section | Figma Node |
|------|----------|---------|------------|
| image | d-hero-banner.webp | Hero | 341:100 |
| ... | ... | ... | ... |

### Fonts

| Family | Source | Weights | Install Method |
|--------|--------|---------|----------------|
| ... | ... | ... | ... |

### SEO

- **JSON-LD:** Organization
- **Title:** ...
- **Description:** ...

### Files to Create

...

**Total: ~{N} components**

---

Ready to build? Run: `/figma-build`
```

---

#### Format B: Single Section

```markdown
## Plan: {Section Name}

**Figma:** {url}
**Scope:** Single Section
**Design:** {width}×{height}px | rem divisor: {divisor} | Viewport: {desktop/mobile}
**Layout type:** {full-bleed / contained}
**Screenshot:** [embedded]

---

### Component Breakdown

| # | Component | Node ID | Description | Repeated |
|---|-----------|---------|-------------|----------|
| 1 | HeroBanner (root) | 21:66 | Main section wrapper | — |
| 2 | CarouselArrow | 2703:18737 | Left/right navigation arrows | ×2 |
| 3 | SlideIndicator | 341:3812 | Dot indicators for slides | — |
| ... | ... | ... | ... | ... |

### Typography

| # | Figma | Tailwind Classes | Element |
|---|-------|-----------------|---------|
| 1 | 40px / 800 / 1.5 | `text-[2.5rem] font-[800] leading-[1.5] tracking-[0.0625rem] uppercase font-[family-name:var(--font-family-gilroy)]` | Main heading |
| ... | ... | ... | ... |

### Assets to Download

| Type | Filename | Figma Node |
|------|----------|------------|
| image | d-hero-banner.webp | 341:3648 |
| ... | ... | ... |

### Fonts

| Family | Source | Weights | Install Method |
|--------|--------|---------|----------------|
| ... | ... | ... | ... |

### Files to Create

```
src/features/{pageName}/components/
  {section-name}/index.tsx                ← main section component
  {sub-component}/index.tsx               ← if complex enough to extract
```

**Total: ~{N} components**

---

Ready to build? Run: `/figma-build`
```

---

#### Format C: Single Component

```markdown
## Plan: {Component Name}

**Figma:** {url}
**Scope:** Single Component
**Design:** {width}×{height}px | rem divisor: {divisor}
**Screenshot:** [embedded]

---

### Props / Variants

| Prop | Values | Default |
|------|--------|---------|
| variant | default, hover, active | default |
| ... | ... | ... |

### Typography

| # | Figma | Tailwind Classes |
|---|-------|-----------------|
| ... | ... | ... |

### Assets

| Type | Filename | Figma Node |
|------|----------|------------|
| ... | ... | ... |

### File

```
src/features/{pageName}/components/{component-name}/index.tsx
```
```

---

## Rules

- **Do NOT generate any code** — this command only produces the plan.
- **Save the plan** to the appropriate `PLAN.md` location so `/figma-build` can read it.
- **NEVER navigate to parent frames.** Plan ONLY the exact node the user provides. If they send a single section, plan that section — do NOT find and plan the entire page.
- Use actual Figma node IDs from the fetched data — never invent.
- Follow Smart Decomposition: only extract sub-components for repeated patterns (3+), complex interactive elements, or code > 300 lines.
- Include Figma URL per component so each can be fetched individually during build.
- The plan is the contract — `/figma-build` follows it exactly.
