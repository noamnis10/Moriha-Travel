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
  const searchRef = useRef(null);

  useEffect(() => {
    const targets = [eyebrowRef.current, headingRef.current, subRef.current, ctasRef.current, searchRef.current].filter(Boolean);
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

    // Subtle background parallax on scroll — desktop only (the client asked
    // for a faster/simpler mobile experience). The photo is shown whole
    // (object-contain, not cropped), so the drift range stays small.
    mm.add('(prefers-reduced-motion: no-preference) and (min-width: 768px)', () => {
      gsap.fromTo(
        bgRef.current,
        { yPercent: -3 },
        {
          yPercent: 3,
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
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-[100dvh] scroll-mt-24 items-center overflow-hidden pt-24 text-white"
    >
      <div className="absolute inset-0 -z-20 bg-teal-950" />
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img
          ref={bgRef}
          src="/media/hero-santorini.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-contain"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-teal-950/45" />

      <div className="mx-auto w-full max-w-6xl px-6 py-16">
        <p ref={eyebrowRef} className="mb-4 text-sm font-bold uppercase tracking-[0.14em] text-teal-100">
          סוכנות נסיעות בוטיק • ישראל
        </p>
        <h1
          ref={headingRef}
          className="heading-gradient max-w-[680px] text-balance text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl"
        >
          הטיול המושלם
          <br />
          מתחיל כאן
        </h1>
        <p ref={subRef} className="mt-6 max-w-[680px] text-lg text-teal-50/90">
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

        <div ref={searchRef}>
          <PackageSearch className="mt-12" />
        </div>
      </div>
    </section>
  );
}
