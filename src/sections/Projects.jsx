import { useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { gsap, useGSAP } from '../lib/gsap';
import { useAppReady } from '../hooks/useAppReady';
import SectionHeading from '../components/SectionHeading';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
import projects from '../data/projects';

/**
 * Selected work. Desktop: the section pins and the card track scrubs
 * horizontally with scroll. Mobile / reduced-motion: a vertical stack.
 * Scales to any number of projects — the scroll distance is derived from
 * the track's rendered width.
 */
export default function Projects() {
  const ready = useAppReady();
  const [active, setActive] = useState(null);
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(
    () => {
      if (!ready) return;
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const track = trackRef.current;
        const distance = () => track.scrollWidth - window.innerWidth;
        gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      });

      mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
        sectionRef.current.querySelectorAll('[data-card]').forEach((card) => {
          gsap.from(card, {
            y: 60,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%', once: true },
          });
        });
      });
    },
    { scope: sectionRef, dependencies: [ready], revertOnUpdate: true }
  );

  return (
    <section id="work" ref={sectionRef} className="relative overflow-hidden bg-ink">
      <div className="flex flex-col justify-center py-28 lg:h-screen lg:py-0">
        <div
          ref={trackRef}
          className="flex flex-col items-center gap-20 px-6 will-change-transform md:px-10 lg:flex-row lg:items-center lg:gap-[6vw] lg:px-[8vw]"
        >
          {/* Intro panel — first stop on the horizontal ride */}
          <div className="w-full max-w-[540px] shrink-0 lg:w-[30vw] lg:max-w-none">
            <SectionHeading
              index="03"
              eyebrow="Selected Work"
              title="Projects with intent."
              className="!mb-8"
              titleClass="text-4xl sm:text-5xl lg:text-6xl"
            />
            <p className="max-w-sm leading-relaxed text-zinc-400">
              A snapshot of things I've designed and shipped — click any card
              for the full story.
            </p>
            <p className="mt-8 hidden items-center gap-3 text-xs uppercase tracking-[0.3em] text-zinc-600 lg:flex">
              Keep scrolling
              <svg width="28" height="10" viewBox="0 0 28 10" fill="none" aria-hidden="true">
                <path d="M0 5h25m0 0-4-4m4 4-4 4" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </p>
          </div>

          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onOpen={() => setActive(project)}
            />
          ))}

          {/* End cap */}
          <div className="hidden shrink-0 flex-col items-start justify-center pr-[8vw] lg:flex">
            <p className="font-display text-6xl font-medium text-white/10">
              {String(projects.length).padStart(2, '0')}
            </p>
            <p className="mt-2 whitespace-nowrap text-sm text-zinc-500">projects & counting</p>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}
