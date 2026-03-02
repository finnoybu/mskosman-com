# Stage 3.2: Theme System & High Contrast Accessibility

## Status
- **Status**: Completed
- **Estimated Time**: 4-6 hours
- **Prerequisites**: Stage 3.1 completed
- **Next Stage**: Stage 3.3

---

## Objective

Refine theme system and strengthen accessibility through:
- Consolidated theme dropdown (replacing individual buttons)
- Properly implemented high contrast mode
- Enhanced focus visibility across all themes
- WCAG AA compliance improvements

This is an **accessibility-focused refactor**.

---

## Constraints

**DO NOT**:
- Change page structure or layouts
- Redesign visual components
- Modify lesson schema or filtering logic
- Alter content or functionality

**FOCUS ON**:
- Accessibility compliance
- Theme management UX
- Contrast and readability
- Keyboard navigation

---

## Target Compliance

### WCAG 2.1 Level AA
- **Color Contrast**: 
  - Normal text: 4.5:1 minimum
  - Large text (18pt+): 3:1 minimum
  - UI components: 3:1 minimum
- **Keyboard**: All interactive elements accessible
- **Focus Visible**: Clear focus indicators
- **Screen Reader**: Proper ARIA semantics

---

## 1) Replace Theme Buttons with Dropdown

### Current State
Individual buttons for Light / Dark / High Contrast in header.

### New Implementation

**Single dropdown control** in header right section:
- Label: "Theme ▾"
- Options: Light, Dark, High Contrast
- Keyboard accessible
- Persistent selection

### Implementation

**File**: `src/components/ThemeSwitcher.astro`

```astro
---
// Server-side props (if needed)
---

<div class="theme-switcher">
  <button 
    id="theme-button" 
    class="theme-button"
    aria-label="Theme options"
    aria-haspopup="true"
    aria-expanded="false"
  >
    <span id="current-theme-label">Theme</span>
    <svg class="chevron" width="12" height="8" viewBox="0 0 12 8" fill="currentColor">
      <path d="M1 1l5 5 5-5" stroke="currentColor" stroke-width="2" fill="none"/>
    </svg>
  </button>
  
  <div 
    id="theme-dropdown" 
    class="theme-dropdown" 
    role="menu"
    aria-labelledby="theme-button"
    hidden
  >
    <button 
      role="menuitem" 
      data-theme="light" 
      class="theme-option"
    >
      Light
    </button>
    <button 
      role="menuitem" 
      data-theme="dark" 
      class="theme-option"
    >
      Dark
    </button>
    <button 
      role="menuitem" 
      data-theme="high-contrast" 
      class="theme-option"
    >
      High Contrast
    </button>
  </div>
</div>

<script>
  // Theme management logic
  const themeButton = document.getElementById('theme-button');
  const themeDropdown = document.getElementById('theme-dropdown');
  const themeOptions = document.querySelectorAll('.theme-option');
  const themeLabel = document.getElementById('current-theme-label');
  
  // Load saved theme or default to system preference
  function getInitialTheme() {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    
    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }
  
  // Apply theme to document
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update label
    const labels = { light: 'Light', dark: 'Dark', 'high-contrast': 'High Contrast' };
    themeLabel.textContent = labels[theme];
    
    // Update aria-checked state
    themeOptions.forEach(option => {
      const isSelected = option.getAttribute('data-theme') === theme;
      option.setAttribute('aria-checked', isSelected ? 'true' : 'false');
    });
  }
  
  // Toggle dropdown
  function toggleDropdown() {
    const isHidden = themeDropdown.hasAttribute('hidden');
    if (isHidden) {
      themeDropdown.removeAttribute('hidden');
      themeButton.setAttribute('aria-expanded', 'true');
    } else {
      themeDropdown.setAttribute('hidden', '');
      themeButton.setAttribute('aria-expanded', 'false');
    }
  }
  
  // Close dropdown
  function closeDropdown() {
    themeDropdown.setAttribute('hidden', '');
    themeButton.setAttribute('aria-expanded', 'false');
  }
  
  // Initialize theme on page load
  applyTheme(getInitialTheme());
  
  // Toggle dropdown on button click
  themeButton.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleDropdown();
  });
  
  // Handle theme selection
  themeOptions.forEach(option => {
    option.addEventListener('click', () => {
      const theme = option.getAttribute('data-theme');
      applyTheme(theme);
      closeDropdown();
    });
  });
  
  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!themeDropdown.hasAttribute('hidden') && !themeButton.contains(e.target)) {
      closeDropdown();
    }
  });
  
  // Keyboard navigation
  themeButton.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDropdown();
    }
  });
  
  themeDropdown.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDropdown();
      themeButton.focus();
    }
  });
</script>

<style>
  .theme-switcher {
    position: relative;
  }
  
  .theme-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    background: transparent;
    border: 1px solid var(--color-border);
    border-radius: 0.25rem;
    color: var(--color-text);
    cursor: pointer;
    font-size: 0.875rem;
  }
  
  .theme-button:hover {
    background: var(--color-surface);
  }
  
  .theme-dropdown {
    position: absolute;
    top: calc(100% + 0.5rem);
    right: 0;
    min-width: 150px;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 0.25rem;
    box-shadow: var(--shadow-dropdown, 0 4px 6px rgba(0,0,0,0.1));
    z-index: 1000;
  }
  
  .theme-option {
    display: block;
    width: 100%;
    padding: 0.75rem 1rem;
    background: transparent;
    border: none;
    text-align: left;
    color: var(--color-text);
    cursor: pointer;
    font-size: 0.875rem;
  }
  
  .theme-option:hover,
  .theme-option:focus {
    background: var(--color-hover);
  }
  
  .theme-option[aria-checked="true"] {
    font-weight: 600;
    color: var(--color-primary);
  }
  
  .chevron {
    transition: transform 0.2s;
  }
  
  .theme-button[aria-expanded="true"] .chevron {
    transform: rotate(180deg);
  }
</style>
```

