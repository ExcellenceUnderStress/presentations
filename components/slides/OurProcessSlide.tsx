import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const OurProcessSlide: React.FC<{ onPrev?: () => void; onNext?: () => void }> = ({ onPrev, onNext }) => {
  const [activeStep, setActiveStep] = useState(0);

  const timelineSteps = [
    {
      title: "Early Involvement",
      subtitle: "Avoids Costly Changes",
      icon: "🚀",
      desc: "We partner with owners, designers, and contractors from day one to maximize value and minimize risk.",
      color: "from-emerald-500 to-teal-600",
      position: "left"
    },
    {
      title: "Design for Constructability",
      subtitle: "Smart Engineering",
      icon: "🏗️",
      desc: "Practical consulting and design input ensure your project is buildable, efficient, and cost-effective.",
      color: "from-blue-500 to-cyan-600",
      position: "right"
    },
    {
      title: "Direct Problem-Solving",
      subtitle: "Honest Communication",
      icon: "🎯",
      desc: "Transparent, straightforward approach to challenges with solutions that work in the real world.",
      color: "from-purple-500 to-indigo-600",
      position: "left"
    },
    {
      title: "Field-Proven Advice",
      subtitle: "Years of Experience",
      icon: "👷",
      desc: "Our solutions are grounded in real-world experience, prioritizing safety, speed, and quality in the field.",
      color: "from-orange-500 to-red-600",
      position: "right"
    }
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" && onPrev) onPrev();
      if (e.key === "ArrowDown" && onNext) onNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onPrev, onNext]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % timelineSteps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [timelineSteps.length]);

  return (
    <motion.div
      className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
    >
      {/* Dynamic flowing background */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute inset-0 opacity-20"
          style={{
            background: 'radial-gradient(ellipse at center, #3b82f6 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute inset-0 opacity-10"
          style={{
            background: 'conic-gradient(from 0deg, #8b5cf6, #06b6d4, #10b981, #f59e0b, #8b5cf6)',
          }}
          animate={{
            rotate: [0, 360],
          }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 md:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
            How We Approach
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Every Project
          </h3>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative max-w-6xl w-full">
          {/* Central Timeline Line */}
          <motion.div 
            className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-400 via-purple-500 to-orange-500 rounded-full"
            style={{ height: '600px', top: '0' }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.8, duration: 1.5, ease: "easeOut" }}
          />

          {/* Flowing particles along timeline */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full shadow-lg"
            animate={{
              y: [0, 600, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ top: '0', marginLeft: '-4px' }}
          />

          {/* Timeline Steps */}
          <div className="relative" style={{ height: '600px' }}>
            {timelineSteps.map((step, index) => (
              <motion.div
                key={index}
                className={`absolute w-full flex items-center ${
                  step.position === 'left' ? 'justify-start' : 'justify-end'
                }`}
                style={{ 
                  top: `${(index * 150) + 50}px`,
                }}
                initial={{ 
                  opacity: 0, 
                  x: step.position === 'left' ? -100 : 100,
                  scale: 0.8
                }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  scale: activeStep === index ? 1.05 : 1
                }}
                transition={{ 
                  delay: 1.2 + (index * 0.3), 
                  duration: 0.8,
                  type: "spring",
                  stiffness: 100
                }}
              >
                {/* Timeline Node */}
                <motion.div
                  className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 border-white shadow-lg z-20 ${
                    activeStep === index ? 'bg-yellow-400' : 'bg-blue-500'
                  }`}
                  animate={{
                    scale: activeStep === index ? [1, 1.3, 1] : 1,
                    boxShadow: activeStep === index 
                      ? ['0 0 0 0 rgba(59, 130, 246, 0.7)', '0 0 0 20px rgba(59, 130, 246, 0)', '0 0 0 0 rgba(59, 130, 246, 0)']
                      : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                  transition={{ duration: 2, repeat: activeStep === index ? Infinity : 0 }}
                />

                {/* Content Card */}
                <motion.div
                  className={`${
                    step.position === 'left' ? 'mr-8 pr-12' : 'ml-8 pl-12'
                  } max-w-md`}
                >
                  <motion.div
                    className={`bg-gradient-to-br ${step.color} p-6 rounded-2xl shadow-2xl backdrop-blur-sm border border-white/20 ${
                      activeStep === index ? 'ring-4 ring-white/30' : ''
                    }`}
                    whileHover={{ 
                      scale: 1.02,
                      rotateY: step.position === 'left' ? 5 : -5,
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div
                      className="text-4xl mb-3"
                      animate={{ 
                        rotate: activeStep === index ? [0, 10, -10, 0] : 0,
                        scale: activeStep === index ? [1, 1.1, 1] : 1
                      }}
                      transition={{ duration: 2, repeat: activeStep === index ? Infinity : 0 }}
                    >
                      {step.icon}
                    </motion.div>
                    <h4 className="text-xl font-bold text-white mb-1">
                      {step.title}
                    </h4>
                    <p className="text-sm font-medium text-white/80 mb-3">
                      {step.subtitle}
                    </p>
                    <p className="text-white/90 text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Progress Indicator */}
        <motion.div 
          className="mt-8 flex space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.5 }}
        >
          {timelineSteps.map((_, index) => (
            <motion.div
              key={index}
              className={`w-3 h-3 rounded-full ${
                activeStep === index ? 'bg-yellow-400' : 'bg-white/30'
              }`}
              animate={{
                scale: activeStep === index ? [1, 1.2, 1] : 1,
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </motion.div>
      </div>

      {/* Navigation hint */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center">
        <motion.div 
          className="w-8 h-8 flex items-center justify-center animate-bounce cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 0.5 }}
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
