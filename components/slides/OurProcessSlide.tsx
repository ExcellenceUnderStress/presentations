import React, { useEffect } from "react";
import { motion } from "framer-motion";

const OurProcessSlide: React.FC<{ onPrev?: () => void; onNext?: () => void }> = ({ onPrev, onNext }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" && onPrev) onPrev();
      if (e.key === "ArrowDown" && onNext) onNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onPrev, onNext]);

  const pillars = [
    {
      title: "Early Collaboration",
      icon: "🤝",
      desc: "We partner with owners, designers, and contractors from day one to maximize value and minimize risk."
    },
    {
      title: "Constructability Support",
      icon: "🧑‍💻",
      desc: "Practical consulting and design input ensure your project is buildable, efficient, and cost-effective."
    },
    {
      title: "Field-First Thinking",
      icon: "👷",
      desc: "Our solutions are grounded in real-world experience, prioritizing safety, speed, and quality in the field."
    }
  ];

  return (
    <motion.div
      className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-blue-900 via-slate-900 to-blue-900"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      {/* Animated background */}
      <div className="absolute inset-0 opacity-10">
        <motion.div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 60% 40%, #38bdf8 0%, transparent 60%)',
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <div className="relative z-10 h-full flex flex-col justify-center items-center px-8">
        <motion.div 
          className="text-center max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight">
            Our Process
          </h2>
          <p className="text-xl md:text-2xl text-blue-200 mb-16 max-w-3xl mx-auto">
            Built on partnership, practicality, and field expertise
          </p>
          <div className="grid md:grid-cols-3 gap-10">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                className="bg-gradient-to-br from-blue-800/30 to-slate-800/30 p-8 rounded-3xl border border-blue-400/20 backdrop-blur-sm flex flex-col items-center shadow-lg"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.2, duration: 0.7 }}
              >
                <motion.div
                  className="text-6xl mb-6"
                  animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                >
                  {pillar.icon}
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {pillar.title}
                </h3>
                <p className="text-blue-100 text-lg">
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      {/* Navigation hint */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center">
        <motion.div 
          className="w-8 h-8 flex items-center justify-center animate-bounce cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
          onClick={onNext}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-down">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline>
          </svg>
        </motion.div>
        <span className="text-xs text-white/70 mt-2">Continue</span>
      </div>
    </motion.div>
  );
};

export default OurProcessSlide; 