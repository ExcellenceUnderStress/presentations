import React, { useEffect } from "react";
import { motion } from "framer-motion";

const WhyPostTensioningSlide: React.FC<{ onPrev?: () => void; onNext?: () => void }> = ({ onPrev, onNext }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" && onPrev) onPrev();
      if (e.key === "ArrowDown" && onNext) onNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onPrev, onNext]);

  // Material & Cost Efficiency Stats
  const materialStats = [
    { icon: "🏗️", stat: "25%", label: "Less Concrete", color: "from-blue-500 to-cyan-500" },
    { icon: "⚡", stat: "65%", label: "Less Reinforcing Steel", color: "from-purple-500 to-pink-500" },
    { icon: "📉", stat: "30%", label: "Reduction in Building Mass", color: "from-green-500 to-emerald-500" }
  ];

  // Structural Advantages
  const structuralAdvantages = [
    { icon: "📏", text: "Thinner slabs", color: "text-blue-400" },
    { icon: "🌉", text: "Longer spans & cantilevers", color: "text-purple-400" },
    { icon: "🔧", text: "Fewer joints, reduced cracking/shrinking", color: "text-green-400" },
    { icon: "🛡️", text: "Improved durability & lower maintenance", color: "text-orange-400" },
    { icon: "⚖️", text: "Controlled deflections (load balancing)", color: "text-cyan-400" }
  ];

  // Design Flexibility & Site Compatibility
  const designFlexibility = [
    { icon: "🎨", text: "Enables curved geometries", color: "text-pink-400" },
    { icon: "📐", text: "More floor-to-floor height", color: "text-indigo-400" },
    { icon: "🌍", text: "Works well on soft or expansive soils", color: "text-yellow-400" },
    { icon: "🏗️", text: "Reduces foundation loads", color: "text-red-400" }
  ];

  return (
    <motion.div
      className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900"
      initial={{ opacity: 0, y: "100vh" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "-100vh" }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center px-8 py-16">
        <div className="max-w-7xl mx-auto w-full">
          
          {/* Title Section */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Why Post-Tensioning Matters
            </h2>
            <p className="text-xl md:text-2xl text-gray-400">
              Build smarter. Perform longer. Save millions.
            </p>
          </motion.div>

          {/* Main Content - Three Section Layout */}
          <div className="space-y-12">
            
            {/* Material & Cost Efficiency Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-3">
                  <span className="text-3xl">💰</span>
                  Material & Cost Efficiency
                </h3>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {materialStats.map((item, index) => (
                  <motion.div
                    key={index}
                    className="bg-gradient-to-br from-slate-800/60 to-slate-900/40 p-6 rounded-2xl border border-gray-600/30 text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.0 + (index * 0.2), duration: 0.6 }}
                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  >
                    <div className="text-4xl mb-3">{item.icon}</div>
                    <div className={`text-4xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent mb-2`}>
                      {item.stat}
                    </div>
                    <div className="text-white font-medium text-lg">{item.label}</div>
                    
                    {/* Animated progress bar */}
                    <div className="mt-4 bg-gray-700 h-2 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${item.color} rounded-full`}
                        initial={{ width: 0 }}
                        animate={{ width: `${100 - parseInt(item.stat)}%` }}
                        transition={{ delay: 1.5 + (index * 0.2), duration: 1.2, ease: "easeOut" }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Structural Advantages Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-3">
                  <span className="text-3xl">🏗️</span>
                  Structural Advantages
                </h3>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {structuralAdvantages.map((item, index) => (
                  <motion.div
                    key={index}
                    className="bg-slate-800/40 p-4 rounded-xl border border-gray-600/20 flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 2.2 + (index * 0.1), duration: 0.5 }}
                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                  >
                    <div className="text-2xl">{item.icon}</div>
                    <div className={`text-sm font-medium ${item.color}`}>{item.text}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Design Flexibility & Site Compatibility Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.8, duration: 0.8 }}
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-3">
                  <span className="text-3xl">🎯</span>
                  Design Flexibility & Site Compatibility
                </h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                {designFlexibility.map((item, index) => (
                  <motion.div
                    key={index}
                    className="bg-slate-800/40 p-4 rounded-xl border border-gray-600/20 flex items-center gap-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 3.2 + (index * 0.1), duration: 0.5 }}
                    whileHover={{ x: -5, transition: { duration: 0.2 } }}
                  >
                    <div className="text-2xl">{item.icon}</div>
                    <div className={`text-sm font-medium ${item.color}`}>{item.text}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Summary Call-to-Action */}
            <motion.div
              className="text-center bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-8 rounded-2xl border border-blue-500/20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 3.8, duration: 0.8 }}
            >
              <h4 className="text-xl font-bold text-white mb-3">The Bottom Line</h4>
              <p className="text-gray-300 text-lg leading-relaxed max-w-4xl mx-auto">
                Post-tensioning delivers measurable improvements across every metric that matters: 
                <span className="text-green-400 font-semibold"> reduced material costs</span>, 
                <span className="text-blue-400 font-semibold"> enhanced structural performance</span>, and 
                <span className="text-purple-400 font-semibold"> unprecedented design freedom</span>.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WhyPostTensioningSlide;
