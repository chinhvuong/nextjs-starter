# Fix to Figma — Verify & Fix Code Against Design

## Overview

Compare existing implementation against the Figma design, identify discrepancies, and surgically fix them. Does NOT regenerate from scratch — reads existing code and corrects only what differs. Supports an optional issue description to focus the fix on a specific problem.

## Usage

```
/fix-to-figma [figma-url]
/fix-to-figma [figma-url] [issue-description]
/fix-to-figma [section-hint] [figma-url]
/fix-to-figma [section-hint] [figma-url] [issue-description]
```

**Examples:**
```
/fix-to-figma https://www.figma.com/design/ABC123/KingTech?node-id=1-2
/fix-to-figma https://www.figma.com/design/ABC123/KingTech?node-id=18-35 font is wrong, spacing between cards is too large
/fix-to-figma hero-section https://www.figma.com/design/ABC123/KingTech?node-id=18-35
/fix-to-figma hero-section https://www.figma.com/design/ABC123/KingTech?node-id=18-35 background image is not full width, CTA button color is off
/fix-to-figma navbar https://www.figma.com/design/ABC123/KingTech?node-id=18-20 dropdown menu is missing, logo size is too small
```

---

## Instructions

### Step 1 — Parse Input

Extract from the arguments:
- `sectionHint` (optional) — kebab-case component name before the URL
- `fileKey` and `nodeId` — from the Figma URL (convert `-` to `:`)
- `issueDescription` (optional) — free-text after the URL describing the problem

If `issueDescription` is provided, it guides **where to look first** but the full diff is still performed.

### Step 2 — Fetch Figma Design

1. `get_design_context({ fileKey, nodeId, framework: "react" })` — reference structure + code
2. `get_variable_defs({ fileKey, nodeId })` — design tokens for color/spacing accuracy
3. `get_screenshot({ fileKey, nodeIds: [nodeId] })` — visual reference

Record: reference JSX, screenshot image, root dimensions, asset URLs.

### Step 3 — Detect Viewport & rem Divisor

| Frame width | Viewport | rem divisor |
|-------------|----------|-------------|
| ≥1200px | Desktop | width / 100 |
| 640–1199px | Tablet | width / 100 |
| <640px | Mobile | width / 100 (4.266667vw base) |

### Step 4 — Find Existing Implementation

1. If `sectionHint` given → look in `src/features/*/components/{sectionHint}/`
2. Search `src/features/` for matching component names or layer names
3. Read each found component file + its BEM classes in the page CSS file
4. Read the page CSS file for typography utility classes

### Step 5 — Diff Against Figma

If `issueDescription` was provided, **prioritize checking those areas first**, then do the full diff.

Compare node by node. Check for:

| Category | What to check |
|----------|---------------|
| **rem values** | All dimensions must use rem, not px. Flag any hardcoded px. |
| **BEM classes** | Styles should be in CSS file as BEM, not inline Tailwind strings |
| **Typography** | Must use utility classes (pc-h2-54-s), not raw font values |
| **Font matching** | Font family must match Figma — check if correct font is loaded |
| **Layout** | Flex direction, gap, alignment, padding, margin |
| **Colors** | Background, text, border — exact hex from Figma tokens |
| **Spacing** | Padding, margin, gap — recalculate rem from Figma px |
| **Assets** | Flag any `figma.com/api/mcp/asset/` URLs (expired!) |
| **Inline styles** | Flag any `style={{ }}` that should be BEM/Tailwind |
| **Naming** | Flag Vietnamese in variable/class names |
| **Semantic HTML** | Check div-soup, missing semantic elements |
| **H1 count** | Verify only one H1 on the page |
| **Missing elements** | Anything in Figma but not in the code |
| **Extra elements** | Anything in code but not in Figma |

