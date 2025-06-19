import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

const HiddenDamageSlide: React.FC<{ onBack?: () => void; onNext?: () => void }> = ({ onBack, onNext }) => {
  const [currentSubscene] = useState(0);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const subscenes = [
    {
      title: "Hidden Damage, No Warning",
      subtitle: "Invisible problems escalating to crisis",
      content: [
        { label: "Cracks allow water intrusion, rusting tendons, tension loss" },
        { label: "Most crews avoid PT—wrong cuts risk deadly snapback" },
        { label: "Early detection and expert repair prevent irreversible damage" }
      ],
      visual: "👁️"
    }
  ];

  useEffect(() => {
    gsap.set(textRef.current, { width: "100%", x: 0 });
    gsap.set(imageRef.current, { width: "0%", opacity: 0, display: 'none' });
    setTimeout(() => {
      const tl = gsap.timeline();
      tl.to(textRef.current, {
        width: "30%",
        duration: 0.7,
        ease: "power3.inOut"
      })
      .set(imageRef.current, { display: 'flex' })
      .to(imageRef.current, {
        width: "70%",
        opacity: 1,
        duration: 0.7,
        ease: "power3.inOut"
      });
    }, 50);
  }, [currentSubscene]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAnimating) return;
      if ((e.keyCode === 8 || e.keyCode === 37) && onBack) {
        setIsAnimating(true);
        const tl = gsap.timeline({
          onComplete: () => {
            setIsAnimating(false);
            onBack();
          }
        });
        tl.to(imageRef.current, {
          width: "0%",
          opacity: 0,
          duration: 0.5,
          ease: "power3.inOut"
        })
        .to(textRef.current, {
          width: "100%",
          duration: 0.7,
          ease: "power3.inOut"
        })
        .set(imageRef.current, { display: 'none' });
      }
      if (e.keyCode === 39 && onNext) {
        setIsAnimating(true);
        const tl = gsap.timeline({
          onComplete: () => {
            setIsAnimating(false);
            onNext();
          }
        });
        tl.to(imageRef.current, {
          width: "0%",
          opacity: 0,
          duration: 0.5,
          ease: "power3.inOut"
        })
        .to(textRef.current, {
          width: "100%",
          duration: 0.7,
          ease: "power3.inOut"
        })
        .set(imageRef.current, { display: 'none' });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAnimating, onBack, onNext]);

  const current = subscenes[currentSubscene];

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-orange-900 via-red-900 to-orange-900">
      {/* Dynamic background pattern */}
      <div className="absolute inset-0 opacity-10">
        <motion.div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(251, 146, 60, 0.3) 0%, transparent 50%)',
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>
      {/* Back button */}
      <motion.button
        className="absolute top-8 left-8 z-40 flex items-center gap-2 text-white/80 hover:text-white transition-colors"
        onClick={onBack}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        <span className="text-sm">Back to Problems</span>
      </motion.button>
      {/* Main content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSubscene}
          className="relative z-10 h-full flex items-center justify-center px-8"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="max-w-6xl mx-auto flex gap-12 items-center h-full w-full">
            {/* Text container */}
            <div ref={textRef} className="flex flex-col justify-center h-full" style={{ minWidth: 0 }}>
              <div className="text-7xl mb-8">
                {current.visual}
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                {current.title}
              </h2>
              <p className="text-xl md:text-2xl text-orange-200 mb-8">
                {current.subtitle}
              </p>
              <ul className="space-y-4 mb-8">
                {current.content.map((item, index) => (
                  <li key={index} className="flex items-center text-lg text-orange-100">
                    <span className="mr-3 text-2xl">•</span> {item.label}
                  </li>
                ))}
              </ul>
            </div>
            {/* Media container */}
            <div ref={imageRef} className="flex flex-col items-center justify-center h-full overflow-hidden" style={{ minWidth: 0, width: 0 }}>
              <div className="text-6xl">
                {current.visual}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      {/* Navigation hint */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-white/50 text-sm">Press ESC to return • → to continue</p>
      </div>
    </div>
  );
};

export default HiddenDamageSlide; 