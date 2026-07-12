import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import { useAppReady } from '../hooks/useAppReady';
import SectionHeading from '../components/SectionHeading';
import { experience, education } from '../data/experience';

function TimelineItem({ children }) {
  return (
    <li data-titem className="relative pl-10 md:pl-16">
      <span
        className="absolute left-0 top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-ink md:h-[15px] md:w-[15px]"
        aria-hidden="true"
      />
      {children}
    </li>
  );
}

/** Vertical timeline; the accent line draws itself as you scroll (scrubbed). */
export default function Experience() {
  const ready = useAppReady();
  const sectionRef = useRef(null);
  const listRef = useRef(null);
  const lineRef = useRef(null);

  useGSAP(
    () => {
      if (!ready) return;
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: listRef.current,
              start: 'top 70%',
              end: 'bottom 60%',
              scrub: true,
            },
          }
        );

        listRef.current.querySelectorAll('[data-titem]').forEach((item) => {
          gsap.from(item, {
            y: 48,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 82%', once: true },
          });
        });
      });
    },
    { scope: sectionRef, dependencies: [ready], revertOnUpdate: true }
  );

  return (
    <section id="experience" ref={sectionRef} className="relative py-28 md:py-40">
      <div className="container-x">
        <SectionHeading index="02" eyebrow="Experience" title="Where I've shipped." />

        <div className="relative">
          {/* Track + scrubbed progress line */}
          <div className="absolute bottom-2 left-[5px] top-2 w-px bg-white/10 md:left-[7px]" aria-hidden="true">
            <div ref={lineRef} className="h-full w-full origin-top bg-accent" style={{ transform: 'scaleY(0)' }} />
          </div>

          <ol ref={listRef} className="space-y-16 md:space-y-24">
            {experience.map((job) => (
              <TimelineItem key={job.org}>
                <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                  {job.period} · {job.location}
                </p>
                <h3 className="mt-3 font-display text-2xl font-medium text-white md:text-4xl">
                  {job.role} <span className="text-accent-soft">@ {job.org}</span>
                </h3>
                <ul className="mt-6 max-w-2xl space-y-3">
                  {job.points.map((point) => (
                    <li key={point} className="flex gap-3 leading-relaxed text-zinc-400">
                      <span className="mt-px text-accent" aria-hidden="true">—</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </TimelineItem>
            ))}

            <TimelineItem>
              <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                {education.period} · Education
              </p>
              <h3 className="mt-3 font-display text-2xl font-medium text-white md:text-4xl">
                {education.degree} <span className="text-accent-soft">@ {education.school}</span>
              </h3>
              <p className="mt-4 max-w-2xl leading-relaxed text-zinc-400">
                {education.university} — {education.score}
              </p>
            </TimelineItem>
          </ol>
        </div>
      </div>
    </section>
  );
}
