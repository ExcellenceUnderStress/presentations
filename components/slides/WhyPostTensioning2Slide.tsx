import React, { useEffect, useState, memo, useCallback, useRef } from "react";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryContainer, VictoryTheme } from "victory";
import { motion, AnimatePresence } from "framer-motion";

const WhyPostTensioning2Slide: React.FC<{ onPrev?: () => void; onNext?: () => void }> = memo(({ onPrev, onNext }) => {
  const [visibleItems, setVisibleItems] = useState(0);
  const timersRef = useRef<NodeJS.Timeout[]>([]);
  const mountedRef = useRef(true);

  // Cleanup function
  const cleanup = useCallback(() => {
    timersRef.current.forEach(timer => clearTimeout(timer));
    timersRef.current = [];
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      cleanup();
    };
  }, [cleanup]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" && onPrev) onPrev();
      if (e.key === "ArrowDown" && onNext) onNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onPrev, onNext]);

  useEffect(() => {
    cleanup(); // Clear any existing timers
    
    const timer = setInterval(() => {
      if (!mountedRef.current) return;
      setVisibleItems(prev => {
        if (prev < 5) {
          return prev + 1;
        }
        clearInterval(timer);
        return prev;
      });
    }, 500); // Faster animation

    timersRef.current.push(timer);
    return cleanup;
  }, [cleanup]);

  // Structural Advantages with performance metrics
  const structuralAdvantages = [
    { 
      advantage: "Thinner Slabs", 
      improvement: 40,
      description: "Reduced slab thickness",
      benefit: "More usable space & lower building height",
      color: "#3B82F6",
      icon: "📏",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-400/30"
    },
    { 
      advantage: "Longer Spans & Cantilevers", 
      improvement: 60,
      description: "Extended structural reach",
      benefit: "Greater design flexibility & open spaces",
      color: "#8B5CF6",
      icon: "🌉",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-400/30"
    },
    { 
      advantage: "Fewer Joints", 
      improvement: 75,
      description: "Reduced cracking & shrinking",
      benefit: "Enhanced durability & maintenance savings",
      color: "#10B981",
      icon: "🔗",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-400/30"
    },
    { 
      advantage: "Improved Durability", 
      improvement: 85,
      description: "Lower maintenance requirements",
      benefit: "Extended service life & cost savings",
      color: "#F59E0B",
      icon: "🛡️",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-400/30"
    },
    { 
      advantage: "Controlled Deflections", 
      improvement: 70,
      description: "Load balancing optimization",
      benefit: "Predictable structural performance",
      color: "#EF4444",
      icon: "⚖️",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-400/30"
    }
  ];

  const chartData = structuralAdvantages.map((item, index) => ({
    x: index + 1,
    y: index < visibleItems ? item.improvement : 0,
    label: item.advantage.split(' ')[0]
  }));

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(139,92,246,0.1),transparent_50%)]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center px-16 py-16">
        <div className="max-w-7xl mx-auto w-full">
          
          {/* Title Section */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
              Why Post-Tensioning Matters
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-purple-400 to-green-400 mx-auto mb-6"></div>
            <p className="text-2xl text-gray-300 font-light">
              Structural Advantages
            </p>
            <p className="text-lg text-gray-400 mt-4 max-w-3xl mx-auto">
              Post-tensioning enables superior structural performance and architectural freedom
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Enhanced Bar Chart */}
            <motion.div 
              className="flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <div className="bg-gray-800/30 rounded-2xl p-6 backdrop-blur-sm border border-gray-700/50">
                <h3 className="text-xl font-bold text-white mb-2 text-center">Structural Performance</h3>
                <p className="text-sm text-gray-400 mb-6 text-center">Improvement Over Traditional Methods</p>
                <VictoryChart
                  theme={VictoryTheme.material}
                  width={450}
                  height={320}
                  domainPadding={20}
                  containerComponent={<VictoryContainer responsive={false} />}
                  padding={{ left: 60, top: 20, right: 60, bottom: 80 }}
                >
                  <VictoryAxis
                    dependentAxis
                    tickFormat={(x) => `${x}%`}
                    style={{
                      axis: { stroke: "#6B7280" },
                      tickLabels: { fill: "#D1D5DB", fontSize: 12 },
                      grid: { stroke: "#374151", strokeDasharray: "3,3" }
                    }}
                  />
                  <VictoryAxis
                    tickFormat={(x) => structuralAdvantages[x-1]?.advantage.split(' ')[0] || ''}
                    style={{
                      axis: { stroke: "#6B7280" },
                      tickLabels: { fill: "#D1D5DB", fontSize: 9, angle: -45 },
                    }}
                  />
                  <VictoryBar
                    data={chartData}
                    x="x"
                    y="y"
                    style={{
                      data: { 
                        fill: ({ datum }) => {
                          const index = datum.x - 1;
                          return structuralAdvantages[index]?.color || "#3B82F6";
                        },
                        stroke: "#ffffff",
                        strokeWidth: 1
                      }
                    }}
                    animate={{
                      duration: 1000,
                      onLoad: { duration: 500 }
                    }}
                    cornerRadius={6}
                  />
                </VictoryChart>
              </div>
            </motion.div>

            {/* Enhanced Advantage Cards */}
            <div className="space-y-4">
              <AnimatePresence>
                {structuralAdvantages.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ 
                      opacity: index < visibleItems ? 1 : 0,
                      x: index < visibleItems ? 0 : 50
                    }}
                    transition={{ 
                      duration: 0.6,
                      delay: index * 0.15 // Reduced delay
                    }}
                    className={`${item.bgColor} ${item.borderColor} border-2 rounded-xl p-6 backdrop-blur-sm hover:scale-105 transition-transform duration-300`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div 
                          className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold text-white shadow-lg flex-shrink-0"
                          style={{ backgroundColor: item.color }}
                        >
                          {item.icon}
                        </div>
                        <div className="flex-1">
                          <div className="text-lg font-semibold text-white mb-1">
                            {item.advantage}
                          </div>
                          <div className="text-sm text-blue-300 font-medium mb-1">
                            {item.description}
                          </div>
                          <div className="text-xs text-gray-400 mb-3">
                            {item.benefit}
                          </div>
                          
                          {/* Performance Indicator */}
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-400">Performance:</span>
                            <span className="text-sm font-bold text-white">
                              +{item.improvement}%
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-center ml-4">
                        <div 
                          className="w-16 h-16 rounded-lg flex items-center justify-center text-2xl mb-2"
                          style={{ backgroundColor: `${item.color}20` }}
                        >
                          <div className="w-8 h-8 rounded-full" style={{ backgroundColor: item.color }}></div>
                        </div>
                        <div className="text-xs text-gray-400 text-center">#{index + 1}</div>
                      </div>
                    </div>
                    
                    {/* Enhanced Progress Indicator */}
                    <div className="mt-4 bg-gray-700/50 rounded-full h-2 overflow-hidden shadow-inner">
                      <motion.div
                        className="h-full rounded-full relative"
                        style={{ backgroundColor: item.color }}
                        initial={{ width: 0 }}
                        animate={{ 
                          width: index < visibleItems ? `${item.improvement}%` : 0 
                        }}
                        transition={{ 
                          duration: 1.0,
                          delay: index * 0.15 + 0.3,
                          ease: "easeOut"
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full"></div>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

WhyPostTensioning2Slide.displayName = "WhyPostTensioning2Slide";

export default WhyPostTensioning2Slide;
