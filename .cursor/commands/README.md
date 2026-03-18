# Commands

## Figma-to-Code (2-step workflow)

### Step 1: `/plan-figma-to-code [url]`
Analyze Figma design → produce implementation plan for review.
- Lists sections, components, common components
- Typography catalog with utility class names
- Assets to download, fonts to register
- SEO plan (JSON-LD, metadata, hreflang)
- Saves plan to `src/features/{page}/PLAN.md`

### Step 2: `/build-the-plan`
Read PLAN.md → implement everything autonomously.
- Downloads assets from Figma, saves locally
- Sets up fonts, typography CSS, BEM classes
- Spawns parallel subagents for component generation
- Assembles page with full SEO
- Runs quality gates (build, ESLint, Prettier, visual validation)

### Fix: `/improve-impl-design [url]`
Compare existing code against Figma → surgically fix discrepancies.

## Development Commands

| Command | Purpose |
|---------|---------|
| `/plan-figma-to-code [url]` | Analyze Figma → plan |
| `/build-the-plan` | Execute plan → code |
| `/improve-impl-design [url]` | Fix discrepancies |
| `/new-feature` | Create feature scaffold |
| `/checkout` | Switch branch |
| `/commit` | Commit changes |
| `/create-pr` | Create PR |

## Conventions

See `.cursor/rules/figma-workflow.mdc` for:
- vw/rem fluid typography
- BEM CSS architecture
- Typography utility classes (`pc-h2-54-s`)
- SEO requirements
- Naming conventions
- Quality gates
