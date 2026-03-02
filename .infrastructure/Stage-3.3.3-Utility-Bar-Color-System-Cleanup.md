Implement Stage 3.3.3: Utility Bar Color System Cleanup.

This stage fixes color inheritance conflicts in the Utility Bar.

Do NOT modify:
- SVG geometry
- Icon components
- Theme system (Light / Dark / System)
- Accessibility improvements from Stage 3.2.x
- Print/share/font logic
- Utility layout structure

Focus only on removing Tailwind color overrides and centralizing color control through tokens.

---

## 1) Remove Tailwind Color Overrides

In UtilityBar.astro, locate the Print and Share buttons.

Remove these classes wherever they appear:

- text-gray-700
- dark:text-gray-200
- hover:text-primary-700
- dark:hover:text-primary-300

These classes override the token-driven color system.

Buttons should not explicitly set text color.

---

## 2) Allow Token-Based Color Control

Ensure the utility wrapper container includes:

.utility-bar {
  color: var(--color-primary);
}

Icons must inherit color using:
stroke="currentColor"

Do NOT hardcode stroke color in SVG.

---

## 3) Keep Hover Behavior Minimal

Retain:
- hover:underline
- transition-colors

Do NOT reintroduce Tailwind color utilities.

---

## 4) Confirm Segmented Font Buttons Remain Token-Driven

Ensure +/- segmented buttons continue using:

--utility-bg: var(--color-primary);
--utility-fg: var(--color-bg);

These should remain scoped to those buttons only.

Do NOT modify segmented button token logic.

---

## 5) Validate Dark Mode Behavior

After changes:

- Light mode → utility icons and labels use mskosman blue
- Dark mode → utility icons and labels still use mskosman blue
- System mode → inherits correctly
- No gray icons remain
- No conflicting Tailwind text classes present

---

## 6) Cleanliness

After refactor:

- npm run build passes
- No console errors
- No visual regression
- No duplicate ID warnings
- No layout shift
- No !important usage introduced