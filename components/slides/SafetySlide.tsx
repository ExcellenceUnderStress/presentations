import React, { useEffect } from "react";
import { motion } from "framer-motion";

const SafetySlide: React.FC<{ onBack?: () => void; onNext?: () => void }> = ({ onBack, onNext }) => {
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

          {/* Bottom message */}
          <motion.p
            className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >

          </motion.p>

         
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SafetySlide; 