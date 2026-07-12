import { useRef } from 'react';
import Lottie from 'lottie-react';
import { gsap, useGSAP } from '../lib/gsap';
import { useAppReady } from '../hooks/useAppReady';
import SectionHeading from '../components/SectionHeading';
import { hobbies } from '../data/hobbies';

/**
 * Beyond-the-code panel. Desktop: the section pins and each hobby crossfades
 * into the next as you scroll, driven by a single scrubbed timeline (same
 * pin/scrub recipe as Projects.jsx, but stacked panels instead of a
 * horizontal track). Mobile / reduced-motion: a plain vertical stack.
 */
export default function Hobbies() {
  const ready = useAppReady();
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const dotsRef = useRef(null);

  useGSAP(
    () => {
      if (!ready) return;
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const panels = gsap.utils.toArray('[data-hobby-panel]', stageRef.current);
        const texts = gsap.utils.toArray('[data-hobby-text]', stageRef.current);
        const dots = gsap.utils.toArray('[data-hobby-dot]', dotsRef.current);

        gsap.set(panels.slice(1), { opacity: 0, scale: 1.06 });
        gsap.set(texts.slice(1), { opacity: 0, y: 24 });
        gsap.set(dots.slice(1), { opacity: 0.35, scale: 1 });
        gsap.set(dots[0], { opacity: 1, scale: 1.3 });

        const steps = hobbies.length - 1;

        gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: () => `+=${steps * 700}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        }).add((() => {
          const tl = gsap.timeline();
          hobbies.forEach((_, i) => {
            if (i === 0) return;
            const at = i - 1;
            tl.to(panels[i - 1], { opacity: 0, scale: 0.94, duration: 1, ease: 'power1.inOut' }, at)
              .to(texts[i - 1], { opacity: 0, y: -24, duration: 0.8, ease: 'power1.inOut' }, at)
              .fromTo(
                panels[i],
                { opacity: 0, scale: 1.06 },
                { opacity: 1, scale: 1, duration: 1, ease: 'power1.inOut' },
                at
              )
              .fromTo(
                texts[i],
                { opacity: 0, y: 24 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power1.inOut' },
                at + 0.15
              )
              .to(dots[i - 1], { opacity: 0.35, scale: 1, duration: 0.4 }, at)
              .to(dots[i], { opacity: 1, scale: 1.3, duration: 0.4 }, at);
          });
          return tl;
        })());
      });

      mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
        stageRef.current.querySelectorAll('[data-hobby-card]').forEach((card) => {
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
    <section id="hobbies" ref={sectionRef} className="relative overflow-hidden py-28 md:py-0">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[55vmin] w-[55vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-deep/20 blur-[140px]"
        aria-hidden="true"
      />

      <div className="container-x flex flex-col justify-center md:min-h-screen md:py-24">
        <SectionHeading index="05" eyebrow="Beyond Code" title="What I do when I log off." />

        {/* Desktop: pinned crossfade stage */}
        <div ref={stageRef} className="hidden lg:grid lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="relative aspect-[10/7] w-full max-w-lg">
            {hobbies.map((hobby) => (
              <div
                key={hobby.id}
                data-hobby-panel
                className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-[2rem] border border-white/8 bg-white/[0.02]"
              >
                {hobby.lottie ? (
                  <Lottie animationData={hobby.lottie} loop autoplay className="h-full w-full" />
                ) : (
                  <span className="font-display text-8xl text-white/15" aria-hidden="true">
                    {hobby.icon}
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="relative">
            <div className="relative h-48">
              {hobbies.map((hobby) => (
                <div key={hobby.id} data-hobby-text className="absolute inset-0 flex flex-col justify-center">
                  <span className="eyebrow mb-4">
                    <span className="flex h-5 w-5 items-center justify-center text-accent-soft" aria-hidden="true">
                      {hobby.icon}
                    </span>
                    Hobby
                  </span>
                  <h3 className="font-display text-4xl font-medium text-white md:text-5xl">{hobby.title}</h3>
                  <p className="mt-4 max-w-md leading-relaxed text-zinc-400">{hobby.blurb}</p>
                </div>
              ))}
            </div>

            <div ref={dotsRef} className="mt-8 flex items-center gap-3">
              {hobbies.map((hobby) => (
                <span
                  key={hobby.id}
                  data-hobby-dot
                  className="h-2.5 w-2.5 rounded-full bg-accent"
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile / reduced-motion: vertical stack */}
        <div className="grid gap-6 sm:grid-cols-2 lg:hidden">
          {hobbies.map((hobby) => (
            <div
              key={hobby.id}
              data-hobby-card
              className="rounded-3xl border border-white/8 bg-white/[0.02] p-7"
            >
              <div className="mb-5 flex h-32 items-center justify-center overflow-hidden rounded-2xl bg-white/[0.03]">
                {hobby.lottie ? (
                  <Lottie animationData={hobby.lottie} loop autoplay className="h-full w-full" />
                ) : (
                  <span className="font-display text-5xl text-white/15" aria-hidden="true">
                    {hobby.icon}
                  </span>
                )}
              </div>
              <h3 className="font-display text-2xl font-medium text-white">{hobby.title}</h3>
              <p className="mt-2 leading-relaxed text-zinc-400">{hobby.blurb}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
