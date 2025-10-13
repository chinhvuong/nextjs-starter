# Add New Feature - Copy & Paste Template

When you want to add a new feature, **copy this template, fill it in, and paste it to me in chat**.

---

## 📋 TEMPLATE TO COPY

```
Create a new feature following all rules in @.cursor/rules/

FEATURE: [feature-name]

DESCRIPTION:
[Describe what this feature does in 1-2 sentences]

REQUIREMENTS:

API Endpoints:
- [Method] [endpoint] - [description]
- [Add more or write "None"]

Forms:
- [If yes: list fields with validation]
- Field: [name], Type: [text/number/select], Validation: [required/optional, rules]
- [Add more or write "None"]

Context State (non-form UI state):
- [What state: e.g., "modal open/close", "selected tab"]
- [Write "None" if not needed]

Route: /[route-path]

ADDITIONAL NOTES:
[Any special requirements, design preferences, edge cases]

---

REMINDERS FOR AI:
✅ Follow ALL rules in .cursor/rules/
✅ Max 500 lines per file - break down if needed
✅ Use React Hook Form + Zod for forms (create schemas.ts)
✅ Use React Query for all API calls
✅ Use Context API ONLY for non-form UI state
✅ Create directory-based components: /component-name/index.tsx
✅ Create in src/features/[feature-name]/
✅ Add route in src/app/[route-path]/page.tsx
✅ Use Tailwind CSS 4 with semantic colors
✅ Include: page, schemas.ts (if forms), components/, hooks/, services/, contexts/ (if needed), types.ts, constants.ts
```

---

## ✨ QUICK EXAMPLES

### Example 1: Simple Feature (No Forms)

```
Create a new feature following all rules in @.cursor/rules/

FEATURE: portfolio

DESCRIPTION:
Display user's cryptocurrency portfolio with total value, individual assets, and profit/loss calculations.

REQUIREMENTS:

API Endpoints:
- GET /api/portfolio/:address - Get user portfolio data

Forms:
- None

Context State:
- None (React Query handles all data)

Route: /portfolio

ADDITIONAL NOTES:
Use dashboard card style similar to main page. Show assets in a table with icons.

---

REMINDERS FOR AI:
✅ Follow ALL rules in .cursor/rules/
✅ Max 500 lines per file
✅ React Query for API calls
✅ Create in src/features/portfolio/
✅ Dashboard styling with metric cards
```

### Example 2: Feature with Forms

```
Create a new feature following all rules in @.cursor/rules/

FEATURE: user-settings

DESCRIPTION:
User settings page where users can update their profile, notification preferences, and account settings.

REQUIREMENTS:

API Endpoints:
- GET /api/users/:id/settings - Get user settings
- PATCH /api/users/:id/settings - Update settings

Forms:
- Field: email, Type: text, Validation: required, email format
- Field: username, Type: text, Validation: required, min 3 chars, max 20 chars
- Field: notifications, Type: checkbox, Validation: optional
- Field: theme, Type: select (light/dark/system), Validation: required
- Field: language, Type: select, Validation: required

Context State:
- None

Route: /settings

ADDITIONAL NOTES:
Use tabs for different settings sections (Profile, Notifications, Security). Save button should be disabled until form is dirty.

---

REMINDERS FOR AI:
✅ Follow ALL rules in .cursor/rules/
✅ Max 500 lines per file
✅ React Hook Form + Zod (create schemas.ts with validation)
✅ React Query for API calls
✅ Create in src/features/user-settings/
✅ Tabbed interface with dashboard styling
```

### Example 3: Complex Feature with Context

```
Create a new feature following all rules in @.cursor/rules/

FEATURE: staking

DESCRIPTION:
Multi-step wizard for staking tokens to earn rewards. Users select a pool, choose amount, review terms, and confirm stake.

REQUIREMENTS:

API Endpoints:
- GET /api/staking/pools - List all staking pools with APY
- GET /api/staking/positions/:address - Get user staking positions
- POST /api/staking/stake - Create new stake
- POST /api/staking/unstake/:id - Unstake tokens

Forms:
- Step 1: poolId (select, required), token (auto-filled from pool)
- Step 2: amount (number, required, min > 0, max <= balance), duration (select: 30/60/90 days, required)
- Step 3: termsAccepted (checkbox, required)

Context State:
- currentStep (1-3) for wizard navigation
- selectedPool data
- calculatedRewards preview

Route: /staking

ADDITIONAL NOTES:
- Show estimated APY and rewards in step 2
- Display pool details (TVL, participants, APY) in step 1
- Review summary in step 3 before confirmation
- Use dashboard card style with progress indicator for steps

---

REMINDERS FOR AI:
✅ Follow ALL rules in .cursor/rules/
✅ Max 500 lines per file - break wizard into components
✅ React Hook Form + Zod for multi-step form (create schemas.ts)
✅ React Query for pools and positions
✅ Context API for wizard step state only
✅ Create in src/features/staking/
✅ Directory structure: /stake-wizard/, /pool-card/, /position-list/
```

---

## 💡 FILL-IN GUIDE

**FEATURE**: Use kebab-case (e.g., `user-profile`, `token-swap`)

**DESCRIPTION**: 1-2 clear sentences

**API Endpoints**: 
- Format: `METHOD /path - description`
- Example: `GET /api/users/:id - Fetch user by ID`
- Write "None" if no API needed

**Forms**:
- Format: `Field: name, Type: type, Validation: rules`
- Example: `Field: email, Type: text, Validation: required, email format`
- Write "None" if no forms

**Context State**:
- What UI state needs to be shared (NOT form data)
- Example: `modal open/close, selected tab index, sidebar expanded`
- Write "None" if not needed

**Route**: Path starting with `/` (e.g., `/profile`, `/staking`)

**ADDITIONAL NOTES**: Any special requirements, similar features to reference, design notes

---

## 🎯 SIMPLIFIED VERSION

If you want something even shorter:

```
@.cursor/rules/ Create feature: [name]

Description: [one sentence]
API: [endpoints or "none"]
Forms: [fields or "none"]
Context: [state or "none"]
Route: /[path]

Follow all rules: 500 lines max, RHF+Zod for forms, React Query for API, directory-based components.
```

Example:
```
@.cursor/rules/ Create feature: notifications

Description: Real-time notification system with read/unread status
API: GET /api/notifications/:userId, PATCH /api/notifications/:id/read
Forms: none
Context: notification panel open/close, unread count
Route: /notifications

Follow all rules: 500 lines max, RHF+Zod for forms, React Query for API, directory-based components.
```

---

## 🚀 HOW TO USE

1. **Copy** one of the templates above
2. **Fill in** your feature details
3. **Paste** into Cursor chat
4. **I'll create** the complete feature!

That's it! Keep this file open in a tab for quick access. 📌

