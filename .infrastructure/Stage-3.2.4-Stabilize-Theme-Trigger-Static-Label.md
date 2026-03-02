Implement Stage 3.2.4: Stabilize Theme Trigger Button (Option B).

This change removes layout shift caused by dynamic label width.

Do NOT modify theme logic.
Do NOT modify accessibility improvements.
Do NOT change dropdown behavior.
Do NOT change theme persistence logic.

Only modify the header theme trigger button UI.

---

## 1) Change Theme Trigger Label

Instead of showing current theme label (Light / Dark / System),
the header button must always display:

Theme ▾

The dropdown will still contain:

- Light
- Dark
- System

The currently active theme should be indicated inside the dropdown with:

- Checkmark
OR
- aria-selected="true"
OR
- visual highlight state

Do NOT display the active theme in the header button text.

---

## 2) Prevent Layout Shift

Ensure the theme trigger:

- Has fixed intrinsic width based on text "Theme ▾"
- Does not resize when selecting a theme
- Does not shift navigation links left or right

Use:

- inline-flex
- align-items: center
- justify-content: center

No dynamic width calculation.

---

## 3) Accessibility Requirements

- Button must have aria-haspopup="menu"
- Manage aria-expanded correctly
- Dropdown must be keyboard accessible
- Current theme must be announced via aria-selected or similar
- No aria-label mismatch

---

## 4) Validation

After implementation:

- Theme switching still works
- System mode still works
- No layout shift
- No console errors
- Lighthouse accessibility remains ≥ 90