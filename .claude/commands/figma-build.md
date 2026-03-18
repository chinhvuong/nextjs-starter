# Figma Build

## Overview

Read the implementation plan from `PLAN.md` and execute it fully autonomously. Downloads assets, sets up fonts/typography, generates all components in parallel via subagents, assembles the page with SEO, and runs quality gates.

## Usage

```
/build-the-plan
/build-the-plan [page-name]
```

If no page-name given, find the most recent `PLAN.md` in `src/features/*/`.

## Instructions

### Step 0 — Load Plan

Read `src/features/{pageName}/PLAN.md`.

Extract:
- Page name, design dimensions, rem divisor
- Section list with nodeIds, components, heading assignments
- Common components list
- Typography catalog
- Asset list with filenames and Figma node IDs
- Font requirements
- SEO config (JSON-LD type, metadata, languages)

If PLAN.md doesn't exist, tell the user to run `/plan-figma-to-code` first.

---

### Step 1 — Project Setup (sequential, do before any generation)

#### 1a. Download ALL assets from Figma

For each asset in the plan:

**Images:**
- Use Figma MCP `get_figma_images({ fileKey, nodeId })` to get export URLs
- Download each image using `WebFetch` or `curl`
- Save to `public/assets/images/{pageName}/{filename}`
- Use the exact filenames from the plan (`d-` prefix for placeholders)

**SVGs/Icons:**
- Use Figma MCP `get_figma_images({ fileKey, nodeId })` with SVG format
- Save to `src/assets/icons/{filename}`
- Add/update exports in `src/assets/icons/index.ts`

**Logos:**
- Same as icons, save to `src/assets/icons/logo-{name}.svg`

#### 1b. Acquire & Register Fonts (must match Figma exactly)

For each font in the plan, try these sources IN ORDER until one works:

**Priority 1 — Google Fonts (via next/font/google):**
```tsx
import { Inter, Poppins } from 'next/font/google';
const poppins = Poppins({ subsets: ['latin', 'vietnamese'], weight: ['400', '600', '800'], variable: '--font-poppins', display: 'swap' });
```
- Check `next/font/google` supports the font name
- Include `vietnamese` subset if the page has Vietnamese content
- Add the font variable to `<html className>` in layout.tsx
- Add `--font-family-{name}` to `@theme` in globals.css

**Priority 2 — @fontsource npm package:**
```bash
npm install @fontsource/{font-name-lowercase}
# e.g., npm install @fontsource/gilroy
```
- Import in globals.css: `@import '@fontsource/{font-name}/{weight}.css';`
- Add `@font-face` if the package provides font files instead of CSS imports
- Add to Tailwind `@theme` block

**Priority 3 — Font files from project or web:**
- Search `public/assets/fonts/` or `src/assets/fonts/` for existing font files
- If found, create `@font-face` declarations in globals.css
- Search for the font on free font sites (use `WebSearch` to find download links)
- Download `.woff2` files to `public/assets/fonts/{font-name}/`

**Priority 4 — Closest Google Font alternative:**
- If the exact font is unavailable, find the closest match on Google Fonts
- Use `WebSearch` to find "{font-name} similar Google Font"
- Add a comment: `/* Using {alternative} as substitute for {original} — get exact font from design team */`

**After acquiring fonts:**
- Add the font-family CSS variable to `@theme` in globals.css
- Verify the font loads by checking the dev server
- Include ALL weights used in the design (400, 500, 600, 700, 800 etc.)

#### 1c. Create page CSS file

Create `src/features/{pageName}/{pageName}.css` with:

```css
/* Import base styles */

@layer components {
  /* === Typography Utilities === */
  /* Auto-generated from Figma design — DO NOT edit manually */

  /* PC (Desktop) */
  .pc-h1-64-eb {
    @apply text-[3.3333rem] font-extrabold leading-[1.2] tracking-[-0.03333rem];
  }
  /* ... all pc-* classes from the plan ... */

  /* SP (Mobile) */
  .sp-h1-32-eb {
    @apply text-[2rem] font-extrabold leading-[1.2] tracking-[-0.02rem];
  }
  /* ... all sp-* classes from the plan ... */

  /* === BEM Classes === */
  /* Will be added by component generators below */
}
```

Generate ALL typography utility classes from the plan's typography catalog.

#### 1d. Create scaffold files

**Route:** `src/app/{pageName}/page.tsx` — with full metadata, JSON-LD, hreflang from SEO plan
**Barrel:** `src/features/{pageName}/index.tsx`
**Page component:** `src/features/{pageName}/{pageName}-page.tsx` — imports all sections in layoutOrder + imports the CSS file

---

### Step 2 — Generate Common Components First (parallel)

Spawn one subagent per common component from the plan. Each subagent:

