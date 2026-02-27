# Stage 1 — Working Skeleton (Astro + MDX + Tailwind)

## Objective
Generate a production-quality skeleton for mskosman.com.
Purpose: homeschool + tutoring + extracurricular lesson plans aligned to Virginia DOE K-12 Standards of Learning (SOL).

## Requirements
- Users browse lesson plans by Subject and by Grade.
- Toggle in main nav switches between Subject view and Grade view.
- Lesson plans are ~15–20 minutes and structured consistently.
- Content stored as MDX with strict schema validation.
- Static-first architecture.

## Tech Stack (Mandatory)
- Astro + TypeScript
- TailwindCSS
- Astro Content Collections + Zod
- MDX for lesson content
- No backend (static only)

## Information Architecture
Routes:
- /
- /subjects
- /subjects/[subjectSlug]
- /grades
- /grades/[gradeSlug]
- /lessons/[lessonSlug]

## Content Collection: lessons

Frontmatter schema:
- title: string
- subject: enum
- grade: enum ("k","1"...,"12")
- durationMinutes: number (default 15)
- solCodes: string[]
- objective: string
- materials: string[]
- prerequisites: string[]
- standardsLinks: { label: string, url: string }[]
- tags: string[]
- updatedAt: date

Lesson body sections:
- Warm-up
- Direct Instruction
- Guided Practice
- Independent Practice / Quick Check
- Differentiation
- Extensions
- Notes for Parent/Instructor

## Subjects (initialize constants)
- Computer Science
- Digital Learning Integration
- Driver Education
- Economics & Personal Finance
- English
- Family Life Education
- Fine Arts
- Health Education
- History and Social Science
- Mathematics
- Physical Education
- Science
- World Language

## Deliverables
1. Full Astro project scaffold.
2. Tailwind + light/dark/high-contrast mode switch.
3. Content collection schema.
4. Placeholder lessons for every Subject x Grade (K–12).
5. Search (client-side).
6. README with dev/build instructions.
