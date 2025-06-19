Sections & Core Content Snippets:

Welcome: "Shaun Thompson," "We Stress Excellence," "Innovative solutions."

Our Legacy: "50+ years," "Global projects," "Trusted by contractors."

Why Post-Tensioning Matters/Edge: "Minimizes cracking," "30+ years," "20% savings."

Core/Innovative Solutions: "Repair & Retrofit," "Re-Anchor," "Pop-Up Slabs," "Specialty PT."

Fortis Soldier Pile: "No tiebacks," "Faster, safer," "Fully engineered."

Barrier Cable Systems: "OSHA-compliant," "Load-verified," "Protects businesses."

Safety & Innovation/Safety First: "Controlled de-tensioning," "GPR scanning," "Silica management."

Case Studies: "BASIS Bothell," "Kirkland Urban," "Fauntleroy," "Brightwater."

Industry Leadership: "2019 Night of the Stars Award," "Setting repair codes."

Let’s Build Together: "Partner with Shaun," contact details, services recap.

Keyboard-Only Navigation & Presenter Control:

Right Arrow: Progressively reveal bullet points within a section (1-second delay between each). After all bullets are shown, advance to the next section.

Left Arrow: Navigate to the previous section.

Guidance: Display a subtle, pulsing "Press → to continue" prompt (Tailwind styled) only when all bullet points in the current view are revealed.

Dynamic Progress Indicator: Implement a sleek, horizontal bar at the screen bottom to visually track progress through the 10 sections.

Visuals & Cinematic Animations (GSAP & Tailwind CSS):

Aesthetic: Modern, polished, professional, dark-themed (navy/white/gray). Aim for a unique, high-end, documentary feel with fluid transitions.

Typography: Tailwind CSS for bold, responsive executive-friendly text (e.g., text-4xl md:text-5xl font-bold).

Section Transitions: Smooth, cinematic transitions (GSAP fades/slides, 0.3-0.5s). Consider subtle parallax for image-heavy backgrounds.

Bullet Points: Animate slide-in from left (GSAP, 0.5s).

Micro-Animations:

Floating icons (GSAP, 2s yoyo).

Pulsing placeholders/prompts (GSAP, 1s).

Scaling key metrics on reveal (GSAP, 1.1x, 0.5s).

Specific Section Visuals (Examples):

Welcome: Full-screen 4K drone video background (S3: s3://post-tension-assets/videos/drone.mp4, fallback Officejpg.jpg).

Legacy: World map (react-simple-maps) with auto-cycling, pulsing pins (5s).

Why PT Matters: Animated Chart.js bar chart (repair costs), revealed post-bullets.

Solutions: 10-second looping video snippets/image carousels for services (S3: s3://post-tension-assets/videos/services.mp4).

Fortis Pile: Auto-rotating Sketchfab 3D model (e.g., against JPEGimage8jpeg.jpg background).

Barrier Cables: 20-second installation/demo video (S3: s3://post-tension-assets/videos/barrier.mp4, fallback Picture4.jpg).

Safety: GSAP-animated sequence (e.g., for de-tensioning, using JPEGimage9jpeg.jpg).

Case Studies: Auto-cycling image carousel (GSAP fades, 5s, e.g., lachlandempsey344406unsplashjpg.jpg).

Leadership: GSAP-revealed award badges (e.g., from JPEGimage6jpeg.jpg).

Call to Action: Pulsing QR code (S3: s3://post-tension-assets/qr.png), hero image (e.g., Picture3.jpg).

Animation Behavior: Pause all animations when a section is inactive.

