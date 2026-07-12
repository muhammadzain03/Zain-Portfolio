/**
 * pages/projects.js
 * Purpose: Projects page - horizontal 3D gallery (Alche-style works strip) with
 * an editorial caption block and the existing modal image/video preview.
 */
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
const Contact = dynamic(() => import('@/components/Contact'), { ssr: false });
import SEO from '@/components/SEO';
import ProjectGallery from '@/components/ProjectGallery';
import { useState, useCallback, memo } from 'react';
import { FaGithub, FaExternalLinkAlt, FaTimes, FaPlay } from 'react-icons/fa';
import Image from 'next/image';

// Project data - array order = display order (RCC leads as the flagship)
const projects = [
  {
    id: 7,
    title: "Resume & Career Coach (RCC)",
    category: "AI-Powered Career Platform",
    description: "A production AI platform, live at resumecoach.app, that scores resumes against job descriptions with a hybrid deterministic + LLM pipeline, pinpoints missing skills and requirement gaps, and runs voice-enabled mock interviews. Ships with JWT and Google OAuth authentication, email code verification, and a React, Flask, and PostgreSQL stack deployed across Vercel, Render, and Neon.",
    image: "/images/projects/Resume Career Coach.png",
    github: "https://github.com/muhammadzain03/AI-Resume-and-Career-Coach",
    liveDemo: "https://resumecoach.app/",
    technologies: ["React", "Flask", "PostgreSQL", "Gemini LLM", "Docker", "JWT + OAuth"],
    hasVideo: false
  },
  {
    id: 6,
    title: "Lumen Pendulum",
    category: "Physics Simulation",
    description: "A real-time, interactive triple pendulum simulation that visualizes deterministic chaos through glowing motion trails. The physics are derived from Lagrangian mechanics and integrated with 4th-order Runge-Kutta (RK4). Visuals are rendered with Three.js and a bloom post-processing pass. Fully interactive - grab any mass and the chain responds through inverse kinematics above and free gravity below.",
    image: "/images/projects/Lumen Pendulum.jpg",
    github: "https://github.com/muhammadzain03/Lumen-Pendulum",
    liveDemo: "https://muhammadzain03.github.io/Lumen-Pendulum/",
    pdf: "/Lagrange.pdf",
    technologies: ["TypeScript", "Three.js", "Vite", "Lagrangian Mechanics", "RK4", "GitHub Actions"],
    hasVideo: false
  },
  {
    id: 1,
    title: "CityX Subway Display System",
    category: "Real-Time Information Display",
    description: "A sophisticated Java-based subway information display system delivering real-time train tracking, weather updates, news feeds, and dynamic advertisements - mirroring the polish and reliability of major metro networks. Built with enterprise-level MVC architecture, multithreading, and API integrations for seamless live updates and smooth UI animations.",
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
    id: 5,
    title: "Art Museum Database Management System",
    category: "Role-Based Database Solution",
    description: "A secure, Python-MySQL database application for art museum operations, featuring automated business rules, credential-based access, and easy management of collections, staff, and visitors. The system enforces data integrity with SQL triggers and role-based controls for reliable and safe museum operations.",
    image: "/images/projects/Art Museum.webp",
    github: "https://github.com/muhammadzain03/Art-Museum-Database-Management-System-SQL",
    technologies: ["Python", "MySQL", "SQL", "Role-Based Access", "Security"],
    hasVideo: false
  },
  {
    id: 4,
    title: "Purrfect Innovations",
    category: "Frontend E-commerce Website",
    description: "A clean, static e-commerce website for cat enthusiasts, crafted using HTML and CSS to highlight best practices in responsive web design. Showcases a simple product catalog, user-friendly navigation, and polished layouts - all demonstrating frontend fundamentals and attention to accessibility.",
    image: "/images/projects/Purrfect Innovations.webp",
    github: "https://github.com/muhammadzain03/Purrfect-Innovations",
    technologies: ["HTML", "CSS", "Responsive Design", "UI/UX"],
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


          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
});

ProjectModal.displayName = 'ProjectModal';

export default function Projects() {
  const [modalProject, setModalProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const handleOpenProject = useCallback((project) => {
    setModalProject(project);
    setIsModalOpen(true);
    setShowVideo(false); // Always start with image
  }, []);

  // Play badge on a gallery panel: open the modal straight into the video.
  const handlePlayProject = useCallback((project) => {
    setModalProject(project);
    setIsModalOpen(true);
    setShowVideo(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setShowVideo(false);
    setTimeout(() => setModalProject(null), 300); // Delay to allow exit animation
  }, []);

  const handleVideoToggle = useCallback(() => {
    setShowVideo(prev => !prev);
  }, []);

  return (
    <>
      <SEO
        title="Projects Portfolio | Muhammad Zain - Software Engineering Showcase"
        description="Explore Muhammad Zain's software engineering projects, led by Resume & Career Coach (RCC), an AI-powered career platform, plus Lumen Pendulum, CityX Subway Display System, Flight Operations Manager, and more."
        canonical="/projects"
        ogType="website"
      />

      <Head>
        {/* Project-specific optimizations */}
        <meta name="robots" content="index,follow" />
      </Head>

      <main className="min-h-screen bg-light dark:bg-dark text-dark dark:text-light overflow-x-hidden">
        {/* Editorial header */}
        <section className="pt-20 sm:pt-24 pb-8 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-4"
            >
              <motion.h1
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-primaryDark dark:from-primaryDark dark:to-primary bg-clip-text text-transparent"
              >
                My Projects
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
                Explore my journey through code, creativity, and problem-solving. Drag, scroll, or use the arrows to move through the gallery, and click a project to preview it.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Horizontal 3D gallery */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="pb-16"
          aria-label="Projects showcase"
        >
          <ProjectGallery
            projects={projects}
            onOpenProject={handleOpenProject}
            onPlayVideo={handlePlayProject}
          />
        </motion.section>

        {/* GitHub Profile Link */}
        <section className="pb-16 px-4">
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
