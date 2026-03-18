# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Frontend workflow app built with **Next.js 15** (App Router), **React 19**, and **TypeScript**. Uses Tailwind CSS 4, Redux Toolkit, React Hook Form + Zod, and next-intl for i18n.

## Commands

```bash
npm run dev          # Dev server with Turbopack
npm run build        # Production build
npm run lint         # ESLint
npm start            # Production server
```

No test runner is configured yet. Playwright is installed but has no test scripts.

## Architecture

### Core Structure

```
src/
├── app/                    # Next.js App Router pages (routing only)
├── features/              # Feature-based modules (business logic)
├── shared/                # Shared components, hooks, utils, anything can share between features, modules
├── config/                # Application configuration
├── store/                 # Redux store (use sparingly)
├── assets/                # Static assets (fonts, icons, logos)
├── i18n/                  # next-intl config
└── types/                 # Global TypeScript definitions
```

### Feature-Based Architecture

Each feature should follow this structure:

```
features/
└── [feature-name]/
    ├── index.tsx                    # Feature entry point (barrel export)
    ├── [feature-name]-page.tsx      # Main page component
    ├── components/                  # Feature-specific components
    │   └── [component-name]/        # Component folder structure (ALWAYS)
    │       ├── index.tsx            # Main component implementation
    │       ├── [sub-component].tsx  # Sub-component (if complex)
    │       └── [component].types.ts # Component-specific types (if complex)
    ├── hooks/                       # Feature-specific hooks
    │   ├── use-[hook-name].ts
    │   └── index.ts                 # Barrel export
    ├── contexts/                    # React Context for non-form state
    │   └── [feature]-context.tsx
    ├── services/                    # API calls and business logic
    │   ├── [service-name].service.ts
    │   └── index.ts
    ├── types/                       # Feature TypeScript types (directory)
    │   ├── index.ts                 # Barrel export
    │   └── [type-group].types.ts    # Grouped types
    ├── schemas/                     # Zod validation schemas (directory)
    │   ├── index.ts                 # Barrel export
    │   └── [form-name].schema.ts    # Individual schemas
    └── constants/                   # Feature constants (directory)
        ├── index.ts                 # Barrel export
        └── [group].constants.ts     # Grouped constants
```

### Current File Structure

```
src/
├── app/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── assets/
│   ├── fonts/
│   ├── icons/
│   │   ├── borrow.svg
│   │   ├── close.svg
│   │   ├── wallet.svg
│   │   └── index.ts
│   └── logos/
│       ├── aave.svg
│       ├── compound.svg
│       └── uniswap.svg
├── config/
│   └── index.ts
├── i18n/
│   └── request.ts
├── shared/
│   ├── components/
│   │   ├── button/
│   │   │   └── index.tsx
│   │   ├── card/
│   │   │   └── index.tsx
│   │   └── modal/
│   │       └── index.tsx
│   ├── constants/
│   │   ├── api.constants.ts
│   │   ├── chains.constants.ts
│   │   ├── errors.constants.ts
│   │   ├── tokens.constants.ts
│   │   └── index.ts
│   ├── hooks/
│   │   ├── use-media-query.ts
│   │   └── use-toggle.ts
│   ├── types/
│   │   ├── api.types.ts
│   │   └── index.ts
│   └── utils/
│       ├── cn.ts
│       ├── format.ts
│       └── math.ts
├── store/
│   ├── hooks.ts
│   ├── index.ts
│   ├── provider.tsx
│   ├── root-reducer.ts
│   ├── types.ts
│   ├── middlewares/
│   │   ├── errorHandler.ts
│   │   └── logger.ts
│   └── slices/
│       └── user/
│           ├── selectors.ts
│           ├── thunks.ts
│           ├── types.ts
│           └── userSlice.ts
└── types/
    └── svg.d.ts
```

### File Organization Rules

#### CRITICAL: Directory-Based Pattern

**ALWAYS use directories for scalability, even for single files:**

**Components:**
```
components/
└── hero-section/
    └── index.tsx              # Main component implementation

# If complex, add sub-components:
components/
└── hero-section/
    ├── index.tsx              # Main component
    ├── hero-content.tsx       # Sub-component
    └── hero-image.tsx         # Sub-component
```

**Types — Always use directory:**
```
types/
├── index.ts                   # Barrel export
├── user.types.ts              # User-related types
└── api.types.ts               # API-related types
```

**Schemas — Always use directory:**
```
schemas/
├── index.ts                   # Barrel export
└── login-form.schema.ts       # Login schema
```

**Constants — Always use directory:**
```
constants/
├── index.ts                   # Barrel export
├── api.constants.ts           # API constants
└── validation.constants.ts    # Validation constants
```

### Routing

- `app/` directory is for routing ONLY
- Page components should import from `features/`
- Keep route files minimal (< 50 lines)

```typescript
// app/[feature]/page.tsx
import { FeaturePage } from '@/features/[feature]/[feature]-page';

export default function FeatureRoute() {
  return <FeaturePage />;
}
```

### State management hierarchy

1. **React Hook Form + Zod** — ALL forms (schemas in `features/[feature]/schemas/`)
2. **React Context** — Feature-scoped non-form UI state (modals, tabs)
3. **Redux** — Global state only (user, cross-feature state) via `store/slices/`
4. **useState** — Component-local UI state

Use `useAppDispatch` and `useAppSelector` from `store/hooks.ts` (not raw `useDispatch`/`useSelector`).

### Styling

- Tailwind CSS 4 with `@theme` directive in `globals.css`
- Semantic color tokens: `primary-50..900`, `surface`, `foreground`, `muted`, `border`, `error`, `success`, etc.
- Typography classes: `text-display`, `text-heading`, `text-subheading`, `text-body`, `text-caption`, `text-mono`
- Class merging: `cn()` utility from `shared/utils/` (clsx + tailwind-merge)
- SVGs imported as React components via `@svgr/webpack`

### Path alias

`@/*` maps to `./src/*`

## Conventions

- **Named exports** preferred over default exports; `React.FC` type annotation required
- **kebab-case** for files/folders; **PascalCase** for components; **SCREAMING_SNAKE_CASE** for constants
- **500-line max** per file — split into smaller modules if exceeded
- **Directory-based organization**: components live in `components/[name]/index.tsx`, types in `types/`, schemas in `schemas/`, constants in `constants/` — all with barrel exports
- Hooks use `use-` prefix: `hooks/use-[hook-name].ts`
- Services use `.service` suffix, types use `.types` suffix

### Import order

1. React/Next.js
2. External libraries
3. Internal features
4. Shared components/hooks
5. Config and constants
6. Utils and helpers
7. Types

### Component internal order

1. Imports → 2. Types/Interfaces → 3. Component declaration → 4. State hooks → 5. Effects/custom hooks → 6. Event handlers → 7. Render helpers → 8. Return JSX

## Key integrations
- **i18n**: next-intl with messages in `messages/en.json`. `NextIntlClientProvider` at root layout.
- **Turbopack**: Enabled for dev via `next dev --turbopack`.
