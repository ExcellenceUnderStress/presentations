import React, { useEffect, useState, memo, useCallback, useRef } from "react";
import { VictoryPie, VictoryContainer, VictoryLabel } from "victory";
import { motion, AnimatePresence } from "framer-motion";

// Add a custom stateful chart component inspired by the PieChart example
type MaterialState = "none" | "concrete" | "steel" | "mass" | "complete";

const StatefulMaterialChart = ({ currentState }: { currentState: MaterialState }) => {
  const stateData = {
    none: { angle: 0, color: "#374151", label: "Traditional Method" },
    concrete: { angle: 90, color: "#3B82F6", label: "Concrete Saved" },
    steel: { angle: 225, color: "#8B5CF6", label: "+ Steel Reduced" },
    mass: { angle: 315, color: "#10B981", label: "+ Mass Optimized" },
    complete: { angle: 360, color: "#F59E0B", label: "Full Efficiency" }
  };

  const current = stateData[currentState];
  const radius = 70;
  const strokeWidth = 12;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDasharray = `${(current.angle / 360) * circumference} ${circumference}`;

  return (
    <div className="relative w-40 h-40 flex items-center justify-center">
      <svg className="w-40 h-40 transform -rotate-90">
        {/* Background circle */}
        <circle
          cx="80"
          cy="80"
          r={normalizedRadius}
          stroke="#374151"
          strokeWidth={strokeWidth}
          fill="none"
          className="opacity-20"
        />
        {/* Progress circle */}
        <motion.circle
          cx="80"
          cy="80"
          r={normalizedRadius}
          stroke={current.color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeLinecap="round"
          initial={{ strokeDasharray: "0 628" }}
          animate={{ strokeDasharray }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="drop-shadow-lg"
        />
        {/* Multi-layer effect for complete state */}
        {currentState === "complete" && (
          <motion.circle
            cx="80"
            cy="80"
            r={normalizedRadius - 8}
            stroke="#F59E0B"
            strokeWidth="4"
            fill="none"
            strokeDasharray="0 628"
            initial={{ strokeDasharray: "0 628" }}
            animate={{ strokeDasharray: `${circumference * 0.8} ${circumference}` }}
            transition={{ duration: 1, delay: 0.5 }}
            className="opacity-60"
          />
        )}
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <motion.div
          className="text-lg font-bold text-white"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {currentState === "none" ? "0%" : 
           currentState === "concrete" ? "25%" :
           currentState === "steel" ? "50%" :
           currentState === "mass" ? "75%" : "100%"}
        </motion.div>
        <motion.div
          className="text-xs text-gray-300 mt-1 px-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {current.label}
        </motion.div>
      </div>
      
      {/* State indicators around the chart */}
      <div className="absolute inset-0">
        {currentState !== "none" && (
          <motion.div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
          </motion.div>
        )}
        {(currentState === "steel" || currentState === "mass" || currentState === "complete") && (
          <motion.div
            className="absolute top-1/2 right-0 transform translate-x-2 -translate-y-1/2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
          </motion.div>
        )}
        {(currentState === "mass" || currentState === "complete") && (
          <motion.div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5 }}
          >
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const WhyPostTensioning1Slide: React.FC<{ onPrev?: () => void; onNext?: () => void; onJumpToSolutions?: () => void }> = memo(({ onPrev, onNext, onJumpToSolutions }) => {
  const [visibleItems, setVisibleItems] = useState(0);
  const [animatedValues, setAnimatedValues] = useState([0, 0, 0]);
  const [materialState, setMaterialState] = useState<MaterialState>("none");
  const timersRef = useRef<(NodeJS.Timeout | number)[]>([]);
  const mountedRef = useRef(true);

  // Material state progression
  const stateSequence: MaterialState[] = ["none", "concrete", "steel", "mass", "complete"];

  // Cleanup function
  const cleanup = useCallback(() => {
    timersRef.current.forEach(timer => {
      if (typeof timer === 'number') {
        cancelAnimationFrame(timer);
      } else {
        clearTimeout(timer);
      }
    });
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

  // Progressive state advancement
  useEffect(() => {
    cleanup();
    
    const timer = setTimeout(() => {
      if (!mountedRef.current) return;
      const currentIndex = stateSequence.indexOf(materialState);
      if (currentIndex < stateSequence.length - 1) {
        setMaterialState(stateSequence[currentIndex + 1]);
        setVisibleItems(prev => Math.min(prev + 1, 3));
      }
    }, 1200);

    timersRef.current.push(timer);
    return cleanup;
  }, [materialState, cleanup]);

  useEffect(() => {
    if (visibleItems > 0 && mountedRef.current) {
      const targetValues = [25, 65, 30];
      
      const animateValue = (index: number, target: number) => {
        let current = 0;
        const increment = target / 20;
        
        const animate = () => {
          if (!mountedRef.current) return;
          
          current += increment;
          if (current >= target) {
            current = target;
          }
          
          setAnimatedValues(prev => {
            const newValues = [...prev];
            newValues[index] = Math.round(current);
            return newValues;
          });

          if (current < target && mountedRef.current) {
            const rafId = requestAnimationFrame(animate);
            timersRef.current.push(rafId);
          }
        };
        
        const startTimer = setTimeout(() => {
          if (mountedRef.current) animate();
        }, index * 200);
        
        timersRef.current.push(startTimer);
      };

      for (let i = 0; i < visibleItems; i++) {
        animateValue(i, targetValues[i]);
      }
    }
  }, [visibleItems]);

  const materialStats = [
    { 
      stat: animatedValues[0], 
      label: "Less Concrete", 
      description: "Up to 25% concrete savings",
      impact: "Significant cost reduction",
      color: "#3B82F6",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-400/30",
      icon: "🏗️"
    },
    { 
      stat: animatedValues[1], 
      label: "Less Reinforcing Steel", 
      description: "Up to 65% steel reduction",
      impact: "Major material efficiency",
      color: "#8B5CF6",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-400/30",
      icon: "🔩"
    },
    { 
      stat: animatedValues[2], 
      label: "Reduction in Building Mass", 
      description: "30% overall mass reduction",
      impact: "Structural optimization",
      color: "#10B981",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-400/30",
      icon: "⚖️"
    }
  ];

  const pieData = materialStats.map((item, index) => ({
    x: item.label.split(' ')[0],
    y: index < visibleItems ? item.stat : 0
  }));

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
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
            <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-6"></div>
            <p className="text-2xl text-gray-300 font-light">
              Material & Cost Efficiency
            </p>
            <p className="text-lg text-gray-400 mt-4 max-w-3xl mx-auto">
              Post-tensioning delivers significant material savings and cost reductions through advanced structural engineering
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-12 items-center">
            {/* Stateful Chart inspired by PieChart example */}
            <motion.div 
              className="flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <div className="bg-gray-800/30 rounded-2xl p-8 backdrop-blur-sm border border-gray-700/50">
                <h3 className="text-lg font-bold text-white mb-6 text-center">Progressive Efficiency</h3>
                <StatefulMaterialChart currentState={materialState} />
                
                {/* State progression indicators */}
                <div className="flex justify-center space-x-1 mt-6">
                  {stateSequence.slice(1).map((state, index) => {
                    const isActive = stateSequence.indexOf(materialState) > index;
                    const colors = ["#3B82F6", "#8B5CF6", "#10B981", "#F59E0B"];
                    return (
                      <div
                        key={state}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          isActive ? "opacity-100" : "opacity-30"
                        }`}
                        style={{ backgroundColor: colors[index] }}
                      />
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Enhanced Pie Chart Section */}
            <motion.div 
              className="flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <div className="relative mb-6">
                <VictoryPie
                  data={pieData}
                  width={380}
                  height={380}
                  innerRadius={80}
                  padAngle={4}
                  colorScale={materialStats.map(item => item.color)}
                  containerComponent={<VictoryContainer responsive={false} />}
                  labelComponent={<VictoryLabel style={{ fill: "white", fontSize: 11, fontWeight: "bold" }} />}
                  animate={{
                    duration: 1000,
                    onLoad: { duration: 0 }
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">Material</div>
                    <div className="text-xl font-bold text-green-400">Savings</div>
                    <div className="text-xs text-gray-300 mt-1">vs Traditional</div>
                  </div>
                </div>
              </div>
              
              {/* Chart Legend */}
              <div className="grid grid-cols-3 gap-3 w-full max-w-sm">
                {materialStats.map((item, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: index < visibleItems ? 1 : 0, y: index < visibleItems ? 0 : 20 }}
                    transition={{ delay: index * 0.3 + 0.8 }}
                  >
                    <div 
                      className="w-3 h-3 rounded-full mx-auto mb-1"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <div className="text-xs text-gray-300">{item.label.split(' ')[0]}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Enhanced Stats Cards */}
            <div className="space-y-4">
              <AnimatePresence>
                {materialStats.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ 
                      opacity: index < visibleItems ? 1 : 0,
                      x: index < visibleItems ? 0 : 50
                    }}
                    transition={{ 
                      duration: 0.6,
                      delay: index * 0.3
                    }}
                    className={`${item.bgColor} ${item.borderColor} border-2 rounded-xl p-6 backdrop-blur-sm hover:scale-105 transition-transform duration-300`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-3">
                          <div className="text-2xl mr-3">{item.icon}</div>
                          <div>
                            <div className="text-3xl font-bold text-white mb-1">
                              {item.stat}%
                            </div>
                            <div className="text-sm text-gray-200 font-medium">
                              {item.label}
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="text-xs font-semibold text-blue-300">
                            {item.description}
                          </div>
                          <div className="text-xs text-gray-400">
                            {item.impact}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Enhanced Progress Bar */}
                    <div className="mt-4 bg-gray-700/50 rounded-full h-2 overflow-hidden shadow-inner">
                      <motion.div
                        className="h-full rounded-full relative"
                        style={{ backgroundColor: item.color }}
                        initial={{ width: 0 }}
                        animate={{ 
                          width: index < visibleItems ? `${(item.stat / 70) * 100}%` : 0 
                        }}
                        transition={{ 
                          duration: 1.2,
                          delay: index * 0.3 + 0.5,
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

        {/* Jump to Solutions Button */}
        {onJumpToSolutions && (
          <motion.div
            className="absolute bottom-8 right-8 z-30"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
          >
            <button
              onClick={onJumpToSolutions}
              className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg hover:from-emerald-500 hover:to-emerald-600 transition-all font-semibold border border-emerald-500/30 hover:border-emerald-400/50 shadow-lg hover:shadow-emerald-500/25"
            >
              🔧 See Our Solutions
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
});

WhyPostTensioning1Slide.displayName = "WhyPostTensioning1Slide";

export default WhyPostTensioning1Slide;
