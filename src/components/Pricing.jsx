import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, X } from '@phosphor-icons/react';
import { loadPackages } from '../lib/packages';
import { waLink } from '../lib/whatsapp';
import { useReveal } from '../hooks/useReveal';
import { usePackageSearch } from '../context/PackageSearchContext';
import { Button } from './ui/button';

function Stars({ count }) {
  return (
    <span className="text-gold-text" aria-hidden="true">
      {'★'.repeat(count)}
      <span className="text-border">{'★'.repeat(5 - count)}</span>
    </span>
  );
}

export default function Pricing() {
  const [packages, setPackages] = useState([]);
  const { query, setQuery } = usePackageSearch();
  const reveal = useReveal();

  useEffect(() => {
    setPackages(loadPackages());
  }, []);

  const cheapestId = useMemo(
    () => (packages.length ? packages.reduce((min, p) => (p.price < min.price ? p : min), packages[0]).id : null),
    [packages]
  );

  const filtered = useMemo(() => {
    if (!query?.destination) return packages;
    const needle = query.destination.trim().toLowerCase();
    if (!needle) return packages;
    return packages.filter((p) => p.destination.toLowerCase().includes(needle));
  }, [packages, query]);

  return (
    <section id="pricing" className="scroll-mt-24 bg-paper py-24">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-teal-700">יעדים לתקופה הקרובה</p>
        <h2 className="text-3xl font-semibold text-ink sm:text-4xl">יעדים וחבילות נבחרות</h2>
        <p className="mt-4 max-w-xl text-ink-soft">
          חבילות מוכנות, במחיר שכולל טיסה ומלון — ומתעדכנות באופן שוטף. מוזמנים לפנות אלינו גם ליעד אחר שלא רשום כאן.
        </p>

        {query?.destination && (
          <div className="mt-4 flex w-fit items-center gap-3 rounded-full bg-paper-soft px-4 py-2 text-sm text-ink-soft">
            <span>מציג תוצאות עבור "{query.destination}"</span>
            <button onClick={() => setQuery(null)} className="flex items-center gap-1 font-semibold text-teal-700 hover:underline">
              <X className="h-4 w-4" /> ניקוי סינון
            </button>
          </div>
        )}

        <div ref={reveal.ref} className={`mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 ${reveal.className}`}>
          {filtered.map((pkg) => {
            const isRecommended = pkg.id === cheapestId;
            return (
              <article
                key={pkg.id}
                className={`group flex flex-col overflow-hidden rounded-3xl border bg-paper shadow-sm transition-[color,background-color,border-color,transform,box-shadow] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1.5 hover:shadow-lg ${
                  isRecommended ? 'border-teal-700 ring-1 ring-teal-700' : 'border-border'
                }`}
              >
                <div className="relative flex h-40 items-end overflow-hidden p-4" style={{ background: pkg.accentColor }}>
                  {pkg.image && (
                    <img
                      src={pkg.image}
                      alt=""
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover mix-blend-luminosity transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.06]"
                    />
                  )}
                  <div className="absolute inset-0 bg-teal-950/45" />
                  <span className="relative text-lg font-bold text-white drop-shadow">
                    {pkg.flag} {pkg.destination}
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-4 p-6">
                  <div className="flex items-center justify-between">
                    <span className="w-fit rounded-full bg-paper-soft px-3 py-1 text-xs font-bold text-teal-700">
                      {pkg.dateFrom} – {pkg.dateTo}
                    </span>
                    {isRecommended && (
                      <span className="rounded-full bg-teal-900 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                        המומלץ שלנו
                      </span>
                    )}
                  </div>

                  <ul className="flex flex-col gap-2 text-sm text-ink">
                    <li className="flex items-start gap-2">
                      <Check weight="bold" className="mt-0.5 h-4 w-4 shrink-0 text-teal-700" />
                      <span>{pkg.flightInfo}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check weight="bold" className="mt-0.5 h-4 w-4 shrink-0 text-teal-700" />
                      <span>{pkg.baggage}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check weight="bold" className="mt-0.5 h-4 w-4 shrink-0 text-teal-700" />
                      <span>מלון {pkg.hotel} <Stars count={pkg.stars} /></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check weight="bold" className="mt-0.5 h-4 w-4 shrink-0 text-teal-700" />
                      <span>{pkg.meal}</span>
                    </li>
                  </ul>

                  <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-4">
                    <div className="flex flex-col">
                      <span className="font-heading text-2xl font-bold text-ink">{pkg.price.toLocaleString()} ₪</span>
                      <span className="text-xs text-ink-soft">{pkg.priceNote}</span>
                    </div>
                    <Button asChild size="sm">
                      <a
                        href={waLink(`שלום, אשמח לפרטים והזמנה על חבילת ${pkg.destination} (${pkg.dateFrom}–${pkg.dateTo})`)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        הזמינו עכשיו
                      </a>
                    </Button>
                  </div>
                  <Link
                    to={`/packages/${pkg.id}`}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-teal-700 hover:underline"
                  >
                    לפרטים נוספים על היעד
                    <span aria-hidden="true">←</span>
                  </Link>
                </div>
              </article>
            );
          })}

          {filtered.length === 0 && (
            <div className="col-span-full flex flex-col items-center gap-3 rounded-3xl border border-dashed border-border bg-paper-soft p-10 text-center">
              <p className="text-ink-soft">לא מצאנו חבילה קיימת ל"{query?.destination}" — אבל נשמח להתאים לכם אחת.</p>
              <Button asChild variant="outline">
                <a href={waLink(`שלום, מחפש/ת טיול ל${query?.destination}, אשמח להצעת מחיר`)} target="_blank" rel="noopener noreferrer">
                  בקשו הצעת מחיר ל{query?.destination}
                </a>
              </Button>
            </div>
          )}

          <article className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-border bg-paper-soft p-10 text-center">
            <h3 className="font-heading text-xl font-semibold text-ink">לא מצאתם את היעד שחיפשתם?</h3>
            <p className="text-ink-soft">נשמח להתאים עבורכם חבילה אישית לכל יעד ותקציב — פשוט דברו איתנו.</p>
            <Button asChild variant="outline">
              <a href={waLink('שלום, אשמח לקבל הצעת מחיר לחבילת נופש')} target="_blank" rel="noopener noreferrer">
                בואו נתאים לכם טיול
              </a>
            </Button>
          </article>
        </div>
      </div>
    </section>
  );
}
