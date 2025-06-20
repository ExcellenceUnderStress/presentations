import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// Dynamically import the 3D viewer to avoid SSR issues
const ThreeObjViewer = dynamic(() => import('../ThreeObjViewer'), {
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center text-purple-400">Loading 3D model...</div>
});

const InnovationsSlide: React.FC<{ 
  onBack?: () => void; 
  onNext?: () => void;
  onRestartClick?: () => void;
  onFailuresClick?: () => void;
  onCaseStudiesClick?: () => void;
  onFinishClick?: () => void;
}> = ({ onBack, onNext, onRestartClick, onFailuresClick, onCaseStudiesClick, onFinishClick }) => {
  const [scene, setScene] = useState(0); // 0: intro grid, 1-4: detail scenes for each innovation
  const [imageIndex, setImageIndex] = useState(0); // Track which image to show in current scene
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const innovations = [
    {
      title: "Fortis Pile System",
      description: "Revolutionary solution that eliminates tiebacks",
      benefits: ["Reduced excavation", "Faster installation", "Cost-effective"],
      icon: "🏗️"
    },
    {
      title: "Clamshell Blockout",
      description: "Minimizes disruption during repairs",
      benefits: ["Less demolition", "Preserves structural integrity", "Efficient access"],
      icon: "🔨"
    },
    {
      title: "Re-Anchor Blocks",
      description: "Advanced anchoring solutions for complex repairs",
      benefits: ["Enhanced stability", "Adaptable design", "Long-term reliability"],
      icon: "⚓"
    },
    {
      title: "Fortis Protection",
      description: "Comprehensive protection systems",
      benefits: ["Corrosion prevention", "Extended lifespan", "Peace of mind"],
      icon: "🛡️"
    }
  ];

  const detailScenes = [
    {
      title: "Fortis Pile System",
      subtitle: "Eliminating Tiebacks, Maximizing Efficiency",
      points: [
        "No Tie Backs",
        "No Rakers",
        "No Easement Rights Required",
      ],
      images: [
        "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/fortispile_Page_1.png",
        "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/fortispile_Page_2.png",
        "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/fortispile_Page_3.png",
        "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/fortispile_Page_4.png",
        "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/fortispile_Page_5.png",
        "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/FORT.png"
      ],
      hasWebsite: true,
      websiteUrl: "https://fortispile.com"
    },
    {
      title: "Clamshell Blockout",
      subtitle: "Patended Design",
      points: [

      ],
      images: [
       "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/clamshellspec.png"
      ]
    },
    {
      title: "Re-Anchor Blocks",
      subtitle: "Retrofit Applications",
      points: [
        "Relocating Anchor, to allow for large openings in retrofit applications",
        "Compatible with existing PT systems",
        "Full load transfer without slab modification",
        "Corrosion-resistant materials and coatings",
        "PE-stamped designs for every application"
      ],
      images: [
        "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/reanchorspec.jpg"
      ]
    },
    {
      title: "Fortis Protection",
      subtitle: "Post-tensioned window covers & cable gates that end smash-and-grab losses",
      points: [
       
      ],
      images: [
        "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/fpsmain.png",
        "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/fps.JPG",
        "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/fps2.JPG",
        "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/fps3.JPG"
      ]
    }
  ];

  // Auto-scroll effect for iframe
  useEffect(() => {
    if (scene === 1 && detailScenes[0].hasWebsite && iframeRef.current) {
      const scrollInterval = setInterval(() => {
        try {
          // Note: This won't work due to CORS, but included for completeness
          const iframeWindow = iframeRef.current?.contentWindow;
          if (iframeWindow) {
            iframeWindow.scrollBy(0, 1);
          }
        } catch {
          // CORS will block this
        }
      }, 50); // Very slow scroll

      return () => clearInterval(scrollInterval);
    }
  }, [scene, detailScenes]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        if (scene === 0) {
          // From intro, go to first detail scene
          setScene(1);
          setImageIndex(0);
        } else if (scene >= 1 && scene <= detailScenes.length) {
          // In detail scenes - check if we can advance within current scene
          const currentSceneData = detailScenes[scene - 1];
          const totalItems = (currentSceneData.images?.length || 0) + 
            (currentSceneData.hasWebsite ? 1 : 0);
          
          if (imageIndex < totalItems - 1) {
            // Advance to next image/media in current scene
            setImageIndex(prev => prev + 1);
          } else if (scene < detailScenes.length) {
            // Go to next scene
            setScene(prev => prev + 1);
            setImageIndex(0);
          } else {
            // Last scene, go to next slide
            if (onNext) onNext();
          }
        }
        e.preventDefault();
      } else if (e.key === "ArrowLeft") {
        if (scene === 0) {
          // From intro, go back to previous slide
          if (onBack) onBack();
        } else if (scene >= 1 && scene <= detailScenes.length) {
          // In detail scenes
          if (imageIndex > 0) {
            // Go back to previous image/media in current scene
            setImageIndex(prev => prev - 1);
          } else if (scene > 1) {
            // Go to previous scene, set to last media item
            const prevScene = scene - 1;
            const prevSceneData = detailScenes[prevScene - 1];
            const prevSceneTotalItems = (prevSceneData.images?.length || 0) + 
              (prevSceneData.hasWebsite ? 1 : 0);
            setScene(prevScene);
            setImageIndex(Math.max(0, prevSceneTotalItems - 1));
          } else {
            // From first detail scene, go back to intro
            setScene(0);
            setImageIndex(0);
          }
        }
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [scene, imageIndex, onBack, onNext]);

  const renderMediaContent = (sceneData: typeof detailScenes[0], currentImageIndex: number) => {
    const imagesLength = sceneData.images?.length || 0;
    const showWebsite = sceneData.hasWebsite && currentImageIndex === imagesLength;
    
    if (showWebsite) {
      return (
        <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl bg-gray-100">
          <iframe
            ref={iframeRef}
            src={sceneData.websiteUrl}
            className="w-full h-full"
            title="Fortis Pile Website"
            style={{ border: 'none' }}
          />
          <div className="absolute top-4 right-4 bg-black/70 px-3 py-1 rounded-full">
            <span className="text-white text-sm">fortispile.com</span>
          </div>
        </div>
      );
    } else {
      return (
        <motion.div
          className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl bg-gray-900"
          key={`${scene}-${currentImageIndex}`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {sceneData.images && sceneData.images[currentImageIndex] ? (
            <>
              <img
                src={sceneData.images[currentImageIndex]}
                alt={`${sceneData.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-contain"
              />
              {/* Overlay with title */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                <h4 className="text-white text-2xl font-bold">{sceneData.title}</h4>
              </div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              <span>No image available</span>
            </div>
          )}
        </motion.div>
      );
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 40px, rgba(147, 51, 234, 0.1) 40px, rgba(147, 51, 234, 0.1) 80px)`
          }} 
        />
      </div>

      {/* Title - Always visible at top for scenes > 0 */}
      {scene > 0 && (
        <div className="absolute top-12 left-0 right-0 text-center z-20">
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">
            Engineering
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600"> Innovations</span>
          </h2>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center px-8">
        {scene === 0 ? (
          /* Intro Scene with Innovation Grid */
          <motion.div 
            className="text-center max-w-7xl mx-auto w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
              Engineering
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600"> Innovations</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-400 mb-16 max-w-3xl mx-auto">
              Advanced solutions that redefine post-tensioning possibilities
            </p>

            {/* Innovations Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-5xl mx-auto">
              {innovations.map((innovation, index) => (
                <motion.div
                  key={index}
                  className="bg-purple-900/20 p-8 rounded-2xl border border-purple-500/20 hover:border-purple-400/40 transition-all"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{innovation.icon}</div>
                    <div className="flex-1 text-left">
                      <h3 className="text-2xl font-bold text-purple-400 mb-2">{innovation.title}</h3>
                      <p className="text-gray-300 mb-4">{innovation.description}</p>
                      <ul className="space-y-2">
                        {innovation.benefits.map((benefit, benefitIndex) => (
                          <li key={benefitIndex} className="text-gray-400 flex items-center">
                            <span className="w-2 h-2 rounded-full bg-purple-500 mr-2"></span>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
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
                  className="px-8 py-3 bg-purple-600/20 text-purple-400 rounded-lg hover:bg-purple-600/30 transition-all font-semibold border border-purple-500/30 hover:border-purple-400/50"
                >
                  ← Back to Solutions
                </button>
              )}
            </motion.div>
          </motion.div>
        ) : (
          /* Detail Scenes with 30/70 layout */
          <div className="w-full max-w-7xl mx-auto mt-20">
            {scene >= 1 && scene <= detailScenes.length && (
              <>
                <div className="grid grid-cols-10 gap-8 items-center">
                  {/* Text Section - 30% */}
                  <div className="col-span-3 bg-purple-900/20 p-8 rounded-2xl border border-purple-500/20">
                    <h3 className="text-2xl font-bold text-purple-400 mb-2">
                      {detailScenes[scene - 1].title}
                    </h3>
                    <p className="text-purple-300 text-sm mb-6">
                      {detailScenes[scene - 1].subtitle}
                    </p>
                    <ul className="space-y-4">
                      {detailScenes[scene - 1].points.map((point, index) => (
                      <motion.li
                        key={index}
                        className="text-gray-300 flex items-start text-sm"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.15 }}
                      >
                        <span className="w-2 h-2 rounded-full bg-purple-500 mr-3 mt-1.5 flex-shrink-0"></span>
                        <span>{point}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Image/Media Section - 70% */}
                <div className="col-span-7">
                  {renderMediaContent(detailScenes[scene - 1], imageIndex)}
                  
                  {/* Media indicator */}
                  {((detailScenes[scene - 1].images?.length || 0) > 1 || detailScenes[scene - 1].hasWebsite) && (
                    <div className="flex justify-center mt-4 gap-2">
                      {[...Array(detailScenes[scene - 1].images?.length || 0)].map((_, idx) => (
                        <div
                          key={`img-${idx}`}
                          className={`w-2 h-2 rounded-full transition-all ${
                            imageIndex === idx ? 'bg-purple-400 w-8' : 'bg-purple-600/40'
                          }`}
                        />
                      ))}
                      {detailScenes[scene - 1].hasWebsite && (
                        <div
                          className={`w-2 h-2 rounded-full transition-all ${
                            imageIndex === (detailScenes[scene - 1].images?.length || 0) ? 'bg-purple-400 w-8' : 'bg-purple-600/40'
                          }`}
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
              </>
            )}

            {/* Scene Navigation Dots - Only show current and available scenes */}
            <div className="flex justify-center mt-8 gap-2">
              {/* Intro dot */}
              <button
                onClick={() => {
                  setScene(0);
                  setImageIndex(0);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  scene === 0 ? 'bg-purple-400 w-8' : 'bg-purple-600/40'
                }`}
              />
              {/* Detail scene dots - only show valid scenes */}
              {detailScenes.map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => {
                    setScene(index + 1);
                    setImageIndex(0);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    scene === index + 1 ? 'bg-purple-400 w-8' : 'bg-purple-600/40'
                  }`}
                />
              ))}
            </div>

            {/* Navigation Options */}
            {(onRestartClick || onFailuresClick || onCaseStudiesClick || onFinishClick) && (
              <motion.div
                className="flex justify-center gap-4 mt-8 flex-wrap"
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
                {onFailuresClick && (
                  <button
                    onClick={onFailuresClick}
                    className="px-6 py-3 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-all font-semibold border border-red-500/30 hover:border-red-400/50"
                  >
                    View Failures →
                  </button>
                )}
                {onCaseStudiesClick && (
                  <button
                    onClick={onCaseStudiesClick}
                    className="px-6 py-3 bg-teal-600/20 text-teal-400 rounded-lg hover:bg-teal-600/30 transition-all font-semibold border border-teal-500/30 hover:border-teal-400/50"
                  >
                    Case Studies →
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

      {/* Navigation buttons - always visible at bottom */}
      {(onBack || onNext) && scene === 0 && (
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4 z-30">
          {onBack && (
            <button
              onClick={onBack}
              className="px-6 py-3 bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-700/70 transition-all font-semibold border border-slate-600 hover:border-slate-500"
            >
              ← Back
            </button>
          )}
          {onNext && (
            <button
              onClick={onNext}
              className="px-6 py-3 bg-purple-600/20 text-purple-400 rounded-lg hover:bg-purple-600/30 transition-all font-semibold border border-purple-500/30 hover:border-purple-400/50"
            >
              Continue to Safety →
            </button>
          )}
        </div>
      )}
      
      {/* Navigation for detail scenes */}
      {(onBack || onNext) && scene > 0 && (
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4 z-30">
          <button
            onClick={() => {
              if (imageIndex > 0) {
                setImageIndex(prev => prev - 1);
              } else if (scene > 1) {
                const prevScene = scene - 1;
                const prevSceneData = detailScenes[prevScene - 1];
                const prevSceneTotalItems = (prevSceneData.images?.length || 0) + 
                  (prevSceneData.hasWebsite ? 1 : 0);
                setScene(prevScene);
                setImageIndex(Math.max(0, prevSceneTotalItems - 1));
              } else {
                setScene(0);
                setImageIndex(0);
              }
            }}
            className="px-6 py-3 bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-700/70 transition-all font-semibold border border-slate-600 hover:border-slate-500"
          >
            ← Back
          </button>
          
          {onNext && scene === detailScenes.length && imageIndex === ((detailScenes[scene - 1].images?.length || 0) + (detailScenes[scene - 1].hasWebsite ? 1 : 0) - 1) && (
            <button
              onClick={onNext}
              className="px-6 py-3 bg-purple-600/20 text-purple-400 rounded-lg hover:bg-purple-600/30 transition-all font-semibold border border-purple-500/30 hover:border-purple-400/50"
            >
              Continue to Safety →
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default InnovationsSlide; 