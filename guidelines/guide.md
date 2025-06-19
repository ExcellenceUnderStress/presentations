# Presentation Guide: Post Tensioning Solutions LLC

This guide outlines the structure and storytelling strategy for a 10-section Spectacle-based presentation using Next.js (v14). Each section includes a focused narrative, concise content, and visual strategy tailored for high-impact delivery to C-suite decision-makers. All sections support **↓ bullet reveals**, **→/Space navigation**, and use **Tailwind CSS dark theme** styling.

---

## 1. Welcome

- **Narrative Goal**: Set the tone. Highlight Shaun Thompson's leadership and introduce the brand's mission.
- **Content**:
  - “Shaun Thompson, our valued partner”
  - “We Stress Excellence”
  - “Specialized solutions for complex PT challenges”
- **Visual**: Full-screen aerial/drone video of job sites (S3-hosted).
- **Performance Note**: Compress for fast load; preload first frame for seamless start.

---

## 2. Our Legacy

- **Narrative Goal**: Build credibility with long-standing expertise.
- **Content**:
  - “50+ years leading innovation”
  - “Projects across the U.S. and internationally”
  - “Family-owned, hands-on leadership”
- **Visual**: Interactive world map using `react-simple-maps` with animated project markers.
- **Performance Note**: Use SVG-based maps for lightweight 60fps animation.

---

## 3. Why Post-Tensioning Matters

- **Narrative Goal**: Explain PT value for modern construction economics.
- **Content**:
  - “Thinner slabs. Longer spans.”
  - “20% savings in concrete and steel”
  - “Design flexibility, fewer cracks”
- **Visual**: Bar chart (Chart.js) comparing PT vs traditional slabs on cost, weight, and span.
- **Performance Note**: Lazy-load chart library; disable animations on low-power devices.

---

## 4. Core Solutions

- **Narrative Goal**: Convey the depth of technical capabilities.
- **Content**:
  - “Strand repair, retrofit, barrier cable”
  - “External post-tensioning, slab scanning”
  - “Specialty consulting for complex structures”
- **Visual**: Grid of solution icons with brief overlays.
- **Performance Note**: Use inline SVG or compressed PNGs for sharp visuals at low cost.

---

## 5. Fortis Soldier Pile

- **Narrative Goal**: Emphasize innovation and proprietary advantage.
- **Content**:
  - “Eliminates tiebacks, easements, and raker braces”
  - “Faster installs, less excavation”
  - “Engineered for zero lateral movement”
- **Visual**: Sketchfab 3D embed of Fortis Pile system with animated cross-section.
- **Performance Note**: Preload only first interaction; pause model rendering on inactive slides.

---

## 6. Vehicle Barrier Cable Systems

- **Narrative Goal**: Demonstrate specialized safety work for parking structures.
- **Content**:
  - “Barrier cable design and retrofit”
  - “PTI-compliant anchorage and tensioning”
  - “Installed in over 300 structures”
- **Visual**: Time-lapse or animated overlay of cable layout and anchorage systems.
- **Performance Note**: Lazy-load video segments; throttle rendering below 60fps when idle.

---

## 7. Safety & Innovation

- **Narrative Goal**: Reinforce company culture around risk management and forward thinking.
- **Content**:
  - “Zero-failure safety record”
  - “Advanced scanning + live strand detection”
  - “PTI Level 2 certified technicians”
- **Visual**: Split-screen — one side with scanning equipment footage, one side with live load data.
- **Performance Note**: Ensure balanced layout for mobile responsiveness and quick fade transitions.

---

## 8. Case Studies

- **Narrative Goal**: Prove track record through real projects.
- **Content**:
  - “High-rise PT retrofit in downtown Seattle”
  - “Barrier cable upgrade for multi-level garage”
  - “Seismic retrofit using external PT”
- **Visual**: Carousel of before/after photos with animated captions.
- **Performance Note**: Use responsive image sets (WebP + fallback); preload top 3 slides.

---

## 9. Industry Leadership

- **Narrative Goal**: Position the company as a national authority in post-tensioning.
- **Content**:
  - “Contributors to PTI best practices”
  - “Invited trainers at PT repair seminars”
  - “Partners with top engineers and GCs”
- **Visual**: Grid of association logos, partner testimonials (subtitled), and press features.
- **Performance Note**: Avoid autoplay; cue testimonials only after interaction or on reveal.

---

## 10. Let’s Build Together

- **Narrative Goal**: Inspire action and open the door for collaboration.
- **Content**:
  - “Free inspections, proven results”
  - “Designed for engineers, contractors, and owners”
  - “Let’s talk about your next project”
- **Visual**: Contact CTA with branded background, QR code, and project teaser clip.
- **Performance Note**: Prioritize QR visibility on mobile; keep background video muted + looped.

---

## Theme + Navigation Recap

- **Theme**: Tailwind CSS dark mode throughout; consistent spacing, typographic scale, and iconography.
- **Navigation**:
  - **↓** for bullet reveals (via `<Appear>`)
  - **→ / Space** for next section
  - **←** for previous section
  - All steps handled by `useNavigation.ts`

---
