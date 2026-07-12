import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import { useAppReady } from '../hooks/useAppReady';
import SectionHeading from '../components/SectionHeading';
import { skillGroups } from '../data/skills';

/** Tech stack as an animated grid of category cards. */
export default function Skills() {
  const ready = useAppReady();
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useGSAP(
    () => {
      if (!ready) return;
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // fromTo + immediateRender:false: the hidden start state is applied
        // only when the tween actually plays, so if the trigger ever fails to
        // fire (e.g. after a pin refresh) the cards stay visible, never stuck
        // blank. This section sits below the pinned gallery, which is exactly
        // where a plain .from() reveal gets reset and left invisible.
        gsap.fromTo(
          gridRef.current.children,
          { y: 56, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.08,
            ease: 'power3.out',
            immediateRender: false,
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    },
    { scope: sectionRef, dependencies: [ready], revertOnUpdate: true }
  );

  return (
    <section id="skills" ref={sectionRef} className="relative py-28 md:py-40">
      {/* Ambient background blob */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-deep/20 blur-[140px]"
        aria-hidden="true"
      />

      <div className="container-x">
        <SectionHeading index="04" eyebrow="Tech Stack" title="Tools of the trade." />

        <div ref={gridRef} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <div
              key={group.title}
              className="group rounded-3xl border border-white/8 bg-white/[0.02] p-7 transition-all duration-500 ease-out-expo hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-glow md:p-8"
            >
              <h3 className="font-display text-xl font-medium text-white md:text-2xl">
                {group.title}
              </h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="chip transition-colors duration-300 group-hover:border-accent/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
