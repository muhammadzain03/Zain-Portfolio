/**
 * pages/about.js
 * Purpose: About page — story, skills timeline, interests; rich motion.
 */

import Head from 'next/head';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useRef } from 'react';
import { FaChess, FaFutbol } from 'react-icons/fa';
import { BiMovie } from 'react-icons/bi';

// Dynamically import heavy components
const Contact = dynamic(() => import('@/components/Contact'), {
  ssr: false,
  loading: () => <div className="h-20" /> // Placeholder height
});

import SEO from '@/components/SEO';

export default function About() {
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end start"]
  });

  // Transform scroll progress to timeline height (optimized)
  const timelineHeight = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <>
      <SEO
        title="About Muhammad Zain | Software Engineering Journey & Skills"
        description="Discover Muhammad Zain's journey from Karachi to Calgary as a Software Engineering student. Learn about his expertise in full-stack development, machine learning, database systems, and passion for building meaningful technology."
        canonical="/about"
        ogType="profile"
      />
      
      <Head>
        {/* Page-specific optimizations */}
        <meta name="robots" content="index,follow" />
        <meta name="format-detection" content="telephone=no" />
      </Head>

      <div ref={scrollRef} className="relative">
      <main className="relative min-h-screen bg-light dark:bg-dark text-dark dark:text-light" role="main">
        {/* Hero Section */}
        <section className="pt-20 sm:pt-24 pb-6 sm:pb-8 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 2xl:px-48" aria-labelledby="about-heading">
          <div className="max-w-7xl 2xl:max-w-[90rem] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8"
            >
              <motion.h1
                id="about-heading"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-medium text-dark dark:text-light mb-3 sm:mb-4"
                tabIndex={0}
                role="heading"
                aria-level="1"
              >
                About Me
              </motion.h1>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="w-20 sm:w-24 md:w-28 h-[2px] bg-gradient-to-r from-primary to-primaryDark dark:from-primaryDark dark:to-primary mx-auto mb-8"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-4xl mx-auto text-center space-y-6"
            >
              <p className="text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl text-dark/90 dark:text-light/90 leading-relaxed text-justify">
                Hi, I'm Muhammad Zain—a third-year Software Engineering student at the University of Calgary with a passion for building meaningful technology. My journey from Karachi to Calgary has shaped my adaptability, drive, and growth mindset. I'm energized by solving real-world problems, collaborating on diverse teams, and always learning something new.
              </p>
              <p className="text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl text-dark/80 dark:text-light/80 leading-relaxed text-justify">
                I thrive in feedback-driven environments and value building software that is scalable, clean, and impactful. I see every challenge as an opportunity for growth—whether that's debugging a complex system, optimizing a database query, or learning a new stack. My experience spans academic projects, freelance work, and continuous self-driven learning.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-8 px-4 md:px-8 lg:px-16 xl:px-32 relative">
          <div className="max-w-7xl 2xl:max-w-[90rem] mx-auto">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl md:text-3xl font-medium text-dark dark:text-light mb-4">
                Skills & Technologies
              </h2>
              <div className="w-16 h-[2px] bg-gradient-to-r from-primary to-primaryDark dark:from-primaryDark dark:to-primary mx-auto" />
            </motion.div>

                        {/* Skills Timeline Container - Timeline only covers main categories + additional row */}
            <div className="relative mb-10">
              {/* Vertical timeline line - h-full of this container only */}
              <div className="hidden lg:block absolute left-1/2 top-0 w-[2px] bg-dark/10 dark:bg-light/10 transform -translate-x-1/2 h-full z-0">
                <motion.div
                  className="w-full bg-gradient-to-b from-primary to-primaryDark dark:from-primaryDark dark:to-primary"
                  initial={{ height: 0 }}
                  whileInView={{ height: "100%" }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  viewport={{ once: true }}
                />
              </div>

              {/* All Timeline Skills: Main + Additional in one grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 relative z-10">
                {/* ALL SKILL CATEGORIES WITH TIMELINE */}
                {[
                  {
                    title: "Programming Languages",
                    skills: ["Python", "Java", "C++", "C", "SQL", "JavaScript (ES6+)", "TypeScript"],
                    delay: 0.1
                  },
                  {
                    title: "Web Development",
                    skills: ["React.js (Hooks, Redux)", "Next.js", "HTML5", "CSS3", "SASS", "Tailwind CSS", "Bootstrap", "Material UI", "JavaScript", "TypeScript"],
                    delay: 0.15
                  },
                  {
                    title: "Backend & APIs",
                    skills: ["Node.js (Express)", "Flask", "RESTful APIs", "JSON", "JWT Auth", "WebSockets"],
                    delay: 0.2
                  },
                  {
                    title: "Databases",
                    skills: ["MySQL", "PostgreSQL", "MongoDB", "Firebase (Realtime Database, Firestore)", "SQLite"],
                    delay: 0.25
                  },
                  {
                    title: "DevOps & Cloud",
                    skills: ["AWS (EC2, S3, Lambda)", "Docker", "Heroku", "GitHub Actions", "Vercel", "Netlify"],
                    delay: 0.3
                  },
                  {
                    title: "Version Control & CI/CD",
                    skills: ["Git", "GitHub", "Bitbucket", "Sourcetree", "GitHub Actions"],
                    delay: 0.35
                  },
                  {
                    title: "Testing & QA",
                    skills: ["JUnit", "Selenium", "Postman (API Testing)", "PyTest", "Mocha", "Chai"],
                    delay: 0.4
                  },
                  {
                    title: "Data Science & Machine Learning",
                    skills: ["Pandas", "NumPy", "scikit-learn", "TensorFlow (beginner)", "Jupyter Notebooks"],
                    delay: 0.45
                  },
                  {
                    title: "Development Tools",
                    skills: ["Visual Studio Code", "IntelliJ IDEA", "Eclipse", "Git Workflow", "API Development", "JSON"],
                    delay: 0.5
                  },
                  {
                    title: "UI/UX & Design",
                    skills: ["Figma", "Canva", "Responsive Design", "User Interface Design", "Wireframing"],
                    delay: 0.55
                  }
                ].map((category, index) => (
                  <SkillCategory
                    key={category.title}
                    title={category.title}
                    skills={category.skills}
                    delay={category.delay}
                    index={index}
                  />
                ))}
              </div>
            </div>

            {/* Currently Exploring - Expanded */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true, margin: "-50px" }}
              className="text-center mt-12"
            >
              <h3 className="text-2xl md:text-3xl font-medium text-dark dark:text-light mb-4">Currently Exploring</h3>
              <div className="w-16 h-[2px] bg-gradient-to-r from-primary to-primaryDark dark:from-primaryDark dark:to-primary mx-auto mb-8" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
                {[
                  "Deep Learning & Neural Networks",
                  "Docker & Kubernetes",
                  "AWS Cloud Architecture", 
                  "RESTful API Design",
                  "Advanced Data Structures",
                  "Microservices Architecture",
                  "CI/CD Pipelines",
                  "Machine Learning Algorithms",
                  "System Design Patterns"
                ].map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.08 }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      scale: 1.05,
                      y: -2
                    }}
                    className="px-4 py-3 bg-gradient-to-br from-light/60 via-light/50 to-light/60 dark:from-dark/60 dark:via-dark/50 dark:to-dark/60 backdrop-blur-sm rounded-xl border border-primary/20 dark:border-primaryDark/20 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  >
                    <div className="flex items-center justify-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.8 + index * 0.08 }}
                        className="w-2 h-2 bg-primary dark:bg-primaryDark rounded-full mr-3 flex-shrink-0"
                      />
                      <span className="text-sm font-medium text-dark dark:text-light group-hover:text-primary dark:group-hover:text-primaryDark transition-colors duration-300">
                        {skill}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Work Values Section */}
        <WorkValuesSection />

        {/* Personal Interests Icons */}
        <PersonalInterestsIcons />
        
        {/* Circular Contact Component */}
        <Contact />
      </main>
      </div>
    </>
  );
}

