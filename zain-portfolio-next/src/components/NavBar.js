/**
 * NavBar.js
 * Purpose: Main navigation component for the portfolio website
 * Features:
 * - Responsive navigation with links to different sections
 * - Social media links and contact information
 * - Theme switcher integration
 * - Animated glass effect design with gradient
 * - Dark/Light mode support
 */

import Link from "next/link";
import { FiGithub, FiMail } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa";
import ThemeSwitcher from "./ThemeSwitcher";

export default function NavBar() {
  return (
    <header className="w-full fixed top-0 left-0 z-50 animate-fadeIn">
      {/* Animated gradient line at the bottom */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/50 dark:via-primaryDark/50 to-transparent animate-gradient"></div>
      
      {/* Enhanced glass effect background with gradient */}
      <nav className="px-8 h-16 flex justify-between items-center 
        bg-gradient-to-r from-light/90 via-light/85 to-light/90 
        dark:from-dark/90 dark:via-dark/85 dark:to-dark/90 
        backdrop-blur-xl backdrop-saturate-200 
        shadow-lg shadow-black/[0.05] dark:shadow-white/[0.03]
        border border-white/20 dark:border-black/20
        transition-all duration-300 ease-in-out
        hover:shadow-xl hover:shadow-black/[0.08] dark:hover:shadow-white/[0.05]
        hover:border-primary/20 dark:hover:border-primaryDark/20">
        
        <ul className="flex space-x-6 text-sm font-medium">
          <li>
            <Link
              href="/"
              prefetch={true}
              className="relative text-dark/90 dark:text-light/90 hover:text-primary dark:hover:text-primaryDark transition-all duration-150 hover:scale-105 group"
            >
              Home
              <span className="absolute -bottom-0.5 left-0 w-0 h-[2px] bg-gradient-to-r from-primary/70 to-primary dark:from-primaryDark/70 dark:to-primaryDark transition-all duration-150 group-hover:w-full"></span>
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              prefetch={true}
              className="relative text-dark/90 dark:text-light/90 hover:text-primary dark:hover:text-primaryDark transition-all duration-150 hover:scale-105 group"
            >
              About
              <span className="absolute -bottom-0.5 left-0 w-0 h-[2px] bg-gradient-to-r from-primary/70 to-primary dark:from-primaryDark/70 dark:to-primaryDark transition-all duration-150 group-hover:w-full"></span>
            </Link>
          </li>
          <li>
            <Link
              href="/projects"
              prefetch={true}
              className="relative text-dark/90 dark:text-light/90 hover:text-primary dark:hover:text-primaryDark transition-all duration-150 hover:scale-105 group"
            >
              Projects
              <span className="absolute -bottom-0.5 left-0 w-0 h-[2px] bg-gradient-to-r from-primary/70 to-primary dark:from-primaryDark/70 dark:to-primaryDark transition-all duration-150 group-hover:w-full"></span>
            </Link>
          </li>
          <li>
            <Link
              href="/resume"
              prefetch={true}
              onMouseEnter={() => {
                // Preload PDF on hover for instant loading (client-side only)
                if (typeof window !== 'undefined') {
                  const existingLink = document.querySelector('link[href="/Muhammad-Zain-Resume.pdf"]');
                  if (!existingLink) {
                    const link = document.createElement('link');
                    link.rel = 'prefetch';
                    link.href = '/Muhammad-Zain-Resume.pdf';
                    link.as = 'document';
                    document.head.appendChild(link);
                  }
                }
              }}
              className="relative text-dark/90 dark:text-light/90 hover:text-primary dark:hover:text-primaryDark transition-all duration-150 hover:scale-105 group"
            >
              Resume
              <span className="absolute -bottom-0.5 left-0 w-0 h-[2px] bg-gradient-to-r from-primary/70 to-primary dark:from-primaryDark/70 dark:to-primaryDark transition-all duration-150 group-hover:w-full"></span>
            </Link>
          </li>
          <li>
            <Link
              href="/leetcode"
              prefetch={true}
              className="relative text-dark/90 dark:text-light/90 hover:text-primary dark:hover:text-primaryDark transition-all duration-150 hover:scale-105 group"
            >
              Leetcode
              <span className="absolute -bottom-0.5 left-0 w-0 h-[2px] bg-gradient-to-r from-primary/70 to-primary dark:from-primaryDark/70 dark:to-primaryDark transition-all duration-150 group-hover:w-full"></span>
            </Link>
          </li>
        </ul>

        <div className="flex space-x-4 items-center">
          <a 
            href="https://github.com/muhammadzain03" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="View GitHub Profile"
            className="group relative p-2 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300 hover:scale-110"
          >
            <FiGithub className="h-5 w-5 text-dark/90 dark:text-light/90 group-hover:text-primary dark:group-hover:text-primaryDark transition-colors" />
          </a>
          <a 
            href="https://www.linkedin.com/in/muhammad-zain03/" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="View LinkedIn Profile"
            className="group relative p-2 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300 hover:scale-110"
          >
            <FaLinkedinIn className="h-5 w-5 text-dark/90 dark:text-light/90 group-hover:text-primary dark:group-hover:text-primaryDark transition-colors" />
          </a>
          <a 
            href="mailto:muhammad.zain1@ucalgary.ca"
            aria-label="Send Email"
            className="group relative p-2 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300 hover:scale-110"
          >
            <FiMail className="h-5 w-5 text-dark/90 dark:text-light/90 group-hover:text-primary dark:group-hover:text-primaryDark transition-colors" />
          </a>
          <div className="pl-2">
            <ThemeSwitcher />
          </div>
        </div>
      </nav>
    </header>
  );
}