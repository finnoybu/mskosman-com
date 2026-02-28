# Stage 3: Public Launch Hardening

## Status
- **Status**: Completed
- **Estimated Time**: 10-14 hours
- **Prerequisites**: Stage 2 completed
- **Next Stage**: Stage 3.1

---

## Objective

Prepare the site for public deployment within weeks.

Focus on:
- CI/CD automation
- Testing foundation (unit + E2E)
- SEO baseline
- Accessibility baseline
- Error handling
- Performance optimization

---

## Constraints

**DO NOT**:
- Introduce unnecessary complexity
- Add authentication or backend
- Overbuild test coverage
- Introduce new features

**FOCUS ON**:
- Stability and reliability
- Crawlability and discoverability
- Launch readiness

---

## 1) CI/CD Pipeline

### Create GitHub Actions Workflow

**File**: `.github/workflows/ci.yml`

**Trigger Events**:
- `push` to `main` branch
- `pull_request` to `main` branch

**Jobs**:
```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Type check
        run: npm run typecheck
      
      - name: Lint
        run: npm run lint
      
      - name: Validate content
        run: npm run validate
      
      - name: Run unit tests
        run: npm run test
      
      - name: Build
        run: npm run build
      
      - name: Run E2E tests
        run: npm run test:e2e
```

### Implementation Notes
- Use `npm ci` for deterministic installs
- Fail fast: stop on first error
- No deployment automation at this stage (manual deployment)
- No matrix builds (single Node version sufficient)
- Cache dependencies for speed

### Validation
- [ ] Workflow file validates (GitHub Actions syntax)
- [ ] Push to main triggers workflow
- [ ] PR to main triggers workflow
- [ ] Workflow badge in README

---

## 2) Testing Foundation

### Install Testing Dependencies

**Package.json additions**:
```json
{
  "devDependencies": {
    "vitest": "^1.0.0",
    "@playwright/test": "^1.40.0"
  },
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui"
  }
}
```

### Vitest Configuration

**File**: `vitest.config.ts`

```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
  },
});
```

### Unit Tests

**Target Coverage**: ~60% of utility functions (not components)

**File**: `tests/utils.test.ts`

**Test Cases**:
```typescript
describe('slug generation', () => {
  it('converts subject name to slug', () => {
    expect(generateSlug('Computer Science')).toBe('computer-science');
  });
  
  it('handles special characters', () => {
    expect(generateSlug('Economics & Personal Finance')).toBe('economics-personal-finance');
  });
});

describe('SOL code validation', () => {
  it('validates K-12 SOL code format', () => {
    expect(isValidSOLCode('K.1')).toBe(true);
    expect(isValidSOLCode('4.2a')).toBe(true);
    expect(isValidSOLCode('12.3bc')).toBe(true);
  });
  
  it('rejects invalid SOL codes', () => {
    expect(isValidSOLCode('K')).toBe(false);
    expect(isValidSOLCode('4.2.3')).toBe(false);
    expect(isValidSOLCode('invalid')).toBe(false);
  });
});

describe('standards merge logic', () => {
  it('merges lesson and standards links without duplicates', () => {
    const lessonLinks = [{ label: 'A', url: 'https://example.com/a' }];
    const standardsLinks = [
      { label: 'B', url: 'https://example.com/b' },
      { label: 'A Duplicate', url: 'https://example.com/a' }
    ];
    const merged = mergeStandardsLinks(lessonLinks, standardsLinks);
    expect(merged).toHaveLength(2);
  });
});

describe('filter query parsing', () => {
  it('parses subject filter', () => {
    expect(parseFilterQuery('subject=mathematics')).toEqual({
      subject: 'mathematics',
      grade: undefined
    });
  });
  
  it('parses multiple filters', () => {
    expect(parseFilterQuery('subject=science&grade=4')).toEqual({
      subject: 'science',
      grade: '4'
    });
  });
});
```

### Playwright Configuration

