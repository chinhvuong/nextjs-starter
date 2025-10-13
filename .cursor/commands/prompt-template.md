# Feature Creation Prompt Template

Copy this template and fill in the details when you want to create a new feature.

---

## 📋 Copy This Prompt

```
@Rules Create a new feature following all project rules and conventions.

Feature: [feature-name]

Description: [What does this feature do?]

Requirements:
- API endpoints: [list endpoints or write "none"]
- Forms: [list form fields and validation or write "none"]
- Context state: [describe what state is needed or write "none"]
- Route: /[route-path]

Please follow:
✅ All rules in .cursor/rules/
✅ Max 500 lines per file
✅ React Hook Form + Zod for forms (schemas.ts)
✅ React Query for API calls
✅ Context API for non-form state only
✅ Directory-based components
✅ Create in src/features/[feature-name]/

Include:
- [feature-name]-page.tsx
- schemas.ts (if forms)
- components/ (directory-based)
- hooks/ (React Query + form hooks)
- services/ (API service class)
- contexts/ (if needed for UI state)
- types.ts
- constants.ts
- Route in app/[feature-name]/page.tsx
```

---

## 🎯 Quick Example

```
@Rules Create a new feature following all project rules and conventions.

Feature: notifications

Description: Display user notifications with real-time updates, mark as read/unread

Requirements:
- API endpoints: GET /api/notifications/:userId, PATCH /api/notifications/:id/read
- Forms: none
- Context state: notification panel open/close state, unread count
- Route: /notifications

Please follow:
✅ All rules in .cursor/rules/
✅ Max 500 lines per file
✅ React Hook Form + Zod for forms (schemas.ts)
✅ React Query for API calls
✅ Context API for non-form state only
✅ Directory-based components
✅ Create in src/features/notifications/

Include:
- notifications-page.tsx
- components/ (directory-based: notification-list/, notification-item/)
- hooks/ (use-notifications.ts with React Query)
- services/ (notifications-api.service.ts)
- contexts/ (notification-ui-context.tsx for panel state)
- types.ts
- constants.ts
- Route in app/notifications/page.tsx
```

---

## 💡 Tips

- Keep description clear and concise
- List all API endpoints you need
- Specify if you need forms and what fields
- Mention any special UI requirements
- Reference similar existing features if helpful
- Use `@Rules` to reference the rules automatically

---

## 🚀 Even Shorter Version

If you want a super quick version:

```
@Rules Create feature: [name]

What: [one sentence]
API: [endpoints]
Forms: [yes/no - what fields]
Context: [yes/no - what state]

Follow all project rules (500 lines, RHF+Zod, React Query)
```

Example:
```
@Rules Create feature: staking

What: Users can stake tokens to earn rewards
API: GET /api/staking/pools, POST /api/staking/stake
Forms: yes - token select, amount input (min 0, required)
Context: yes - staking wizard step state

Follow all project rules (500 lines, RHF+Zod, React Query)
```

