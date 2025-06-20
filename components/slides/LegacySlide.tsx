import React, { useEffect, useRef, useState, useCallback } from "react";
import { PlayButton } from "../PlayButton";

interface LegacySlideProp {
  onPrev?: () => void;
  onNext?: () => void;
  onVideoEnd?: () => void;
}

const LegacySlide: React.FC<LegacySlideProp> = ({ onPrev, onNext, onVideoEnd }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(true);

  const handleVideoPlay = useCallback(async () => {
    console.log('handleVideoPlay called, isPlaying:', isPlaying);
    const video = videoRef.current;
    if (!video) {
      console.log('No video element found');
      return;
    }

    try {
      if (isPlaying) {
        console.log('Pausing video');
        video.pause();
        setIsPlaying(false);
        setShowPlayButton(true);
      } else {
        console.log('Playing video with sound');
        // Ensure video is unmuted
        video.muted = false;
        await video.play();
        setIsPlaying(true);
        setShowPlayButton(false);
      }
    } catch (error) {
      console.error('Error playing video:', error);
      // If video fails to play, just proceed to next slide
      if (onVideoEnd) {
        console.log('Video failed, calling onVideoEnd');
        onVideoEnd();
      }
    }
  }, [isPlaying, onVideoEnd]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      console.log('Key pressed:', e.key);
      if (e.key === 'ArrowRight' && onNext) {
        console.log('Going to next slide');
        onNext();
      } else if (e.key === 'ArrowLeft' && onPrev) {
        console.log('Going to previous slide');
        onPrev();
      } else if (e.key === ' ' || e.key === 'Enter') {
        console.log('Space/Enter pressed, playing video');
        e.preventDefault();
        handleVideoPlay();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNext, onPrev, handleVideoPlay]);

  const handleVideoEnd = () => {
    setIsPlaying(false);
    setShowPlayButton(true);
    if (onVideoEnd) {
      onVideoEnd();
    }
  };

  const handleVideoClick = (e: React.MouseEvent) => {
    // Prevent event bubbling if clicking on the play button
    if ((e.target as HTMLElement).closest('.play-button')) {
      return;
    }
    if (!isPlaying) {
      handleVideoPlay();
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen relative"
      data-model-id="2:5114"
      tabIndex={0}
    >
      <div className="h-[400px] pt-24 pb-[90px] px-0 flex flex-col items-center justify-center relative w-full bg-[color:var(--1-color-modes-colors-background-bg-primary-solid)]">
        <div className="items-center gap-8 mb-[-2.00px] flex flex-col max-w-screen-xl px-8 py-0 relative w-full flex-[0_0_auto]">
          <div className="gap-12 flex flex-col items-center justify-center relative w-full flex-[0_0_auto]">
            <div className="flex flex-col max-w-screen-lg items-center justify-center gap-[11px] relative w-full flex-[0_0_auto]">
              <div className="flex flex-col items-center gap-4 relative w-full flex-[0_0_auto]">


                <p className="max-w-[488px] text-center relative bg-[linear-gradient(0deg,rgba(106,133,182,1)_0%,rgba(186,200,224,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] font-display-sm-medium-italic font-[number:var(--display-sm-medium-italic-font-weight)] [font-style:var(--display-sm-medium-italic-font-style)] text-transparent text-[length:var(--display-sm-medium-italic-font-size)] tracking-[var(--display-sm-medium-italic-letter-spacing)] leading-[var(--display-sm-medium-italic-line-height)]">
                  Coming together is a beginning. Keeping together is progress.
                  Working together is success.
                </p>

                <div className="text-center relative bg-[linear-gradient(0deg,rgba(106,133,182,1)_0%,rgba(186,200,224,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] font-display-sm-medium-italic font-[number:var(--display-sm-medium-italic-font-weight)] [font-style:var(--display-sm-medium-italic-font-style)] text-transparent text-[length:var(--display-sm-medium-italic-font-size)] tracking-[var(--display-sm-medium-italic-letter-spacing)] leading-[var(--display-sm-medium-italic-line-height)]">
                  -Henry Ford
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-0 pb-24 px-0 flex-[0_0_auto] flex flex-col items-center justify-center relative w-full bg-[color:var(--1-color-modes-colors-background-bg-primary-solid)]">
        <div className="items-center flex flex-col max-w-screen-xl px-8 py-0 relative w-full flex-[0_0_auto]">
          <div className="flex flex-col items-center justify-center relative w-full flex-[0_0_auto]">
            <div 
              className="relative w-[916px] h-[516px] shadow-shadows-shadow-3xl rounded-2xl overflow-hidden bg-black cursor-pointer"
              onClick={handleVideoClick}
            >
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                poster="https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/images/video-poster.jpg"
                preload="metadata"
                playsInline
                onEnded={handleVideoEnd}
                onPause={() => {
                  setIsPlaying(false);
                  setShowPlayButton(true);
                }}
                onPlay={() => {
                  setIsPlaying(true);
                  setShowPlayButton(false);
                }}
              >
                <source src="https://post-tension-assets-2025.s3.us-west-2.amazonaws.com/videos/intro.mp4" type="video/mp4" />
                <div className="w-full h-full bg-gradient-to-br from-blue-900 to-gray-900 flex items-center justify-center">
                  <span className="text-white text-lg">Video not supported</span>
                </div>
              </video>
              {showPlayButton && (
                <div 
                  className="play-button absolute inset-0 flex items-center justify-center z-10"
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    handleVideoPlay();
                  }}
                >
                  <PlayButton
                    stateProp="hover"
                    style="glassmorphism"
                    styleGlassmorphismClassName=""
                    onClick={handleVideoPlay}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation hints */}
      <div className="absolute bottom-4 right-4 text-white/60 text-sm">
        <p>🔊 Press SPACE or ENTER to play video with sound</p>
        <p>Use ← → arrow keys to navigate</p>
      </div>
    </div>
  );
};

export default LegacySlide;
