We need to fix the compound theming system so that subject and grade themes visibly influence the UI.

The token system exists and is correct.
The issue is insufficient wiring between CSS variables and Tailwind utilities.

Do NOT redesign layouts.
Do NOT change routes.
Do NOT remove the token architecture.
Only fix wiring and visual application.

---

## 1. Ensure Theme CSS Is Applied Globally

Confirm that global.css imports theme.css:

@import './theme.css';

If missing, add it.

Ensure global.css is imported in the root layout.

---

## 2. Wire Grade Radius + Shadow Tokens into Tailwind

In tailwind.config.mjs, extend:

borderRadius:
  card: 'var(--radius-card)'
  button: 'var(--radius-button)'

boxShadow:
  card: 'var(--shadow-card)'
  'card-hover': 'var(--shadow-card-hover)'

Ensure no hardcoded rounded-lg or shadow-md overrides remain on components.
Replace with:
- rounded-card
- shadow-card
- hover:shadow-card-hover

---

## 3. Make Subject Themes Affect Page Atmosphere

Currently only small pills show subject color.
We need subject themes to influence page background subtly.

In the main layout component:

Replace neutral background container with:

<main class="theme-gradient min-h-screen">

This uses the existing:
--subject-gradient token.

If subject-gradient is undefined, fallback to --color-surface.

Do NOT use loud gradients.
Keep it subtle and professional.

---

## 4. Increase Subject Influence on Cards (Subtle)

Where lesson cards use:

bg-surface

Keep it.

But ensure bg-surface references:
var(--color-surface)

Subject themes already override --color-surface.
Do not hardcode any hex colors.

---

## 5. Remove Duplicate Dark Mode System

If Tailwind dark mode is enabled via `dark:` classes:

Remove dark: usage.

Keep only token-based dark system using:
[data-theme='dark']

Ensure theme toggle modifies:
document.body.dataset.theme = 'dark' | 'light'

Do NOT mix two systems.

---

## 6. Validation

After changes:

- Mathematics vs Science pages must visibly differ.
- K–3 vs 10–12 pages must visibly differ in card rounding.
- High contrast mode must still override everything.
- No !important usage.
- Build must pass.

Keep the implementation clean and minimal.