/**
 * SkeletonLoader.js
 * Purpose: Sophisticated skeleton loading animations for images and content
 * Features: Shimmer effects, responsive sizing, smooth transitions
 */

import { motion } from 'framer-motion';

export const ImageSkeleton = ({ width = '100%', height = '400px', className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`relative overflow-hidden rounded-lg bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 ${className}`}
      style={{ width, height }}
    >
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent"
        animate={{
          x: ['-100%', '100%']
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
      
      {/* Content placeholders */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-12 h-12 border-2 border-gray-400/30 dark:border-gray-300/30 border-t-primary/50 dark:border-t-primaryDark/50 rounded-full"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      </div>
    </motion.div>
  );
};

export const TextSkeleton = ({ lines = 3, className = '' }) => {
  const lineWidths = ['100%', '85%', '60%'];
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`space-y-3 ${className}`}
    >
      {Array.from({ length: lines }).map((_, index) => (
        <motion.div
          key={index}
          className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded"
          style={{ width: lineWidths[index % lineWidths.length] }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: index * 0.1, duration: 0.6 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent rounded"
            animate={{
              x: ['-100%', '100%']
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: index * 0.2
            }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export const CardSkeleton = ({ className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`bg-gradient-to-br from-light/60 via-light/50 to-light/60 dark:from-dark/60 dark:via-dark/50 dark:to-dark/60 backdrop-blur-sm rounded-2xl border border-primary/20 dark:border-primaryDark/20 shadow-lg overflow-hidden ${className}`}
    >
      {/* Image area */}
      <ImageSkeleton height="256px" className="rounded-t-2xl rounded-b-none" />
      
      {/* Content area */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <motion.div
          className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded w-3/4"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        />
        
        {/* Description */}
        <TextSkeleton lines={3} />
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <motion.div
              key={index}
              className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-full"
              style={{ width: `${60 + index * 20}px` }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
            />
          ))}
        </div>
        
        {/* Button */}
        <motion.div
          className="h-10 bg-gradient-to-r from-primary/20 to-primaryDark/20 dark:from-primaryDark/20 dark:to-primary/20 rounded-lg w-32"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        />
      </div>
    </motion.div>
  );
};
