Implement Stage 3: Public Launch Hardening.

The site will deploy publicly within weeks.
Single contributor.
Static-first architecture.
No backend.
No authentication.

Do not introduce unnecessary complexity.
Focus on stability, crawlability, and launch readiness.

---

## 1) CI/CD

Create GitHub Actions workflow:

On push and pull_request:

- npm ci
- npm run check
- npm run build

Fail build on:
- type errors
- lint errors
- validation failures

No deployment automation yet.
No matrix builds.
Keep workflow minimal and clean.

---

## 2) Testing

Install Vitest.

Add unit tests for:

- slug generation logic
- SOL ID regex validation
- standards merge logic (lesson + standards collection)
- filter query parsing logic

Add minimal Playwright E2E:

Test 1:
home → subjects → subject detail → lesson

Test 2:
home → grades → grade detail → lesson

Ensure pages render and navigation does not 404.

Do not overbuild test coverage.

---

## 3) SEO Baseline

Implement:

- sitemap.xml generation (auto-generated from routes)
- robots.txt
- canonical <link> tags on every page
- OpenGraph meta tags (title, description, og:type, og:image default)
- Twitter card meta tags

Ensure:
- No duplicate canonical URLs
- Query parameter pages do not index as duplicates

---

## 4) Accessibility Baseline

Add:

- Skip-to-content link
- Visible focus styles for interactive elements
- Keyboard navigation support for:
  - subject/grade toggle
  - search
  - filter controls
- aria-labels where appropriate

Do not perform full WCAG audit yet.
Ensure obvious accessibility gaps are closed.

---

## 5) Error Handling

Add:

- Custom 404 page
- Basic fallback error page
- Ensure broken route gracefully renders 404

---

## 6) Basic Performance

Ensure:

- Images optimized
- No large unused JS bundles
- Avoid unnecessary client-side hydration
- Confirm Lighthouse score > 85 on Performance and SEO

No micro-optimizations yet.

---

## 7) Production Configuration Notes

Add README section:

- Deployment instructions (Cloudflare Pages / Netlify)
- Recommended security headers:
  - Content-Security-Policy
  - X-Frame-Options
  - X-Content-Type-Options
  - Referrer-Policy
- Note that headers should be configured at hosting layer

Do not implement custom server logic in project.

---

## Acceptance Criteria

- npm run build passes
- npm run check passes
- CI workflow passes
- Sitemap accessible
- Canonical tags correct
- 404 page functional
- Basic accessibility validated
- No visual redesign introduced