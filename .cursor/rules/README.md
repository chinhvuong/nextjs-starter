# Cursor Rules for DeFi Borrow App

This directory contains Cursor AI rules that guide code generation and maintain consistency across the project.

## 📋 Rule Files

### 1. `project-structure.mdc` ⭐
**Always Applied** | Defines the overall project architecture

- Feature-based organization
- Directory structure for components
- File size limit: **500 lines maximum**
- Component folder pattern (`/component-name/index.tsx`)
- Import organization standards

### 2. `api-data-fetching.mdc` ⭐
**Always Applied** | API calls and data fetching patterns

- **React Query (TanStack Query) required** for all API calls
- Service layer pattern
- Custom hooks for queries and mutations
- Query key conventions
- Error handling patterns

### 3. `state-management.mdc` ⭐
**Always Applied** | State management strategy

- **React Hook Form + Zod** for ALL forms (required)
- **Context API** for feature-specific non-form state (preferred)
- **React Query** for server state
- **Redux** only for truly global state
- Performance optimization techniques
- Avoiding unnecessary re-renders

### 4. `typescript-conventions.mdc`
**Applied to**: `*.ts`, `*.tsx` | TypeScript best practices

- Type naming conventions
- Component props patterns
- Hook typing
- API/Service typing
- Utility types
- Type guards

### 5. `styling-conventions.mdc`
**Applied to**: `*.tsx`, `*.css` | Tailwind CSS 4 guidelines

- Theme configuration with `@theme`
- Component classes
- Utility-first approach
- Typography system
- Responsive design (mobile-first)
- Color system

### 6. `coding-standards.mdc` ⭐
**Always Applied** | General coding best practices

- Code organization
- Naming conventions
- Error handling
- Performance best practices
- Accessibility requirements
- Comments and documentation

## 🎯 Key Principles

### File Organization
```
features/
└── [feature-name]/
    ├── index.tsx                    # Barrel export
    ├── [feature-name]-page.tsx      # Main page
    ├── components/                  # Feature components
    │   └── [component-name]/        # Directory-based
    │       ├── index.tsx
    │       └── [component].tsx
    ├── hooks/                       # use[Feature][Action]
    ├── contexts/                    # [Feature]Context
    ├── services/                    # API services
    ├── types.ts                     # TypeScript types
    └── constants.ts                 # Constants
```

### State Management Decision Tree
```
Is it a form?
├─ Yes → Use React Hook Form + Zod ✅
└─ No → Is it server data?
    ├─ Yes → Use React Query ✅
    └─ No → Is it shared across features?
        ├─ Yes → Use Redux
        └─ No → Is it shared within a feature?
            ├─ Yes → Use Context API ✅
            └─ No → Use useState
```

### API Call Pattern
```typescript
// 1. Create service
export class FeatureApiService {
  static async getData() { /* ... */ }
}

// 2. Create React Query hook
export const useFeatureData = () => {
  return useQuery({
    queryKey: ['feature-data'],
    queryFn: FeatureApiService.getData,
  });
};

// 3. Use in component
const { data, isLoading } = useFeatureData();
```

## ✨ Custom Requirements

Based on your specific needs:

### 1. File Size Limit
- **Maximum 500 lines per file**
- Use directory structure to break down components
- Extract logic into separate files

### 2. Component Structure
```
✅ CORRECT:
components/hero-section/
  ├── index.tsx
  └── hero-section.tsx

❌ INCORRECT:
components/hero-section.tsx
```

### 3. API Calls
- **Must use React Query** for all data fetching
- Create custom hooks: `useOrderList`, `useAuth`, etc.
- No `useEffect` for data fetching

### 4. State Management
- **Context API first** for feature state
- Keep Redux minimal (auth, wallet only)
- Optimize to avoid unnecessary re-renders

## 🚀 Quick Reference

### Creating a New Feature
```bash
features/
└── my-feature/
    ├── index.tsx                    # Export everything
    ├── my-feature-page.tsx          # Main page component
    ├── schemas.ts                   # ✅ Zod schemas for forms
    ├── components/
    │   └── feature-form/
    │       ├── index.tsx
    │       └── feature-form.tsx     # Uses React Hook Form
    ├── hooks/
    │   ├── use-feature-data.ts      # React Query hook
    │   └── use-feature-form.ts      # Form hook with Zod
    ├── contexts/
    │   └── feature-ui-context.tsx   # Context for non-form state
    ├── services/
    │   └── feature-api.service.ts   # API calls
    ├── types.ts
    └── constants.ts
```

### Hook Naming
- **Queries**: `use[Resource][Action]` → `useUserProfile`, `useOrderList`
- **Mutations**: `use[Action][Resource]` → `useCreateOrder`, `useUpdateUser`
- **Business Logic**: `use[Feature][Logic]` → `useOrderForm`, `useAuthFlow`

### Component Patterns
```typescript
// Named export (preferred)
export const Component: React.FC<Props> = ({ ... }) => {
  return <div>...</div>;
};

// Directory structure
component-name/
  ├── index.tsx           // Export
  ├── component-name.tsx  // Implementation
  └── types.ts            // Types (if complex)
```

## 📚 Usage in Cursor

These rules are automatically applied by Cursor AI when:
- ✅ Rules with `alwaysApply: true` are always active
- ✅ Rules with `globs` apply to matching files
- ✅ Rules with `description` can be manually referenced

To reference a specific rule, ask Cursor:
- "Follow the API data fetching rules"
- "Create a new feature following project structure"
- "Apply TypeScript conventions"

## 🔄 Updating Rules

To modify or add rules:
1. Edit existing `.mdc` files
2. Create new `.mdc` files with proper frontmatter
3. Use `[filename](mdc:filename)` to reference files
4. Restart Cursor or reload to pick up changes

## ⚡ Benefits

Following these rules ensures:
- ✅ Consistent code structure across the team
- ✅ Maintainable and scalable codebase
- ✅ Easy onboarding for new developers
- ✅ Better performance and UX
- ✅ Type-safe and error-free code
- ✅ Accessible and responsive UI

---

**Note**: These rules are living documents. Update them as the project evolves and best practices change.

