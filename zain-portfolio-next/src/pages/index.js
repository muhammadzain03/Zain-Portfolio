/**
 * index.js
 * Purpose: Home page / Landing page of the portfolio website
 * Features:
 * - Hero section with personal introduction
 * - Featured projects showcase
 * - Skills and expertise highlights
 * - Contact information
 * - Animated components and transitions
 */

import Head from 'next/head';
import Image from 'next/image';
import OptimizedImage from '@/components/OptimizedImage';
import Contact from '@/components/Contact';
import SEO from '@/components/SEO';
import profilePic from "/public/images/profile/zain.jpg";
import { motion } from 'framer-motion';

export default function Home() {
  const recentProjects = [
    "Real-time systems",
    "Full-stack web development",
    "Database design",
    "Applied machine learning"
  ];

  return (
    <>
      <SEO
        title="Muhammad Zain | Software Engineering Student & Developer"
        description="Third-year Software Engineering student at University of Calgary. Passionate about full-stack development, machine learning, and building impactful software solutions. Explore my projects and journey."
        canonical="/"
        ogType="website"
      />
      
      <Head>
        <meta name="application-name" content="Muhammad Zain Portfolio" />
      </Head>

      <main className="flex flex-col w-full min-h-screen bg-light dark:bg-dark hero-section">
        {/* Initials Badge */}
        <div className="w-full flex justify-center mt-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              duration: 1 
            }}
            className="relative group"
          >
            <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br from-primary/90 to-primaryDark/90 dark:from-primaryDark/90 dark:to-primary/90 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "linear"
                }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 via-primaryDark/20 to-primary/20 dark:from-primaryDark/20 dark:via-primary/20 dark:to-primaryDark/20 blur-sm opacity-0 group-hover:opacity-100"
              />
              <span className="text-xl font-medium text-light dark:text-dark z-10 transform transition-transform duration-300 group-hover:scale-110">
                MZ
              </span>
            </div>
            <motion.div
              className="absolute -inset-2 rounded-full bg-gradient-to-r from-primary/30 to-primaryDark/30 dark:from-primaryDark/30 dark:to-primary/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear"
              }}
            />
          </motion.div>
        </div>

        {/* Main Heading Section */}
        <motion.div 
          className="w-full pt-6 md:pt-8 pb-4 md:pb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 xl:px-32">
            <div className="text-center relative">
              {/* Pre-heading text */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-sm md:text-base text-dark/60 dark:text-light/60 tracking-wide mb-2"
              >
                Muhammad Zain's Portfolio
              </motion.p>

              {/* Main heading with simplified layout */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-2xl md:text-3xl font-medium text-dark dark:text-light tracking-tight leading-relaxed"
              >
                Turning{" "}
                <span className="relative inline-block">
                  Ideas
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="absolute -bottom-0.5 left-0 w-full h-[1px] bg-primary/50 dark:bg-primaryDark/50"
                  />
                </span>{" "}
                Into{" "}
                <span className="relative inline-block">
                  Reality
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="absolute -bottom-0.5 left-0 w-full h-[1px] bg-primary/50 dark:bg-primaryDark/50"
                  />
                </span>
              </motion.h1>
            </div>
          </div>
        </motion.div>

        {/* Content Section */}
        <div className="w-full px-4 md:px-8 lg:px-16 xl:px-32 pb-12 md:pb-16">
          <div className="max-w-7xl mx-auto">
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column - Main Introduction */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="lg:col-span-7 space-y-4"
              >
                {/* Opening Statement */}
                <div className="space-y-2">
                  <motion.h2 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-sm md:text-base font-medium text-dark dark:text-light italic"
                  >
                    Some people see lines of code.
                  </motion.h2>
                  <motion.h3 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-xs md:text-sm text-dark/80 dark:text-light/80 italic"
                  >
                    I see solutions, stories, and systems waiting to be built.
                  </motion.h3>
                </div>

                {/* Vision Statement */}
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-xs md:text-sm text-dark/75 dark:text-light/75"
                >
                  Whether it's a real-time subway display system, a machine learning–powered airline manager, or a full-stack e-commerce platform, I strive to build software that is both functional and meaningful.
                </motion.p>

                {/* Personal Introduction */}
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="text-xs md:text-sm text-dark/75 dark:text-light/75"
                >
                  I'm Muhammad Zain, a Software Engineering student at the University of Calgary. As someone actively seeking internship opportunities, I view this phase of my academic and professional life as a chance to explore, experiment, and take creative risks. It's a time to step into different fields, learn by building, and discover where I truly belong in the tech world.
                </motion.p>

                {/* Recent Projects */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4 }}
                  className="space-y-2"
                >
                  <h4 className="text-xs md:text-sm font-medium text-dark dark:text-light">Some of the projects I've worked on recently include:</h4>
                  <ul className="space-y-1.5">
                    {recentProjects.map((project, index) => (
                      <motion.li
                        key={project}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.6 + index * 0.1 }}
                        className="text-xs md:text-sm text-dark/75 dark:text-light/75 flex items-center space-x-2"
                      >
                        <span className="w-1 h-1 rounded-full bg-primary dark:bg-primaryDark" />
                        <span>{project}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                {/* Closing Statement */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                  className="space-y-1.5"
                >
                  <p className="text-xs md:text-sm text-dark/75 dark:text-light/75">This site is a glimpse into what I create when curiosity meets code.</p>
                  <p className="text-xs md:text-sm text-dark dark:text-light font-medium">Go ahead — explore the things I've built, solved, and learned along the way.</p>
                </motion.div>
              </motion.div>

              {/* Right Column - Image and Secondary Introduction */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="lg:col-span-5 space-y-6"
              >
                {/* Profile Image */}
                <div className="relative">
                  <motion.div 
                    className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primaryDark/20 dark:from-primaryDark/20 dark:to-primary/20 rounded-2xl blur-2xl"
                    animate={{ 
                      scale: [1, 1.05, 1],
                      rotate: [0, 5, 0] 
                    }}
                    transition={{ 
                      duration: 5,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                  
                  <motion.div 
                    className="relative bg-gradient-to-br from-[#dbeafe] to-[#ede9fe] dark:from-[#1e293b] dark:to-[#0f172a] p-2 rounded-2xl shadow-xl overflow-hidden group"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative rounded-xl overflow-hidden">
                      <OptimizedImage
                        src={profilePic}
                        alt="Muhammad Zain - Software Engineering Student at University of Calgary"
                        width={500}
                        height={600}
                        aspectRatio={500/600}
                        priority={true}
                        quality={90}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover object-center transform group-hover:scale-105 transition-transform duration-500 priority-image"
                        placeholder="blur"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </motion.div>
                </div>

                {/* Secondary Introduction */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="space-y-3 text-xs md:text-sm text-dark/75 dark:text-light/75"
                >
                  <p>
                    My enthusiasm lies in building meaningful software across a variety of domains—from immersive user experiences to scalable systems and intelligent automation. While pursuing my degree, I'm intentionally exploring areas like game development and VR/AR, cloud engineering and DevOps, full-stack web development, AI and machine learning, software testing, and robotics to better understand what resonates most with me.
                  </p>
                  <p>
                    Being a student gives me the freedom to try new things, take risks, and grow through hands-on work. I'm excited to apply these skills in the industry, gain real-world exposure, and eventually find the area where I can make the greatest impact.
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
        <Contact />
      </main>
    </>
  );
}
