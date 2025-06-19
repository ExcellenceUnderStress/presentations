import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

const WhyPtFailsSlide: React.FC<{ onBack?: () => void; onNext?: () => void }> = ({ onBack, onNext }) => {
  const [currentSubscene, setCurrentSubscene] = useState(0);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const subscenes = [
    {
      title: "Concrete Cutting",
      subtitle: "Cutting through tendons without proper planning",
      content: [
        { label: "Uncontrolled cutting operations" },
        { label: "Failure to identify tendon locations" },
        { label: "Emergency cuts without engineering oversight" },
        { label: "Results in structural instability" }
      ],
      visual: "✂️",
      image: "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/RustedButtonHead.jpg"
    },
    {
      title: "Core Drilling",
      subtitle: "The most common cause of tendon failure",
      content: [
        { label: "Accidental drilling into live tendons during construction" },
        { label: "Lack of proper scanning before drilling operations" },
        { label: "Inadequate protection protocols on job sites" },
        { label: "Can cause immediate catastrophic failure" }
      ],
      visual: "⚡",
      image: "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/rusted+out+barrier+2.JPG"
    },
    {
      title: "Slab Attachments",
      subtitle: "Improper attachment methods causing damage",
      content: [
        { label: "Drilling into tendons for attachment points" },
        { label: "Heavy equipment anchoring without scanning" },
        { label: "Retrofit installations without proper planning" },
        { label: "Mechanical fasteners penetrating PT systems" }
      ],
      visual: "🔗",
      image: "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/RustedButtonHead.jpg"
    },
    {
      title: "Failing Grout Pockets",
      subtitle: "Inadequate protection and corrosion",
      content: [
        { label: "Poor grouting during initial installation" },
        { label: "Water infiltration over time" },
        { label: "Chemical exposure weakening protection" },
        { label: "Progressive deterioration of strand integrity" }
      ],
      visual: "🌊",
      image: "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/SpallingMain.jpg"
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
      if ((e.keyCode === 8 || e.keyCode === 37)) {
        if (currentSubscene > 0) {
          setIsAnimating(true);
          const tl = gsap.timeline({
            onComplete: () => {
              setIsAnimating(false);
              setCurrentSubscene(currentSubscene - 1);
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
        } else {
          setIsAnimating(true);
          const tl = gsap.timeline({
            onComplete: () => {
              setIsAnimating(false);
              if (onBack) onBack();
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
      }
      if (e.keyCode === 39) {
        if (currentSubscene < subscenes.length - 1) {
          setIsAnimating(true);
          const tl = gsap.timeline({
            onComplete: () => {
              setIsAnimating(false);
              setCurrentSubscene(currentSubscene + 1);
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
        } else if (onNext) {
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
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSubscene, isAnimating, onBack, onNext]);

  const current = subscenes[currentSubscene];

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-red-900 via-orange-900 to-red-900">
      {/* Dynamic background pattern */}
      <div className="absolute inset-0 opacity-10">
        <motion.div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(239, 68, 68, 0.3) 0%, transparent 50%)',
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
      {/* Main content with subscene animation */}
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
              <p className="text-xl md:text-2xl text-red-200 mb-8">
                {current.subtitle}
              </p>
              <ul className="space-y-4 mb-8">
                {current.content.map((item, index) => (
                  <li key={index} className="flex items-center text-lg text-red-100">
                    <span className="mr-3 text-2xl">•</span> {item.label}
                  </li>
                ))}
              </ul>
            </div>
            {/* Media container */}
            <div ref={imageRef} className="flex flex-col items-center justify-center h-full overflow-hidden" style={{ minWidth: 0, width: 0 }}>
              {current.image ? (
                <div className="w-full">
                  <img
                    src={current.image}
                    alt={`${current.title} - PT failure example`}
                    className="w-full h-80 object-cover object-center rounded-xl border-2 border-red-400/30"
                    draggable="false"
                  />
                  <p className="text-red-200 text-sm text-center mt-2">
                    {current.title === "Core Drilling" && "Rusted barrier cable from drilling damage"}
                    {current.title === "Concrete Cutting" && "Corroded buttonhead from improper cutting"}
                    {current.title === "Slab Attachments" && "Corroded buttonhead from attachment damage"}
                    {current.title === "Failing Grout Pockets" && "Concrete spalling from failing grout pockets"}
                  </p>
                </div>
              ) : (
                <div className="text-6xl">
                  {current.visual}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      {/* Subscene navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex items-center gap-8">
        {/* Left arrow */}
        <motion.button
          className={`w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 transition-all ${
            currentSubscene === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/20 cursor-pointer'
          }`}
          onClick={() => currentSubscene > 0 && setCurrentSubscene(currentSubscene - 1)}
          disabled={currentSubscene === 0}
          whileHover={{ scale: currentSubscene === 0 ? 1 : 1.1 }}
          whileTap={{ scale: currentSubscene === 0 ? 1 : 0.95 }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </motion.button>
        {/* Dots indicator */}
        <div className="flex gap-2">
          {subscenes.map((_, index) => (
            <motion.div
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSubscene ? 'bg-red-400 w-8' : 'bg-white/30'
              }`}
              animate={{ scale: index === currentSubscene ? 1.2 : 1 }}
            />
          ))}
        </div>
        {/* Right arrow */}
        <motion.button
          className={`w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 transition-all ${
            (currentSubscene === subscenes.length - 1 && !onNext) ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/20 cursor-pointer'
          }`}
          onClick={() => {
            if (currentSubscene < subscenes.length - 1) {
              setCurrentSubscene(currentSubscene + 1);
            } else if (onNext) {
              onNext();
            }
          }}
          disabled={currentSubscene === subscenes.length - 1 && !onNext}
          whileHover={{ scale: (currentSubscene === subscenes.length - 1 && !onNext) ? 1 : 1.1 }}
          whileTap={{ scale: (currentSubscene === subscenes.length - 1 && !onNext) ? 1 : 0.95 }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </motion.button>
      </div>
      {/* Navigation hint */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-white/50 text-sm">Use ← → arrows to explore • ESC to return</p>
      </div>
    </div>
  );
};

export default WhyPtFailsSlide; 