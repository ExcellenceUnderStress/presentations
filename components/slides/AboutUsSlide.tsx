import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const AboutUsSlide: React.FC<{ onPrev?: () => void; onNext?: () => void; onCaseStudiesClick?: () => void }> = ({ onPrev, onNext, onCaseStudiesClick }) => {
  const numbersRef = useRef(null);
  const isInView = useInView(numbersRef, { once: true, margin: "-100px" });

  // Simplified counter hook
  const useCounter = (end: number, duration: number = 1500, delay: number = 0) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      const timer = setTimeout(() => {
        let startTime: number;
        const animate = (timestamp: number) => {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / duration, 1);
          
          setCount(Math.floor(progress * end));
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };
        requestAnimationFrame(animate);
      }, delay);
      
      return () => clearTimeout(timer);
    }, [end, duration, delay]);
    
    return count;
  };

  const yearCounter = useCounter(75, 1500, 500);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" && onPrev) onPrev();
      if (e.key === "ArrowDown" && onNext) onNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onPrev, onNext]);

  return (
    <motion.div
      className="relative w-full h-screen overflow-hidden bg-slate-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* Minimal background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, #334155 0%, transparent 70%)`
        }} />
      </div>
      
      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center px-8">
        <motion.div 
          className="text-center max-w-7xl mx-auto w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-12 tracking-tight">
            Our Legacy
          </h2>
          
          {/* Main content layout - Three sections */}
          <div ref={numbersRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Years Counter - Left */}
            <div className="lg:col-span-3 flex justify-center lg:justify-end">
              <motion.div
                className="text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <div className="text-6xl md:text-8xl lg:text-9xl font-bold text-slate-200 mb-4">
                  {yearCounter}+
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-slate-300 mb-4">
                  Years of Experience
                </h3>
                <motion.div 
                  className="h-1 bg-slate-600 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: isInView ? "100%" : 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                />
              </motion.div>
            </div>

            {/* Video Section - Center (Larger) */}
            <motion.div
              className="lg:col-span-6 flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <div className="relative">
                {/* Video Container - Larger */}
                <div className="relative w-80 h-[480px] lg:w-96 lg:h-[576px] rounded-lg overflow-hidden border border-slate-700 shadow-xl">
                  <video
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster="/api/placeholder/384/576"
                  >
                    <source src="https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/videos/fordcommercial.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  
                  {/* Subtle video overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent pointer-events-none" />
                </div>
              </div>
            </motion.div>

            {/* States & Data - Right */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <div className="bg-slate-800/80 p-6 lg:p-8 rounded-lg border border-slate-600 backdrop-blur-sm">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                >
                  <h3 className="text-2xl md:text-3xl font-semibold text-white mb-6 text-center">
                    Licensed In
                  </h3>
                  
                  {/* Stats */}
                  <div className="text-center mb-6">
                    <div className="text-4xl md:text-5xl font-bold text-slate-200 mb-2">
                      7+
                    </div>
                    <p className="text-slate-400 text-lg font-medium">
                      States
                    </p>
                  </div>
                  
                  {/* States Grid */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {['WA', 'OR', 'ID', 'MT', 'NV', 'AZ', 'CO', 'UT', 'FL'].map((state, index) => (
                      <motion.div
                        key={state}
                        className="bg-slate-700 text-slate-200 px-3 py-2 rounded text-center font-medium border border-slate-600 hover:bg-slate-600 transition-colors duration-200"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ 
                          delay: 1.0 + (index * 0.02),
                          duration: 0.3
                        }}
                      >
                        {state}
                      </motion.div>
                    ))}
                  </div>
                  
                  <motion.div
                    className="text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                  >
                    <div className="text-lg font-medium text-slate-300">
                      Partnering with <br />
                      Contractors, Engineers, and Architects Across the US
                    </div>
                  </motion.div>
                </motion.div>
                
                {/* Simple accent line */}
                <motion.div 
                  className="h-1 bg-slate-600 mt-6 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1.4, duration: 0.6 }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Navigation buttons */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4 z-30">
        {onPrev && (
          <motion.button
            onClick={onPrev}
            className="px-6 py-3 bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-700/70 transition-all font-semibold border border-slate-600 hover:border-slate-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            ← Back
          </motion.button>
        )}
        
        {onCaseStudiesClick && (
          <motion.button
            onClick={onCaseStudiesClick}
            className="px-6 py-3 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-all font-semibold border border-blue-500/30 hover:border-blue-400/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.5 }}
          >
            View Case Studies →
          </motion.button>
        )}
        
        {onNext && (
          <motion.button
            onClick={onNext}
            className="px-6 py-3 bg-emerald-600/20 text-emerald-400 rounded-lg hover:bg-emerald-600/30 transition-all font-semibold border border-emerald-500/30 hover:border-emerald-400/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7, duration: 0.5 }}
          >
            Our Process →
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default AboutUsSlide; 