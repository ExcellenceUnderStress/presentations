import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Animation configuration
export const ANIMATION_CONFIG = {
  duration: {
    fast: 0.3,
    normal: 0.6,
    slow: 1.0,
    cinematic: 1.5
  },
  easing: {
    smooth: "power2.out",
    bounce: "back.out(1.7)",
    elastic: "elastic.out(1, 0.5)",
    cinematic: "power3.inOut"
  },
  stagger: {
    fast: 0.1,
    normal: 0.2,
    slow: 0.3
  }
};

// Core animation utilities
export class AnimationController {
  private timelines: Map<string, gsap.core.Timeline> = new Map();

  // Create or get timeline
  getTimeline(key: string): gsap.core.Timeline {
    if (!this.timelines.has(key)) {
      this.timelines.set(key, gsap.timeline());
    }
    return this.timelines.get(key)!;
  }

  // Kill all timelines
  killAll(): void {
    this.timelines.forEach(timeline => timeline.kill());
    this.timelines.clear();
  }

  // Kill specific timeline
  kill(key: string): void {
    const timeline = this.timelines.get(key);
    if (timeline) {
      timeline.kill();
      this.timelines.delete(key);
    }
  }
}

// Section entrance animations
export const sectionAnimations = {
  // Cinematic section entrance
  enterSection: (sectionId: string, onComplete?: () => void) => {
    const tl = gsap.timeline({ onComplete });
    
    // Fade in background
    tl.fromTo(`#${sectionId}`, 
      { opacity: 0 },
      { opacity: 1, duration: ANIMATION_CONFIG.duration.fast }
    );
    
    // Animate title
    tl.fromTo(`#${sectionId} .section-title`, 
      { y: 50, opacity: 0, scale: 0.9 },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1, 
        duration: ANIMATION_CONFIG.duration.cinematic,
        ease: ANIMATION_CONFIG.easing.cinematic
      },
      "-=0.2"
    );
    
    // Animate subtitle
    tl.fromTo(`#${sectionId} .section-subtitle`, 
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: ANIMATION_CONFIG.duration.normal,
        ease: ANIMATION_CONFIG.easing.smooth
      },
      "-=0.8"
    );
    
    return tl;
  },

  // Exit section animation
  exitSection: (sectionId: string) => {
    return gsap.to(`#${sectionId}`, {
      opacity: 0.3,
      scale: 0.95,
      duration: ANIMATION_CONFIG.duration.fast,
      ease: ANIMATION_CONFIG.easing.smooth
    });
  }
};

// Progressive reveal animations
export const revealAnimations = {
  // Slide in from left (for bullet points)
  slideInLeft: (selector: string, delay: number = 0) => {
    return gsap.fromTo(selector, 
      { x: -60, opacity: 0 },
      { 
        x: 0, 
        opacity: 1, 
        duration: ANIMATION_CONFIG.duration.normal,
        ease: ANIMATION_CONFIG.easing.smooth,
        delay
      }
    );
  },

  // Fade in with scale
  fadeInScale: (selector: string, delay: number = 0) => {
    return gsap.fromTo(selector,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: ANIMATION_CONFIG.duration.normal,
        ease: ANIMATION_CONFIG.easing.bounce,
        delay
      }
    );
  },

  // Staggered grid animation
  staggerGrid: (selector: string, staggerDelay: number = ANIMATION_CONFIG.stagger.normal) => {
    return gsap.fromTo(selector,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: ANIMATION_CONFIG.duration.normal,
        ease: ANIMATION_CONFIG.easing.smooth,
        stagger: staggerDelay
      }
    );
  }
};

// Micro-animations for executive polish
export const microAnimations = {
  // Metric number emphasis
  emphasizeMetric: (selector: string) => {
    return gsap.to(selector, {
      scale: 1.15,
      duration: 0.4,
      ease: ANIMATION_CONFIG.easing.bounce,
      yoyo: true,
      repeat: 1
    });
  },

  // Floating animation for icons
  float: (selector: string, amplitude: number = 10) => {
    return gsap.to(selector, {
      y: -amplitude,
      duration: 2,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    });
  },

  // Pulsing animation
  pulse: (selector: string, scale: number = 1.05) => {
    return gsap.to(selector, {
      scale,
      duration: 1.5,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    });
  },

  // Gentle rotation
  rotate: (selector: string, degrees: number = 360, duration: number = 20) => {
    return gsap.to(selector, {
      rotation: degrees,
      duration,
      ease: "none",
      repeat: -1
    });
  },

  // Shine effect for buttons
  shine: (selector: string) => {
    const tl = gsap.timeline();
    
    // Create shine element if it doesn't exist
    tl.set(selector, { position: "relative", overflow: "hidden" });
    
    // Add shine effect
    tl.fromTo(`${selector}::before`, 
      { x: "-100%", opacity: 0 },
      { x: "100%", opacity: 1, duration: 0.6, ease: "power2.out" }
    );
    
    return tl;
  }
};

