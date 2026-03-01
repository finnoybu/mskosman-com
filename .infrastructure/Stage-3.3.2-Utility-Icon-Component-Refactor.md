Implement Stage 3.3.2: Utility Icon Component Refactor.

This stage replaces inline SVG in the utility row with reusable Astro icon components.

Do NOT modify:
- Theme system (Light / Dark / System)
- Accessibility improvements from Stage 3.2.x
- Utility bar layout structure
- Font scaling logic
- Print behavior
- Share dropdown logic

This stage is purely structural refactoring.

---

## 1) Create Icon Component Directory

Create:

src/components/icons/

Inside that directory, create:

- IncreaseIcon.astro
- DecreaseIcon.astro
- FontSizeIcon.astro
- PrintIcon.astro
- ShareIcon.astro

Each file must export a single inline SVG.

---

## 2) Icon Implementation Rules

All icons must:

- Use inline SVG
- NOT use <img>
- NOT reference files from /public
- NOT hardcode hex colors
- Use tokens or currentColor appropriately
- Not include duplicate IDs
- Not include xmlns:svg
- Not include transform scaling
- Not include unnecessary metadata

---

## 3) Color Token Rules

### IncreaseIcon & DecreaseIcon

These are segmented button halves.

Use:

fill="var(--utility-bg)" for background path  
fill="var(--utility-fg)" for symbol path  

Do NOT use currentColor for these.

---

### FontSizeIcon, PrintIcon, ShareIcon

These are standalone utility icons.

Use:

stroke="currentColor"  
fill="none"  

The utility bar container controls color via:

color: var(--color-primary);

Do NOT hardcode color inside SVG.

---

## 4) Standard SVG Wrapper Template

For standalone icons:

<svg
  width="16"
  height="16"
  viewBox="0 0 24 24"
  xmlns="http://www.w3.org/2000/svg"
  stroke="currentColor"
  fill="none"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
  aria-hidden="true"
>
  ...
</svg>

For segmented button halves:

<svg
  width="16"
  height="16"
  viewBox="0 0 16 16"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
>
  ...
</svg>

---

## 5) Update Utility Bar Component

Locate the utility bar implementation (likely inside lesson page or utility component).

Remove all inline SVG markup currently embedded in buttons.

Import icons at top:

import IncreaseIcon from '@/components/icons/IncreaseIcon.astro';
import DecreaseIcon from '@/components/icons/DecreaseIcon.astro';
import FontSizeIcon from '@/components/icons/FontSizeIcon.astro';
import PrintIcon from '@/components/icons/PrintIcon.astro';
import ShareIcon from '@/components/icons/ShareIcon.astro';

Replace existing inline SVG with:

<DecreaseIcon />
<IncreaseIcon />
<FontSizeIcon />
<PrintIcon />
<ShareIcon />

Do NOT wrap SVG in extra spans unless necessary for alignment.

---

## 6) Styling Rules

Ensure:

.font-control svg {
  display: block;
}

.utility-bar svg {
  flex-shrink: 0;
}

Icons must align vertically with text labels.

No layout shift introduced.

---

## 7) Verify Divider Behavior

If using segmented control for +/-:

Ensure divider between halves is applied via CSS:

.font-control button + button {
  border-left: 1px solid var(--color-primary);
}

Do NOT bake divider into SVG.

---

## 8) Validation

After refactor:

- npm run build passes
- No console errors
- No duplicate ID warnings
- Icons render in Light, Dark, and System modes
- Disabled states still work
- No visual regression
- Lighthouse Accessibility ≥ 90
- No layout shift