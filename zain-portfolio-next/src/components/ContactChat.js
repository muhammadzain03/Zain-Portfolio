import React, { useState } from 'react';
import { FiX, FiMail, FiPhone, FiCopy } from 'react-icons/fi';

const ContactChat = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState('');
  const email = 'muhammadzain0476@gmail.com';
  const phone = '+1 (587) 577-8034';

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed left-4 bottom-20 w-72 bg-light/80 dark:bg-dark/80 backdrop-blur-md rounded-2xl shadow-xl border border-dark/10 dark:border-light/10 overflow-hidden z-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primaryDark dark:from-primaryDark dark:to-primary p-4 flex justify-between items-center">
        <h3 className="font-medium text-light">Let's Connect!</h3>
        <button 
          onClick={onClose}
          className="p-1 hover:bg-light/10 rounded-full transition-colors"
        >
          <FiX className="w-5 h-5 text-light" />
        </button>
      </div>

      {/* Chat content */}
      <div className="p-4 space-y-3">
        <p className="text-dark/80 dark:text-light/80 text-sm">
          Hi! How would you like to get in touch?
        </p>

        {/* Email Option */}
        <div className="bg-dark/5 dark:bg-light/5 p-3 rounded-xl hover:bg-dark/10 dark:hover:bg-light/10 transition-colors group">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <FiMail className="w-4 h-4 text-primary dark:text-primaryDark" />
              <span className="text-sm text-dark/80 dark:text-light/80">Email</span>
            </div>
            <button
              onClick={() => copyToClipboard(email, 'email')}
              className="p-1.5 hover:bg-dark/10 dark:hover:bg-light/10 rounded-lg transition-colors"
            >
              <FiCopy className="w-3.5 h-3.5 text-dark/70 dark:text-light/70" />
            </button>
          </div>
          <p className="mt-2 text-sm font-mono text-dark/70 dark:text-light/70 select-all">
            {email}
          </p>
          {copied === 'email' && (
            <p className="text-xs text-primary dark:text-primaryDark mt-1 animate-fade-in">Copied!</p>
          )}
        </div>

        {/* Phone Option */}
        <div className="bg-dark/5 dark:bg-light/5 p-3 rounded-xl hover:bg-dark/10 dark:hover:bg-light/10 transition-colors group">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <FiPhone className="w-4 h-4 text-primary dark:text-primaryDark" />
              <span className="text-sm text-dark/80 dark:text-light/80">Phone</span>
            </div>
            <button
              onClick={() => copyToClipboard(phone, 'phone')}
              className="p-1.5 hover:bg-dark/10 dark:hover:bg-light/10 rounded-lg transition-colors"
            >
              <FiCopy className="w-3.5 h-3.5 text-dark/70 dark:text-light/70" />
            </button>
          </div>
          <p className="mt-2 text-sm font-mono text-dark/70 dark:text-light/70 select-all">
            {phone}
          </p>
          {copied === 'phone' && (
            <p className="text-xs text-primary dark:text-primaryDark mt-1 animate-fade-in">Copied!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactChat; 