import { useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from '../lib/motion';

/**
 * A solid curtain that covers the viewport the instant a route changes
 * (in a layout effect, so it paints before the swapped page is ever
 * visible) and then lifts away to reveal it — the overlay-transition style
 * from the client's reference site. Desktop gets the full lift; mobile
 * gets a fast, simple version per the client's explicit "faster/simpler on
 * mobile" answer from the initial animate scoping round.
 */
export default function PageTransitionOverlay() {
  const location = useLocation();
  const overlayRef = useRef(null);

  useLayoutEffect(() => {
    const el = overlayRef.current;
    if (!el) return undefined;

    const mm = gsap.matchMedia();

    mm.add(
      {
        motionOk: '(prefers-reduced-motion: no-preference)',
        isDesktop: '(min-width: 768px)',
      },
      (context) => {
        const { motionOk, isDesktop } = context.conditions;

        if (!motionOk) {
          gsap.set(el, { autoAlpha: 1, yPercent: 0 });
          gsap.to(el, { autoAlpha: 0, duration: 0.15, ease: 'none' });
          return undefined;
        }

        gsap.set(el, { autoAlpha: 1, yPercent: 0 });
        const tween = gsap.to(el, {
          yPercent: -100,
          duration: isDesktop ? 0.6 : 0.3,
          delay: isDesktop ? 0.15 : 0.05,
          ease: 'power3.inOut',
          onComplete: () => gsap.set(el, { autoAlpha: 0 }),
        });
        return () => tween.kill();
      }
    );

    return () => mm.revert();
  }, [location.pathname]);

  return <div ref={overlayRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90] bg-teal-950 opacity-0" />;
}
