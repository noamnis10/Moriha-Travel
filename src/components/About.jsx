import { Link } from 'react-router-dom';
import logoIcon from '../assets/logo-icon.svg';
import { ABOUT_IMAGE } from '../lib/media';
import { useReveal } from '../hooks/useReveal';
import RevealHeading from './RevealHeading';

const STATS = [
  { num: '10+', label: 'שנות ניסיון' },
  { num: '1,000+', label: 'נוסעים מרוצים' },
  { num: '24/7', label: 'זמינות וליווי' },
];

export default function About() {
  const reveal = useReveal();

  return (
    <section id="about" className="scroll-mt-24 bg-paper py-24">
      <div ref={reveal.ref} className={`mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[0.8fr_1.2fr] ${reveal.className}`}>
        <div className="order-first flex justify-center lg:order-none">
          <div className="group relative w-full max-w-sm transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1.5">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] shadow-lg transition-shadow duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:shadow-xl">
              <img
                src={ABOUT_IMAGE}
                alt="פגישת ייעוץ אישית עם צוות Moriah Travel"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.06]"
              />
              <div className="pointer-events-none absolute inset-0 bg-teal-950/15" />
            </div>
            <div className="absolute -bottom-6 -start-6 flex h-20 w-20 items-center justify-center rounded-full border border-border bg-paper shadow-lg">
              <img src={logoIcon} alt="" className="w-1/2" />
            </div>
          </div>
        </div>

        <div>
          <RevealHeading className="text-3xl font-semibold text-ink sm:text-4xl">נסיעות שנבנות סביבכם, לא סביב חבילה מוכנה</RevealHeading>
          <p className="mt-5 max-w-2xl text-ink-soft">
            ב-Moriah Travel אנחנו מאמינים שכל טיול צריך להתאים לסיפור שלכם, לא להפך. אנחנו בונים מסלולים
            אישיים, בוחרים בקפידה בתי מלון ויעדים, ומלווים אתכם משלב החלום ועד הנחיתה בחזרה הביתה.
            בלי הפתעות, בלי אותיות קטנות, רק שירות אישי ואמין.
          </p>

          <div className="mt-8 flex flex-wrap gap-10">
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col">
                <span className="font-heading text-3xl font-bold text-teal-800">{s.num}</span>
                <span className="text-sm text-ink-soft">{s.label}</span>
              </div>
            ))}
          </div>

          <Link to="/about" className="mt-8 inline-flex items-center gap-2 text-base font-semibold text-teal-700 hover:underline">
            קראו עוד עלינו
            <span aria-hidden="true">←</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
