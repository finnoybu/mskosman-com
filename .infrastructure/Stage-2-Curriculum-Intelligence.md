Implement Stage 2: Curriculum Intelligence & SOL Structure (Virginia only).

Do NOT introduce visual redesign.
Do NOT add playful styling.
Do NOT scrape or parse PDFs.
Keep site static-first.
Maintain current routes.

This stage strengthens curriculum structure and lesson integrity.

---

## 1) Expand Standards Collection

Location:
src/content/standards/

Schema (Zod):

- subject: enum (same as lessons)
- grade: enum ("k","1"...,"12")
- strand: string (optional but supported)
- solCodes: string[] (optional)
- solDocLinks: { label: string, url: string }[]
- instructionalResources: { label: string, url: string }[] (optional)
- notes: string (optional)
- updatedAt: date

Strand support must exist in schema even if initially unused in UI.

---

## 2) Seed Standards Example

Create one structured example:

Mathematics – Grade 4
Include:

- solDocLinks:
  - "Virginia Mathematics SOL – All Grades"
  - "Virginia Mathematics SOL – Grade 4"

- instructionalResources:
  - label: "VDOE Instructional Resource: Mystery Numbers (Grade 4, 4.1ab)"
  - url: https://www.doe.virginia.gov/home/showpublisheddocument/16944/638037635399270000

Optionally include example strand entries like:
- "Number & Number Sense"
- "Computation & Estimation"

Do NOT hardcode SOL content. Only store metadata.

---

## 3) Strengthen Lesson Schema

Enhance lessons collection schema:

Add:
- status: enum("draft","published")

Strengthen validation:

- durationMinutes must be 10–25
- solCodes must match:
  ^[Kk]\\.[0-9]+[a-z]*$ OR ^[0-9]{1,2}\\.[0-9]+[a-z]*$

If status == "published":
  - solCodes.length >= 1
  - objective must be non-empty
  - materials.length >= 1
  - MDX body must include headings:
    - Warm-up
    - Direct Instruction
    - Guided Practice
    - Independent Practice

Draft lessons may bypass strict enforcement.

---

## 4) Lesson → Standards Integration

On lesson pages:

Add a "Standards & Resources" section that merges:

- lesson.frontmatter.standardsLinks
- matching standards collection entries (subject + grade)

If both exist, display combined list without duplicates.

Add disclaimer text:
"This lesson supplements Virginia SOL resources. Verify the latest standards via the Virginia Department of Education."

---

## 5) Subject & Grade Page Enhancements

If a standards entry exists for subject+grade:

Display:

- SOL document links
- Instructional resources
- Small neutral disclaimer

No visual redesign.

---

## 6) Authoring Template

Create:

src/content/_templates/lesson-template.mdx

Include:

- Required frontmatter
- Required section headings
- Comments explaining publication rules
- status: draft by default

Document workflow in README.

---

## 7) Add QA Script

Add npm script:

"check"

It should:

- Run typecheck
- Run eslint
- Run custom validation script:
  - Fail if any published lesson violates rules

The validation script may parse MDX frontmatter + body headings.

Keep it simple and deterministic.

---

## 8) Acceptance Criteria

- npm run build passes
- npm run check fails appropriately when rules violated
- Existing lesson pages still render
- No styling changes introduced
- Structure supports future strand navigation

Keep implementation clean and minimal.