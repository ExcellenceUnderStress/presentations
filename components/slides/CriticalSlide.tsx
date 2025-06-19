import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const CriticalSlide: React.FC<{ onPrev?: () => void; onNext?: () => void }> = ({ onPrev, onNext }) => {
  const [state, setState] = useState(0); // 0: Title only, 1: Cards, 2: Gallery
  const containerRef = useRef<HTMLDivElement>(null);

  const sections = [
    {
      title: "Common Failures We Fix",
      features: ["Core drill strikes", "Improper slab cuts", "Grout pocket failures", "Long-term corrosion issues"],
      gradient: "from-red-500 to-orange-600",
      bgGradient: "from-red-900/20 to-orange-900/20",
    },
    {
      title: "Our Repair Services",
      features: ["Full tendon replacements", "Anchor pocket repairs", "Epoxy crack injection", "Load testing and tendon stressing"],
      gradient: "from-orange-500 to-red-600",
      bgGradient: "from-orange-900/20 to-red-900/20",
    }
  ];

  const galleryImages = [
    { url: 'https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/concrete+cutter+failures.jpg', tooltip: 'Cutter Fail' },
    { url: 'https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/Blowout+1.jpg', tooltip: 'Blowout' },
    { url: 'https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/Blowout+2.jpg', tooltip: 'Blowout' },
    { url: 'https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/rusted+out+barrier+2.JPG', tooltip: 'Rusted Barrier' },
    { url: 'https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/RustedButtonHead.jpg', tooltip: 'Rusted Head' },
    { url: 'https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/SpallingMain.jpg', tooltip: 'Spalling' },
    { url: 'https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/Torn+Strand+2.jpg', tooltip: 'Torn Strand' },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        if (state < 2) {
          setState(prev => prev + 1);
        } else if (state === 2 && onNext) {
          onNext();
        }
        e.preventDefault();
      } else if (e.key === 'ArrowLeft' && state > 0) {
        setState(prev => prev - 1);
        e.preventDefault();
      } else if (e.key === 'ArrowLeft' && state === 0 && onPrev) {
        onPrev();
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state, onPrev, onNext]);

  return (
    <motion.div
      className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0 }}
    >
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center px-8">
        <motion.div 
          className="text-center max-w-7xl mx-auto w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0, duration: 0 }}
        >
          <h2 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tight">
            Why
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-red-400"> Post-Tension Repair </span>
            Is Critical
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 mb-16 max-w-3xl mx-auto">
            Understanding Tendon Failures
          </p>

          {/* Cards Section */}
          {state === 1 && (
            <div className="grid lg:grid-cols-2 gap-8 md:gap-10">
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  className="relative"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0, duration: 0 }}
                >
                  <div className={`relative bg-gradient-to-br ${section.bgGradient} p-8 rounded-3xl border border-white/10 backdrop-blur-sm h-full`}>
                    <h3 className={`text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${section.gradient} mb-6`}>
                      {section.title}
                    </h3>
                    <ul className="space-y-3">
                      {section.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="text-gray-300 text-lg"
                        >
                          • {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Gallery Section */}
          {state === 2 && (
            <div className="grid grid-cols-3 gap-2 w-full max-w-6xl">
              {galleryImages.map((img, index) => (
                <div key={index} className="relative aspect-square">
                  <img
                    src={img.url}
                    alt={`Critical issue ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg shadow-md"
                  />
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CriticalSlide; 