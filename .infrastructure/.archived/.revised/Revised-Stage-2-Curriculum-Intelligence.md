# Stage 2: Curriculum Intelligence & SOL Structure

## Status
- **Status**: Completed
- **Estimated Time**: 6-8 hours
- **Prerequisites**: Stage 1 completed
- **Next Stage**: Stage 3

---

## Objective

Strengthen curriculum structure and lesson integrity by introducing:
- Standards collection for Virginia SOL metadata
- Enhanced lesson validation rules
- Lesson status (draft/published) workflow
- Integration between lessons and standards resources

---

## Constraints

**DO NOT**:
- Introduce visual redesign
- Add playful or decorative styling
- Scrape or parse PDF documents
- Change static-first architecture
- Modify existing routes

**FOCUS ON**:
- Data structure and validation
- Curriculum integrity
- Authoring workflow

---

## 1) Expand Standards Collection

### Location
`src/content/standards/`

### Schema (Zod)
```typescript
{
  subject: enum;           // Same enum as lessons
  grade: enum;             // "k", "1", "2", ..., "12"
  strand: string;          // Optional but must be supported in schema
  solCodes: string[];      // Optional
  solDocLinks: {
    label: string;
    url: string;
  }[];
  instructionalResources: {
    label: string;
    url: string;
  }[];                     // Optional
  notes: string;           // Optional
  updatedAt: date;
}
```

### Implementation Notes
- Add schema definition to `src/content/config.ts`
- Strand support must exist in schema even if not displayed in UI initially
- Collection may be empty initially; schema must be defined

---

## 2) Seed Standards Example

### Create Example File
`src/content/standards/mathematics-4.mdx`

**Content**:
```yaml
---
subject: mathematics
grade: "4"
solDocLinks:
  - label: "Virginia Mathematics SOL – All Grades"
    url: "https://www.doe.virginia.gov/teaching-learning-assessment/k-12-standards-instruction/mathematics"
  - label: "Virginia Mathematics SOL – Grade 4"
    url: "https://www.doe.virginia.gov/teaching-learning-assessment/k-12-standards-instruction/mathematics"
instructionalResources:
  - label: "VDOE Instructional Resource: Mystery Numbers (Grade 4, 4.1ab)"
    url: "https://www.doe.virginia.gov/home/showpublisheddocument/16944/638037635399270000"
updatedAt: 2026-02-28
---

# Mathematics Standards - Grade 4

This standards entry provides Virginia DOE resource links for Grade 4 Mathematics.
```

### Optional Strand Example
If adding strand data:
```yaml
strand: "Number & Number Sense"
solCodes: ["4.1a", "4.1b"]
```

**Important**: Do NOT hardcode full SOL text content. Only store metadata and links.

---

## 3) Strengthen Lesson Schema

### Location
`src/content/config.ts`

### Add New Field
```typescript
status: z.enum(["draft", "published"]).default("draft")
```

### Enhance Validation Rules

#### Duration Validation
```typescript
durationMinutes: z.number().min(10).max(25).default(15)
```

#### SOL Code Format Validation
```typescript
solCodes: z.array(
  z.string().regex(
    /^[Kk]\.\d+[a-z]*$|^\d{1,2}\.\d+[a-z]*$/,
    "SOL code must match format: K.1, K.1a, 4.2, 4.2b, 12.3c, etc."
  )
)
```

#### Published Lesson Requirements

When `status === "published"`, enforce:
- `solCodes.length >= 1` - At least one SOL code
- `objective` - Must be non-empty string
- `materials.length >= 1` - At least one material listed
- MDX body must include these headings:
  - `## Warm-up`
  - `## Direct Instruction`
  - `## Guided Practice`
  - `## Independent Practice`

#### Draft Lessons
- May bypass strict enforcement
- Allow empty or incomplete fields
- Will NOT appear in production build (filter in data fetching)

### Implementation Approach
Create custom Zod refinement:
```typescript
.refine((data) => {
  if (data.status === "published") {
    return data.solCodes.length >= 1
      && data.objective.trim().length > 0
      && data.materials.length >= 1;
  }
  return true;
}, {
  message: "Published lessons must have solCodes, objective, and materials"
})
```

