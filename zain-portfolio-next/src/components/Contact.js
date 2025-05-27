import React, { useState } from 'react';
import CircularText from './CircularText';
import ContactChat from './ContactChat';

const Contact = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="fixed left-4 bottom-4 flex items-end gap-4">
      <div 
        className="w-32 h-32 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-200 relative group"
        onClick={() => setIsChatOpen(true)}
      >
        <div className="absolute -inset-2 bg-dark/5 dark:bg-light/5 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <CircularText />
      </div>
      <ContactChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default Contact; 