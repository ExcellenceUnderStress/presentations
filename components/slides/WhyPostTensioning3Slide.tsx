import React, { useEffect, useState, memo, useCallback, useRef } from "react";
import { VictoryArea, VictoryChart, VictoryAxis, VictoryContainer, VictoryTheme, VictoryScatter } from "victory";
import { motion, AnimatePresence } from "framer-motion";

const WhyPostTensioning3Slide: React.FC<{ onPrev?: () => void; onNext?: () => void }> = memo(({ onPrev, onNext }) => {
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
        if (prev < 4) {
          return prev + 1;
        }
        clearInterval(timer);
        return prev;
      });
    }, 600); // Balanced animation speed

    timersRef.current.push(timer);
    return cleanup;
  }, [cleanup]);

  // Design Flexibility & Site Compatibility with flexibility scores
  const designFlexibility = [
    { 
      feature: "Curved Geometries", 
      flexibility: 95,
      impact: 85,
      description: "Enables complex architectural forms",
      benefit: "Unlimited design creativity & aesthetic freedom",
      color: "#3B82F6",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-400/30",
      icon: "🎨"
    },
    { 
      feature: "Floor-to-Floor Height", 
      flexibility: 80,
      impact: 70,
      description: "Allows for more usable ceiling space",
      benefit: "Optimized space utilization & building efficiency",
      color: "#8B5CF6",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-400/30",
      icon: "📐"
    },
    { 
      feature: "Soft/Expansive Soils", 
      flexibility: 90,
      impact: 95,
      description: "Works well on challenging ground conditions",
      benefit: "Suitable for difficult sites & reduced foundation requirements",
      color: "#10B981",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-400/30",
      icon: "🌍"
    },
    { 
      feature: "Foundation Loads", 
      flexibility: 75,
      impact: 80,
      description: "Reduces structural demands on foundations",
      benefit: "Lower foundation costs & simplified construction",
      color: "#F59E0B",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-400/30",
      icon: "⚡"
    }
  ];

  // Create area chart data showing flexibility over time/complexity
  const areaData = [
    { x: 1, y: 20 },
    { x: 2, y: visibleItems >= 1 ? 45 : 20 },
    { x: 3, y: visibleItems >= 2 ? 65 : 20 },
    { x: 4, y: visibleItems >= 3 ? 80 : 20 },
    { x: 5, y: visibleItems >= 4 ? 95 : 20 }
  ];

  const scatterData = designFlexibility.map((item, index) => ({
    x: item.flexibility,
    y: item.impact,
    size: index < visibleItems ? 10 : 0,
    fill: item.color,
    label: item.feature.split(' ')[0]
  }));

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(16,185,129,0.1),transparent_50%)]"></div>
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
            <div className="w-32 h-1 bg-gradient-to-r from-green-400 to-amber-400 mx-auto mb-6"></div>
            <p className="text-2xl text-gray-300 font-light">
              Design Flexibility & Site Compatibility
            </p>
            <p className="text-lg text-gray-400 mt-4 max-w-3xl mx-auto">
              Post-tensioning adapts to any design vision and site condition
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Enhanced Charts Section */}
            <div className="space-y-8">
              {/* Area Chart - Flexibility Growth */}
              <motion.div 
                className="bg-gray-800/30 rounded-2xl p-6 backdrop-blur-sm border border-gray-700/50"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <h3 className="text-lg font-bold text-white mb-2 text-center">Design Freedom Growth</h3>
                <p className="text-xs text-gray-400 mb-4 text-center">Capability expansion over project complexity</p>
                <VictoryChart
                  theme={VictoryTheme.material}
                  width={400}
                  height={200}
                  containerComponent={<VictoryContainer responsive={false} />}
                  padding={{ left: 50, top: 20, right: 50, bottom: 40 }}
                >
                  <VictoryAxis
                    dependentAxis
                    tickFormat={(x) => `${x}%`}
                    style={{
                      axis: { stroke: "#6B7280" },
                      tickLabels: { fill: "#D1D5DB", fontSize: 10 },
                      grid: { stroke: "#374151", strokeDasharray: "2,2" }
                    }}
                  />
                  <VictoryAxis
                    tickFormat={(x) => `Level ${x}`}
                    style={{
                      axis: { stroke: "#6B7280" },
                      tickLabels: { fill: "#D1D5DB", fontSize: 9 },
                    }}
                  />
                  <VictoryArea
                    data={areaData}
                    x="x"
                    y="y"
                    style={{
                      data: { 
                        fill: "url(#gradient)",
                        fillOpacity: 0.6,
                        stroke: "#10B981",
                        strokeWidth: 3
                      }
                    }}
                    animate={{
                      duration: 1000,
                      onLoad: { duration: 500 }
                    }}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#10B981" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#10B981" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                </VictoryChart>
              </motion.div>

              {/* Scatter Plot - Flexibility vs Impact */}
              <motion.div 
                className="bg-gray-800/30 rounded-2xl p-6 backdrop-blur-sm border border-gray-700/50"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <h3 className="text-lg font-bold text-white mb-2 text-center">Flexibility vs Impact Matrix</h3>
                <p className="text-xs text-gray-400 mb-4 text-center">Design capability assessment</p>
                <VictoryChart
                  theme={VictoryTheme.material}
                  width={400}
                  height={200}
                  containerComponent={<VictoryContainer responsive={false} />}
                  padding={{ left: 50, top: 20, right: 50, bottom: 40 }}
                  domain={{ x: [60, 100], y: [60, 100] }}
                >
                  <VictoryAxis
                    dependentAxis
                    label="Impact Score"
                    style={{
                      axis: { stroke: "#6B7280" },
                      tickLabels: { fill: "#D1D5DB", fontSize: 10 },
                      axisLabel: { fill: "#D1D5DB", fontSize: 11 },
                      grid: { stroke: "#374151", strokeDasharray: "2,2" }
                    }}
                  />
                  <VictoryAxis
                    label="Flexibility Score"
                    style={{
                      axis: { stroke: "#6B7280" },
                      tickLabels: { fill: "#D1D5DB", fontSize: 10 },
                      axisLabel: { fill: "#D1D5DB", fontSize: 11 }
                    }}
                  />
                  <VictoryScatter
                    data={scatterData}
                    x="x"
                    y="y"
                    size={({ datum }) => datum.size}
                    style={{
                      data: { 
                        fill: ({ datum }) => datum.fill,
                        stroke: "#ffffff",
                        strokeWidth: 2
                      }
                    }}
                    animate={{
                      duration: 800,
                      onLoad: { duration: 400 }
                    }}
                  />
                </VictoryChart>
              </motion.div>
            </div>

            {/* Enhanced Feature Cards */}
            <div className="space-y-4">
              <AnimatePresence>
                {designFlexibility.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ 
                      opacity: index < visibleItems ? 1 : 0,
                      x: index < visibleItems ? 0 : 50
                    }}
                    transition={{ 
                      duration: 0.6,
                      delay: index * 0.2 // Reduced delay
                    }}
                    className={`${item.bgColor} ${item.borderColor} border-2 rounded-xl p-6 backdrop-blur-sm hover:scale-105 transition-transform duration-300`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <div 
                            className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold text-white shadow-lg"
                            style={{ backgroundColor: item.color }}
                          >
                            {item.icon}
                          </div>
                          <div>
                            <div className="text-lg font-semibold text-white">
                              {item.feature}
                            </div>
                            <div className="text-sm text-blue-300 font-medium">
                              {item.description}
                            </div>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <div className="text-xs text-gray-400 mb-2">
                            {item.benefit}
                          </div>
                        </div>
                        
                        {/* Enhanced Progress Bars */}
                        <div className="space-y-3">
                          <div className="flex justify-between text-xs text-gray-400">
                            <span>Design Flexibility</span>
                            <span className="font-bold text-white">{item.flexibility}%</span>
                          </div>
                          <div className="bg-gray-700/50 rounded-full h-2 overflow-hidden shadow-inner">
                            <motion.div
                              className="h-full rounded-full relative"
                              style={{ backgroundColor: item.color }}
                              initial={{ width: 0 }}
                              animate={{ 
                                width: index < visibleItems ? `${item.flexibility}%` : 0 
                              }}
                              transition={{ 
                                duration: 1.0,
                                delay: index * 0.2 + 0.3,
                                ease: "easeOut"
                              }}
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full"></div>
                            </motion.div>
                          </div>
                          
                          <div className="flex justify-between text-xs text-gray-400">
                            <span>Project Impact</span>
                            <span className="font-bold text-white">{item.impact}%</span>
                          </div>
                          <div className="bg-gray-700/50 rounded-full h-2 overflow-hidden shadow-inner">
                            <motion.div
                              className="h-full rounded-full relative opacity-75"
                              style={{ backgroundColor: item.color }}
                              initial={{ width: 0 }}
                              animate={{ 
                                width: index < visibleItems ? `${item.impact}%` : 0 
                              }}
                              transition={{ 
                                duration: 1.0,
                                delay: index * 0.2 + 0.5,
                                ease: "easeOut"
                              }}
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full"></div>
                            </motion.div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="ml-4">
                        <div 
                          className="w-16 h-16 rounded-lg flex flex-col items-center justify-center text-center p-2"
                          style={{ backgroundColor: `${item.color}15` }}
                        >
                          <div 
                            className="w-8 h-8 rounded-full mb-1"
                            style={{ backgroundColor: item.color }}
                          ></div>
                          <div className="text-xs text-gray-400">#{index + 1}</div>
                        </div>
                      </div>
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

WhyPostTensioning3Slide.displayName = "WhyPostTensioning3Slide";

export default WhyPostTensioning3Slide;
