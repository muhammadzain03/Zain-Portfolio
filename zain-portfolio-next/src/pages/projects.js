import Head from 'next/head';
import { motion } from 'framer-motion';
import Contact from '@/components/Contact';

export default function Projects() {
  return (
    <>
      <Head>
        <title>Muhammad Zain | Projects</title>
        <meta
          name="description"
          content="Explore Muhammad Zain's software development projects and portfolio"
        />
      </Head>

      <main className="min-h-screen bg-light dark:bg-dark text-dark dark:text-light">
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4 md:px-8 lg:px-16 xl:px-32">
          <div className="max-w-7xl mx-auto">
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
                My Projects
              </motion.h1>
              
              <div className="w-16 h-[2px] bg-gradient-to-r from-primary to-primaryDark dark:from-primaryDark dark:to-primary mx-auto mb-8" />
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xs md:text-sm text-dark/80 dark:text-light/80 max-w-3xl mx-auto leading-relaxed"
              >
                Explore my journey through code, creativity, and problem-solving. Each project represents a step forward in my development as a software engineer.
              </motion.p>
            </motion.div>

            {/* Coming Soon Section */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center py-20"
            >
              <div className="max-w-2xl mx-auto">
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-primary/20 to-primaryDark/20 dark:from-primaryDark/20 dark:to-primary/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-primary/30 dark:border-primaryDark/30"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-primaryDark dark:from-primaryDark dark:to-primary rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xl">⚡</span>
                  </div>
                </motion.div>
                
                <h2 className="text-xl md:text-2xl font-semibold mb-4 text-dark dark:text-light">
                  Projects Coming Soon
                </h2>
                
                <p className="text-xs md:text-sm text-dark/70 dark:text-light/70 mb-8">
                  I'm currently working on showcasing my best projects here. Check back soon to see my latest work in web development, machine learning, and software engineering!
                </p>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block px-6 py-3 bg-gradient-to-r from-primary/10 to-primaryDark/10 dark:from-primaryDark/10 dark:to-primary/10 rounded-full border border-primary/20 dark:border-primaryDark/20 backdrop-blur-sm"
                >
                  <span className="text-sm font-medium text-primary dark:text-primaryDark">
                    Stay Tuned! 🚀
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
