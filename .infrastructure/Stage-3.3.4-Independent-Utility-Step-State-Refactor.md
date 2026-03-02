Implement Stage 3.3.4: Independent Utility Step State Refactor.

This stage ensures Increase and Decrease buttons behave independently
when reaching min/max font scale limits.

Do NOT modify:
- Theme system (Light / Dark / System)
- SVG geometry
- Utility bar layout
- Print/share logic
- Accessibility improvements from Stage 3.2.x
- Global theme tokens

Focus only on:

- Scoped utility tokens
- Independent disabled state styling
- Correct SVG token usage

---

## 1) Remove Global Utility Color Override

If present, remove:

.utility-bar {
  color: var(--color-primary);
}

Utility color should not globally override theme colors.

---

## 2) Introduce Scoped Utility Tokens

Inside UtilityBar.astro <style> block, define:

.utility-bar {
  --utility-icon-color: var(--color-primary);

  /* Segmented font buttons */
  --utility-step-bg: var(--color-bg);
  --utility-step-fg: var(--color-primary);
  --utility-step-border: var(--color-primary);

  --utility-step-disabled-fg: var(--color-border);
  --utility-step-disabled-border: var(--color-border);
}

---

## 3) Standalone Icons (Print, Share, FontSize)

Ensure:

- Their SVGs use stroke="currentColor"
- They are wrapped in an element with:

.utility-icon {
  color: var(--utility-icon-color);
}

No hardcoded stroke colors.

---

## 4) Update IncreaseIcon & DecreaseIcon

Ensure:

Background path uses:
fill="var(--utility-bg)"

Foreground path uses:
fill="var(--utility-fg)"

Do NOT use var(--color-primary) directly in SVG.

---

## 5) Scope Token Application Per Button

In UtilityBar styles:

.font-step {
  --utility-bg: var(--utility-step-bg);
  --utility-fg: var(--utility-step-fg);
  border: 1px solid var(--utility-step-border);
}

.font-step + .font-step {
  border-left: 1px solid var(--utility-step-border);
}

---

## 6) Independent Disabled State

Add:

.font-step:disabled {
  --utility-fg: var(--utility-step-disabled-fg);
  border-color: var(--utility-step-disabled-border);
  cursor: not-allowed;
}

Do NOT use opacity for disabled indication.

Do NOT modify sibling buttons.

---

## 7) Ensure Real Disabled Attribute

Confirm font scale logic uses:

<button disabled={isMin}>
<button disabled={isMax}>

Do NOT rely solely on aria-disabled.

---

## 8) Validation Criteria

After implementation:

- At font scale -2:
  Decrease appears disabled (gray symbol + gray border)
  Increase remains blue

- At font scale +2:
  Increase appears disabled (gray symbol + gray border)
  Decrease remains blue

- At mid states:
  Both appear blue

- No other icons change color

- No theme regressions

- npm run build passes

- No console errors

- No layout shift introduced