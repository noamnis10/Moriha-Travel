import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { waLink } from '../lib/whatsapp';
import { cn } from '../lib/utils';

const NAV_LINKS = [
  { href: '#home', label: 'בית', type: 'anchor' },
  { href: '/about', label: 'אודות', type: 'route' },
  { href: '#services', label: 'שירותים', type: 'anchor' },
  { href: '#pricing', label: 'יעדים וחבילות', type: 'anchor' },
  { href: '#testimonials', label: 'המלצות', type: 'anchor' },
  { href: '#faq', label: 'שאלות נפוצות', type: 'anchor' },
  { href: '#contact', label: 'צור קשר', type: 'anchor' },
];

const EASE = 'ease-[cubic-bezier(0.32,0.72,0,1)]';

export default function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeHref, setActiveHref] = useState('#home');
  const overlayRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return undefined;
    const sections = NAV_LINKS.filter((l) => l.type === 'anchor').map((link) => document.querySelector(link.href)).filter(Boolean);
    if (!sections.length) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveHref(`#${entry.target.id}`);
        });
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const close = () => setOpen(false);

  const isLinkActive = (link) => (link.type === 'route' ? location.pathname === link.href : isHome && activeHref === link.href);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-[60] flex justify-center">
        <div
          className={cn(
            'pointer-events-auto mt-6 flex w-max items-center gap-4 rounded-full border px-4 py-2 backdrop-blur-md transition-[color,background-color,border-color,transform,box-shadow] duration-700',
            EASE,
            scrolled || open || !isHome ? 'border-border bg-paper/85 shadow-lg' : 'border-white/20 bg-white/10 shadow-lg'
          )}
        >
          <Link to="/" aria-label="Moriah Travel - חזרה לראש הדף" onClick={close}>
            <img
              src={logo}
              alt="Moriah Travel"
              className={cn('h-7 w-auto transition-[color,background-color,border-color,transform,box-shadow] duration-700', EASE, scrolled || open || !isHome ? '' : 'brightness-0 invert')}
            />
          </Link>

          <a
            href={waLink('שלום, אשמח לשיחת ייעוץ לגבי טיול')}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'hidden min-h-9 items-center justify-center rounded-full bg-teal-900 px-4 text-sm font-semibold text-white transition-[color,background-color,border-color,transform,box-shadow] duration-700 sm:inline-flex',
              EASE,
              'hover:bg-teal-800 active:scale-[0.98]'
            )}
          >
            וואטסאפ
          </a>

          <button
            className="relative flex h-9 w-9 items-center justify-center"
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? 'סגירת תפריט ניווט' : 'פתיחת תפריט ניווט'}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={cn(
                'absolute h-0.5 w-5 rounded-full transition-[color,background-color,border-color,transform,box-shadow] duration-700',
                EASE,
                scrolled || open || !isHome ? 'bg-ink' : 'bg-white',
                open ? 'rotate-45' : '-translate-y-[3px]'
              )}
            />
            <span
              className={cn(
                'absolute h-0.5 w-5 rounded-full transition-[color,background-color,border-color,transform,box-shadow] duration-700',
                EASE,
                scrolled || open || !isHome ? 'bg-ink' : 'bg-white',
                open ? '-rotate-45' : 'translate-y-[3px]'
              )}
            />
          </button>
        </div>
      </header>

      <div
        id="site-menu"
        ref={overlayRef}
        aria-hidden={!open}
        className={cn(
          'fixed inset-0 z-50 flex flex-col items-center justify-center gap-10 bg-paper/95 backdrop-blur-3xl transition-opacity duration-700',
          EASE,
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        )}
      >
        <nav aria-label="ניווט ראשי">
          <ul className="flex flex-col items-center gap-4">
            {NAV_LINKS.map((link, i) => {
              const active = isLinkActive(link);
              const linkClassName = cn(
                'font-heading text-3xl font-semibold transition-colors duration-700',
                EASE,
                active ? 'text-teal-800' : 'text-ink hover:text-teal-700'
              );
              const target = link.type === 'route' ? link.href : isHome ? link.href : `/${link.href}`;
              return (
                <li
                  key={link.href}
                  className={cn('transition-[opacity,transform] duration-700', EASE, open ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0')}
                  style={{ transitionDelay: open ? `${100 + i * 50}ms` : '0ms' }}
                >
                  {link.type === 'anchor' && isHome ? (
                    <a href={target} onClick={close} tabIndex={open ? 0 : -1} aria-current={active ? 'true' : undefined} className={linkClassName}>
                      {link.label}
                    </a>
                  ) : (
                    <Link to={target} onClick={close} tabIndex={open ? 0 : -1} aria-current={active ? 'page' : undefined} className={linkClassName}>
                      {link.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <a
          href={waLink('שלום, אשמח לשיחת ייעוץ לגבי טיול')}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={open ? 0 : -1}
          onClick={close}
          className={cn(
            'inline-flex min-h-11 items-center justify-center rounded-full bg-teal-900 px-8 text-base font-semibold text-white transition-[opacity,transform,background-color] duration-700',
            EASE,
            'hover:bg-teal-800 active:scale-[0.98]',
            open ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          )}
          style={{ transitionDelay: open ? `${100 + NAV_LINKS.length * 50}ms` : '0ms' }}
        >
          וואטסאפ
        </a>
      </div>
    </>
  );
}
