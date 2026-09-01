import logo from '../assets/logo.svg';
import { waLink } from '../lib/whatsapp';

export default function Footer() {
  return (
    <footer className="bg-teal-950 pt-12 text-white/85">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 border-b border-white/10 px-6 pb-8">
        <a href="#home">
          <img src={logo} alt="Moriah Travel" className="h-9 w-auto brightness-0 invert" />
        </a>
        <nav aria-label="ניווט תחתון">
          <ul className="flex flex-wrap gap-4">
            <li><a href="#about" className="hover:underline">אודות</a></li>
            <li><a href="#services" className="hover:underline">שירותים</a></li>
            <li><a href="#pricing" className="hover:underline">חבילות</a></li>
            <li><a href="#faq" className="hover:underline">שאלות נפוצות</a></li>
            <li><a href="#contact" className="hover:underline">צור קשר</a></li>
          </ul>
        </nav>
        <a
          href={waLink('שלום, אשמח לפרטים נוספים')}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-white/70 px-6 text-sm font-semibold text-white transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white/15 active:scale-[0.98]"
        >
          וואטסאפ
        </a>
      </div>
      <div className="px-6 py-4 text-center text-sm text-white/60">
        <p>© {new Date().getFullYear()} Moriah Travel. כל הזכויות שמורות.</p>
      </div>
    </footer>
  );
}
