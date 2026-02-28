# Stage 3.1: Navigation and Landing Page Refactor

## Status
- **Status**: Completed
- **Estimated Time**: 4-6 hours
- **Prerequisites**: Stage 3 completed
- **Next Stage**: Stage 3.2

---

## Objective

Improve navigation clarity and establish proper brand positioning through:
- Refactored global header navigation
- New purpose-driven landing page
- Relocated lesson browsing to dedicated route
- Updated footer with attribution

This is a **structural UX update only**.

---

## Constraints

**DO NOT**:
- Change lesson schema
- Modify filtering logic
- Alter SOL validation logic
- Change build configuration
- Modify CI/CD workflow
- Introduce new design system

**FOCUS ON**:
- Navigation clarity
- Information architecture
- Brand positioning

---

## 1) Global Header Refactor

### Current State
Header has "Home", "Subjects", "Grades", and view toggle mixed with logo and theme controls.

### New Structure

**Layout**: Three-column horizontal layout

#### Left Section
- Logo text: **"mskosman.com"**
- Clicking logo routes to `/`
- Font: Bold, slightly larger than nav items

#### Center Section (Main Navigation)
Primary navigation links:
- **Lesson Plans** → `/lesson-plans`
- **Standards** → `/standards`
- **About** → `/about`
- **Contact** → `/contact`

#### Right Section
- **Theme dropdown** (Light/Dark/High Contrast if implemented)

### Removals
- "Home" link (logo serves this purpose)
- "Subjects" link (moved to lesson-plans page)
- "Grades" link (moved to lesson-plans page)
- "View by" toggle from global header (moved to lesson-plans page)

### Implementation

**File**: `src/components/Header.astro`

```astro
---
const currentPath = Astro.url.pathname;
---

<header class="site-header">
  <div class="container">
    <nav aria-label="Main navigation" class="nav-wrapper">
      <!-- Left: Logo -->
      <div class="nav-left">
        <a href="/" class="logo">mskosman.com</a>
      </div>
      
      <!-- Center: Main Navigation -->
      <div class="nav-center">
        <a href="/lesson-plans" class={currentPath.startsWith('/lesson-plans') ? 'active' : ''}>
          Lesson Plans
        </a>
        <a href="/standards" class={currentPath === '/standards' ? 'active' : ''}>
          Standards
        </a>
        <a href="/about" class={currentPath === '/about' ? 'active' : ''}>
          About
        </a>
        <a href="/contact" class={currentPath === '/contact' ? 'active' : ''}>
          Contact
        </a>
      </div>
      
      <!-- Right: Theme Switcher -->
      <div class="nav-right">
        <ThemeSwitcher />
      </div>
    </nav>
  </div>
</header>

<style>
  .nav-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
  }
  
  .logo {
    font-weight: 700;
    font-size: 1.25rem;
    color: var(--color-text);
    text-decoration: none;
  }
  
  .nav-center {
    display: flex;
    gap: 2rem;
  }
  
  .nav-center a {
    color: var(--color-text);
    text-decoration: none;
    font-weight: 500;
  }
  
  .nav-center a:hover {
    color: var(--color-primary);
  }
  
  .nav-center a.active {
    color: var(--color-primary);
    border-bottom: 2px solid var(--color-primary);
  }
  
  /* Responsive: Stack on mobile */
  @media (max-width: 768px) {
    .nav-wrapper {
      flex-direction: column;
      gap: 1rem;
    }
    
    .nav-center {
      flex-wrap: wrap;
      gap: 1rem;
    }
  }
</style>
```

### Responsive Behavior
- **Desktop**: Horizontal three-column layout
- **Tablet**: May compress, maintain horizontal flow
- **Mobile**: Stack vertically or hamburger menu (choose one approach)

### Validation
- [ ] Logo routes to `/`
- [ ] All nav links functional
- [ ] Active state highlights current page
- [ ] Theme switcher accessible
- [ ] Keyboard navigable
- [ ] No layout shift between pages

---

## 2) Move Current Landing Body to /lesson-plans

### Current State
Homepage (`/`) contains:
- Search bar
- "Browse by Subject" section
- "Browse by Grade" section
- Filtering logic

### Action Required

**Move** entire body content from `src/pages/index.astro` to `src/pages/lesson-plans.astro`.

### Implementation Steps

1. **Copy** search, filters, and lesson list from `index.astro`
2. **Paste** into `lesson-plans.astro`
3. **Verify** all functionality intact:
   - Search works
   - Subject filters work
   - Grade filters work
   - Lesson cards render
   - URLs update with query params

