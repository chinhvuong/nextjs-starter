# Setup New Feature

## Overview
Create a new feature following all established rules and conventions.

## Instructions

Follow all rules in:
- @.cursor/rules/project-structure.mdc
- @.cursor/rules/state-management.mdc  
- @.cursor/rules/api-data-fetching.mdc
- @.cursor/rules/typescript-conventions.mdc
- @.cursor/rules/styling-conventions.mdc
- @.cursor/rules/coding-standards.mdc

And study the current codebase structure in `src/features/borrow/` to understand the patterns.

**Make sure new code follows exactly the above rules.**
## Feature Setup Checklist

**CRITICAL: Directory-Based Structure for Everything**

- [ ] ALL components in directories: `/component-name/index.tsx` (index.tsx IS the component)
- [ ] types/ as directory with index.ts barrel export
- [ ] schemas/ as directory with index.ts barrel export  
- [ ] constants/ as directory with index.ts barrel export
- [ ] Never create single .ts files for types, schemas, or constants
- [ ] Max 500 lines per file
- [ ] React Hook Form + Zod for forms
- [ ] React Query for API calls
- [ ] Context API for non-form UI state only
- [ ] Tailwind CSS 4 with semantic colors
- [ ] Study `src/features/borrow/` for the exact pattern

## Directory Structure

```
src/features/[feature-name]/
├── index.tsx
├── [feature-name]-page.tsx
├── components/                 # ALL components as directories
│   └── [component-name]/
│       └── index.tsx          # Main component (add more if complex)
├── hooks/
│   ├── use-[feature]-*.ts
│   └── index.ts
├── types/                      # Directory, not single file
│   ├── index.ts               # Barrel export
│   └── [group].types.ts       # Grouped types
├── schemas/                    # Directory, not single file
│   ├── index.ts               # Barrel export
│   └── [form].schema.ts       # Individual schemas
├── constants/                  # Directory, not single file
│   ├── index.ts               # Barrel export
│   └── [group].constants.ts   # Grouped constants
├── services/                   # If API needed
│   ├── index.ts
│   └── [feature]-api.service.ts
└── contexts/                   # If UI state needed
    └── [feature]-context.tsx

src/app/[feature-name]/
└── page.tsx                    # Minimal route file
```

## Component Pattern

**Simple component** (start here):
```
components/button/
└── index.tsx          # The Button component
```

**Complex component** (add files as needed):
```
components/data-table/
├── index.tsx          # Main DataTable component
├── table-header.tsx   # Sub-component
├── table-row.tsx      # Sub-component
└── table-footer.tsx   # Sub-component
```
