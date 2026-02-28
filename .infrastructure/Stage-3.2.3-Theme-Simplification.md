Implement Stage 3.2.3: Theme Simplification (Light / Dark / System).

This stage removes High Contrast mode and simplifies theme architecture.

Do NOT modify layout.
Do NOT modify lesson schema.
Do NOT change accessibility improvements already implemented.
Do NOT alter routing.

Focus only on theme logic cleanup and system preference integration.

---

## 1) Remove High Contrast Mode Completely

- Remove "high-contrast" from theme state.
- Remove all CSS selectors using:
  [data-theme="high-contrast"]
- Remove high-contrast tokens.
- Remove high-contrast from dropdown options.
- Remove any related JS logic.

Clean removal only. No partial references.

---

## 2) Final Theme Options

Theme dropdown must contain:

- Light
- Dark
- System

Default behavior: System

---

## 3) Implement System Preference

When theme = "system":

Use:

window.matchMedia('(prefers-color-scheme: dark)')

Behavior:

- If system prefers dark → apply dark theme
- Otherwise → apply light theme

Listen for changes to system preference and update dynamically when theme = system.

---

## 4) Theme State Logic

Theme priority:

1. If user manually selects Light or Dark → persist in localStorage.
2. If user selects System → follow OS preference.
3. If no stored value → default to System.

Ensure no flicker on page load.
Apply theme early before content renders.

---

## 5) Preserve Accessibility Improvements

Do NOT remove:

- Strong focus-visible outlines
- Improved non-text contrast
- Improved button boundary contrast
- Underlined content links
- Page title improvements
- aria-label corrections

Accessibility improvements apply to both Light and Dark.

---

## 6) Remove Theme Complexity

Ensure:

- No leftover references to high contrast in JS or CSS.
- No dead tokens.
- No unused CSS variables.
- No unreachable code paths.

---

## 7) Validation

- npm run build passes
- No console errors
- No layout shifts
- Theme dropdown works correctly
- System preference toggles correctly
- Lighthouse Accessibility remains ≥ 90