4. **Test Routes**:
   - `/lesson-plans?subject=mathematics`
   - `/lesson-plans?grade=4`
   - `/lesson-plans?subject=science&grade=5`

### Files Modified
- `src/pages/lesson-plans.astro` (receives content)
- `src/pages/index.astro` (will be replaced with new landing page)

### Validation
- [ ] `/lesson-plans` renders all lessons
- [ ] Search functional
- [ ] Filters functional
- [ ] Query parameters work correctly
- [ ] No broken links from other pages

---

## 3) Create New Homepage (/)

### Objective
Build a **purpose-driven landing page** that clearly communicates:
- What the site offers
- Who it's for
- How to get started

### Structure

#### Hero Section
**Headline**:
```
Standards-Aligned Lesson Plans for Virginia Students
```

**Subheadline**:
```
Structured, teacher-designed lessons aligned to the Virginia Standards of Learning (SOL), 
created to support homeschool families, tutors, and supplemental instruction.
```

**Primary CTA**:
Button: "Browse Lesson Plans" → `/lesson-plans`

**Secondary CTA**:
Link: "Explore Standards" → `/standards`

---

#### Section: About the Approach

**Heading**: "Built for Virginia Educators"

**Content** (bullet points or cards):
- ✓ **Aligned to Virginia SOL** - Every lesson maps to specific Standards of Learning
- ✓ **15–20 Minute Sessions** - Focused, manageable lesson blocks
- ✓ **Structured Instruction** - Clear objectives, guided practice, and assessment
- ✓ **Independently Developed** - Created by a Virginia educator for educators

---

#### Section: Who This Is For

**Heading**: "Designed For"

**Content** (4-column grid or list):
- **Homeschool Families** - Seeking Virginia SOL alignment
- **Tutors** - Reinforcing classroom instruction
- **Parents** - Supplementing grade-level learning
- **Students** - Preparing for assessments

---

#### Closing CTA

**Text**: "Ready to get started?"

**Button**: "Browse Lesson Plans" → `/lesson-plans`

---

### Implementation

**File**: `src/pages/index.astro`

```astro
---
import MainLayout from '../layouts/MainLayout.astro';
---

<MainLayout 
  title="Standards-Aligned Lesson Plans for Virginia Students"
  description="Structured, teacher-designed lessons aligned to Virginia SOL for homeschool families, tutors, and educators."
>
  <main id="main-content">
    <!-- Hero Section -->
    <section class="hero">
      <div class="container text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">
          Standards-Aligned Lesson Plans for Virginia Students
        </h1>
        <p class="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          Structured, teacher-designed lessons aligned to the Virginia Standards of Learning (SOL), 
          created to support homeschool families, tutors, and supplemental instruction.
        </p>
        <div class="cta-buttons">
          <a href="/lesson-plans" class="btn btn-primary btn-lg">
            Browse Lesson Plans
          </a>
          <a href="/standards" class="btn btn-secondary btn-lg">
            Explore Standards
          </a>
        </div>
      </div>
    </section>

    <!-- About the Approach -->
    <section class="py-16 bg-surface">
      <div class="container">
        <h2 class="text-3xl font-bold text-center mb-12">
          Built for Virginia Educators
        </h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="feature-card">
            <h3 class="font-bold mb-2">Aligned to Virginia SOL</h3>
            <p>Every lesson maps to specific Standards of Learning</p>
          </div>
          <div class="feature-card">
            <h3 class="font-bold mb-2">15–20 Minute Sessions</h3>
            <p>Focused, manageable lesson blocks</p>
          </div>
          <div class="feature-card">
            <h3 class="font-bold mb-2">Structured Instruction</h3>
            <p>Clear objectives, guided practice, and assessment</p>
          </div>
          <div class="feature-card">
            <h3 class="font-bold mb-2">Independently Developed</h3>
            <p>Created by a Virginia educator for educators</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Who This Is For -->
    <section class="py-16">
      <div class="container">
        <h2 class="text-3xl font-bold text-center mb-12">
          Designed For
        </h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="audience-card">
            <h3 class="font-bold mb-2">Homeschool Families</h3>
            <p>Seeking Virginia SOL alignment</p>
          </div>
          <div class="audience-card">
            <h3 class="font-bold mb-2">Tutors</h3>
            <p>Reinforcing classroom instruction</p>
          </div>
          <div class="audience-card">
            <h3 class="font-bold mb-2">Parents</h3>
            <p>Supplementing grade-level learning</p>
          </div>
          <div class="audience-card">
            <h3 class="font-bold mb-2">Students</h3>
            <p>Preparing for assessments</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Closing CTA -->
    <section class="py-16 bg-surface text-center">
      <div class="container">
        <h2 class="text-3xl font-bold mb-4">Ready to get started?</h2>
        <a href="/lesson-plans" class="btn btn-primary btn-lg">
          Browse Lesson Plans
        </a>
      </div>
    </section>
  </main>
</MainLayout>

<style>
  .hero {
    padding: 4rem 0;
  }
  
  .cta-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .feature-card,
  .audience-card {
    padding: 1.5rem;
    border: 1px solid var(--color-border);
    border-radius: 0.5rem;
  }
</style>
```

