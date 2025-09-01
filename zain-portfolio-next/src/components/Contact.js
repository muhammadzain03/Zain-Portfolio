/**
 * Contact.js
 * Purpose: Responsive contact component with mobile-optimized bottom sheet.
 * Notes: Desktop uses circular floating button, mobile uses optimized sheet.
 */
import React, { useState, useEffect } from 'react';
import CircularText from './CircularText';
import ContactChat from './ContactChat';
import MobileContact from './MobileContact';

const Contact = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Hydration fix
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Detect mobile device
  useEffect(() => {
    if (!isClient) return;
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, [isClient]);

  // Handle click outside to close modal (desktop only)
  useEffect(() => {
    if (isMobile) return;

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
  }, [isChatOpen, isMobile]);

  if (!isClient) {
    return null; // Prevent SSR issues
  }

  return (
    <>
      {/* Desktop Contact Button */}
      <div className="hidden md:block fixed left-2 sm:left-4 bottom-2 sm:bottom-4 flex items-end gap-2 sm:gap-4 z-50">
        <button 
          className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-200 relative group contact-button"
          onClick={() => setIsChatOpen(true)}
          aria-label="Open contact chat"
          role="button"
        >
          <div className="absolute -inset-2 bg-dark/5 dark:bg-light/5 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CircularText onClick={() => setIsChatOpen(true)} />
        </button>
        <ContactChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      </div>

      {/* Mobile Contact Button (Floating Action Button) */}
      <button 
        className="md:hidden fixed right-4 bottom-20 w-14 h-14 bg-gradient-to-r from-primary to-primaryDark dark:from-primaryDark dark:to-primary text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center z-50"
        onClick={() => setIsChatOpen(true)}
        aria-label="Open contact form"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>

      {/* Mobile Contact Bottom Sheet */}
      <MobileContact isOpen={isChatOpen && isMobile} onClose={() => setIsChatOpen(false)} />
    </>
  );
};

export default Contact; 