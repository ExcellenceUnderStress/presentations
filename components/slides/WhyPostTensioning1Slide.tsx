import React, { useEffect, useState, memo } from "react";
import { VictoryPie, VictoryContainer, VictoryLabel } from "victory";
import { motion, AnimatePresence } from "framer-motion";

const WhyPostTensioning1Slide: React.FC<{ onPrev?: () => void; onNext?: () => void }> = memo(({ onPrev, onNext }) => {
  const [visibleItems, setVisibleItems] = useState(0);
  const [animatedValues, setAnimatedValues] = useState([0, 0, 0]);

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
        if (prev < 3) {
          return prev + 1;
        }
        return prev;
      });
    }, 800);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (visibleItems > 0) {
      const targetValues = [25, 65, 30];
      const animateValue = (index: number, target: number) => {
        let current = 0;
        const increment = target / 30;
        const valueTimer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(valueTimer);
          }
          setAnimatedValues(prev => {
            const newValues = [...prev];
            newValues[index] = Math.round(current);
            return newValues;
          });
        }, 50);
      };

      for (let i = 0; i < visibleItems; i++) {
        setTimeout(() => animateValue(i, targetValues[i]), i * 300);
      }
    }
  }, [visibleItems]);

  const materialStats = [
    { 
      stat: animatedValues[0], 
      label: "Less Concrete", 
      color: "#3B82F6",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-400/30"
    },
    { 
      stat: animatedValues[1], 
      label: "Less Reinforcing Steel", 
      color: "#8B5CF6",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-400/30"
    },
    { 
      stat: animatedValues[2], 
      label: "Reduction in Building Mass", 
      color: "#10B981",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-400/30"
    }
  ];

  const pieData = materialStats.map((item, index) => ({
    x: item.label,
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
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Victory Pie Chart */}
            <motion.div 
              className="flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <div className="relative">
                <VictoryPie
                  data={pieData}
                  width={400}
                  height={400}
                  innerRadius={80}
                  padAngle={3}
                  colorScale={materialStats.map(item => item.color)}
                  containerComponent={<VictoryContainer responsive={false} />}
                  labelComponent={<VictoryLabel style={{ fill: "white", fontSize: 14, fontWeight: "bold" }} />}
                  animate={false}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">Savings</div>
                    <div className="text-lg text-gray-300">Overview</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stats Cards */}
            <div className="space-y-6">
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
                    className={`${item.bgColor} ${item.borderColor} border-2 rounded-2xl p-8 backdrop-blur-sm`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="text-4xl font-bold text-white mb-2">
                          {item.stat}%
                        </div>
                        <div className="text-xl text-gray-200 font-medium">
                          {item.label}
                        </div>
                      </div>
                      <div className="ml-6">
                        <div 
                          className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white"
                          style={{ backgroundColor: item.color }}
                        >
                          {index + 1}
                        </div>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mt-4 bg-gray-700/50 rounded-full h-2 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: item.color }}
                        initial={{ width: 0 }}
                        animate={{ 
                          width: index < visibleItems ? `${(item.stat / 70) * 100}%` : 0 
                        }}
                        transition={{ 
                          duration: 1.5,
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
        </div>
      </div>
    </div>
  );
});

WhyPostTensioning1Slide.displayName = "WhyPostTensioning1Slide";

export default WhyPostTensioning1Slide;
