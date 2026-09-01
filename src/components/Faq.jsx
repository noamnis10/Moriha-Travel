import { useState } from 'react';
import { waLink } from '../lib/whatsapp';
import { useReveal } from '../hooks/useReveal';
import RevealHeading from './RevealHeading';

const FAQS = [
  { q: 'מה כלול במחיר החבילה?', a: 'בכל חבילה מפורט בדיוק מה כלול: לרוב טיסה הלוך ושוב, מלון, ארוחת בוקר וכבודה. הפרטים המדויקים מופיעים בכרטיס החבילה ובאישור ההזמנה.' },
  { q: 'מהם תנאי הביטול וההחזר?', a: 'תנאי הביטול תלויים בחברת התעופה ובבית המלון הספציפיים, ואנחנו מציגים אותם בשקיפות מלאה לפני ההזמנה הסופית. ניתן גם לרכוש ביטוח נסיעות שמכסה ביטול מסיבות שונות.' },
  { q: 'האם אתם עוזרים גם עם ויזות ומסמכים?', a: 'בהחלט. אנחנו בודקים עבורכם את דרישות הכניסה ליעד, ומנחים אתכם לגבי ויזות, תוקף דרכון וביטוח נדרש, כדי שתגיעו מוכנים.' },
  { q: 'איך מזמינים חבילה?', a: 'פשוט לוחצים על "הזמינו עכשיו" באחת החבילות או פונים אלינו בוואטסאפ, ואנחנו נחזור אליכם עם כל הפרטים והשלבים הבאים.' },
  { q: 'אפשר לשלם בתשלומים?', a: 'כן, במרבית החבילות ניתן לפרוס את התשלום למספר תשלומים. פרטי אפשרויות התשלום נמסרים בהתאמה אישית בעת ההזמנה.' },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);
  const reveal = useReveal();

  return (
    <section id="faq" className="scroll-mt-24 bg-paper py-24">
      <div ref={reveal.ref} className={`mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 lg:grid-cols-[0.8fr_1.2fr] ${reveal.className}`}>
        <div>
          <RevealHeading className="text-3xl font-semibold text-ink sm:text-4xl">כל מה שרציתם לדעת</RevealHeading>
          <p className="mt-4 max-w-sm text-ink-soft">לא מצאתם תשובה? כתבו לנו בוואטסאפ ונחזור אליכם מהר.</p>
          <a
            href={waLink('שלום, יש לי שאלה לגבי הזמנת טיול')}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex min-h-11 items-center justify-center rounded-full border-2 border-ink px-6 text-sm font-semibold text-ink transition-[color,background-color,border-color,transform,box-shadow] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-ink hover:text-white active:scale-[0.98]"
          >
            שאלו אותנו
          </a>
        </div>

        <div>
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.q} className="border-b border-border">
                <button
                  className="flex w-full items-center justify-between py-4 text-right font-heading text-base font-semibold text-ink"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  <span>{item.q}</span>
                  <span
                    className={`ms-4 flex-shrink-0 text-xl text-teal-700 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${isOpen ? 'rotate-45' : ''}`}
                  >
                    +
                  </span>
                </button>
                <div
                  className="overflow-hidden transition-[max-height] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
                  style={{ maxHeight: isOpen ? '200px' : '0px' }}
                >
                  <p className="pb-4 text-ink-soft">{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
