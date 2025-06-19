import React, { useEffect } from "react";
import { motion } from "framer-motion";

const CoreSolutionsSlide: React.FC<{ 
  onPrev?: () => void; 
  onRepairClick?: () => void; 
  onBarrierClick?: () => void;
  onInnovationsClick?: () => void;
  onSafetyClick?: () => void;
  onNext?: () => void 
}> = ({ onPrev, onRepairClick, onBarrierClick, onInnovationsClick, onSafetyClick, onNext }) => {

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" && onPrev) onPrev();
      if (e.key === "ArrowDown" && onNext) onNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onPrev, onNext]);

  const solutions = [
    {
      title: "Repair & Retrofit",
      subtitle: "Extending Life, Ensuring Safety",
      features: ["Live scanning", "Strand replacement", "Corrosion mitigation"],
      gradient: "from-emerald-500 to-emerald-600",
      bgGradient: "from-emerald-900/20 to-emerald-900/20",
      delay: 0.8,
      onClick: onRepairClick
    },
    {
      title: "Barrier Cable Systems",
      subtitle: "Engineered Safety Solutions",
      features: ["In-house manufacturing", "Load testing", "Custom design"],
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-900/20 to-blue-900/20",
      delay: 1.0,
      onClick: onBarrierClick
    },
    {
      title: "Innovations",
      subtitle: "Advanced Engineering Solutions",
      features: ["Fortis Pile system", "Clamshell Blockout", "Re-anchor blocks"],
      gradient: "from-purple-500 to-purple-600",
      bgGradient: "from-purple-900/20 to-purple-900/20",
      delay: 1.2,
      onClick: onInnovationsClick
    },
    {
      title: "Safety",
      subtitle: "Industry-Leading Standards",
      features: ["PTI certified members", "Silica management", "Best practices"],
      gradient: "from-yellow-500 to-orange-600",
      bgGradient: "from-yellow-900/20 to-orange-900/20",
      delay: 1.4,
      onClick: onSafetyClick
    }
  ];

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
            Core
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400"> Innovative </span>
            Solutions
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 mb-16 max-w-3xl mx-auto">
            Full-service value proposition with confidence
          </p>
          {/* Solutions cards - 2x2 grid for 4 items */}
          <div className="grid lg:grid-cols-2 gap-8 md:gap-10 max-w-5xl mx-auto">
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                className="relative cursor-pointer transform transition-transform hover:scale-105"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: solution.delay, duration: 0 }}
                onClick={solution.onClick}
              >
                <div className={`relative bg-gradient-to-br ${solution.bgGradient} p-8 rounded-3xl border border-white/10 backdrop-blur-sm h-full hover:border-white/20 transition-all`}>
                  <h3 className={`text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${solution.gradient} mb-2`}>
                    {solution.title}
                  </h3>
                  <p className="text-gray-400 text-lg mb-6">
                    {solution.subtitle}
                  </p>
                  <ul className="space-y-3">
                    {solution.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="text-gray-300 flex items-center"
                      >
                        <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${solution.gradient} mr-3`}></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CoreSolutionsSlide; 