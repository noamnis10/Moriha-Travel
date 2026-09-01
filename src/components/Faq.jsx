import { useState } from 'react';
import { waLink } from '../lib/whatsapp';
import { useReveal } from '../hooks/useReveal';

const FAQS = [
  { q: 'מה כלול במחיר החבילה?', a: 'בכל חבילה מפורט בדיוק מה כלול — לרוב טיסה הלוך ושוב, מלון, ארוחת בוקר וכבודה. הפרטים המדויקים מופיעים בכרטיס החבילה ובאישור ההזמנה.' },
  { q: 'מהם תנאי הביטול וההחזר?', a: 'תנאי הביטול תלויים בחברת התעופה ובבית המלון הספציפיים, ואנחנו מציגים אותם בשקיפות מלאה לפני ההזמנה הסופית. ניתן גם לרכוש ביטוח נסיעות שמכסה ביטול מסיבות שונות.' },
  { q: 'האם אתם עוזרים גם עם ויזות ומסמכים?', a: 'בהחלט. אנחנו בודקים עבורכם את דרישות הכניסה ליעד, ומנחים אתכם לגבי ויזות, תוקף דרכון וביטוח נדרש - כדי שתגיעו מוכנים.' },
  { q: 'איך מזמינים חבילה?', a: 'פשוט לוחצים על "הזמינו עכשיו" באחת החבילות או פונים אלינו בוואטסאפ, ואנחנו נחזור אליכם עם כל הפרטים והשלבים הבאים.' },
  { q: 'אפשר לשלם בתשלומים?', a: 'כן, במרבית החבילות ניתן לפרוס את התשלום למספר תשלומים. פרטי אפשרויות התשלום נמסרים בהתאמה אישית בעת ההזמנה.' },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);
  const reveal = useReveal();

  return (
    <section id="faq" className="bg-paper py-24">
      <div ref={reveal.ref} className={`mx-auto grid max-w-6xl grid-cols-1 gap-14 px-6 lg:grid-cols-[0.8fr_1.2fr] ${reveal.className}`}>
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-teal-700">שאלות נפוצות</p>
          <h2 className="text-3xl font-semibold text-ink sm:text-4xl">כל מה שרציתם לדעת</h2>
          <p className="mt-4 max-w-sm text-ink-soft">לא מצאתם תשובה? כתבו לנו בוואטסאפ ונחזור אליכם מהר.</p>
          <a
            href={waLink('שלום, יש לי שאלה לגבי הזמנת טיול')}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full border-2 border-ink px-6 text-sm font-semibold text-ink transition hover:bg-ink hover:text-white"
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
                  className="flex w-full items-center justify-between py-5 text-right font-heading text-base font-semibold text-ink"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  <span>{item.q}</span>
                  <span className={`ms-4 flex-shrink-0 text-xl text-teal-700 transition-transform ${isOpen ? 'rotate-45' : ''}`}>+</span>
                </button>
                <div
                  className="overflow-hidden transition-[max-height] duration-300"
                  style={{ maxHeight: isOpen ? '200px' : '0px' }}
                >
                  <p className="pb-5 text-ink-soft">{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
