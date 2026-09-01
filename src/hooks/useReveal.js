import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, EASE } from '../lib/motion';

/**
 * Scroll-triggered fade-up-and-unblur, wired through GSAP + ScrollTrigger.
 * Keeps the old {ref, className} shape so call sites don't need to change,
 * but className is now a no-op left in place for markup readability.
 */
export function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 64, filter: 'blur(6px)' },
        {
          autoAlpha: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.8,
          ease: EASE,
          scrollTrigger: { trigger: el, start: 'top 85%' },
        }
      );
    });

    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set(el, { autoAlpha: 1, y: 0, filter: 'blur(0px)' });
    });

    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === el) trigger.kill();
      });
    };
  }, []);

  return { ref, className: 'reveal-gsap' };
}