### Design Notes
- **Clean and professional**: No gradients, no playful styling
- **Accessible**: High contrast, keyboard navigable
- **Responsive**: Stack cards on mobile
- **No new design system**: Use existing Tailwind classes and CSS variables

### Validation
- [ ] Hero displays correctly
- [ ] CTAs route correctly
- [ ] Sections render in order
- [ ] Responsive on mobile/tablet/desktop
- [ ] No console errors

---

## 4) Footer Refactor

### Current State
Footer may be minimal or generic.

### New Structure

**Layout**: Two-line footer

#### Line 1 (Horizontal Layout)
- **Left**: "Built and maintained by Ken Tannenbaum"
- **Right**: "© 2026 Finnoybu IP LLC. All rights reserved."

#### Line 2 (Centered, Small Text)
"This site is independently developed and is not affiliated with or endorsed by the Virginia Department of Education or any school district."

### Implementation

**File**: `src/components/Footer.astro`

```astro
<footer class="site-footer">
  <div class="container">
    <div class="footer-main">
      <div class="footer-left">
        Built and maintained by Ken Tannenbaum
      </div>
      <div class="footer-right">
        © 2026 Finnoybu IP LLC. All rights reserved.
      </div>
    </div>
    <div class="footer-disclaimer">
      This site is independently developed and is not affiliated with or endorsed by 
      the Virginia Department of Education or any school district.
    </div>
  </div>
</footer>

<style>
  .site-footer {
    margin-top: 4rem;
    padding: 2rem 0;
    border-top: 1px solid var(--color-border);
    font-size: 0.875rem;
  }
  
  .footer-main {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
  
  .footer-disclaimer {
    text-align: center;
    font-size: 0.75rem;
    color: var(--color-text-secondary);
    max-width: 800px;
    margin: 0 auto;
  }
  
  @media (max-width: 768px) {
    .footer-main {
      flex-direction: column;
      gap: 0.5rem;
      text-align: center;
    }
  }
</style>
```

### Validation
- [ ] Attribution displays correctly
- [ ] Copyright notice displays
- [ ] Disclaimer centered and readable
- [ ] Responsive on mobile

---

## 5) Standards Placeholder Page

### Current State
May not exist or may be minimal.

### Implementation

**File**: `src/pages/standards.astro`

```astro
---
import MainLayout from '../layouts/MainLayout.astro';
---

<MainLayout 
  title="Virginia Standards of Learning"
  description="Browse lesson plans organized by Virginia SOL standards."
>
  <main id="main-content" class="container py-16">
    <h1 class="text-4xl font-bold mb-8">Virginia Standards of Learning</h1>
    
    <div class="prose max-w-3xl">
      <p class="text-xl mb-6">
        All lesson plans on this site are aligned to the Virginia Standards of Learning (SOL).
      </p>
      
      <p class="mb-6">
        You can browse lessons by <a href="/subjects">subject</a> or 
        <a href="/grades">grade level</a>, with each lesson including specific SOL codes 
        and links to official Virginia Department of Education resources.
      </p>
      
      <h2 class="text-2xl font-bold mb-4">Official Resources</h2>
      <ul class="mb-6">
        <li>
          <a href="https://www.doe.virginia.gov/teaching-learning-assessment/k-12-standards-instruction" 
             target="_blank" rel="noopener noreferrer">
            Virginia Department of Education - Standards & Instruction
          </a>
        </li>
      </ul>
      
      <p class="text-sm text-secondary">
        <strong>Note:</strong> This site is independently developed and is not affiliated 
        with or endorsed by the Virginia Department of Education.
      </p>
    </div>
  </main>
</MainLayout>
```

### Future Enhancement
- Standards-based navigation (e.g., browse by strand)
- Filterable standards list
- Cross-reference between standards and lessons