Produce a prioritized diff list:
```
[CRITICAL] Root uses w-[1600px] → must use rem-based width
[ASSET] hero-banner.webp uses expired Figma URL → download to public/
[FONT] SVN-Gilroy not loaded → install via @fontsource or Google Fonts
[STYLE] .hero__title uses inline fontSize → move to BEM class with pc-h1-64-eb
[NAMING] variable "tieuDe" → rename to "heading"
[FIX] .hero__description color #666 → should be #4A4A4A per Figma
[MISSING] CTA secondary button exists in Figma but not in code
[SEO] Missing JSON-LD schema
```

If `issueDescription` was provided, tag related items with `[REPORTED]`:
```
[REPORTED][FONT] Font family doesn't match — SVN-Gilroy not loaded
[REPORTED][FIX] Card gap is gap-6 → should be gap-[1.25rem] per Figma
[FIX] .hero__description color #666 → should be #4A4A4A per Figma
```

### Step 6 — Apply Fixes

- Fix `[REPORTED]` items first (user's stated issues), then by priority: CRITICAL → ASSET → FONT → STYLE → NAMING → FIX → MISSING → SEO
- Fix one item at a time using `Edit` (targeted replacement)
- For font issues: try to acquire the correct font (Google Fonts → @fontsource → font files → closest alternative)
- Download expired assets before updating references
- Update BEM classes in the CSS file
- Re-read each file after editing to verify the fix applied

### Step 7 — Visual Verification Loop

1. Ensure dev server is running (`npm run dev` — must compile after fixes)
2. Take browser screenshot of the fixed section:
   ```
   tabs_context_mcp({ createIfEmpty: true }) → tabId
   navigate({ url: "http://localhost:3000/{pageName}", tabId })
   computer({ action: "wait", duration: 3, tabId })
   read_page({ tabId }) → find section ref
   computer({ action: "scroll_to", ref, tabId })
   computer({ action: "screenshot", tabId })
   ```
3. Compare browser screenshot against Figma screenshot with Claude Vision
4. If differences remain → fix them → re-screenshot → compare again
5. **Repeat until the section matches Figma** — no fixed iteration limit
6. Only stop when differences are truly negligible (subpixel rendering only)

### Step 8 — Final Quality Check

```bash
npx eslint src/features/{pageName} --fix
npx prettier --write "src/features/{pageName}/**"
```

### Step 9 — Report

```
## Fix Report — {Section Name}

### Issue
{issueDescription or "Full diff against Figma"}

### Viewport
Figma frame: {width} × {height}px → {platform} (rem divisor: {divisor})

### Fixes applied
| Priority | File | Change |
|----------|------|--------|
| REPORTED | kingtech.css | Font → installed @fontsource/gilroy, updated .hero__title |
| REPORTED | kingtech.css | Card gap → gap-6 to gap-[1.25rem] |
| CRITICAL | hero-section/index.tsx | w-[1600px] → w-full |
| ASSET | hero-section/index.tsx | Figma URL → /assets/images/kingtech/d-hero-banner.webp |
| FIX | kingtech.css | .hero__description color → text-[#4A4A4A] |

### Verified
- Screenshot matches Figma ✅ ({N} fix iterations)

### No changes needed
- Navbar (matches Figma ✅)

### Remaining TODOs
- Mobile variant not in Figma — add sp-* classes when designs available
```

---

## Rules

1. **Never regenerate from scratch** — only fix what differs.
2. **User's reported issue is top priority** — fix it first, then handle other diffs.
3. **Always fetch fresh Figma data** — never use cached values.
4. **All fixes use rem** — convert any remaining px to rem.
5. **BEM classes over inline** — move inline styles to CSS file.
6. **Typography utilities** — replace raw font values with pc-*/sp-* classes.
7. **Fonts must match Figma** — acquire the correct font (Google → @fontsource → files → alternative).
8. **Minimal edits** — change only what differs from Figma.
9. **Re-read after edit** — verify the fix applied correctly.
10. **Visual verification until done** — screenshot, compare, fix, repeat. No iteration limit.
11. **Quality gates must pass** — build, lint, format after all fixes.
