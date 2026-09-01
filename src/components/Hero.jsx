import { waLink } from '../lib/whatsapp';
import { HERO_VIDEO } from '../lib/media';
import PackageSearch from './PackageSearch';

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-20 text-white">
      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-teal-950 via-teal-900 to-teal-700" />
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        className="absolute inset-0 -z-10 hidden h-full w-full object-cover motion-safe:block"
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-teal-950/80 via-teal-950/45 to-teal-950/55" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.14),transparent_45%),radial-gradient(circle_at_85%_75%,rgba(0,0,0,0.25),transparent_55%)]" />

      <div className="mx-auto w-full max-w-6xl px-6 py-16">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.14em] text-teal-100">
          סוכנות נסיעות בוטיק • ישראל
        </p>
        <h1 className="max-w-[14ch] text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl">
          הטיול המושלם
          <br />
          מתחיל <span className="text-gold-soft">כאן</span>
        </h1>
        <p className="mt-6 max-w-[46ch] text-lg text-teal-50/90">
          חבילות נופש מותאמות אישית, יעדים בלעדיים ומחירים הוגנים — עם ליווי צמוד מרגע ההזמנה ועד החזרה הביתה.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="#pricing"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-white px-8 text-sm font-semibold text-teal-950 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            לחבילות שלנו
          </a>
          <a
            href={waLink('שלום, אשמח לשיחת ייעוץ אישית לגבי טיול')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-white/70 bg-white/5 px-8 text-sm font-semibold text-white transition hover:bg-white/15"
          >
            שיחת ייעוץ בוואטסאפ
          </a>
        </div>

        <PackageSearch className="mt-12" />
      </div>
    </section>
  );
}
