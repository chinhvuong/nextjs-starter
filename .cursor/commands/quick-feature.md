# Quick Feature Creation Template

Use this shortened template for simple feature requests.

---

**Feature**: `[feature-name]`

**What it does**: [One sentence description]

**Requirements**:
- API endpoints needed: [list or "none"]
- Forms needed: [list fields or "none"]
- Context state needed: [yes/no and what]

**Reminder for AI**:
- ✅ Follow all project rules (500 lines max, React Hook Form + Zod for forms, React Query for API)
- ✅ Create in `src/features/[feature-name]/`
- ✅ Include: page component, components/, hooks/, services/, types.ts, schemas.ts (if forms)
- ✅ Use directory-based components
- ✅ Add route in `src/app/[feature-name]/page.tsx`

---

## Example

**Feature**: `portfolio`

**What it does**: Display user's current positions, assets, and total portfolio value

**Requirements**:
- API endpoints needed: GET /api/portfolio/:address
- Forms needed: none
- Context state needed: No, just React Query for data

**Reminder for AI**:
- ✅ Follow all project rules (500 lines max, React Hook Form + Zod for forms, React Query for API)
- ✅ Create in `src/features/portfolio/`
- ✅ Include: page component, components/, hooks/, services/, types.ts
- ✅ Use directory-based components
- ✅ Add route in `src/app/portfolio/page.tsx`

