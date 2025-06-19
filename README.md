# Post Tensioning Solutions LLC - Presentation

A polished, engaging web-based presentation built with **Next.js**, **Spectacle**, and **TypeScript**, targeting C-suite audiences with advanced navigation controls and cinematic animations.

## 🎯 Project Overview

This presentation showcases Post Tensioning Solutions LLC's expertise through **10 carefully crafted sections**, designed specifically for **Shaun Thompson** and other industry decision-makers.

### Key Features
📝 Key Guidelines to Uphold
No “bullet reveals”: Remove the step-by-step bullet navigation. All content for a section should be visible at once, not revealed incrementally.
Not a PowerPoint clone: Avoid any “slide deck” or “static card” look. No boxed-in slides, no hard section breaks, no “next bullet” feel.
Fluid, cinematic, and modern: Use continuous, seamless transitions between sections. Think of a cinematic web experience, not a deck.
Immersive visuals: Leverage video, parallax, animated backgrounds, overlays, and micro-interactions. Use scroll or swipe for navigation, or a single “next” that feels like a journey, not a click.
Unique, high-end feel: Use bold typography, layered visuals, and motion design that feels like a digital story, not a business presentation.
Polished, C-suite-ready visuals: Modern, cinematic, dark theme, professional layouts
Progressive bullet reveals: Down arrow for bullets, right arrow/space for sections
Rich visuals: Video backgrounds, interactive maps, charts, and 3D models
Performance: 60fps, SSG, lazy loading, accessibility
Content: Messaging and structure as defined in snippets.json and guidelines
Navigation: Keyboard-first, with clear prompts and progress indicators
🔧 Next Steps for Issue Resolution
TypeScript/ESLint: Fix type errors and warnings, but never at the expense of the visual or interaction quality described in the guidelines.
Component Structure: Ensure each slide’s layout and animation matches the original section components and the guideline’s intent.
Progressive Reveal: Maintain the bullet/visual reveal logic and navigation flow.
Performance: Avoid unnecessary re-renders or heavy operations that could impact 60fps.
Accessibility: Keep keyboard navigation and ARIA/semantic HTML in mind.
## 📋 Presentation Sections

1. **Welcome** - Introduction to Shaun Thompson and "We Stress Excellence"
2. **Our Legacy** - 50+ years of innovation with interactive world map
3. **Why Post-Tensioning** - Economic benefits with Chart.js cost comparisons
4. **Core Solutions** - Comprehensive service portfolio
5. **Fortis Soldier Pile** - Revolutionary shoring innovation with 3D models
6. **Barrier Cable Systems** - OSHA-compliant safety solutions
7. **Safety & Innovation** - Zero-failure safety record and protocols
8. **Case Studies** - Proven project successes (BASIS Bothell, Kirkland Urban, etc.)
9. **Industry Leadership** - Awards and recognition (2019 Night of the Stars)
10. **Let's Build Together** - Partnership call-to-action with contact integration

## 🎮 Navigation Controls

| Key | Action |
|-----|--------|
| `↓` | Reveal next bullet point (progressive reveal) |
| `→` / `Space` | Advance to next section |
| `←` | Go to previous section |
| `Home` | Jump to first slide |
| `End` | Jump to last slide |

## 🛠 Tech Stack

- **Framework**: Next.js 15.3.3 with React 19
- **Presentation**: Spectacle 10.1.7
- **Styling**: Tailwind CSS 4.1.10
- **Animations**: GSAP 3.13.0 + Framer Motion 12.18.1
- **Charts**: Chart.js 4.5.0 with react-chartjs-2
- **Maps**: react-simple-maps 3.0.0
- **Language**: TypeScript 5

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd post-tension-presentation

# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the presentation.

### Production Build

```bash
# Build for production (SSG)
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
post-tension-presentation/
├── components/
│   ├── sections/           # Individual slide components
│   ├── SlideShow.tsx      # Main presentation container
│   └── WorldMap.tsx       # Interactive map component
├── content/
│   └── snippets.json      # Centralized slide content
├── hooks/
│   └── useKeyboardNavigation.ts  # Custom navigation logic
├── utils/
│   └── animations.ts      # GSAP animation utilities
├── src/app/
│   ├── page.tsx          # Main Spectacle presentation
│   ├── globals.css       # Global styles and animations
│   └── layout.tsx        # App layout
└── guidelines/           # Project documentation
```

## 🎨 Content Management

All slide content is managed through `content/snippets.json`:

```json
{
  "slides": [
    {
      "id": "welcome",
      "title": "Welcome",
      "subtitle": "Post Tensioning Solutions LLC",
      "bullets": [...],
      "visual": {...},
      "background": "bg-gradient-to-br from-slate-900 via-blue-900..."
    }
  ]
}
```

## 🔧 Customization

### Adding New Slides
1. Add slide data to `content/snippets.json`
2. Update `slideConfigs` array in `src/app/page.tsx`
3. Create custom components in `components/sections/` if needed

### Animation Customization
Modify `utils/animations.ts` for custom GSAP animations:

```typescript
export const animations = {
  revealBullet: (element: HTMLElement, delay: number = 0) => {
    return gsap.fromTo(element, 
      { x: -50, opacity: 0 }, 
      { x: 0, opacity: 1, duration: 0.5, delay, ease: "power2.out" }
    );
  }
};
```

## 🌐 Deployment

### AWS Amplify (Recommended)
- Optimized for SSG with S3 asset hosting
- CloudFront CDN integration
- Environment variable support for S3 asset URLs

### Vercel/Netlify
- Direct deployment from Git repository
- Automatic builds on commits
- Built-in CDN and performance optimization

## 📊 Performance Features

- **Static Site Generation**: Pre-rendered for optimal load times
- **Lazy Loading**: Media assets load on demand
- **60fps Animations**: GSAP optimizations for smooth performance
- **Reduced Motion Support**: Accessibility compliance
- **Asset Optimization**: Compressed videos and optimized images

## 🎯 Future Enhancements

- [ ] Sketchfab 3D model integration for Fortis Soldier Pile
- [ ] Real-time Chart.js animations for cost comparisons
- [ ] S3 video asset integration with fallback images
- [ ] Contact form with DynamoDB backend
- [ ] QR code generation for partnerships
- [ ] Advanced touch/gesture navigation for tablets

## 🏗 Architecture Decisions

- **Spectacle over custom**: Leverages proven presentation framework
- **JSON content management**: Enables easy content updates without code changes
- **Custom navigation hook**: Provides precise control over bullet reveals and section transitions
- **Performance-first**: Optimized for 60fps animations and fast load times
- **Accessibility-ready**: Keyboard navigation and reduced motion support

## 📞 Contact & Partnership

**Post Tensioning Solutions LLC**
- Email: info@posttension.com
- Targeting: Shaun Thompson and industry decision-makers
- Focus: High-impact presentations for C-suite audiences

---

*"We Stress Excellence"* - Built with precision for infrastructure industry leaders. 