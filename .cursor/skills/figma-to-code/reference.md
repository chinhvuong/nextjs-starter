# Figma to Code Reference

Detailed mapping for converting Figma designs to this codebase.

## Theme Colors (globals.css)

| Figma Color | Tailwind Class | Usage |
|-------------|----------------|-------|
| Primary Blue | `primary-50` to `primary-900` | Brand, CTAs |
| Gray scale | `gray-50` to `gray-900` | Neutral UI |
| Success | `success`, `success-light` | Positive states |
| Warning | `warning`, `warning-light` | Caution |
| Error | `error`, `error-light` | Errors |
| Surface | `surface`, `surface-secondary` | Backgrounds |
| Muted | `muted`, `muted-foreground` | Secondary text |
| Border | `border` | Dividers, borders |

## Shared Components Available

| Component | Import | Props |
|-----------|--------|-------|
| Button | `@/shared/components/button` | variant, size, loading, disabled |
| Card | `@/shared/components/card` | Card, CardHeader, CardTitle, CardContent, CardFooter |
| Modal | `@/shared/components/modal` | isOpen, onClose, children |

## Figma Auto-Layout → Tailwind

| Figma Property | Tailwind Equivalent |
|----------------|---------------------|
| Direction: Horizontal | `flex flex-row` or `flex` |
| Direction: Vertical | `flex flex-col` |
| Align: Min | `items-start` or `justify-start` |
| Align: Center | `items-center` or `justify-center` |
| Align: Max | `items-end` or `justify-end` |
| Align: Stretch | `items-stretch` |
| Space between | `justify-between` |
| Gap: 4 | `gap-1` |
| Gap: 8 | `gap-2` |
| Gap: 12 | `gap-3` |
| Gap: 16 | `gap-4` |
| Gap: 24 | `gap-6` |
| Gap: 32 | `gap-8` |
| Padding: 16 | `p-4` |
| Padding: 24 | `p-6` |
| Padding: 32 | `p-8` |

## Typography Scale

| Figma Style | Tailwind | Use Case |
|-------------|----------|----------|
| 24px+ bold | `text-2xl font-bold` | Page titles |
| 18-20px semibold | `text-lg font-semibold` | Section headers |
| 16px medium | `text-base font-medium` | Body emphasis |
| 14px regular | `text-sm` | Body text |
| 12px | `text-xs` | Captions, labels |

## Border Radius

| Figma | Tailwind |
|-------|----------|
| 4px | `rounded` or `rounded-sm` |
| 8px | `rounded-lg` |
| 12px | `rounded-xl` |
| 16px | `rounded-2xl` |
| Full | `rounded-full` |

## Shadows

| Figma | Tailwind |
|-------|----------|
| Subtle | `shadow-sm` |
| Default | `shadow` |
| Medium | `shadow-md` |
| Large | `shadow-lg` |

## Example: Card from Figma

**Figma**: Frame with 24px padding, 8px radius, border, 4 children (icon, title, description, button)

**Output**:
```tsx
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/shared/components/card';
import { Button } from '@/shared/components/button';

export const FeatureCard: React.FC<Props> = ({ title, description }) => (
  <Card>
    <CardHeader>
      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
        {/* Icon */}
      </div>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground">{description}</p>
    </CardContent>
    <CardFooter>
      <Button variant="primary">Action</Button>
    </CardFooter>
  </Card>
);
```

## Example: List/Grid from Figma

**Figma**: Auto-layout grid, 4 columns, 16px gap

**Output**:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {items.map((item) => (
    <ItemCard key={item.id} {...item} />
  ))}
</div>
```

## Self-Test MCP Workflow (cursor-ide-browser)

**Prerequisite**: Dev server at `http://localhost:3000`

**Sequence**:
1. `browser_tabs` action "list" → see if tab exists
2. `browser_navigate` url "http://localhost:3000/borrow" → open page (creates tab if needed)
3. `browser_snapshot` → get DOM structure, verify elements
4. `browser_take_screenshot` filename "figma-verify-borrow.png" fullPage true → capture
5. If interacting: `browser_lock` → click/type → `browser_unlock`

**Snapshot verification**: Look for expected text content, button labels, form fields, heading hierarchy in the accessibility tree.
