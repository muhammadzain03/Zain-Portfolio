/**
 * pages/projects.js
 * Purpose: Projects grid with modal image/video preview; motion-rich cards.
 */
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
const Contact = dynamic(() => import('@/components/Contact'), { ssr: false });
import SEO from '@/components/SEO';
import { useState, useCallback, useMemo, memo } from 'react';
import { FaGithub, FaExternalLinkAlt, FaPlay, FaTimes } from 'react-icons/fa';
import Image from 'next/image';

// Project data
const projects = [
  {
    id: 1,
    title: "CityX Subway Display System",
    category: "Real-Time Information Display",
    description: "A sophisticated Java-based subway information display system delivering real-time train tracking, weather updates, news feeds, and dynamic advertisements—mirroring the polish and reliability of major metro networks. Built with enterprise-level MVC architecture, multithreading, and API integrations for seamless live updates and smooth UI animations.",
    image: "/images/projects/Subway Screen Application.webp",
    video: "/images/projects/Subway Screen Application Video.mp4",
    github: "https://github.com/muhammadzain03/CityX-Subway-Display-System",
    technologies: ["Java", "MySQL", "Swing", "MVC", "Multithreading", "API Integration"],
    hasVideo: true
  },
  {
    id: 2,
    title: "Flight Operations Manager",
    category: "Airline Management Application",
    description: "A modern, user-friendly airline management system developed with C++ and Qt, enabling real-time scheduling, passenger management, and seat tracking for airlines and travel agencies. Features dynamic interactive seat maps, data visualization dashboards, and robust reporting to streamline daily operations.",
    image: "/images/projects/Flight Operations Manager.webp",
    video: "/images/projects/Flight Operations Manager Video.mp4",
    github: "https://github.com/muhammadzain03/Flight-Operations-Manager",
    technologies: ["C++", "Qt", "OOP", "JSON", "SQLite", "Data Visualization"],
    hasVideo: true
  },
  {
    id: 3,
    title: "TechVista Inc E-commerce Platform",
    category: "Full-Stack E-commerce Solution",
    description: "A modern, end-to-end e-commerce web platform built with React, Flask, and SQLite, featuring guest browsing, secure authentication, animated UI, and responsive layouts for seamless shopping on any device. Demonstrates best practices in API design, frontend/backend integration, and advanced UI techniques like glassmorphism.",
    image: "/images/projects/TechVista Inc.webp",
    video: "/images/projects/Techvista Inc Video.mp4",
    github: "https://github.com/muhammadzain03/TechVista-Inc",
    technologies: ["React.js", "Flask", "SQLite", "REST APIs", "JavaScript", "Python"],
    hasVideo: true
  },
  {
    id: 4,
    title: "Purrfect Innovations",
    category: "Frontend E-commerce Website",
    description: "A clean, static e-commerce website for cat enthusiasts, crafted using HTML and CSS to highlight best practices in responsive web design. Showcases a simple product catalog, user-friendly navigation, and polished layouts—all demonstrating frontend fundamentals and attention to accessibility.",
    image: "/images/projects/Purrfect Innovations.webp",
    github: "https://github.com/muhammadzain03/Purrfect-Innovations",
    technologies: ["HTML", "CSS", "Responsive Design", "UI/UX"],
    hasVideo: false
  },
  {
    id: 5,
    title: "Art Museum Database Management System",
    category: "Role-Based Database Solution",
    description: "A secure, Python-MySQL database application for art museum operations, featuring automated business rules, credential-based access, and easy management of collections, staff, and visitors. The system enforces data integrity with SQL triggers and role-based controls for reliable and safe museum operations.",
    image: "/images/projects/Art Museum.webp",
    github: "https://github.com/muhammadzain03/Art-Museum-Database-Management-System-SQL",
    technologies: ["Python", "MySQL", "SQL", "Role-Based Access", "Security"],
    hasVideo: false
  }
];

