# Plan Figma-to-Code

## Overview

Analyze a Figma design and produce a detailed implementation plan for user review. The plan lists every section, its components, common/shared components, typography utilities, assets to download, fonts, and SEO setup. The user reviews and approves before building.

## Usage

```
/plan-figma-to-code [figma-url]
```

## Instructions

### Step 1 — Parse URL

Extract `fileKey` and `nodeId` (convert `-` to `:` in node-id param).

### Step 2 — Fetch Figma Data

Call the Figma MCP in order:

1. `get_design_context({ fileKey, nodeId, framework: "react" })` — full structure
2. `get_variable_defs({ fileKey, nodeId })` — design tokens
3. `get_code_connect_map({ fileKey, nodeId })` — existing mappings
4. `get_screenshot({ fileKey, nodeIds: [nodeId] })` — visual reference
5. `get_image_fills({ fileKey, nodeId })` — image assets

For large designs, also call `get_design_context` on each direct child (section) individually to get detailed data.

### Step 3 — Analyze & Build Plan

From the Figma data, determine:

**A. Page info:**
- Page name (kebab-case slug)
- Design frame dimensions (width × height)
- rem divisor (`designWidth / 100`)
- **Viewport target:** `desktop` or `mobile` — determined by design width:
  - ≥ 1024px → `desktop` (common: 1440px, 1600px, 1920px)
  - < 1024px → `mobile` (common: 375px, 390px, 414px)
- **Layout strategy** (critical for desktop designs):
  - Identify which sections are **full-bleed** (background spans entire viewport width) vs **contained** (content has a max-width)
  - For each section, determine: does the background/image extend edge-to-edge, or is the whole section contained?
  - Record the **content max-width** if sections have centered content (often the design width itself, e.g., 1600px)
  - Note: a 1600px design does NOT mean the page is 1600px wide — it means content is designed at 1600px but the page fills the viewport. Backgrounds, hero images, and full-width sections must stretch to 100% viewport width.

**B. Sections** (direct children of root, ordered top-to-bottom by Y):
For each section:
- Name (infer from layer name/content)
- Figma nodeId
- Figma URL for that section: `https://www.figma.com/design/{fileKey}?node-id={nodeId-with-hyphens}`
- **Layout type:** `full-bleed` or `contained`
  - `full-bleed`: background/image stretches to 100vw, content may be centered within a max-width
  - `contained`: entire section is constrained to a max-width and centered
- Complexity: simple / medium / complex
- Which heading level it uses (h1 for exactly ONE section, h2 for others)
- Sub-components needed (only for repeated patterns 3+, complex interactive elements, or >300 lines)

**C. Common components** (reused across 2+ sections):
- Buttons, cards, badges, nav items that appear in multiple sections
- Existing shared components from `src/shared/components/` to reuse

**D. Typography catalog:**
Walk every text node, extract unique styles, generate class names:
- Format: `pc-{role}-{figmaPx}-{weightCode}` and `sp-{role}-{figmaPx}-{weightCode}`
- Conversion: `rem = figma_px / remDivisor`

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

**G. SEO plan:**
- JSON-LD schema type (Organization, Product, WebPage, etc.)
- Suggested metadata (title, description, keywords)
- hreflang languages

### Step 4 — Save Plan to File

Write the plan as a structured markdown file at:
`src/features/{pageName}/PLAN.md`

### Step 5 — Present Plan to User

Print the plan in a clear, reviewable format:

```markdown
## Plan: {Page Name}

**Figma:** {url}
**Design:** {width}×{height}px | rem divisor: {divisor} | Viewport: {desktop/mobile}
**Layout:** Content max-width: {contentWidth}rem | Full-bleed sections: {list}
**Screenshot:** [embedded]

---

### Sections ({count})

| # | Section | Node ID | Layout | Complexity | Heading | Components |
|---|---------|---------|--------|------------|---------|------------|
| 1 | Navbar | 18:20 | full-bleed | simple | — | — |
| 2 | Hero | 18:35 | full-bleed | medium | **h1** | HeroSlideIndicator |
| 3 | Product Categories | 18:50 | contained | medium | h2 | CategoryCard (×8) |
| 4 | Flash Sale | 18:70 | contained | complex | h2 | CountdownTimer, ProductCard (×4) |
| ... | ... | ... | ... | ... | ... | ... |
| 14 | Footer | 18:900 | full-bleed | medium | — | FooterColumn (×4) |

### Common Components (shared across sections)

| Component | Used in | Source |
|-----------|---------|--------|
| Button | Hero, FlashSale, CTA | `@/shared/components/button` (existing) |
| ProductCard | FlashSale, Products | new — `src/features/{pageName}/components/product-card/` |
| SectionHeading | 6 sections | new — `src/features/{pageName}/components/section-heading/` |

### Typography ({count} unique styles)

| Class | Figma | rem | Weight | Line Height | Used in |
|-------|-------|-----|--------|-------------|---------|
| pc-h1-64-eb | 64px | 3.3333rem | 800 | 1.2 | Hero |
| pc-h2-40-b | 40px | 2.0833rem | 700 | 1.2 | 6 sections |
| pc-body-16-r | 16px | 0.8333rem | 400 | 1.5 | everywhere |
| ... | ... | ... | ... | ... | ... |

### Assets to Download ({count})

| Type | Filename | Section | Figma Node |
|------|----------|---------|------------|
| image | d-hero-banner.webp | Hero | 341:100 |
| image | d-product-1.webp | Products | 341:200 |
| icon | ic-arrow-right.svg | Hero, Products | 341:300 |
| logo | logo-kingtech.svg | Navbar, Footer | 341:400 |
| ... | ... | ... | ... |

### Fonts (must match Figma)

| Family | Source | Weights | Install Method |
|--------|--------|---------|----------------|
| SVN-Gilroy | custom | 400, 600, 800 | npm: `@fontsource/gilroy` or font files from design team |
| Inter | google | 400, 500, 600, 700 | Already in project ✅ |

**Font acquisition priority:** Google Fonts → @fontsource npm → font files from team → closest alternative

### SEO

- **JSON-LD:** Organization
- **Title:** KingTech - Máy Massage Mắt Cao Cấp
- **Description:** Thương hiệu máy massage mắt hàng đầu...
- **Languages:** vi, en

### Files to Create

```
src/app/{pageName}/page.tsx                          ← route + metadata + JSON-LD
src/features/{pageName}/index.tsx                    ← barrel
src/features/{pageName}/{pageName}-page.tsx          ← page assembly
src/features/{pageName}/{pageName}.css               ← BEM + typography
src/features/{pageName}/PLAN.md                      ← this plan
src/features/{pageName}/components/
  navbar/index.tsx
  hero-section/index.tsx
  hero-slide-indicator/index.tsx
  product-categories/index.tsx
  category-card/index.tsx
  ...
  footer/index.tsx
  footer-column/index.tsx
public/assets/images/{pageName}/                     ← downloaded images
src/assets/icons/                                    ← downloaded SVGs
```

**Total: ~{N} components**

---

Ready to build? Run: `/figma-build`
```

---

## Rules

- **Do NOT generate any code** — this command only produces the plan.
- **Save the plan** to `src/features/{pageName}/PLAN.md` so `/figma-build` can read it.
- Use actual Figma node IDs — never invent.
- Follow Smart Decomposition: 20-40 components for a full landing page.
- Include Figma URL per section so each can be fetched individually during build.
- The plan is the contract — `/build-the-plan` follows it exactly.
