/**
 * Contact.js
 * Purpose: Enhanced floating contact with mobile optimizations and pulse animations.
 * Notes: Responsive sizing with improved mobile interactions.
 */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CircularText from './CircularText';
import ContactChat from './ContactChat';

const Contact = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Handle click outside to close modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isChatOpen && !event.target.closest('.contact-modal') && !event.target.closest('.contact-button')) {
        setIsChatOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape' && isChatOpen) {
        setIsChatOpen(false);
      }
    };

    if (isChatOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isChatOpen]);

  return (
    <div className="fixed left-3 sm:left-4 md:left-6 bottom-3 sm:bottom-4 md:bottom-6 flex items-end gap-2 sm:gap-4 z-50">
      <motion.button 
        className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 flex items-center justify-center cursor-pointer relative group contact-button"
        onClick={() => setIsChatOpen(true)}
        aria-label="Open contact chat"
        role="button"
        whileHover={{ 
          scale: 1.15,
          boxShadow: [
            '0 12px 40px rgba(99, 102, 241, 0.4)',
            '0 0 0 8px rgba(99, 102, 241, 0.1)',
            '0 0 30px rgba(99, 102, 241, 0.3)'
          ].join(', ')
        }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: [
            '0 0 0 0 rgba(99, 102, 241, 0.5)',
            '0 0 0 12px rgba(99, 102, 241, 0)',
            '0 0 0 0 rgba(99, 102, 241, 0)'
          ]
        }}
        transition={{
          boxShadow: {
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          },
          scale: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
          default: { duration: 0.4 }
        }}
      >
        {/* Enhanced glow effect */}
        <motion.div 
          className="absolute -inset-3 bg-gradient-to-r from-primary/20 to-primaryDark/20 dark:from-primaryDark/20 dark:to-primary/20 rounded-full blur-md"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Background ring */}
        <motion.div 
          className="absolute -inset-1 rounded-full border-2 border-primary/30 dark:border-primaryDark/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        
        <CircularText onClick={() => setIsChatOpen(true)} />
      </motion.button>
      
      <AnimatePresence>
        <ContactChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      </AnimatePresence>
    </div>
  );
};

export default Contact; 