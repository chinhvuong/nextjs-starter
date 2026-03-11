---
name: figma-to-code
description: Converts Figma designs to React/TypeScript components following this Next.js 14 codebase conventions. Exports icons and images from Figma to source code, optimizes images (WebP when possible). Includes self-test via browser MCP (inspect, capture, navigate). Use when implementing designs from Figma, design specs, screenshots, exporting Figma assets, or when the user mentions Figma, design-to-code, or UI implementation from designs.
---

# Figma to Code

Converts Figma designs into React components that follow this project's architecture, styling, and conventions. Exports icons and images from Figma, optimizes them, and self-tests the implementation.

## Required Flow (Do Not Skip)

1. **Fetch Figma data**: Call `get_figma_data` (Framelink MCP) with `fileKey` and `nodeId` if provided in URL.
2. **Identify assets**: From the response, extract image/icon node IDs, `imageRef` (for raster fills), and desired filenames.
3. **Download assets**: Call `download_figma_images` with `nodes` and `localPath` → `src/assets/icons/` (icons) or `src/assets/logos/` (logos).
4. **Export icons**: Add exports in `src/assets/icons/index.ts` if new icons were added.
5. **Implement**: Generate components using project conventions.
6. **Self-test**: Use browser MCP to inspect and capture the result.

## Quick Start

1. **Identify placement**: Is this a new feature, shared component, or page?
2. **Choose location** per placement rules below
3. **Export assets first** (icons, images) before implementing
4. **Map Figma elements** to project patterns
5. **Generate code** following conventions

## Placement Rules

| Figma Context | Location | Example |
|---------------|----------|---------|
| Reusable across features | `src/shared/components/[component-name]/` | Button, Card, Modal |
| Feature-specific UI | `src/features/[feature]/components/[component-name]/` | BorrowForm, TokenSelector |
| New page/screen | `src/features/[feature]/` + `app/[route]/page.tsx` | borrow-page.tsx |
| New route | `src/app/[route]/page.tsx` (routing only) | Import from features |

## Figma → Code Mapping

### Layout
- **Auto-layout (horizontal)** → `flex items-center gap-X` or `flex flex-row`
- **Auto-layout (vertical)** → `flex flex-col gap-X`
- **Auto-layout (wrap)** → `flex flex-wrap gap-X`
- **Constraints: fill** → `w-full` or `h-full`
- **Constraints: hug** → No width/height (content-sized)
- **Frame padding** → `p-X` (4, 6, 8, 12, 16, 24)

### Typography
- **Display** → `text-display text-foreground` or `text-3xl font-bold`
- **Heading** → `text-heading` or `text-xl font-semibold`
- **Body** → `text-body text-muted-foreground` or `text-base`
- **Caption** → `text-caption text-muted-foreground` or `text-sm`
- **Monospace** → `text-mono font-mono` (addresses, code)

### Colors
Use semantic theme colors only:
- **Primary** → `bg-primary-600`, `text-primary-600`
- **Surface** → `bg-surface`, `bg-background`
- **Text** → `text-foreground`, `text-muted-foreground`
- **Border** → `border-border`
- **Status** → `text-success`, `text-error`, `text-warning`

### Spacing Scale
Map Figma spacing to Tailwind: 4→4, 8→8, 12→12, 16→16, 24→24, 32→32, 48→48

### Components
- **Card-like frame** → Use `Card`, `CardHeader`, `CardContent`, `CardFooter` from `@/shared/components/card`
- **Button** → Use `Button` from `@/shared/components/button` with variant (primary, secondary, outline, ghost, destructive)
- **Modal** → Use `Modal` from `@/shared/components/modal`
- **Form inputs** → React Hook Form + Zod (see state-management rules)

## Component Output Format

```tsx
// 1. Imports (ordered: React, features, shared, utils, types)
import React from 'react';
import { cn } from '@/shared/utils/cn';
import type { ComponentNameProps } from './types';

// 2. Types
interface ComponentNameProps {
  children: React.ReactNode;
  className?: string;
}

// 3. Component - named export, React.FC
export const ComponentName: React.FC<ComponentNameProps> = ({ children, className }) => {
  return (
    <div className={cn('base-classes', className)}>
      {children}
    </div>
  );
};
```

## File Structure (CRITICAL)

**Always use directory-based structure:**
```
components/
└── [component-name]/
    ├── index.tsx          # Main component
    ├── [sub-component].tsx # If complex
    └── types.ts           # If complex types
```

**Never** create `component-name.tsx` as a single file in components folder.

## Styling Rules

