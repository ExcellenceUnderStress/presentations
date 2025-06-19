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

  // Chart data for Traditional vs Post-Tensioned comparison
  const chartData = [
    {
      category: "Concrete Use",
      traditional: { value: 100, label: "100%" },
      pt: { value: 75, label: "75%" },
      improvement: "25% Less"
    },
    {
      category: "Rebar Use", 
      traditional: { value: 100, label: "100%" },
      pt: { value: 35, label: "35%" },
      improvement: "65% Less"
    },
    {
      category: "Span Length",
      traditional: { value: 60, label: "30 ft" },
      pt: { value: 100, label: "50+ ft" },
      improvement: "67% More"
    },
    {
      category: "Timeline",
      traditional: { value: 100, label: "16 mo" },
      pt: { value: 35, label: "6 mo" },
      improvement: "65% Faster"
    }
  ];

  const keyBullets = [
    "Allows curves, long spans, and cantilevers", 
    "Maximizes floor-to-ceiling height",
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

          {/* Main Content Grid - 3 Column Layout */}
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Center: Key Bullets */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <div className="space-y-6">
                {keyBullets.map((bullet, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-4 bg-slate-800/30 p-4 rounded-xl border border-gray-600/30"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 + (index * 0.2), duration: 0.6 }}
                  >
                    <div className="text-3xl">🎨</div>
                    <div>
                      <p className="text-lg text-white font-medium leading-relaxed">{bullet}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Side: Full-Size Charts */}
            <div className="lg:col-span-6">
              <div className="space-y-6">
                {/* Charts Grid - Full Size */}
                <div className="grid grid-cols-2 gap-6">
                  
                  {/* Concrete Use Chart */}
                  <motion.div
                    className="bg-gradient-to-br from-slate-800/50 to-blue-900/30 p-6 rounded-2xl border border-blue-500/20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.4, duration: 0.6 }}
                  >
                    <h4 className="text-xl font-bold text-white mb-4 text-center">Concrete Use</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">Traditional</span>
                        <span className="text-gray-400">100%</span>
                      </div>
                      <div className="bg-gray-600 h-4 rounded-lg relative overflow-hidden">
                        <motion.div 
                          className="bg-gray-500 h-full rounded-lg"
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ delay: 2.0, duration: 1 }}
                        />
                      </div>
                      
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-blue-300">Post-Tensioned</span>
                        <span className="text-blue-400">75%</span>
                      </div>
                      <div className="bg-gray-600 h-4 rounded-lg relative overflow-hidden">
                        <motion.div 
                          className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full rounded-lg"
                          initial={{ width: 0 }}
                          animate={{ width: "75%" }}
                          transition={{ delay: 2.2, duration: 1 }}
                        />
                      </div>
                    </div>
                    <div className="text-center mt-3">
                      <span className="text-green-400 font-semibold text-sm">25% Less</span>
                    </div>
                  </motion.div>

                  {/* Rebar Use Chart */}
                  <motion.div
                    className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 p-6 rounded-2xl border border-purple-500/20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.6, duration: 0.6 }}
                  >
                    <h4 className="text-xl font-bold text-white mb-4 text-center">Rebar Use</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">Traditional</span>
                        <span className="text-gray-400">100%</span>
                      </div>
                      <div className="bg-gray-600 h-4 rounded-lg relative overflow-hidden">
                        <motion.div 
                          className="bg-gray-500 h-full rounded-lg"
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ delay: 2.4, duration: 1 }}
                        />
                      </div>
                      
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-purple-300">Post-Tensioned</span>
                        <span className="text-purple-400">35%</span>
                      </div>
                      <div className="bg-gray-600 h-4 rounded-lg relative overflow-hidden">
                        <motion.div 
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-lg"
                          initial={{ width: 0 }}
                          animate={{ width: "35%" }}
                          transition={{ delay: 2.6, duration: 1 }}
                        />
                      </div>
                    </div>
                    <div className="text-center mt-3">
                      <span className="text-green-400 font-semibold text-sm">65% Less</span>
                    </div>
                  </motion.div>

                  {/* Span Length Chart */}
                  <motion.div
                    className="bg-gradient-to-br from-slate-800/50 to-emerald-900/30 p-6 rounded-2xl border border-emerald-500/20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.8, duration: 0.6 }}
                  >
                    <h4 className="text-xl font-bold text-white mb-4 text-center">Span Length</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">Traditional</span>
                        <span className="text-gray-400">30 ft</span>
                      </div>
                      <div className="bg-gray-600 h-4 rounded-lg relative overflow-hidden">
                        <motion.div 
                          className="bg-gray-500 h-full rounded-lg"
                          initial={{ width: 0 }}
                          animate={{ width: "60%" }}
                          transition={{ delay: 2.8, duration: 1 }}
                        />
                      </div>
                      
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-emerald-300">Post-Tensioned</span>
                        <span className="text-emerald-400">50+ ft</span>
                      </div>
                      <div className="bg-gray-600 h-4 rounded-lg relative overflow-hidden">
                        <motion.div 
                          className="bg-gradient-to-r from-emerald-500 to-green-500 h-full rounded-lg"
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ delay: 3.0, duration: 1 }}
                        />
                      </div>
                    </div>
                    <div className="text-center mt-3">
                      <span className="text-green-400 font-semibold text-sm">67% More</span>
                    </div>
                  </motion.div>

                  {/* Timeline Chart */}
                  <motion.div
                    className="bg-gradient-to-br from-slate-800/50 to-orange-900/30 p-6 rounded-2xl border border-orange-500/20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2.0, duration: 0.6 }}
                  >
                    <h4 className="text-xl font-bold text-white mb-4 text-center">Timeline</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">Traditional</span>
                        <span className="text-gray-400">16 mo</span>
                      </div>
                      <div className="bg-gray-600 h-4 rounded-lg relative overflow-hidden">
                        <motion.div 
                          className="bg-gray-500 h-full rounded-lg"
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ delay: 3.2, duration: 1 }}
                        />
                      </div>
                      
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-orange-300">Post-Tensioned</span>
                        <span className="text-orange-400">6 mo</span>
                      </div>
                      <div className="bg-gray-600 h-4 rounded-lg relative overflow-hidden">
                        <motion.div 
                          className="bg-gradient-to-r from-orange-500 to-red-500 h-full rounded-lg"
                          initial={{ width: 0 }}
                          animate={{ width: "35%" }}
                          transition={{ delay: 3.4, duration: 1 }}
                        />
                      </div>
                    </div>
                    <div className="text-center mt-3">
                      <span className="text-green-400 font-semibold text-sm">65% Faster</span>
                    </div>
                  </motion.div>
                </div>

                {/* Summary Text */}
                <motion.div
                  className="bg-slate-800/30 p-4 rounded-xl border border-gray-600/30"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 3.8, duration: 0.6 }}
                >
                  <p className="text-sm text-gray-400 text-center">
                    PT systems outperform in every critical metric executives care about: speed, cost, risk, and longevity.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WhyPostTensioningSlide; 