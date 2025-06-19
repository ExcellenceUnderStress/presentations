import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CaseStudy {
  id: string;
  title: string;
  client: string;
  location: string;
  challenge: string;
  solution: string;
  results: string[];
  images: string[];
  stats: {
    label: string;
    value: string;
    unit?: string;
  }[];
  tags: string[];
}

interface CaseStudiesSlideProp {
  solutionType: "repair" | "barrier" | "innovations" | "safety";
  onBack?: () => void;
  onNext?: () => void;
}

const CaseStudiesSlide: React.FC<CaseStudiesSlideProp> = ({ solutionType, onBack, onNext }) => {
  const [currentStudy, setCurrentStudy] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);

  const caseStudies: Record<string, CaseStudy[]> = {
    repair: [
      {
        id: "repair-1",
        title: "Downtown Office Complex Restoration",
        client: "Metropolitan Properties",
        location: "Seattle, WA",
        challenge: "Severe corrosion in post-tensioned parking garage threatening structural integrity",
        solution: "Complete tendon replacement with corrosion mitigation system and concrete restoration",
        results: [
          "Extended structure life by 30+ years",
          "Prevented costly demolition",
          "Maintained full operational capacity during repairs",
          "Zero safety incidents during 6-month project"
        ],
        images: [
          "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/Prior+to+Repairs+starting.jpg",
          "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/Epoxy+Live+Strand+Re-Anchoring.JPG"
        ],
        stats: [
          { label: "Tendons Replaced", value: "240", unit: "units" },
          { label: "Project Duration", value: "6", unit: "months" },
          { label: "Cost Savings vs Rebuild", value: "75", unit: "%" },
          { label: "Life Extension", value: "30+", unit: "years" }
        ],
        tags: ["Corrosion Mitigation", "Live Scanning", "Strand Replacement"]
      },
      {
        id: "repair-2",
        title: "Historic Bridge Rehabilitation",
        client: "State Department of Transportation",
        location: "Portland, OR",
        challenge: "Critical post-tensioning failures in 40-year-old bridge deck",
        solution: "Precision de-tensioning and re-anchoring with upgraded materials",
        results: [
          "Restored full load capacity",
          "Improved safety ratings",
          "Minimal traffic disruption",
          "Enhanced durability with modern materials"
        ],
        images: [
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&h=900&fit=crop",
          "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1600&h=900&fit=crop"
        ],
        stats: [
          { label: "Bridge Length", value: "1,200", unit: "ft" },
          { label: "Traffic Maintained", value: "95", unit: "%" },
          { label: "Load Capacity Restored", value: "100", unit: "%" },
          { label: "Project Completion", value: "On", unit: "time" }
        ],
        tags: ["Bridge Rehabilitation", "De-tensioning", "Traffic Management"]
      }
    ],
    barrier: [
      {
        id: "barrier-1",
        title: "Highway Safety Barrier Installation",
        client: "State Highway Authority",
        location: "California Central Valley",
        challenge: "High-speed corridor requiring robust barrier system for vehicle containment",
        solution: "Custom-engineered barrier cable system with in-house manufacturing and testing",
        results: [
          "Exceeded MASH safety standards",
          "Reduced installation time by 40%",
          "Enhanced vehicle containment performance",
          "Cost-effective long-term solution"
        ],
        images: [
          "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1600&h=900&fit=crop",
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&h=900&fit=crop"
        ],
        stats: [
          { label: "Barrier Length", value: "5.2", unit: "miles" },
          { label: "Installation Time Saved", value: "40", unit: "%" },
          { label: "Safety Rating", value: "MASH", unit: "TL-3" },
          { label: "Load Testing", value: "100", unit: "%" }
        ],
        tags: ["MASH Compliance", "Load Testing", "Custom Manufacturing"]
      }
    ],
    innovations: [
      {
        id: "innovation-1",
        title: "Fortis Pile System Implementation",
        client: "Urban Development Corp",
        location: "San Francisco, CA",
        challenge: "Limited space for traditional foundation systems in dense urban environment",
        solution: "Fortis Pile system with advanced anchoring technology",
        results: [
          "50% reduction in installation footprint",
          "Faster project completion",
          "Superior load-bearing capacity",
          "Minimal site disruption"
        ],
        images: [
          "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1600&h=900&fit=crop",
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&h=900&fit=crop"
        ],
        stats: [
          { label: "Footprint Reduction", value: "50", unit: "%" },
          { label: "Load Capacity", value: "150", unit: "kips" },
          { label: "Installation Speed", value: "3x", unit: "faster" },
          { label: "Space Efficiency", value: "75", unit: "%" }
        ],
        tags: ["Fortis Pile", "Urban Construction", "Space Efficiency"]
      }
    ],
    safety: [
      {
        id: "safety-1",
        title: "Zero-Incident Industrial Project",
        client: "Manufacturing Facility",
        location: "Phoenix, AZ",
        challenge: "High-risk post-tensioning work in active industrial environment",
        solution: "Comprehensive safety protocols with PTI-certified team and silica management",
        results: [
          "Zero safety incidents over 8 months",
          "100% compliance with OSHA standards",
          "Improved worker satisfaction",
          "Client safety award recognition"
        ],
        images: [
          "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1600&h=900&fit=crop",
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&h=900&fit=crop"
        ],
        stats: [
          { label: "Safety Incidents", value: "0", unit: "incidents" },
          { label: "OSHA Compliance", value: "100", unit: "%" },
          { label: "PTI Certified Staff", value: "100", unit: "%" },
          { label: "Project Duration", value: "8", unit: "months" }
        ],
        tags: ["PTI Certified", "OSHA Compliance", "Silica Management"]
      }
    ]
  };

  const studies = caseStudies[solutionType] || [];
  const currentCaseStudy = studies[currentStudy];

  const solutionConfig = {
    repair: {
      title: "Repair & Retrofit",
      gradient: "from-emerald-400 to-emerald-600",
      bgGradient: "from-emerald-900/20 to-emerald-900/20",
      accentColor: "emerald-400",
      accentColorDark: "emerald-500",
      accentColorBg: "emerald-600/20",
      accentColorBorder: "emerald-500/30"
    },
    barrier: {
      title: "Barrier Cable Systems",
      gradient: "from-blue-400 to-blue-600",
      bgGradient: "from-blue-900/20 to-blue-900/20",
      accentColor: "blue-400",
      accentColorDark: "blue-500",
      accentColorBg: "blue-600/20",
      accentColorBorder: "blue-500/30"
    },
    innovations: {
      title: "Innovations",
      gradient: "from-purple-400 to-purple-600",
      bgGradient: "from-purple-900/20 to-purple-900/20",
      accentColor: "purple-400",
      accentColorDark: "purple-500",
      accentColorBg: "purple-600/20",
      accentColorBorder: "purple-500/30"
    },
    safety: {
      title: "Safety",
      gradient: "from-yellow-400 to-orange-600",
      bgGradient: "from-yellow-900/20 to-orange-900/20",
      accentColor: "orange-400",
      accentColorDark: "orange-500",
      accentColorBg: "orange-600/20",
      accentColorBorder: "orange-500/30"
    }
  };

  const config = solutionConfig[solutionType];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        if (currentCaseStudy && imageIndex < currentCaseStudy.images.length - 1) {
          setImageIndex(prev => prev + 1);
        } else if (currentStudy < studies.length - 1) {
          setCurrentStudy(prev => prev + 1);
          setImageIndex(0);
        } else if (onNext) {
          onNext();
        }
        e.preventDefault();
      } else if (e.key === "ArrowLeft") {
        if (imageIndex > 0) {
          setImageIndex(prev => prev - 1);
        } else if (currentStudy > 0) {
          setCurrentStudy(prev => prev - 1);
          const prevStudy = studies[currentStudy - 1];
          setImageIndex(prevStudy.images.length - 1);
        } else if (onBack) {
          onBack();
        }
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentStudy, imageIndex, studies.length, onBack, onNext, currentCaseStudy]);

  if (!currentCaseStudy) {
    return (
      <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-4">No Case Studies Available</h2>
          <p className="text-gray-400">Case studies for {config.title} are coming soon.</p>
          {onBack && (
            <button
              onClick={onBack}
              className="mt-8 px-6 py-3 bg-gray-600/20 text-gray-400 rounded-lg hover:bg-gray-600/30 transition-all"
            >
              ← Back
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900`}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(16, 185, 129, 0.1) 35px, rgba(16, 185, 129, 0.1) 70px)`,
        }} />
      </div>

      {/* Header */}
      <div className="absolute top-8 left-0 right-0 text-center z-20">
        <motion.h2 
          className="text-3xl md:text-5xl font-black text-white tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {config.title}
          <span className={`text-transparent bg-clip-text bg-gradient-to-r ${config.gradient}`}> Case Studies</span>
        </motion.h2>
        <div className="flex justify-center mt-4 gap-2">
          {studies.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentStudy(index);
                setImageIndex(0);
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                currentStudy === index ? `bg-${config.accentColor}-400 w-8` : `bg-${config.accentColor}-600/40`
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full pt-24 pb-8 px-8">
        <div className="max-w-7xl mx-auto h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentStudy}-${imageIndex}`}
              className="grid grid-cols-12 gap-8 h-full"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Left Column - Project Info */}
              <div className="col-span-4 space-y-6">
                {/* Project Header */}
                <div className={`bg-gradient-to-br ${config.bgGradient} p-6 rounded-2xl border border-white/10`}>
                  <h3 className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${config.gradient} mb-2`}>
                    {currentCaseStudy.title}
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-300"><span className="font-semibold">Client:</span> {currentCaseStudy.client}</p>
                    <p className="text-gray-300"><span className="font-semibold">Location:</span> {currentCaseStudy.location}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {currentCaseStudy.tags.map((tag, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1 text-xs rounded-full bg-${config.accentColor}-500/20 text-${config.accentColor}-300 border border-${config.accentColor}-500/30`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Challenge & Solution */}
                <div className={`bg-gradient-to-br ${config.bgGradient} p-6 rounded-2xl border border-white/10`}>
                  <h4 className={`text-lg font-bold text-${config.accentColor}-400 mb-3`}>Challenge</h4>
                  <p className="text-gray-300 text-sm mb-4">{currentCaseStudy.challenge}</p>
                  
                  <h4 className={`text-lg font-bold text-${config.accentColor}-400 mb-3`}>Solution</h4>
                  <p className="text-gray-300 text-sm">{currentCaseStudy.solution}</p>
                </div>

                {/* Stats */}
                <div className={`bg-gradient-to-br ${config.bgGradient} p-6 rounded-2xl border border-white/10`}>
                  <h4 className={`text-lg font-bold text-${config.accentColor}-400 mb-4`}>Key Metrics</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {currentCaseStudy.stats.map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className={`text-2xl font-bold text-${config.accentColor}-400`}>
                          {stat.value}
                          {stat.unit && <span className="text-sm text-gray-400 ml-1">{stat.unit}</span>}
                        </div>
                        <div className="text-xs text-gray-400">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Center Column - Image */}
              <div className="col-span-5">
                <div className="relative h-full rounded-2xl overflow-hidden shadow-2xl bg-gray-900">
                  <img
                    src={currentCaseStudy.images[imageIndex]}
                    alt={`${currentCaseStudy.title} - Image ${imageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <h4 className="text-white text-xl font-bold">{currentCaseStudy.title}</h4>
                    <p className="text-gray-300 text-sm">{currentCaseStudy.location}</p>
                  </div>
                  
                  {/* Image indicators */}
                  {currentCaseStudy.images.length > 1 && (
                    <div className="absolute top-4 right-4 flex gap-1">
                      {currentCaseStudy.images.map((_, idx) => (
                        <div
                          key={idx}
                          className={`w-2 h-2 rounded-full transition-all ${
                            imageIndex === idx ? `bg-${config.accentColor}-400` : 'bg-white/40'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column - Results */}
              <div className="col-span-3">
                <div className={`bg-gradient-to-br ${config.bgGradient} p-6 rounded-2xl border border-white/10 h-full`}>
                  <h4 className={`text-lg font-bold text-${config.accentColor}-400 mb-4`}>Results & Impact</h4>
                  <ul className="space-y-3">
                    {currentCaseStudy.results.map((result, index) => (
                      <motion.li
                        key={index}
                        className="text-gray-300 flex items-start text-sm"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <span className={`w-2 h-2 rounded-full bg-${config.accentColor}-500 mr-3 mt-2 flex-shrink-0`}></span>
                        <span>{result}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4">
          {onBack && (
            <button
              onClick={onBack}
              className={`px-6 py-3 bg-${config.accentColor}-600/20 text-${config.accentColor}-400 rounded-lg hover:bg-${config.accentColor}-600/30 transition-all font-semibold border border-${config.accentColor}-500/30 hover:border-${config.accentColor}-400/50`}
            >
              ← Back to {config.title}
            </button>
          )}
          {onNext && (
            <button
              onClick={onNext}
              className={`px-6 py-3 bg-${config.accentColor}-600/20 text-${config.accentColor}-400 rounded-lg hover:bg-${config.accentColor}-600/30 transition-all font-semibold border border-${config.accentColor}-500/30 hover:border-${config.accentColor}-400/50`}
            >
              Continue →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaseStudiesSlide;
