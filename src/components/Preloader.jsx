import { useEffect, useRef, useState } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import { useLenis } from './SmoothScroll';
import { site } from '../data/site';

/**
 * Full-screen preloader: progress counter → curtain wipe into the hero.
 * `onReveal` fires as the curtain starts opening (hero intro can begin),
 * `onDone` when it has fully cleared (component unmounts).
 */
export default function Preloader({ onReveal, onDone }) {
  const rootRef = useRef(null);
  const numRef = useRef(null);
  const barRef = useRef(null);
  const labelRef = useRef(null);
  const lenis = useLenis();
  const [fontsReady, setFontsReady] = useState(false);

  // Hold scrolling while the loader is up.
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

  useGSAP(
    () => {
      if (!fontsReady) return;
      const counter = { v: 0 };
      const tl = gsap.timeline();

      tl.to(counter, {
        v: 100,
        duration: 1.7,
        ease: 'power2.inOut',
        onUpdate: () => {
          const v = Math.round(counter.v);
          if (numRef.current) numRef.current.textContent = String(v).padStart(3, '0');
          if (barRef.current) barRef.current.style.transform = `scaleX(${counter.v / 100})`;
        },
      })
        .to([numRef.current, labelRef.current], {
          yPercent: -120,
          opacity: 0,
          duration: 0.5,
          ease: 'power3.in',
        })
        .to(rootRef.current, {
          clipPath: 'inset(0% 0% 100% 0%)',
          duration: 1,
          ease: 'power4.inOut',
          onStart: onReveal,
          onComplete: onDone,
        });
    },
    { scope: rootRef, dependencies: [fontsReady] }
  );

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-ink"
      style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      aria-hidden="true"
    >
      <div className="overflow-hidden">
        <span
          ref={numRef}
          className="block font-display text-7xl font-medium tabular-nums text-white md:text-8xl"
        >
          000
        </span>
      </div>
      <div className="overflow-hidden">
        <p
          ref={labelRef}
          className="mt-4 text-xs uppercase tracking-[0.35em] text-zinc-500"
        >
          {site.name} — Portfolio
        </p>
      </div>
      <div className="absolute bottom-0 left-0 h-[2px] w-full bg-white/5">
        <div
          ref={barRef}
          className="h-full w-full origin-left bg-accent"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>
    </div>
  );
}
