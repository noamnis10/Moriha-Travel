import logoIcon from '../assets/logo-icon.svg';
import { ABOUT_IMAGE } from '../lib/media';
import { useReveal } from '../hooks/useReveal';

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
          <div className="relative w-full max-w-sm">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] shadow-lg">
              <img
                src={ABOUT_IMAGE}
                alt="פגישת ייעוץ אישית עם צוות Moriah Travel"
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-teal-950/15" />
            </div>
            <div className="absolute -bottom-6 -start-6 flex h-20 w-20 items-center justify-center rounded-full border border-border bg-paper shadow-lg">
              <img src={logoIcon} alt="" className="w-1/2" />
            </div>
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-teal-700">אודות מוריה טראבל</p>
          <h2 className="text-3xl font-semibold text-ink sm:text-4xl">נסיעות שנבנות סביבכם, לא סביב חבילה מוכנה</h2>
          <p className="mt-5 max-w-2xl text-ink-soft">
            ב-Moriah Travel אנחנו מאמינים שכל טיול צריך להתאים לסיפור שלכם — לא להפך. אנחנו בונים מסלולים
            אישיים, בוחרים בקפידה בתי מלון ויעדים, ומלווים אתכם משלב החלום ועד הנחיתה בחזרה הביתה.
            בלי הפתעות, בלי אותיות קטנות — רק שירות אישי ואמין.
          </p>

          <div className="mt-8 flex flex-wrap gap-10">
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col">
                <span className="font-heading text-3xl font-bold text-teal-800">{s.num}</span>
                <span className="text-sm text-ink-soft">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
