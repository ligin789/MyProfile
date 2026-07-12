import { useEffect, useRef, useState } from 'react';
import { gsap } from '../lib/gsap';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';

/**
 * Custom cursor: a small accent dot plus a trailing ring.
 * Elements opt in to hover states with `data-cursor`:
 *   data-cursor="link" → ring grows and inverts (blend-difference)
 *   data-cursor="view" → ring becomes a "VIEW" pill (project cards)
 * Disabled on touch devices and under prefers-reduced-motion.
 */
export default function CustomCursor() {
  const reduced = usePrefersReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState(null); // null | 'link' | 'view'
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    setEnabled(finePointer && !reduced);
  }, [reduced]);

  useEffect(() => {
    if (!enabled) return undefined;
    const dot = dotRef.current;
    const ring = ringRef.current;
    document.documentElement.classList.add('has-custom-cursor');

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 });
    const dotX = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power3' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power3' });
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3' });

    let shown = false;
    const onMove = (e) => {
      if (!shown) {
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
        shown = true;
      }
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };
    const onOver = (e) => {
      const target = e.target.closest?.('[data-cursor]');
      setMode(target ? target.dataset.cursor : null);
    };
    const onLeaveWindow = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.3 });
      shown = false;
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeaveWindow);

    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.documentElement.removeEventListener('mouseleave', onLeaveWindow);
    };
  }, [enabled]);

  // Animate ring between modes.
  useEffect(() => {
    if (!enabled || !ringRef.current) return;
    const ring = ringRef.current;
    if (mode === 'view') {
      gsap.to(ring, { scale: 2.4, backgroundColor: 'rgba(124,92,255,0.9)', duration: 0.35, ease: 'power3.out' });
    } else if (mode === 'link') {
      gsap.to(ring, { scale: 1.7, backgroundColor: 'rgba(255,255,255,0.9)', duration: 0.35, ease: 'power3.out' });
    } else {
      gsap.to(ring, { scale: 1, backgroundColor: 'rgba(255,255,255,0)', duration: 0.35, ease: 'power3.out' });
    }
    gsap.to(dotRef.current, { opacity: mode ? 0 : 1, duration: 0.25 });
  }, [mode, enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[300] h-2 w-2 rounded-full bg-accent-soft"
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[299] flex h-10 w-10 items-center justify-center rounded-full border border-white/40 mix-blend-difference"
      >
        <span
          className={`text-[9px] font-semibold uppercase tracking-widest text-ink transition-opacity duration-200 ${
            mode === 'view' ? 'opacity-100' : 'opacity-0'
          }`}
        >
          View
        </span>
      </div>
    </>
  );
}
