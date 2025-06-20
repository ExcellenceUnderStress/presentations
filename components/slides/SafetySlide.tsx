import React, { useEffect } from "react";
import { motion } from "framer-motion";

const SafetySlide: React.FC<{ 
  onBack?: () => void; 
  onNext?: () => void;
  onRestartClick?: () => void;
  onFailuresClick?: () => void;
  onCaseStudiesClick?: () => void;
  onFinishClick?: () => void;
}> = ({ onBack, onNext, onRestartClick, onFailuresClick, onCaseStudiesClick, onFinishClick }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && onBack) onBack();
      if (e.key === "ArrowDown" && onNext) onNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onBack, onNext]);

  const safetyFeatures = [
    {
      title: "PTI Certified Members",
      points: [
        "Level 1 & 2 certified technicians",
        "Continuous education programs",
        "Industry-leading expertise"
      ],
      icon: "🏆"
    },
    {
      title: "Silica & Dust Management",
      points: [
        "Advanced vacuum systems", ],
      icon: "🌬️"
    },
  ];

  return (
    <motion.div
      className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-yellow-900/10 to-orange-900/10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(251, 191, 36, 0.1) 40px, rgba(251, 191, 36, 0.1) 80px)`,
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center px-8">
        <motion.div 
          className="text-center max-w-7xl mx-auto w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
            Safety
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500"> First</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 mb-16 max-w-3xl mx-auto">
            Industry-leading safety standards protecting people and projects
          </p>

          {/* Safety Features Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-5xl mx-auto">
            {safetyFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 p-8 rounded-2xl border border-yellow-500/20 hover:border-orange-400/40 transition-all"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{feature.icon}</div>
                  <div className="flex-1 text-left">
                    <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-4">
                      {feature.title}
                    </h3>
                    <ul className="space-y-2">
                      {feature.points.map((point, pointIndex) => (
                        <li key={pointIndex} className="text-gray-300 flex items-center">
                          <span className="w-2 h-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 mr-3"></span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation Options */}
          {(onRestartClick || onFailuresClick || onCaseStudiesClick || onFinishClick) && (
            <motion.div
              className="flex justify-center gap-4 flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              {onRestartClick && (
                <button
                  onClick={onRestartClick}
                  className="px-6 py-3 bg-purple-600/20 text-purple-400 rounded-lg hover:bg-purple-600/30 transition-all font-semibold border border-purple-500/30 hover:border-purple-400/50"
                >
                  ↻ Restart
                </button>
              )}
              {onFailuresClick && (
                <button
                  onClick={onFailuresClick}
                  className="px-6 py-3 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-all font-semibold border border-red-500/30 hover:border-red-400/50"
                >
                  View Failures →
                </button>
              )}
              {onCaseStudiesClick && (
                <button
                  onClick={onCaseStudiesClick}
                  className="px-6 py-3 bg-teal-600/20 text-teal-400 rounded-lg hover:bg-teal-600/30 transition-all font-semibold border border-teal-500/30 hover:border-teal-400/50"
                >
                  Case Studies →
                </button>
              )}
              {onFinishClick && (
                <button
                  onClick={onFinishClick}
                  className="px-6 py-3 bg-green-600/20 text-green-400 rounded-lg hover:bg-green-600/30 transition-all font-semibold border border-green-500/30 hover:border-green-400/50"
                >
                  Finish Presentation
                </button>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Navigation buttons - always visible at bottom */}
      {(onBack || onNext) && (
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4 z-30">
          {onBack && (
            <button
              onClick={onBack}
              className="px-6 py-3 bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-700/70 transition-all font-semibold border border-slate-600 hover:border-slate-500"
            >
              ← Back
            </button>
          )}
          {onNext && (
            <button
              onClick={onNext}
              className="px-6 py-3 bg-yellow-600/20 text-yellow-400 rounded-lg hover:bg-yellow-600/30 transition-all font-semibold border border-yellow-500/30 hover:border-yellow-400/50"
            >
              Continue to Dust Management →
            </button>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default SafetySlide; 