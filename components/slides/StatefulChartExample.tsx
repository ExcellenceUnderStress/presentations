import React, { useEffect, useState, memo, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Define the different chart states
type ChartState = "initial" | "quarter" | "half" | "three-quarters" | "full";

interface StatefulChartProps {
  onPrev?: () => void;
  onNext?: () => void;
}

const StatefulChartExample: React.FC<StatefulChartProps> = memo(({ onPrev, onNext }) => {
  const [currentState, setCurrentState] = useState<ChartState>("initial");
  const [visibleItems, setVisibleItems] = useState(0);
  const timersRef = useRef<(NodeJS.Timeout | number)[]>([]);
  const mountedRef = useRef(true);

  // Chart data corresponding to different states
  const chartStates = {
    initial: { value: 0, label: "Starting Point", color: "#6B7280" },
    quarter: { value: 25, label: "Early Progress", color: "#3B82F6" },
    half: { value: 50, label: "Halfway Mark", color: "#8B5CF6" },
    "three-quarters": { value: 75, label: "Strong Progress", color: "#10B981" },
    full: { value: 100, label: "Complete Solution", color: "#F59E0B" }
  };

  const stateSequence: ChartState[] = ["initial", "quarter", "half", "three-quarters", "full"];

  // Material efficiency data
  const efficiencyMetrics = [
    {
      metric: "Concrete Savings",
      value: currentState === "initial" ? 0 : 
             currentState === "quarter" ? 25 :
             currentState === "half" ? 25 :
             currentState === "three-quarters" ? 25 : 25,
      icon: "🏗️",
      color: "#3B82F6"
    },
    {
      metric: "Steel Reduction",
      value: currentState === "initial" ? 0 : 
             currentState === "quarter" ? 0 :
             currentState === "half" ? 65 :
             currentState === "three-quarters" ? 65 : 65,
      icon: "🔩",
      color: "#8B5CF6"
    },
    {
      metric: "Mass Reduction",
      value: currentState === "initial" ? 0 : 
             currentState === "quarter" ? 0 :
             currentState === "half" ? 0 :
             currentState === "three-quarters" ? 30 : 30,
      icon: "⚖️",
      color: "#10B981"
    },
    {
      metric: "Cost Efficiency",
      value: currentState === "initial" ? 0 : 
             currentState === "quarter" ? 0 :
             currentState === "half" ? 0 :
             currentState === "three-quarters" ? 0 : 40,
      icon: "💰",
      color: "#F59E0B"
    }
  ];

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

  // Auto-advance through states
  useEffect(() => {
    cleanup();
    
    const timer = setTimeout(() => {
      if (!mountedRef.current) return;
      
      const currentIndex = stateSequence.indexOf(currentState);
      if (currentIndex < stateSequence.length - 1) {
        setCurrentState(stateSequence[currentIndex + 1]);
        setVisibleItems(prev => Math.min(prev + 1, efficiencyMetrics.length));
      }
    }, 1500); // Advance every 1.5 seconds

    timersRef.current.push(timer);
    return cleanup;
  }, [currentState, cleanup]);

  // Custom SVG Chart Component (simplified version of your PieChart concept)
  const StatefulChart = ({ state }: { state: ChartState }) => {
    const currentData = chartStates[state];
    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = `${(currentData.value / 100) * circumference} ${circumference}`;

    return (
      <div className="relative w-48 h-48 flex items-center justify-center">
        <svg width="200" height="200" className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            stroke="#374151"
            strokeWidth="8"
            fill="none"
          />
          {/* Progress circle */}
          <motion.circle
            cx="100"
            cy="100"
            r={radius}
            stroke={currentData.color}
            strokeWidth="8"
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeLinecap="round"
            initial={{ strokeDasharray: "0 628" }}
            animate={{ strokeDasharray }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <motion.div
            className="text-3xl font-bold text-white"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {currentData.value}%
          </motion.div>
          <motion.div
            className="text-sm text-gray-300 mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {currentData.label}
          </motion.div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
      {/* Background pattern */}
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
              Stateful Chart Example
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-6"></div>
            <p className="text-2xl text-gray-300 font-light">
              Progressive Data Visualization
            </p>
            <p className="text-lg text-gray-400 mt-4 max-w-3xl mx-auto">
              Demonstrating how chart states can evolve to tell a progressive story
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Stateful Chart */}
            <motion.div 
              className="flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <div className="bg-gray-800/30 rounded-2xl p-8 backdrop-blur-sm border border-gray-700/50">
                <h3 className="text-xl font-bold text-white mb-6 text-center">
                  Implementation Progress
                </h3>
                <StatefulChart state={currentState} />
                
                {/* State indicators */}
                <div className="flex justify-center space-x-2 mt-6">
                  {stateSequence.map((state, index) => (
                    <div
                      key={state}
                      className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                        stateSequence.indexOf(currentState) >= index
                          ? chartStates[state].color === "#6B7280" ? "bg-gray-500" : "bg-current"
                          : "bg-gray-600"
                      }`}
                      style={{ 
                        color: stateSequence.indexOf(currentState) >= index ? chartStates[state].color : undefined 
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Efficiency Metrics */}
            <div className="space-y-4">
              <AnimatePresence>
                {efficiencyMetrics.map((metric, index) => (
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
                    className="bg-gray-800/20 border-2 border-gray-700/50 rounded-xl p-6 backdrop-blur-sm hover:scale-105 transition-transform duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div 
                          className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold text-white shadow-lg"
                          style={{ backgroundColor: metric.color }}
                        >
                          {metric.icon}
                        </div>
                        <div>
                          <div className="text-lg font-semibold text-white">
                            {metric.metric}
                          </div>
                          <div className="text-sm text-gray-400">
                            Current Implementation
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-3xl font-bold text-white">
                          {metric.value}%
                        </div>
                        <div className="text-xs text-gray-400">
                          Efficiency
                        </div>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-4 bg-gray-700/50 rounded-full h-2 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: metric.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${metric.value}%` }}
                        transition={{ 
                          duration: 1,
                          delay: index * 0.3 + 0.5,
                          ease: "easeOut"
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Current State Display */}
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="inline-flex items-center space-x-4 bg-gray-800/30 rounded-lg px-6 py-3 backdrop-blur-sm border border-gray-700/50">
              <span className="text-gray-400">Current State:</span>
              <span 
                className="font-bold text-lg"
                style={{ color: chartStates[currentState].color }}
              >
                {chartStates[currentState].label}
              </span>
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: chartStates[currentState].color }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
});

StatefulChartExample.displayName = "StatefulChartExample";

export default StatefulChartExample; 