- Use `cn()` from `@/shared/utils/cn` for all className merging
- Order classes: layout → spacing → typography → colors → borders → effects → className prop
- Use component classes from globals.css when repeated: `dashboard-card`, `metric-card`, `status-badge`
- Mobile-first: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`

## Checklist Before Output

- [ ] Component in correct directory with `index.tsx`
- [ ] Named export (not default)
- [ ] Semantic theme colors (no hardcoded hex)
- [ ] `cn()` for className merging
- [ ] Types defined (interface or types.ts)
- [ ] File under 500 lines (split if needed)
- [ ] Accessibility: labels, alt text, aria-labels for icon buttons

## Assets & Export (Figma → Source)

Export icons and images from Figma before implementing. Use **Framelink MCP** (`get_figma_data`, `download_figma_images`).

### Workflow

1. **Get Figma data**: `get_figma_data` with `fileKey` (and `nodeId` from URL).
2. **Parse response**: Extract image/icon nodes. Each needs:
   - `nodeId` (e.g. `1234:5678`)
   - `imageRef` (required for raster fills; leave blank for SVG)
   - `fileName` (e.g. `close.svg`, `hero-bg.png`)
3. **Download**: `download_figma_images` with:
   - `fileKey`, `nodes`, `localPath` (absolute path)
   - Icons → `src/assets/icons/`
   - Logos → `src/assets/logos/`
4. **Export icons**: Add to `src/assets/icons/index.ts`:
   ```ts
   export { default as CloseIcon } from './close.svg';
   ```
5. **Import in code**: `import { CloseIcon } from '@/assets/icons';` (as React component)

### Asset Paths

| Type | Path | Import |
|------|------|--------|
| Icons | `src/assets/icons/` | `import { IconName } from '@/assets/icons'` |
| Logos | `src/assets/logos/` | Path or `next/image` |

### Rules

- **DO NOT** add new icon packages. All assets come from Figma.
- **DO NOT** use placeholders if Figma MCP returns a localhost image source.
- Prefer **SVG** for icons (vector, scalable, no optimization needed).
- For PNG from Figma: use `next/image` for automatic optimization.

## Image Optimization

- **SVG icons**: No conversion. Use as-is; already optimal.
- **Raster images (PNG, JPG)**: Use `next/image` — Next.js serves WebP automatically when the browser supports it.
- **Static PNG in public/**: If not using `next/image`, consider converting to WebP (e.g. `sharp`) for smaller size. Prefer `next/image` when possible.

```tsx
import Image from 'next/image';

<Image src="/path/to/image.png" alt="..." width={W} height={H} />
```

## Self-Test (Browser MCP)

After implementing UI, verify the result using **cursor-ide-browser** MCP. Use **inspect** (DOM/structure) and **capture** (screenshot) to validate against the design.

### When to Self-Test

- After creating or modifying a page/component
- When user asks to verify implementation
- Before considering the task complete

### Inspect (Structure)

Use `browser_snapshot` to verify DOM, accessibility tree, and element structure:

- Expected text content, headings, button labels
- Form fields, roles, and hierarchy
- No missing or broken elements

### Capture (Visual)

Use `browser_take_screenshot` to verify visual parity:

- `fullPage: true` for full page
- `element` or `ref` for component-specific capture
- Save with `filename` for comparison

### Workflow

1. **Ensure dev server is running** (`npm run dev`). Start it if needed.

2. **Open the page**:
   - `browser_tabs` (action: "list") to check existing tabs
   - `browser_navigate` to `http://localhost:3000/[route]` (e.g. `/borrow`, `/`)
   - Use `newTab: true` if no tab exists

3. **Lock for automation** (if interacting):
   - `browser_lock` before interactions
   - `browser_unlock` when done

4. **Inspect**: `browser_snapshot` — verify structure, text, roles.

5. **Capture**: `browser_take_screenshot` — verify visual match to design.

6. **Verify**: Compare to Figma. Fix and re-test if discrepancies found.

### MCP Tools Reference

| Tool | Purpose |
|------|---------|
| `browser_tabs` | List/create/select tabs |
| `browser_navigate` | Open URL (use `take_screenshot_afterwards: true` optionally) |
| `browser_snapshot` | **Inspect** page DOM/accessibility tree |
| `browser_take_screenshot` | **Capture** visual (fullPage, element, filename) |
| `browser_lock` / `browser_unlock` | Lock during automation |

### Lock/Unlock Order

- Cannot lock before first navigate
- Order: `browser_navigate` → `browser_lock` → (inspect/interact) → `browser_unlock`

## Additional Resources

- For detailed Figma-to-Tailwind mapping and asset workflow, see [reference.md](reference.md)
- Project rules: `.cursor/rules/project-structure.mdc`, `figma-mcp-integration.mdc`, `coding-standards.mdc`
