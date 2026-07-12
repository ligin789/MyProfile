import { useEffect, useMemo, useRef, useState } from 'react';
import Lottie from 'lottie-react';
import { gsap, useGSAP } from '../lib/gsap';
import { useLenis } from './SmoothScroll';
import { site } from '../data/site';
import developerAnim from '../assets/lottie/developer.json';

// One loop of the "Developer 01" Lottie is 240 frames @ 30fps = 8s.
// That is too long to hold the user before the site paints, so the loader
// waits for MIN_MS (fonts + a smooth partial playthrough) and then dismisses
// on the next loop boundary — Lottie stays in-frame, no visual jump.
const MIN_MS = 2200;

/**
 * Full-screen preloader: a looping Lottie animation while fonts settle,
 * then a curtain wipe into the hero. `onReveal` fires as the curtain starts
 * opening (hero intro can begin); `onDone` when the loader has cleared.
 */
export default function Preloader({ onReveal, onDone }) {
  const rootRef = useRef(null);
  const stageRef = useRef(null);
  const labelRef = useRef(null);
  const lenis = useLenis();
  const [fontsReady, setFontsReady] = useState(false);
  const [minElapsed, setMinElapsed] = useState(false);
  const ready = fontsReady && minElapsed;

  // Freeze scrolling while the loader is mounted.
  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    lenis?.stop();
    return () => {
      document.documentElement.style.overflow = '';
      lenis?.start();
    };
  }, [lenis]);

  // Wait for webfonts (max 2.5s) so the hero's SplitText measures real glyphs.
  useEffect(() => {
    let alive = true;
    Promise.race([
      document.fonts?.ready ?? Promise.resolve(),
      new Promise((r) => setTimeout(r, 2500)),
    ]).then(() => alive && setFontsReady(true));
    return () => {
      alive = false;
    };
  }, []);

  // Enforce the minimum display time.
  useEffect(() => {
    const id = setTimeout(() => setMinElapsed(true), MIN_MS);
    return () => clearTimeout(id);
  }, []);

  // Play the curtain reveal exactly once, when both gates are open.
  const wipedRef = useRef(false);
  useGSAP(
    () => {
      if (!ready || wipedRef.current) return;
      wipedRef.current = true;
      const tl = gsap.timeline();
      tl.to([stageRef.current, labelRef.current], {
        opacity: 0,
        y: -24,
        duration: 0.9,
        ease: 'power3.in',
      }).to(rootRef.current, {
        clipPath: 'inset(0% 0% 100% 0%)',
        duration: 1,
        ease: 'power4.inOut',
        onStart: onReveal,
        onComplete: onDone,
      });
    },
    { scope: rootRef, dependencies: [ready] }
  );

  // Give the Lottie a stable style so its container doesn't collapse the SVG.
  const lottieStyle = useMemo(
    () => ({ width: '100%', height: '100%' }),
    []
  );

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-ink"
      style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      aria-hidden="true"
    >
      <div
        ref={stageRef}
        className="h-[min(60vw,420px)] w-[min(60vw,420px)]"
      >
        <Lottie animationData={developerAnim} loop autoplay style={lottieStyle} />
      </div>
      <p
        ref={labelRef}
        className="mt-4 text-xs uppercase tracking-[0.35em] text-zinc-500"
      >
        {site.name} — Portfolio
      </p>
    </div>
  );
}
