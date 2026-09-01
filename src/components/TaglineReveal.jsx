import { useEffect, useRef, useState } from 'react';

const LINE_1 = 'כל טיול מתחיל בשיחה אחת, לא בטופס ארוך';
const LINE_2 = 'אנחנו בונים את המסלול סביבכם, ומלווים אתכם עד הרגע שאתם חוזרים הביתה';

export default function TaglineReveal() {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      setActive(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const line1Words = LINE_1.split(' ');
  const line2Words = LINE_2.split(' ');
  const words = [...line1Words, ...line2Words];

  return (
    <section className="bg-paper py-24">
      <div ref={ref} className="mx-auto max-w-[680px] px-6 text-center">
        <p className="text-balance font-heading text-4xl font-semibold leading-snug text-ink sm:text-5xl">
          {words.map((word, i) => (
            <span key={i}>
              <span className={active ? 'word-active' : 'word-muted'} style={{ transitionDelay: `${i * 60}ms` }}>
                {word}
              </span>
              {i === line1Words.length - 1 ? <br /> : ' '}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
