/**
 * pages/resume.js
 * Purpose: Resume request page where visitors can request resume via email
 */
import Head from 'next/head';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
import ResumeRequestForm from '@/components/ResumeRequestForm';
import dynamic from 'next/dynamic';
const Contact = dynamic(() => import('@/components/Contact'), { ssr: false });

export default function Resume() {
  return (
    <>
      <SEO
        title="Resume | Muhammad Zain - Software Engineering Student"
        description="Request Muhammad Zain's comprehensive resume showcasing software engineering skills, projects, and academic achievements at University of Calgary."
        canonical="/resume"
        ogType="website"
      />

      <Head>
        {/* Resume-specific optimizations */}
        <meta name="robots" content="index,follow" />
      </Head>

      <main className="min-h-screen bg-light dark:bg-dark text-dark dark:text-light">
        {/* Header Section */}
        <section className="pt-20 sm:pt-24 pb-0 sm:pb-0 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <div className="max-w-7xl 2xl:max-w-[90rem] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
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
                className="w-20 sm:w-24 md:w-28 h-[2px] bg-gradient-to-r from-primary to-primaryDark dark:from-primaryDark dark:to-primary mx-auto mb-8"
              />
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xs md:text-sm text-dark/80 dark:text-light/80 max-w-3xl mx-auto leading-relaxed text-center"
              >
                Interested in my professional background? Please fill out this form and use your official email. Spam emails will be filtered. Once you fill out this form, the Resume will be emailed to you!
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Resume Request Form Section */}
        <section className="pb-16 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <div className="max-w-7xl 2xl:max-w-[90rem] mx-auto">
            <ResumeRequestForm />
          </div>
        </section>

        {/* Additional Info Section */}
        <section className="pb-16 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {/* Feature 1 */}
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-primary/10 to-primaryDark/10 dark:from-primaryDark/10 dark:to-primary/10 
                  backdrop-blur-sm rounded-xl p-6 border border-primary/20 dark:border-primaryDark/20 text-center"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-primaryDark dark:from-primaryDark dark:to-primary 
                  rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">Fast Delivery</h3>
                <p className="text-sm text-dark/70 dark:text-light/70">
                  Receive the resume in your inbox within 24 hours
                </p>
              </motion.div>

              {/* Feature 2 */}
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-primary/10 to-primaryDark/10 dark:from-primaryDark/10 dark:to-primary/10 
                  backdrop-blur-sm rounded-xl p-6 border border-primary/20 dark:border-primaryDark/20 text-center"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-primaryDark dark:from-primaryDark dark:to-primary 
                  rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">Secure & Private</h3>
                <p className="text-sm text-dark/70 dark:text-light/70">
                  Your information is kept confidential and never shared
                </p>
              </motion.div>

              {/* Feature 3 */}
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-primary/10 to-primaryDark/10 dark:from-primaryDark/10 dark:to-primary/10 
                  backdrop-blur-sm rounded-xl p-6 border border-primary/20 dark:border-primaryDark/20 text-center"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-primaryDark dark:from-primaryDark dark:to-primary 
                  rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">PDF Format</h3>
                <p className="text-sm text-dark/70 dark:text-light/70">
                  Professional, formatted PDF ready for review
                </p>
              </motion.div>
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
