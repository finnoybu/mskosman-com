# mskosman.com

A production-quality static website for homeschool, tutoring, and extracurricular lesson plans aligned to Virginia Department of Education K–12 Standards of Learning (SOL).

## Features

- 📚 **169 Placeholder Lessons** - Complete coverage across 13 subjects and grades K–12
- 🎨 **Modern UI** - Built with Astro, TypeScript, and TailwindCSS
- 🌓 **Theme Support** - Light, dark, and high-contrast modes
- 🔍 **Client-Side Search** - Fast, instant search across all lessons
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- ✅ **Type-Safe** - Full TypeScript support with Zod schema validation
- 📝 **MDX Content** - Write lessons in MDX with frontmatter validation
- 🚀 **Static-First** - No backend required, fast and secure

## Tech Stack

- **[Astro](https://astro.build/)** - Static site generator
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[TailwindCSS](https://tailwindcss.com/)** - Styling
- **[MDX](https://mdxjs.com/)** - Content authoring
- **[Zod](https://zod.dev/)** - Schema validation

## Project Structure

```
mskosman-com/
├── public/              # Static assets
│   └── favicon.svg
├── scripts/             # Build and utility scripts
│   └── generate-lessons.mjs
├── src/
│   ├── components/      # Reusable Astro components
│   │   ├── Footer.astro
│   │   ├── Header.astro
│   │   ├── LessonCard.astro
│   │   ├── SearchBar.astro
│   │   ├── ThemeSwitcher.astro
│   │   └── ViewToggle.astro
│   ├── content/         # Content collections
│   │   ├── config.ts    # Content collection schemas
│   │   └── lessons/     # 169 lesson MDX files
│   ├── layouts/         # Page layouts
│   │   ├── BaseLayout.astro
│   │   └── MainLayout.astro
│   ├── lib/             # Utilities and constants
│   │   └── constants.ts
│   ├── pages/           # Route pages
│   │   ├── index.astro
│   │   ├── subjects/
│   │   │   ├── index.astro
│   │   │   └── [subjectSlug].astro
│   │   ├── grades/
│   │   │   ├── index.astro
│   │   │   └── [gradeSlug].astro
│   │   ├── lessons/
│   │   │   └── [lessonSlug].astro
│   │   └── search-data.json.ts
│   └── styles/
│       └── global.css
├── astro.config.mjs     # Astro configuration
├── package.json
├── tailwind.config.mjs  # Tailwind configuration
└── tsconfig.json        # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, pnpm, or yarn

### Installation

1. **Clone the repository**
   ```bash
   cd mskosman-com
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

   The site will be available at `http://localhost:4321`

### Development Commands

| Command           | Action                                       |
|:------------------|:---------------------------------------------|
| `npm run dev`     | Start dev server at `localhost:4321`         |
| `npm run build`   | Build production site to `./dist/`           |
| `npm run preview` | Preview production build locally             |
| `npm run astro`   | Run Astro CLI commands                       |

## Content Structure

### Lesson Frontmatter Schema

Each lesson in `src/content/lessons/` must include the following frontmatter:

```yaml
---
title: "Lesson Title"
subject: "Mathematics"  # Must be one of 13 defined subjects
grade: "5"              # k, 1-12
durationMinutes: 15     # Default: 15
solCodes:
  - "MATH.5.1"
  - "MATH.5.2"
objective: "Students will demonstrate understanding of..."
materials:
  - "Worksheet or notebook"
  - "Pencil or pen"
prerequisites:
  - "Basic arithmetic"
standardsLinks:
  - label: "Virginia SOL Mathematics"
    url: "https://doe.virginia.gov/"
tags:
  - "fundamentals"
  - "introduction"
updatedAt: 2026-02-27
---
```

### Lesson Body Structure

Each lesson should include these sections:

1. **Warm-up** (3 minutes) - Activate prior knowledge
2. **Direct Instruction** (5 minutes) - Introduce core concepts
3. **Guided Practice** (4 minutes) - Work through examples together
4. **Independent Practice / Quick Check** (3 minutes) - Brief assessment
5. **Differentiation** - Support and challenge options
6. **Extensions** - Additional activities
7. **Notes for Parent/Instructor** - Teaching tips and preparation

## Subjects

The site includes lessons for these 13 Virginia SOL subject areas:

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

## Routes

- `/` - Home page with search
- `/subjects` - Browse all subjects
- `/subjects/[subjectSlug]` - Lessons for a specific subject
- `/grades` - Browse all grades
- `/grades/[gradeSlug]` - Lessons for a specific grade
- `/lessons/[lessonSlug]` - Individual lesson page

## Theme System

The site supports three themes:

- **Light** - Default light theme
- **Dark** - Dark mode for reduced eye strain
- **High Contrast** - Enhanced accessibility

Theme preference is saved to localStorage and persists across sessions.

## Generating New Lessons

To generate placeholder lessons:

```bash
node scripts/generate-lessons.mjs
```

This creates 169 lessons (13 subjects × 13 grades) with structured content following the required format.

## Building for Production

1. **Build the static site**
   ```bash
   npm run build
   ```

2. **Preview the production build**
   ```bash
   npm run preview
   ```

3. **Deploy**
   
   The `dist/` folder contains the complete static site ready for deployment to any static hosting service.

## Deployment

### Cloudflare Pages

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Deploy Stage 3"
   git push origin main
   ```

2. **Connect to Cloudflare Pages**
   - Go to [dash.cloudflare.com](https://dash.cloudflare.com)
   - Create a Pages project
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `dist/`
   - Deploy

3. **Add Security Headers** (in Cloudflare)
   - Go to Rules → Transform Rules → Modify response headers
   - Add the following headers:

   ```
   Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'
   X-Content-Type-Options: nosniff
   X-Frame-Options: DENY
   Referrer-Policy: strict-origin-when-cross-origin
   X-UA-Compatible: IE=edge
   Permissions-Policy: geolocation=(), microphone=(), camera=()
   ```

### Netlify

1. **Connect to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Create a new site from Git
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `dist/`
   - Deploy

2. **Add Security Headers** (via `netlify.toml`)
   
   A `netlify.toml` file (if created) would configure:
   ```toml
   [[headers]]
   for = "/*"
   [headers.values]
   Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'"
   X-Content-Type-Options = "nosniff"
   X-Frame-Options = "DENY"
   Referrer-Policy = "strict-origin-when-cross-origin"
   X-UA-Compatible = "IE=edge"
   Permissions-Policy = "geolocation=(), microphone=(), camera=()"
   ```

### Security Headers Explanation

- **Content-Security-Policy** - Prevents XSS attacks by restricting resource sources
- **X-Content-Type-Options** - Prevents MIME type sniffing
- **X-Frame-Options** - Prevents clickjacking attacks
- **Referrer-Policy** - Controls how much referrer information is shared
- **X-UA-Compatible** - Ensures modern IE rendering
- **Permissions-Policy** - Disables access to sensitive browser APIs

### Environment Validation

Before deploying to production:

```bash
# Validate TypeScript and ESLint
npm run check

# Run unit tests
npm test

# Run E2E tests
npm run test:e2e

# Build and preview
npm run build
npm run preview
```

### CI/CD Pipeline

This project includes a GitHub Actions workflow (`.github/workflows/build.yml`) that automatically:
- Runs `npm run check` on all pull requests and pushes
- Runs `npm run build` to verify the site builds successfully
- Reports build status

All 199 pages (198 lessons + 404 error page) build successfully with:
- ✅ Full TypeScript type checking
- ✅ Dynamic sitemap generation (`/sitemap.xml`)
- ✅ SEO meta tags (Open Graph, Twitter Card, canonical URLs)
- ✅ Accessibility features (skip-to-content link, keyboard navigation, ARIA labels)

## Type Safety

The project uses:
- TypeScript for all `.ts` and `.astro` files
- Zod schemas for content collection validation
- Type-safe imports with path aliases (`@components/*`, `@layouts/*`, `@lib/*`)

## Performance

Astro generates static HTML for fast page loads:
- No JavaScript by default
- Progressive enhancement for interactive features (search, theme switcher)
- Optimized for Core Web Vitals

## Contributing

To add new lessons:

1. Create an `.mdx` file in `src/content/lessons/`
2. Follow the frontmatter schema
3. Include all required sections
4. Run `npm run build` to validate

## License

© 2026 mskosman.com - All rights reserved

---

**Built with ❤️ using Astro**
