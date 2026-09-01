import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../lib/motion';

const LINE_1 = 'כל טיול מתחיל בשיחה אחת, לא בטופס ארוך';
const LINE_2 = 'אנחנו בונים את המסלול סביבכם, ומלווים אתכם עד הרגע שאתם חוזרים הביתה';

export default function TaglineReveal() {
  const sectionRef = useRef(null);
  const wordsRef = useRef([]);
  wordsRef.current = [];

  const addWordRef = (el) => {
    if (el) wordsRef.current.push(el);
  };

  useEffect(() => {
    const section = sectionRef.current;
    const words = wordsRef.current;
    if (!section || !words.length) return undefined;

    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.set(words, { opacity: 0.3 });
      gsap.to(words, {
        opacity: 1,
        stagger: 0.06,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          end: 'bottom 55%',
          scrub: 0.5,
        },
      });
    });

    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set(words, { opacity: 1 });
    });

    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === section) trigger.kill();
      });
    };
  }, []);

  const line1Words = LINE_1.split(' ');
  const line2Words = LINE_2.split(' ');
  const words = [...line1Words, ...line2Words];

  return (
    <section ref={sectionRef} className="bg-paper py-24">
      <div className="mx-auto max-w-[680px] px-6 text-center">
        <p className="text-balance font-heading text-4xl font-semibold leading-snug text-ink sm:text-5xl">
          {words.map((word, i) => (
            <span key={i}>
              <span ref={addWordRef}>{word}</span>
              {i === line1Words.length - 1 ? <br /> : ' '}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
