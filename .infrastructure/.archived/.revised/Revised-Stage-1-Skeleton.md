# Stage 1: Working Skeleton (Astro + MDX + Tailwind)

## Status
- **Status**: Completed
- **Estimated Time**: 8-12 hours
- **Prerequisites**: None (initial stage)
- **Next Stage**: Stage 2

---

## Objective
Generate a production-quality skeleton for mskosman.com.
Purpose: homeschool + tutoring + extracurricular lesson plans aligned to Virginia DOE K-12 Standards of Learning (SOL).

---

## Requirements
- Users browse lesson plans by Subject and by Grade
- Toggle in main nav switches between Subject view and Grade view
- Lesson plans are ~15–20 minutes and structured consistently
- Content stored as MDX with strict schema validation
- Static-first architecture

---

## Tech Stack (Mandatory)
- **Astro** + TypeScript
- **TailwindCSS** for styling
- **Astro Content Collections** + Zod for schema validation
- **MDX** for lesson content
- No backend (static only)

---

## Information Architecture

### Routes
- `/` - Homepage
- `/subjects` - Browse by subject index
- `/subjects/[subjectSlug]` - Subject detail page
- `/grades` - Browse by grade index
- `/grades/[gradeSlug]` - Grade detail page
- `/lessons/[lessonSlug]` - Individual lesson page

---

## Content Collection: lessons

### Location
`src/content/lessons/`

### Frontmatter Schema (Zod)
```typescript
{
  title: string;
  subject: enum; // See subjects list below
  grade: enum; // "k", "1", "2", ..., "12"
  durationMinutes: number; // default: 15
  solCodes: string[]; // e.g., ["K.1", "K.2a"]
  objective: string;
  materials: string[];
  prerequisites: string[];
  standardsLinks: { label: string; url: string }[];
  tags: string[];
  updatedAt: date;
}
```

### Required MDX Body Sections
Each lesson must include these headings:
- **Warm-up**
- **Direct Instruction**
- **Guided Practice**
- **Independent Practice / Quick Check**
- **Differentiation**
- **Extensions**
- **Notes for Parent/Instructor**

### Placeholder Lesson Requirements
For initial scaffold, create minimal placeholder lessons:
- One lesson per Subject × Grade combination (13 subjects × 13 grades = 169 lessons)
- Minimal frontmatter: title, subject, grade, durationMinutes (15), solCodes (empty array OK for scaffold)
- objective: "Placeholder – to be developed"
- Empty or minimal content for each section
- File naming: `{subject-slug}-{grade}.mdx` (e.g., `computer-science-k.mdx`)

---

## Subjects (Initialize Constants)

Location: `src/lib/constants.ts`

Subjects list:
1. Computer Science
2. Digital Learning Integration
3. Driver Education
4. Economics & Personal Finance
5. English
6. Family Life Education
7. Fine Arts
8. Health Education
9. History and Social Science
10. Mathematics
11. Physical Education
12. Science
13. World Language

---

## Key Files to Create/Modify

### Project Structure
```
src/
  lib/
    constants.ts          # Subjects, grades enums
    utils.ts              # Slug generation, filtering helpers
  content/
    config.ts             # Content collection schemas
    lessons/              # 169 placeholder MDX files
  layouts/
    BaseLayout.astro      # HTML wrapper
    MainLayout.astro      # Header, footer, content area
  pages/
    index.astro
    subjects.astro
    subjects/[subjectSlug].astro
    grades.astro
    grades/[gradeSlug].astro
    lessons/[lessonSlug].astro
  components/
    Header.astro          # Nav with subject/grade toggle
    Footer.astro
    SearchBar.astro       # Client-side search
    LessonCard.astro      # Display lesson preview
    ThemeSwitcher.astro   # Light/Dark mode toggle
  styles/
    global.css
    theme.css             # CSS custom properties
```

### Configuration Files
- `astro.config.mjs` - Basic Astro config with MDX support
- `tailwind.config.mjs` - Theme colors, custom properties
- `tsconfig.json` - Strict TypeScript config
- `package.json` - Scripts: dev, build, preview

---

## Theme System

### Requirements
- Support for Light and Dark modes (High Contrast added in Stage 3.2)
- Use CSS custom properties defined in `theme.css`
- Persist user selection in localStorage
- Default to system preference on first visit
- No layout shift when switching themes

### Color Variables (Initial)
Define in `theme.css`:
```css
[data-theme="light"] {
  --color-bg: #ffffff;
  --color-text: #1a1a1a;
  --color-primary: #0066cc;
  /* ... */
}

[data-theme="dark"] {
  --color-bg: #1a1a1a;
  --color-text: #f5f5f5;
  --color-primary: #3399ff;
  /* ... */
}
```

---

## Search Implementation

### Type
Client-side only (no backend)

### Approach
- Search across lesson titles, objectives, tags, and subject names
- Case-insensitive
- Filter results dynamically
- No external search service required

### Implementation Notes
- Create search index from content collection
- Use simple string matching (no fuzzy search required at this stage)
- Display results as LessonCard components

---

## Acceptance Criteria

### Build & Type Safety
- [ ] `npm run dev` starts dev server without errors
- [ ] `npm run build` completes successfully
- [ ] `npm run preview` serves built site
- [ ] No TypeScript errors
- [ ] All 169 placeholder lessons generated

### Navigation
- [ ] All routes accessible and render without 404
- [ ] Subject/Grade toggle functions correctly
- [ ] Navigation between pages works smoothly

### Content Validation
- [ ] Zod schema validates lesson frontmatter
- [ ] Invalid frontmatter fails build with clear error message
- [ ] All MDX files parse correctly

### Theme System
- [ ] Light/Dark toggle works
- [ ] Theme preference persists across page loads
- [ ] No flash of unstyled content (FOUC)
- [ ] Theme applies to all pages

### Search
- [ ] Search bar renders on homepage
- [ ] Typing filters lesson list in real-time
- [ ] Search includes titles, objectives, tags
- [ ] Clearing search shows all lessons

### Responsive Design
- [ ] Mobile layout functional (320px width)
- [ ] Tablet layout functional (768px width)
- [ ] Desktop layout functional (1024px+ width)

---

## README Documentation

Include in project README:
- Project overview and purpose
- Tech stack
- Local development setup
  - Node version requirement (specify version)
  - `npm install`
  - `npm run dev`
- Build commands
- Project structure overview
- Content authoring guidelines (basic)

---

## Testing Requirements

### Manual Testing Checklist
- [ ] Visit each route type (home, subjects, grades, lesson)
- [ ] Test subject/grade toggle
- [ ] Test search with various queries
- [ ] Test theme switching
- [ ] Test responsive breakpoints
- [ ] Verify placeholder lessons render

### Browser Testing
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## Notes & Constraints

- **No authentication**: Site is fully public
- **No backend**: All processing happens at build time or client-side
- **Static-first**: Optimize for static site generation
- **Single contributor**: Simple workflow, no complex branching needed
- **Content is placeholder**: Real lesson content developed in later stages

---

## Known Limitations (To Address in Future Stages)

- No SOL validation logic yet (Stage 2)
- No standards collection yet (Stage 2)
- No status field (draft/published) (Stage 2)
- No CI/CD pipeline (Stage 3)
- No automated tests (Stage 3)
- No SEO optimization (Stage 3)
- No accessibility audit (Stage 3)

---

## Rollback Plan

If stage fails:
1. Ensure all code is in version control (Git)
2. Tag completion of previous stage if applicable
3. Use `git reset --hard` to previous stable commit
4. Review requirements and adjust approach before retry
