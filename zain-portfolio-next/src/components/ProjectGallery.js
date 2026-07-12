/**
 * ProjectGallery.js
 * Purpose: Infinite horizontal 3D projects gallery (Alche-style works strip) -
 * large media panels angled in perspective on an endless loop (the last project
 * sits to the left of the first), driven by drag / wheel / arrows, with an
 * editorial caption block for the centered project.
 * Notes: CSS 3D + framer-motion only. Panels recycle via modular (wrap-around)
 * positioning, so the strip never ends in either direction. Reduced motion
 * renders a flat scrollable row instead.
 */
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  animate,
} from 'framer-motion';
import Image from 'next/image';
import { FaGithub, FaExternalLinkAlt, FaFilePdf, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const EASE = [0.22, 1, 0.36, 1];
const GLIDE = { type: 'spring', stiffness: 160, damping: 27, restDelta: 0.5 };

function useGalleryMetrics() {
  // SSR-safe defaults; measured after mount and on resize.
  const [m, setM] = useState({ vw: 1280, cardW: 680, cardH: 425, gap: 40, mounted: false });

  useEffect(() => {
    const measure = () => {
      const vw = window.innerWidth;
      const isMobile = vw < 768;
      const cardW = isMobile
        ? Math.round(vw * 0.78)
        : Math.round(Math.min(Math.max(vw * 0.52, 320), 760));
      const cardH = Math.round(cardW * 0.625);
      const gap = isMobile ? 20 : Math.round(Math.min(Math.max(vw * 0.028, 24), 48));
      setM({ vw, cardW, cardH, gap, mounted: true });
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  return m;
}

/* ---- One media panel, positioned on the endless loop ---- */
const GalleryPanel = memo(function GalleryPanel({
  project,
  index,
  x,
  step,
  totalW,
  vw,
  cardW,
  cardH,
  maxAngle,
  onSelect,
}) {
  const [hovered, setHovered] = useState(false);

  // Wrapped signed distance of this panel's center from the viewport center.
  // Mapping into (-totalW/2, totalW/2] is what makes the loop endless: the
  // last project naturally sits one step to the LEFT of the first.
  const dist = useTransform(x, (v) => {
    let d = (index * step + v) % totalW;
    if (d < 0) d += totalW;
    if (d > totalW / 2) d -= totalW;
    return d;
  });

  const panelX = useTransform(dist, (d) => d - cardW / 2);
  const rotateY = useTransform(dist, (d) => {
    const t = Math.max(-1, Math.min(1, d / (vw * 0.7)));
    return -t * maxAngle;
  });
  const z = useTransform(dist, (d) => -Math.min(Math.abs(d), vw) * 0.22);
  const scale = useTransform(dist, (d) => 1 - Math.min(Math.abs(d) / vw, 1) * 0.08);
  const opacity = useTransform(dist, (d) => 1 - Math.min(Math.abs(d) / (vw * 1.25), 1) * 0.45);

  const handleClick = useCallback(() => {
    onSelect(index, dist.get());
  }, [onSelect, index, dist]);

  return (
    <motion.div
      className="absolute top-1/2 left-0"
      style={{
        width: cardW,
        height: cardH,
        x: panelX,
        y: '-50%',
        left: '50%',
        rotateY,
        z,
        scale,
        opacity,
        transformStyle: 'preserve-3d',
      }}
    >
      <button
        type="button"
        aria-label={`View ${project.title}`}
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group relative block w-full h-full overflow-hidden rounded-lg border border-black/10 dark:border-white/10 bg-black shadow-2xl cursor-pointer text-left"
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 78vw, 60vw"
          priority={index === 0}
          loading={index === 0 ? 'eager' : 'lazy'}
          style={{ transform: 'translateZ(0)' }}
        />

        {/* Hover video preview (same behavior the grid cards had) */}
        {project.hasVideo && (
          <motion.video
            className="absolute inset-0 w-full h-full object-cover"
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            tabIndex={-1}
            initial={{ opacity: 0 }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            onMouseEnter={(e) => {
              e.target.currentTime = 0;
              e.target.play().catch(() => {});
            }}
            onMouseLeave={(e) => {
              e.target.pause();
            }}
          >
            <source src={project.video} type="video/mp4" />
          </motion.video>
        )}

        {/* Editorial index tag, video-style */}
        <span className="absolute top-3 left-4 text-[11px] font-semibold tracking-[0.25em] text-white/70 mix-blend-difference select-none">
          {String(index + 1).padStart(2, '0')}
        </span>

        <span className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </button>
    </motion.div>
  );
});

/* ---- Caption block for the centered project (Alche editorial style) ---- */
const GalleryCaption = memo(function GalleryCaption({ project, index, total, onOpen }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={project.id}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.28, ease: EASE }}
        className="max-w-3xl mx-auto px-6 text-center"
      >
        <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-dark/50 dark:text-light/50 mb-3">
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          <span className="mx-3 text-dark/30 dark:text-light/30">·</span>
          {project.category}
        </p>

        <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-dark dark:text-light mb-4">
          {project.title}
        </h2>

        <p className="text-xs md:text-sm leading-relaxed text-dark/75 dark:text-light/75 mb-5">
          {project.description}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-primary/10 dark:bg-primaryDark/10 text-primary dark:text-primaryDark text-xs rounded-full border border-primary/20 dark:border-primaryDark/20"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} live`}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg bg-gradient-to-r from-primary to-primaryDark dark:from-primaryDark dark:to-primary text-white hover:shadow-lg transition-all duration-300"
            >
              <FaExternalLinkAlt className="text-xs" />
              View Live
            </a>
          )}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.title} on GitHub`}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg border border-dark/20 dark:border-light/20 text-dark dark:text-light hover:border-primary dark:hover:border-primaryDark transition-all duration-300"
          >
            <FaGithub />
            View on GitHub
          </a>
          {project.pdf && (
            <a
              href={project.pdf}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} reference PDF`}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg border border-dark/20 dark:border-light/20 text-dark dark:text-light hover:border-primary dark:hover:border-primaryDark transition-all duration-300"
            >
              <FaFilePdf />
              Lagrange PDF
            </a>
          )}
          <button
            type="button"
            onClick={onOpen}
            aria-label={`Open ${project.title} media preview`}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg text-dark/60 dark:text-light/60 hover:text-primary dark:hover:text-primaryDark transition-colors duration-300"
          >
            Preview ↗
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
});

