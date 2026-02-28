Implement Stage 3.3: Utility Bar (Print / Share / Font Size).

This adds an accessibility/utility strip below the header.

Do NOT redesign page layout.
Do NOT modify lesson schema.
Do NOT introduce heavy dependencies.

---

## 1) Placement

Insert utility bar directly below header and header divider.

Utility bar appears on:

- /lesson-plans
- /subjects/*
- /grades/*
- /lessons/*
- /standards/*

It does NOT appear on homepage.

---

## 2) Layout

Horizontal strip containing:

Print | Share & Bookmark | Font Size + / -

Small, subtle, non-dominant.

Responsive and accessible.

---

## 3) Print

Implement print button:

- Use window.print()
- Add print styles:
  - Hide header
  - Hide utility bar
  - Hide theme dropdown
  - Optimize lesson formatting
  - Preserve lesson title and metadata
  - Improve spacing for paper

---

## 4) Share & Bookmark

Implement dropdown:

Options:
- Copy Link
- Email
- LinkedIn
- Twitter (X)
- Reddit

Requirements:

- Accessible via keyboard
- aria-expanded managed
- Closes on outside click and Escape
- Uses share URLs
- If navigator.share is available, use it first

---

## 5) Font Size Controls

Add "+" and "–" controls.

Adjust root token:

--font-size-base

Implementation:

- Increase in small increments (e.g., 1rem → 1.125rem → 1.25rem)
- Decrease with minimum bound
- Persist in localStorage
- Apply globally
- Do not break layout

Font resizing must work across all themes.

---

## 6) Accessibility

- All controls keyboard accessible
- Proper aria-labels
- Clear focus-visible behavior
- In high contrast mode, ensure controls are highly legible

---

## 7) Validation

Ensure:

- No build errors
- No layout shift
- No console errors
- Utility bar hides in print view
- Works in light, dark, and high contrast