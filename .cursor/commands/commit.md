# Commit Changes

## Overview
Create a well-structured commit with conventional commit format.

## Steps
1. **Review changes**
   - Check staged files
   - Verify changes are related

2. **Write commit message**
   - Use conventional commit format
   - Be clear and concise
   - Include context if needed

3. **Commit**
   - Stage all related files
   - Write descriptive message
   - Verify commit created

## Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style (formatting, missing semi colons, etc)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding tests
- `chore`: Maintenance tasks
- `ci`: CI/CD changes
- `build`: Build system changes

### Examples

```
feat(borrow): add interest rate calculator

Add real-time interest rate calculations for stable and variable modes.
Includes validation and error handling.
```

```
fix(wallet): resolve connection timeout issue

Increase timeout to 30s and add retry logic for failed connections.

Fixes #123
```

```
refactor(components): convert to directory-based structure

- Move all components to /component-name/index.tsx pattern
- Split types, schemas, constants into directories
- Update all imports
```

```
docs(readme): update setup instructions

Add Tailwind CSS 4 configuration steps and font setup guide.
```

## Commit Template

```
<type>: <brief description>

[Optional: Longer explanation of what and why]

[Optional: Breaking changes, issues fixed, etc.]
```

