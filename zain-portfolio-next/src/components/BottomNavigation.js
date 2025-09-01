/**
 * BottomNavigation.js
 * Purpose: Mobile-first bottom navigation for quick access on small screens
 * Features: Smooth animations, active state indicators, swipe gestures
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  FiHome, 
  FiUser, 
  FiBriefcase, 
  FiFileText, 
  FiCode,
  FiMail 
} from 'react-icons/fi';

const BottomNavigation = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navItems = [
    { href: '/', icon: FiHome, label: 'Home' },
    { href: '/about', icon: FiUser, label: 'About' },
    { href: '/projects', icon: FiBriefcase, label: 'Projects' },
    { href: '/resume', icon: FiFileText, label: 'Resume' },
    { href: '/leetcode', icon: FiCode, label: 'LeetCode' }
  ];

  // Hide/show on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const isActive = (href) => {
    if (href === '/') {
      return router.pathname === '/';
    }
    return router.pathname.startsWith(href);
  };

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: isVisible ? 0 : 100 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-light/95 via-light/90 to-light/95 dark:from-dark/95 dark:via-dark/90 dark:to-dark/95 backdrop-blur-xl border-t border-white/20 dark:border-black/20 safe-area-pb"
    >
      <div className="flex items-center justify-around px-2 py-2 max-w-md mx-auto">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const active = isActive(item.href);
          
          return (
            <Link key={item.href} href={item.href} prefetch={true}>
              <motion.div
                className="relative flex flex-col items-center p-2 rounded-xl cursor-pointer"
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
              >
                {/* Active indicator background */}
                {active && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary/10 dark:bg-primaryDark/10 rounded-xl"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                
                {/* Icon with active state */}
                <motion.div
                  className={`relative z-10 p-2 rounded-lg transition-colors duration-200 ${
                    active 
                      ? 'text-primary dark:text-primaryDark' 
                      : 'text-dark/70 dark:text-light/70'
                  }`}
                  animate={{
                    scale: active ? 1.1 : 1,
                    rotateY: active ? [0, 10, 0] : 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <IconComponent className="h-5 w-5" />
                </motion.div>
                
                {/* Label */}
                <motion.span
                  className={`text-xs font-medium transition-all duration-200 ${
                    active 
                      ? 'text-primary dark:text-primaryDark opacity-100' 
                      : 'text-dark/60 dark:text-light/60 opacity-70'
                  }`}
                  animate={{
                    y: active ? 0 : 2,
                    opacity: active ? 1 : 0.7
                  }}
                >
                  {item.label}
                </motion.span>
                
                {/* Active dot indicator */}
                {active && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 right-1 w-2 h-2 bg-primary dark:bg-primaryDark rounded-full"
                    layoutId="activeDot"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </div>
      
      {/* Bottom safe area padding for devices with home indicators */}
      <div className="h-safe-area-inset-bottom" />
    </motion.nav>
  );
};

export default BottomNavigation;
