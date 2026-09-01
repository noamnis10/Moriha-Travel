import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppFab from '../components/WhatsAppFab';
import { Button } from '../components/ui/button';
import { ABOUT_IMAGE } from '../lib/media';
import { waLink } from '../lib/whatsapp';
import { useReveal } from '../hooks/useReveal';
import { PackageSearchProvider } from '../context/PackageSearchContext';

const VALUES = [
  {
    title: 'מסלול, לא תבנית',
    body: 'אנחנו לא מוכרים חבילות מדף. כל טיול נבנה סביב מי שנוסע — התקציב, הקצב, והדברים שחשובים לכם דווקא בטיול הזה.',
  },
  {
    title: 'שקיפות במחיר',
    body: 'המחיר שאתם רואים הוא המחיר שאתם משלמים. אין עמלות נסתרות, ואם משהו משתנה — אתם שומעים על זה מאיתנו קודם.',
  },
  {
    title: 'זמינים באמת',
    body: 'גם באמצע הטיול, לא רק לפניו. אם יש בעיה בשדה התעופה בשעה 2 בלילה, אנחנו עונים בוואטסאפ.',
  },
];

const STATS = [
  { num: '10+', label: 'שנות ניסיון' },
  { num: '1,000+', label: 'נוסעים מרוצים' },
  { num: '24/7', label: 'זמינות וליווי' },
];

export default function AboutPage() {
  const revealValues = useReveal();
  const revealStory = useReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PackageSearchProvider>
      <Navbar />
      <main>
        <section className="scroll-mt-24 bg-teal-950 pt-32 pb-20 text-white">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.14em] text-teal-100">אודות מוריה טראבל</p>
            <h1 className="mx-auto max-w-[680px] text-balance text-4xl font-semibold leading-tight sm:text-5xl">
              סוכנות בוטיק שבנויה סביב אנשים, לא סביב קטלוג
            </h1>
          </div>
        </section>

        <section className="bg-paper py-20">
          <div ref={revealStory.ref} className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[1fr_1fr]">
            <div className="group overflow-hidden rounded-[2rem] shadow-lg transition-shadow duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-xl">
              <img
                src={ABOUT_IMAGE}
                alt="פגישת ייעוץ אישית עם צוות Moriah Travel"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.06]"
              />
            </div>
            <div>
              <h2 className="text-3xl font-semibold text-ink sm:text-4xl">איך זה התחיל</h2>
              <p className="mt-5 text-ink-soft">
                Moriah Travel קמה מתוך תסכול פשוט: יותר מדי חברות נסיעות מוכרות ללקוחות את אותה חבילה, בשינויים קוסמטיים,
                בלי להקשיב למה שהם באמת רוצים. החלטנו לעשות את זה אחרת — לשבת עם כל לקוח, להבין מה חשוב לו בטיול הזה,
                ולבנות מסלול שמתאים בדיוק לו.
              </p>
              <p className="mt-4 text-ink-soft">
                היום אנחנו צוות קטן שמלווה כל הזמנה מהשלב הראשון ועד החזרה הביתה — כולל טיסות, מלונות, ביטוח וכל שאלה
                שעולה באמצע הדרך. אין מוקד טלפוני ואין תסריט קבוע. יש אנשים שזמינים בוואטסאפ.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-paper-soft py-20">
          <div ref={revealValues.ref} className="mx-auto max-w-6xl px-6">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-teal-700">מה מנחה אותנו</p>
            <h2 className="text-3xl font-semibold text-ink sm:text-4xl">שלושה עקרונות שאנחנו לא מתפשרים עליהם</h2>

            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
              {VALUES.map((v) => (
                <div key={v.title} className="rounded-3xl border border-border bg-paper p-6">
                  <h3 className="font-heading text-xl font-semibold text-ink">{v.title}</h3>
                  <p className="mt-3 text-ink-soft">{v.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 flex flex-wrap gap-10 border-t border-border pt-10">
              {STATS.map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span className="font-heading text-3xl font-bold text-teal-800">{s.num}</span>
                  <span className="text-sm text-ink-soft">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-paper py-20">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 text-center">
            <h2 className="text-3xl font-semibold text-ink sm:text-4xl">בואו נכיר, ונתחיל לתכנן</h2>
            <p className="max-w-md text-ink-soft">ספרו לנו קצת על עצמכם ועל הטיול שאתם מדמיינים — נחזור עם הצעה אישית.</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg">
                <a href={waLink('שלום, קראתי על מוריה טראבל ואשמח לשוחח')} target="_blank" rel="noopener noreferrer">
                  שיחת ייעוץ בוואטסאפ
                </a>
              </Button>
              <Button asChild variant="outline">
                <Link to="/#pricing">לצפייה בחבילות</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFab />
    </PackageSearchProvider>
  );
}
