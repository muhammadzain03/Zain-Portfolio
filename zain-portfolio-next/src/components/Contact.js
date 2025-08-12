/**
 * Contact.js
 * Purpose: Floating circular contact entry that opens the ContactChat modal.
 * Notes: Fixed bottom-left; keeps UI minimal while providing quick actions.
 */
import React, { useState, useEffect } from 'react';
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
    // Fixed launcher for the contact modal
    <div className="fixed left-4 bottom-4 flex items-end gap-4 z-50">
      <button 
        className="w-32 h-32 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-200 relative group contact-button"
        onClick={() => setIsChatOpen(true)}
        aria-label="Open contact chat"
        role="button"
      >
        <div className="absolute -inset-2 bg-dark/5 dark:bg-light/5 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <CircularText onClick={() => setIsChatOpen(true)} />
      </button>
      <ContactChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default Contact; 