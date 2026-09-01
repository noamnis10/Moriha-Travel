import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle } from '@phosphor-icons/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppFab from '../components/WhatsAppFab';
import { Button } from '../components/ui/button';
import { waLink } from '../lib/whatsapp';
import { PackageSearchProvider } from '../context/PackageSearchContext';

export default function ThankYou() {
  const location = useLocation();
  const destination = location.state?.destination;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PackageSearchProvider>
      <Navbar />
      <main className="flex min-h-screen scroll-mt-24 flex-col items-center justify-center gap-6 bg-paper-soft px-6 pt-24 pb-24 text-center">
        <CheckCircle weight="fill" className="h-16 w-16 text-teal-700" aria-hidden="true" />
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-teal-700">הפנייה נשלחה</p>
        <h1 className="max-w-[680px] text-balance text-3xl font-semibold text-ink sm:text-4xl">
          תודה שפניתם אלינו{destination ? ` בנוגע ל${destination}` : ''}
        </h1>
        <p className="max-w-md text-ink-soft">
          פתחנו לכם חלון וואטסאפ עם ההודעה מוכנה לשליחה. אם החלון לא נפתח, אפשר לכתוב לנו ישירות בכתובת שלמטה — נחזור אליכם בהקדם.
        </p>

        <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg">
            <a href={waLink('שלום, אשמח להמשיך את הפנייה שלי')} target="_blank" rel="noopener noreferrer">
              פתחו וואטסאפ שוב
            </a>
          </Button>
          <Button asChild variant="outline">
            <Link to="/">חזרה לדף הבית</Link>
          </Button>
        </div>
      </main>
      <Footer />
      <WhatsAppFab />
    </PackageSearchProvider>
  );
}
