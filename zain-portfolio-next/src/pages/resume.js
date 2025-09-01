/**
 * pages/resume.js
 * Purpose: Resume viewer with download + open-in-new-tab; embedded iframe.
 */
import Head from 'next/head';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
import dynamic from 'next/dynamic';
const Contact = dynamic(() => import('@/components/Contact'), { ssr: false });

export default function Resume() {
  return (
    <>
      <SEO
        title="Resume | Muhammad Zain - Software Engineering Student"
        description="Download and view Muhammad Zain's comprehensive resume showcasing software engineering skills, projects, and academic achievements at University of Calgary."
        canonical="/resume"
        ogType="website"
      />

      <Head>
        {/* Resume-specific optimizations */}
        <meta name="robots" content="index,follow" />
      </Head>

      <main className="min-h-screen bg-light dark:bg-dark text-dark dark:text-light">
        {/* Header */}
        <section className="pt-20 sm:pt-24 pb-6 sm:pb-8 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <div className="max-w-7xl 2xl:max-w-[90rem] mx-auto">
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
              
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="w-20 sm:w-24 md:w-28 h-[2px] bg-gradient-to-r from-primary to-primaryDark dark:from-primaryDark dark:to-primary mx-auto mb-6"
              />
              
              {/* Download Button */}
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
          </div>
        </section>

        {/* PDF Viewer Section */}
        <section className="pb-8 px-4 md:px-8 lg:px-16 xl:px-32">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-white dark:bg-gray-100 rounded-xl shadow-2xl overflow-hidden border border-dark/10 dark:border-light/10"
            >
              {/* Simple PDF Display */}
              <div className="relative">
                <iframe
                  src="/Muhammad-Zain-Resume.pdf"
                  width="100%"
                  height="800"
                  style={{ 
                    border: 'none',
                    background: 'white',
                    minHeight: '800px'
                  }}
                  title="Muhammad Zain Resume"
                  className="w-full"
                />
                
                {/* Fallback content - hidden by default */}
                <div className="p-16 text-center bg-gray-50 dark:bg-gray-900" style={{ display: 'none' }}>
                  <div className="max-w-md mx-auto">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                      </svg>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-dark dark:text-light mb-3">
                      Muhammad Zain - Resume
                    </h3>
                    
                    <p className="text-sm text-dark/70 dark:text-light/70 mb-6">
                      Software Engineering Student | University of Calgary<br />
                      Full-Stack Developer | Machine Learning Enthusiast
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <a
                        href="/Muhammad-Zain-Resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-primaryDark text-white rounded-lg text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        View Resume
                      </a>
                      
                      <a
                        href="/Muhammad-Zain-Resume.pdf"
                        download="Muhammad-Zain-Resume.pdf"
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-light/80 to-light/60 dark:from-dark/80 dark:to-dark/60 backdrop-blur-sm rounded-lg border border-primary/20 dark:border-primaryDark/20 text-primary dark:text-primaryDark text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Open in New Tab Button */}
        <section className="pb-16 px-4 md:px-8 lg:px-16 xl:px-32">
          <div className="max-w-7xl 2xl:max-w-[90rem] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-center"
            >
              <motion.a
                href="/Muhammad-Zain-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-light/80 to-light/60 dark:from-dark/80 dark:to-dark/60 backdrop-blur-sm rounded-full border border-primary/20 dark:border-primaryDark/20 text-primary dark:text-primaryDark font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Open in New Tab
              </motion.a>
            </motion.div>
          </div>
        </section>
        <Contact />
      </main>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {},
    revalidate: 3600, // Revalidate every hour
  };
} 