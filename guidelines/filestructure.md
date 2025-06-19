# File Structure: Post Tensioning Solutions LLC Presentation

This structure supports a modern presentation architecture using **Next.js (v14)** and **Spectacle**, with dynamic slide content, keyboard navigation (↓ for bullet reveals, →/Space for sections), and external integrations like Chart.js, Sketchfab, and S3 asset handling. It also supports static site generation (SSG) and 60fps animation where possible.

---

## 📁 Root Directory

- `README.md`: Project overview and setup.
- `next.config.js`: Configuration for SSG, dynamic imports, and image domains.
- `tsconfig.json`: TypeScript config.

---

## 📁 /components

Reusable and section-specific React components for slides.

- `Slide.tsx`: Base Spectacle slide wrapper with animation and appearance logic.
- `SlideWrapper.tsx`: Common layout shell (padding, theme, reveal steps).
- `Welcome.tsx`, `OurLegacy.tsx`, `WhyPostTensioning.tsx`, ...: 10 section-specific components.
- `ChartBlock.tsx`: Bar chart component using Chart.js.
- `SketchfabEmbed.tsx`: IFrame-based Sketchfab viewer.
- `MapGlobe.tsx`: React-Simple-Maps integration for geo context.

---

## 📁 /content

Structured content used across slides.

- `snippets.json`: All slide content, styled with Tailwind classes and ready for `<Appear>`.
- `projects.json`: Optional data for project-specific metrics or case studies.
- `chart-data.json`: Data sets for Chart.js.

---

## 📁 /hooks

Custom React hooks.

- `useNavigation.ts`: Keyboard controls (↓ bullet, →/Space forward, ← back).
- `useAppearSteps.ts`: Manage per-slide reveal steps and current progress.

---

## 📁 /utils

Reusable logic, style helpers, and micro-interactions.

- `animations.ts`: CSS-based transitions for 60fps micro-animations.
- `markdownToComponents.ts`: Optional parser for MDX-like rendering if needed.

---

## 📁 /pages

Next.js routing.

- `index.tsx`: Main `<Deck>` rendering all slides with SSG.
- `api/contact.ts`: Sample endpoint (e.g. for form submission or analytics events).
- `preview.tsx`: Live preview/development route for isolated slide testing.

---

## 📁 /public/assets

Static assets used in slides or visuals (placeholder for S3-mirrored content).

- `/images/`: Logos, diagrams, project photos.
- `/videos/`: Testimonial reels or render exports.

---

## 📁 /scripts

Utility scripts for deployment and asset management.

- `uploadToS3.ts`: Upload visuals from `/public/assets` to S3 with tagging.
- `generateSnippets.ts`: CLI to parse MDX or content fragments into `snippets.json`.

---

## 📁 /tests

Testing environment.

- `navigation.test.ts`: Jest + Playwright test for multikey nav and slide flow.
- `chart-render.test.ts`: Snapshot or visual test for Chart.js integration.
- `accessibility.test.ts`: Basic a11y testing for keyboard and screen reader flow.

---

## 📁 /docs

Internal documentation.

- `guideline.md`: Overall project purpose, goals, and visual/UX principles.
- `file-structure.md`: (this file) — documents directory structure and key files.
- `guide.md`: Section-by-section breakdown with content logic and design notes.

---

## Optional Enhancements

- `/styles`: Global Tailwind config overrides or shared class exports.
- `/layouts`: Alternative layout renderers (e.g., 3D scroll, framer-motion paths).
- `/cms`: Optional headless CMS connector if content editing is offloaded.

---

## Notable Files

| File                  | Purpose                                                     |
|-----------------------|-------------------------------------------------------------|
| `useNavigation.ts`    | Controls ↓ bullet reveals, → section nav, ← back            |
| `snippets.json`       | Centralized content source for all slides                   |
| `uploadToS3.ts`       | Automates S3 asset management                               |
| `ChartBlock.tsx`      | Integrates Chart.js with responsive layout                  |
| `SlideWrapper.tsx`    | Standardizes padding, theme, and navigation context         |

---
