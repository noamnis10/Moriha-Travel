import { useReveal } from '../hooks/useReveal';
import RevealHeading from './RevealHeading';

const TESTIMONIALS = [
  { quote: 'התכנון היה מדויק לכל פרט, וקיבלנו מענה בכל שעה שהתקשרנו. הטיול הכי רגוע שעשינו.', name: 'מיכל ל.' },
  { quote: 'מחיר הוגן, מלון ברמה גבוהה בהרבה ממה שציפינו, ותמיכה צמודה גם כשהיינו כבר בחו״ל.', name: 'דני כ.' },
  { quote: 'הזמנו חבילה משפחתית ברגע האחרון, ובכל זאת קיבלנו שירות אישי ומקצועי מהשנייה הראשונה.', name: 'רותם א.' },
];

export default function Testimonials() {
  const reveal = useReveal();

  return (
    <section id="testimonials" className="scroll-mt-24 bg-teal-950 py-24 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <RevealHeading className="text-3xl font-semibold text-white sm:text-4xl">המלצות מנוסעים שלנו</RevealHeading>

        <div ref={reveal.ref} className={`mt-10 grid grid-cols-1 gap-6 md:grid-cols-3 ${reveal.className}`}>
          {TESTIMONIALS.map((t) => (
            <blockquote key={t.name} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="mb-3 text-gold" aria-hidden="true">★★★★★</div>
              <p className="text-white/90">"{t.quote}"</p>
              <footer className="mt-4 font-semibold text-white">{t.name}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
