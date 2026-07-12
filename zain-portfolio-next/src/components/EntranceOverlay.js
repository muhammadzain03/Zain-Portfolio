/**
 * EntranceOverlay.js
 * Purpose: Cinematic once-per-session intro for the homepage - an architectural
 * grid draws in, a wireframe triangle (the Vercel mark) traces itself and fills
 * solid, then dissolves into the MZ mark before the curtain lifts to reveal
 * the page. Skippable by any input; never shows under reduced motion.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];
const SESSION_KEY = 'mz-entrance';

/* Vercel-style equilateral triangle + inner wireframe pyramid depth */
const TRI_OUTER = 'M 50 12 L 92 86 L 8 86 Z';
const TRI_INNER = 'M 50 36.7 L 71 73.7 L 29 73.7 Z';
const TRI_STRUTS = ['M 50 12 L 50 36.7', 'M 92 86 L 71 73.7', 'M 8 86 L 29 73.7'];

/* Full-viewport architectural grid (stretched; strokes stay hairline) */
const GRID_V = [12, 28, 44, 60, 76, 92];
const GRID_H = [18, 38, 58, 78];

function markSeen() {
  try {
    sessionStorage.setItem(SESSION_KEY, '1');
  } catch (e) {
    /* storage unavailable - play again next time, harmless */
  }
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-entrance', 'seen');
  }
}

export default function EntranceOverlay() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const finishing = useRef(false);
  const timers = useRef([]);

  const startExit = useCallback(() => {
    if (finishing.current) return;
    finishing.current = true;
    timers.current.forEach(clearTimeout);
    markSeen();
    setExiting(true);
    timers.current = [setTimeout(() => setVisible(false), 800)];
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return undefined;

    // Pre-paint guard in _document already hid us for returning visitors;
    // this keeps React state in sync so we unmount instead of display:none.
    if (document.documentElement.getAttribute('data-entrance') === 'seen') {
      setVisible(false);
      return undefined;
    }

    if (reduceMotion) {
      markSeen();
      setVisible(false);
      return undefined;
    }

    const skip = () => startExit();
    window.addEventListener('pointerdown', skip);
    window.addEventListener('keydown', skip);
    window.addEventListener('wheel', skip, { passive: true });

    // Sequence: grid 0-0.6s, wireframe 0.4-1.3s, fill 1.3-1.7s,
    // MZ morph 1.7-2.3s, curtain lift 2.35s -> gone by ~3.1s.
    timers.current.push(setTimeout(startExit, 2350));

    return () => {
      window.removeEventListener('pointerdown', skip);
      window.removeEventListener('keydown', skip);
      window.removeEventListener('wheel', skip);
      timers.current.forEach(clearTimeout);
    };
  }, [reduceMotion, startExit]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="mz-entrance"
          className="entrance-overlay fixed inset-0 z-[70] overflow-hidden"
          style={{ backgroundColor: '#0a0a0a' }}
          aria-hidden="true"
          initial={{ y: 0 }}
          animate={{ y: exiting ? '-100%' : 0 }}
          transition={{ duration: 0.75, ease: EASE }}
        >
          {/* Skip target (keyboard reachable) */}
          <button
            type="button"
            aria-label="Skip intro"
            onClick={startExit}
            className="absolute inset-0 w-full h-full cursor-default"
            style={{ background: 'transparent', border: 0 }}
          />

          {/* Architectural grid - draws in, then recedes */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {GRID_V.map((x, i) => (
              <motion.line
                key={`v${x}`}
                x1={x} y1="0" x2={x} y2="100"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1, opacity: exiting ? 0 : [1, 1, 0.25] }}
                transition={{
                  pathLength: { duration: 0.55, delay: i * 0.05, ease: EASE },
                  opacity: { duration: 1.6, times: [0, 0.75, 1], delay: 0.4 },
                }}
              />
            ))}
            {GRID_H.map((y, i) => (
              <motion.line
                key={`h${y}`}
                x1="0" y1={y} x2="100" y2={y}
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1, opacity: exiting ? 0 : [1, 1, 0.25] }}
                transition={{
                  pathLength: { duration: 0.55, delay: 0.15 + i * 0.06, ease: EASE },
                  opacity: { duration: 1.6, times: [0, 0.75, 1], delay: 0.4 },
                }}
              />
            ))}
          </svg>

          {/* Center lockup: triangle -> MZ */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              className="relative w-[min(60vw,260px)] h-[min(60vw,260px)]"
              animate={exiting ? { scale: 0.82, opacity: 0.9 } : { scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              {/* Triangle stage */}
              <motion.svg
                viewBox="0 0 100 100"
                className="absolute inset-0 w-full h-full overflow-visible"
                fill="none"
                animate={{
                  opacity: exiting ? 0 : [1, 1, 0],
                  scale: exiting ? 1.1 : [1, 1, 1.12],
                  filter: exiting ? 'blur(6px)' : ['blur(0px)', 'blur(0px)', 'blur(5px)'],
                }}
                transition={
                  exiting
                    ? { duration: 0.3 }
                    : { duration: 2.05, times: [0, 0.83, 1], ease: 'easeInOut' }
                }
              >
                <defs>
                  <linearGradient id="mzTriGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#B63E96" />
                    <stop offset="100%" stopColor="#58E6D9" />
                  </linearGradient>
                </defs>

                {/* Wireframe pyramid traces itself */}
                {[TRI_OUTER, TRI_INNER, ...TRI_STRUTS].map((d, i) => (
                  <motion.path
                    key={d}
                    d={d}
                    stroke="url(#mzTriGrad)"
                    strokeWidth={i === 0 ? 1.6 : 0.9}
                    strokeLinejoin="miter"
                    initial={{ pathLength: 0, opacity: 1 }}
                    animate={{ pathLength: 1, opacity: [1, 1, 0.15] }}
                    transition={{
                      pathLength: { duration: i === 0 ? 0.7 : 0.45, delay: 0.4 + i * 0.12, ease: EASE },
                      opacity: { duration: 0.45, delay: 1.35, times: [0, 0.4, 1] },
                    }}
                  />
                ))}

                {/* Solid fill - the Vercel mark moment */}
                <motion.path
                  d={TRI_OUTER}
                  fill="#ffffff"
                  initial={{ fillOpacity: 0 }}
                  animate={{ fillOpacity: [0, 0.95, 0.95] }}
                  transition={{ duration: 0.75, delay: 1.3, times: [0, 0.55, 1], ease: EASE }}
                />
              </motion.svg>

              {/* MZ mark crossfades in over the dissolving triangle */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.88, filter: 'blur(8px)' }}
                animate={
                  exiting
                    ? { opacity: 0, scale: 0.8, filter: 'blur(2px)' }
                    : { opacity: 1, scale: 1, filter: 'blur(0px)' }
                }
                transition={
                  exiting
                    ? { duration: 0.45, ease: EASE }
                    : { duration: 0.55, delay: 1.75, ease: EASE }
                }
              >
                <span className="text-6xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-primaryDark bg-clip-text text-transparent select-none">
                  MZ
                </span>
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom hint, video-style understatement */}
          <motion.p
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.4em] uppercase text-white/30 select-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: exiting ? 0 : 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            Muhammad Zain
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
