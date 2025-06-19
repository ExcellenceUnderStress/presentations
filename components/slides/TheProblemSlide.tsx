import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CriticalSlide: React.FC<{ onPrev?: () => void; onSilentRisksClick?: () => void; onHiddenDamageClick?: () => void; onNext?: () => void }> = ({ onPrev, onSilentRisksClick, onHiddenDamageClick, onNext }) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [selectedCard, setSelectedCard] = useState<number>(0);
  const [galleryMode, setGalleryMode] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (galleryMode) return;
      if (e.key === "ArrowUp" && onPrev) onPrev();
      if (e.key === "ArrowDown" && onNext) onNext();
      if (e.key === "ArrowLeft") {
        setSelectedCard(prev => Math.max(0, prev - 1));
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setGalleryMode(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onPrev, onNext, galleryMode, selectedCard]);

  const riskFactors = [
    {
      title: "Silent Risks, Catastrophic Failures",
      subtitle: "Hidden dangers with devastating consequences",
      gradient: "from-red-500 to-orange-600",
      bgGradient: "from-red-900/20 to-orange-900/20",
      delay: 0.8,
      onClick: onSilentRisksClick
    },
    {
      title: "Hidden Damage, No Warning",
      subtitle: "Invisible problems escalating to crisis",
      gradient: "from-orange-500 to-red-600",
      bgGradient: "from-orange-900/20 to-red-900/20",
      delay: 1.0,
      onClick: onHiddenDamageClick
    }
  ];

  const galleryImages = [
    { src: "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/concretecuttersfailure.jpg", label: "Cutter Fail" },
    { src: "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/concretecuttersfailure2.jpg", label: "Cutter Fail 2" },
    { src: "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/blowoutmain.png", label: "Blowout" },
    { src: "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/framersnailmain.png", label: "Framer Nail" },
    { src: "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/coredrillmain.png", label: "Core Drill" },
    { src: "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/groutpocketsfailing.jpg", label: "Grout Pocket" },
    { src: "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/slabfaliures.jpg", label: "Slab Failure" },
  ];

  return (
    <motion.div
      className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-red-900 via-orange-900 to-red-900"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      {/* Dynamic background */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, #ef4444 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, #f97316 0%, transparent 50%)",
              "radial-gradient(circle at 50% 50%, #eab308 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, #ef4444 0%, transparent 50%)",
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </div>
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center px-8">
        <motion.div
          className="text-center max-w-7xl mx-auto w-full flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: galleryMode ? -180 : 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={{ pointerEvents: galleryMode ? 'none' : 'auto' }}
        >
          <h2 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tight">
            Why
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400"> Post-Tension Repair </span>
            Is Critical
          </h2>
        </motion.div>
        {/* Cards or Gallery */}
        {!galleryMode ? (
          <motion.div 
            className="w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            {/* Risk factor cards - 3D perspective grid */}
            <div className="grid lg:grid-cols-2 gap-8 md:gap-10 perspective-1000 max-w-4xl mx-auto mt-8">
              {riskFactors.map((factor, index) => (
                <motion.div
                  key={index}
                  className="relative transform-gpu"
                  initial={{ opacity: 0, rotateY: -90, z: -100 }}
                  animate={{ 
                    opacity: 1, 
                    rotateY: 0, 
                    z: 0,
                    rotateX: hoveredCard === index || selectedCard === index ? -5 : 0,
                    scale: hoveredCard === index || selectedCard === index ? 1.05 : 1,
                  }}
                  transition={{ 
                    delay: factor.delay, 
                    duration: 0.8,
                    type: "spring",
                    stiffness: 100
                  }}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className={`relative bg-gradient-to-br ${factor.bgGradient} p-8 rounded-3xl border backdrop-blur-sm h-full transform transition-all duration-300 ${
                    selectedCard === index ? 'border-red-400/50' : 'border-red-500/20'
                  }`}>
                    <h3 className={`text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${factor.gradient} mb-2`}>
                      {factor.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="w-full flex flex-col items-center justify-start mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
              {galleryImages.map((img, idx) => (
                <motion.div
                  key={img.src}
                  className="aspect-square w-full h-auto flex items-center justify-center overflow-hidden rounded-none border-none bg-transparent shadow-none group"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 + idx * 0.1, duration: 0.6 }}
                >
                  <img
                    src={img.src}
                    alt={img.label}
                    className="object-cover w-full h-full select-none pointer-events-auto"
                    draggable={false}
                    style={{ aspectRatio: '1 / 1' }}
                  />
                  <span className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-black/70 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                    {img.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default CriticalSlide; 