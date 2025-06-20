import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const BarrierCableSlide: React.FC<{ 
  onBack?: () => void; 
  onNext?: () => void;
  onRestartClick?: () => void;
  onFailuresClick?: () => void;
  onCaseStudiesClick?: () => void;
  onFinishClick?: () => void;
}> = ({ onBack, onNext, onRestartClick, onFailuresClick, onCaseStudiesClick, onFinishClick }) => {
  const [scene, setScene] = useState(0); // 0: intro boxes, 1-3: detail scenes
  const [imageIndex, setImageIndex] = useState(0); // Track which image to show in current scene

  const features = [
    {
      title: "Common Failures",
      description: "Corrosion, tension loss, and anchor failures",
      icon: "⚠️"
    },
    {
      title: "Expert Repairs",
      description: "Full-service solutions from diagnosis to replacement",
      icon: "🔧"
    },
    {
      title: "Prevention",
      description: "Maintenance programs to extend system life",
      icon: "🛡️"
    }
  ];

  const detailScenes = [
    {
      title: "Common Barrier Cable Problems",
      points: [
        "Corrosion from salt spray and environmental exposure",
        "Cable tension loss over time",
        "Anchor point failures at connections",
        "Inadequate drainage causing water accumulation"
      ],
      images: [
        "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/barriercablefinalfails.png",
        "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/ParkingStructureFail2.JPG",
        "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/carhanging.gif"
      ]
    },
    {
      title: "Our Solutions & Repairs",
      points: [
        "Full cable replacement with upgraded materials",
        "Re-tensioning to manufacturer specifications",
        "Anchor point reinforcement and waterproofing",
        "Drainage system improvements and maintenance"
      ],
      images: [
        "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/Interior+runs+finished+on+this+ramp.JPG",
        "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/Verifying+force+on+Cables.JPG",
        "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/Hillsboro+Intel+Barrier+Cable+2021+2.JPG"
      ]
    },
    {
      title: "Preventive Maintenance",
      points: [
        "Annual inspection programs",
        "Tension monitoring and adjustment",
        "Early detection of potential failures"
      ],
      images: [
        "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/Untitled-2.png"
      ]
    }
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        if (scene > 0) {
          // In detail scenes, check if there are more images
          const currentSceneImages = detailScenes[scene - 1].images;
          if (imageIndex < currentSceneImages.length - 1) {
            // Show next image
            setImageIndex(prev => prev + 1);
          } else {
            // Move to next scene
            if (scene < detailScenes.length) {
              setScene(prev => prev + 1);
              setImageIndex(0); // Reset image index for new scene
            } else if (onNext) {
              onNext();
            }
          }
        } else {
          // In intro scene, just move to next scene
          setScene(1);
          setImageIndex(0);
        }
        e.preventDefault();
      } else if (e.key === "ArrowLeft") {
        if (scene > 0) {
          // In detail scenes, check if we can go back to previous image
          if (imageIndex > 0) {
            setImageIndex(prev => prev - 1);
          } else if (scene > 1) {
            // Go to previous scene's last image
            setScene(prev => prev - 1);
            setImageIndex(detailScenes[scene - 2].images.length - 1);
          } else {
            // Go back to intro
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
  }, [scene, imageIndex, onBack, onNext]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(59, 130, 246, 0.1) 35px, rgba(59, 130, 246, 0.1) 70px)`,
        }} />
      </div>

      {/* Title - Always visible at top for scenes > 0 */}
      {scene > 0 && (
        <div className="absolute top-12 left-0 right-0 text-center z-20">
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">
            Barrier Cable
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600"> Systems</span>
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
              Barrier Cable
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600"> Systems</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-400 mb-16 max-w-3xl mx-auto">
              Understanding and solving barrier cable system challenges
            </p>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-blue-900/20 p-8 rounded-2xl border border-blue-500/20 hover:border-blue-400/40 transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-2xl font-bold text-blue-400 mb-3">{feature.title}</h3>
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
                  className="px-8 py-3 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-all font-semibold border border-blue-500/30 hover:border-blue-400/50"
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
              <div className="col-span-3 bg-blue-900/20 p-8 rounded-2xl border border-blue-500/20">
                <h3 className="text-2xl font-bold text-blue-400 mb-6">
                  {detailScenes[scene - 1].title}
                </h3>
                <ul className="space-y-4">
                  {detailScenes[scene - 1].points.map((point, index) => (
                    <motion.li
                      key={index}
                      className="text-gray-300 flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                    >
                      <span className="w-2 h-2 rounded-full bg-blue-500 mr-3 mt-2 flex-shrink-0"></span>
                      <span>{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Image Section - 70% */}
              <div className="col-span-7">
                <motion.div
                  className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl"
                  key={`${scene}-${imageIndex}`} // Force re-render on image change
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src={detailScenes[scene - 1].images[imageIndex]}
                    alt={`${detailScenes[scene - 1].title} - Image ${imageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {/* Image indicator if multiple images */}
                  {detailScenes[scene - 1].images.length > 1 && (
                    <div className="absolute bottom-4 right-4 bg-black/50 px-3 py-1 rounded-full">
                      <span className="text-white text-sm">
                        {imageIndex + 1} / {detailScenes[scene - 1].images.length}
                      </span>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>

            {/* Scene Navigation Dots */}
            <div className="flex justify-center mt-8 gap-2">
              {[0, 1, 2, 3].map((index) => (
                <button
                  key={index}
                  onClick={() => {
                    setScene(index);
                    setImageIndex(0);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    scene === index ? 'bg-blue-400 w-8' : 'bg-blue-600/40'
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
    </div>
  );
};

export default BarrierCableSlide; 