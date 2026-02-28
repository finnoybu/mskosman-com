Implement Stage 3.2.1: High Contrast Correction & Accessibility Hardening.

This stage refines high-contrast mode only.
Do NOT change layout.
Do NOT change light or dark themes.
Do NOT modify lesson schema.
Do NOT add new features.

Focus exclusively on improving accessibility clarity.

---

## 1) Fix High Contrast Background & Surface Behavior

Current issue:
Surface cards remain gray in high contrast.

Correct behavior:
High contrast must remove surface tinting entirely.

Under `[data-theme="high-contrast"]`:

- --color-bg: #000000
- --color-surface: #000000
- --color-text: #ffffff
- --color-border: #ffffff
- --color-primary: #ffff00
- --color-text-muted: #ffffff

All cards must visually merge into the background and rely on borders for separation.

No gray panels.

---

## 2) Remove Decorative UI Elements in High Contrast

In high contrast:

- Remove box shadows entirely
- Remove subtle background tints
- Remove gradients
- Remove low-opacity elements
- Remove hover-only shading effects

UI must rely on:
- Borders
- Underlines
- Strong contrast

---

## 3) Strengthen Link Behavior

In high contrast:

- All links must be underlined by default
- Links must use --color-primary
- Hover must NOT rely on color alone
- Hover must maintain underline

---

## 4) Strengthen Button Clarity

In high contrast:

Primary buttons:
- background: #000
- color: #ffff00
- border: 2px solid #ffff00

Secondary buttons:
- background: transparent
- color: #ffffff
- border: 2px solid #ffffff

Hover state:
- invert foreground/background clearly

Buttons must be distinguishable from text.

---

## 5) Improve Focus Visibility

Implement:

:focus-visible {
  outline: 3px solid #ffff00;
  outline-offset: 3px;
}

Ensure:
- Works on links
- Works on buttons
- Works on dropdown
- Works on utility controls

No element should remove outline.

---

## 6) Utility Bar Compatibility

Ensure:
- Print
- Share dropdown
- Font size controls

Are clearly visible in high contrast.
No subtle borders.
No faint icons.

Icons must be visible against black.

---

## 7) Contrast Validation

Ensure text contrast meets:

- WCAG AA minimum
- Preferably AAA for body text

Verify:

- Header navigation
- Dropdown menu
- Buttons
- Cards
- Utility bar

---

## 8) Validation

- npm run build passes
- No layout shifts
- No console errors
- Lighthouse Accessibility score improves
- No !important overrides introduced