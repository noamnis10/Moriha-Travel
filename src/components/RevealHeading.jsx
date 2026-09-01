import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, EASE } from '../lib/motion';

/**
 * Word-by-word scroll reveal for section headings: each word is masked
 * behind overflow-hidden and slides up into place, staggered. Fires once
 * per heading (not scrubbed/reversible) — matches the "state indication /
 * delight" purpose for a heading a visitor scrolls past a single time.
 */
export default function RevealHeading({ as: Tag = 'h2', className = '', children }) {
  const containerRef = useRef(null);
  const wordRefs = useRef([]);
  wordRefs.current = [];

  const addWordRef = (el) => {
    if (el) wordRefs.current.push(el);
  };

  useEffect(() => {
    const container = containerRef.current;
    const words = wordRefs.current;
    if (!container || !words.length) return undefined;

    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        words,
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 0.7,
          ease: EASE,
          stagger: 0.05,
          scrollTrigger: { trigger: container, start: 'top 85%', once: true },
        }
      );
    });

    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set(words, { yPercent: 0 });
    });

    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === container) trigger.kill();
      });
    };
  }, []);

  const words = typeof children === 'string' ? children.split(' ') : [children];

  return (
    <Tag ref={containerRef} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <span ref={addWordRef} className="inline-block will-change-transform">
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </span>
        </span>
      ))}
    </Tag>
  );
}