// Modal Component for Project Media - Memoized for Performance
const ProjectModal = memo(({ project, isOpen, onClose, showVideo, onVideoToggle }) => {
  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
          className="relative bg-light dark:bg-dark rounded-lg overflow-hidden shadow-2xl border border-primary/10 dark:border-primaryDark/10"
          style={{
            maxWidth: '90vw',
            maxHeight: '90vh',
            aspectRatio: 'auto'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Compact Close Button */}
          <button
            onClick={onClose}
            aria-label="Close project modal"
            className="absolute top-2 right-2 z-20 w-7 h-7 bg-dark/90 dark:bg-light/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-dark dark:hover:bg-light transition-all duration-200 shadow-lg"
          >
            <FaTimes className="text-light dark:text-dark text-xs" />
          </button>

          {/* Adaptive Media Container */}
          <div className="relative">
            {!showVideo ? (
              // Adaptive Image Display
              <div className="relative">
                <motion.div
                  initial={{ scale: 1.02 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={800}
                    height={600}
                    className="block w-auto h-auto max-w-[85vw] max-h-[85vh] object-contain"
                    loading="eager"
                    style={{ transform: 'translateZ(0)' }}
                    sizes="(max-width: 768px) 85vw, (max-width: 1200px) 85vw, 85vw"
                  />
                </motion.div>
                
                {/* Compact Video Play Button Overlay */}
                {project.hasVideo && (
                  <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onVideoToggle}
                    aria-label="Play video"
                    className="absolute inset-0 flex items-center justify-center bg-black/15 hover:bg-black/10 transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-primary/95 dark:bg-primaryDark/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300">
                      <FaPlay className="text-white text-sm ml-0.5" />
                    </div>
                  </motion.button>
                )}
              </div>
            ) : (
              // Adaptive Video Display
              <motion.video
                key={`modal-${project.video}-adaptive`}
                src={project.video}
                className="block w-auto h-auto max-w-[85vw] max-h-[85vh] object-contain"
                controls
                autoPlay
                muted={false}
                preload="metadata"
                playsInline
                controlsList="nodownload"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                style={{ transform: 'translateZ(0)' }}
                onLoadStart={(e) => {
                  e.target.currentTime = 0;
                  e.target.playbackRate = 1;
                }}
                onCanPlay={(e) => {
                  e.target.play().catch(() => {});
                }}
              >
                <source src={project.video} type="video/mp4" />
                <source src={project.video} type="video/webm" />
                <source src={project.video} type="video/mkv" />
                Your browser does not support the video tag.
              </motion.video>
            )}

            {/* Video Toggle Button for Video Projects */}
            {project.hasVideo && (
              <button
                onClick={onVideoToggle}
                aria-label={showVideo ? "Show image" : "Show video"}
                className="absolute bottom-2 left-2 z-20 px-2 py-1 bg-dark/90 dark:bg-light/90 backdrop-blur-sm rounded-md flex items-center gap-1.5 text-light dark:text-dark text-xs font-medium shadow-lg hover:bg-dark dark:hover:bg-light transition-all duration-200"
              >
                <FaPlay className="text-xs" />
                <span>{showVideo ? 'Image' : 'Video'}</span>
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
});

ProjectModal.displayName = 'ProjectModal';

// ProjectCard Component with Performance Optimizations - Memoized
const ProjectCard = memo(({ project, index, onCardClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -10 }}
      className="group relative bg-gradient-to-br from-light/60 via-light/50 to-light/60 dark:from-dark/60 dark:via-dark/50 dark:to-dark/60 backdrop-blur-sm rounded-2xl border border-primary/20 dark:border-primaryDark/20 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
      style={{ transform: 'translateZ(0)' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Project Image/Video Container */}
      <div 
        className="relative h-64 overflow-hidden rounded-t-2xl cursor-pointer"
        onClick={() => onCardClick(project)}
      >
        {/* Background Image */}
        <motion.div
          className="w-full h-full"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            loading={index === 0 ? 'eager' : 'lazy'}
            priority={index === 0}
            style={{ transform: 'translateZ(0)' }}
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </motion.div>
        
        {/* Video Overlay (only for projects with videos) */}
        {project.hasVideo && (
          <motion.video
            key={project.video}
            className="absolute inset-0 w-full h-full object-cover"
            muted
            loop
            playsInline
            preload="metadata"
            style={{ transform: 'translateZ(0)' }}
            aria-hidden="true"
            role="presentation"
            tabIndex={-1}
            onMouseEnter={(e) => {
              e.target.currentTime = 0;
              e.target.play().catch(() => {});
            }}
            onMouseLeave={(e) => {
              e.target.pause();
              e.target.currentTime = 0;
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <source src={project.video} type="video/mp4" />
            <source src={project.video} type="video/webm" />
            Your browser does not support the video tag.
          </motion.video>
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
        
        {/* Project Category Badge */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
          className="absolute top-4 left-4 px-3 py-1 bg-primary/90 dark:bg-primaryDark/90 backdrop-blur-sm rounded-full"
        >
          <span className="text-xs font-medium text-white">
            {project.category}
          </span>
        </motion.div>
      </div>

      {/* Project Content */}
      <div className="p-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
          className="text-xl font-bold text-dark dark:text-light mb-3 group-hover:text-primary dark:group-hover:text-primaryDark transition-colors duration-300"
        >
          {project.title}
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
          className="text-sm text-dark/70 dark:text-light/70 mb-4 leading-relaxed"
        >
          {project.description}
        </motion.p>

        {/* Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 + 0.6 }}
          className="flex flex-wrap gap-2 mb-6"
        >
          {project.technologies.map((tech, techIndex) => (
            <span
              key={techIndex}
              className="px-2 py-1 bg-primary/10 dark:bg-primaryDark/10 text-primary dark:text-primaryDark text-xs rounded-full border border-primary/20 dark:border-primaryDark/20"
            >
              {tech}
            </span>
          ))}
        </motion.div>

        {/* GitHub Link */}
        <motion.a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${project.title} on GitHub`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 + 0.7 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-primaryDark dark:from-primaryDark dark:to-primary text-white text-sm font-medium rounded-lg hover:shadow-lg transition-all duration-300"
        >
          <FaGithub />
          <span>View on GitHub</span>
          <FaExternalLinkAlt className="text-xs" />
        </motion.a>
      </div>
    </motion.div>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default function Projects() {
  const [modalProject, setModalProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const handleCardClick = useCallback((project) => {
    setModalProject(project);
    setIsModalOpen(true);
    setShowVideo(false); // Always start with image
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setShowVideo(false);
    setTimeout(() => setModalProject(null), 300); // Delay to allow exit animation
  }, []);

  const handleVideoToggle = useCallback(() => {
    setShowVideo(prev => !prev);
  }, []);

  // Memoize projects to prevent unnecessary re-renders
  const memoizedProjects = useMemo(() => projects, []);

  return (
    <>
      <SEO
        title="Projects Portfolio | Muhammad Zain - Software Engineering Showcase"
        description="Explore Muhammad Zain's diverse software engineering projects including CityX Subway Display System, Flight Operations Manager, TechVista E-commerce Platform, and more. Featuring real-time systems, full-stack development, and innovative solutions."
        canonical="/projects"
        ogType="website"
      />
      
              <Head>
          {/* Project-specific optimizations */}
          <meta name="robots" content="index,follow" />
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
                Explore my journey through code, creativity, and problem-solving. Each project represents a milestone in my development as a software engineer, showcasing diverse technologies and innovative solutions.
              </motion.p>
            </motion.div>

            {/* Projects Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
            >
              {memoizedProjects.map((project, index) => (
                <div key={project.id} className={index === memoizedProjects.length - 1 && memoizedProjects.length % 2 === 1 ? "lg:col-span-2 lg:flex lg:justify-center" : ""}>
                  <div className={index === memoizedProjects.length - 1 && memoizedProjects.length % 2 === 1 ? "lg:w-full lg:max-w-lg" : ""}>
                    <ProjectCard 
                      project={project} 
                      index={index} 
                      onCardClick={handleCardClick}
                    />
                  </div>
                </div>
              ))}
            </motion.div>

            {/* GitHub Profile Link */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <motion.a
                href="https://github.com/muhammadzain03"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View all projects on GitHub"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-light/60 via-light/50 to-light/60 dark:from-dark/60 dark:via-dark/50 dark:to-dark/60 backdrop-blur-sm rounded-xl border border-primary/20 dark:border-primaryDark/20 shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <FaGithub className="text-lg text-primary dark:text-primaryDark" />
                <div className="text-left">
                  <div className="text-base font-semibold text-dark dark:text-light">
                    View All Projects
                  </div>
                  <div className="text-xs text-dark/60 dark:text-light/60">
                    @muhammadzain03
                  </div>
                </div>
                <FaExternalLinkAlt className="text-primary dark:text-primaryDark" />
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* Contact Component */}
        <Contact />

        {/* Project Modal */}
        <ProjectModal
          project={modalProject}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          showVideo={showVideo}
          onVideoToggle={handleVideoToggle}
        />
      </main>
    </>
  );
}

// Pre-generate this page at build time for instant loading
export async function getStaticProps() {
  return {
    props: {},
  };
}
