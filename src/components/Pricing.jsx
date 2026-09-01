import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check, X } from '@phosphor-icons/react';
import { loadPackages } from '../lib/packages';
import { waLink } from '../lib/whatsapp';
import { useReveal } from '../hooks/useReveal';
import RevealHeading from './RevealHeading';
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

function PackagePhoto({ pkg }) {
  return (
    <>
      {pkg.image && (
        <img
          src={pkg.image}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover mix-blend-luminosity transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.06]"
        />
      )}
      <div className="absolute inset-0 bg-teal-950/45" />
    </>
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

  const featured = filtered.find((p) => p.id === cheapestId) ?? filtered[0] ?? null;
  const rest = featured ? filtered.filter((p) => p.id !== featured.id) : [];

  return (
    <section id="pricing" className="scroll-mt-24 bg-paper py-24">
      <div className="mx-auto max-w-6xl px-6">
        <RevealHeading className="text-3xl font-semibold text-ink sm:text-4xl">יעדים וחבילות נבחרות לתקופה הקרובה</RevealHeading>
        <p className="mt-4 max-w-xl text-ink-soft">
          חבילות מוכנות, במחיר שכולל טיסה ומלון, ומתעדכנות באופן שוטף. מוזמנים לפנות אלינו גם ליעד אחר שלא רשום כאן.
        </p>

        {query?.destination && (
          <div className="mt-4 flex w-fit items-center gap-3 rounded-full bg-paper-soft px-4 py-2 text-sm text-ink-soft">
            <span>מציג תוצאות עבור "{query.destination}"</span>
            <button onClick={() => setQuery(null)} className="flex items-center gap-1 font-semibold text-teal-700 hover:underline">
              <X className="h-4 w-4" /> ניקוי סינון
            </button>
          </div>
        )}

        <div ref={reveal.ref} className={`mt-10 ${reveal.className}`}>
          {!featured && (
            <div className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-border bg-paper-soft p-10 text-center">
              <p className="text-ink-soft">לא מצאנו חבילה קיימת ל"{query?.destination}", אבל נשמח להתאים לכם אחת.</p>
              <Button asChild variant="outline">
                <a href={waLink(`שלום, מחפש/ת טיול ל${query?.destination}, אשמח להצעת מחיר`)} target="_blank" rel="noopener noreferrer">
                  בקשו הצעת מחיר ל{query?.destination}
                </a>
              </Button>
            </div>
          )}

          {featured && (
            <article className="group grid overflow-hidden rounded-3xl border border-teal-700 bg-paper shadow-sm ring-1 ring-teal-700 md:grid-cols-2">
              <div className="relative h-64 md:h-auto" style={{ background: featured.accentColor }}>
                <PackagePhoto pkg={featured} />
                <span className="absolute start-6 top-6 rounded-full bg-teal-900 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                  המומלץ שלנו
                </span>
                <span className="absolute bottom-6 start-6 font-heading text-2xl font-bold text-white drop-shadow sm:text-3xl">
                  {featured.flag} {featured.destination}
                </span>
                <span
                  aria-hidden="true"
                  className="absolute end-6 top-6 flex h-9 w-9 translate-y-1 items-center justify-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur-sm transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-y-0 group-hover:opacity-100"
                >
                  <ArrowUpRight weight="bold" className="h-4 w-4" />
                </span>
              </div>

              <div className="flex flex-col gap-6 p-8 md:p-10">
                <span className="w-fit rounded-full bg-paper-soft px-3 py-1 text-xs font-bold text-teal-700">
                  {featured.dateFrom} - {featured.dateTo}
                </span>

                <ul className="flex flex-col gap-2.5 text-sm text-ink">
                  <li className="flex items-start gap-2">
                    <Check weight="bold" className="mt-0.5 h-4 w-4 shrink-0 text-teal-700" />
                    <span>{featured.flightInfo}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check weight="bold" className="mt-0.5 h-4 w-4 shrink-0 text-teal-700" />
                    <span>{featured.baggage}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check weight="bold" className="mt-0.5 h-4 w-4 shrink-0 text-teal-700" />
                    <span>
                      מלון {featured.hotel} <Stars count={featured.stars} />
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check weight="bold" className="mt-0.5 h-4 w-4 shrink-0 text-teal-700" />
                    <span>{featured.meal}</span>
                  </li>
                </ul>

                <div className="mt-auto flex flex-wrap items-end justify-between gap-4 border-t border-border pt-6">
                  <div className="flex flex-col">
                    <span className="font-heading text-5xl font-bold text-ink">{featured.price.toLocaleString()} ₪</span>
                    <span className="text-sm text-ink-soft">{featured.priceNote}</span>
                  </div>
                  <Button asChild size="lg">
                    <a
                      href={waLink(
                        `שלום, אשמח לפרטים והזמנה על חבילת ${featured.destination} (${featured.dateFrom}-${featured.dateTo})`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      הזמינו עכשיו
                    </a>
                  </Button>
                </div>
                <Link
                  to={`/packages/${featured.id}`}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-teal-700 hover:underline"
                >
                  לפרטים נוספים על היעד
                  <span aria-hidden="true">←</span>
                </Link>
              </div>
            </article>
          )}

          {rest.length > 0 && (
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {rest.map((pkg) => (
                <Link
                  key={pkg.id}
                  to={`/packages/${pkg.id}`}
                  className="group flex items-center gap-4 rounded-2xl border border-border bg-paper p-4 transition-[transform,box-shadow] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl" style={{ background: pkg.accentColor }}>
                    <PackagePhoto pkg={pkg} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-ink">
                      {pkg.flag} {pkg.destination}
                    </p>
                    <p className="text-sm text-ink-soft">
                      {pkg.dateFrom} - {pkg.dateTo}
                    </p>
                  </div>
                  <div className="shrink-0 text-end">
                    <span className="font-heading text-xl font-bold text-ink">{pkg.price.toLocaleString()} ₪</span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {featured && (
            <div className="mt-4 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-paper-soft p-8 text-center">
              <h3 className="font-heading text-lg font-semibold text-ink">לא מצאתם את היעד שחיפשתם?</h3>
              <p className="text-sm text-ink-soft">נשמח להתאים עבורכם חבילה אישית לכל יעד ותקציב, פשוט דברו איתנו.</p>
              <Button asChild variant="outline" size="sm">
                <a href={waLink('שלום, אשמח לקבל הצעת מחיר לחבילת נופש')} target="_blank" rel="noopener noreferrer">
                  בואו נתאים לכם טיול
                </a>
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
