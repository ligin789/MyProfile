import { useRef } from 'react';
import Lottie from 'lottie-react';
import { gsap, SplitText, useGSAP } from '../lib/gsap';
import { useAppReady } from '../hooks/useAppReady';
import sparkAnim from '../assets/lottie/spark.json';

/**
 * Numbered section heading with a masked SplitText reveal and a small
 * rotating Lottie spark accent.
 */
export default function SectionHeading({
  index,
  eyebrow,
  title,
  className = '',
  titleClass = 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl',
}) {
  const rootRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const ready = useAppReady();

  useGSAP(
    () => {
      if (!ready) return;
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const split = new SplitText(titleRef.current, {
          type: 'lines,words',
          mask: 'lines',
        });
        const st = {
          trigger: rootRef.current,
          start: 'top 82%',
          once: true,
        };
        gsap.from(eyebrowRef.current, {
          opacity: 0,
          y: 18,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: st,
        });
        gsap.from(split.words, {
          yPercent: 120,
          duration: 1.1,
          stagger: 0.05,
          ease: 'power4.out',
          scrollTrigger: st,
        });
        return () => split.revert();
      });
    },
    { scope: rootRef, dependencies: [ready], revertOnUpdate: true }
  );

  return (
    <div ref={rootRef} className={`mb-14 md:mb-20 ${className}`}>
      <div ref={eyebrowRef} className="eyebrow mb-5">
        <span className="inline-block h-5 w-5" aria-hidden="true">
          <Lottie animationData={sparkAnim} loop autoplay />
        </span>
        <span>
          {index} — {eyebrow}
        </span>
      </div>
      <h2
        ref={titleRef}
        className={`font-display font-medium leading-[1.05] tracking-tight text-white ${titleClass}`}
      >
        {title}
      </h2>
    </div>
  );
}
