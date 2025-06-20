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
  solutionType: "main" | "overview" | "company" | "repair" | "barrier" | "innovations" | "safety";
  onBack?: () => void;
  onNext?: () => void;
  onSolutionsClick?: () => void;
  onFinishClick?: () => void;
  onRestartClick?: () => void;
}

const CaseStudiesSlide: React.FC<CaseStudiesSlideProp> = ({ solutionType, onBack, onNext, onSolutionsClick, onFinishClick, onRestartClick }) => {
  const [currentStudy, setCurrentStudy] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);

  const caseStudies: Record<string, CaseStudy[]> = {
    main: [
      {
        id: "main-1",
        title: "Microsoft Building 122 Retrofit",
        client: "Microsoft Corporation",
        location: "Redmond, WA",
        challenge: "Removing post-tensioned slabs to create HVAC penetrations, skylights, and expansive atrium openings, involving over 1,200 tendons in an occupied building",
        solution: "Specialized de-tensioning and re-anchoring process with complete resealing of post-tensioning anchors, achieving modifications without shoring the entire building",
        results: [
          "Improved interior lighting and workspace quality",
          "Maintained structural integrity throughout retrofit",
          "Minimal disruption to building operations",
          "Featured on front of PTI magazine",
          "2019 NAIOP WA State Redevelopment/Renovation of the Year winner",
          "2019 DBIA National Award of Merit recipient"
        ],
        images: [
          "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/ms1223.JPG",
          "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/ms1221.JPG",
          "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/ms1222.JPG",
          "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/m122duriing.jpg",
          "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/MS+new+opening.JPG",
          "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/m122after.jpg"
        ],
        stats: [
          { label: "Tendons Involved", value: "1,200+", unit: "tendons" },
          { label: "Awards Won", value: "3", unit: "major awards" },
          { label: "Building Occupancy", value: "100", unit: "% maintained" },
          { label: "PTI Magazine", value: "Front", unit: "cover feature" }
        ],
        tags: ["Microsoft", "Large-Scale Retrofit", "Award Winner", "PTI Featured", "Live Building"]
      },
      {
        id: "main-2",
        title: "Kirkland Urban PT Building Retrofit",
        client: "Urban Development Project",
        location: "Kirkland, WA",
        challenge: "Creating five stories of 20′ radius openings in existing PT deck, including 8′ x 8′ skylight for feature stair, plus elevator and stair modifications",
        solution: "Patented system for precise tendon de-tensioning and relocation without full-scale shoring, enabling complex modifications while maintaining structural integrity",
        results: [
          "Successfully created multiple large openings without structural compromise",
          "Eliminated need for extensive shoring systems",
          "Significant time and cost savings over traditional methods",
          "Enabled architectural vision with complex geometric requirements"
        ],
        images: [
          "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/kirkurbmain.jpg",
          "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/kirkurbmain2.jpg",
          "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/openingstairvertbefore.jpg",
          "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/openingstairverthole.jpg",
          "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/openingstairvertafter.jpg",
          "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/Kirkland Spiral Stair 1 Looking Down.JPG"
        ],
        stats: [
          { label: "Stories Modified", value: "5", unit: "floors" },
          { label: "Opening Diameter", value: "20", unit: "ft" },
          { label: "Skylight Size", value: "8×8", unit: "ft" },
          { label: "Completion Date", value: "09/2020", unit: "" }
        ],
        tags: ["PT Retrofit", "Patented System", "Urban Development", "De-tensioning"]
      },
      {
        id: "main-3",
        title: "Emerald Queen Casino Parking Garage",
        client: "Emerald Queen Casino",
        location: "Tacoma, WA",
        challenge: "Shoring system needed in a tight, congested environment without the need for tiebacks or additional easement rights",
        solution: "Implemented our patented Fortis Pile Shoring system, streamlining construction without requiring tiebacks or easement rights",
        results: [
          "Eliminated need for tiebacks in congested site",
          "No additional easement rights required",
          "Streamlined construction process",
          "Successfully managed tight space constraints",
          "Custom fabrication met specific project needs"
        ],
        images: [
          "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/fortispilemain.png",
          "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/fortispilemain2.png",
          "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/fortispilemain3.png",
          "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/fortispilemain4.png"
        ],
        stats: [
          { label: "Project Year", value: "2016", unit: "" },
          { label: "System Type", value: "Fortis", unit: "Pile Shoring" },
          { label: "Tiebacks Needed", value: "0", unit: "" },
          { label: "Patent Status", value: "Patented", unit: "System" }
        ],
        tags: ["Fortis Pile", "Shoring System", "Custom Fabrications", "Patented Systems", "2016"]
      }
    ],
    overview: [
      {
        id: "overview-1",
        title: "Microsoft Building 122 Retrofit",
        client: "Microsoft Corporation",
        location: "Redmond, WA",
        challenge: "Removing post-tensioned slabs to create HVAC penetrations, skylights, and expansive atrium openings, involving over 1,200 tendons in an occupied building",
        solution: "Specialized de-tensioning and re-anchoring process with complete resealing of post-tensioning anchors, achieving modifications without shoring the entire building",
        results: [
          "Improved interior lighting and workspace quality",
          "Maintained structural integrity throughout retrofit",
          "Minimal disruption to building operations",
          "Featured on front of PTI magazine",
          "2019 NAIOP WA State Redevelopment/Renovation of the Year winner",
          "2019 DBIA National Award of Merit recipient"
        ],
        images: [
          "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/ms1223.JPG",
          "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/ms1221.JPG",
          "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/ms1222.JPG",
          "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/m122duriing.jpg",
          "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/MS+new+opening.JPG",
          "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/m122after.jpg"
        ],
        stats: [
          { label: "Tendons Involved", value: "1,200+", unit: "tendons" },
          { label: "Awards Won", value: "3", unit: "major awards" },
          { label: "Building Occupancy", value: "100", unit: "% maintained" },
          { label: "PTI Magazine", value: "Front", unit: "cover feature" }
        ],
        tags: ["Microsoft", "Large-Scale Retrofit", "Award Winner", "PTI Featured", "Live Building"]
      }
    ],
    company: [
      {
        id: "company-1",
        title: "Microsoft Building 122 Retrofit",
        client: "Microsoft Corporation",
        location: "Redmond, WA",
        challenge: "Removing post-tensioned slabs to create HVAC penetrations, skylights, and expansive atrium openings, involving over 1,200 tendons in an occupied building",
        solution: "Specialized de-tensioning and re-anchoring process with complete resealing of post-tensioning anchors, achieving modifications without shoring the entire building",
        results: [
          "Improved interior lighting and workspace quality",
          "Maintained structural integrity throughout retrofit",
          "Minimal disruption to building operations",
          "Featured on front of PTI magazine",
          "2019 NAIOP WA State Redevelopment/Renovation of the Year winner",
          "2019 DBIA National Award of Merit recipient"
        ],
        images: [
          "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/ms1223.JPG",
          "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/ms1221.JPG",
          "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/ms1222.JPG",
          "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/m122duriing.jpg",
          "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/MS+new+opening.JPG",
          "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/m122after.jpg"
        ],
        stats: [
          { label: "Tendons Involved", value: "1,200+", unit: "tendons" },
          { label: "Awards Won", value: "3", unit: "major awards" },
          { label: "Building Occupancy", value: "100", unit: "% maintained" },
          { label: "PTI Magazine", value: "Front", unit: "cover feature" }
        ],
        tags: ["Microsoft", "Large-Scale Retrofit", "Award Winner", "PTI Featured", "Live Building"]
      }
    ],
    repair: [
      {
        id: "repair-1",
        title: "Microsoft Building 122 Retrofit",
        client: "Microsoft Corporation",
        location: "Redmond, WA",
        challenge: "Removing post-tensioned slabs to create HVAC penetrations, skylights, and expansive atrium openings, involving over 1,200 tendons in an occupied building",
        solution: "Specialized de-tensioning and re-anchoring process with complete resealing of post-tensioning anchors, achieving modifications without shoring the entire building",
        results: [
          "Improved interior lighting and workspace quality",
          "Maintained structural integrity throughout retrofit",
          "Minimal disruption to building operations",
          "Featured on front of PTI magazine",
          "2019 NAIOP WA State Redevelopment/Renovation of the Year winner",
          "2019 DBIA National Award of Merit recipient"
        ],
        images: [
          "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/ms1223.JPG",
          "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/ms1221.JPG",
          "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/ms1222.JPG",
          "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/m122duriing.jpg",
          "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/MS+new+opening.JPG",
          "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/m122after.jpg"
        ],
        stats: [
          { label: "Tendons Involved", value: "1,200+", unit: "tendons" },
          { label: "Awards Won", value: "3", unit: "major awards" },
          { label: "Building Occupancy", value: "100", unit: "% maintained" },
          { label: "PTI Magazine", value: "Front", unit: "cover feature" }
        ],
        tags: ["Microsoft", "Large-Scale Retrofit", "Award Winner", "PTI Featured", "Live Building"]
      },
      {
        id: "repair-2",
        title: "Kirkland Urban PT Building Retrofit",
        client: "Urban Development Project",
        location: "Kirkland, WA",
        challenge: "Creating five stories of 20′ radius openings in existing PT deck, including 8′ x 8′ skylight for feature stair, plus elevator and stair modifications",
        solution: "Patented system for precise tendon de-tensioning and relocation without full-scale shoring, enabling complex modifications while maintaining structural integrity",
        results: [
          "Successfully created multiple large openings without structural compromise",
          "Eliminated need for extensive shoring systems",
          "Significant time and cost savings over traditional methods",
          "Enabled architectural vision with complex geometric requirements"
        ],
        images: [
          "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/kirkurbmain.jpg",
          "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/kirkurbmain2.jpg",
          "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/openingstairvertbefore.jpg",
          "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/openingstairverthole.jpg",
          "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/openingstairvertafter.jpg",
          "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/Kirkland Spiral Stair 1 Looking Down.JPG"
        ],
        stats: [
          { label: "Stories Modified", value: "5", unit: "floors" },
          { label: "Opening Diameter", value: "20", unit: "ft" },
          { label: "Skylight Size", value: "8×8", unit: "ft" },
          { label: "Completion Date", value: "09/2020", unit: "" }
        ],
        tags: ["PT Retrofit", "Patented System", "Urban Development", "De-tensioning"]
      }
    ],
    barrier: [
      {
        id: "barrier-1",
        title: "Microsoft Building 122 Retrofit",
        client: "Microsoft Corporation",
        location: "Redmond, WA",
        challenge: "Removing post-tensioned slabs to create HVAC penetrations, skylights, and expansive atrium openings, involving over 1,200 tendons in an occupied building",
        solution: "Specialized de-tensioning and re-anchoring process with complete resealing of post-tensioning anchors, achieving modifications without shoring the entire building",
        results: [
          "Improved interior lighting and workspace quality",
          "Maintained structural integrity throughout retrofit",
          "Minimal disruption to building operations",
          "Featured on front of PTI magazine",
          "2019 NAIOP WA State Redevelopment/Renovation of the Year winner",
          "2019 DBIA National Award of Merit recipient"
        ],
        images: [
          "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/ms1223.JPG",
          "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/ms1221.JPG",
          "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/ms1222.JPG",
          "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/m122duriing.jpg",
          "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/MS+new+opening.JPG",
          "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/m122after.jpg"
        ],
        stats: [
          { label: "Tendons Involved", value: "1,200+", unit: "tendons" },
          { label: "Awards Won", value: "3", unit: "major awards" },
          { label: "Building Occupancy", value: "100", unit: "% maintained" },
          { label: "PTI Magazine", value: "Front", unit: "cover feature" }
        ],
        tags: ["Microsoft", "Large-Scale Retrofit", "Award Winner", "PTI Featured", "Live Building"]
      }
    ],
    innovations: [
      {
        id: "innovation-1",
        title: "Emerald Queen Casino Parking Garage",
        client: "Emerald Queen Casino",
        location: "Tacoma, WA",
        challenge: "Shoring system needed in a tight, congested environment without the need for tiebacks or additional easement rights",
        solution: "Implemented our patented Fortis Pile Shoring system, streamlining construction without requiring tiebacks or easement rights",
        results: [
          "Eliminated need for tiebacks in congested site",
          "No additional easement rights required",
          "Streamlined construction process",
          "Successfully managed tight space constraints",
          "Custom fabrication met specific project needs"
        ],
        images: [
          "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/fortispilemain.png",
          "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/fortispilemain2.png",
          "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/fortispilemain3.png",
          "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/fortispilemain4.png"
        ],
        stats: [
          { label: "Project Year", value: "2016", unit: "" },
          { label: "System Type", value: "Fortis", unit: "Pile Shoring" },
          { label: "Tiebacks Needed", value: "0", unit: "" },
          { label: "Patent Status", value: "Patented", unit: "System" }
        ],
        tags: ["Fortis Pile", "Shoring System", "Custom Fabrications", "Patented Systems", "2016"]
      }
    ],
    safety: [
      {
        id: "safety-1",
        title: "Microsoft Building 122 Retrofit",
        client: "Microsoft Corporation",
        location: "Redmond, WA",
        challenge: "Removing post-tensioned slabs to create HVAC penetrations, skylights, and expansive atrium openings, involving over 1,200 tendons in an occupied building",
        solution: "Specialized de-tensioning and re-anchoring process with complete resealing of post-tensioning anchors, achieving modifications without shoring the entire building",
        results: [
          "Improved interior lighting and workspace quality",
          "Maintained structural integrity throughout retrofit",
          "Minimal disruption to building operations",
          "Featured on front of PTI magazine",
          "2019 NAIOP WA State Redevelopment/Renovation of the Year winner",
          "2019 DBIA National Award of Merit recipient"
        ],
        images: [
          "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/ms1223.JPG",
          "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/ms1221.JPG",
          "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/ms1222.JPG",
          "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/m122duriing.jpg",
          "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/MS+new+opening.JPG",
          "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/m122after.jpg"
        ],
        stats: [
          { label: "Tendons Involved", value: "1,200+", unit: "tendons" },
          { label: "Awards Won", value: "3", unit: "major awards" },
          { label: "Building Occupancy", value: "100", unit: "% maintained" },
          { label: "PTI Magazine", value: "Front", unit: "cover feature" }
        ],
        tags: ["Microsoft", "Large-Scale Retrofit", "Award Winner", "PTI Featured", "Live Building"]
      }
    ]
  };

  const studies = caseStudies[solutionType] || [];
  const currentCaseStudy = studies[currentStudy];

  const solutionConfig = {
    main: {
      title: "Case Studies",
      gradient: "from-blue-400 to-emerald-600",
      bgGradient: "from-blue-900/20 to-emerald-900/20",
      accentColor: "blue-400",
      accentColorDark: "blue-500",
      accentColorBg: "blue-600/20",
      accentColorBorder: "blue-500/30"
    },
    overview: {
      title: "Overview",
      gradient: "from-blue-400 to-purple-600",
      bgGradient: "from-blue-900/20 to-purple-900/20",
      accentColor: "blue-400",
      accentColorDark: "blue-500",
      accentColorBg: "blue-600/20",
      accentColorBorder: "blue-500/30"
    },
    company: {
      title: "Company Excellence",
      gradient: "from-teal-400 to-green-600",
      bgGradient: "from-teal-900/20 to-green-900/20",
      accentColor: "teal-400",
      accentColorDark: "teal-500",
      accentColorBg: "teal-600/20",
      accentColorBorder: "teal-500/30"
    },
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
        // First navigate through images in current case study
        if (currentCaseStudy && imageIndex < currentCaseStudy.images.length - 1) {
          setImageIndex(prev => prev + 1);
        }
        // Then navigate to next case study
        else if (currentStudy < studies.length - 1) {
          setCurrentStudy(prev => prev + 1);
          setImageIndex(0);
        }
        // Finally, go to next slide
        else if (onNext) {
          onNext();
        }
        e.preventDefault();
      } else if (e.key === "ArrowLeft") {
        // First navigate back through images in current case study
        if (imageIndex > 0) {
          setImageIndex(prev => prev - 1);
        }
        // Then navigate to previous case study
        else if (currentStudy > 0) {
          setCurrentStudy(prev => prev - 1);
          const prevStudy = studies[currentStudy - 1];
          setImageIndex(prevStudy.images.length - 1); // Start at last image of previous study
        }
        // Finally, go back to previous slide
        else if (onBack) {
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
          {solutionType === "main" ? (
            <>
              Our
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${config.gradient}`}> Success Stories</span>
            </>
          ) : (
            <>
              {config.title}
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${config.gradient}`}> Case Studies</span>
            </>
          )}
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
              key={currentStudy}
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

              {/* Center Column - Image Carousel */}
              <div className="col-span-5">
                <div className="relative h-full rounded-2xl overflow-hidden shadow-2xl bg-gray-900">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={imageIndex}
                      src={currentCaseStudy.images[imageIndex]}
                      alt={`${currentCaseStudy.title} - Image ${imageIndex + 1}`}
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                    />
                  </AnimatePresence>
                  
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <h4 className="text-white text-xl font-bold">{currentCaseStudy.title}</h4>
                    <p className="text-gray-300 text-sm">
                      {currentCaseStudy.images.length > 1 
                        ? `${imageIndex === 0 ? 'During Construction' : 'After Completion'} (${imageIndex + 1}/${currentCaseStudy.images.length})`
                        : currentCaseStudy.location
                      }
                    </p>
                  </div>
                  
                  {/* Image navigation arrows */}
                  {currentCaseStudy.images.length > 1 && (
                    <>
                      <button
                        onClick={() => setImageIndex(prev => prev > 0 ? prev - 1 : currentCaseStudy.images.length - 1)}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
                      >
                        ←
                      </button>
                      <button
                        onClick={() => setImageIndex(prev => prev < currentCaseStudy.images.length - 1 ? prev + 1 : 0)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
                      >
                        →
                      </button>
                    </>
                  )}
                  
                  {/* Image indicators */}
                  {currentCaseStudy.images.length > 1 && (
                    <div className="absolute top-4 right-4 flex gap-1">
                      {currentCaseStudy.images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setImageIndex(idx)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            imageIndex === idx ? `bg-${config.accentColor}-400` : 'bg-white/40 hover:bg-white/60'
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
          
          {/* Special navigation for main case studies (after Our Approach) */}
          {solutionType === "main" && (onSolutionsClick || onFinishClick || onRestartClick) ? (
            <>
              {onSolutionsClick && (
                <button
                  onClick={onSolutionsClick}
                  className="px-6 py-3 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-all font-semibold border border-blue-500/30 hover:border-blue-400/50"
                >
                  View Solutions →
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
              {onRestartClick && (
                <button
                  onClick={onRestartClick}
                  className="px-6 py-3 bg-purple-600/20 text-purple-400 rounded-lg hover:bg-purple-600/30 transition-all font-semibold border border-purple-500/30 hover:border-purple-400/50"
                >
                  ↻ Restart
                </button>
              )}
            </>
          ) :
          /* Special navigation for company case studies (end of About Us flow) */
          solutionType === "company" && (onSolutionsClick || onFinishClick || onRestartClick) ? (
            <>
              {onSolutionsClick && (
                <button
                  onClick={onSolutionsClick}
                  className="px-6 py-3 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-all font-semibold border border-blue-500/30 hover:border-blue-400/50"
                >
                  View Solutions →
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
              {onRestartClick && (
                <button
                  onClick={onRestartClick}
                  className="px-6 py-3 bg-purple-600/20 text-purple-400 rounded-lg hover:bg-purple-600/30 transition-all font-semibold border border-purple-500/30 hover:border-purple-400/50"
                >
                  ↻ Restart
                </button>
              )}
            </>
          ) : (
            onNext && (
              <button
                onClick={onNext}
                className={`px-6 py-3 bg-${config.accentColor}-600/20 text-${config.accentColor}-400 rounded-lg hover:bg-${config.accentColor}-600/30 transition-all font-semibold border border-${config.accentColor}-500/30 hover:border-${config.accentColor}-400/50`}
              >
                Continue →
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default CaseStudiesSlide;
