import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { useLenis } from './SmoothScroll';
import BrowserFrame from './BrowserFrame';
import PhoneFrame from './PhoneFrame';

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const EASE = [0.16, 1, 0.3, 1];

/**
 * Full-screen project detail modal. Rendered in a portal (the gallery is
 * inside a pinned/transformed container, which would break `fixed`).
 * Focus-trapped, Escape to close, background scroll locked.
 */
export default function ProjectModal({ project, onClose }) {
  const panelRef = useRef(null);
  const lenis = useLenis();

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    lenis?.stop();
    document.documentElement.style.overflow = 'hidden';

    const getFocusable = () =>
      Array.from(panelRef.current?.querySelectorAll(FOCUSABLE) ?? []);
    getFocusable()[0]?.focus();

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const els = getFocusable();
      if (!els.length) return;
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.documentElement.style.overflow = '';
      lenis?.start();
      previouslyFocused?.focus?.();
    };
  }, [lenis, onClose]);

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[150] flex items-end justify-center sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`modal-title-${project.id}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.25 } }}
      transition={{ duration: 0.35 }}
    >
      {/* Backdrop */}
      <motion.button
        type="button"
        aria-label="Close project details"
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Panel */}
      <motion.div
        ref={panelRef}
        data-lenis-prevent
        className="relative max-h-[92svh] w-full max-w-5xl overflow-y-auto rounded-t-3xl border border-white/10 bg-ink-800 shadow-2xl sm:rounded-3xl"
        initial={{ y: 80, scale: 0.97, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 60, scale: 0.98, opacity: 0, transition: { duration: 0.25, ease: 'easeIn' } }}
        transition={{ duration: 0.55, ease: EASE }}
      >
        {/* Sticky close */}
        <div className="sticky top-0 z-10 flex justify-end p-4">
          <button
            type="button"
            onClick={onClose}
            data-cursor="link"
            aria-label="Close"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-ink/80 text-zinc-300 backdrop-blur transition-colors hover:border-accent hover:text-white"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="px-6 pb-12 md:px-12 -mt-10">
          <p className="text-xs uppercase tracking-[0.28em] text-accent-soft">
            {project.category} · {project.year}
          </p>
          <h3
            id={`modal-title-${project.id}`}
            className="mt-3 font-display text-4xl font-medium tracking-tight text-white md:text-6xl"
          >
            {project.title}
          </h3>

          {/* Hero image: phone frame for mobile apps, browser chrome for web */}
          {project.platform === 'mobile' ? (
            <div className="mt-8 flex justify-center rounded-2xl border border-white/10 bg-[radial-gradient(120%_90%_at_50%_-10%,rgba(124,92,255,0.18),transparent_60%)] py-8">
              <PhoneFrame className="w-[240px] max-w-[62vw]">
                <img
                  src={project.images[0] ?? project.thumbnail}
                  alt={`${project.title} screenshot`}
                  width="360"
                  height="780"
                  className="w-full object-cover"
                />
              </PhoneFrame>
            </div>
          ) : (
            <BrowserFrame url={project.liveUrl} className="mt-8">
              <img
                src={project.images[0] ?? project.thumbnail}
                alt={`${project.title} screenshot`}
                width="1200"
                height="900"
                className="w-full object-cover"
              />
            </BrowserFrame>
          )}

          {/* Meta grid */}
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            <div className="md:col-span-2">
              <h4 className="text-xs uppercase tracking-[0.28em] text-zinc-500">Overview</h4>
              <p className="mt-4 leading-relaxed text-zinc-300">{project.fullDesc}</p>

              <h4 className="mt-10 text-xs uppercase tracking-[0.28em] text-zinc-500">Key Features</h4>
              <ul className="mt-4 space-y-3">
                {project.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-zinc-300">
                    <span className="mt-1 text-accent" aria-hidden="true">✦</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-8">
              <div>
                <h4 className="text-xs uppercase tracking-[0.28em] text-zinc-500">Role</h4>
                <p className="mt-3 text-sm leading-relaxed text-zinc-300">{project.role}</p>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-[0.28em] text-zinc-500">Tech Stack</h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span key={tech} className="chip">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="link"
                    className="btn btn-solid w-full"
                  >
                    Visit Live Site
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="link"
                    className="btn btn-ghost w-full"
                  >
                    View on GitHub
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Gallery (extra screenshots) */}
          {project.images.length > 1 && (
            <div className="mt-12">
              <h4 className="text-xs uppercase tracking-[0.28em] text-zinc-500">Gallery</h4>
              {project.platform === 'mobile' ? (
                <div className="mt-4 flex flex-wrap justify-center gap-5 rounded-2xl border border-white/10 bg-white/[0.02] py-8">
                  {project.images.slice(1).map((src, i) => (
                    <PhoneFrame key={src} className="w-[190px] max-w-[42vw]">
                      <img
                        src={src}
                        alt={`${project.title} screenshot ${i + 2}`}
                        loading="lazy"
                        width="360"
                        height="780"
                        className="w-full object-cover"
                      />
                    </PhoneFrame>
                  ))}
                </div>
              ) : (
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {project.images.slice(1).map((src, i) => (
                    <img
                      key={src}
                      src={src}
                      alt={`${project.title} screenshot ${i + 2}`}
                      loading="lazy"
                      width="1200"
                      height="900"
                      className="w-full rounded-xl border border-white/10 object-cover"
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}
