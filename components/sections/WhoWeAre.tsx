import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

// List of state codes to highlight
const HIGHLIGHTED_STATES = [
  'NV', // Nevada
  'ID', // Idaho
  'UT', // Utah
  'WA', // Washington
  'OR', // Oregon
  'AZ', // Arizona
  'FL', // Florida
];

// Simple SVG US map with highlighted states (for demo; replace with detailed SVG as needed)
const USMapSVG = ({ highlighted = [] }: { highlighted: string[] }) => (
  <svg viewBox="0 0 960 600" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
    {/* Example: Replace with a detailed SVG or react-simple-maps for production */}
    {/* Here, just a placeholder for the highlighted states */}
    {/* Nevada */}
    <rect x="120" y="250" width="60" height="80" fill={highlighted.includes('NV') ? 'url(#grad)' : '#222'} stroke="#fff" strokeWidth="2" />
    {/* Idaho */}
    <rect x="140" y="170" width="40" height="70" fill={highlighted.includes('ID') ? 'url(#grad)' : '#222'} stroke="#fff" strokeWidth="2" />
    {/* Utah */}
    <rect x="160" y="270" width="40" height="60" fill={highlighted.includes('UT') ? 'url(#grad)' : '#222'} stroke="#fff" strokeWidth="2" />
    {/* Washington */}
    <rect x="120" y="120" width="60" height="40" fill={highlighted.includes('WA') ? 'url(#grad)' : '#222'} stroke="#fff" strokeWidth="2" />
    {/* Oregon */}
    <rect x="120" y="170" width="60" height="60" fill={highlighted.includes('OR') ? 'url(#grad)' : '#222'} stroke="#fff" strokeWidth="2" />
    {/* Arizona */}
    <rect x="160" y="340" width="40" height="50" fill={highlighted.includes('AZ') ? 'url(#grad)' : '#222'} stroke="#fff" strokeWidth="2" />
    {/* Florida */}
    <rect x="700" y="400" width="60" height="80" fill={highlighted.includes('FL') ? 'url(#grad)' : '#222'} stroke="#fff" strokeWidth="2" />
    {/* Gradient definition */}
    <defs>
      <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="100%" stopColor="#6366f1" />
      </linearGradient>
    </defs>
  </svg>
);

interface WhoWeAreProps {
  revealStep?: number; // For progressive reveal if needed
}

const WhoWeAre: React.FC<WhoWeAreProps> = ({ revealStep = 0 }) => {
  const controls = useAnimation();

  useEffect(() => {
    // Animate map down and shrink as revealStep increases
    if (revealStep > 0) {
      controls.start({
        y: 120,
        scale: 0.6,
        transition: { duration: 0.9, ease: [0.4, 0, 0.2, 1] },
      });
    } else {
      controls.start({
        y: 0,
        scale: 1,
        transition: { duration: 0.9, ease: [0.4, 0, 0.2, 1] },
      });
    }
  }, [revealStep, controls]);

  return (
    <section className="presentation-section bg-transparent flex flex-col items-center justify-center relative">
      {/* Animated Map */}
      <motion.div
        initial={{ y: 0, scale: 1 }}
        animate={controls}
        className="w-full max-w-2xl mx-auto drop-shadow-2xl"
        style={{ background: 'transparent' }}
      >
        <USMapSVG highlighted={HIGHLIGHTED_STATES} />
        {/* Animated gradient overlay for infographic effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 2, mixBlendMode: 'screen' }}
          animate={{ opacity: [0.7, 0.4, 0.7] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        >
          <svg width="100%" height="100%">
            <defs>
              <radialGradient id="pulse" cx="50%" cy="50%" r="80%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.1" />
              </radialGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#pulse)" />
          </svg>
        </motion.div>
      </motion.div>
      {/* Other slide content goes here, revealed after map animates down */}
      <div className="relative z-10 mt-12 w-full max-w-3xl text-center">
        {/* Example: Replace with your actual content and progressive reveal logic */}
        {revealStep > 0 && (
          <>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Who We Are</h2>
            <p className="text-lg md:text-xl text-gray-200 mb-6">
              Licensed in Nevada, Idaho, Utah, Washington, Oregon, Arizona, and Florida.<br />
              Delivering excellence across the West and Southeast.
            </p>
          </>
        )}
      </div>
    </section>
  );
};

export default WhoWeAre; 