1. Gets the Figma design data for the component's node (`get_design_context`)
2. Gets a screenshot for reference (`get_screenshot`)
3. Generates the component following ALL rules from `figma-workflow.mdc`:
   - BEM CSS classes (append to page CSS file)
   - All dimensions in rem
   - Typography utility classes from Step 1c
   - Local asset paths from Step 1a
   - Semantic HTML, max 4-5 nesting levels
   - Named export, no inline styles, no Vietnamese names
4. Returns: component file path, BEM classes added, any warnings

**Run ALL common component subagents in parallel.**
Wait for all to complete before Step 3.

---

### Step 3 — Generate Section Components (parallel)

Spawn one subagent per section from the plan. Each subagent:

1. Gets the Figma design data for the section's node (`get_design_context`)
2. Gets a screenshot for visual reference (`get_screenshot`)
3. Gets image fills if the section has images (`get_image_fills`)
4. Generates the section component + any section-specific sub-components:
   - BEM CSS classes (append to page CSS file)
   - All dimensions in rem (using remDivisor from plan)
   - Use typography utility classes from Step 1c
   - Use local asset paths from Step 1a
   - Import common components from Step 2
   - `<h1>` ONLY if this section is marked as the H1 section in the plan
   - Semantic HTML, max 4-5 nesting levels
   - Each sub-component in its own directory: `{sub-component}/index.tsx`
5. Returns: file paths created, BEM classes added, warnings, TODOs

**Run ALL section subagents in parallel.**
Wait for all to complete before Step 4.

Each section subagent MUST read `figma-workflow.mdc` and follow:
- vw/rem fluid sizing
- BEM CSS architecture
- Semantic & flat HTML
- Naming conventions
- Asset handling rules
- Smart decomposition

---

### Step 4 — Assemble Page

After all components are generated:

1. **Update the page component** (`{pageName}-page.tsx`):
   - Import all section components in layoutOrder
   - `<Navbar>` before `<main>`, `<Footer>` after `<main>`
   - All other sections inside `<main>`

2. **Verify single H1:**
   - Grep all generated components for `<h1`
   - If more than one found → fix: change extras to `<h2>`
   - If none found → add to the section marked in plan

3. **Verify route file** has complete SEO:
   - Metadata (title, description, keywords, OpenGraph, alternates, robots)
   - JSON-LD schema
   - hreflang

4. **Create/update supporting files:**
   - `src/app/sitemap.ts` — add page entry
   - `src/app/not-found.tsx` — create if missing
   - `public/robots.txt` — create if missing

---

### Step 5 — Build & Lint (fix until clean)

```bash
# 1. Build check — must compile
npm run dev
# If errors → fix imports, types, missing files → retry until clean

# 2. ESLint
npx eslint src/features/{pageName} src/app/{pageName} --fix
# If errors → fix → retry

# 3. Prettier
npx prettier --write "src/features/{pageName}/**" "src/app/{pageName}/**"
```

Do NOT proceed to Step 6 until build is clean.

---

### Step 6 — Visual Verification & Self-Improvement Loop

This is the critical step. Compare the implementation against Figma **section by section** and keep fixing until it matches.

#### 6a. Setup
1. Ensure dev server is running (`npm run dev`)
2. Open browser via Claude in Chrome MCP:
   ```
   tabs_context_mcp({ createIfEmpty: true }) → tabId
   navigate({ url: "http://localhost:3000/{pageName}", tabId })
   computer({ action: "wait", duration: 3, tabId })
   ```
3. Fetch the full-page Figma screenshot:
   ```
   get_screenshot({ fileKey, nodeIds: [rootNodeId] })
   ```

#### 6b. Section-by-Section Comparison Loop

For EACH section in layoutOrder:

1. **Get Figma reference** for this section:
   ```
   get_screenshot({ fileKey, nodeIds: [sectionNodeId] })
   ```

2. **Get browser screenshot** of this section:
   ```
   read_page({ tabId })                    → find section element ref
   computer({ action: "scroll_to", ref, tabId })
   computer({ action: "screenshot", tabId })
   computer({ action: "zoom", region: [sectionBounds], tabId })  → focused screenshot
   ```

3. **Compare with Claude Vision** — analyze both images and list ALL differences:
   - **Typography:** font family (does it match Figma?), size, weight, color, line-height, letter-spacing
   - **Spacing:** padding, margin, gap between elements
   - **Colors:** background, text, borders, gradients, opacity
   - **Layout:** element positions, alignment, flex direction, dimensions
   - **Images/Icons:** present, correct size, correct position, not broken
   - **Missing elements:** anything in Figma but not in the implementation
   - **Extra elements:** anything in implementation but not in Figma

