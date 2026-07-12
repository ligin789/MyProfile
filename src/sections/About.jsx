import { useRef } from 'react';
import { gsap, SplitText, useGSAP } from '../lib/gsap';
import { useAppReady } from '../hooks/useAppReady';
import SectionHeading from '../components/SectionHeading';
import { site } from '../data/site';
import { marqueeSkills } from '../data/skills';

const stats = [
  { value: '4+', label: 'Years of experience' },
  { value: '30%', label: 'Dev time cut with reusable UI' },
  { value: '3+', label: 'High-impact POCs delivered' },
  { value: '★', label: '“Best Performer” award, TCS' },
];

function MarqueeRow({ reverse = false }) {
  // Content duplicated once so the -50% translate loops seamlessly.
  const items = [...marqueeSkills, ...marqueeSkills];
  return (
    <div className="overflow-hidden" aria-hidden="true">
      <div className={`marquee-track gap-10 py-3 md:gap-14 ${reverse ? 'reverse' : ''}`}>
        {items.map((skill, i) => (
          <span
            key={`${skill}-${i}`}
            className="flex shrink-0 items-center gap-10 font-display text-3xl font-medium text-white/10 md:gap-14 md:text-5xl"
          >
            {skill}
            <span className="text-accent/50">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function About() {
  const ready = useAppReady();
  const sectionRef = useRef(null);
  const bioRef = useRef(null);
  const statsRef = useRef(null);

  useGSAP(
    () => {
      if (!ready) return;
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Word-by-word bio reveal, scrubbed to scroll position.
        const split = new SplitText(bioRef.current, { type: 'words' });
        gsap.fromTo(
          split.words,
          { opacity: 0.12 },
          {
            opacity: 1,
            ease: 'none',
            stagger: 0.06,
            scrollTrigger: {
              trigger: bioRef.current,
              start: 'top 75%',
              end: 'bottom 45%',
              scrub: true,
            },
          }
        );

        gsap.from(statsRef.current.children, {
          y: 36,
          opacity: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: statsRef.current, start: 'top 85%', once: true },
        });

        return () => split.revert();
      });
    },
    { scope: sectionRef, dependencies: [ready], revertOnUpdate: true }
  );

  return (
    <section id="about" ref={sectionRef} className="relative py-28 md:py-40">
      <div className="container-x">
        <SectionHeading index="01" eyebrow="About" title="Craft first, pixels always." />

        <div className="grid gap-16 lg:grid-cols-12">
          <p
            ref={bioRef}
            className="font-display text-2xl font-normal leading-snug text-white md:text-3xl lg:col-span-8 lg:text-4xl"
          >
            {site.bio}
          </p>

          <div ref={statsRef} className="grid grid-cols-2 gap-x-6 gap-y-10 self-start lg:col-span-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-4xl font-medium text-accent-soft md:text-5xl">{stat.value}</p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Skill marquee — full bleed */}
      <div className="mt-24 -rotate-1 border-y border-white/5 md:mt-32">
        <MarqueeRow />
        <MarqueeRow reverse />
      </div>
    </section>
  );
}
