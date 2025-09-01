/**
 * SkeletonLoader.js
 * Purpose: Sophisticated skeleton loading components with shimmer effects
 * Features: Multiple skeleton types, smooth animations, responsive design
 */

import { motion } from 'framer-motion';

// Base shimmer animation
const shimmerVariants = {
  initial: { x: '-100%' },
  animate: {
    x: '100%',
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

// Image skeleton with aspect ratio preservation
export const ImageSkeleton = ({ width, height, className = '' }) => (
  <div 
    className={`relative overflow-hidden bg-gray-200/60 dark:bg-gray-800/60 rounded-lg ${className}`}
    style={{ width, height }}
  >
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent"
      variants={shimmerVariants}
      initial="initial"
      animate="animate"
    />
  </div>
);

// Text skeleton with customizable lines
export const TextSkeleton = ({ lines = 3, className = '' }) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, index) => (
      <motion.div
        key={index}
        className="relative overflow-hidden bg-gray-200/60 dark:bg-gray-800/60 rounded"
        style={{ 
          height: '1rem',
          width: index === lines - 1 ? '75%' : '100%' 
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent"
          variants={shimmerVariants}
          initial="initial"
          animate="animate"
        />
      </motion.div>
    ))}
  </div>
);

// Card skeleton for project cards
export const CardSkeleton = ({ className = '' }) => (
  <motion.div
    className={`p-6 rounded-xl bg-gray-100/80 dark:bg-gray-900/80 border border-gray-200/50 dark:border-gray-700/50 ${className}`}
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4 }}
  >
    {/* Image skeleton */}
    <ImageSkeleton 
      width="100%" 
      height="200px" 
      className="mb-4"
    />
    
    {/* Title skeleton */}
    <div className="relative overflow-hidden bg-gray-200/60 dark:bg-gray-800/60 rounded h-6 w-3/4 mb-3">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent"
        variants={shimmerVariants}
        initial="initial"
        animate="animate"
      />
    </div>
    
    {/* Description skeleton */}
    <TextSkeleton lines={2} />
    
    {/* Tech tags skeleton */}
    <div className="flex gap-2 mt-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="relative overflow-hidden bg-gray-200/60 dark:bg-gray-800/60 rounded-full h-6 w-16"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent"
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
          />
        </div>
      ))}
    </div>
  </motion.div>
);

// Enhanced skeleton for complex layouts
export const LayoutSkeleton = () => (
  <div className="max-w-6xl mx-auto px-4 py-8">
    {/* Header skeleton */}
    <div className="text-center mb-12">
      <div className="relative overflow-hidden bg-gray-200/60 dark:bg-gray-800/60 rounded h-12 w-64 mx-auto mb-4">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent"
          variants={shimmerVariants}
          initial="initial"
          animate="animate"
        />
      </div>
      <TextSkeleton lines={2} className="max-w-2xl mx-auto" />
    </div>
    
    {/* Grid skeleton */}
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  </div>
);

export default {
  ImageSkeleton,
  TextSkeleton,
  CardSkeleton,
  LayoutSkeleton
};
