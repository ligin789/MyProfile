import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { gsap, useGSAP } from '../lib/gsap';
import { useLenis } from './SmoothScroll';
import { useAppReady } from '../hooks/useAppReady';
import { navLinks, site } from '../data/site';

export default function Navbar() {
  const ready = useAppReady();
  const lenis = useLenis();
  const barRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const go = (hash) => {
    setMenuOpen(false);
    const el = document.querySelector(hash);
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { duration: 1.4 });
    else el.scrollIntoView({ behavior: 'smooth' });
  };

  // Slide the bar in once the curtain opens.
  useGSAP(
    () => {
      if (!ready) return;
      gsap.from(barRef.current, { y: -80, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.4 });
    },
    { dependencies: [ready] }
  );

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setScrolled(window.scrollY > 40));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Freeze page scroll behind the mobile menu.
  useEffect(() => {
    if (menuOpen) lenis?.stop();
    else lenis?.start();
  }, [menuOpen, lenis]);

  return (
    <>
      <header
        ref={barRef}
        className={`fixed inset-x-0 top-0 z-[120] transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled
            ? 'border-b border-white/5 bg-ink/70 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <nav className="container-x flex h-[72px] items-center justify-between" aria-label="Primary">
          <a
            href="#main"
            data-cursor="link"
            onClick={(e) => {
              e.preventDefault();
              if (lenis) lenis.scrollTo(0, { duration: 1.4 });
              else window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-display text-lg font-semibold tracking-tight text-white"
            aria-label="Back to top"
          >
            LA<span className="text-accent">.</span>
          </a>

          <ul className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  data-cursor="link"
                  onClick={(e) => {
                    e.preventDefault();
                    go(link.href);
                  }}
                  className="link-line text-sm text-zinc-400 transition-colors duration-300 hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href={site.resume}
              download="Ligin-Abraham-Resume.pdf"
              data-cursor="link"
              className="btn btn-ghost !px-5 !py-2.5 text-xs"
            >
              Download Resume
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              data-cursor="link"
              className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border border-white/15 lg:hidden"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              <span className={`block h-px w-4 bg-white transition-transform duration-300 ${menuOpen ? 'translate-y-[3.5px] rotate-45' : ''}`} />
              <span className={`block h-px w-4 bg-white transition-transform duration-300 ${menuOpen ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[110] flex flex-col justify-center bg-ink/95 backdrop-blur-2xl lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <ul className="container-x flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1, transition: { delay: 0.08 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      go(link.href);
                    }}
                    className="block py-2 font-display text-4xl font-medium text-white"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.4 } }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              className="container-x mt-10 text-sm text-zinc-500"
            >
              {site.email}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
