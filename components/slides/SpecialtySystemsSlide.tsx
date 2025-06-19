import React, { useEffect, useRef, useState } from "react";

const SpecialtySystemsSlide: React.FC<{ onBack?: () => void }> = ({ onBack }) => {
  const [currentSubscene, setCurrentSubscene] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const subscenes = [
    {
      title: "Scanning & Strike Prevention",
      subtitle: "GPR scanning helps us locate tendons before coring or cutting",
      content: [
        { label: "Prevents costly accidents and jobsite disruptions" },
        { label: "Protects liability for GCs and owners" },
        { label: "We handle scanning in-house with highly trained technicians" }
      ]
    },
    {
      title: "Tools & Techniques That Set Us Apart",
      subtitle: "Proprietary jacking and stressing equipment",
      content: [
        { label: "Field-built custom de-tensioning setups" },
        { label: "Mobile onsite fabrication" },
        { label: "Minimal demo approaches to preserve structural integrity" },
        { label: "Full load documentation and engineer sign-off on all repairs" }
      ]
    },
    {
      title: "Certifications, Safety & Compliance",
      subtitle: "PTI Certified Personnel & Materials",
      content: [
        { label: "Full compliance with ACI, PTI, and all governing standards" },
        { label: "Specialized insurance tailored for PT work" },
        { label: "Continuous training and zero-compromise safety culture" },
        { label: "We protect people, projects, and reputations every time" }
      ]
    }
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        if (currentSubscene > 0) {
          setCurrentSubscene(currentSubscene - 1);
        } else if (onBack) {
          onBack();
        }
        e.preventDefault();
      } else if (e.key === "ArrowRight" && currentSubscene < subscenes.length - 1) {
        setCurrentSubscene(currentSubscene + 1);
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSubscene, onBack]);

  const current = subscenes[currentSubscene];

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900">
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center px-8">
        <h2 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tight">
          Specialty Systems
        </h2>
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">{current.title}</h3>
        <p className="text-xl md:text-2xl text-gray-300 mb-8">{current.subtitle}</p>
        <ul className="space-y-4 text-white text-lg max-w-3xl">
          {current.content.map((item, index) => (
            <li key={index}>{item.label}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SpecialtySystemsSlide; 