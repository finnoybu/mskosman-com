# Handoff: Computer Science lessons, state as of 2026-11-13

For the next Claude session and for Claude Code. Read this before writing more lessons or
changing how lessons are organized.

## Where things stand

- Kindergarten is merged to `main` (PR #5).
- Grades 1 through 8 are committed on the local branch `content/cs-grades-2-8-lessons`, one
  commit per grade. Check whether it has been pushed and merged before starting.
- Every lettered sub-item of the 2024 Computer Science SOL for K-8 is covered. Each grade has a
  coverage table in `standards-source/computer-science-grade-N-lessons.md`.
- Not yet written: the four Computer Science courses (below).
- Still placeholders: every other subject, and `computer-science-9` through `computer-science-12`.

## Ken's decisions so far

- Work one subject at a time in alphabetical order, one grade at a time within a subject.
- One commit per subject and grade (or per subject and course).
- Lessons run 15 to 20 minutes and should not all be the same length.
- Sections: Warm-up, Direct Instruction, Guided Practice, Independent Practice / Quick Check,
  Differentiation, Extensions, Notes for Parent/Instructor. A lesson that needs preparation
  opens with a Prep section. The section list may flex when a lesson needs it.
- A lesson may cover several sub-items, and a sub-item may be covered by more than one lesson,
  as long as everything is covered.
- A mix of lessons with and without devices is wanted. Each lesson carries one tag:
  `unplugged`, `device`, or `device-optional`.
- Lessons are living drafts. `status` is omitted, so the schema default (`draft`) applies.
- Existing placeholder lessons are not templates. Do not reuse their wording.
- Do not use em dashes anywhere.
- The VDOE PDF stays local and is ignored by git. Do not commit it.

## Decision just made: courses (option 1)

Computer Science has no grade-level standards for Grades 9 to 12. It has four courses, and Ken
has decided the site should treat them as courses, not pin them to grades.

| Course | Code prefix | Standards | Sub-items (approx.) |
|---|---|---|---|
| Middle School Computer Science Elective | `MSCSE-9`, `MSCSE-18`, `MSCSE-36` | not counted | 107 |
| Computer Science Foundations | `CSF` | 25 | 101 |
| Computer Science Principles | `CSP` | 19 | 79 |
| Computer Science Programming (NCTE) | `PRG` | 17 | 64 |

Notes:

- The middle school elective is tiered by course length. VDOE says its standards are
  "delineated for the implementation of a 9-week, 18-week, or 36-week implementation," and the
  codes carry the tier: `MSCSE-9.AP.4`, `MSCSE-18.AP.1`. Read that section carefully before
  planning lessons. It was not parsed or verified in this session.
- The SOL code validators (`src/content/config.ts` and `isValidSOLCode` in `src/lib/utils.ts`)
  accept `CSF.AP.1`, `CSP.AP.1`, and `PRG.AP.1`. They do NOT accept the `MSCSE-9.AP.4` format
  (hyphen and digits in the prefix). Widen them, with a test, before adding elective lessons.

### Site work needed (Claude Code)

- A lesson has either a `grade` or a `course`, never both. The schema currently requires `grade`.
- Browsing becomes Subject, then grade or course, then lessons.
- Delete `src/content/lessons/computer-science-9.mdx` through `computer-science-12.mdx`.
- Course lessons cannot go into `src/content/lessons/` until the schema accepts `course`. Until
  then, write them to a staging folder outside `src/`.
- The same split will be needed for the upper years of Mathematics, Science, and History and
  Social Science, which also switch from grades to named courses.

### Subjects that will need their own decision

- Digital Learning Integration: grade bands (K-2, 3-5, 6-8, 9-12).
- World Language: organized by language and level, not grade.
- Driver Education, Economics & Personal Finance: one course each.
- Fine Arts: four disciplines; documents not yet opened.
- See `vdoe-sol-subject-index.md` for links and what was and was not verified.

## Source of truth and a known discrepancy

- Use VDOE's current K-12 document: `VDOE-2024-Computer-Science-SOL-K-12.pdf` (file dated
  2025-08-04, 65 pages), kept locally in this folder.
- VDOE's separate per-grade files (dated 2024-09) differ from it in three places: 2.CSY.1d
  ("binary code" versus "binary"), and one extra sub-item each under 4.IC.3 and 5.IC.3 that the
  current document dropped. The lessons follow the current document. Each grade's standards
  file records its differences. Lesson `standardsLinks` for Grades 4 and 5 point to the older
  per-grade PDFs, which still show the dropped sub-item.
- doe.virginia.gov returns 403 to scripts. It can be read through Chrome.

## Method used

1. Extract a grade's standards from the PDF with `pdftotext -layout` and `tools/parse.py`.
2. Write `computer-science-grade-N-2024.md` with `tools/mkmd.py`.
3. Verify against VDOE's Word file through Chrome: fetch the .docx in the page, unzip
   `word/document.xml`, and compare normalized lines by hash. Report any differences.
4. Write lessons with the generator in `tools/h3.py`. It pulls the standard text verbatim from
   the standards file, so lessons cannot misquote it. `tools/example-lessons-grade-8a.py` shows
   the input format.
5. Finish a grade with `tools/fin.py N`: checks that every sub-item is covered, writes the
   coverage table, removes the placeholder, updates `.astro/astro/content.d.ts`, compiles each
   lesson as MDX, runs `scripts/check-lessons.js`, and commits.

The tools were written for this session's environment and have hardcoded paths
(`~/mnt/mskosman-com`, `~/gen`). Treat them as a reference, and adapt before running.

## Limits to keep in mind

- The site build, unit tests, and browser tests could not be run in the session that wrote
  Grades 1 to 8. Ken ran them for Kindergarten only. Run them before merging.
- `.astro/astro/content.d.ts` is tracked in git even though `.astro` is ignored. It was updated
  by hand for each grade. A real build may regenerate it slightly differently.
- No educator has reviewed any lesson.
- Pushing is not possible from the Claude session. Ken pushes from his terminal.
- Some lessons ask the instructor to find a current source first (laws, Virginia's economy,
  health guidance, AI and jobs) so that dated facts are not built into the lesson.
