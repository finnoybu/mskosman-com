Enhance the existing Astro project by retrofitting a composable theme token system.

Do NOT redesign layouts.
Do NOT restructure routes.
Only retrofit styling architecture.

Goal:
Implement a compound theme system using CSS variables and data attributes so that:

- Base theme applies globally.
- Subject theme modifies design tokens.
- Grade theme modifies design tokens.
- Accessibility mode (normal/high-contrast) overrides tokens.
- Lesson pages combine subject + grade themes simultaneously.

---

## 1. Create Theme Token Architecture

Create a new file:
src/styles/theme.css

Define base tokens under :root:

- --color-bg
- --color-surface
- --color-primary
- --color-accent
- --color-text
- --font-heading
- --font-body
- --radius-card
- --shadow-card

Provide sensible neutral defaults.

---

## 2. Subject Themes (data-subject)

Define subject-specific overrides using attribute selectors:

[data-subject="mathematics"]
[data-subject="science"]
[data-subject="english"]
[data-subject="history-and-social-science"]
[data-subject="fine-arts"]

Each subject should override:
- --color-primary
- --color-accent
- Optional subtle background gradient
- Optional surface tint

Themes should feel:
- Mathematics → structured, blue
- Science → deep green/teal
- English → warm neutral
- History → muted sepia
- Fine Arts → expressive but not loud

Keep colors professional (not cartoonish).

---

## 3. Grade Themes (data-grade)

Define grade overrides:

[data-grade="k"]
[data-grade="1"]
...
[data-grade="12"]

Group grades into ranges for simplicity:
- K–3 (playful)
- 4–6 (balanced)
- 7–9 (structured)
- 10–12 (minimal, mature)

Adjust:
- --radius-card
- --font-heading
- Base font size scale
- Shadow softness

Do NOT radically change layout.

---

## 4. Accessibility Mode

Add:
[data-contrast="high"]

Override:
- --color-bg
- --color-text
- --color-primary
Ensure WCAG AA contrast minimum.

---

## 5. Integrate With Tailwind

Modify tailwind.config to extend colors using CSS variables:

colors:
  primary: "var(--color-primary)"
  accent: "var(--color-accent)"
  bg: "var(--color-bg)"
  surface: "var(--color-surface)"
  text: "var(--color-text)"

Replace hardcoded Tailwind color utilities in components with token-driven ones.

Do not use inline styles.

---

## 6. Body Attribute Logic

Modify the main layout component so that:

- Subject pages set: data-subject attribute.
- Grade pages set: data-grade attribute.
- Lesson pages set BOTH.
- Add a contrast toggle that sets data-contrast on <body> and persists via localStorage.

Implement a minimal script for attribute toggling.

---

## 7. Validation

Ensure:
- npm run build passes
- No unused CSS
- No duplicated styles
- No !important usage
- Clean separation between structure and theme

---

## 8. Documentation

Update README with:

- How the compound theme system works
- How to add a new subject theme
- How to adjust grade theming
- How to maintain accessibility contrast

Keep implementation clean, scalable, and production-ready.