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
- Typography reference (Tailwind classes per text style)
- Asset list with filenames and Figma node IDs
- Font requirements
- SEO config (JSON-LD type, metadata, languages)

If PLAN.md doesn't exist, tell the user to run `/plan-figma-to-code` first.

---

### Step 1 — Project Setup (sequential, do before any generation)

#### 1a. Download ALL assets from Figma

The Figma MCP does NOT have a `get_figma_images` tool. Assets are extracted from `get_design_context` responses.

**How to get asset URLs:**
1. Call `get_design_context({ fileKey, nodeId })` for each section
2. The response contains asset URLs as constants at the top of the generated code:
   ```
   const imgBanner = "https://www.figma.com/api/mcp/asset/UUID";
   const imgLogo = "https://www.figma.com/api/mcp/asset/UUID";
   ```
3. Extract ALL `https://www.figma.com/api/mcp/asset/...` URLs from the response
4. Map each URL to its planned local filename using the `data-name` attributes in the code

**Downloading images:**
```bash
# Download to a temp file first (no extension), then detect and rename
curl -sL -o "/tmp/figma-asset-tmp" "FIGMA_ASSET_URL"
```

**IMPORTANT: Asset URLs expire after 7 days.** Download them immediately.

**CRITICAL: Detect the actual file format and use the correct extension.**
Figma asset URLs return images in their **native format** — this can be PNG, JPEG, SVG, WebP, GIF, or anything else. The format is unpredictable. You MUST detect it after download and use the matching extension.

**Use this helper function for ALL asset downloads:**
```bash
# Download a Figma asset with auto-detected extension
# Usage: download_figma_asset "FIGMA_URL" "path/without/extension"
download_figma_asset() {
  local url="$1"
  local base="$2"  # NO extension — e.g. public/assets/images/page/d-hero

  curl -sL -o /tmp/figma-dl-tmp "$url"

  # Auto-detect the real format from file content
  local mime
  mime=$(file -b --mime-type /tmp/figma-dl-tmp)
  local ext
  case "$mime" in
    image/png)                  ext="png" ;;
    image/jpeg)                 ext="jpg" ;;
    image/svg+xml)              ext="svg" ;;
    image/webp)                 ext="webp" ;;
    image/gif)                  ext="gif" ;;
    image/avif)                 ext="avif" ;;
    image/bmp)                  ext="bmp" ;;
    image/tiff)                 ext="tiff" ;;
    application/pdf)            ext="pdf" ;;
    text/xml|application/xml)   ext="svg" ;;  # SVG sometimes detected as XML
    text/html)
      echo "  SKIP: ${base} — received HTML (likely error page)"
      rm -f /tmp/figma-dl-tmp
      return 1
      ;;
    *)
      echo "  WARN: ${base} — unknown type '${mime}', defaulting to .png"
      ext="png"
      ;;
  esac

  mv /tmp/figma-dl-tmp "${base}.${ext}"
  echo "  OK: ${base}.${ext}"
}
```

**Usage — download each planned asset (NO extension in the path):**
```bash
download_figma_asset "FIGMA_URL_1" "public/assets/images/{pageName}/d-hero-banner"
download_figma_asset "FIGMA_URL_2" "public/assets/images/{pageName}/d-product-1"
download_figma_asset "FIGMA_URL_3" "src/assets/icons/ic-arrow-right"
```

The function will produce files like `d-hero-banner.png`, `d-product-1.jpg`, `ic-arrow-right.svg` — whatever the actual format is.

**After downloading, record the real filenames** so components reference the correct extension. When passing asset paths to subagents, use the actual filenames (with detected extensions), not hardcoded ones.

**SVGs that are icons/logos** (small, vector) should be downloaded to `src/assets/icons/` instead of `public/assets/images/`.

**Batch validation after all downloads:**
```bash
# Fix any remaining mismatches
for f in public/assets/images/{pageName}/*; do
  mime=$(file -b --mime-type "$f")
  actual_ext="${f##*.}"
  expected_ext=$(case "$mime" in
    image/png) echo png;; image/jpeg) echo jpg;; image/svg+xml) echo svg;;
    image/webp) echo webp;; image/gif) echo gif;; *) echo "$actual_ext";;
  esac)
  if [ "$actual_ext" != "$expected_ext" ]; then
    mv "$f" "${f%.*}.${expected_ext}"
    echo "Renamed: $(basename $f) → $(basename ${f%.*}).${expected_ext}"
  fi
done
```

