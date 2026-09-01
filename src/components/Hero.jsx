import { waLink } from '../lib/whatsapp';

export default function Hero() {
  const onSubmit = (e) => {
    e.preventDefault();
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-20 text-white">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-teal-950 via-teal-900 to-teal-700" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.14),transparent_45%),radial-gradient(circle_at_85%_75%,rgba(0,0,0,0.25),transparent_55%)]" />

      <div className="mx-auto w-full max-w-6xl px-6 py-16">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.14em] text-teal-100">
          סוכנות נסיעות בוטיק • ישראל
        </p>
        <h1 className="max-w-[14ch] text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl">
          הטיול המושלם
          <br />
          מתחיל <span className="text-gold-soft">כאן</span>
        </h1>
        <p className="mt-6 max-w-[46ch] text-lg text-teal-50/90">
          חבילות נופש מותאמות אישית, יעדים בלעדיים ומחירים הוגנים — עם ליווי צמוד מרגע ההזמנה ועד החזרה הביתה.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="#pricing"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-white px-8 text-sm font-semibold text-teal-950 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            לחבילות שלנו
          </a>
          <a
            href={waLink('שלום, אשמח לשיחת ייעוץ אישית לגבי טיול')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-white/70 bg-white/5 px-8 text-sm font-semibold text-white transition hover:bg-white/15"
          >
            שיחת ייעוץ בוואטסאפ
          </a>
        </div>

        <form
          onSubmit={onSubmit}
          className="mt-12 grid max-w-3xl grid-cols-1 gap-4 rounded-3xl bg-white p-5 text-ink shadow-2xl sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_auto] lg:items-end"
        >
          <div className="flex flex-col gap-1.5 text-right">
            <label htmlFor="destination" className="text-xs font-bold text-ink-soft">יעד</label>
            <input
              id="destination"
              type="text"
              placeholder="לאן בא לכם לטוס?"
              className="min-h-11 rounded-lg border border-border bg-paper-soft px-3 text-sm outline-none focus:ring-2 focus:ring-teal-700"
            />
          </div>
          <div className="flex flex-col gap-1.5 text-right">
            <label htmlFor="dates" className="text-xs font-bold text-ink-soft">תאריכים</label>
            <input
              id="dates"
              type="text"
              placeholder="גמישים / תאריך מדויק"
              className="min-h-11 rounded-lg border border-border bg-paper-soft px-3 text-sm outline-none focus:ring-2 focus:ring-teal-700"
            />
          </div>
          <div className="flex flex-col gap-1.5 text-right">
            <label htmlFor="travelers" className="text-xs font-bold text-ink-soft">נוסעים</label>
            <select
              id="travelers"
              className="min-h-11 rounded-lg border border-border bg-paper-soft px-3 text-sm outline-none focus:ring-2 focus:ring-teal-700"
            >
              <option>2 מבוגרים</option>
              <option>מבוגר 1</option>
              <option>משפחה עם ילדים</option>
              <option>קבוצה</option>
            </select>
          </div>
          <button
            type="submit"
            className="min-h-11 whitespace-nowrap rounded-lg bg-teal-900 px-6 text-sm font-semibold text-white transition hover:bg-teal-800 sm:col-span-2 lg:col-span-1"
          >
            חיפוש חבילות
          </button>
        </form>
      </div>
    </section>
  );
}
