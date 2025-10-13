# Cursor Commands

This directory contains reusable prompt templates for common tasks in this project.

## 📋 Available Templates

### ⭐ `add-feature-prompt.md` (YOUR GO-TO TEMPLATE)
**Ready-to-Copy Prompt for Adding Features**

**This is what YOU copy, fill in, and paste to AI when you want a new feature.**

**How to use**:
1. Open `add-feature-prompt.md`
2. Copy a template (full or simplified)
3. Fill in `[bracketed values]` with your feature details
4. Paste into Cursor chat
5. AI creates the complete feature following all rules!

**Contains**:
- ✅ Full detailed template
- ✅ Quick simplified template  
- ✅ Multiple real examples
- ✅ Fill-in guide

### 1. `create-new-feature.md`
**Detailed Reference Template**

A comprehensive reference with full checklists and implementation steps.

**When to use**:
- Reference for what AI should create
- Learning the full feature structure
- Complex features needing detailed planning

**How to use**: Read for reference, but use `prompt-template.md` to communicate with AI

### 2. `quick-feature.md`
**Quick Reference**

A shortened reference for simple features.

**How to use**: Quick lookup for simple feature patterns

## 🎯 Why Use Templates?

### Consistency
- Ensures all features follow the same structure
- Reminds AI of project-specific rules
- Maintains code quality across the codebase

### Completeness
- Prevents missing important files or setup
- Ensures all required validations are in place
- Catches edge cases early

### Time Saving
- No need to repeat rules every time
- AI knows exactly what to create
- Reduces back-and-forth clarifications

### Quality Control
- Built-in checklists ensure nothing is missed
- Follows best practices automatically
- Maintains 500-line file limit

## 📚 Template Sections Explained

### Feature Details
- **Name**: Kebab-case name for the feature folder
- **Description**: Clear explanation of what the feature does
- **User Stories**: What users can do with this feature

### Technical Requirements
- **API**: List all endpoints needed
- **Forms**: List all form fields and validation rules
- **State**: Specify what state management is needed
- **Routes**: Define URL structure

### Checklist
- Automatic reminders of all project rules
- Ensures consistency with codebase standards
- Validates against best practices

### Implementation Steps
- Ordered list of what to create first
- Ensures proper dependency management
- Logical build progression

## 🚀 Best Practices

### Be Specific
```
❌ Bad: "Create a form"
✅ Good: "Create a form with email (validated), password (min 8 chars), and remember me checkbox"
```

### Include Context
```
❌ Bad: "Add API call"
✅ Good: "Add GET /api/users/:id that returns user profile with caching"
```

### Reference Similar Features
```
✅ "Similar to the borrow feature, but for lending"
✅ "Use the same pattern as the wallet connection"
```

### Mention Edge Cases
```
✅ "Handle case when user has no positions"
✅ "Show loading state during API calls"
```

## 🔄 Workflow

1. **Choose Template**: Full or Quick
2. **Fill Details**: Be specific and clear
3. **Review Checklist**: Ensure all items are addressed
4. **Submit to AI**: Paste in Cursor chat
5. **Verify**: Check generated code against template
6. **Iterate**: Make adjustments as needed

## 📝 Example Workflow

```bash
# 1. Open template
cat .cursor/commands/quick-feature.md

# 2. Copy and customize
# Feature: notifications
# What: Show user notifications and alerts
# API: GET /api/notifications/:userId
# Forms: none
# State: Context for notification panel open/close

# 3. Paste to Cursor and let AI work

# 4. AI creates:
# - src/features/notifications/
# - All necessary files following rules
# - Route at /notifications
# - Everything under 500 lines per file
```

## 🎨 Customization

Feel free to customize these templates for your specific needs:

- Add project-specific requirements
- Include design system references
- Add testing requirements
- Modify checklists based on your standards

## 💡 Tips

1. **Start with Quick Template** for simple features, upgrade to Full if needed
2. **Keep Templates Updated** as project evolves
3. **Add Examples** from your own successful features
4. **Share with Team** so everyone uses the same format
5. **Version Control** these templates with your code

## 🔗 Related

- See `.cursor/rules/` for detailed coding standards
- See project README for overall architecture
- See existing features in `src/features/` for examples

---

**Remember**: These templates are living documents. Update them as you discover better patterns or encounter new requirements!

