import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Check } from '@phosphor-icons/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppFab from '../components/WhatsAppFab';
import { Button } from '../components/ui/button';
import { loadPackages } from '../lib/packages';
import { waLink } from '../lib/whatsapp';
import { PackageSearchProvider } from '../context/PackageSearchContext';
import RevealHeading from '../components/RevealHeading';

function Stars({ count }) {
  return (
    <span className="text-gold-text" aria-hidden="true">
      {'★'.repeat(count)}
      <span className="text-border">{'★'.repeat(5 - count)}</span>
    </span>
  );
}

export default function PackageDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pkg, setPkg] = useState(undefined);

  useEffect(() => {
    const found = loadPackages().find((p) => p.id === id);
    setPkg(found ?? null);
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (pkg === undefined) return null;

  if (pkg === null) {
    return (
      <PackageSearchProvider>
        <Navbar />
        <main className="flex min-h-screen scroll-mt-24 flex-col items-center justify-center gap-4 px-6 pt-24 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-teal-700">אופס</p>
          <h1 className="text-3xl font-semibold text-ink">החבילה הזו לא נמצאה</h1>
          <p className="max-w-md text-ink-soft">
            ייתכן שהחבילה כבר לא זמינה, או שהקישור שגוי. מוזמנים לחזור לרשימת היעדים והחבילות שלנו.
          </p>
          <Button asChild>
            <Link to="/#pricing">לכל היעדים והחבילות</Link>
          </Button>
        </main>
        <Footer />
        <WhatsAppFab />
      </PackageSearchProvider>
    );
  }

  return (
    <PackageSearchProvider>
      <Navbar />
      <main>
        <section className="relative flex min-h-[70vh] scroll-mt-24 items-end overflow-hidden pt-24 text-white">
          <div className="absolute inset-0 -z-20" style={{ background: pkg.accentColor }} />
          {pkg.image && (
            <img src={pkg.image} alt="" aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full object-cover mix-blend-luminosity" />
          )}
          <div className="absolute inset-0 -z-10 bg-teal-950/50" />

          <div className="mx-auto w-full max-w-5xl px-6 pb-16">
            <Link to="/#pricing" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-white/85 hover:text-white">
              <span aria-hidden="true">←</span> חזרה לכל היעדים
            </Link>
            <h1 className="max-w-[680px] text-balance text-4xl font-semibold leading-tight sm:text-5xl">
              {pkg.flag} {pkg.destination}
            </h1>
            <p className="mt-4 text-lg text-white/85">{pkg.dateFrom} – {pkg.dateTo}</p>
          </div>
        </section>

        <section className="bg-paper py-16">
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 px-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-teal-700">מה כלול בחבילה</p>
              <RevealHeading className="text-3xl font-semibold text-ink">כל הפרטים במקום אחד</RevealHeading>

              <ul className="mt-8 flex flex-col gap-4 text-ink">
                <li className="flex items-start gap-3 border-b border-border pb-4">
                  <Check weight="bold" className="mt-0.5 h-5 w-5 shrink-0 text-teal-700" />
                  <span>{pkg.flightInfo}</span>
                </li>
                <li className="flex items-start gap-3 border-b border-border pb-4">
                  <Check weight="bold" className="mt-0.5 h-5 w-5 shrink-0 text-teal-700" />
                  <span>{pkg.baggage}</span>
                </li>
                <li className="flex items-start gap-3 border-b border-border pb-4">
                  <Check weight="bold" className="mt-0.5 h-5 w-5 shrink-0 text-teal-700" />
                  <span>מלון {pkg.hotel} <Stars count={pkg.stars} /></span>
                </li>
                <li className="flex items-start gap-3 border-b border-border pb-4">
                  <Check weight="bold" className="mt-0.5 h-5 w-5 shrink-0 text-teal-700" />
                  <span>{pkg.meal}</span>
                </li>
              </ul>

              <div className="mt-10 rounded-3xl bg-paper-soft p-8">
                <h3 className="font-heading text-xl font-semibold text-ink">יש לכם שאלה על החבילה?</h3>
                <p className="mt-2 text-ink-soft">
                  מספר המקומות בכל חבילה מוגבל, והמחירים מתעדכנים לפי זמינות. כתבו לנו בוואטסאפ ונאשר עבורכם זמינות ומחיר סופי לפני התשלום.
                </p>
              </div>
            </div>

            <aside className="h-fit rounded-3xl border border-border bg-paper p-8 shadow-lg lg:sticky lg:top-28">
              <div className="flex flex-col gap-1 border-b border-border pb-6">
                <span className="font-heading text-3xl font-bold text-ink">{pkg.price.toLocaleString()} ₪</span>
                <span className="text-sm text-ink-soft">{pkg.priceNote}</span>
              </div>
              <dl className="mt-6 flex flex-col gap-3 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="text-ink-soft">יציאה</dt>
                  <dd className="font-semibold text-ink">{pkg.dateFrom}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-ink-soft">חזרה</dt>
                  <dd className="font-semibold text-ink">{pkg.dateTo}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-ink-soft">מלון</dt>
                  <dd className="font-semibold text-ink">{pkg.hotel}</dd>
                </div>
              </dl>
              <Button
                type="button"
                size="lg"
                className="mt-8 w-full"
                onClick={() => {
                  const text = `שלום, אשמח לפרטים והזמנה על חבילת ${pkg.destination} (${pkg.dateFrom}–${pkg.dateTo})`;
                  window.open(waLink(text), '_blank', 'noopener,noreferrer');
                  navigate('/thank-you', { state: { destination: pkg.destination } });
                }}
              >
                הזמינו עכשיו בוואטסאפ
              </Button>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFab />
    </PackageSearchProvider>
  );
}
