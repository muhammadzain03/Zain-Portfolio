/**
 * PageTransition.js
 * Purpose: Smooth fade transitions between routes with loading states
 * Features: Route-based animations, loading indicators, scroll restoration
 */

import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const PageTransition = ({ children }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => {
      setIsLoading(true);
    };

    const handleComplete = () => {
      setIsLoading(false);
      // Smooth scroll to top on route change
      window.scrollTo({ top: 0, behavior: 'smooth' });
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

  const pageVariants = {
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

  return (
    <>
      {/* Loading overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-light/80 dark:bg-dark/80 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              className="flex flex-col items-center space-y-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {/* Spinner */}
              <motion.div
                className="w-8 h-8 border-2 border-primary/30 dark:border-primaryDark/30 border-t-primary dark:border-t-primaryDark rounded-full"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              />
              
              {/* Loading text */}
              <motion.p
                className="text-sm text-dark/70 dark:text-light/70 font-medium"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                Loading...
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page content */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={router.asPath}
          variants={pageVariants}
          initial="initial"
          animate="enter"
          exit="exit"
          className="min-h-screen"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default PageTransition;