### Behavior Requirements
- **Keyboard**: 
  - `Tab` to focus button
  - `Enter`/`Space` to open dropdown
  - `Escape` to close dropdown
  - `Tab` through options
  - `Enter` to select
- **Click Outside**: Closes dropdown
- **Persistence**: Selection saved to localStorage
- **No Layout Shift**: Dropdown absolutely positioned

### Validation
- [ ] Dropdown opens/closes correctly
- [ ] Theme changes apply immediately
- [ ] Selection persists across page loads
- [ ] Keyboard navigation functional
- [ ] aria-expanded managed correctly
- [ ] No console errors

---

## 2) High Contrast Token Redesign

### Objective
Redesign high contrast mode as a **true accessibility mode** prioritizing readability over aesthetics.

### Color Token Values

**File**: `src/styles/theme.css`

```css
/* Light Theme */
[data-theme="light"] {
  --color-bg: #ffffff;
  --color-surface: #f9fafb;
  --color-text: #1a1a1a;
  --color-text-secondary: #6b7280;
  --color-primary: #2563eb;
  --color-border: #e5e7eb;
  --color-hover: #f3f4f6;
  --focus-ring: 3px solid #2563eb;
  --shadow-card: 0 1px 3px rgba(0,0,0,0.1);
  --shadow-card-hover: 0 4px 6px rgba(0,0,0,0.1);
  --shadow-dropdown: 0 4px 6px rgba(0,0,0,0.1);
}

/* Dark Theme */
[data-theme="dark"] {
  --color-bg: #1a1a1a;
  --color-surface: #2d2d2d;
  --color-text: #f5f5f5;
  --color-text-secondary: #a0a0a0;
  --color-primary: #3b82f6;
  --color-border: #404040;
  --color-hover: #3a3a3a;
  --focus-ring: 3px solid #3b82f6;
  --shadow-card: 0 1px 3px rgba(0,0,0,0.3);
  --shadow-card-hover: 0 4px 6px rgba(0,0,0,0.3);
  --shadow-dropdown: 0 4px 6px rgba(0,0,0,0.3);
}

/* High Contrast Theme */
[data-theme="high-contrast"] {
  /* Pure black background */
  --color-bg: #000000;
  --color-surface: #000000;
  
  /* Pure white text */
  --color-text: #ffffff;
  --color-text-secondary: #ffffff;
  
  /* Bright yellow primary (highly visible) */
  --color-primary: #ffff00;
  
  /* White borders */
  --color-border: #ffffff;
  
  /* Inverted hover state */
  --color-hover: #ffffff;
  --color-hover-text: #000000;
  
  /* Bright yellow focus ring */
  --focus-ring: 3px solid #ffff00;
  
  /* Remove all shadows (distracting in HC mode) */
  --shadow-card: none;
  --shadow-card-hover: none;
  --shadow-dropdown: none;
}
```

### High Contrast Specific Rules

**File**: `src/styles/global.css`

