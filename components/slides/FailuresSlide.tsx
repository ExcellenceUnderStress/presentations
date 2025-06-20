import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const FailuresSlide: React.FC<{ 
  onPrev?: () => void; 
  onNext?: () => void;
  onSolutionsClick?: () => void;
  onAboutUsClick?: () => void;
  onFinishClick?: () => void;
  onRestartClick?: () => void;
}> = ({ onPrev, onNext, onSolutionsClick, onAboutUsClick, onFinishClick, onRestartClick }) => {
  const [state, setState] = useState(0); // 0: Auto-cycle through failures, 1-4: Individual failure details
  const [imageIndex, setImageIndex] = useState(0); // Track which image to show in current failure
  const [autoCycleIndex, setAutoCycleIndex] = useState(0); // For auto-cycling through failures

  const failureDetails = [
    {
      title: "Core Drill Strikes",
      description: "Accidental drilling into post-tension cables during construction",
      impact: "Immediate cable failure, structural compromise",
      solution: "Emergency cable replacement and structural assessment",
      images: [
        "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/coredrill.jpg",
        "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/coredrillmain.png"
      ],
      gradient: "from-red-500 to-red-600"
    },
    {
      title: "Accidental Tendon Cuts",
      description: "Cutting into tensioned areas without proper planning",
      impact: "Localized failure, potential for progressive collapse",
      images: [
        "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/concretecuttersfailure.jpg",
        "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/concretecuttersfailure2.jpg"
      ],
      gradient: "from-orange-500 to-red-500"
    },
    {
      title: "Grout Pocket Failures",
      description: "Incomplete or deteriorated grouting around tendons",
      impact: "Corrosion exposure, reduced load capacity",
      solution: "Grout replacement and protective coating application",
      images: [
        "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/groutpocketsfailing.jpg"
      ],
      gradient: "from-red-600 to-orange-500"
    },
    {
      title: "Long-term Corrosion",
      description: "Gradual deterioration due to moisture and chemical exposure",
      impact: "Progressive weakening, eventual cable failure",
      images: [
        "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/SpallingMain.jpg",
        "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/RustedButtonHead.jpg"
      ],
      gradient: "from-orange-600 to-red-500"
    }
  ];

  // Auto-cycle through failures when in state 0
  useEffect(() => {
    if (state === 0) {
      const interval = setInterval(() => {
        setAutoCycleIndex(prev => (prev + 1) % failureDetails.length);
        setImageIndex(0); // Reset image index when switching failures
      }, 12000); // Change every 12 seconds

      return () => clearInterval(interval);
    }
  }, [state, failureDetails.length]);

  // Auto-cycle through images within current failure
  useEffect(() => {
    if (state >= 0 && state <= 3) {
      const currentFailure = state === 0 ? failureDetails[autoCycleIndex] : failureDetails[state - 1];
      if (currentFailure?.images?.length > 1) {
        const interval = setInterval(() => {
          setImageIndex(prev => (prev + 1) % currentFailure.images.length);
        }, 6000); // Change images every 6 seconds

        return () => clearInterval(interval);
      }
    }
  }, [state, autoCycleIndex, imageIndex, failureDetails]);

  const handleFailureItemClick = (failureIndex: number) => {
    setState(1 + failureIndex); // States 1-4 for individual failures
    setImageIndex(0);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        if (state >= 1 && state <= 4) {
          // In individual failure view, cycle through images
          const currentFailure = failureDetails[state - 1];
          if (imageIndex < currentFailure.images.length - 1) {
            setImageIndex(prev => prev + 1);
          } else {
            // Go to next failure or exit
            if (state < 4) {
              setState(prev => prev + 1);
              setImageIndex(0);
            } else if (onNext) {
              onNext();
            }
          }
        } else if (state === 0) {
          // In auto-cycle mode, go to first failure detail view
          setState(1);
          setImageIndex(0);
        }
        e.preventDefault();
      } else if (e.key === 'ArrowLeft') {
        if (state >= 1 && state <= 4) {
          if (imageIndex > 0) {
            setImageIndex(prev => prev - 1);
          } else if (state > 1) {
            setState(prev => prev - 1);
            const prevFailure = failureDetails[state - 2];
            setImageIndex(prevFailure.images.length - 1);
          } else {
            setState(0); // Back to auto-cycle
          }
        } else if (state === 0 && onPrev) {
          onPrev(); // Previous slide
        }
        e.preventDefault();
      } else if (e.key === 'Escape' && state >= 1) {
        setState(0); // Back to auto-cycle from any detail view
        e.preventDefault();
      } else if (e.key >= '1' && e.key <= '4') {
        // Quick navigation to specific failure
        const failureIndex = parseInt(e.key) - 1;
        handleFailureItemClick(failureIndex);
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state, imageIndex, onPrev, onNext, autoCycleIndex]);

  const renderMediaContent = (failure: typeof failureDetails[0], currentImageIndex: number) => {
    if (failure.images && failure.images[currentImageIndex]) {
      return (
        <motion.div
          className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl bg-gray-900"
          key={`${failure.title}-${currentImageIndex}`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={failure.images[currentImageIndex]}
            alt={`${failure.title} - Image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to placeholder if image fails to load
              e.currentTarget.src = `https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1600&h=900&fit=crop&q=80`;
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
            <h4 className="text-white text-2xl font-bold">{failure.title}</h4>
            <p className="text-gray-300 text-sm mt-2">{failure.description}</p>
          </div>
        </motion.div>
      );
    }
    
    // Fallback placeholder
    return (
      <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center text-gray-400">
          <div className="text-4xl mb-4">🔧</div>
          <h4 className="text-white text-2xl font-bold mb-2">{failure.title}</h4>
          <p className="text-gray-300">{failure.description}</p>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0 }}
    >
      {/* Title - Always visible at top */}
      <div className="absolute top-8 left-0 right-0 text-center z-20">
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
          Why
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-red-400"> Post-Tension Repair </span>
          Is Critical
        </h2>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center px-8">
        <motion.div 
          className="text-center max-w-7xl mx-auto w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0, duration: 0 }}
        >
          {/* Auto-cycle through failures */}
          {state === 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full max-w-6xl mx-auto mt-20"
            >
              <div className="grid grid-cols-10 gap-8 items-center">
                {/* Text Section - 30% */}
                <div className="col-span-3 bg-gradient-to-br from-red-900/20 to-orange-900/20 p-8 rounded-2xl border border-white/10">
                  <h3 className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${failureDetails[autoCycleIndex].gradient} mb-4`}>
                    {failureDetails[autoCycleIndex].title}
                  </h3>
                  <p className="text-gray-300 mb-4 text-sm">{failureDetails[autoCycleIndex].description}</p>
                  <div className="mb-3">
                    <span className="text-orange-400 font-semibold text-sm">Impact: </span>
                    <span className="text-gray-400 text-sm">{failureDetails[autoCycleIndex].impact}</span>
                  </div>
                  
                  {/* Quick navigation buttons */}
                  <div className="mt-6 grid grid-cols-2 gap-2">
                    {failureDetails.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => handleFailureItemClick(index)}
                        className={`text-xs p-2 rounded transition-all ${
                          index === autoCycleIndex 
                            ? 'bg-red-500/30 text-red-300 border border-red-500/50' 
                            : 'bg-gray-700/30 text-gray-400 hover:bg-gray-600/30'
                        }`}
                      >
                        {failureDetails[index].title.split(' ')[0]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Image Section - 70% */}
                <div className="col-span-7">
                  {renderMediaContent(failureDetails[autoCycleIndex], imageIndex)}
                  
                  {/* Image indicator */}
                  {failureDetails[autoCycleIndex].images.length > 1 && (
                    <div className="flex justify-center mt-4 gap-2">
                      {failureDetails[autoCycleIndex].images.map((_, idx) => (
                        <div
                          key={idx}
                          className={`w-2 h-2 rounded-full transition-all ${
                            imageIndex === idx ? 'bg-red-400 w-8' : 'bg-red-600/40'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Auto-cycle indicator */}
              <div className="flex justify-center mt-8 gap-2">
                {failureDetails.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      autoCycleIndex === index ? 'bg-red-400 w-8' : 'bg-red-600/40'
                    }`}
                  />
                ))}
              </div>
              

            </motion.div>
          )}

          {/* Individual failure detail views (states 1-4) */}
          {state >= 1 && state <= 4 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full max-w-6xl mx-auto mt-20"
            >
              <div className="grid grid-cols-10 gap-8 items-center">
                {/* Text Section - 30% */}
                <div className="col-span-3 bg-gradient-to-br from-red-900/20 to-orange-900/20 p-8 rounded-2xl border border-white/10">
                  <h3 className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${failureDetails[state - 1].gradient} mb-4`}>
                    {failureDetails[state - 1].title}
                  </h3>
                  <p className="text-gray-300 mb-4 text-sm">{failureDetails[state - 1].description}</p>
                  <div className="mb-3">
                    <span className="text-orange-400 font-semibold text-sm">Impact: </span>
                    <span className="text-gray-400 text-sm">{failureDetails[state - 1].impact}</span>
                  </div>
                </div>

                {/* Image Section - 70% */}
                <div className="col-span-7">
                  {renderMediaContent(failureDetails[state - 1], imageIndex)}
                  
                  {/* Image indicator */}
                  {failureDetails[state - 1].images.length > 1 && (
                    <div className="flex justify-center mt-4 gap-2">
                      {failureDetails[state - 1].images.map((_, idx) => (
                        <div
                          key={idx}
                          className={`w-2 h-2 rounded-full transition-all ${
                            imageIndex === idx ? 'bg-red-400 w-8' : 'bg-red-600/40'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Failure navigation */}
              <div className="flex justify-center mt-8 gap-2">
                {failureDetails.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setState(1 + index);
                      setImageIndex(0);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      state === 1 + index ? 'bg-red-400 w-8' : 'bg-red-600/40'
                    }`}
                  />
                ))}
              </div>
              
              <div className="mt-4 text-center">
                <br></br>
                <div className="mt-2 text-gray-500 text-xs space-y-1">
                 <br></br><br></br><br></br><br></br><br></br><br></br>
                </div>
              </div>
            </motion.div>
          )}

          {/* Navigation Options - Show when we have special navigation options */}
          {(onSolutionsClick || onAboutUsClick || onFinishClick || onRestartClick) && (
            <motion.div
              className="absolute bottom-8 left-0 right-0 flex justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {onFinishClick && (
                <button
                  onClick={onFinishClick}
                  className="px-6 py-3 bg-green-600/20 text-green-400 rounded-lg hover:bg-green-600/30 transition-all font-semibold border border-green-500/30 hover:border-green-400/50"
                >
                  Finish Presentation
                </button>
              )}
              {onSolutionsClick && (
                <button
                  onClick={onSolutionsClick}
                  className="px-6 py-3 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-all font-semibold border border-blue-500/30 hover:border-blue-400/50"
                >
                  View Solutions →
                </button>
              )}
              {onAboutUsClick && (
                <button
                  onClick={onAboutUsClick}
                  className="px-6 py-3 bg-teal-600/20 text-teal-400 rounded-lg hover:bg-teal-600/30 transition-all font-semibold border border-teal-500/30 hover:border-teal-400/50"
                >
                  About Us →
                </button>
              )}
              {onRestartClick && (
                <button
                  onClick={onRestartClick}
                  className="px-6 py-3 bg-purple-600/20 text-purple-400 rounded-lg hover:bg-purple-600/30 transition-all font-semibold border border-purple-500/30 hover:border-purple-400/50"
                >
                  ↻ Restart
                </button>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FailuresSlide; 