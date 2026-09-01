import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import RevealHeading from './RevealHeading';

const SERVICES = [
  { name: 'תכנון מסלול אישי', desc: 'נבנה עבורכם מסלול טיול המותאם בדיוק להעדפות, לתקציב וללו״ז שלכם.' },
  { name: 'טיסות במחירים משתלמים', desc: 'השוואת מחירי טיסות ומציאת המסלולים המשתלמים והנוחים ביותר עבורכם.' },
  { name: 'הזמנת מלונות ונופש', desc: 'בחירה קפדנית של מלונות ונופש שעומדים בסטנדרט שאנחנו היינו רוצים לקבל בעצמנו.' },
  { name: 'חבילות משפחות וזוגות', desc: 'חבילות מותאמות למשפחות, זוגות וקבוצות — כולל פעילויות וחוויות ייחודיות ליעד.' },
  { name: 'ויזות וביטוח נסיעות', desc: 'ייעוץ לגבי ויזות, ביטוחי נסיעה ודרישות כניסה, כדי שתגיעו מוכנים ורגועים.' },
  { name: 'ליווי אישי 24/7', desc: 'זמינים בוואטסאפ לאורך כל הטיול - לכל שאלה, שינוי או מקרה חירום.' },
];

export default function Services() {
  const [active, setActive] = useState(0);
  const reveal = useReveal();

  return (
    <section id="services" className="scroll-mt-24 bg-paper-soft py-24">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-teal-700">מה אנחנו מציעים</p>
        <RevealHeading className="text-3xl font-semibold text-ink sm:text-4xl">השירותים שלנו</RevealHeading>

        <div ref={reveal.ref} className={`mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2 ${reveal.className}`}>
          <ul className="flex flex-col">
            {SERVICES.map((s, i) => (
              <li key={s.name} className="border-t border-border last:border-b">
                <button
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={`flex w-full items-center justify-between rounded-lg px-4 py-4 text-right transition-[color,background-color,border-color,transform,box-shadow] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                    active === i ? 'bg-teal-950 text-white' : 'bg-transparent text-ink'
                  }`}
                >
                  <span className="text-base font-semibold">{s.name}</span>
                  <span
                    className={`transition-opacity duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${active === i ? 'opacity-100' : 'opacity-0'}`}
                  >
                    ←
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div className="flex min-h-64 items-center rounded-3xl bg-teal-900 p-10 text-white">
            <p className="font-heading text-2xl">{SERVICES[active].desc}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
