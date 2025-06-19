// Performance utilities for optimizing animations and rendering

export const optimizeAnimations = () => {
  // Enable GPU acceleration for animations
  if (typeof window !== 'undefined') {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Disable animations for users who prefer reduced motion
      document.documentElement.style.setProperty('--animation-duration', '0.001s');
    }
    
    // Enable will-change for better performance
    document.documentElement.style.setProperty('will-change', 'transform, opacity');
  }
};

// Debounce function to limit function calls
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle function to limit function calls
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle = false;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Request animation frame wrapper for smooth animations
export const rafSchedule = (callback: () => void) => {
  let scheduled = false;
  
  return () => {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(() => {
        scheduled = false;
        callback();
      });
    }
  };
};
