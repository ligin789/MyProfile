import { createContext, useContext, useEffect, useState } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '../lib/gsap';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';

const LenisContext = createContext(null);

/** Access the shared Lenis instance (null when reduced motion is on). */
export function useLenis() {
  return useContext(LenisContext);
}

/**
 * Site-wide smooth scrolling, driven by the GSAP ticker so Lenis and
 * ScrollTrigger stay perfectly in sync.
 */
export default function SmoothScroll({ children }) {
  const reduced = usePrefersReducedMotion();
  const [lenis, setLenis] = useState(null);

  useEffect(() => {
    if (reduced) return undefined;

    const instance = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    instance.on('scroll', ScrollTrigger.update);
    const raf = (time) => instance.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    setLenis(instance);

    return () => {
      gsap.ticker.remove(raf);
      instance.destroy();
      setLenis(null);
    };
  }, [reduced]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
