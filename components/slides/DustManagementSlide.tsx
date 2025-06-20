import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const DustManagementSlide: React.FC<{ 
  onBack?: () => void; 
  onNext?: () => void;
  onRestartClick?: () => void;
  onFailuresClick?: () => void;
  onCaseStudiesClick?: () => void;
  onFinishClick?: () => void;
}> = ({ onBack, onNext, onRestartClick, onFailuresClick, onCaseStudiesClick, onFinishClick }) => {
  const [scene, setScene] = useState(0); // 0: intro boxes, 1-3: detail scenes
  const [imageIndex, setImageIndex] = useState(0);

  const features = [
    {
      title: "Advanced Vacuum Systems",
      description: "High-efficiency dust collection and containment",
      icon: "🌪️"
    },
    {
      title: "Silica Compliance",
      description: "OSHA compliant silica management protocols",
      icon: "🛡️"
    },
    {
      title: "Air Quality Monitoring",
      description: "Tested and monitored to ensure compliance",
      icon: "📊"
    }
  ];

  const detailScenes = [
    {
      title: "Advanced Vacuum Systems",
      points: [
        "High-efficiency particulate air (HEPA) filtration",
        "Integrated dust collection at source",
        "Portable and stationary vacuum solutions",
        "Continuous operation during chipping"
      ],
      images: [
        "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/dustman.png",
        "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/dustman2.png"
      ]
    },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        if (scene > 0) {
          const currentSceneData = detailScenes[scene - 1];
          if (imageIndex < (currentSceneData.images?.length || 0) - 1) {
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
            setImageIndex((prevSceneData.images?.length || 1) - 1);
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
    if (sceneData.images && sceneData.images[currentImageIndex]) {
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
            onError={(e) => {
              e.currentTarget.src = `https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1600&h=900&fit=crop&q=80`;
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
            <h4 className="text-white text-2xl font-bold">{sceneData.title}</h4>
          </div>
        </motion.div>
      );
    }
  };

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
            Dust
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-600"> Management</span>
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
              Dust
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-600"> Management</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-400 mb-16 max-w-3xl mx-auto">
              Advanced systems for worker safety and OSHA compliance
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

            {/* Navigation Options */}
            {(onRestartClick || onFailuresClick || onCaseStudiesClick || onFinishClick) && (
              <motion.div
                className="flex justify-center gap-4 flex-wrap"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
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
                {renderMediaContent(detailScenes[scene - 1], imageIndex)}
                
                {/* Image indicator */}
                {(detailScenes[scene - 1].images?.length || 0) > 1 && (
                  <div className="flex justify-center mt-4 gap-2">
                    {detailScenes[scene - 1].images?.map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-2 h-2 rounded-full transition-all ${
                          imageIndex === idx ? 'bg-blue-400 w-8' : 'bg-blue-600/40'
                        }`}
                      />
                    ))}
                  </div>
                )}
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


          </div>
        )}
      </div>

      {/* Navigation buttons - always visible at bottom */}
      {(onBack || onNext || onRestartClick || onFailuresClick || onCaseStudiesClick || onFinishClick) && (
        <motion.div
          className="absolute bottom-8 left-0 right-0 flex justify-center gap-4 flex-wrap z-30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
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
              className="px-6 py-3 bg-green-600/20 text-green-400 rounded-lg hover:bg-green-600/30 transition-all font-semibold border border-green-500/30 hover:border-green-400/50"
            >
              Finish Presentation →
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
          {onCaseStudiesClick && (
            <button
              onClick={onCaseStudiesClick}
              className="px-6 py-3 bg-teal-600/20 text-teal-400 rounded-lg hover:bg-teal-600/30 transition-all font-semibold border border-teal-500/30 hover:border-teal-400/50"
            >
              Case Studies →
            </button>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default DustManagementSlide; 