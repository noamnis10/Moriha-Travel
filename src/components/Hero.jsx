import { waLink } from '../lib/whatsapp';
import PackageSearch from './PackageSearch';

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen scroll-mt-24 items-center overflow-hidden pt-24 text-white">
      <div className="absolute inset-0 -z-20 bg-teal-950" />
      <img
        src="/media/hero-santorini.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-teal-950/55" />

      <div className="mx-auto w-full max-w-6xl px-6 py-16">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.14em] text-teal-100">
          סוכנות נסיעות בוטיק • ישראל
        </p>
        <h1 className="heading-gradient max-w-[680px] text-balance text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl">
          הטיול המושלם
          <br />
          מתחיל כאן
        </h1>
        <p className="mt-6 max-w-[680px] text-lg text-teal-50/90">
          חבילות נופש מותאמות אישית, יעדים בלעדיים ומחירים הוגנים — עם ליווי צמוד מרגע ההזמנה ועד החזרה הביתה.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-6">
          <a
            href={waLink('שלום, אשמח לשיחת ייעוץ אישית לגבי טיול')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-white px-8 text-base font-semibold text-teal-950 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-teal-950 active:translate-y-0 active:scale-[0.98]"
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

        <PackageSearch className="mt-12" />
      </div>
    </section>
  );
}