// Skill Category Component
function SkillCategory({ title, skills, delay, index, fullWidth = false }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div className={`relative group ${fullWidth ? 'col-span-full' : ''}`}>
      {/* Subtle background glow */}
      <motion.div 
        className="absolute -inset-2 bg-gradient-to-r from-primary/10 to-primaryDark/10 dark:from-primaryDark/10 dark:to-primary/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        animate={{ 
          scale: [1, 1.01, 1]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, delay }}
        className={`relative bg-gradient-to-br from-light/60 via-light/50 to-light/60 dark:from-dark/60 dark:via-dark/50 dark:to-dark/60 backdrop-blur-sm rounded-2xl p-6 border border-dark/10 dark:border-light/10 shadow-lg hover:shadow-xl transition-all duration-500 ${
          fullWidth ? 'max-w-4xl mx-auto' : (index % 2 === 0 ? 'lg:mr-8' : 'lg:ml-8')
        }`}
        whileHover={{ 
          scale: 1.01,
          y: -2
        }}
        whileTap={{ scale: 0.99 }}
      >
        {/* Flex heading with bullet on the left */}
        <div className="flex items-center mb-4">
          {!fullWidth && (
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 0.5, delay: delay + 0.3 }}
              className="w-2 h-2 bg-primary dark:bg-primaryDark rounded-full mr-3 flex-shrink-0"
            />
          )}
          <h3 className="text-lg font-medium text-dark dark:text-light">
            {title}
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, skillIndex) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, delay: delay + 0.5 + skillIndex * 0.05 }}
              whileHover={{ 
                scale: 1.02,
                y: -1
              }}
              className="px-3 py-1 bg-dark/5 dark:bg-light/5 text-dark/80 dark:text-light/80 rounded-lg text-sm hover:bg-primary/10 dark:hover:bg-primaryDark/10 hover:text-primary dark:hover:text-primaryDark transition-all duration-300 cursor-pointer hover:shadow-md"
            >
              {skill}
            </motion.span>
          ))}
        </div>
        
        {/* Subtle overlay effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
      </motion.div>
    </div>
  );
}

// Work Values Section Component
function WorkValuesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const values = [
    "Collaborative team member—believe in honest feedback and shared success.",
    "Clear, concise communicator (written and verbal).",
    "Curious and resourceful—love picking up new frameworks and tools quickly.",
    "Prioritize maintainable, well-documented code and test coverage.",
    "Love to break down complex problems into actionable steps and ship real value.",
    "Thrive under deadlines and enjoy taking initiative in ambiguous situations."
  ];

  return (
    <section ref={ref} className="py-8 px-4 md:px-8 lg:px-16 xl:px-32 bg-dark/5 dark:bg-light/5">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-medium text-dark dark:text-light mb-4">
            How I Work & What I Value
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-primary to-primaryDark dark:from-primaryDark dark:to-primary mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex items-start space-x-3 p-4 rounded-xl hover:bg-light/50 dark:hover:bg-dark/50 transition-colors duration-200"
            >
              <div className="w-2 h-2 bg-primary dark:bg-primaryDark rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl text-dark/80 dark:text-light/80 leading-relaxed text-justify">{value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}



// Personal Interests Icons Component
function PersonalInterestsIcons() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const interests = [
    { icon: FaFutbol, label: "Football" },
    { icon: FaChess, label: "Chess" },
    { icon: BiMovie, label: "Film Analysis" }
  ];

  return (
    <section ref={ref} className="py-8 px-4 md:px-8 lg:px-16 xl:px-32">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="text-xs md:text-sm text-dark/80 dark:text-light/80 mb-6 max-w-3xl mx-auto">
            When I'm not working with code, you'll find me playing football, analyzing chess endgames, or breaking down a Christopher Nolan film.
          </p>
          
          {/* Animated Interest Icons */}
          <div className="flex justify-center items-center gap-8">
            {interests.map((interest, index) => (
              <motion.div
                key={interest.label}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 200
                }}
                whileHover={{ 
                  scale: 1.2,
                  y: -4
                }}
                className="group cursor-pointer relative"
              >
                <div className="relative">
                  {/* Subtle glow background */}
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.5
                    }}
                    className="absolute inset-0 bg-primary/20 dark:bg-primaryDark/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  
                  {/* Icon container */}
                  <div className="relative w-10 h-10 bg-light/80 dark:bg-dark/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-dark/10 dark:border-light/10 shadow-md">
                    <interest.icon className="w-5 h-5 text-primary dark:text-primaryDark" />
                  </div>
                </div>
                
                {/* Label on hover */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-dark dark:bg-light text-light dark:text-dark text-xs rounded-md whitespace-nowrap"
                >
                  {interest.label}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}


