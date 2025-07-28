import Head from 'next/head';
import { motion } from 'framer-motion';
import { useState, useCallback, useRef, useEffect } from 'react';

export default function Resume() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const iframeRef = useRef(null);

  // Preload PDF for faster loading
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    const preloadPDF = () => {
      const existingLink = document.querySelector('link[href="/Muhammad-Zain-Resume.pdf"]');
      if (existingLink) return; // Don't add duplicate links
      
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = '/Muhammad-Zain-Resume.pdf';
      link.as = 'document';
      document.head.appendChild(link);
      
      // Set a timeout to handle slow loading
      const timeout = setTimeout(() => {
        if (isLoading) {
          setLoadError(true);
          setIsLoading(false);
        }
      }, 8000); // 8 second timeout
      
      return () => {
        clearTimeout(timeout);
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      };
    };
    
    return preloadPDF();
  }, [isLoading]);

  return (
    <>
      <Head>
        <title>Muhammad Zain | Resume</title>
        <meta
          name="description"
          content="View Muhammad Zain's resume - Software Engineering student and developer"
        />
      </Head>

      <main className="min-h-screen bg-light dark:bg-dark text-dark dark:text-light">
        {/* Header */}
        <section className="pt-24 pb-8 px-4 md:px-8 lg:px-16 xl:px-32">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8"
            >
              <motion.h1
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-primaryDark dark:from-primaryDark dark:to-primary bg-clip-text text-transparent"
              >
                Resume
              </motion.h1>
              
              <div className="w-16 h-[2px] bg-gradient-to-r from-primary to-primaryDark dark:from-primaryDark dark:to-primary mx-auto mb-6" />
              
              {/* Download Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mb-8"
              >
                <motion.a
                  href="/Muhammad-Zain-Resume.pdf"
                  download="Muhammad-Zain-Resume.pdf"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-primaryDark dark:from-primaryDark dark:to-primary text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download PDF
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* PDF Viewer */}
        <section className="pb-16 px-4 md:px-8 lg:px-16 xl:px-32">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="relative"
            >
              {/* Enhanced Loading Skeleton */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  className="absolute inset-0 bg-white dark:bg-gray-100 rounded-xl shadow-2xl border border-dark/10 dark:border-light/10 z-10 overflow-hidden"
                >
                  {/* PDF-like skeleton */}
                  <div className="h-full p-8 space-y-4">
                    {/* Header skeleton */}
                    <div className="flex justify-between items-center mb-6">
                      <div className="h-4 bg-gray-300 dark:bg-gray-400 rounded w-1/3 animate-pulse"></div>
                      <div className="h-4 bg-gray-300 dark:bg-gray-400 rounded w-1/4 animate-pulse"></div>
                    </div>
                    
                                         {/* Content skeleton */}
                     {Array.from({ length: 12 }).map((_, i) => {
                       const widths = ['w-3/4', 'w-2/3', 'w-4/5', 'w-1/2', 'w-5/6'];
                       const showSecondLine = i % 3 === 0;
                       return (
                         <div key={i} className="space-y-2">
                           <div className={`h-3 bg-gray-300 dark:bg-gray-400 rounded animate-pulse ${widths[i % widths.length]}`} style={{ 
                             animationDelay: `${i * 0.1}s`
                           }}></div>
                           {showSecondLine && (
                             <div className="h-3 bg-gray-300 dark:bg-gray-400 rounded animate-pulse w-1/2" style={{ 
                               animationDelay: `${i * 0.1 + 0.05}s`
                             }}></div>
                           )}
                         </div>
                       );
                     })}
                  </div>
                  
                  {/* Loading indicator overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-100/80">
                    <div className="text-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        className="w-8 h-8 border-3 border-primary/30 border-t-primary dark:border-primaryDark/30 dark:border-t-primaryDark rounded-full mx-auto mb-3"
                      />
                      <p className="text-sm font-medium text-dark/80 dark:text-light/80">Loading Resume...</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Error State */}
              {loadError && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white dark:bg-gray-100 rounded-xl shadow-2xl overflow-hidden border border-dark/10 dark:border-light/10 p-16 text-center"
                >
                  <div className="text-red-500 text-4xl mb-4">⚠️</div>
                  <h3 className="text-lg font-semibold text-dark mb-2">Unable to Load PDF</h3>
                  <p className="text-sm text-dark/70 mb-6">The resume couldn't be displayed inline.</p>
                  <motion.a
                    href="/Muhammad-Zain-Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-primaryDark dark:from-primaryDark dark:to-primary text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Open PDF Directly
                  </motion.a>
                </motion.div>
              )}

                             {/* Optimized PDF Embed */}
               {!loadError && (
                 <div className="bg-white dark:bg-gray-100 rounded-xl shadow-2xl overflow-hidden border border-dark/10 dark:border-light/10">
                   <iframe
                     ref={iframeRef}
                     src="/Muhammad-Zain-Resume.pdf#toolbar=1&navpanes=0&scrollbar=1"
                     width="100%"
                     height="800"
                     style={{ 
                       border: 'none',
                       background: 'white'
                     }}
                     title="Muhammad Zain Resume"
                     loading="eager"
                     onLoad={() => {
                       setIsLoading(false);
                     }}
                     onError={() => {
                       setIsLoading(false);
                       setLoadError(true);
                     }}
                     className="w-full transition-opacity duration-200"
                   />
                 </div>
               )}

                             {/* Fallback and Quick Access Options */}
               <motion.div
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 0.5 }}
                 className="mt-8 text-center"
               >
                 <p className="text-xs text-dark/60 dark:text-light/60 mb-4">
                   Having trouble viewing the PDF? 
                 </p>
                 
                 <motion.a
                   href="/Muhammad-Zain-Resume.pdf"
                   target="_blank"
                   rel="noopener noreferrer"
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.95 }}
                   className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-light/80 to-light/60 dark:from-dark/80 dark:to-dark/60 backdrop-blur-sm rounded-lg border border-primary/20 dark:border-primaryDark/20 text-sm font-medium text-primary dark:text-primaryDark hover:shadow-md transition-all duration-150"
                 >
                   <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                   </svg>
                   Open in New Tab
                 </motion.a>
               </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
} 