**For SVGs/Icons:**
- SVG assets also come from `get_design_context` — look for icon-sized elements
- Download and save to `src/assets/icons/{filename}.svg`
- Validate: `file` should show "SVG Scalable Vector Graphics"
- Add/update exports in `src/assets/icons/index.ts`

**For Logos:**
- Same as icons, save to `src/assets/icons/logo-{name}.svg`

**Fallback for missing assets:**
- If an asset URL fails, use `get_screenshot({ fileKey, nodeIds: [nodeId] })` to capture the node as a PNG screenshot
- Save the screenshot as the asset — it won't be perfect but is better than a broken image

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

#### 1c. Create scaffold files

**Route:** `src/app/{pageName}/page.tsx` — with full metadata, JSON-LD, hreflang from SEO plan
**Barrel:** `src/features/{pageName}/index.tsx`
**Page component:** `src/features/{pageName}/{pageName}-page.tsx` — imports all sections in layoutOrder

---

### Step 2 — Generate Common Components First (parallel)

Spawn one subagent per common component from the plan. Each subagent:

1. Gets the Figma design data for the component's node (`get_design_context`)
2. Gets a screenshot for reference (`get_screenshot`)
3. Generates the component following ALL rules from `figma-workflow.mdc`:
   - Tailwind classes directly in JSX
   - All dimensions in rem
   - Typography: apply Tailwind classes directly in JSX (text-[size] font-[weight] leading-[lh] etc.)
   - Local asset paths from Step 1a
   - Semantic HTML, max 4-5 nesting levels
   - Named export, no inline styles, no Vietnamese names
4. Returns: component file path, Tailwind classes used, any warnings

**Run ALL common component subagents in parallel.**
Wait for all to complete before Step 3.

---

### Step 3 — Generate Section Components (parallel)

Spawn one subagent per section from the plan. Each subagent:

1. Gets the Figma design data for the section's node (`get_design_context`)
2. Gets a screenshot for visual reference (`get_screenshot`)
3. Gets image fills if the section has images (`get_image_fills`)
4. Generates the section component + any section-specific sub-components:
   - Tailwind classes directly in JSX
   - All dimensions in rem (using remDivisor from plan)
   - Typography: apply Tailwind classes directly in JSX per the plan's typography reference
   - Use local asset paths from Step 1a
   - Import common components from Step 2
   - `<h1>` ONLY if this section is marked as the H1 section in the plan
   - Semantic HTML, max 4-5 nesting levels
   - Each sub-component in its own directory: `{sub-component}/index.tsx`
5. Returns: file paths created, Tailwind classes used, warnings, TODOs

**Run ALL section subagents in parallel.**
Wait for all to complete before Step 4.

Each section subagent MUST read `figma-workflow.mdc` and follow:
- vw/rem fluid sizing
- Tailwind CSS classes directly in JSX
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
# 1. Build check — must compile (use next build, not dev)
npx next build --no-lint
# If errors → fix imports, types, missing files → retry until clean

# 2. ESLint
npx eslint src/features/{pageName} src/app/{pageName} --fix
# If errors → fix → retry

# 3. Prettier
npx prettier --write "src/features/{pageName}/**" "src/app/{pageName}/**"
```

Do NOT proceed to Step 6 until build is clean.

---

### Step 6 — Visual Verification & Self-Improvement Loop (Playwright)

This is the critical step. Use **Playwright** to screenshot the running page, compare against Figma screenshots, and fix differences iteratively.

#### 6a. Setup — Start Dev Server + Prepare Screenshot Tool

```bash
# Kill stale dev servers (IMPORTANT: old servers may cache old code)
lsof -ti:3000 | xargs kill -9 2>/dev/null

# Start fresh dev server
npm run dev &
sleep 5

