/**
 * animations.js
 * Purpose: Centralized animation configurations to eliminate redundancy
 * Features: Standardized animations, performance optimizations, consistency
 */

// Standard hover animations
export const hoverAnimations = {
  // Subtle hover for small elements
  subtle: {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
  },

  // Medium hover for cards and buttons
  medium: {
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.95 },
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
  },

  // Large hover for prominent elements
  large: {
    whileHover: { scale: 1.15 },
    whileTap: { scale: 0.95 },
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
  },

  // Lift effect for cards
  lift: {
    whileHover: { 
      y: -10,
      scale: 1.02,
      transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
    },
    whileTap: { scale: 0.98 }
  },

  // Enhanced lift for project cards
  projectCard: {
    whileHover: { 
      y: -20,
      scale: 1.02,
      boxShadow: [
        '0 25px 50px rgba(0, 0, 0, 0.15)',
        '0 0 40px rgba(99, 102, 241, 0.2)',
        '0 5px 15px rgba(99, 102, 241, 0.3)'
      ].join(', ')
    },
    whileTap: { scale: 0.98 },
    transition: { 
      duration: 0.4, 
      ease: [0.4, 0, 0.2, 1],
      scale: { duration: 0.2 }
    }
  }
};

// Page transition animations
export const pageTransitions = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98
  },
  enter: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
      staggerChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 1.02,
    transition: {
      duration: 0.4,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

// Scroll-based animations
export const scrollAnimations = {
  fadeInUp: {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { 
      duration: 0.8, 
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  },

  fadeInLeft: {
    initial: { opacity: 0, x: -50 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { 
      duration: 0.8, 
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  },

  fadeInRight: {
    initial: { opacity: 0, x: 50 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { 
      duration: 0.8, 
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  },

  staggerContainer: {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true, amount: 0.3 },
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  },

  staggerChild: {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }
};

// Loading animations
export const loadingAnimations = {
  spinner: {
    animate: { rotate: 360 },
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear'
    }
  },

  pulse: {
    animate: { opacity: [0.5, 1, 0.5] },
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  },

  shimmer: {
    animate: { x: ['-100%', '100%'] },
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

// Performance-optimized variants
export const optimizedVariants = {
  // Use transform-only animations for better performance
  scale: {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  },

  opacity: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },

  slideUp: {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  }
};

// Easing curves
export const easings = {
  spring: [0.6, -0.05, 0.01, 0.99],
  smooth: [0.4, 0, 0.2, 1],
  bounce: [0.68, -0.55, 0.265, 1.55],
  ease: [0.25, 0.1, 0.25, 1]
};