// Chart and data animations
export const dataAnimations = {
  // Animated chart bars
  animateChartBars: (selector: string, values: number[], duration: number = 1.5) => {
    const tl = gsap.timeline();
    
    values.forEach((value, index) => {
      tl.fromTo(`${selector} .bar-${index}`, 
        { scaleY: 0, transformOrigin: "bottom" },
        { 
          scaleY: 1, 
          duration: duration / values.length,
          ease: ANIMATION_CONFIG.easing.bounce
        },
        index * 0.2
      );
    });
    
    return tl;
  },

  // Counter animation
  animateCounter: (selector: string, endValue: number, duration: number = 2) => {
    const element = document.querySelector(selector);
    if (!element) return;
    
    const obj = { value: 0 };
    
    return gsap.to(obj, {
      value: endValue,
      duration,
      ease: ANIMATION_CONFIG.easing.smooth,
      onUpdate: () => {
        element.textContent = Math.round(obj.value).toString();
      }
    });
  }
};

// Interactive element animations
export const interactiveAnimations = {
  // 3D model entrance
  model3DEntrance: (selector: string) => {
    const tl = gsap.timeline();
    
    tl.fromTo(selector,
      { opacity: 0, rotationY: -90, scale: 0.8 },
      { 
        opacity: 1, 
        rotationY: 0, 
        scale: 1,
        duration: ANIMATION_CONFIG.duration.cinematic,
        ease: ANIMATION_CONFIG.easing.cinematic
      }
    );
    
    // Add subtle rotation
    tl.to(selector, {
      rotationY: 360,
      duration: 20,
      ease: "none",
      repeat: -1
    });
    
    return tl;
  },

  // Video fade in
  videoFadeIn: (selector: string, overlaySelector?: string) => {
    const tl = gsap.timeline();
    
    tl.fromTo(selector,
      { opacity: 0, scale: 1.1 },
      { 
        opacity: 1, 
        scale: 1,
        duration: ANIMATION_CONFIG.duration.slow,
        ease: ANIMATION_CONFIG.easing.smooth
      }
    );
    
    if (overlaySelector) {
      tl.fromTo(overlaySelector,
        { opacity: 0 },
        { opacity: 0.3, duration: ANIMATION_CONFIG.duration.normal },
        "-=0.5"
      );
    }
    
    return tl;
  },

  // Map pin animations
  animateMapPins: (pins: string[], staggerDelay: number = 0.3) => {
    const tl = gsap.timeline();
    
    pins.forEach((pin, index) => {
      tl.fromTo(pin,
        { scale: 0, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1,
          duration: ANIMATION_CONFIG.duration.normal,
          ease: ANIMATION_CONFIG.easing.bounce
        },
        index * staggerDelay
      );
      
      // Add pulsing effect
      tl.to(pin, {
        scale: 1.2,
        duration: 1,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      }, `-=${ANIMATION_CONFIG.duration.normal * 0.5}`);
    });
    
    return tl;
  }
};

// Utility functions
export const animationUtils = {
  // Create reveal data attribute
  createRevealDataAttr: (sectionId: string, itemIndex: number): string => {
    return `data-reveal="${sectionId}-${itemIndex}"`;
  },

  // Wait for animation to complete
  waitForAnimation: (animation: gsap.core.Animation): Promise<void> => {
    return new Promise(resolve => {
      animation.eventCallback("onComplete", resolve);
    });
  },

  // Batch kill animations
  killAnimations: (selectors: string[]): void => {
    selectors.forEach(selector => {
      gsap.killTweensOf(selector);
    });
  },

  // Set up intersection observer for performance
  setupIntersectionObserver: (
    selector: string, 
    animationCallback: (element: Element) => void
  ): IntersectionObserver => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animationCallback(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll(selector).forEach(el => {
      observer.observe(el);
    });

    return observer;
  }
};

// Export singleton animation controller
export const animationController = new AnimationController();

// CSS Classes for Tailwind-based animations
export const animationClasses = {
  // Floating animation for icons
  float: 'animate-bounce hover:animate-none transition-all duration-500',
  
  // Pulsing animation for prompts and CTAs
  pulse: 'animate-pulse',
  
  // Scale animation for metrics on reveal
  scaleIn: 'transform transition-transform duration-500 hover:scale-110',
  
  // Slide in from left for bullet points
  slideInLeft: 'transform transition-all duration-500 translate-x-[-50px] opacity-0',
  slideInLeftActive: 'transform transition-all duration-500 translate-x-0 opacity-100',
  
  // Fade transitions for sections
  fadeIn: 'transition-opacity duration-300 opacity-0',
  fadeInActive: 'transition-opacity duration-300 opacity-100',
  
  // Smooth section transitions
  sectionTransition: 'transition-all duration-500 ease-in-out',
};

