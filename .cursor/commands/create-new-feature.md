# Create New Feature Command Template

Use this template when asking AI to create a new feature. Copy and fill in the bracketed sections.

---

## Command

Create a new feature for this project following all established rules and conventions.

### Feature Details

**Feature Name**: `[feature-name]` (e.g., `lending`, `staking`, `swap`)

**Description**: 
[Provide a clear description of what this feature does and its purpose]

**User Stories**:
- As a user, I want to [action] so that [benefit]
- As a user, I want to [action] so that [benefit]
- [Add more as needed]

### Technical Requirements

**Data/API Requirements**:
- [ ] Needs API integration? If yes, list endpoints:
  - GET /api/[endpoint] - [description]
  - POST /api/[endpoint] - [description]
  - [Add more endpoints]

**Form Requirements**:
- [ ] Has forms? If yes, list fields and validation:
  - Field name: [name], Type: [type], Validation: [rules]
  - [Add more fields]

**State Requirements**:
- [ ] Needs Context API for UI state?
- [ ] Needs Redux for global state?
- [ ] What state needs to be managed?

**Routes/Pages**:
- [ ] Main page route: `/[route]`
- [ ] Additional routes: [list any sub-routes]

### Checklist for AI

Please follow these rules when creating this feature:

#### 📁 **Project Structure** (CRITICAL)
- [ ] Create feature folder: `src/features/[feature-name]/`
- [ ] Create `schemas.ts` for form validation (if forms exist)
- [ ] Use directory-based components: `/component-name/index.tsx`
- [ ] Keep ALL files under **500 lines maximum**
- [ ] Break down large files into smaller modules

#### 🎯 **Required Files Structure**
```
src/features/[feature-name]/
├── index.tsx                    # Barrel export
├── [feature-name]-page.tsx      # Main page component
├── schemas.ts                   # Zod validation schemas (if forms)
├── components/
│   └── [component-name]/
│       ├── index.tsx
│       └── [component-name].tsx
├── hooks/
│   ├── use-[feature]-data.ts    # React Query hooks
│   ├── use-[feature]-form.ts    # Form hooks (if forms)
│   └── index.ts
├── contexts/
│   └── [feature]-context.tsx    # For non-form state only
├── services/
│   └── [feature]-api.service.ts # API service layer
├── types.ts
└── constants.ts
```

#### 🔄 **State Management Rules**
- [ ] Use **React Hook Form + Zod** for ALL forms
- [ ] Use **React Query** for ALL API calls
- [ ] Use **Context API** ONLY for non-form feature state
- [ ] Use **Redux** ONLY if truly global state
- [ ] Create `schemas.ts` with Zod validation for forms
- [ ] Infer TypeScript types from Zod schemas

#### 🌐 **API & Data Fetching**
- [ ] Create service class in `services/[feature]-api.service.ts`
- [ ] Create React Query hooks in `hooks/use-[resource].ts`
- [ ] Define query keys as constants
- [ ] Use naming: `use[Resource][Action]` for queries
- [ ] Use naming: `use[Action][Resource]` for mutations
- [ ] Handle loading and error states

#### 🎨 **Styling**
- [ ] Use Tailwind CSS 4 utility classes
- [ ] Use semantic colors from theme (e.g., `bg-surface`, `text-foreground`)
- [ ] Follow responsive design (mobile-first)
- [ ] Use `cn()` utility for conditional classes
- [ ] Use typography utilities (`.text-heading`, `.text-body`, etc.)
- [ ] Add hover/focus/active states for interactivity

#### 📝 **TypeScript**
- [ ] Define types in `types.ts`
- [ ] Use `interface` for object shapes
- [ ] Use `type` for unions and complex types
- [ ] Export types alongside components
- [ ] Use strict typing (no `any`)

#### 🧪 **Code Quality**
- [ ] Named exports (not default exports)
- [ ] Proper error handling with try-catch
- [ ] Accessibility attributes (aria-labels, alt text, etc.)
- [ ] Comments explaining complex logic (WHY, not WHAT)
- [ ] Performance optimizations (useMemo, useCallback, React.memo)

#### 🚀 **Next.js Integration**
- [ ] Create route in `src/app/[feature-name]/page.tsx`
- [ ] Keep route file minimal (just import and render)
- [ ] Add metadata/SEO in route file
- [ ] Use proper Next.js components (Image, Link)

### Implementation Steps

Please implement this feature in the following order:

1. **Setup Structure**
   - Create feature folder structure
   - Create barrel exports

2. **Define Types & Schemas**
   - Create `types.ts` with TypeScript interfaces
   - Create `schemas.ts` with Zod validation (if forms)
   - Create `constants.ts`

3. **Create API Services**
   - Create service class in `services/`
   - Define all API methods
   - Add proper error handling

4. **Create React Query Hooks**
   - Create query hooks for data fetching
   - Create mutation hooks for data updates
   - Define query keys

5. **Create Context (if needed)**
   - Only for non-form UI state
   - Use memoization for performance

6. **Build Components**
   - Create main page component
   - Create sub-components in directories
   - Use React Hook Form for forms
   - Apply Tailwind styling

7. **Create Route**
   - Add route in `app/` directory
   - Add metadata

8. **Testing & Polish**
   - Test all functionality
   - Check responsive design
   - Verify accessibility
   - Optimize performance

### Additional Notes

[Add any specific requirements, edge cases, or special considerations]

### Design References

[Optional: Attach screenshots, wireframes, or design specs]

---

## Example Usage

```
Create a new feature for this project following all established rules and conventions.

Feature Name: `lending`

Description: 
Allow users to lend their crypto assets to earn interest. Users can deposit tokens 
into lending pools and track their earnings in real-time.

User Stories:
- As a user, I want to deposit tokens into a lending pool so that I can earn interest
- As a user, I want to see my current lending positions and earnings
- As a user, I want to withdraw my lent tokens and earned interest

Technical Requirements:

Data/API Requirements:
- [x] Needs API integration
  - GET /api/lending/pools - Get available lending pools
  - GET /api/lending/positions/:address - Get user's lending positions
  - POST /api/lending/deposit - Deposit tokens to pool
  - POST /api/lending/withdraw - Withdraw tokens from pool

Form Requirements:
- [x] Has forms
  - Pool selection: Select, required
  - Amount: Number input, min 0, required
  - Token: Select dropdown, required

State Requirements:
- [x] Needs Context API for deposit wizard steps
- [ ] Needs Redux
- Manage multi-step deposit flow, selected pool state

Routes/Pages:
- [x] Main page route: `/lending`
- [x] Additional routes: `/lending/pools/:id` for pool details

[Continue with checklist...]
```

---

## Quick Tips

- Be specific about requirements
- Include all necessary API endpoints
- Describe form fields and validation clearly
- Mention any special UI/UX requirements
- Reference similar features if applicable
- Ask questions if requirements are unclear

