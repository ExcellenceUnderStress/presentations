import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  className?: string;
  currentSlide: number;
  lastVisitedSlide?: number;
  onBadgeClick?: (slideIndex: number) => void;
}

const slideLabels = [
  "Welcome", // 0
  "Legacy", // 1
  "Hub", // 2
  "Why PT 1", // 3
  "Why PT 2", // 4
  "Why PT 3", // 5
  "Critical", // 6
  "Failures", // 7
  "Cases", // 8
  "Process", // 9
  "Solutions", // 10
  "About", // 11
  "Legacy", // 12
  "Company", // 13
  "Innovation", // 14
  "Barrier", // 15
  "Repair", // 16
  "Safety", // 17
  "Repair Cases", // 18
  "Innovation Cases", // 19
];

export const BadgeGroup = ({ className = "", currentSlide, lastVisitedSlide, onBadgeClick }: Props): React.JSX.Element => {
  const handleBadgeClick = (index: number) => {
    if (onBadgeClick && index >= 0 && index < slideLabels.length) {
      onBadgeClick(index);
    }
  };

  // Ensure currentSlide is within bounds
  const safeCurrentSlide = Math.min(Math.max(0, currentSlide), slideLabels.length - 1);
  
  return (
    <motion.div
      className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 ${className}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-2 px-4 py-2 bg-black/20 backdrop-blur-md rounded-full border border-white/10">
        <AnimatePresence mode="wait">
          {/* Previous slide (if exists) */}
          {currentSlide > 0 && (
            <motion.div
              key={`prev-${currentSlide - 1}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="cursor-pointer flex items-center gap-1 px-2 py-1 bg-amber-500/60 rounded-full border border-amber-400/50 hover:bg-amber-500/80"
              onClick={() => handleBadgeClick(currentSlide - 1)}
              title={`Go to ${slideLabels[currentSlide - 1]}`}
            >
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-white text-xs font-medium">
                {slideLabels[currentSlide - 1]}
              </span>
            </motion.div>
          )}
          
          {/* Current slide */}
          <motion.div
            key={`current-${safeCurrentSlide}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2 px-3 py-1 bg-blue-500/80 rounded-full border border-blue-400/50"
          >
            <div className="w-2 h-2 bg-white rounded-full" />
            <span className="text-white text-xs font-medium">
              {slideLabels[safeCurrentSlide]}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};