# Verify server is ready
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/{pageName}
# Must return 200
```

**Screenshot utility** — use `scripts/screenshot.mjs` (or create it):
```js
// scripts/screenshot.mjs
import { chromium } from 'playwright';
const args = process.argv.slice(2);
const url = args.find(a => !a.startsWith('--')) || 'http://localhost:3000';
const output = args.filter(a => !a.startsWith('--'))[1] || '/tmp/screenshot.png';
const width = parseInt(args.find(a => a.startsWith('--width='))?.split('=')[1] || '1600');
const fullPage = args.includes('--full-page');
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width, height: 900 } });
await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForTimeout(1500);
await page.screenshot({ path: output, fullPage });
console.log(`Screenshot saved: ${output}`);
await browser.close();
```

#### 6b. Section-by-Section Comparison Loop

For EACH section in layoutOrder:

1. **Get Figma reference** for this section:
   ```
   get_screenshot({ fileKey, nodeIds: [sectionNodeId] })
   ```

2. **Take browser screenshot** with Playwright:
   ```bash
   node scripts/screenshot.mjs "http://localhost:3000/{pageName}" "/tmp/{section}.png" --width={designWidth}
   ```
   Then read the screenshot file with the `Read` tool to view it.

3. **Compare both images** — analyze side by side and list ALL differences:
   - **Aspect ratio:** does the section maintain Figma's proportions? (CRITICAL)
   - **Text wrapping:** do headings break on the same lines as Figma?
   - **Typography:** font family, size, weight, color, line-height
   - **Spacing:** padding, margin, gap between elements
   - **Colors:** background, text, borders, gradients, opacity
   - **Layout:** element positions, alignment, flex direction, dimensions
   - **Images/Icons:** present, correct size, correct position, not broken
   - **Interactive elements:** carousel arrows visible, indicators present
   - **Missing/extra elements**

4. **Common issues and fixes:**
   - **Aspect ratio broken (section too tall/short):** Use `aspect-[W/H]` on the section container
   - **Text wrapping differently:** Widen text container (`%`), add `whitespace-nowrap` on heading spans if lines are hardcoded
   - **Elements mispositioned:** Convert `rem` positions to `%` of parent
   - **Carousel not functional:** Add `useState` + `onClick` + `transition-transform`
   - **Dev server showing stale code:** Kill and restart (`lsof -ti:3000 | xargs kill -9`)
   - **Section computed height wrong:** Debug with Playwright `page.evaluate()` to check computed styles

5. **Re-screenshot after fixes:**
   ```bash
   # Wait for hot reload
   sleep 2
   node scripts/screenshot.mjs "http://localhost:3000/{pageName}" "/tmp/{section}-v2.png" --width={designWidth}
   ```
   Read and compare again. **Repeat until this section matches.**

6. **Test at multiple viewports** to confirm proportional sizing:
   ```bash
   node scripts/screenshot.mjs "http://localhost:3000/{pageName}" "/tmp/{section}-1920.png" --width=1920
   node scripts/screenshot.mjs "http://localhost:3000/{pageName}" "/tmp/{section}-1280.png" --width=1280
   ```

7. **Move to next section** only when current section is verified

#### 6c. Full-Page Final Check

After all sections pass individually:

1. Take full-page screenshots at design width and other viewports:
   ```bash
   node scripts/screenshot.mjs "http://localhost:3000/{pageName}" "/tmp/full-page.png" --width={designWidth} --full-page
   ```
2. Get full-page Figma screenshot for comparison
3. Check:
   - Section spacing/gaps between sections
   - Overall page flow and visual rhythm
   - No missing sections
   - Colors consistent across sections
   - All interactive elements present (carousel, buttons)
4. Fix any remaining issues and re-screenshot

#### 6d. Verification Checklist (must ALL pass)

- [ ] Every section visually matches Figma
- [ ] Fonts match Figma (correct family, weight, size)
- [ ] Colors match Figma (exact hex values)
- [ ] Spacing matches Figma (converted to rem correctly)
- [ ] All images/icons visible and correctly positioned
- [ ] No broken images or missing assets
- [ ] No Figma asset URLs remaining in code
- [ ] No inline `style={{ }}` props (except dynamic carousel transform)
- [ ] No Vietnamese in variable/class names
- [ ] Only one `<h1>` per page
- [ ] JSON-LD schema present
- [ ] Metadata complete
- [ ] `npm run dev` still compiles after all fixes
- [ ] ESLint still passes
- [ ] Prettier still formatted
- [ ] No custom CSS typography classes (no pc-*, sp-* — all Tailwind in JSX)

---

### Step 7 — Report

```markdown
## ✅ Build Complete: {pageName}

