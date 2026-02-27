# Stage 3 — Enterprise Baseline Hardening

## CI/CD
Add GitHub Actions workflow:
- install
- lint
- typecheck
- test
- build

## Testing
Unit tests (Vitest):
- slug generation
- search filtering
- nav toggle persistence

E2E (Playwright):
- home → subjects → subject detail → lesson
- toggle changes nav behavior

## SEO
- sitemap
- robots.txt
- canonical URLs
- OpenGraph defaults

## Accessibility
- skip-to-content
- visible focus states
- keyboard nav for toggle/search

## Security
- Document recommended headers for Cloudflare Pages / Netlify.
- Ensure static build integrity.

## Deliverable
Enterprise-ready baseline with passing CI and build validation.
