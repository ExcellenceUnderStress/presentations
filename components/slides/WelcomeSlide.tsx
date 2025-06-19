import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

const WelcomeSlide: React.FC<{ onNext?: () => void }> = ({ onNext }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const welcomeRef = useRef<HTMLDivElement>(null);
  const companyRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const promptRef = useRef<HTMLDivElement>(null);
  
  const [showPrompt, setShowPrompt] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    // GSAP animation timeline for content
    const tl = gsap.timeline({ delay: 0.5 });
    
    // Fade in animations with staggered timing
    tl.fromTo(welcomeRef.current, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    )
    .fromTo(companyRef.current, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, 
      "-=0.5"
    )
    .fromTo(taglineRef.current, 
      { opacity: 0, scale: 0.8 }, 
      { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)" }, 
      "-=0.3"
    )
    .fromTo(descriptionRef.current, 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, 
      "-=0.2"
    );

    // Pulsing animation for tagline
    gsap.to(taglineRef.current, {
      scale: 1.05,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });

    // Show prompt after 3 seconds
    const promptTimer = setTimeout(() => {
      setShowPrompt(true);
      gsap.fromTo(promptRef.current, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
    }, 3000);

    return () => clearTimeout(promptTimer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && onNext) onNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onNext]);

  const handleVideoError = () => {
    setVideoError(true);
  };

  return (
    <motion.div
      className="relative overflow-hidden bg-black w-full h-screen"
      initial={{ opacity: 1, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Video Background with Fallback */}
      <div className="absolute inset-0 z-0">
        {!videoError ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            poster="/api/placeholder/1920/1080"
            onError={handleVideoError}
          >
            <source
              src="https://post-tension-assets-2025.s3.amazonaws.com/videos/drone-shot-of-cars-driving-into-seattle-on-the-mai-2024-01-04-15-08-45-utc.mp4"
              type="video/mp4"
            />
          </video>
        ) : (
          <img
            src="/Officejpg.jpg"
            alt="Office Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        {/* Enhanced dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/70 z-10" />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center max-w-6xl mx-auto h-full flex flex-col justify-center px-8">
        <div className="space-y-8">
          {/* Welcome Message */}
          <div ref={welcomeRef} className="opacity-0">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-100 tracking-wide">
              Welcome, <span className="text-blue-400 font-semibold">Shaun Thompson</span>
            </h1>
          </div>

          {/* Company Name */}
          <div ref={companyRef} className="opacity-0">
            <h2 className="text-5xl md:text-7xl lg:text-9xl font-black text-white tracking-tight leading-tight">
              Post Tensioning
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600">
                Solutions LLC
              </span>
            </h2>
          </div>

          {/* Tagline with Pulsing Animation */}
          <div ref={taglineRef} className="opacity-0">
            <div className="flex items-center justify-center gap-6 mb-8">
              <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent w-20 md:w-32"></div>
              <p className="text-2xl md:text-3xl lg:text-4xl text-blue-400 font-bold italic tracking-wide">
                We Stress Excellence
              </p>
              <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent w-20 md:w-32"></div>
            </div>
          </div>

          {/* Description */}
          <div ref={descriptionRef} className="opacity-0">
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-200 max-w-4xl mx-auto leading-relaxed font-light">
              Innovative solutions for your projects.
            </p>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mt-4 leading-relaxed">
              Join the elite tier of infrastructure innovation where precision meets excellence.
            </p>
          </div>
        </div>
      </div>

      {/* Ambient particles effect */}
      <div className="absolute inset-0 z-15 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Navigation Prompt - Shows after 3 seconds */}
      {showPrompt && (
        <div ref={promptRef} className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center opacity-0">
          <div className="w-10 h-10 flex items-center justify-center animate-bounce cursor-pointer bg-blue-500/20 rounded-full backdrop-blur-sm border border-blue-400/30" onClick={onNext}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
          <span className="text-sm text-white/80 mt-3 font-medium">Press → to continue</span>
        </div>
      )}
    </motion.div>
  );
};

export default WelcomeSlide; 