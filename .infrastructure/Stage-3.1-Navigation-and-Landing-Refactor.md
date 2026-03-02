Implement Stage 3.1: Navigation and Landing Page Refactor.

This is a structural UX update only.
Do NOT change lesson schema.
Do NOT change filtering logic.
Do NOT change SOL logic.
Do NOT change build configuration.
Do NOT change CI.

Focus on navigation clarity and brand positioning.

---

## 1) Global Header Refactor

Replace current header layout.

New structure:

Left:
- Logo text: "mskosman.com"
- Clicking logo routes to "/"

Center navigation:
- Lesson Plans → "/lesson-plans"
- Standards → "/standards" (placeholder page if needed)
- About → "/about"
- Contact → "/contact"

Right:
- Theme toggle (Light/Dark/HighContrast if implemented)

Remove:
- "Home" link
- "Subjects" link
- "Grades" link
- "View by" toggle from global header

Ensure header is horizontally aligned and responsive.

---

## 2) Move Current Landing Body

The existing homepage body (search, browse by subject, browse by grade)
should be moved to:

"/lesson-plans"

Ensure:
- Existing filtering logic remains intact.
- Existing routes still function.
- "/lesson-plans" becomes the master lesson index page.

---

## 3) Create New Homepage ("/")

Build a proper landing page.

Structure:

### Hero
Headline:
"Standards-Aligned Lesson Plans for Virginia Students"

Subtext:
Structured, teacher-designed lessons aligned to the Virginia Standards of Learning (SOL), created to support homeschool families, tutors, and supplemental instruction.

Primary CTA:
Browse Lesson Plans → "/lesson-plans"

Secondary CTA:
Explore Standards → "/standards"

---

### Section: About the Approach

Bullet points:
- Aligned to the Virginia Standards of Learning (SOL)
- Designed for focused 15–20 minute sessions
- Structured with clear objectives, guided instruction, and assessment
- Developed independently by a Virginia educator

---

### Section: Who This Is For

Short list:
- Homeschool families seeking SOL alignment
- Tutors reinforcing classroom instruction
- Parents supplementing grade-level learning
- Students preparing for assessments

---

### Closing CTA
Browse Lesson Plans

Keep design clean and professional.
No playful styling.
No gradients.
No new design system work.

---

## 4) Footer Structure

Refactor footer to:

Left:
"Built and maintained by Ken Tannenbaum"

Right:
"© 2026 Finnoybu IP LLC. All rights reserved."

Below (small text):
"This site is independently developed and is not affiliated with or endorsed by the Virginia Department of Education or any school district."

Ensure layout is responsive and accessible.

---

## 5) Standards Placeholder Page

Create basic "/standards" route if not existing.

For now:
- Simple intro explaining that standards-aligned navigation is available.
- Link to subject-based standards once implemented.

Keep minimal.

---

## 6) Routing Integrity

Ensure:

- "/" renders new landing page.
- "/lesson-plans" renders old homepage body.
- No broken links.
- No SEO regression (canonical still correct).
- No build errors.

---

## Acceptance Criteria

- npm run build passes.
- CI passes.
- Header navigation clean.
- Footer attribution correct.
- Landing page feels intentional.
- Lesson Plans page remains fully functional.