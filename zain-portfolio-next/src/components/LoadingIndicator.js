/**
 * LoadingIndicator Component
 * Purpose: Shows loading state during page transitions
 * Features:
 * - Smooth loading animation
 * - Non-intrusive design
 * - Automatic show/hide
 */

import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function LoadingIndicator() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

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
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="fixed top-0 left-0 right-0 z-50"
        >
          <div className="h-1 bg-gradient-to-r from-primary via-primaryDark to-primary animate-pulse">
            <motion.div
              className="h-full bg-white/20"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 