### Files Created ({count})
  src/app/{pageName}/page.tsx
  src/features/{pageName}/index.tsx
  src/features/{pageName}/{pageName}-page.tsx
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

CRITICAL RULES:
1. PROPORTIONAL SIZING — use the right unit for each property:
   - Section container: `aspect-[W/H]` to lock Figma proportions (e.g., `aspect-[1600/627]`)
   - Positions (left, top): `%` of parent (figma_px / designDimension × 100)
   - Font sizes: ALWAYS `rem` (figma_px / remDivisor) — never vw for fonts
   - Spacing (gap, padding): `rem` by default
   - Element widths: `%` of parent
   - Small fixed elements (dots, borders, blur): `px`
   - Button/icon sizes: `rem` or Tailwind classes (w-12 = 48px)
   - This ensures the design scales while keeping text accessible
2. Tailwind CSS classes directly in JSX — use arbitrary values for exact Figma dimensions
3. Typography: apply Tailwind classes directly in JSX — text-[2.5vw] font-[weight] leading-[lh] tracking-[ls] font-[family-name:var(--font-family-name)]
   - Do NOT use custom CSS utility classes (no pc-*, sp-* classes)
   - Do NOT create or import any page CSS file for typography
4. Assets: DOWNLOAD all images from Figma asset URLs to local paths, then reference LOCAL paths only
   - Images → public/assets/images/{pageName}/d-{name}.png
   - Icons → src/assets/icons/ic-{name}.svg
   - Use `curl -sL -o <path> <figma-url>` to download
   - Validate with `file <path>` — must be PNG/JPEG/SVG, not HTML
   - NEVER use figma.com URLs in the final component code
5. CAROUSEL/SLIDER: If design has carousel indicators (dots/arrows):
   - Implement functional slider with useState + translateX transition
   - Count dots in Figma = TOTAL_SLIDES
   - Arrows must navigate, dots must be clickable
   - Auto-advance with setInterval (5s)
   - `style={{ transform }}` is the ONE allowed inline style (dynamic value)
6. Semantic HTML: <section>, <article>, <nav>, <header>, <footer>, <ul>+<li>, <button>, <a>
7. Max 4-5 nesting levels
8. No inline style={{ }} except for dynamic carousel transform
9. No Vietnamese in names
10. Named export only, React.FC type annotation
11. H1 only if assigned to this section
12. Add 'use client' directive at the TOP of the file (before imports) if the component uses:
    - React hooks (useState, useEffect, useRef, useCallback)
    - Event handlers (onClick, onChange, onSubmit, etc.)
    - Browser APIs (window, document)

Asset paths: {mapping}
Design: {designWidth}×{designHeight}px, rem divisor: {remDivisor}

Apply all typography as Tailwind classes directly in JSX. No separate CSS file needed.
Create the component at: {outputPath}
```

---

## Rules

1. **Read PLAN.md first** — the plan is the contract, follow it exactly.
2. **Download ALL assets before generating code** — no Figma URLs in components.
3. **No separate CSS for typography** — apply Tailwind classes directly in JSX, no page CSS file.
4. **Common components before sections** — sections may depend on common components.
5. **Maximum parallelism** — all common components in parallel, then all sections in parallel.
6. **Every subagent follows figma-workflow.mdc** — pass the rules in the subagent prompt.
7. **Fonts must match Figma** — try Google Fonts → @fontsource → font files → closest alternative.
8. **Quality gates are mandatory** — build, lint, format before visual verification.
9. **Visual verification is section-by-section** — screenshot each section, compare against Figma, fix, repeat until matched.
10. **Self-improve until done** — do NOT stop at 3 iterations. Keep fixing until every section visually matches Figma or differences are truly negligible (subpixel only).
11. **Fix issues autonomously** — don't ask the user, just fix and re-check.
12. **Report everything** — files, assets, SEO, quality, warnings, TODOs.
