import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Section {
  title: string;
  features: string[];
  gradient: string;
  bgGradient: string;
  action: () => void;
}

const CriticalSlide: React.FC<{ 
  onPrev?: () => void; 
  onNext?: () => void;
  onNavigateToRepair?: () => void;
  onNavigateToFailures?: () => void;
}> = ({ onPrev, onNext, onNavigateToRepair, onNavigateToFailures }) => {
  const [state, setState] = useState(0); // 0: Title only, 1: Cards
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const sections: Section[] = [
    {
      title: "Reasons Why Tendons Break/Fail",
      features: ["Core drill strikes", "Accidental tendon cuts", "Grout pocket failures", "Long-term corrosion issues"],
      gradient: "from-red-500 to-orange-600",
      bgGradient: "from-red-900/20 to-orange-900/20",
      action: () => {
        if (onNavigateToFailures) {
          onNavigateToFailures();
        }
      },
    },
    {
      title: "Our Repair Services",
      features: ["Full tendon replacements", "Anchor pocket repairs", "Epoxy crack injection", "Load testing and tendon stressing"],
      gradient: "from-orange-500 to-red-600",
      bgGradient: "from-orange-900/20 to-red-900/20",
      action: () => {
        if (onNavigateToRepair) {
          onNavigateToRepair();
        }
      },
    }
  ];

  const handleSectionClick = (section: Section) => {
    section.action();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        if (state === 0) {
          setState(1); // Show cards
        } else if (state === 1 && onNext) {
          onNext(); // Go to next slide
        }
        e.preventDefault();
      } else if (e.key === 'ArrowLeft') {
        if (state === 1) {
          setState(0); // Back to title
        } else if (state === 0 && onPrev) {
          onPrev(); // Previous slide
        }
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
          {/* Title */}
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
                  className="relative cursor-pointer group"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0, duration: 0 }}
                  onClick={() => handleSectionClick(section)}
                  onMouseEnter={() => setSelectedSection(section.title)}
                  onMouseLeave={() => setSelectedSection(null)}
                >
                  <div className={`relative bg-gradient-to-br ${section.bgGradient} p-8 rounded-3xl border border-white/10 backdrop-blur-sm h-full transition-all duration-300 group-hover:border-white/30 group-hover:scale-105 ${
                    selectedSection === section.title ? 'ring-2 ring-white/20' : ''
                  }`}>
                    <h3 className={`text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${section.gradient} mb-6`}>
                      {section.title}
                    </h3>
                    <ul className="space-y-3">
                      {section.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="text-gray-300 text-lg group-hover:text-white transition-colors duration-200"
                        >
                          • {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 text-sm text-gray-400 group-hover:text-gray-300">
                      Click to explore →
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CriticalSlide; 