4. **If differences found → FIX them:**
   - Edit the component TSX and/or BEM CSS classes
   - For font mismatches: verify the font loaded correctly, check font-weight mapping
   - For spacing/sizing: recalculate rem values from Figma px
   - For missing elements: add them from the Figma design data
   - For color differences: use exact hex values from Figma

5. **Re-screenshot and compare again:**
   - After fixes, take a new browser screenshot of the same section
   - Compare again with Claude Vision
   - If still differences → fix again
   - **Repeat until this section matches** or differences are truly negligible (subpixel rendering, anti-aliasing)

6. **Move to next section** only when current section is verified

#### 6c. Full-Page Final Check

After all sections pass individually:

1. Take a full-page browser screenshot
2. Compare against full-page Figma screenshot
3. Check overall:
   - Section spacing/gaps between sections
   - Overall page flow and visual rhythm
   - No missing sections
   - Colors consistent across sections
4. Fix any remaining issues
5. Re-check until satisfied

#### 6d. Verification Checklist (must ALL pass)

- [ ] Every section visually matches Figma
- [ ] Fonts match Figma (correct family, weight, size)
- [ ] Colors match Figma (exact hex values)
- [ ] Spacing matches Figma (converted to rem correctly)
- [ ] All images/icons visible and correctly positioned
- [ ] No broken images or missing assets
- [ ] No Figma asset URLs remaining in code
- [ ] No inline `style={{ }}` props
- [ ] No Vietnamese in variable/class names
- [ ] Only one `<h1>` per page
- [ ] JSON-LD schema present
- [ ] Metadata complete
- [ ] `npm run dev` still compiles after all fixes
- [ ] ESLint still passes
- [ ] Prettier still formatted

---

### Step 7 — Report

```markdown
## ✅ Build Complete: {pageName}

### Files Created ({count})
  src/app/{pageName}/page.tsx
  src/features/{pageName}/index.tsx
  src/features/{pageName}/{pageName}-page.tsx
  src/features/{pageName}/{pageName}.css
  src/features/{pageName}/components/
    navbar/index.tsx
    hero-section/index.tsx
    ...

### Assets Downloaded
  public/assets/images/{pageName}/ ({count} images)
  src/assets/icons/ ({count} SVGs)

### SEO
  ✅ Metadata complete
  ✅ JSON-LD: {schemaType}
  ✅ hreflang: {languages}
  ✅ Single H1 in: {sectionName}
  ✅ sitemap.ts updated
  ✅ not-found.tsx present

### Quality
  ✅ Build: compiles
  ✅ ESLint: passes
  ✅ Prettier: formatted
  ✅ Visual: validated ({iterations} iterations)

### Warnings
  - {any warnings from subagents}

### TODOs (manual action needed)
  - {any TODOs like missing font files}
```

---

## Subagent Instructions

When spawning subagents for component generation, pass this context:

```
You are generating a React component from a Figma design.

CRITICAL RULES (from figma-workflow.mdc):
1. ALL dimensions in rem: rem = figma_px / {remDivisor}
2. BEM CSS classes in the page CSS file — JSX uses class names, NOT Tailwind utility strings
3. Typography: use pre-generated utility classes (pc-h2-54-s, etc.)
4. Assets: use LOCAL paths only (/assets/images/... or @/assets/icons/...)
5. Semantic HTML: <section>, <article>, <nav>, <header>, <footer>, <ul>+<li>, <button>, <a>
6. Max 4-5 nesting levels
7. No inline style={{ }}
8. No Vietnamese in names
9. Named export only
10. H1 only if assigned to this section

Page CSS file: {pageCssPath}
Typography classes available: {list}
Asset paths: {mapping}
Design width: {designWidth}px, rem divisor: {remDivisor}

Append your BEM classes to the page CSS file in @layer components.
Create the component at: {outputPath}
```

---

## Rules

1. **Read PLAN.md first** — the plan is the contract, follow it exactly.
2. **Download ALL assets before generating code** — no Figma URLs in components.
3. **Typography utilities first** — generate CSS file before spawning component subagents.
4. **Common components before sections** — sections may depend on common components.
5. **Maximum parallelism** — all common components in parallel, then all sections in parallel.
6. **Every subagent follows figma-workflow.mdc** — pass the rules in the subagent prompt.
7. **Fonts must match Figma** — try Google Fonts → @fontsource → font files → closest alternative.
8. **Quality gates are mandatory** — build, lint, format before visual verification.
9. **Visual verification is section-by-section** — screenshot each section, compare against Figma, fix, repeat until matched.
10. **Self-improve until done** — do NOT stop at 3 iterations. Keep fixing until every section visually matches Figma or differences are truly negligible (subpixel only).
11. **Fix issues autonomously** — don't ask the user, just fix and re-check.
12. **Report everything** — files, assets, SEO, quality, warnings, TODOs.