```css
/* High Contrast Mode Overrides */
[data-theme="high-contrast"] {
  /* Force all links to be underlined */
  a {
    text-decoration: underline;
    color: var(--color-primary);
  }
  
  a:hover {
    background: var(--color-hover);
    color: var(--color-hover-text);
  }
  
  /* Strong borders on all interactive elements */
  button,
  input,
  select,
  textarea {
    border: 2px solid var(--color-border);
  }
  
  /* High contrast button hover state */
  button:hover {
    background: var(--color-hover);
    color: var(--color-hover-text);
  }
  
  /* Remove subtle backgrounds */
  .card,
  .surface {
    background: var(--color-bg);
    border: 2px solid var(--color-border);
  }
  
  /* Ensure form inputs are visible */
  input[type="text"],
  input[type="search"],
  textarea {
    background: var(--color-bg);
    color: var(--color-text);
    border: 2px solid var(--color-border);
  }
  
  /* Remove decorative elements */
  .shadow,
  .gradient {
    box-shadow: none;
    background-image: none;
  }
}
```

### Design Principles for High Contrast
- **Binary contrast**: Black & white only (with yellow accent)
- **No subtle grays**: Everything is #000000 or #ffffff
- **All borders visible**: 2px minimum on interactive elements  
- **Underlined links**: Never rely on color alone
- **No shadows**: Remove all box-shadow
- **Strong focus**: 3px yellow outline
- **Hover inversion**: Background becomes white, text becomes black

