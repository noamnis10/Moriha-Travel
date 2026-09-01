import { useEffect, useRef } from 'react';
import { waLink } from '../lib/whatsapp';
import { gsap, ScrollTrigger, EASE } from '../lib/motion';
import PackageSearch from './PackageSearch';

export default function Hero() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const subRef = useRef(null);
  const ctasRef = useRef(null);
  const imageRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    const targets = [eyebrowRef.current, headingRef.current, subRef.current, ctasRef.current, imageRef.current, searchRef.current].filter(
      Boolean
    );
    if (!targets.length) return undefined;

    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.set(targets, { autoAlpha: 0, y: 28 });
      gsap.to(targets, {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        ease: EASE,
        stagger: 0.12,
        delay: 0.15,
      });
    });

    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set(targets, { autoAlpha: 1, y: 0 });
    });

    // Subtle photo parallax inside its own frame on scroll — desktop only
    // (the client asked for a faster/simpler mobile experience). The image
    // is oversized (120% height) so this drift never reveals an edge.
    mm.add('(prefers-reduced-motion: no-preference) and (min-width: 768px)', () => {
      gsap.fromTo(
        bgRef.current,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true },
        }
      );
    });

    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === sectionRef.current) trigger.kill();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} id="home" className="relative scroll-mt-24 overflow-hidden bg-teal-950 pb-16 pt-24 text-white">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:min-h-[calc(100dvh-6rem)] lg:grid-cols-[1.05fr_1fr]">
        <div>
          <p ref={eyebrowRef} className="mb-4 text-sm font-bold uppercase tracking-[0.14em] text-teal-100">
            סוכנות נסיעות בוטיק • ישראל
          </p>
          <h1
            ref={headingRef}
            className="heading-gradient max-w-[560px] text-balance text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl"
          >
            הטיול המושלם
            <br />
            מתחיל כאן
          </h1>
          <p ref={subRef} className="mt-6 max-w-[480px] text-lg text-teal-50/90">
            חבילות נופש מותאמות אישית ויעדים בלעדיים, עם ליווי צמוד מרגע ההזמנה ועד החזרה הביתה.
          </p>

          <div ref={ctasRef} className="mt-8 flex flex-wrap items-center gap-6">
            <a
              href={waLink('שלום, אשמח לשיחת ייעוץ אישית לגבי טיול')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-white px-8 text-base font-semibold text-teal-950 transition-[color,background-color,border-color,transform,box-shadow] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-teal-950 active:translate-y-0 active:scale-[0.98]"
            >
              שיחת ייעוץ בוואטסאפ
            </a>
            <a
              href="#pricing"
              className="inline-flex min-h-11 items-center gap-2 text-base font-semibold text-white underline decoration-white/40 underline-offset-4 transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:decoration-white"
            >
              לצפייה בחבילות
              <span aria-hidden="true">←</span>
            </a>
          </div>
        </div>

        <div ref={imageRef} className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-white/10">
            <img
              ref={bgRef}
              src="/media/hero-santorini.jpg"
              alt="שקיעה על מצוקי סנטוריני"
              className="absolute inset-x-0 -top-[10%] h-[120%] w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-5 -start-5 flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 bg-teal-950 shadow-lg">
            <span className="font-heading text-lg font-bold text-gold">MT</span>
          </div>
        </div>
      </div>

      <div ref={searchRef} className="mx-auto mt-12 w-full max-w-6xl px-6">
        <PackageSearch />
      </div>
    </section>
  );
}
