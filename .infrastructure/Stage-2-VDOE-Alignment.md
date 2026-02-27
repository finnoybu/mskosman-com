# Stage 2 — VDOE Alignment Data Layer

## Objective
Introduce structured VDOE alignment without scraping PDFs.

## Add Content Collection: standards

Fields:
- subject
- grade
- solDocLinks: { label, url }[]
- notes

## Seed Data
Include:
Mathematics Grade 4:
- VDOE SOL link placeholder
- Instructional Resource:
  Mystery Numbers (Grade 4, 4.1ab)

## UI Enhancements
- Show standards links on Subject and Grade detail pages.
- Add disclaimer:
  "This site supplements VDOE resources; verify latest SOL."

## Validation Rules
- durationMinutes must be 10–25.
- solCodes must match regex:
  ^[Kk]\.[0-9]+[a-z]*$ OR ^[0-9]{1,2}\.[0-9]+[a-z]*$

## Engineering
- Strong type safety.
- Zod validation.
- npm run check: typecheck + lint + validation.
- Update README.