// GSAP Animation Functions for complex animations
export const animations = {
  // Animate bullet point reveal
  revealBullet: (element: HTMLElement, delay: number = 0) => {
    return gsap.fromTo(element, 
      { x: -50, opacity: 0 }, 
      { 
        x: 0, 
        opacity: 1, 
        duration: 0.5, 
        delay,
        ease: "power2.out" 
      }
    );
  },

  // Scale animation for key metrics
  scaleMetric: (element: HTMLElement, scale: number = 1.1) => {
    return gsap.to(element, {
      scale,
      duration: 0.5,
      ease: "power2.out",
      yoyo: true,
      repeat: 1
    });
  },

  // Floating animation for icons
  floatIcon: (element: HTMLElement) => {
    return gsap.to(element, {
      y: -10,
      duration: 2,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    });
  },

  // Pulse animation for continue prompts
  pulseElement: (element: HTMLElement) => {
    return gsap.to(element, {
      scale: 1.05,
      duration: 1,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    });
  },

  // Smooth section transition
  transitionSection: (fromElement: HTMLElement, toElement: HTMLElement) => {
    const tl = gsap.timeline();
    
    tl.to(fromElement, {
      opacity: 0,
      x: -100,
      duration: 0.3,
      ease: "power2.in"
    })
    .fromTo(toElement, 
      { opacity: 0, x: 100 },
      { 
        opacity: 1, 
        x: 0, 
        duration: 0.3, 
        ease: "power2.out" 
      },
      "-=0.1"
    );
    
    return tl;
  },

  // Chart reveal animation
  revealChart: (element: HTMLElement) => {
    return gsap.fromTo(element,
      { opacity: 0, scale: 0.8 },
      { 
        opacity: 1, 
        scale: 1, 
        duration: 0.8, 
        ease: "back.out(1.7)" 
      }
    );
  },

  // Map pin animation
  animateMapPin: (element: HTMLElement, delay: number = 0) => {
    return gsap.fromTo(element,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        delay,
        ease: "back.out(1.7)",
        repeat: -1,
        yoyo: true,
        repeatDelay: 4
      }
    );
  },

  // 3D model container entrance
  reveal3DModel: (element: HTMLElement) => {
    return gsap.fromTo(element,
      { opacity: 0, rotationY: -90 },
      {
        opacity: 1,
        rotationY: 0,
        duration: 1,
        ease: "power2.out"
      }
    );
  },

  // Carousel slide transition
  carouselSlide: (elements: HTMLElement[], direction: 'left' | 'right' = 'left') => {
    const tl = gsap.timeline();
    const moveDistance = direction === 'left' ? -100 : 100;
    
    elements.forEach((element, index) => {
      tl.to(element, {
        x: moveDistance,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in"
      }, index * 0.1);
    });
    
    tl.set(elements, { x: -moveDistance });
    
    elements.forEach((element, index) => {
      tl.to(element, {
        x: 0,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      }, "-=" + (elements.length - index - 1) * 0.1);
    });
    
    return tl;
  },

  // Video overlay fade
  videoOverlay: (element: HTMLElement, show: boolean = true) => {
    return gsap.to(element, {
      opacity: show ? 0.7 : 0,
      duration: 0.5,
      ease: "power2.out"
    });
  },

  // QR code pulse
  qrPulse: (element: HTMLElement) => {
    return gsap.to(element, {
      scale: 1.1,
      duration: 1.5,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    });
  }
};

// Performance optimization utilities
export const performance = {
  // Pause animations when section is not active
  pauseAnimations: (selector: string) => {
    gsap.set(selector, { animationPlayState: 'paused' });
  },

  // Resume animations when section becomes active
  resumeAnimations: (selector: string) => {
    gsap.set(selector, { animationPlayState: 'running' });
  },

  // Kill all animations in a container
  killAnimations: (container: HTMLElement) => {
    gsap.killTweensOf(container.querySelectorAll('*'));
  },

  // Optimize for 60fps
  optimizeForPerformance: () => {
    gsap.config({
      force3D: true,
      nullTargetWarn: false,
    });
  }
};

// Initialize performance optimizations
export const initAnimations = () => {
  performance.optimizeForPerformance();
  
  // Reduce motion for users who prefer it
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.globalTimeline.timeScale(0.1);
  }
}; 