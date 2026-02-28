# Stage 3.3.1 — Contextual Utility Row (Final Implementation)

This replaces the previous Utility Bar implementation.

Do NOT:
- Redesign layout
- Modify theme system (Light / Dark / System only)
- Change lesson schema
- Reintroduce high-contrast theme
- Move utility row into BaseLayout

This utility row is contextual and appears only on deep content pages.

---

## 1) Placement & Scope

Render the utility row ONLY on:

- `/lessons/[lessonSlug]`
- Individual standards detail pages

DO NOT render on:

- Homepage (`/`)
- `/lesson-plans`
- `/subjects/*`
- `/grades/*`
- `/standards` index pages
- About / Contact pages

### Placement Structure

Header  
------------------------------------  
[Subject Pill] [Grade Pill] [Duration]    Print | Share | Font Size [+] [-]  
------------------------------------  
Page Title (H1)

The utility row must:

- Sit above the H1 title
- Align with the page content container width
- Scroll naturally with the page (not sticky)
- Not create layout shift
- Use flex layout

### Responsive Behavior

Desktop:
- Left: Pills
- Right: Utility actions

Mobile:
- Pills stacked above utility actions
- No horizontal overflow

---

## 2) Remove Back Link

Remove the “Back to <Subject>” link.

Instead:

- Subject pill links to `/subjects/[subjectSlug]`
- Grade pill links to `/grades/[gradeSlug]`
- Duration pill remains non-clickable

---

## 3) Utility Row Structure

Right side must contain:

[PrinterIcon] Print   [ShareIcon] Share   [FontIcon] Font Size   [+]   [-]

### Icon Rules

- Icons must precede label text
- Icons must include `aria-hidden="true"`
- Labels must remain visible text
- Do NOT rely on icon-only buttons
- Use subtle spacing (no heavy separators)

Example structure:

<button>
  <PrinterIcon aria-hidden="true" />
  Print
</button>

---

## 4) Print Behavior

Print button:

- Uses `window.print()`
- Does not navigate

### Print CSS

Under `@media print`:

Hide:
- Header
- Utility row
- Theme dropdown
- Search inputs
- Navigation links

Optimize:
- Black text on white background
- Remove shadows
- Improve lesson spacing
- Preserve lesson title and metadata

---

## 5) Share Dropdown

Accessible dropdown with:

- Copy Link
- Email
- LinkedIn
- Twitter (X)
- Reddit

### Behavior Requirements

- `aria-haspopup="menu"`
- `aria-expanded` managed correctly
- Keyboard accessible
- Closes on Escape and outside click
- No layout shift
- Use `navigator.share()` if available

Copy Link must:

- Use Clipboard API
- Provide inline confirmation (not alert())

---

## 6) Font Size Controls (Parameterized Bounds)

Implement font scaling with configuration object:

const FONT_SCALE = {
  min: -2,
  max: 2,
  step: 0.0625
};

State:

let offset = 0;

Apply scaling via root CSS variable:

document.documentElement.style.setProperty(
  '--font-size-base',
  `${1 + offset * FONT_SCALE.step}rem`
);

Persist offset in localStorage.

---

## 7) Disabled Button Logic

When:
- `offset === FONT_SCALE.max` → Disable "+"
- `offset === FONT_SCALE.min` → Disable "-"

Disabled state must:

- Use `disabled` attribute
- Set `aria-disabled="true"`
- Prevent click
- Visually indicate disabled state
- Maintain minimum 3:1 non-text contrast
- Use `cursor: not-allowed`

Do NOT hardcode -2/+2 logic.
Must rely on FONT_SCALE configuration.

---

## 8) Accessibility Requirements

All controls must:

- Be real `<button>` elements
- Have visible focus-visible outline
- Have descriptive aria-label
- Not rely on icon-only meaning
- Maintain non-text contrast ≥ 3:1
- Work in Light and Dark modes
- Not break forced-colors behavior

---

## 9) Performance Constraints

- No heavy libraries
- No social SDK embeds
- No layout reflow loops
- Minimal JS
- No unnecessary hydration

---

## 10) Validation

After implementation:

- `npm run build` passes
- No console errors
- Utility row appears only on lesson and standards pages
- No layout shift
- Pills navigate correctly
- Font scaling respects bounds
- Disabled states function correctly
- Print preview renders cleanly
- Lighthouse Accessibility ≥ 90
- Lighthouse Performance ≥ 95