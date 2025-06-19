import React, { useEffect, useState, memo } from "react";
import { VictoryArea, VictoryChart, VictoryAxis, VictoryContainer, VictoryTheme, VictoryScatter } from "victory";
import { motion, AnimatePresence } from "framer-motion";

const WhyPostTensioning3Slide: React.FC<{ onPrev?: () => void; onNext?: () => void }> = memo(({ onPrev, onNext }) => {
  const [visibleItems, setVisibleItems] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" && onPrev) onPrev();
      if (e.key === "ArrowDown" && onNext) onNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onPrev, onNext]);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleItems(prev => {
        if (prev < 4) {
          return prev + 1;
        }
        return prev;
      });
    }, 700);

    return () => clearInterval(timer);
  }, []);

  // Design Flexibility & Site Compatibility with flexibility scores
  const designFlexibility = [
    { 
      feature: "Curved Geometries", 
      flexibility: 95,
      impact: 85,
      color: "#3B82F6",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-400/30",
      description: "Complex architectural forms"
    },
    { 
      feature: "Floor-to-Floor Height", 
      flexibility: 80,
      impact: 70,
      color: "#8B5CF6",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-400/30",
      description: "Optimized space utilization"
    },
    { 
      feature: "Soft/Expansive Soils", 
      flexibility: 90,
      impact: 95,
      color: "#10B981",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-400/30",
      description: "Challenging ground conditions"
    },
    { 
      feature: "Foundation Loads", 
      flexibility: 75,
      impact: 80,
      color: "#F59E0B",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-400/30",
      description: "Reduced structural demands"
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
    size: index < visibleItems ? 8 : 0,
    fill: item.color
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
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Victory Charts */}
            <div className="space-y-8">
              {/* Area Chart - Flexibility Growth */}
              <motion.div 
                className="bg-gray-800/30 rounded-2xl p-6 backdrop-blur-sm border border-gray-700/50"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <h3 className="text-lg font-bold text-white mb-4 text-center">Design Flexibility Growth</h3>
                <VictoryChart
                  theme={VictoryTheme.material}
                  width={400}
                  height={200}
                  containerComponent={<VictoryContainer responsive={false} />}
                  padding={{ left: 50, top: 20, right: 50, bottom: 40 }}
                  animate={false}
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
                    style={{
                      axis: { stroke: "#6B7280" },
                      tickLabels: { fill: "#D1D5DB", fontSize: 10 },
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
                <h3 className="text-lg font-bold text-white mb-4 text-center">Flexibility vs Impact</h3>
                <VictoryChart
                  theme={VictoryTheme.material}
                  width={400}
                  height={200}
                  containerComponent={<VictoryContainer responsive={false} />}
                  padding={{ left: 50, top: 20, right: 50, bottom: 40 }}
                  domain={{ x: [60, 100], y: [60, 100] }}
                  animate={false}
                >
                  <VictoryAxis
                    dependentAxis
                    label="Impact Score"
                    style={{
                      axis: { stroke: "#6B7280" },
                      tickLabels: { fill: "#D1D5DB", fontSize: 10 },
                      axisLabel: { fill: "#D1D5DB", fontSize: 12 },
                      grid: { stroke: "#374151", strokeDasharray: "2,2" }
                    }}
                  />
                  <VictoryAxis
                    label="Flexibility Score"
                    style={{
                      axis: { stroke: "#6B7280" },
                      tickLabels: { fill: "#D1D5DB", fontSize: 10 },
                      axisLabel: { fill: "#D1D5DB", fontSize: 12 }
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
                  />
                </VictoryChart>
              </motion.div>
            </div>

            {/* Feature Cards */}
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
                      delay: index * 0.25
                    }}
                    className={`${item.bgColor} ${item.borderColor} border-2 rounded-xl p-6 backdrop-blur-sm`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <div 
                            className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold text-white"
                            style={{ backgroundColor: item.color }}
                          >
                            {index + 1}
                          </div>
                          <div>
                            <div className="text-lg font-semibold text-white">
                              {item.feature}
                            </div>
                            <div className="text-sm text-gray-300">
                              {item.description}
                            </div>
                          </div>
                        </div>
                        
                        {/* Dual Progress Bars */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs text-gray-400">
                            <span>Flexibility</span>
                            <span>{item.flexibility}%</span>
                          </div>
                          <div className="bg-gray-700/50 rounded-full h-1.5 overflow-hidden">
                            <motion.div
                              className="h-full rounded-full"
                              style={{ backgroundColor: item.color }}
                              initial={{ width: 0 }}
                              animate={{ 
                                width: index < visibleItems ? `${item.flexibility}%` : 0 
                              }}
                              transition={{ 
                                duration: 1.2,
                                delay: index * 0.25 + 0.5,
                                ease: "easeOut"
                              }}
                            />
                          </div>
                          
                          <div className="flex justify-between text-xs text-gray-400">
                            <span>Impact</span>
                            <span>{item.impact}%</span>
                          </div>
                          <div className="bg-gray-700/50 rounded-full h-1.5 overflow-hidden">
                            <motion.div
                              className="h-full rounded-full opacity-70"
                              style={{ backgroundColor: item.color }}
                              initial={{ width: 0 }}
                              animate={{ 
                                width: index < visibleItems ? `${item.impact}%` : 0 
                              }}
                              transition={{ 
                                duration: 1.2,
                                delay: index * 0.25 + 0.7,
                                ease: "easeOut"
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="ml-4">
                        <div 
                          className="w-16 h-16 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${item.color}15` }}
                        >
                          <div 
                            className="w-10 h-10 rounded-full"
                            style={{ backgroundColor: item.color }}
                          ></div>
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
