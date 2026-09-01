import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppFab from '../components/WhatsAppFab';
import { Button } from '../components/ui/button';
import logoIcon from '../assets/logo-icon.svg';
import { PackageSearchProvider } from '../context/PackageSearchContext';

export default function NotFound() {
  return (
    <PackageSearchProvider>
      <Navbar />
      <main className="flex min-h-screen scroll-mt-24 flex-col items-center justify-center gap-5 px-6 pt-24 pb-24 text-center">
        <img src={logoIcon} alt="" aria-hidden="true" className="h-16 w-16 opacity-70" />
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-teal-700">404</p>
        <h1 className="max-w-md text-balance text-3xl font-semibold text-ink sm:text-4xl">
          הדף הזה טס בלי אתכם
        </h1>
        <p className="max-w-sm text-ink-soft">הכתובת שחיפשתם לא קיימת. אפשר לחזור לדף הבית או לצפות ביעדים שלנו.</p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
          <Button asChild>
            <Link to="/">חזרה לדף הבית</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/#pricing">לצפייה בחבילות</Link>
          </Button>
        </div>
      </main>
      <Footer />
      <WhatsAppFab />
    </PackageSearchProvider>
  );
}