**File**: `playwright.config.ts`

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:4321',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: {
    command: 'npm run preview',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
  },
});
```

### E2E Tests

**File**: `tests/e2e/navigation.spec.ts`

**Test Case 1: Subject Navigation Flow**
```typescript
test('navigate from home → subjects → subject detail → lesson', async ({ page }) => {
  // Start at homepage
  await page.goto('/');
  await expect(page).toHaveTitle(/mskosman/);
  
  // Navigate to subjects
  await page.click('text=Browse by Subject');
  await expect(page).toHaveURL(/\/subjects/);
  
  // Select a subject (e.g., Mathematics)
  await page.click('text=Mathematics');
  await expect(page).toHaveURL(/\/subjects\/mathematics/);
  
  // Click a lesson
  await page.click('[data-testid="lesson-card"]').first();
  await expect(page).toHaveURL(/\/lessons\/.+/);
  
  // Verify lesson content renders
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('text=Warm-up')).toBeVisible();
});
```

**Test Case 2: Grade Navigation Flow**
```typescript
test('navigate from home → grades → grade detail → lesson', async ({ page }) => {
  await page.goto('/');
  
  // Navigate to grades
  await page.click('text=Browse by Grade');
  await expect(page).toHaveURL(/\/grades/);
  
  // Select a grade (e.g., Grade 4)
  await page.click('text=Grade 4');
  await expect(page).toHaveURL(/\/grades\/4/);
  
  // Click a lesson
  await page.click('[data-testid="lesson-card"]').first();
  await expect(page).toHaveURL(/\/lessons\/.+/);
  
  // Verify lesson renders
  await expect(page.locator('h1')).toBeVisible();
});
```

**Test Case 3: Search Functionality**
```typescript
test('search filters lessons', async ({ page }) => {
  await page.goto('/');
  
  // Type in search bar
  await page.fill('[data-testid="search-input"]', 'mathematics');
  
  // Verify filtered results
  const lessonCards = page.locator('[data-testid="lesson-card"]');
  await expect(lessonCards.first()).toBeVisible();
  
  // Clear search
  await page.fill('[data-testid="search-input"]', '');
  
  // Verify all lessons shown again
  const allCards = await lessonCards.count();
  expect(allCards).toBeGreaterThan(1);
});
```

### Testing Notes
- **Do NOT overbuild**: Focus on critical paths only
- Target ~60% code coverage for utilities
- E2E tests verify navigation, not every interaction
- Manual testing still required for visual QA

---

## 3) SEO Baseline

### Sitemap Generation

**File**: `src/pages/sitemap.xml.ts`

```typescript
import { getCollection } from 'astro:content';

