/**
 * PageTransition.js
 * Purpose: Smooth page transitions with loading states and optimized animations
 * Features: Route-based animations, loading indicators, scroll restoration
 */

import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const PageTransition = ({ children }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => {
      setIsLoading(false);
      // Restore scroll position for better UX
      window.scrollTo(0, 0);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      {isLoading && (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-light/80 dark:bg-dark/80 backdrop-blur-sm"
        >
          <motion.div
            className="relative"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          >
            <div className="w-8 h-8 border-2 border-primary/20 dark:border-primaryDark/20 rounded-full" />
            <div className="absolute inset-0 w-8 h-8 border-2 border-transparent border-t-primary dark:border-t-primaryDark rounded-full" />
          </motion.div>
        </motion.div>
      )}
      
      <motion.div
        key={router.asPath}
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 1.02 }}
        transition={{
          duration: 0.6,
          ease: [0.6, -0.05, 0.01, 0.99],
          staggerChildren: 0.1
        }}
        className="motion-safe"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
