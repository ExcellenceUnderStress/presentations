import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
const LEGACY_VIDEO = "https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/videos/intro.mp4"; // Placeholder video

const LegacySlide: React.FC<{ onVideoEnd?: () => void }> = ({ onVideoEnd }) => {
  const [videoEnded, setVideoEnded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const handleClick = useCallback((event: React.MouseEvent) => {
    // If in fullscreen, toggle play/pause
    // Otherwise, advance to next slide (click through)
    if (isFullscreen) {
      event.preventDefault();
      if (!videoRef.current) return;
      
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      // Click through to next slide
      if (onVideoEnd) {
        onVideoEnd();
      }
    }
  }, [isPlaying, isFullscreen, onVideoEnd]);

  const togglePlayPause = useCallback(() => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const toggleFullscreen = useCallback(async () => {
    if (!containerRef.current) return;

    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (error) {
      console.error('Error toggling fullscreen:', error);
    }
  }, []);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'f' || event.key === 'F') {
        event.preventDefault();
        toggleFullscreen();
      } else if (event.key === ' ') {
        event.preventDefault();
        togglePlayPause();
      }
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [toggleFullscreen, togglePlayPause]);

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-black cursor-pointer"
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: videoEnded ? 0.9 : 1 }}
      exit={{ opacity: 0, x: videoEnded ? "-100vw" : 0, scale: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      onClick={handleClick}
    >
      {/* Video with Ken Burns effect - clickable for play/pause */}
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

      {/* Fullscreen indicator */}
      {isFullscreen && (
        <motion.div
          className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          Press F to exit fullscreen
        </motion.div>
      )}

      {/* Play/Pause indicator */}
      {!isPlaying && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          <div className="bg-black bg-opacity-50 rounded-full p-4">
            <svg
              className="w-12 h-12 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </motion.div>
      )}

      {/* Controls hint */}
      <motion.div
        className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded text-sm"
        initial={{ opacity: 1 }}
        animate={{ opacity: videoEnded ? 0 : 1 }}
        transition={{ delay: 3, duration: 0.5 }}
      >
        {isFullscreen ? "Click to play/pause • Press F to exit fullscreen" : "Click to advance • Press F for fullscreen • Space to pause"}
      </motion.div>
    </motion.div>
  );
};

export default LegacySlide;