### Validation Failure Handling
- Build MUST fail if published lesson violates rules
- Display clear error message with file path and specific violation
- Draft lessons that violate rules: log warning but allow build

---

## 4) Lesson → Standards Integration

### Implementation Location
`src/pages/lessons/[lessonSlug].astro`

### Add Section: "Standards & Resources"

Display merged data from:
1. `lesson.data.standardsLinks` (from lesson frontmatter)
2. Matching standards collection entry (`subject` + `grade` match)

#### Merge Logic
- Combine both sources
- Remove duplicate URLs
- Sort by label alphabetically

#### Display Format
```markdown
## Standards & Resources

### Virginia SOL Documents
- [Link label](url)
- [Link label](url)

### Instructional Resources
- [Link label](url)

### Additional Resources
- [Lesson-specific link](url)
```

#### Disclaimer Text
Add at bottom of section:
> **Note**: This lesson supplements Virginia SOL resources. Verify the latest standards and curriculum frameworks via the [Virginia Department of Education](https://www.doe.virginia.gov/).

### Edge Cases
- If no standards entry exists: Show only lesson.standardsLinks
- If lesson.standardsLinks is empty: Show only standards collection data
- If both empty: Hide section entirely

---

## 5) Subject & Grade Page Enhancements

### Implementation Location
- `src/pages/subjects/[subjectSlug].astro`
- `src/pages/grades/[gradeSlug].astro`

### Enhancement
If standards entry exists for current `subject + grade` combination:

Display card or section:
```markdown
## Virginia SOL Resources

[Virginia Mathematics SOL – Grade 4](url)
[VDOE Instructional Resources](url)

*This page supplements official Virginia SOL resources.*
```

### Styling Note
No visual redesign. Use existing card or info-box styling.

---

## 6) Authoring Template

### Create File
`src/content/_templates/lesson-template.mdx`

### Content
````markdown
---
# Required Fields
title: "Lesson Title Here"
subject: computer-science # See constants.ts for valid subjects
grade: "4" # "k", "1", "2", ..., "12"
status: draft # Change to "published" when ready
durationMinutes: 15 # 10-25 minutes

# SOL Alignment (required for published lessons)
solCodes:
  - "4.1a"
  - "4.2"

# Lesson Design
objective: "Students will be able to..."
materials:
  - "Pencil and paper"
  - "Optional: Calculator"
prerequisites:
  - "Understanding of basic addition"

# External Links
standardsLinks:
  - label: "Virginia DOE Resource"
    url: "https://www.doe.virginia.gov/..."

# Searchability
tags:
  - "addition"
  - "practice"

# Metadata
updatedAt: 2026-02-28
---

## Warm-up
Brief introductory activity (2-3 minutes).

## Direct Instruction
Main teaching content (5-7 minutes).

## Guided Practice
Work together with students (3-5 minutes).

## Independent Practice / Quick Check
Students work independently (3-5 minutes).

## Differentiation
Suggestions for struggling or advanced learners.

## Extensions
Optional deeper exploration or enrichment activities.

## Notes for Parent/Instructor
Tips, common misconceptions, or additional context.

---

### Publication Rules
- **Draft lessons**: May have incomplete fields, will not appear in production
- **Published lessons**: MUST have:
  - At least one `solCode`
  - Non-empty `objective`
  - At least one item in `materials`
  - All required section headings present
````

---

## 7) Add QA Script

### Add npm Script
`package.json`:
```json
{
  "scripts": {
    "check": "npm run typecheck && npm run lint && npm run validate"
  }
}
```

### Create Validation Script
`scripts/check-lessons.js`

**Purpose**: Validate published lessons meet all requirements

**Checks**:
1. Parse all MDX files in `src/content/lessons/`
2. For each lesson with `status: "published"`:
   - Verify `solCodes.length >= 1`
   - Verify `objective` is non-empty
   - Verify `materials.length >= 1`
   - Verify MDX body contains required headings:
     - `## Warm-up`
     - `## Direct Instruction`
     - `## Guided Practice`
     - `## Independent Practice`
3. Exit with code 1 if any violations found
4. Log clear error messages with file path and violation type

**Libraries**:
- Use `gray-matter` for frontmatter parsing
- Simple regex or string matching for heading detection

**Example Output**:
```
❌ computer-science-4.mdx: Published lesson missing required heading "Warm-up"
❌ mathematics-5.mdx: Published lesson has empty objective
✅ All other lessons valid
```

### Add Validation Script to CI
Update `npm run check` to include validation.

---

## 8) Update README

### Add Section: "Content Authoring Workflow"

Document:
1. How to create new lesson from template
2. Draft vs. Published status
3. Validation rules for published lessons
4. How to run validation locally: `npm run validate`
5. What happens when validation fails

### Example Text
```markdown
## Content Authoring Workflow

### Creating a New Lesson
1. Copy `src/content/_templates/lesson-template.mdx`
2. Rename to `{subject-slug}-{grade}.mdx`
3. Fill in frontmatter and content
4. Keep `status: draft` until ready

### Publishing a Lesson
1. Verify all required fields are complete
2. Change `status: draft` to `status: published`
3. Run `npm run validate` to check for errors
4. Commit and build

### Validation Rules
Published lessons must have:
- At least one SOL code
- Non-empty objective
- At least one material
- All required section headings

Draft lessons bypass validation.
```

---

## Key Files to Create/Modify

### New Files
- `src/content/standards/mathematics-4.mdx` (example)
- `src/content/_templates/lesson-template.mdx`
- `scripts/check-lessons.js`

### Modified Files
- `src/content/config.ts` (add standards schema, enhance lesson schema)
- `src/pages/lessons/[lessonSlug].astro` (add Standards & Resources section)
- `src/pages/subjects/[subjectSlug].astro` (add standards links)
- `src/pages/grades/[gradeSlug].astro` (add standards links)
- `package.json` (add validation script)
- `README.md` (document workflow)

---

## Acceptance Criteria

### Schema & Validation
- [ ] Standards collection schema defined in `config.ts`
- [ ] Lesson schema includes `status` field
- [ ] SOL code regex validation works
- [ ] Published lesson refinement enforced
- [ ] Build fails on invalid published lesson
- [ ] Draft lessons bypass strict validation

### Content
- [ ] Example standards file created for Math Grade 4
- [ ] Lesson template created with full documentation
- [ ] At least one published lesson passes validation

### Integration
- [ ] Lesson pages show merged standards & resources
- [ ] Subject/Grade pages show standards links when available
- [ ] Disclaimer text displays correctly
- [ ] No duplicate links appear

### Scripts & CI
- [ ] `npm run check` includes all checks (typecheck, lint, validate)
- [ ] `npm run validate` runs custom script
- [ ] Validation script detects all required issues
- [ ] Clear error messages displayed on failure

### Documentation
- [ ] README documents authoring workflow
- [ ] README explains draft vs. published
- [ ] README shows how to run validation

### No Regressions
- [ ] No visual changes introduced
- [ ] All existing routes still work
- [ ] Search still functions
- [ ] Theme toggle still works
- [ ] Build time < 10 seconds (for 169 lessons)

---

## Testing Requirements

### Manual Tests
1. Create a test draft lesson with missing fields → Build succeeds
2. Set test lesson to published with missing fields → Build fails
3. Complete all fields and set to published → Build succeeds
4. View lesson page → Standards section appears
5. View subject/grade page → Standards links appear
6. Run `npm run check` → All checks pass

### Edge Cases
- Empty solCodes on draft lesson
- Invalid SOL code format (e.g., "4.2.3.4")
- Missing required heading in published lesson
- Duplicate standards links
- No standards entry for subject+grade

---

## Rollback Plan

If stage fails:
1. Git branch: `stage-2-curriculum-intelligence`
2. Commit progress frequently
3. If blocking issue: `git reset --hard` to last working commit
4. Review validation logic before retry deployment

---

## Known Future Work

- Strand-based navigation (Stage 4+)
- Full SOL coverage validation (Stage 4+)
- Automated standards entry generation (future tooling)
- Multi-state support beyond Virginia (distant future)
