/**
 * NavBar.js
 * Purpose: Responsive glassy navigation with hamburger menu for mobile.
 * Notes: Uses Next Link prefetch; mobile-first design with touch optimization.
 */

import Link from "next/link";
import { useState, useEffect } from "react";
import { FiGithub, FiMail, FiMenu, FiX } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import ThemeSwitcher from "./ThemeSwitcher";

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    
    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Handle cursor tracking for interactive light
  const handleMouseMove = (e) => {
    const navbar = e.currentTarget;
    const rect = navbar.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    navbar.style.setProperty('--cursor-x', `${x}%`);
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/resume', label: 'Resume' },
    { href: '/leetcode', label: 'LeetCode' }
  ];

  const socialLinks = [
    { href: 'https://github.com/muhammadzain03', icon: FiGithub, label: 'GitHub' },
    { href: 'https://www.linkedin.com/in/muhammadzain03/', icon: FaLinkedinIn, label: 'LinkedIn' },
    { href: 'mailto:muhammad.zain1@ucalgary.ca', icon: FiMail, label: 'Email' }
  ];

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="w-full fixed top-0 left-0 z-50 animate-fadeIn">
      {/* Bright breathing gradient line - matching profile picture colors */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] navbar-bright-glow animate-breathing"></div>
      
      {/* Main Navigation */}
      <nav 
        className="navbar-interactive px-4 sm:px-6 md:px-8 h-14 sm:h-16 flex justify-between items-center 
          bg-gradient-to-r from-light/90 via-light/85 to-light/90 
          dark:from-dark/90 dark:via-dark/85 dark:to-dark/90 
          backdrop-blur-xl backdrop-saturate-200 
          shadow-lg shadow-black/[0.05] dark:shadow-white/[0.03]
          border border-white/20 dark:border-black/20
          transition-all duration-300 ease-in-out"
        onMouseMove={handleMouseMove}
      >
        
        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                prefetch={true}
                className="relative text-dark/90 dark:text-light/90 hover:text-primary dark:hover:text-primaryDark transition-all duration-150 hover:scale-105 group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-[2px] bg-gradient-to-r from-primary/70 to-primary dark:from-primaryDark/70 dark:to-primaryDark transition-all duration-150 group-hover:w-full"></span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Logo/Brand */}
        <div className="md:hidden">
          <Link href="/" className="text-lg font-bold text-primary dark:text-primaryDark">
            MZ
          </Link>
        </div>

        {/* Right Side - Social Links & Theme Toggle */}
        <div className="flex space-x-2 items-center">
          {/* Desktop Social Links */}
          <div className="hidden sm:flex space-x-2">
            {socialLinks.map((social) => (
              <a 
                key={social.label}
                href={social.href} 
                target={social.href.startsWith('mailto:') ? undefined : '_blank'}
                rel={social.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                aria-label={social.label}
                className="group relative p-2 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300 hover:scale-110"
              >
                <social.icon className="h-4 w-4 sm:h-5 sm:w-5 text-dark/90 dark:text-light/90 group-hover:text-primary dark:group-hover:text-primaryDark transition-colors" />
              </a>
            ))}
          </div>
          
          <div className="pl-2">
            <ThemeSwitcher />
          </div>

          {/* Mobile Hamburger Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative p-2 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <motion.div
              initial={false}
              animate={isMobileMenuOpen ? 'open' : 'closed'}
            >
              {isMobileMenuOpen ? (
                <FiX className="h-5 w-5 text-dark/90 dark:text-light/90" />
              ) : (
                <FiMenu className="h-5 w-5 text-dark/90 dark:text-light/90" />
              )}
            </motion.div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="md:hidden fixed top-14 right-0 w-80 max-w-[85vw] h-[calc(100vh-3.5rem)] bg-light/95 dark:bg-dark/95 backdrop-blur-xl border-l border-white/20 dark:border-black/20 shadow-2xl z-50 overflow-y-auto"
          >
            <div className="p-6 space-y-8">
              {/* Navigation Links */}
              <div className="space-y-4">
                <h3 className="text-xs font-semibold text-dark/60 dark:text-light/60 uppercase tracking-wider mb-4">
                  Navigation
                </h3>
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={handleLinkClick}
                      className="block py-3 px-4 text-lg font-medium text-dark dark:text-light hover:text-primary dark:hover:text-primaryDark hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-all duration-200"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <h3 className="text-xs font-semibold text-dark/60 dark:text-light/60 uppercase tracking-wider mb-4">
                  Connect
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target={social.href.startsWith('mailto:') ? undefined : '_blank'}
                      rel={social.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex flex-col items-center p-4 bg-primary/5 dark:bg-primaryDark/5 hover:bg-primary/10 dark:hover:bg-primaryDark/10 rounded-lg transition-all duration-200 group"
                    >
                      <social.icon className="h-6 w-6 text-primary dark:text-primaryDark group-hover:scale-110 transition-transform" />
                      <span className="text-xs mt-2 text-dark/70 dark:text-light/70 font-medium">
                        {social.label}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}