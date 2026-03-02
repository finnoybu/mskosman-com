Implement Stage 3.3: Utility Bar (Print / Share / Font Size).

This stage adds an accessibility-focused utility strip.

Do NOT redesign page layout.
Do NOT modify lesson schema.
Do NOT change theme architecture.
Do NOT reintroduce high-contrast theme.
Keep implementation lightweight and accessible.

---

## 1) Placement

Insert utility bar directly below header and header divider.

It must appear on:

- /lesson-plans
- /subjects/*
- /grades/*
- /lessons/*
- /standards/*

It must NOT appear on:

- /

Ensure no layout shift when bar appears.

---

## 2) Layout & Visual Rules

Utility bar is:

- Horizontally aligned
- Compact
- Subtle
- Non-dominant
- Full-width container aligned with page content

Structure:

Print | Share & Bookmark | Font Size + / -

Spacing:
- 16px vertical padding max
- No heavy borders
- Use subtle divider line below header

It should not visually compete with primary navigation.

---

## 3) Print Functionality

Print button:

- Use window.print()
- No intermediate page
- No route change

Add print CSS:

@media print {
  - Hide header
  - Hide utility bar
  - Hide theme dropdown
  - Hide search inputs
  - Hide navigation links
  - Optimize lesson spacing
  - Remove shadows
  - Ensure body text is black on white
  - Preserve lesson title and metadata
}

Print layout should feel intentional, not raw.

---

## 4) Share & Bookmark Dropdown

Implement dropdown with:

- Copy Link
- Email
- LinkedIn
- Twitter (X)
- Reddit

Behavior:

- Accessible via keyboard
- aria-haspopup="menu"
- aria-expanded managed correctly
- Closes on outside click and Escape
- No layout shift
- No icon-only ambiguity
- If navigator.share is supported, use it first

Copy Link should:

- Use clipboard API
- Provide temporary confirmation message
- Not use alert()

---

## 5) Font Size Controls

Controls:

- "+" increase
- "–" decrease

Implementation:

Adjust:

--font-size-base

Constraints:

- Minimum 1rem
- Maximum 1.25rem (for now)
- Step increments 0.125rem

Persist in localStorage.

Apply globally via root CSS variable.

Ensure:

- No layout breakage
- No overflow issues
- No clipping in cards
- Works in Light, Dark, and System modes

---

## 6) Accessibility Requirements

All controls must:

- Be keyboard accessible
- Have visible focus state
- Have descriptive aria-label
- Not rely on icon-only meaning
- Not conflict with theme dropdown
- Maintain sufficient non-text contrast (3:1)

Do not introduce new accessibility regressions.

---

## 7) Performance Constraints

- No large libraries
- No social SDK embeds
- No third-party tracking injection
- No layout reflow loops
- No heavy hydration

Keep JS minimal.

---

## 8) Validation

After implementation:

- npm run build passes
- No console errors
- Lighthouse Accessibility ≥ 90
- Lighthouse Performance ≥ 95
- No layout shift
- Print preview renders cleanly
- Font scaling works
- Share dropdown works on keyboard and mouse