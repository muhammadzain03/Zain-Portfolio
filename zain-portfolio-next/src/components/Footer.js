export default function Footer() {
    return (
      <footer className="w-full animate-fadeIn">
        {/* Animated partition line */}
        <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-primary/50 dark:via-primaryDark/50 to-transparent animate-gradient"></div>
        
        {/* Enhanced glass effect background with gradient */}
        <div className="px-8 h-16 flex flex-col justify-center items-center 
          bg-gradient-to-r from-light/90 via-light/85 to-light/90 
          dark:from-dark/90 dark:via-dark/85 dark:to-dark/90 
          backdrop-blur-xl backdrop-saturate-200 
          shadow-lg shadow-black/[0.05] dark:shadow-white/[0.03]
          border border-white/20 dark:border-black/20
          transition-all duration-300 ease-in-out
          hover:shadow-xl hover:shadow-black/[0.08] dark:hover:shadow-white/[0.05]
          hover:border-primary/20 dark:hover:border-primaryDark/20">
          
          {/* Animated gradient line at the bottom */}
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/50 dark:via-primaryDark/50 to-transparent animate-gradient"></div>
          
          <p className="text-sm font-medium text-dark/90 dark:text-light/90 text-center">
            &copy; {new Date().getFullYear()} Muhammad Zain. All rights reserved.
          </p>
          <p className="text-sm font-medium text-dark/90 dark:text-light/90 text-center mt-1">
            Built with Next.js - Tailwind CSS & Cursor AI
          </p>
        </div>
      </footer>
    );
  }
  