export default function ProjectGallery({ projects, onOpenProject }) {
  const reduceMotion = useReducedMotion();
  const { vw, cardW, cardH, gap, mounted } = useGalleryMetrics();
  const step = cardW + gap;
  const total = projects.length;
  const totalW = total * step;
  const maxAngle = vw < 768 ? 16 : 26;

  const x = useMotionValue(0);
  const [active, setActive] = useState(0);
  const stripRef = useRef(null);
  const glideAnim = useRef(null);
  const glideTarget = useRef(0);
  const panMoved = useRef(false);

  // Which panel is centered (mod total - the loop never ends).
  useMotionValueEvent(x, 'change', (v) => {
    const idx = ((Math.round(-v / step) % total) + total) % total;
    setActive((prev) => (prev === idx ? prev : idx));
  });

  const glideTo = useCallback((target) => {
    glideTarget.current = target;
    if (glideAnim.current) glideAnim.current.stop();
    glideAnim.current = animate(x, target, GLIDE);
  }, [x]);

  // Arrows / keyboard: move one step in continuous space (wrap handles the rest).
  const goBy = useCallback(
    (dir) => {
      const k = Math.round(-x.get() / step) + dir;
      glideTo(-k * step);
    },
    [x, step, glideTo]
  );

  // Panel click: centered panel opens the modal; a side panel glides to center
  // along the shortest wrapped path.
  const handleSelect = useCallback(
    (index, wrappedDist) => {
      if (panMoved.current) return;
      if (Math.abs(wrappedDist) < cardW / 2) {
        onOpenProject(projects[index]);
      } else {
        glideTo(x.get() - wrappedDist);
      }
    },
    [cardW, onOpenProject, projects, glideTo, x]
  );

  // Wheel inside the strip moves the loop (it never ends, so it always
  // consumes); the caption area below stays free for normal page scrolling.
  useEffect(() => {
    if (reduceMotion) return undefined;
    const el = stripRef.current;
    if (!el) return undefined;

    const onWheel = (e) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      e.preventDefault();
      glideTarget.current -= delta * 1.5;
      if (glideAnim.current) glideAnim.current.stop();
      glideAnim.current = animate(x, glideTarget.current, GLIDE);
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [reduceMotion, x]);

  const onKeyDown = useCallback(
    (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        goBy(1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goBy(-1);
      }
    },
    [goBy]
  );

  /* ---- Reduced motion: flat, native, fully accessible row ---- */
  if (reduceMotion) {
    return (
      <div>
        <div className="flex gap-6 overflow-x-auto px-6 pb-6 snap-x snap-mandatory">
          {projects.map((project) => (
            <button
              key={project.id}
              type="button"
              onClick={() => onOpenProject(project)}
              aria-label={`Open ${project.title} preview`}
              className="relative flex-shrink-0 w-[78vw] md:w-[52vw] max-w-[720px] aspect-[8/5] snap-center overflow-hidden rounded-lg border border-black/10 dark:border-white/10"
            >
              <Image src={project.image} alt={project.title} fill className="object-cover" sizes="78vw" />
            </button>
          ))}
        </div>
        <GalleryCaption
          project={projects[active] || projects[0]}
          index={active}
          total={total}
          onOpen={() => onOpenProject(projects[active] || projects[0])}
        />
      </div>
    );
  }

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Projects gallery"
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="outline-none focus-visible:ring-2 focus-visible:ring-primary dark:focus-visible:ring-primaryDark rounded-lg"
    >
      {/* Infinite 3D strip */}
      <div
        ref={stripRef}
        className="relative overflow-hidden select-none"
        style={{ perspective: '1400px', height: cardH + 48 }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            transformStyle: 'preserve-3d',
            cursor: 'grab',
            touchAction: 'pan-y',
            visibility: mounted ? 'visible' : 'hidden',
          }}
          onPanStart={() => {
            panMoved.current = false;
            if (glideAnim.current) glideAnim.current.stop();
          }}
          onPan={(e, info) => {
            if (Math.abs(info.offset.x) > 6) panMoved.current = true;
            x.set(x.get() + info.delta.x);
          }}
          onPanEnd={(e, info) => {
            // Momentum fling, then let the wrap absorb it - no walls, no snap.
            glideTo(x.get() + info.velocity.x * 0.35);
            setTimeout(() => {
              panMoved.current = false;
            }, 0);
          }}
          whileTap={{ cursor: 'grabbing' }}
        >
          {projects.map((project, i) => (
            <GalleryPanel
              key={project.id}
              project={project}
              index={i}
              x={x}
              step={step}
              totalW={totalW}
              vw={vw}
              cardW={cardW}
              cardH={cardH}
              maxAngle={maxAngle}
              onSelect={handleSelect}
            />
          ))}
        </motion.div>

        {/* Arrows - always enabled on an endless loop */}
        <button
          type="button"
          aria-label="Previous project"
          onClick={() => goBy(-1)}
          className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center border border-dark/15 dark:border-light/15 bg-light/70 dark:bg-dark/70 backdrop-blur-sm text-dark dark:text-light hover:border-primary dark:hover:border-primaryDark transition-all duration-300"
        >
          <FaChevronLeft className="text-sm" />
        </button>
        <button
          type="button"
          aria-label="Next project"
          onClick={() => goBy(1)}
          className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center border border-dark/15 dark:border-light/15 bg-light/70 dark:bg-dark/70 backdrop-blur-sm text-dark dark:text-light hover:border-primary dark:hover:border-primaryDark transition-all duration-300"
        >
          <FaChevronRight className="text-sm" />
        </button>
      </div>

      {/* Editorial caption for the centered project */}
      <div className="mt-8 md:mt-10">
        <GalleryCaption
          project={projects[active]}
          index={active}
          total={total}
          onOpen={() => onOpenProject(projects[active])}
        />
      </div>
    </div>
  );
}
