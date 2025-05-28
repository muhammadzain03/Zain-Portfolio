/**
 * ContactChat.js
 * Purpose: Interactive contact form with chat-like interface
 * Features:
 * - Real-time form validation
 * - Interactive chat-style UI
 * - Form submission handling
 * - Response feedback
 * - Animated interactions
 */

import React, { useState } from 'react';
import { FiX, FiMail, FiPhone, FiCopy } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const ContactChat = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState('');
  const email = 'muhammadzain0476@gmail.com';
  const phone = '+1 (587) 577-8034';

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="fixed left-4 bottom-20 w-72 bg-light/90 dark:bg-dark/90 backdrop-blur-lg rounded-2xl shadow-xl border border-dark/10 dark:border-light/10 overflow-hidden z-50"
        >
          {/* Header with gradient */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-primary via-primary/90 to-primaryDark p-4 flex justify-between items-center"
          >
            <h3 className="font-medium text-light">Let's Connect!</h3>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="p-1 hover:bg-light/10 rounded-full transition-colors"
            >
              <FiX className="w-5 h-5 text-light" />
            </motion.button>
          </motion.div>

          {/* Chat content */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-4 space-y-4"
          >
            <p className="text-dark/80 dark:text-light/80 text-sm">
              Hi! How would you like to get in touch?
            </p>

            {/* Email Option */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
              className="bg-dark/5 dark:bg-light/5 p-3.5 rounded-xl hover:bg-dark/10 dark:hover:bg-light/10 transition-colors group cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <FiMail className="w-4 h-4 text-primary dark:text-primaryDark" />
                  <span className="text-sm text-dark/80 dark:text-light/80 font-medium">Email</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => copyToClipboard(email, 'email')}
                  className="p-1.5 hover:bg-dark/10 dark:hover:bg-light/10 rounded-lg transition-colors"
                >
                  <FiCopy className="w-3.5 h-3.5 text-dark/70 dark:text-light/70" />
                </motion.button>
              </div>
              <p className="mt-2 text-sm font-mono text-dark/70 dark:text-light/70 select-all">
                {email}
              </p>
              <AnimatePresence>
                {copied === 'email' && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-xs text-primary dark:text-primaryDark mt-2"
                  >
                    Copied to clipboard!
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Phone Option */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.02 }}
              className="bg-dark/5 dark:bg-light/5 p-3.5 rounded-xl hover:bg-dark/10 dark:hover:bg-light/10 transition-colors group cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <FiPhone className="w-4 h-4 text-primary dark:text-primaryDark" />
                  <span className="text-sm text-dark/80 dark:text-light/80 font-medium">Phone</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => copyToClipboard(phone, 'phone')}
                  className="p-1.5 hover:bg-dark/10 dark:hover:bg-light/10 rounded-lg transition-colors"
                >
                  <FiCopy className="w-3.5 h-3.5 text-dark/70 dark:text-light/70" />
                </motion.button>
              </div>
              <p className="mt-2 text-sm font-mono text-dark/70 dark:text-light/70 select-all">
                {phone}
              </p>
              <AnimatePresence>
                {copied === 'phone' && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-xs text-primary dark:text-primaryDark mt-2"
                  >
                    Copied to clipboard!
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactChat; 