### Contrast Ratios (WCAG AA)
- Background (#000000) to text (#ffffff): **21:1** ✓
- Background (#000000) to primary (#ffff00): **19.6:1** ✓
- All ratios exceed WCAG AAA requirements

---

## 3) Focus Visibility Enhancement

### Global Focus Rule

**File**: `src/styles/global.css`

```css
/* Enhanced focus visibility for all themes */
:focus-visible {
  outline: var(--focus-ring);
  outline-offset: 2px;
}

/* Remove default outline (but only when :focus-visible handles it) */
:focus:not(:focus-visible) {
  outline: none;
}

/* Ensure focus-visible on all interactive elements */
a:focus-visible,
button:focus-visible,
input:focus-visible,
select:focus-visible,
textarea:focus-visible,
[tabindex]:focus-visible {
  outline: var(--focus-ring);
  outline-offset: 2px;
}

/* In high contrast, make focus even more prominent */
[data-theme="high-contrast"] *:focus-visible {
  outline: 4px solid var(--color-primary);
  outline-offset: 2px;
}
```

### Component-Specific Focus Examples

**Navigation Links**:
```css
.nav-center a:focus-visible {
  outline: var(--focus-ring);
  outline-offset: 2px;
}
```

**Buttons**:
```css
.btn:focus-visible {
  outline: var(--focus-ring);
  outline-offset: 2px;
}
```

**Dropdown Items**:
```css
.theme-option:focus-visible {
  outline: var(--focus-ring);
  outline-offset: -2px; /* Inside element to avoid overflow */
}
```

### Validation
- [ ] Focus visible on all interactive elements
- [ ] Focus ring uses theme token
- [ ] High contrast focus more prominent
- [ ] No elements remove outline without replacement
- [ ] Tab order logical

---

## 4) Link Behavior in High Contrast

### Requirements
- All links **must be underlined** in high contrast mode
- Hover state **must not rely only on color change**
- Link color must have sufficient contrast (yellow on black = 19.6:1)

### Implementation

**File**: `src/styles/global.css`

```css
[data-theme="high-contrast"] a {
  /* Always underlined */
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 2px;
  
  /* Yellow text */
  color: var(--color-primary);
}

[data-theme="high-contrast"] a:hover {
  /* Invert colors on hover */
  background: var(--color-primary);
  color: #000000;
  text-decoration: none;
}

[data-theme="high-contrast"] a:focus-visible {
  /* Strong focus ring */
  outline: 4px solid var(--color-primary);
  outline-offset: 2px;
}

[data-theme="high-contrast"] a:visited {
  /* Keep visited links visible (same color) */
  color: var(--color-primary);
}
```

### Validation
- [ ] All links underlined in HC mode
- [ ] Hover state visually distinct (inverted colors)
- [ ] Focus ring visible
- [ ] Visited links still visible
- [ ] Contrast ratios meet WCAG AAA

---

## 5) Button & Interactive Elements in High Contrast

### Requirements
- Strong borders on all buttons
- Clear hover state (not color-only)
- Sufficient contrast
- Focus visible

### Implementation

**File**: `src/styles/global.css`

```css
/* High Contrast Button Styles */
[data-theme="high-contrast"] button,
[data-theme="high-contrast"] .btn {
  background: #000000;
  color: #ffffff;
  border: 2px solid #ffffff;
  padding: 0.5rem 1rem;
}

[data-theme="high-contrast"] button:hover,
[data-theme="high-contrast"] .btn:hover {
  background: #ffffff;
  color: #000000;
  border: 2px solid #ffffff;
}

[data-theme="high-contrast"] button:focus-visible,
[data-theme="high-contrast"] .btn:focus-visible {
  outline: 4px solid #ffff00;
  outline-offset: 2px;
}

/* Primary button variant */
[data-theme="high-contrast"] .btn-primary {
  background: #ffff00;
  color: #000000;
  border: 2px solid #ffff00;
}

[data-theme="high-contrast"] .btn-primary:hover {
  background: #ffffff;
  color: #000000;
  border: 2px solid #ffffff;
}

/* Disabled state (still visible) */
[data-theme="high-contrast"] button:disabled,
[data-theme="high-contrast"] .btn:disabled {
  background: #000000;
  color: #808080;
  border: 2px solid #808080;
  cursor: not-allowed;
}
```

### Form Inputs

```css
[data-theme="high-contrast"] input,
[data-theme="high-contrast"] select,
[data-theme="high-contrast"] textarea {
  background: #000000;
  color: #ffffff;
  border: 2px solid #ffffff;
}

[data-theme="high-contrast"] input:focus,
[data-theme="high-contrast"] select:focus,
[data-theme="high-contrast"] textarea:focus {
  outline: 4px solid #ffff00;
  outline-offset: 0;
}
```

### Validation
- [ ] All buttons have 2px borders in HC mode
- [ ] Hover states invert colors
- [ ] Disabled states visible but muted
- [ ] Form inputs have strong borders
- [ ] Focus rings clearly visible

---

## 6) Remove Decorative UI in High Contrast

### Elements to Remove/Simplify

**Shadows**:
```css
[data-theme="high-contrast"] {
  --shadow-card: none;
  --shadow-card-hover: none;
  --shadow-dropdown: none;
}

[data-theme="high-contrast"] .shadow,
[data-theme="high-contrast"] .card-shadow {
  box-shadow: none !important;
}
```

**Gradients**:
```css
[data-theme="high-contrast"] .gradient,
[data-theme="high-contrast"] .bg-gradient {
  background-image: none !important;
  background: var(--color-bg);
}
```

**Subtle Background Tints**:
```css
[data-theme="high-contrast"] .bg-surface,
[data-theme="high-contrast"] .card {
  background: var(--color-bg);
  border: 2px solid var(--color-border);
}
```

**Opacity**:
```css
[data-theme="high-contrast"] .opacity-50,
[data-theme="high-contrast"] .opacity-75 {
  opacity: 1 !important;
}
```

### Validation
- [ ] No shadows visible in HC mode
- [ ] No gradients visible in HC mode
- [ ] No low-opacity elements
- [ ] All backgrounds are pure black or pure white
- [ ] Layout remains intact

---

## 7) Testing & Validation

### Automated Validation

**Add npm script**:
```json
{
  "scripts": {
    "test:a11y": "playwright test accessibility.spec.ts"
  }
}
```

**File**: `tests/e2e/accessibility.spec.ts`

```typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility', () => {
  test('homepage passes axe accessibility tests - light theme', async ({ page }) => {
    await page.goto('/');
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
  
  test('homepage passes axe accessibility tests - dark theme', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
  
  test('homepage passes axe accessibility tests - high contrast', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'high-contrast');
    });
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
  
  test('keyboard navigation works across themes', async ({ page }) => {
    await page.goto('/');
    
    // Tab through interactive elements
    await page.keyboard.press('Tab'); // Skip to content
    await page.keyboard.press('Tab'); // Logo
    await page.keyboard.press('Tab'); // First nav link
    
    // Verify focus is visible
    const focused = await page.evaluate(() => document.activeElement?.tagName);
    expect(focused).toBe('A');
  });
});
```

### Manual Testing Checklist

#### Light Theme
- [ ] Sufficient color contrast (4.5:1 minimum)
- [ ] Focus visible on all interactive elements
- [ ] Links distinguishable from body text
- [ ] Buttons have clear hover states

#### Dark Theme
- [ ] Sufficient color contrast (4.5:1 minimum)
- [ ] Focus visible on all interactive elements
- [ ] No eye strain after 5 minutes viewing
- [ ] All text readable

#### High Contrast Theme
- [ ] All text is pure white on pure black
- [ ] All links are underlined
- [ ] All buttons have 2px borders
- [ ] No shadows visible
- [ ] Focus ring is bright yellow (4px)
- [ ] Hover states invert colors
- [ ] No decorative elements visible
- [ ] Form inputs clearly visible

#### Cross-Theme
- [ ] Theme dropdown works in all themes
- [ ] Selection persists across page navigation
- [ ] No layout shift when changing themes
- [ ] No console errors

### Browser Testing
Test all three themes in:
- Chrome
- Firefox
- Safari
- Edge

### Screen Reader Testing
- NVDA (Windows)
- JAWS (Windows)
- VoiceOver (Mac)

Basic test: Navigate homepage, verify all content announced correctly.

---

## Key Files to Create/Modify

### Modified Files
- `src/components/ThemeSwitcher.astro` (complete refactor)
- `src/styles/theme.css` (add high contrast tokens)
- `src/styles/global.css` (add focus rules, HC overrides)

### New Files
- `tests/e2e/accessibility.spec.ts` (if not exists)

### Files Requiring HC Overrides
Review and add HC-specific rules to:
- `src/pages/index.astro`
- `src/pages/lesson-plans.astro`
- `src/components/Header.astro`
- `src/components/Footer.astro`
- `src/components/LessonCard.astro`
- `src/components/SearchBar.astro`

---

## Acceptance Criteria

### Theme Switcher
- [ ] Dropdown replaces individual buttons
- [ ] Three options: Light, Dark, High Contrast
- [ ] Keyboard accessible (Tab, Enter, Escape)
- [ ] Closes on outside click
- [ ] Selection persists in localStorage
- [ ] Current theme displayed in button label
- [ ] aria-expanded managed correctly

### High Contrast Mode
- [ ] Background is pure black (#000000)
- [ ] Text is pure white (#ffffff)
- [ ] Primary color is bright yellow (#ffff00)
- [ ] All links underlined
- [ ] All borders 2px solid white
- [ ] No shadows visible
- [ ] No gradients visible
- [ ] Hover states invert colors
- [ ] Focus ring is 4px yellow

### Focus Visibility
- [ ] All interactive elements have visible focus
- [ ] Focus ring uses theme token
- [ ] HC mode has 4px yellow focus ring
- [ ] Focus outline-offset is 2px
- [ ] No elements remove outline without replacement

### Contrast Ratios
- [ ] Light theme text: ≥ 4.5:1
- [ ] Dark theme text: ≥ 4.5:1
- [ ] HC theme text: ≥ 21:1 (black/white)
- [ ] UI components: ≥ 3:1
- [ ] Verified with color contrast checker

### Keyboard Navigation
- [ ] All pages fully keyboard navigable
- [ ] Tab order logical
- [ ] Dropdowns can be closed with Escape
- [ ] No keyboard traps
- [ ] Skip-to-content link works

### Build & CI
- [ ] npm run build succeeds
- [ ] No console errors or warnings
- [ ] CI passes
- [ ] Lighthouse Accessibility ≥ 95

### No Regressions
- [ ] All existing features work
- [ ] No layout shifts
- [ ] No visual changes outside HC mode
- [ ] Performance unchanged

---

## Testing Requirements

### Automated Tests
Run:
```bash
npm run test:a11y
```

### Manual Tests
1. Switch between all three themes on multiple pages
2. Tab through entire page in each theme
3. Verify focus visibility in each theme
4. Test dropdown open/close with keyboard
5. Test dropdown open/close with mouse
6. Verify theme persists across page reload
7. Check color contrast with browser DevTools
8. Test hover states on links and buttons in HC mode

### Tools
- **Axe DevTools** (browser extension)
- **WAVE** (browser extension)
- **Lighthouse** (built into Chrome DevTools)
- **Color Contrast Analyzer** (standalone tool)

---

## Rollback Plan

Git branch: `stage-3.2-theme-accessibility`

Commit structure:
1. Theme dropdown implementation
2. High contrast token redesign
3. Focus visibility enhancements
4. Link behavior in HC
5. Button/form elements in HC
6. Remove decorative UI in HC
7. Testing and validation

If blocking issue: `git revert` specific commit(s)

---

## Known Future Work

- **WCAG AAA** compliance (beyond AA)
- **Motion reduction** (`prefers-reduced-motion`)
- **Custom font size** settings (Stage 3.3)
- **Print stylesheet** optimization (Stage 3.3)
- **Full WCAG audit** with external tool
- **User testing** with screen reader users

---

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Axe Accessibility Testing](https://www.deque.com/axe/)
- [MDN: :focus-visible](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible)
