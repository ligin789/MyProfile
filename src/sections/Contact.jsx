import { useRef } from 'react';
import { gsap, SplitText, useGSAP } from '../lib/gsap';
import { useAppReady } from '../hooks/useAppReady';
import { useLenis } from '../components/SmoothScroll';
import Magnetic from '../components/Magnetic';
import { site } from '../data/site';

export default function Contact() {
  const ready = useAppReady();
  const lenis = useLenis();
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const bodyRef = useRef(null);

  useGSAP(
    () => {
      if (!ready) return;
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // fromTo + immediateRender:false so these reveals can never leave the
        // headline or CTAs stuck hidden if the trigger fails to fire after the
        // pinned gallery above (see Skills.jsx for the same guard).
        const split = new SplitText(headlineRef.current, { type: 'lines,words', mask: 'lines' });
        gsap.fromTo(
          split.words,
          { yPercent: 120 },
          {
            yPercent: 0,
            duration: 1.1,
            stagger: 0.04,
            ease: 'power4.out',
            immediateRender: false,
            scrollTrigger: {
              trigger: headlineRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
        gsap.fromTo(
          bodyRef.current.children,
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.09,
            ease: 'power3.out',
            immediateRender: false,
            scrollTrigger: {
              trigger: bodyRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
        return () => split.revert();
      });
    },
    { scope: sectionRef, dependencies: [ready], revertOnUpdate: true }
  );

  const backToTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="contact" ref={sectionRef} className="relative pt-28 md:pt-44">
      <div className="container-x">
        <p className="eyebrow mb-8">
          <span className="inline-block h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
          06 — Contact
        </p>

        <h2
          ref={headlineRef}
          className="max-w-5xl font-display text-5xl font-medium leading-[1.02] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Have an idea? Let's build it <span className="text-accent-soft">together</span>.
        </h2>

        <div ref={bodyRef} className="mt-14">
          <Magnetic strength={0.2} className="block w-fit">
            <a
              href={`mailto:${site.email}`}
              data-cursor="link"
              className="link-line font-display text-2xl font-medium text-white sm:text-4xl md:text-5xl"
            >
              {site.email}
            </a>
          </Magnetic>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Magnetic>
              <a href={site.resume} download="Ligin-Abraham-Resume.pdf" data-cursor="link" className="btn btn-solid">
                Download Resume
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </Magnetic>
            <Magnetic>
              <a href={site.github} target="_blank" rel="noopener noreferrer" data-cursor="link" className="btn btn-ghost">
                GitHub
              </a>
            </Magnetic>
            <Magnetic>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" data-cursor="link" className="btn btn-ghost">
                LinkedIn
              </a>
            </Magnetic>
            <a href={`tel:${site.phone.replace(/[^+\d]/g, '')}`} data-cursor="link" className="chip !py-3">
              {site.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-24 border-t border-white/5 md:mt-32">
        <div className="container-x flex flex-col gap-4 py-8 text-sm text-zinc-500 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>{site.location}</p>
          <p className="flex items-center gap-6">
            Built with React · GSAP · Three.js
            <button
              type="button"
              onClick={backToTop}
              data-cursor="link"
              aria-label="Back to top"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-zinc-300 transition-colors hover:border-accent hover:text-white"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 20V5m0 0-6 6m6-6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </p>
        </div>
      </footer>
    </section>
  );
}
