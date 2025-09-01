/**
 * MobileContact.js
 * Purpose: Mobile-optimized contact form with bottom sheet design
 * Notes: Touch-friendly interactions and mobile-first UX
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMail, FiPhone, FiMessageCircle, FiSend } from 'react-icons/fi';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';

export default function MobileContact({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create mailto link with form data
    const subject = encodeURIComponent(`Portfolio Contact: ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:muhammad.zain1@ucalgary.ca?subject=${subject}&body=${body}`;
    
    // Reset form and close
    setFormData({ name: '', email: '', message: '' });
    onClose();
  };

  const contactMethods = [
    {
      icon: FiMail,
      label: 'Email',
      value: 'muhammad.zain1@ucalgary.ca',
      action: () => window.location.href = 'mailto:muhammad.zain1@ucalgary.ca'
    },
    {
      icon: FaLinkedinIn,
      label: 'LinkedIn',
      value: '/muhammad-zain03',
      action: () => window.open('https://www.linkedin.com/in/muhammad-zain03/', '_blank')
    },
    {
      icon: FaGithub,
      label: 'GitHub',
      value: '@muhammadzain03',
      action: () => window.open('https://github.com/muhammadzain03', '_blank')
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ 
              type: 'spring', 
              damping: 30, 
              stiffness: 300,
              mass: 0.8
            }}
            className="fixed bottom-0 left-0 right-0 bg-light dark:bg-dark rounded-t-2xl shadow-2xl z-50 max-h-[90vh] overflow-hidden"
          >
            {/* Drag Handle */}
            <div className="flex justify-center pt-4 pb-2">
              <div className="w-12 h-1 bg-dark/20 dark:bg-light/20 rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-6 pb-4">
              <h2 className="text-xl font-bold text-dark dark:text-light">Get In Touch</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors"
                aria-label="Close contact form"
              >
                <FiX className="h-5 w-5 text-dark/70 dark:text-light/70" />
              </button>
            </div>

            {/* Content */}
            <div className="px-6 pb-6 overflow-y-auto max-h-[calc(90vh-6rem)]">
              {/* Quick Contact Methods */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-dark/70 dark:text-light/70 mb-3 uppercase tracking-wider">
                  Quick Contact
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {contactMethods.map((method) => (
                    <motion.button
                      key={method.label}
                      onClick={method.action}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center p-4 bg-primary/5 dark:bg-primaryDark/5 hover:bg-primary/10 dark:hover:bg-primaryDark/10 rounded-xl transition-all duration-200 group"
                    >
                      <div className="flex items-center justify-center w-10 h-10 bg-primary/10 dark:bg-primaryDark/10 rounded-lg group-hover:scale-110 transition-transform">
                        <method.icon className="h-5 w-5 text-primary dark:text-primaryDark" />
                      </div>
                      <div className="ml-4 text-left">
                        <p className="font-medium text-dark dark:text-light">{method.label}</p>
                        <p className="text-sm text-dark/60 dark:text-light/60">{method.value}</p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <h3 className="text-sm font-semibold text-dark/70 dark:text-light/70 mb-4 uppercase tracking-wider">
                  Send Message
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-dark dark:text-light mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg text-dark dark:text-light placeholder-dark/50 dark:placeholder-light/50 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primaryDark focus:border-transparent transition-all"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-dark dark:text-light mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg text-dark dark:text-light placeholder-dark/50 dark:placeholder-light/50 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primaryDark focus:border-transparent transition-all"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-dark dark:text-light mb-2">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows="4"
                      className="w-full px-4 py-3 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg text-dark dark:text-light placeholder-dark/50 dark:placeholder-light/50 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primaryDark focus:border-transparent transition-all resize-none"
                      placeholder="Enter your message"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary to-primaryDark dark:from-primaryDark dark:to-primary text-white font-medium rounded-lg hover:shadow-lg transition-all duration-200"
                  >
                    <FiSend className="h-4 w-4 mr-2" />
                    Send Message
                  </motion.button>
                </form>
              </div>

              {/* Safe area bottom spacing */}
              <div className="h-8" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
