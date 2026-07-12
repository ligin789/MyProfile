import { Suspense, lazy, useRef } from 'react';
import Lottie from 'lottie-react';
import { gsap, SplitText, useGSAP } from '../lib/gsap';
import { useAppReady } from '../hooks/useAppReady';
import { useLenis } from '../components/SmoothScroll';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';
import Magnetic from '../components/Magnetic';
import { site } from '../data/site';
import scrollAnim from '../assets/lottie/scroll.json';

// Heavy 3D stack loads on demand, never blocking first paint.
const HeroScene = lazy(() => import('../components/three/HeroScene'));

export default function Hero() {
  const ready = useAppReady();
  const reduced = usePrefersReducedMotion();
  const lenis = useLenis();
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const nameRef = useRef(null);
  const eyebrowRef = useRef(null);
  const taglineRef = useRef(null);
  const ctaRef = useRef(null);
  const cueRef = useRef(null);
  const canvasWrapRef = useRef(null);

  useGSAP(
    () => {
      if (!ready || reduced) return;

      // --- Intro: masked split-text reveal, staggered ---
      const nameSplit = new SplitText(nameRef.current, { type: 'chars,words', mask: 'words' });
      const tagSplit = new SplitText(taglineRef.current, { type: 'lines', mask: 'lines' });

      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.from(eyebrowRef.current, { y: 24, opacity: 0, duration: 0.9 }, 0.1)
        .from(
          nameSplit.chars,
          { yPercent: 115, duration: 1.2, stagger: 0.022 },
          0.2
        )
        .from(tagSplit.lines, { yPercent: 110, duration: 1, stagger: 0.09 }, 0.7)
        .from(ctaRef.current.children, { y: 26, opacity: 0, duration: 0.8, stagger: 0.08 }, 0.95)
        .from(cueRef.current, { opacity: 0, duration: 1 }, 1.3)
        .from(canvasWrapRef.current, { opacity: 0, scale: 1.06, duration: 1.6, ease: 'power2.out' }, 0.3);

      // --- Depth on scroll: copy, scene and cue drift at different rates ---
      const st = {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      };
      gsap.to(contentRef.current, { yPercent: -16, opacity: 0.15, ease: 'none', scrollTrigger: st });
      gsap.to(canvasWrapRef.current, { yPercent: 12, scale: 0.94, ease: 'none', scrollTrigger: st });
      gsap.to(cueRef.current, { opacity: 0, ease: 'none', scrollTrigger: { ...st, end: '25% top' } });

      return () => {
        nameSplit.revert();
        tagSplit.revert();
      };
    },
    { scope: sectionRef, dependencies: [ready, reduced], revertOnUpdate: true }
  );

  const scrollTo = (hash) => {
    const el = document.querySelector(hash);
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { duration: 1.5 });
    else el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} className="relative flex min-h-[100svh] items-center overflow-hidden" aria-label="Intro">
      {/* 3D centerpiece / reduced-motion fallback */}
      <div ref={canvasWrapRef} className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        {reduced ? (
          <div className="absolute right-[-10%] top-1/2 h-[70vmin] w-[70vmin] -translate-y-1/2 rounded-full bg-accent-deep/30 blur-[120px]" />
        ) : (
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        )}
      </div>

      {/* Scrim so copy stays legible over the scene */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_25%_50%,rgba(10,10,11,0.85),transparent_60%)]"
        aria-hidden="true"
      />

      <div ref={contentRef} className="container-x relative z-10 pt-24">
        <p ref={eyebrowRef} className="eyebrow mb-8">
          <span className="inline-block h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
          {site.role} · {site.location.split(',')[0]}
        </p>

        <h1
          ref={nameRef}
          className="font-display text-[clamp(3.2rem,12vw,10.5rem)] font-semibold uppercase leading-[0.92] tracking-tight text-white"
        >
          Ligin <span className="text-stroke">Abraham</span>
        </h1>

        <p ref={taglineRef} className="mt-8 max-w-xl text-balance text-base leading-relaxed text-mist md:text-lg">
          {site.tagline}
        </p>

        <div ref={ctaRef} className="mt-12 flex flex-wrap items-center gap-4">
          <Magnetic>
            <button type="button" data-cursor="link" onClick={() => scrollTo('#work')} className="btn btn-solid">
              View Work
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M7 17 17 7m0 0H8m9 0v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </Magnetic>
          <Magnetic>
            <a href={site.resume} download="Ligin-Abraham-Resume.pdf" data-cursor="link" className="btn btn-ghost">
              Download Resume
            </a>
          </Magnetic>
        </div>
      </div>

      {/* Scroll cue */}
      <div ref={cueRef} className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center" aria-hidden="true">
        <div className="mx-auto h-14 w-9">
          {reduced ? (
            <div className="mx-auto h-10 w-6 rounded-full border border-white/30" />
          ) : (
            <Lottie animationData={scrollAnim} loop autoplay />
          )}
        </div>
        <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500">Scroll</span>
      </div>
    </section>
  );
}
