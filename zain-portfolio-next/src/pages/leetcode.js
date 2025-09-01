/**
 * pages/leetcode.js
 * Purpose: Placeholder page for coding journey; animated cards with motion.
 */
import Head from 'next/head';
import { motion } from 'framer-motion';
import Contact from '@/components/Contact';

export default function Leetcode() {
  return (
    <>
      <Head>
        <title>Muhammad Zain | LeetCode Journey</title>
        <meta
          name="description"
          content="Follow Muhammad Zain's competitive programming and LeetCode journey"
        />
      </Head>

      <main className="min-h-screen bg-light dark:bg-dark text-dark dark:text-light">
        {/* Hero Section */}
        <section className="pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
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
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary to-primaryDark dark:from-primaryDark dark:to-primary bg-clip-text text-transparent"
              >
                LeetCode Journey
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
                className="text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl text-dark/80 dark:text-light/80 max-w-3xl mx-auto leading-relaxed text-center"
              >
                Documenting my competitive programming journey, algorithmic thinking, and problem-solving adventures on LeetCode and beyond.
              </motion.p>
            </motion.div>

            {/* Stats Preview Section */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center py-20"
            >
              <div className="max-w-4xl mx-auto">
                <motion.div
                  animate={{
                    rotateY: [0, 5, 0, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-primary/20 to-primaryDark/20 dark:from-primaryDark/20 dark:to-primary/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-primary/30 dark:border-primaryDark/30 shadow-xl"
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary dark:text-primaryDark mb-2">💻</div>
                    <div className="text-xs text-dark/70 dark:text-light/70">Code</div>
                  </div>
                </motion.div>
                
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-semibold mb-3 sm:mb-4 text-dark dark:text-light">
                  Building My Coding Foundation
                </h2>
                
                <p className="text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl text-dark/70 dark:text-light/70 mb-6 sm:mb-8 max-w-2xl mx-auto text-center">
                  Currently focusing on strengthening my algorithmic thinking and problem-solving skills. This section will soon showcase my LeetCode statistics, favorite problems, and coding insights.
                </p>

                {/* Coming Soon Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                  {[
                    { title: "Problems Solved", icon: "🎯", description: "Track progress" },
                    { title: "Favorite Topics", icon: "⭐", description: "Areas of focus" },
                    { title: "Daily Streak", icon: "🔥", description: "Consistency" }
                  ].map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                      whileHover={{ 
                        scale: 1.05,
                        y: -5
                      }}
                      className="p-6 bg-gradient-to-br from-light/60 via-light/50 to-light/60 dark:from-dark/60 dark:via-dark/50 dark:to-dark/60 backdrop-blur-sm rounded-xl border border-primary/20 dark:border-primaryDark/20 shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      <div className="text-3xl mb-3">{item.icon}</div>
                      <h3 className="font-semibold text-sm mb-2 text-dark dark:text-light">{item.title}</h3>
                      <p className="text-xs text-dark/60 dark:text-light/60">{item.description}</p>
                    </motion.div>
                  ))}
                </div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block mt-8 px-6 py-3 bg-gradient-to-r from-primary/10 to-primaryDark/10 dark:from-primaryDark/10 dark:to-primary/10 rounded-full border border-primary/20 dark:border-primaryDark/20 backdrop-blur-sm"
                >
                  <span className="text-sm font-medium text-primary dark:text-primaryDark">
                    Coming Soon! 🚀
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Component */}
        <Contact />
      </main>
    </>
  );
}

// Pre-generate this page at build time for instant loading
export async function getStaticProps() {
  return {
    props: {},
    // Revalidate every hour in production
    revalidate: 3600,
  };
}
