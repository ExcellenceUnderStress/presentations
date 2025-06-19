import React from "react";

interface SectionProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  backgroundImage?: string;
  fullScreen?: boolean;
  dark?: boolean;
  id?: string;
  animationDirection?: 'left' | 'right' | 'none';
}

const Section: React.FC<SectionProps> = ({ 
  title, 
  subtitle,
  children, 
  className = "",
  backgroundImage,
  fullScreen = true,
  dark = true,
  id,
  animationDirection = 'right'
}) => {
  const sectionClasses = fullScreen ? "presentation-section" : "py-20";
  const animationClass = animationDirection === 'left' ? 'animate-slideInLeft' : 
                         animationDirection === 'right' ? 'animate-slideInRight' : '';
  
  return (
    <section
      id={id}
      className={`${sectionClasses} ${dark ? 'bg-section-bg text-white' : 'bg-white text-black'} ${backgroundImage ? 'section-bg-image' : ''} ${className}`}
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}
    >
      {backgroundImage && <div className="section-overlay" />}
      
      <div className={`${backgroundImage ? 'relative z-10' : ''} w-full max-w-7xl mx-auto px-6 ${animationClass}`}>
        {subtitle && (
          <p className="section-subtitle text-center">{subtitle}</p>
        )}
        {title && (
          <h2 className="section-title text-center">{title}</h2>
        )}
        <div className="section-content mx-auto">
          {children}
        </div>
      </div>
    </section>
  );
};

export default Section; 