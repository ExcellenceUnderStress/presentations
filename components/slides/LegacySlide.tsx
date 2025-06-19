import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
const LEGACY_VIDEO = "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/videos/intro.mp4"; // Placeholder video

const LegacySlide: React.FC<{ onPrev?: () => void; onVideoEnd?: () => void }> = ({ onPrev, onVideoEnd }) => {
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
  }, []);

  const handleVideoEnd = () => {
    setVideoEnded(true);
    setTimeout(() => {
      if (onVideoEnd) onVideoEnd();
    }, 1200);
  };

  return (
    <motion.div
      className="relative w-full h-screen overflow-hidden bg-black"
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: videoEnded ? 0.9 : 1 }}
      exit={{ opacity: 0, x: videoEnded ? "-100vw" : 0, scale: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      {/* Video with Ken Burns effect - no overlay, just pure video */}
      <motion.video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster="/api/placeholder/1920/1080"
        onEnded={handleVideoEnd}
        initial={{ scale: 1, opacity: 0 }}
        animate={{ scale: videoEnded ? 1.1 : 1.05, opacity: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      >
        <source src={LEGACY_VIDEO} type="video/mp4" />
      </motion.video>
    </motion.div>
  );
};

export default LegacySlide; 