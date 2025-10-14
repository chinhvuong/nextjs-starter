# Checkout Branch

## Overview
Create or switch to a git branch for development.

## Steps
1. **Determine branch type**
   - Feature branch for new features
   - Fix branch for bug fixes
   - Refactor branch for code improvements
   - Chore branch for maintenance

2. **Create/switch branch**
   - Use descriptive branch name
   - Follow naming convention
   - Branch from correct base (usually main)

3. **Verify**
   - Confirm on correct branch
   - Ensure clean working directory

## Branch Naming Convention

```
<type>/<short-description>
```

### Types
- `feature/` - New features
- `fix/` - Bug fixes
- `refactor/` - Code refactoring
- `chore/` - Maintenance tasks
- `docs/` - Documentation
- `test/` - Test additions
- `hotfix/` - Urgent production fixes

### Examples

```
feature/user-authentication
feature/lending-pool
feature/staking-rewards

fix/wallet-connection-timeout
fix/form-validation-error

refactor/directory-structure
refactor/api-services

chore/update-dependencies
chore/clean-unused-imports

docs/api-documentation
docs/setup-guide
```

## Usage Examples

**Create new feature branch:**
```
/checkout feature/portfolio-dashboard
```

**Create bug fix branch:**
```
/checkout fix/interest-rate-calculation
```

**Create refactor branch:**
```
/checkout refactor/component-structure
```

**Switch to existing branch:**
```
/checkout feature/existing-branch-name
```

## Branch Name Guidelines

✅ **Good branch names:**
- `feature/lending-page`
- `fix/wallet-connection`
- `refactor/directory-based-components`
- `chore/update-tailwind-v4`

❌ **Bad branch names:**
- `my-branch` (no type)
- `feature/fix-stuff` (vague)
- `john-work` (no description)
- `temp` (not descriptive)

## Workflow

1. Checkout branch: `/checkout feature/new-feature`
2. Make changes
3. Commit: `/commit` 
4. Push and create PR: `/create-pr`

