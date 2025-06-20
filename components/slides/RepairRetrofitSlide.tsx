import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const RepairRetrofitSlide: React.FC<{ 
  onBack?: () => void; 
  onNext?: () => void;
  onRestartClick?: () => void;
  onFinishClick?: () => void;
}> = ({ onBack, onNext, onRestartClick, onFinishClick }) => {
  const [scene, setScene] = useState(0); // 0: intro boxes, 1-4: detail scenes
  const [imageIndex, setImageIndex] = useState(0); // Track which image to show in current scene

  const features = [
    {
      title: "Strand Repairs",
      description: "Greased mono strand & epoxy fixes",
      icon: "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/repair.svg"
    },
    {
      title: "Full Replacements",
      description: "Complete tendon replacement solutions",
      icon: "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/replacement.svg"
    },
    {
      title: "De-tensioning",
      description: "Safe and controlled de-tensioning",
      icon: "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/detensioning.svg"
    }
  ];

  const detailScenes = [
    {
      title: "Live Scanning & Strike Prevention",
      points: [
        "GPR scanning to locate tendons before coring",
        "Allows for precise tendon location and repair",
        "Protects liability for GCs and owners",
      ],
      images: [
        "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/scanning.png"
      ]
    },
    {
      title: "Strand Replacement & Repairs",
      points: [
        "Correct sizing and strand replacement",
        "Corrosion mitigation systems",
        "Concrete patching and restoration",
        "Buttonhead repairs and re-anchoring"
      ],
      images: [
        "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/CompleteStrandReplacements.png"
      ]
    },
    {
      title: "Full Tendon Replacements",
      subtitle: "Comprehensive solutions for severe damage",
      points: [
        "End-to-end replacement of damaged tendons",
        "Correct sizing and strand replacement",
        "PTI Certified Crew"
      ],
      images: [],
      hasVideo: true,
      videoUrl: "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/videos/StrandCutVid.mp4"
    },
    {
      title: "Controlled De-tensioning",
      points: [
        "Safe, engineered de-tensioning procedures",
        "Custom tools and equipment",
        "QA/QC at every step",
        "Re-anchoring with precision"
      ],
      images: [
        "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/controlleddetensionbefore.jpg",
        "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/1++Re-locate+3+groups+of+Banded+Tendons.+Need+to+relocate+Grease+Trap+Hole..JPG",
        "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/2++Hole+Re-locate.JPG",
        "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/5+New+Encapsulated+Anchors+in+place.JPG",
      ]
    }
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        if (scene > 0) {
          const currentSceneData = detailScenes[scene - 1];
          const totalItems = (currentSceneData.images?.length || 0) + (currentSceneData.hasVideo ? 1 : 0);
          
          if (imageIndex < totalItems - 1) {
            setImageIndex(prev => prev + 1);
          } else {
            if (scene < detailScenes.length) {
              setScene(prev => prev + 1);
              setImageIndex(0);
            } else if (onNext) {
              onNext();
            }
          }
        } else {
          setScene(1);
          setImageIndex(0);
        }
        e.preventDefault();
      } else if (e.key === "ArrowLeft") {
        if (scene > 0) {
          if (imageIndex > 0) {
            setImageIndex(prev => prev - 1);
          } else if (scene > 1) {
            setScene(prev => prev - 1);
            const prevSceneData = detailScenes[scene - 2];
            const prevSceneTotalItems = (prevSceneData.images?.length || 0) + (prevSceneData.hasVideo ? 1 : 0);
            setImageIndex(prevSceneTotalItems - 1);
          } else {
            setScene(0);
            setImageIndex(0);
          }
        } else if (onBack) {
          onBack();
        }
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [scene, imageIndex, onBack, onNext, detailScenes]);

  const renderMediaContent = (sceneData: typeof detailScenes[0], currentImageIndex: number) => {
    const imagesLength = sceneData.images?.length || 0;
    const showVideo = sceneData.hasVideo && currentImageIndex === imagesLength;
    
    if (showVideo) {
      return (
        <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl bg-black">
          <video
            src={sceneData.videoUrl}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-contain"
          />
          <div className="absolute top-4 right-4 bg-black/70 px-3 py-1 rounded-full">
            <span className="text-white text-sm">Video Demo</span>
          </div>
        </div>
      );
    } else if (sceneData.images && sceneData.images[currentImageIndex]) {
      return (
        <motion.div
          className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl bg-gray-900"
          key={`${scene}-${currentImageIndex}`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={sceneData.images[currentImageIndex]}
            alt={`${sceneData.title} - Image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
            <h4 className="text-white text-2xl font-bold">{sceneData.title}</h4>
          </div>
        </motion.div>
      );
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-emerald-900/20 to-slate-900">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(16, 185, 129, 0.1) 35px, rgba(16, 185, 129, 0.1) 70px)`,
        }} />
      </div>

      {/* Title - Always visible at top for scenes > 0 */}
      {scene > 0 && (
        <div className="absolute top-12 left-0 right-0 text-center z-20">
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">
            Repair &
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600"> Retrofit</span>
          </h2>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center px-8">
        {scene === 0 ? (
          /* Intro Scene with Boxes */
          <motion.div 
            className="text-center max-w-6xl mx-auto w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
              Repair &
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600"> Retrofit</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-400 mb-16 max-w-3xl mx-auto">
              Extending life and ensuring safety of post-tensioned structures
            </p>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-emerald-900/20 p-8 rounded-2xl border border-emerald-500/20 hover:border-emerald-400/40 transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                >
                  <div className="w-16 h-16 mb-4 flex items-center justify-center">
                    <img 
                      src={feature.icon} 
                      alt={`${feature.title} icon`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-emerald-400 mb-3">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Navigation */}
            <motion.div 
              className="flex justify-center gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              {onBack && (
                <button
                  onClick={onBack}
                  className="px-8 py-3 bg-emerald-600/20 text-emerald-400 rounded-lg hover:bg-emerald-600/30 transition-all font-semibold border border-emerald-500/30 hover:border-emerald-400/50"
                >
                  ← Back to Solutions
                </button>
              )}
            </motion.div>
          </motion.div>
        ) : (
          /* Detail Scenes with 30/70 layout */
          <div className="w-full max-w-7xl mx-auto mt-20">
            <div className="grid grid-cols-10 gap-8 items-center">
              {/* Text Section - 30% */}
              <div className="col-span-3 bg-emerald-900/20 p-8 rounded-2xl border border-emerald-500/20">
                <h3 className="text-2xl font-bold text-emerald-400 mb-6">
                  {detailScenes[scene - 1].title}
                </h3>
                {detailScenes[scene - 1].subtitle && (
                  <p className="text-emerald-300 text-sm mb-4">
                    {detailScenes[scene - 1].subtitle}
                  </p>
                )}
                <ul className="space-y-4">
                  {detailScenes[scene - 1].points.map((point, index) => (
                    <motion.li
                      key={index}
                      className="text-gray-300 flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                    >
                      <span className="w-2 h-2 rounded-full bg-emerald-500 mr-3 mt-2 flex-shrink-0"></span>
                      <span>{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Image Section - 70% */}
              <div className="col-span-7">
                {renderMediaContent(detailScenes[scene - 1], imageIndex)}
                
                {/* Media indicator */}
                {((detailScenes[scene - 1].images?.length || 0) > 1 || detailScenes[scene - 1].hasVideo) && (
                  <div className="flex justify-center mt-4 gap-2">
                    {[...Array(detailScenes[scene - 1].images?.length || 0)].map((_, idx) => (
                      <div
                        key={`img-${idx}`}
                        className={`w-2 h-2 rounded-full transition-all ${
                          imageIndex === idx ? 'bg-emerald-400 w-8' : 'bg-emerald-600/40'
                        }`}
                      />
                    ))}
                    {detailScenes[scene - 1].hasVideo && (
                      <div
                        className={`w-2 h-2 rounded-full transition-all ${
                          imageIndex === (detailScenes[scene - 1].images?.length || 0) ? 'bg-emerald-400 w-8' : 'bg-emerald-600/40'
                        }`}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Scene Navigation Dots */}
            <div className="flex justify-center mt-8 gap-2">
              {[0, 1, 2, 3, 4].map((index) => (
                <button
                  key={index}
                  onClick={() => {
                    setScene(index);
                    setImageIndex(0);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    scene === index ? 'bg-emerald-400 w-8' : 'bg-emerald-600/40'
                  }`}
                />
              ))}
            </div>

            {/* Navigation Options - Show when we have special navigation options */}
            {(onRestartClick || onFinishClick) && (
              <motion.div
                className="flex justify-center gap-4 mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                {onRestartClick && (
                  <button
                    onClick={onRestartClick}
                    className="px-6 py-3 bg-purple-600/20 text-purple-400 rounded-lg hover:bg-purple-600/30 transition-all font-semibold border border-purple-500/30 hover:border-purple-400/50"
                  >
                    ↻ Restart
                  </button>
                )}
                {onFinishClick && (
                  <button
                    onClick={onFinishClick}
                    className="px-6 py-3 bg-green-600/20 text-green-400 rounded-lg hover:bg-green-600/30 transition-all font-semibold border border-green-500/30 hover:border-green-400/50"
                  >
                    Finish Presentation
                  </button>
                )}
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RepairRetrofitSlide; 