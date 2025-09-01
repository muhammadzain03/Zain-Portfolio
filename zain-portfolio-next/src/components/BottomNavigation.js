/**
 * BottomNavigation.js
 * Purpose: Mobile-first bottom navigation for quick access to main sections
 * Notes: Only shows on mobile/tablet, hidden on desktop
 */

import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiHome, FiUser, FiFolder, FiFileText, FiCode } from "react-icons/fi";

export default function BottomNavigation() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const navItems = [
    { href: '/', icon: FiHome, label: 'Home' },
    { href: '/about', icon: FiUser, label: 'About' },
    { href: '/projects', icon: FiFolder, label: 'Projects' },
    { href: '/resume', icon: FiFileText, label: 'Resume' },
    { href: '/leetcode', icon: FiCode, label: 'LeetCode' }
  ];

  const isActive = (href) => {
    if (href === '/') return router.pathname === '/';
    return router.pathname.startsWith(href);
  };

  if (!isClient) {
    return null;
  }

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-light/95 dark:bg-dark/95 backdrop-blur-xl border-t border-white/20 dark:border-black/20 shadow-lg">
      <div className="flex justify-around items-center px-2 py-2 safe-area-bottom">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative flex flex-col items-center p-2 min-w-0 flex-1"
            >
              <motion.div
                className={`relative flex flex-col items-center justify-center transition-all duration-200 ${
                  active ? 'text-primary dark:text-primaryDark' : 'text-dark/60 dark:text-light/60'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                {/* Active Indicator */}
                {active && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -top-1 w-8 h-1 bg-primary dark:bg-primaryDark rounded-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                
                <item.icon 
                  className={`h-5 w-5 transition-all duration-200 ${
                    active ? 'scale-110' : 'scale-100'
                  }`} 
                />
                <span className={`text-xs font-medium mt-1 transition-all duration-200 ${
                  active ? 'opacity-100' : 'opacity-70'
                }`}>
                  {item.label}
                </span>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
