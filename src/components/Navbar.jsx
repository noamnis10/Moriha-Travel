import { useEffect, useState } from 'react';
import logo from '../assets/logo.svg';
import { waLink } from '../lib/whatsapp';

const NAV_LINKS = [
  { href: '#home', label: 'בית' },
  { href: '#about', label: 'אודות' },
  { href: '#services', label: 'שירותים' },
  { href: '#pricing', label: 'יעדים וחבילות' },
  { href: '#testimonials', label: 'המלצות' },
  { href: '#faq', label: 'שאלות נפוצות' },
  { href: '#contact', label: 'צור קשר' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-20 transition-colors duration-200 ${
        scrolled ? 'bg-paper/90 backdrop-blur-md border-b border-border shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6">
        <a href="#home" aria-label="Moriah Travel - חזרה לראש הדף">
          <img src={logo} alt="Moriah Travel" className="h-9 w-auto" />
        </a>

        <nav className="hidden lg:block" aria-label="ניווט ראשי">
          <ul className="flex gap-7">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="relative text-sm font-medium text-ink after:absolute after:-bottom-1 after:right-0 after:h-0.5 after:w-0 after:bg-teal-700 after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={waLink('שלום, אשמח לשיחת ייעוץ לגבי טיול')}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex min-h-11 items-center justify-center rounded-full bg-teal-900 px-6 text-sm font-semibold text-white transition hover:bg-teal-800"
          >
            וואטסאפ
          </a>
          <button
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="פתיחת תפריט ניווט"
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`block h-0.5 w-6 bg-ink transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`block h-0.5 w-6 bg-ink transition-opacity ${open ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-6 bg-ink transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`} />
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" className="border-b border-border bg-paper px-6 pb-6 lg:hidden" aria-label="ניווט נייד">
          <ul className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <li key={link.href} className="border-b border-border last:border-none">
                <a href={link.href} className="block py-3 text-base font-medium text-ink" onClick={() => setOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={waLink('שלום, אשמח לשיחת ייעוץ לגבי טיול')}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-teal-900 px-6 text-sm font-semibold text-white"
          >
            וואטסאפ
          </a>
        </nav>
      )}
    </header>
  );
}
