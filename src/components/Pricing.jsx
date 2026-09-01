import { useEffect, useState } from 'react';
import { loadPackages } from '../lib/packages';
import { waLink } from '../lib/whatsapp';
import { useReveal } from '../hooks/useReveal';

function Stars({ count }) {
  return (
    <span className="text-gold" aria-hidden="true">
      {'★'.repeat(count)}
      <span className="text-border">{'★'.repeat(5 - count)}</span>
    </span>
  );
}

export default function Pricing() {
  const [packages, setPackages] = useState([]);
  const reveal = useReveal();

  useEffect(() => {
    setPackages(loadPackages());
  }, []);

  return (
    <section id="pricing" className="bg-paper py-24">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-teal-700">יעדים לתקופה הקרובה</p>
        <h2 className="text-3xl font-semibold text-ink sm:text-4xl">יעדים וחבילות נבחרות</h2>
        <p className="mt-4 max-w-xl text-ink-soft">
          חבילות מוכנות, במחיר שכולל טיסה ומלון — ומתעדכנות באופן שוטף. מוזמנים לפנות אלינו גם ליעד אחר שלא רשום כאן.
        </p>

        <div ref={reveal.ref} className={`mt-12 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3 ${reveal.className}`}>
          {packages.map((pkg) => (
            <article
              key={pkg.id}
              className="flex flex-col overflow-hidden rounded-3xl border border-border bg-paper shadow-sm transition hover:-translate-y-1.5 hover:shadow-lg"
            >
              <div
                className="flex h-44 items-end p-5"
                style={{ background: `linear-gradient(135deg, ${pkg.gradientFrom}, ${pkg.gradientTo})` }}
              >
                <span className="text-lg font-bold text-white drop-shadow">
                  {pkg.flag} {pkg.destination}
                </span>
              </div>

              <div className="flex flex-1 flex-col gap-3.5 p-6">
                <span className="w-fit rounded-full bg-paper-soft px-3.5 py-1.5 text-xs font-bold text-teal-700">
                  {pkg.dateFrom} – {pkg.dateTo}
                </span>

                <ul className="flex flex-col gap-2 text-sm text-ink">
                  <li>✈️ {pkg.flightInfo}</li>
                  <li>🧳 {pkg.baggage}</li>
                  <li>🏨 מלון {pkg.hotel} <Stars count={pkg.stars} /></li>
                  <li>🍳 {pkg.meal}</li>
                </ul>

                <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-4">
                  <div className="flex flex-col">
                    <span className="font-heading text-2xl font-bold text-ink">{pkg.price.toLocaleString()} ₪</span>
                    <span className="text-xs text-ink-soft">{pkg.priceNote}</span>
                  </div>
                  <a
                    href={waLink(`שלום, אשמח לפרטים והזמנה על חבילת ${pkg.destination} (${pkg.dateFrom}–${pkg.dateTo})`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center justify-center rounded-full bg-teal-900 px-5 text-sm font-semibold text-white transition hover:bg-teal-800"
                  >
                    הזמינו עכשיו
                  </a>
                </div>
              </div>
            </article>
          ))}

          <article className="flex flex-col items-center justify-center gap-3.5 rounded-3xl border border-dashed border-border bg-paper-soft p-10 text-center">
            <h3 className="font-heading text-xl font-semibold text-ink">לא מצאתם את היעד שחיפשתם?</h3>
            <p className="text-ink-soft">נשמח להתאים עבורכם חבילה אישית לכל יעד ותקציב — פשוט דברו איתנו.</p>
            <a
              href={waLink('שלום, אשמח לקבל הצעת מחיר לחבילת נופש')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-ink px-6 text-sm font-semibold text-ink transition hover:bg-ink hover:text-white"
            >
              בואו נתאים לכם טיול
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
