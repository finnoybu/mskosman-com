Implement Stage 3.2: Theme System & High Contrast Accessibility Refinement.

This is an accessibility-focused refactor.
Do NOT change page structure.
Do NOT redesign layouts.
Do NOT modify lesson schema.
Do NOT alter filtering logic.

Focus on:

- Replace current theme buttons with dropdown
- Refine high contrast mode properly
- Improve focus visibility
- Strengthen accessibility semantics

---

## 1) Replace Theme Buttons with Dropdown

In header:

Remove individual Light/Dark/HighContrast buttons.

Add a single "Theme" dropdown on right side:

Theme ▾

Options:
- Light
- Dark
- High Contrast

Requirements:

- Dropdown accessible via keyboard
- aria-expanded managed correctly
- Closes on outside click or Escape
- No layout shift when switching themes
- Persist selection in localStorage
- Respect system preference only on first load

Theme states supported:

- light
- dark
- high-contrast

Do NOT implement Light+HC or Dark+HC combinations.

---

## 2) High Contrast Token Redesign

Refactor high contrast to be true accessibility mode.

Under `[data-theme="high-contrast"]` define:

- --color-bg: #000000
- --color-surface: #000000
- --color-text: #ffffff
- --color-primary: #ffff00
- --color-border: #ffffff
- --focus-ring: 3px solid #ffff00
- --shadow-card: none
- --shadow-card-hover: none

Remove decorative shadows and subtle surface differences.

High contrast must prioritize readability over brand tone.

---

## 3) Focus Visibility

Implement strong focus-visible rule:

:focus-visible {
  outline: var(--focus-ring);
  outline-offset: 2px;
}

Ensure:

- All interactive elements use focus-visible
- No element removes outline without replacement
- Focus is clearly visible in all themes

---

## 4) Link Behavior in High Contrast

In high contrast:

- All links must be underlined
- Hover state must not rely only on color
- Ensure link color contrast meets WCAG AA

---

## 5) Button & Interactive Elements

In high contrast:

- Buttons must have clear borders
- Strong foreground/background separation
- Hover state must invert or clearly differentiate

No reliance on subtle background shading.

---

## 6) Remove Decorative UI in High Contrast

Remove:

- Subtle drop shadows
- Low opacity borders
- Faint background tints
- Decorative gradients

High contrast mode should be visually strict and binary.

---

## 7) Validation

Ensure:

- npm run build passes
- No layout shifts
- No console errors
- Lighthouse Accessibility score improves
- No !important usage