### Validation
- [ ] Page renders correctly
- [ ] Links functional
- [ ] Responsive layout

---

## 6) Routing Integrity Validation

### Critical Routes to Test

#### Primary Routes
- `/` → New landing page
- `/lesson-plans` → Relocated lesson browser
- `/subjects` → Subject index (unchanged)
- `/grades` → Grade index (unchanged)
- `/standards` → Placeholder page
- `/about` → Existing page
- `/contact` → Existing page

#### Dynamic Routes
- `/subjects/[subjectSlug]` → Subject detail (unchanged)
- `/grades/[gradeSlug]` → Grade detail (unchanged)
- `/lessons/[lessonSlug]` → Lesson page (unchanged)

#### Query Parameters
- `/lesson-plans?subject=mathematics`
- `/lesson-plans?grade=4`
- `/lesson-plans?subject=science&grade=5`

### SEO Validation
- [ ] Canonical tags still correct
- [ ] Sitemap updated (if `/lesson-plans` route new)
- [ ] No broken internal links
- [ ] Meta tags appropriate for new pages

### Build Validation
- [ ] `npm run build` succeeds
- [ ] No 404 errors during build
- [ ] All dynamic routes generate correctly

---

## Key Files to Create/Modify

### New Files
- `src/pages/standards.astro` (placeholder)

### Modified Files
- `src/components/Header.astro` (refactored navigation)
- `src/components/Footer.astro` (updated attribution)
- `src/pages/index.astro` (new landing page)
- `src/pages/lesson-plans.astro` (receives old index body)

### Unchanged Files
- `src/pages/subjects.astro`
- `src/pages/subjects/[subjectSlug].astro`
- `src/pages/grades.astro`
- `src/pages/grades/[gradeSlug].astro`
- `src/pages/lessons/[lessonSlug].astro`

---

## Acceptance Criteria

### Navigation
- [ ] Header displays logo, 4 nav links, theme switcher
- [ ] Logo routes to `/`
- [ ] Nav links functional and show active state
- [ ] No "View by" toggle in header (moved to lesson-plans page)
- [ ] Keyboard accessible

### Landing Page
- [ ] Hero section displays
- [ ] Both CTAs functional
- [ ] "About the Approach" section renders
- [ ] "Who This Is For" section renders
- [ ] Closing CTA functional
- [ ] Responsive on all breakpoints

### Lesson Plans Page
- [ ] All content from old homepage present
- [ ] Search functional
- [ ] Filters functional
- [ ] Query params work
- [ ] No regressions in functionality

### Footer
- [ ] Attribution displays correctly
- [ ] Copyright notice displays
- [ ] Disclaimer centered and readable
- [ ] Responsive layout

### Standards Page
- [ ] Page renders
- [ ] Links functional
- [ ] Disclaimer present

### Routing
- [ ] All routes functional
- [ ] No 404 errors
- [ ] Internal links work
- [ ] Query parameters preserved

### SEO
- [ ] Canonical tags correct
- [ ] Meta tags appropriate
- [ ] Sitemap updated
- [ ] No duplicate content issues

### Build
- [ ] `npm run build` succeeds
- [ ] CI passes
- [ ] No console errors
- [ ] No layout shift

---

## Testing Requirements

### Manual Testing
1. Click all header navigation links
2. Click logo from various pages
3. Test both CTAs on landing page
4. Test search on lesson-plans page
5. Test filters on lesson-plans page
6. Verify footer on multiple pages
7. Test responsive behavior at 3 breakpoints
8. Test keyboard navigation through header

### Visual QA
- Desktop (1920x1080)
- Tablet (768x1024)
- Mobile (375x667)

### Browser Testing
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## Rollback Plan

If navigation refactor causes issues:
1. Git branch: `stage-3.1-navigation-refactor`
2. Commit each component change separately:
   - Header refactor
   - Landing page creation
   - Lesson-plans page move
   - Footer update
   - Standards placeholder
3. If blocking issue: `git revert` specific commit
4. Test each change independently before merging

### Backup Strategy
Before starting:
```bash
git checkout -b stage-3.1-navigation-refactor
git tag pre-stage-3.1
```

If complete rollback needed:
```bash
git reset --hard pre-stage-3.1
```

---

## Known Future Work

- Hamburger menu for mobile (if not implemented)
- Breadcrumb navigation (Stage 4+)
- Strand-based standards navigation (Stage 4+)
- Related lessons cross-linking (Stage 4+)
