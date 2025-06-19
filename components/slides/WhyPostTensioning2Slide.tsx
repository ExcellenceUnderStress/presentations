import React, { useEffect, useState, memo } from "react";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryContainer, VictoryTheme } from "victory";
import { motion, AnimatePresence } from "framer-motion";

const WhyPostTensioning2Slide: React.FC<{ onPrev?: () => void; onNext?: () => void }> = memo(({ onPrev, onNext }) => {
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
        if (prev < 5) {
          return prev + 1;
        }
        return prev;
      });
    }, 600);

    return () => clearInterval(timer);
  }, []);

  // Structural Advantages with performance metrics
  const structuralAdvantages = [
    { 
      advantage: "Thinner Slabs", 
      improvement: 40,
      color: "#3B82F6",
      icon: "📏",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-400/30"
    },
    { 
      advantage: "Longer Spans & Cantilevers", 
      improvement: 60,
      color: "#8B5CF6",
      icon: "🌉",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-400/30"
    },
    { 
      advantage: "Fewer Joints", 
      improvement: 75,
      color: "#10B981",
      icon: "🔗",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-400/30"
    },
    { 
      advantage: "Improved Durability", 
      improvement: 85,
      color: "#F59E0B",
      icon: "🛡️",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-400/30"
    },
    { 
      advantage: "Controlled Deflections", 
      improvement: 70,
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
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Victory Bar Chart */}
            <motion.div 
              className="flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <div className="bg-gray-800/30 rounded-2xl p-6 backdrop-blur-sm border border-gray-700/50">
                <h3 className="text-xl font-bold text-white mb-4 text-center">Performance Improvement</h3>
                <VictoryChart
                  theme={VictoryTheme.material}
                  width={450}
                  height={300}
                  domainPadding={20}
                  containerComponent={<VictoryContainer responsive={false} />}
                  padding={{ left: 60, top: 20, right: 60, bottom: 60 }}
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
                    style={{
                      axis: { stroke: "#6B7280" },
                      tickLabels: { fill: "#D1D5DB", fontSize: 10 },
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
                    animate={false}
                    cornerRadius={4}
                  />
                </VictoryChart>
              </div>
            </motion.div>

            {/* Advantage Cards */}
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
                      delay: index * 0.2
                    }}
                    className={`${item.bgColor} ${item.borderColor} border-2 rounded-xl p-6 backdrop-blur-sm`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div 
                          className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold text-white"
                          style={{ backgroundColor: item.color }}
                        >
                          {index + 1}
                        </div>
                        <div>
                          <div className="text-lg font-semibold text-white">
                            {item.advantage}
                          </div>
                          <div className="text-sm text-gray-300">
                            {item.improvement}% improvement
                          </div>
                        </div>
                      </div>
                      <div className="text-2xl">
                        <div 
                          className="w-16 h-16 rounded-lg flex items-center justify-center text-2xl"
                          style={{ backgroundColor: `${item.color}20` }}
                        >
                          <div className="w-8 h-8 rounded-full" style={{ backgroundColor: item.color }}></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Progress Indicator */}
                    <div className="mt-4 bg-gray-700/50 rounded-full h-1.5 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: item.color }}
                        initial={{ width: 0 }}
                        animate={{ 
                          width: index < visibleItems ? `${item.improvement}%` : 0 
                        }}
                        transition={{ 
                          duration: 1.2,
                          delay: index * 0.2 + 0.5,
                          ease: "easeOut"
                        }}
                      />
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