export async function get() {
  const lessons = await getCollection('lessons', ({ data }) => {
    return data.status === 'published';
  });

  const urls = [
    { loc: '/', priority: 1.0 },
    { loc: '/lesson-plans', priority: 0.9 },
    { loc: '/subjects', priority: 0.8 },
    { loc: '/grades', priority: 0.8 },
    { loc: '/standards', priority: 0.7 },
    { loc: '/about', priority: 0.6 },
    { loc: '/contact', priority: 0.6 },
    ...lessons.map(lesson => ({
      loc: `/lessons/${lesson.slug}`,
      priority: 0.7,
      lastmod: lesson.data.updatedAt.toISOString(),
    })),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>https://mskosman.com${url.loc}</loc>
    <priority>${url.priority}</priority>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
```

### Robots.txt

**File**: `public/robots.txt`

```
User-agent: *
Allow: /

Sitemap: https://mskosman.com/sitemap.xml
```

### Meta Tags Component

**File**: `src/components/Meta.astro`

```astro
---
interface Props {
  title: string;
  description: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  canonical?: string;
}

const {
  title,
  description,
  ogType = 'website',
  ogImage = '/og-default.png',
  canonical
} = Astro.props;

const canonicalURL = canonical || new URL(Astro.url.pathname, Astro.site);
---

<!-- Canonical -->
<link rel="canonical" href={canonicalURL} />

<!-- Primary Meta Tags -->
<title>{title} | mskosman.com</title>
<meta name="title" content={title} />
<meta name="description" content={description} />

<!-- Open Graph / Facebook -->
<meta property="og:type" content={ogType} />
<meta property="og:url" content={canonicalURL} />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content={new URL(ogImage, Astro.site)} />

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content={canonicalURL} />
<meta property="twitter:title" content={title} />
<meta property="twitter:description" content={description} />
<meta property="twitter:image" content={new URL(ogImage, Astro.site)} />
```

### SEO Validation
- [ ] No duplicate canonical URLs
- [ ] Query parameters don't create duplicate pages
- [ ] All public pages included in sitemap
- [ ] Meta tags present on all pages
- [ ] OG image defaults exist

---

## 4) Accessibility Baseline

### Skip to Content Link

**File**: `src/components/SkipToContent.astro`

```astro
<a href="#main-content" class="skip-to-content">
  Skip to main content
</a>

<style>
  .skip-to-content {
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--color-primary);
    color: white;
    padding: 8px 16px;
    text-decoration: none;
    z-index: 100;
  }
  
  .skip-to-content:focus {
    top: 0;
  }
</style>
```

Add to `MainLayout.astro` before header.

### Focus Styles

**File**: `src/styles/global.css`

```css
/* Strong focus indicator */
:focus-visible {
  outline: 3px solid var(--color-primary);
  outline-offset: 2px;
}

/* Remove default outline */
:focus:not(:focus-visible) {
  outline: none;
}

/* Interactive elements */
button:focus-visible,
a:focus-visible,
input:focus-visible,
select:focus-visible {
  outline: 3px solid var(--color-primary);
  outline-offset: 2px;
}
```

### Keyboard Navigation Support

**Requirements**:
- Subject/Grade toggle: `Tab` to focus, `Enter`/`Space` to activate
- Search: Fully keyboard accessible
- Theme switcher: `Tab` to focus, `Enter` to toggle
- All links: `Tab` navigable
- All buttons: `Tab` + `Enter`/`Space`

### ARIA Labels

Add where appropriate:
- Search input: `aria-label="Search lessons"`
- Theme toggle: `aria-label="Toggle theme"`
- Navigation: `<nav aria-label="Main navigation">`
- Lesson cards: `aria-label` with lesson title

### Accessibility Checklist
- [ ] Skip-to-content link functional
- [ ] All interactive elements keyboard accessible
- [ ] Focus visible on all focusable elements
- [ ] Color contrast meets WCAG AA (4.5:1 normal text, 3:1 large text)
- [ ] Images have alt text
- [ ] Forms have labels
- [ ] Headings in logical order (h1 → h2 → h3)

**Note**: Full WCAG audit in later stage. This establishes baseline only.

---

## 5) Error Handling

### Custom 404 Page

**File**: `src/pages/404.astro`

```astro
---
import MainLayout from '../layouts/MainLayout.astro';
---

<MainLayout title="Page Not Found">
  <main id="main-content">
    <div class="container py-16 text-center">
      <h1 class="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p class="text-xl mb-8">
        The page you're looking for doesn't exist.
      </p>
      <div class="space-x-4">
        <a href="/" class="btn btn-primary">Go Home</a>
        <a href="/lesson-plans" class="btn btn-secondary">Browse Lessons</a>
      </div>
    </div>
  </main>
</MainLayout>
```

### Error Page Fallback

**File**: `src/pages/error.astro`

```astro
---
import MainLayout from '../layouts/MainLayout.astro';
---

<MainLayout title="Error">
  <main id="main-content">
    <div class="container py-16 text-center">
      <h1 class="text-4xl font-bold mb-4">Something Went Wrong</h1>
      <p class="text-xl mb-8">
        We encountered an unexpected error. Please try again.
      </p>
      <a href="/" class="btn btn-primary">Go Home</a>
    </div>
  </main>
</MainLayout>
```

### Validation
- [ ] Navigate to non-existent route → 404 page displays
- [ ] 404 page includes navigation back to site
- [ ] No console errors on 404 page

---

## 6) Performance Baseline

### Optimization Checklist

**Images**:
- [ ] Use Astro `<Image>` component for optimization
- [ ] Provide width/height to prevent layout shift
- [ ] Use WebP format where possible
- [ ] Lazy load below-the-fold images

**JavaScript**:
- [ ] Minimize client-side hydration
- [ ] Use `client:load` only when necessary
- [ ] Prefer `client:idle` or `client:visible` for non-critical interactions
- [ ] Bundle size < 100KB for critical JS

**CSS**:
- [ ] Inline critical CSS
- [ ] Remove unused Tailwind classes (use `purge` config)
- [ ] Minimize global CSS

**Build**:
- [ ] Static site generation for all routes
- [ ] No server-side rendering (SSR) unless required

### Lighthouse Targets

Run Lighthouse audit on:
- `/` (homepage)
- `/lesson-plans`
- `/lessons/[sample-lesson]`

**Target Scores** (Desktop):
- **Performance**: ≥ 90
- **Accessibility**: ≥ 90
- **Best Practices**: ≥ 95
- **SEO**: ≥ 95

**Target Scores** (Mobile):
- **Performance**: ≥ 85
- **Accessibility**: ≥ 90
- **Best Practices**: ≥ 95
- **SEO**: ≥ 95

**Note**: Do NOT micro-optimize. Focus on low-hanging fruit.

---

## 7) Production Configuration

### Add README Section: "Deployment"

```markdown
## Deployment

### Recommended Hosting
- **Cloudflare Pages** (recommended)
- Netlify
- Vercel

### Build Settings
- Build command: `npm run build`
- Output directory: `dist`
- Node version: 18.x or higher

### Security Headers
Configure at hosting layer:

**Content-Security-Policy**:
```
default-src 'self';
script-src 'self' 'unsafe-inline';
style-src 'self' 'unsafe-inline';
img-src 'self' data: https:;
font-src 'self';
connect-src 'self';
frame-ancestors 'none';
```

**Other Headers**:
```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

### Environment Variables
None required (static site).

### DNS Configuration
- Point domain to hosting provider
- Enable HTTPS (automatic with Cloudflare/Netlify)
- Configure `www` redirect if needed
```

**Implementation Note**: Do NOT implement custom server logic in project. Headers configured at hosting layer only.

---

## Key Files to Create/Modify

### New Files
- `.github/workflows/ci.yml`
- `vitest.config.ts`
- `playwright.config.ts`
- `tests/utils.test.ts`
- `tests/e2e/navigation.spec.ts`
- `src/pages/sitemap.xml.ts`
- `src/pages/404.astro`
- `src/pages/error.astro`
- `src/components/Meta.astro`
- `src/components/SkipToContent.astro`
- `public/robots.txt`

### Modified Files
- `package.json` (add test scripts and dependencies)
- `src/styles/global.css` (add focus styles)
- `src/layouts/MainLayout.astro` (add Meta component, skip-to-content)
- `README.md` (add deployment section)

---

## Acceptance Criteria

### CI/CD
- [ ] GitHub Actions workflow file exists
- [ ] Workflow runs on push to main
- [ ] Workflow runs on PR to main
- [ ] All jobs pass (typecheck, lint, validate, test, build, E2E)
- [ ] Workflow badge in README

### Testing
- [ ] Unit tests exist and pass
- [ ] E2E tests exist and pass
- [ ] `npm run test` runs Vitest
- [ ] `npm run test:e2e` runs Playwright
- [ ] Test coverage ≥ 60% for utilities

### SEO
- [ ] Sitemap accessible at `/sitemap.xml`
- [ ] Robots.txt accessible at `/robots.txt`
- [ ] Canonical tags on all pages
- [ ] Meta tags on all pages
- [ ] No duplicate canonical URLs

### Accessibility
- [ ] Skip-to-content link functional
- [ ] Focus visible on all interactive elements
- [ ] Keyboard navigation works
- [ ] ARIA labels present where needed
- [ ] Color contrast meets WCAG AA

### Error Handling
- [ ] 404 page functional
- [ ] Error page exists
- [ ] Broken routes display 404
- [ ] No console errors on error pages

### Performance
- [ ] Lighthouse Performance ≥ 90 (desktop), ≥ 85 (mobile)
- [ ] Lighthouse Accessibility ≥ 90
- [ ] Lighthouse SEO ≥ 95
- [ ] Build time < 15 seconds
- [ ] JS bundle < 100KB

### Documentation
- [ ] Deployment instructions in README
- [ ] Security headers documented
- [ ] Build settings documented

### No Regressions
- [ ] All existing features work
- [ ] No visual changes
- [ ] Build succeeds
- [ ] CI passes

---

## Testing Requirements

### Pre-Deployment Checklist
1. Run `npm run check` → All checks pass
2. Run `npm run test` → All unit tests pass
3. Run `npm run test:e2e` → All E2E tests pass
4. Run Lighthouse audit → Scores meet targets
5. Test keyboard navigation manually
6. Test in multiple browsers (Chrome, Firefox, Safari, Edge)
7. Test on mobile device
8. Verify sitemap.xml renders correctly
9. Test 404 page by visiting invalid URL
10. Check CI workflow in GitHub Actions

---

## Browser Testing Matrix

### Desktop
- Chrome (latest) ✓
- Firefox (latest) ✓
- Safari (latest) ✓
- Edge (latest) ✓

### Mobile
- iOS Safari (latest)
- Android Chrome (latest)

---

## Rollback Plan

If stage fails:
1. Create git branch: `stage-3-launch-hardening`
2. Commit progress incrementally
3. If blocking issue: revert to previous stable commit
4. Review error logs in CI workflow
5. Fix issues locally before pushing again

---

## Known Future Work

- Full WCAG audit (Stage 4+)
- Advanced performance optimization (Stage 4+)
- Analytics integration (future)
- CDN optimization (future)
- Progressive Web App features (future)
