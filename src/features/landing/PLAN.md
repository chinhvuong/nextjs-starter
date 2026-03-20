## Plan: Hero Banner

**Figma:** https://www.figma.com/design/41S3VRic24dG0if1yDribK/KINGTECH-Concept?node-id=21-66&m=dev
**Scope:** Single Section
**Design:** 1600×627px | rem divisor: 16 | Viewport: desktop
**Layout type:** full-bleed

---

### Component Breakdown

| # | Component | Node ID | Figma URL | Description | Repeated |
|---|-----------|---------|-----------|-------------|----------|
| 1 | HeroSection (root) | 21:66 | [link](https://www.figma.com/design/41S3VRic24dG0if1yDribK/KINGTECH-Concept?node-id=21-66) | Full-bleed hero banner with background image, text overlay, price, carousel nav | — |
| 2 | CarouselArrow | 2703:18737, 2703:18728 | [left](https://www.figma.com/design/41S3VRic24dG0if1yDribK/KINGTECH-Concept?node-id=2703-18737) / [right](https://www.figma.com/design/41S3VRic24dG0if1yDribK/KINGTECH-Concept?node-id=2703-18728) | Circular semi-transparent arrow buttons for slide navigation | ×2 |
| 3 | SlideIndicator | 341:3812 | [link](https://www.figma.com/design/41S3VRic24dG0if1yDribK/KINGTECH-Concept?node-id=341-3812) | Horizontal dot/bar indicators (1 active + 2 inactive) | — |

**Notes:**
- CarouselArrow appears twice (left rotated 180°, right normal) — extract as sub-component only if section exceeds 300 lines. Otherwise keep inline.
- SlideIndicator has 3 items: active (48px wide, white) and inactive (24px wide, dark). Keep inline.
- The carousel/slider must be functional with actual sliding behavior, not a static mockup.

### Typography (4 unique styles)

| # | Figma | Tailwind Classes | Element |
|---|-------|-----------------|---------|
| 1 | SVN-Gilroy XBold / 40px / 1.5 / tracking 1px / uppercase | `text-[2.5rem] font-[800] leading-[1.5] tracking-[0.0625rem] uppercase font-[family-name:var(--font-family-gilroy)]` | Main heading "Chăm Sóc Đôi Mắt..." |
| 2 | SVN-Gilroy Regular / 14px / 1.4 | `text-[0.875rem] font-normal leading-[1.4] font-[family-name:var(--font-family-gilroy)]` | Description paragraph |
| 3 | SVN-Gilroy Medium / 20px / 1.4 | `text-[1.25rem] font-medium leading-[1.4] font-[family-name:var(--font-family-gilroy)]` | "Giá chỉ từ:" label |
| 4 | SVN-Gilroy XBold / 40px / gradient text | `text-[2.5rem] font-[800] bg-gradient-to-t from-[#ffc963] from-[30%] to-[#ffecc9] to-[83%] bg-clip-text text-transparent font-[family-name:var(--font-family-gilroy)]` | Price "1.000.000VND" |

### Assets to Download (3)

| Type | Filename | Figma Node | Notes |
|------|----------|------------|-------|
| image | d-hero-banner.webp | 341:3648 | Full-width background banner image |
| image | logo-kingtech-wide.webp | 341:3657 | KingTech horizontal logo (200×46px) |
| icon | ic-arrow-right.svg | I2703:18728;2144:14798;21:8287 | Arrow icon used in carousel navigation buttons |

**Asset paths:**
- Images → `public/assets/images/landing/`
- Icons → `src/assets/icons/`

### Fonts

| Family | Source | Weights | Install Method |
|--------|--------|---------|----------------|
| SVN-Gilroy | custom/proprietary | Regular (400), Medium (500), XBold (800) | Obtain from design team. Register as `--font-family-gilroy` CSS variable in `globals.css`. Load via `next/font/local` in `layout.tsx`. |

**Note:** SVN-Gilroy is a proprietary Vietnamese font (by SVN). Not available on Google Fonts or npm. Must be obtained from the design team as `.woff2` files and placed in `src/assets/fonts/`.

### Files to Create

```
src/features/landing/components/
  hero-section/
    index.tsx              ← main hero section component (carousel with slides, arrows, indicators)
```

**Total: ~1 component** (with inline carousel arrows and slide indicators)

---

Ready to build? Run: `/figma-build`
