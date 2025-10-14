# Cursor Commands

Reusable commands for common development tasks.

## 📋 Available Commands

### 🆕 `/new-feature` - Create New Feature
**File**: `new-feature.md`

Create a complete feature following all project rules.

**Usage:**
```
/new-feature [describe what you want naturally]
```

**Examples:**
```
/new-feature lending page with deposit form and positions list
/new-feature portfolio showing assets with metric cards
/new-feature staking wizard with 3 steps
```

**What it creates:**
- Complete feature folder structure
- Types, schemas, constants directories
- Components as directories (index.tsx)
- React Query hooks for API
- React Hook Form + Zod for forms
- Tailwind CSS 4 styling
- Route in app/

---

### 💾 `/commit` - Commit Changes
**File**: `commit.md`

Create a well-structured commit with conventional format.

**Format:**
```
<type>: <description>

[optional body]
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `refactor` - Code refactoring
- `docs` - Documentation
- `style` - Code formatting
- `test` - Tests
- `chore` - Maintenance

**Examples:**
```
feat(borrow): add interest rate calculator
fix(wallet): resolve connection timeout
refactor(components): convert to directory structure
docs(readme): update setup instructions
```

---

### 🌿 `/checkout` - Switch Branch
**File**: `checkout.md`

Create or switch to a git branch.

**Format:**
```
<type>/<description>
```

**Types:**
- `feature/` - New features
- `fix/` - Bug fixes
- `refactor/` - Refactoring
- `chore/` - Maintenance
- `docs/` - Documentation
- `hotfix/` - Urgent fixes

**Examples:**
```
/checkout feature/lending-page
/checkout fix/wallet-connection
/checkout refactor/directory-structure
```

---

### 📝 `/create-pr` - Create Pull Request
**File**: `create-pr.md`

Create a well-structured PR with description and labels.

**Steps:**
1. Prepare branch (commit all changes)
2. Write PR description
3. Create PR with title and labels

---

## 🚀 Workflow

Complete development workflow using commands:

```bash
# 1. Start new feature
/checkout feature/notifications

# 2. Create the feature
/new-feature notifications page with bell icon, list of notifications, mark as read button

# 3. Make additional changes...

# 4. Commit your work
/commit
# → feat(notifications): add notifications page with read/unread status

# 5. Create PR
/create-pr
# → Creates PR with proper description
```

## 💡 Quick Reference

| Command | Purpose | Example |
|---------|---------|---------|
| `/new-feature` | Create feature | `/new-feature lending page...` |
| `/checkout` | Switch branch | `/checkout feature/lending` |
| `/commit` | Commit changes | `/commit` |
| `/create-pr` | Create PR | `/create-pr` |

## 📚 Related

- `.cursor/rules/` - All coding rules and conventions
- `src/features/borrow/` - Example feature structure
- Project README - Overall architecture

---

**These commands help you maintain consistency and follow best practices! 🎉**

