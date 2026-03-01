Implement Stage 3.2.2: Core Accessibility Compliance (WCAG 2.1 AA Baseline)

This stage fixes foundational accessibility issues across Light and Dark themes.
Do NOT redesign layouts.
Do NOT change theme architecture.
Do NOT modify lesson schema.
Do NOT introduce High Contrast changes yet.

Focus only on WCAG compliance improvements.

---

## 1) Fix Non-Text Contrast (WCAG 1.4.11)

Ensure all interactive components have minimum 3:1 contrast for boundaries.

Apply to:

- Buttons
- Inputs
- Select dropdowns
- Toggle controls
- Clickable cards
- Utility bar controls

Adjust border colors and hover states to meet 3:1 ratio.

Use solid borders instead of subtle gray-on-gray.

Do NOT rely on background tints alone.

---

## 2) Strengthen Focus Indicators (WCAG 2.4.7)

Ensure all focusable elements use:

:focus-visible {
  outline: 2px solid currentColor or theme primary;
  outline-offset: 2px;
}

Ensure:

- No element removes outline without replacement.
- Focus is visible in both Light and Dark modes.

---

## 3) Fix Page Titles (WCAG 2.4.2)

Ensure every route sets a unique, descriptive <title>.

Implement consistent title template:

Format:
[Primary Page Context] | mskosman.com

Examples:

Home:
Standards-Aligned Lesson Plans for Virginia Students | mskosman.com

Subject page:
Computer Science Lesson Plans | mskosman.com

Grade page:
Grade 1 Lesson Plans | mskosman.com

Lesson page:
1.AP.1 — Algorithms and Patterns | mskosman.com

Contact:
Contact | mskosman.com

Avoid generic titles.

---

## 4) Fix Link Accessible Names (WCAG 2.4.4)

Replace generic link text such as:

- "Read more"
- "Click here"

With descriptive link text.

For icon-only links:

- Provide visually hidden text.
- Use aria-label only if necessary.

Ensure link text conveys destination clearly.

---

## 5) Fix aria-label Mismatches (WCAG 4.1.2)

Audit all elements with aria-label.

If visible text exists:
- Remove aria-label unless required.
- If required, aria-label must begin with same words as visible text.

Do not use aria-label unnecessarily.

---

## 6) Validation

After changes:

- npm run build passes
- No console errors
- Lighthouse Accessibility score ≥ 90
- No layout changes
- Light and Dark remain visually stable