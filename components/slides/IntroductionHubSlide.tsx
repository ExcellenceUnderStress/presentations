import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface IntroductionHubSlideProps {
  onPrev?: () => void;
  onOverviewClick?: () => void;
  onAboutUsClick?: () => void;
  onInnovationClick?: () => void;
}

const IntroductionHubSlide: React.FC<IntroductionHubSlideProps> = ({ 
  onPrev, 
  onOverviewClick, 
  onAboutUsClick, 
  onInnovationClick 
}) => {
  const [hoveredPath, setHoveredPath] = useState<number | null>(null);

  const navigationPaths = [
    {
      title: "Overview & Intro to PT",
      subtitle: "Understanding Post-Tensioning",
      icon: "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/overview.svg",
      description: "Learn the fundamentals, benefits, common challenges, and see real-world applications of post-tensioning technology.",
      highlights: ["Why Post-Tensioning?", "Common Failures", "Case Studies", "Economics & Benefits"],
      color: "from-blue-500 to-cyan-600",
      bgColor: "from-blue-900/20 to-cyan-900/20",
      borderColor: "border-blue-500/20",
      hoverBorderColor: "border-blue-400/50",
      onClick: onOverviewClick
    },
    {
      title: "About Us",
      subtitle: "Our Expertise & Approach",
      icon: "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/aboutus.svg",
      description: "Discover our process, comprehensive solutions, industry recognition, and proven track record of success.",
      highlights: ["Our Process", "Core Solutions", "Awards & Recognition", "Success Stories"],
      color: "from-emerald-500 to-teal-600",
      bgColor: "from-emerald-900/20 to-teal-900/20",
      borderColor: "border-emerald-500/20",
      hoverBorderColor: "border-emerald-400/50",
      onClick: onAboutUsClick
    },
    {
      title: "Innovation & Specialty",
      subtitle: "Cutting-Edge Solutions",
      icon: "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/innovation.svg",
      description: "Explore our breakthrough innovations, specialty systems, and advanced engineering solutions.",
      highlights: ["Fortis Soldier Pile", "Barrier Cable Systems", "Advanced Repairs", "Custom Engineering"],
      color: "from-purple-500 to-indigo-600",
      bgColor: "from-purple-900/20 to-indigo-900/20",
      borderColor: "border-purple-500/20",
      hoverBorderColor: "border-purple-400/50",
      onClick: onInnovationClick
    }
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" && onPrev) onPrev();
      if (e.key === "1" && onOverviewClick) onOverviewClick();
      if (e.key === "2" && onAboutUsClick) onAboutUsClick();
      if (e.key === "3" && onInnovationClick) onInnovationClick();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onPrev, onOverviewClick, onAboutUsClick, onInnovationClick]);

  return (
    <motion.div
      className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.3),transparent_50%)]"></div>
      </div>

      <div className="relative z-10 h-full flex flex-col justify-center items-center px-8 pt-20">
        <motion.div 
          className="text-center max-w-7xl mx-auto w-full"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Header */}
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
            Choose Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-purple-400"> Path</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 mb-16 max-w-4xl mx-auto">
            Customize this presentation to focus on what matters most to you.
            <br />
            <span className="text-lg text-gray-500"></span>
          </p>

          {/* Navigation Cards */}
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {navigationPaths.map((path, index) => (
              <motion.div
                key={index}
                className={`relative bg-gradient-to-br ${path.bgColor} p-8 rounded-3xl border ${
                  hoveredPath === index ? path.hoverBorderColor : path.borderColor
                } backdrop-blur-sm cursor-pointer transition-all duration-300 group`}
                initial={{ opacity: 0, y: 30, rotateY: -15 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  rotateY: 0,
                  scale: hoveredPath === index ? 1.05 : 1,
                  z: hoveredPath === index ? 50 : 0
                }}
                transition={{ 
                  delay: 0.4 + index * 0.2, 
                  duration: 0.8,
                  type: "spring",
                  stiffness: 100 
                }}
                onMouseEnter={() => setHoveredPath(index)}
                onMouseLeave={() => setHoveredPath(null)}
                onClick={path.onClick}
                whileHover={{ y: -10 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Path Number */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-gray-800 to-gray-700 rounded-full flex items-center justify-center border-2 border-gray-600">
                  <span className="text-white font-bold text-sm">{index + 1}</span>
                </div>

                {/* Icon */}
                <div className="mb-6 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                  <img 
                    src={path.icon} 
                    alt={`${path.title} icon`}
                    className="w-16 h-16 object-contain"
                  />
                </div>

                {/* Title */}
                <h3 className={`text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${path.color} mb-3`}>
                  {path.title}
                </h3>
                
                <p className="text-lg text-gray-300 mb-6">
                  {path.subtitle}
                </p>

                <p className="text-gray-400 mb-6 leading-relaxed">
                  {path.description}
                </p>

                {/* Highlights */}
                <div className="space-y-2">
                  {path.highlights.map((highlight, highlightIndex) => (
                    <motion.div
                      key={highlightIndex}
                      className="flex items-center text-sm text-gray-300"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.2 + highlightIndex * 0.1 }}
                    >
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${path.color} mr-3`}></div>
                      {highlight}
                    </motion.div>
                  ))}
                </div>

                {/* Hover effect overlay */}
                <div className={`absolute inset-0 bg-gradient-to-r ${path.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-300`}></div>
              </motion.div>
            ))}
          </div>

          {/* Instructions */}
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <p className="text-gray-500 text-lg">
              Click a path or press <span className="text-blue-400 font-bold">1</span>, <span className="text-emerald-400 font-bold">2</span>, or <span className="text-purple-400 font-bold">3</span> to begin
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Badge Navigation Indicator */}
      <motion.div
        className="absolute top-20 left-1/2 transform -translate-x-1/2 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.8 }}
      >
        <div className="text-gray-500 text-sm mb-2">
          Track your progress with the badge navigation above
        </div>
        <motion.div
          className="w-12 h-0.5 bg-gradient-to-r from-blue-400 via-emerald-400 to-purple-400 mx-auto"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        />
      </motion.div>
    </motion.div>
  );
};

export default IntroductionHubSlide; 