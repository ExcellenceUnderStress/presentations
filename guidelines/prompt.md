Objective:

Develop a modern, engaging Next.js (v14) presentation for Post Tensioning Solutions LLC using Spectacle, targeting CEOs and superintendents. The presentation should be presenter-controlled with multikey navigation (down arrow for bullet reveals, right arrow/spacebar for sections), visually appealing with Tailwind CSS and lightweight animations, and deployable on AWS Amplify with S3 assets. It will consolidate content into 10 sections, leveraging TypeScript, Chart.js for data visualization, and Sketchfab for 3D models, ensuring 60fps performance and static site generation (SSG).

Core Requirements:

Content & Structure:

Consolidate provided text content into 10 sections: Welcome, Our Legacy, Why Post-Tensioning Matters, Core Solutions, Fortis Soldier Pile, Barrier Cable Systems, Safety & Innovation, Case Studies, Industry Leadership, and Let’s Build Together. Preserve key messages and data points (e.g., “50+ years,” “20% savings,” “Shaun Thompson”). Use Spectacle’s <Slide> and <Appear> components for section slides and bullet reveals.

Navigation & Presenter Control:

Multikey Navigation:
Down Arrow (↓): Progressively reveal bullet points within a section (1-second delay between each) using <Appear>.
Right Arrow (→) or Spacebar: After all bullets are revealed, display a “Press → to continue” prompt on the next press, then advance to the next section or reveal a visual (e.g., chart, map, 3D model) on the subsequent press.
Left Arrow (←): Navigate to the previous section, resetting bullet reveals.
Home/End (optional): Jump to first/last section.
Guidance Prompt: Display a subtle, pulsing “Press → to continue” cue (Tailwind: text-sm, opacity-75, animate-pulse) only after all bullet points are revealed and a right arrow/spacebar is pressed.
Progress Indicator: Implement a horizontal progress bar at the screen bottom (Spectacle’s Progress or custom) to track progress through the 10 sections.
Visual Style & Animations:

Aesthetic: Modern, professional, dark theme (navy/gray/white) using Tailwind CSS. Avoid generic layouts for a polished, executive-friendly look.
Typography: Bold, responsive Tailwind typography (e.g., text-4xl md:text-5xl font-bold for headings).
Section Transitions: Use Spectacle’s slide transitions (e.g., slide, fade, 0.3-0.5s duration) for smooth section changes.
Micro-Animations:
Key metrics (e.g., “50+ years”) scale up (1.1x, 0.5s) via CSS animations.
SVG icons (e.g., Core Solutions) have a floating effect (CSS keyframe, 2s).
Bullet points slide in from the left (0.5s, Spectacle <Appear> or CSS).
Animation Behavior: Pause animations for inactive sections to maintain performance.
Specific Section Visuals:

Welcome: Full-screen looping drone video (S3: s3://post-tension-assets/videos/drone.mp4, fallback image) with dark overlay.
Our Legacy: World map (react-simple-maps) with auto-cycling pulsing pins (5s).
Why Post-Tensioning Matters: Chart.js bar chart (proactive vs. emergency repair costs), animated after bullet reveals.
Core Solutions: 10-second looping video snippets or image carousels (S3: s3://post-tension-assets/videos/services.mp4).
Fortis Soldier Pile: Sketchfab 3D model, auto-rotating.
Barrier Cable Systems: 20-second demo video (S3: s3://post-tension-assets/videos/barrier.mp4, fallback image).
Safety & Innovation: CSS-animated sequence (e.g., de-tensioning).
Case Studies: Auto-cycling image carousel (5s, CSS fade transitions).
Industry Leadership: Award badges with CSS scale/fade-in.
Let’s Build Together: Pulsing QR code (S3: s3://post-tension-assets/qr.png), animated contact form slide-up.
Assets & Technology:

Store assets (videos, images, 3D model links) on S3 (s3://post-tension-assets/).
Provide a TypeScript script (scripts/uploadToS3.ts) for batch S3 uploads.
Implement a DynamoDB-backed contact form in Let’s Build Together, with a Next.js API route (/api/contact.ts).
Deployment & Performance:

Use Next.js SSG for optimal load times.
Deploy via AWS Amplify with S3 for assets and CloudFront CDN.
Ensure 60fps animations with lazy-loaded media (e.g., videos, 3D models) and optimized Chart.js/Sketchfab rendering.
Testing:

Implement Jest/Playwright tests in /tests/navigation.test.ts for:
Multikey navigation (↓ bullet reveals, →/Space section advances, ← previous).
Conditional prompt display and transitions.
Animation triggers (e.g., bullet slides, chart reveals).
AI Development Best Practices:

Ensure clear objectives, use trusted tools (Next.js, Spectacle, Chart.js), validate outputs, and design for iteration.
Deliverables:

File Structure:
/components: Slide.tsx, Welcome.tsx, OurLegacy.tsx, etc.
/content: snippets.json for section content.
/hooks: useNavigation.ts for multikey navigation.
/utils: animations.ts for CSS animations.
/pages: index.tsx, api/contact.ts.
/scripts: uploadToS3.ts.
/tests: navigation.test.ts.
/public/assets: Image/video placeholders.
/docs: guideline.md, file-structure.md, guide.md.
Code Snippets (as <xaiArtifact>):
useNavigation.ts: Hook for multikey navigation and prompt logic.
animations.ts: CSS animation utilities.
WhyPostTensioning.tsx: Example section with Chart.js integration.
api/contact.ts: DynamoDB contact form route.
uploadToS3.ts: S3 upload script.
Final Outcome:

A polished, engaging web-based presentation using Spectacle, easy to navigate with multikey controls (down arrow for bullet reveals), visually appealing with Tailwind CSS and Chart.js/Sketchfab, and performant with 60fps and SSG, effectively showcasing Post Tensioning Solutions’ expertise to C-suite audiences.