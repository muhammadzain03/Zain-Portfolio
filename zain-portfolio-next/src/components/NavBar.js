/**
 * NavBar.js
 * Purpose: Responsive glassy navigation with mobile hamburger menu and enhanced interactions.
 * Notes: Mobile-first design with hamburger menu for small screens.
 */

import Link from "next/link";
import { FiGithub, FiMail, FiMenu, FiX } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa";
import ThemeSwitcher from "./ThemeSwitcher";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  const navigationLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/resume", label: "Resume" },
    { href: "/leetcode", label: "LeetCode" }
  ];

  const socialLinks = [
    {
      href: "https://github.com/muhammadzain03",
      icon: FiGithub,
      label: "View GitHub Profile"
    },
    {
      href: "https://www.linkedin.com/in/muhammad-zain03/",
      icon: FaLinkedinIn,
      label: "View LinkedIn Profile"
    },
    {
      href: "mailto:muhammad.zain1@ucalgary.ca",
      icon: FiMail,
      label: "Send Email"
    }
  ];

  return (
    <header className="w-full fixed top-0 left-0 z-50 animate-fadeIn">
      {/* Animated gradient line at the bottom */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/50 dark:via-primaryDark/50 to-transparent animate-gradient"></div>
      
      {/* Enhanced glass effect background with gradient */}
      <nav className={`px-4 sm:px-6 md:px-8 h-14 sm:h-16 flex justify-between items-center 
        bg-gradient-to-r from-light/90 via-light/85 to-light/90 
        dark:from-dark/90 dark:via-dark/85 dark:to-dark/90 
        backdrop-blur-xl backdrop-saturate-200 
        transition-all duration-300 ease-in-out
        border border-white/20 dark:border-black/20
        ${isScrolled 
          ? 'shadow-xl shadow-black/[0.08] dark:shadow-white/[0.05] border-primary/20 dark:border-primaryDark/20' 
          : 'shadow-lg shadow-black/[0.05] dark:shadow-white/[0.03]'
        }`}>
        
        {/* Logo/Brand */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="font-bold text-sm sm:text-base text-primary dark:text-primaryDark"
        >
          MZ
        </motion.div>

        {/* Desktop Navigation - Hidden on mobile */}
        <ul className="hidden md:flex space-x-6 text-sm font-medium">
          {navigationLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                prefetch={true}
                className="relative text-dark/90 dark:text-light/90 hover:text-primary dark:hover:text-primaryDark transition-all duration-300 hover:scale-105 group"
              >
                {link.label}
                <motion.span 
                  className="absolute -bottom-0.5 left-0 h-[2px] bg-gradient-to-r from-primary/70 to-primary dark:from-primaryDark/70 dark:to-primaryDark"
                  initial={{ width: 0, boxShadow: '0 0 0px rgba(99, 102, 241, 0)' }}
                  whileHover={{ 
                    width: '100%',
                    boxShadow: [
                      '0 0 8px rgba(99, 102, 241, 0.6)',
                      '0 0 16px rgba(99, 102, 241, 0.4)',
                      '0 2px 4px rgba(99, 102, 241, 0.3)'
                    ].join(', ')
                  }}
                  transition={{ 
                    duration: 0.3,
                    ease: 'easeOut'
                  }}
                />
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Social Links & Theme Switcher */}
        <div className="hidden md:flex space-x-3 items-center">
          {socialLinks.map((social) => {
            const IconComponent = social.icon;
            return (
              <motion.a
                key={social.href}
                href={social.href}
                target={social.href.startsWith('mailto:') ? undefined : "_blank"}
                rel={social.href.startsWith('mailto:') ? undefined : "noopener noreferrer"}
                aria-label={social.label}
                className="group relative p-2 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300"
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: '0 4px 15px rgba(99, 102, 241, 0.2)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                <IconComponent className="h-5 w-5 text-dark/90 dark:text-light/90 group-hover:text-primary dark:group-hover:text-primaryDark transition-colors" />
              </motion.a>
            );
          })}
          <div className="pl-2">
            <ThemeSwitcher />
          </div>
        </div>

        {/* Mobile Menu Button & Theme Switcher */}
        <div className="md:hidden flex items-center space-x-2">
          <ThemeSwitcher />
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            className="p-2 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle mobile menu"
          >
            <motion.div
              animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMobileMenuOpen ? (
                <FiX className="h-5 w-5 text-dark/90 dark:text-light/90" />
              ) : (
                <FiMenu className="h-5 w-5 text-dark/90 dark:text-light/90" />
              )}
            </motion.div>
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="md:hidden absolute top-full left-0 w-full bg-gradient-to-b from-light/95 via-light/90 to-light/95 dark:from-dark/95 dark:via-dark/90 dark:to-dark/95 backdrop-blur-xl border-b border-white/20 dark:border-black/20 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Navigation Links */}
              <div className="space-y-3">
                {navigationLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      prefetch={true}
                      className="block py-2 px-4 text-dark/90 dark:text-light/90 hover:text-primary dark:hover:text-primaryDark hover:bg-primary/10 dark:hover:bg-primaryDark/10 rounded-lg transition-all duration-300 font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Mobile Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex justify-center space-x-6 pt-4 border-t border-primary/20 dark:border-primaryDark/20"
              >
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <motion.a
                      key={social.href}
                      href={social.href}
                      target={social.href.startsWith('mailto:') ? undefined : "_blank"}
                      rel={social.href.startsWith('mailto:') ? undefined : "noopener noreferrer"}
                      aria-label={social.label}
                      className="p-3 rounded-xl hover:bg-primary/10 dark:hover:bg-primaryDark/10 transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <IconComponent className="h-5 w-5 text-dark/90 dark:text-light/90 hover:text-primary dark:hover:text-primaryDark transition-colors" />
                    </motion.a>
                  );
                })}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}