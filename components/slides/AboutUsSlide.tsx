import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const AboutUsSlide: React.FC<{ onPrev?: () => void; onNext?: () => void }> = ({ onPrev, onNext }) => {
  const [yearCount, setYearCount] = useState(0);
  const [projectCount, setProjectCount] = useState(0);
  const [trustCount, setTrustCount] = useState(0);
  
  const numbersRef = useRef(null);
  const isInView = useInView(numbersRef, { once: true, margin: "-100px" });

  // Animated counter hook
  const useCounter = (end: number, duration: number = 2000, delay: number = 0) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      if (!isInView) return;
      
      const timer = setTimeout(() => {
        let startTime: number;
        const animate = (timestamp: number) => {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / duration, 1);
          
          // Easing function for smooth animation
          const easeOutQuart = 1 - Math.pow(1 - progress, 4);
          setCount(Math.floor(easeOutQuart * end));
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };
        requestAnimationFrame(animate);
      }, delay);
      
      return () => clearTimeout(timer);
    }, [isInView, end, duration, delay]);
    
    return count;
  };

  const yearCounter = useCounter(50, 2000, 800);
  const projectCounter = useCounter(200, 2200, 1000);
  const trustCounter = useCounter(100, 1800, 1200);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" && onPrev) onPrev();
      if (e.key === "ArrowDown" && onNext) onNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onPrev, onNext]);

  useEffect(() => {
    // Scroll-based parallax effect for particles
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const particles = document.querySelectorAll('.parallax-particle');
      particles.forEach((particle, index) => {
        const speed = 0.5 + (index % 3) * 0.2;
        (particle as HTMLElement).style.transform = `translateY(${scrolled * speed}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900"
      initial={{ opacity: 0, x: "100vw" }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: "-100vw" }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, #3b82f6 0%, transparent 50%),
                           radial-gradient(circle at 80% 80%, #1e40af 0%, transparent 50%),
                           radial-gradient(circle at 40% 20%, #2563eb 0%, transparent 50%)`
        }} />
      </div>
      
      {/* Scrollable Content Container */}
      <div className="relative z-10 h-full overflow-y-auto">
        <div className="min-h-full flex flex-col justify-center items-center px-8 py-16">
          <motion.div 
            className="text-center max-w-7xl mx-auto w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl font-black text-white mb-12 tracking-tight">
              Our Legacy
            </h2>
            
            {/* Who We Are Section */}
            <motion.div
              className="mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
                Who We Are
              </h3>
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {[
                  "Family-owned. Built from hands-on experience.",
                  "Real-world post-tensioning expertise.",
                  "Technical, safe, and reliable solutions.",
                  "We work directly with engineers, architects & contractors."
                ].map((point, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + (index * 0.1), duration: 0.6 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <p className="text-gray-200 text-lg leading-relaxed">{point}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Main content layout - Legacy numbers and States */}
            <div ref={numbersRef} className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
              {/* Legacy Numbers - Left Side */}
              <div className="flex-1 lg:flex-[2]">
                <div className="space-y-8">
                  {/* 50+ Years */}
                  <motion.div
                    className="group"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="relative">
                      <div className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-4">
                        {yearCounter}+
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                        Years of Excellence
                      </h3>
                      <p className="text-gray-400 text-lg">
                        Industry-leading expertise since 1972
                      </p>
                    </div>
                    {/* Animated accent line */}
                    <motion.div 
                      className="h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mt-4 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: isInView ? "100%" : 0 }}
                      transition={{ delay: 1.2, duration: 0.8 }}
                    />
                  </motion.div>
                  
                  {/* Global Projects */}
                  <motion.div
                    className="group"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0, duration: 0.6 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="relative">
                      <div className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-4">
                        {projectCounter}+
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                        Global Projects
                      </h3>
                      <p className="text-gray-400 text-lg">
                        From local highways to iconic structures
                      </p>
                    </div>
                    {/* Animated accent line */}
                    <motion.div 
                      className="h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mt-4 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: isInView ? "100%" : 0 }}
                      transition={{ delay: 1.4, duration: 0.8 }}
                    />
                  </motion.div>
                  
                  {/* Trusted Partner */}
                  <motion.div
                    className="group"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="relative">
                      <div className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-4">
                        {trustCounter}%
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                        Trusted Partner
                      </h3>
                      <p className="text-gray-400 text-lg">
                        By contractors, developers & DOTs
                      </p>
                    </div>
                    {/* Animated accent line */}
                    <motion.div 
                      className="h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mt-4 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: isInView ? "100%" : 0 }}
                      transition={{ delay: 1.6, duration: 0.8 }}
                    />
                  </motion.div>
                </div>
              </div>

              {/* States Licensed - Right Side */}
              <motion.div
                className="flex-1 lg:flex-[1] mt-8 lg:mt-0"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4, duration: 0.8 }}
              >
                <div className="bg-gradient-to-br from-blue-900/30 to-slate-800/30 p-6 rounded-2xl border border-blue-400/20 backdrop-blur-sm hover:border-blue-400/40 transition-all duration-300">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.6, duration: 0.6 }}
                  >
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
                      Licensed in
                    </h3>
                    
                    {/* States Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {['CA', 'TX', 'FL', 'WA', 'NV', 'AZ', 'OR', 'CO', 'UT', 'NM', 'ID', 'MT'].map((state, index) => (
                        <motion.div
                          key={state}
                          className="bg-blue-500/20 text-blue-200 px-3 py-2 rounded-lg text-center font-semibold border border-blue-400/30 hover:bg-blue-500/30 hover:border-blue-400/50 transition-all duration-200 cursor-pointer"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ 
                            delay: 1.8 + (index * 0.1),
                            duration: 0.4,
                            type: "spring",
                            stiffness: 100
                          }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {state}
                        </motion.div>
                      ))}
                    </div>
                    
                    <motion.div
                      className="text-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 3.0, duration: 0.6 }}
                    >
                      <p className="text-gray-400 text-sm mb-2">
                        Coast-to-Coast Coverage
                      </p>
                      <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                        12+ States
                      </div>
                    </motion.div>
                  </motion.div>
                  
                  {/* Animated accent line */}
                  <motion.div 
                    className="h-1 bg-gradient-to-r from-green-500 to-blue-500 mt-4 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 3.2, duration: 0.8 }}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Enhanced floating particles with parallax */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 bg-blue-400/20 rounded-full parallax-particle`}
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Navigation hint - Ready for next section */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center">
        <motion.div 
          className="w-8 h-8 flex items-center justify-center animate-bounce cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
          onClick={onNext}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
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

export default AboutUsSlide; 