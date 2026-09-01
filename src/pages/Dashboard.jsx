import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { DEFAULT_PACKAGES, loadPackages, resetPackages, savePackages } from '../lib/packages';

const GRADIENTS = [
  ['#2b4d52', '#4c7d84'],
  ['#1f3a3e', '#3a636a'],
  ['#16282b', '#2b4d52'],
  ['#3a636a', '#6b9aa1'],
];

const EMPTY_FORM = {
  destination: '',
  flag: '🌍',
  dateFrom: '',
  dateTo: '',
  flightInfo: '',
  baggage: '',
  hotel: '',
  stars: 4,
  meal: 'ארוחת בוקר כלולה',
  price: '',
  priceNote: 'לאדם בחדר זוגי',
};

export default function Dashboard() {
  const [packages, setPackages] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    setPackages(loadPackages());
  }, []);

  const persist = (next) => {
    setPackages(next);
    savePackages(next);
  };

  const update = (field) => (e) => {
    const value = field === 'stars' ? Number(e.target.value) : e.target.value;
    setForm((f) => ({ ...f, [field]: value }));
  };

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.destination || !form.price) return;

    if (editingId) {
      persist(packages.map((p) => (p.id === editingId ? { ...p, ...form, price: Number(form.price) } : p)));
    } else {
      const [gradientFrom, gradientTo] = GRADIENTS[packages.length % GRADIENTS.length];
      const newPackage = {
        ...form,
        id: `${Date.now()}`,
        price: Number(form.price),
        gradientFrom,
        gradientTo,
      };
      persist([...packages, newPackage]);
    }
    resetForm();
  };

  const onEdit = (pkg) => {
    setEditingId(pkg.id);
    setForm({ ...pkg });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onDelete = (id) => {
    if (!confirm('למחוק את החבילה הזו?')) return;
    persist(packages.filter((p) => p.id !== id));
    if (editingId === id) resetForm();
  };

  const onResetAll = () => {
    if (!confirm('לאפס את כל החבילות לברירת המחדל? השינויים שהוספת יימחקו.')) return;
    resetPackages();
    setPackages(DEFAULT_PACKAGES);
    resetForm();
  };

  return (
    <div className="min-h-screen bg-paper-soft pb-24">
      <header className="border-b border-border bg-paper px-6 py-5">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link to="/"><img src={logo} alt="Moriah Travel" className="h-8 w-auto" /></Link>
          <span className="font-heading text-lg font-semibold text-ink">ניהול חבילות</span>
          <Link to="/" className="text-sm font-semibold text-teal-700 hover:underline">← חזרה לאתר</Link>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 pt-8">
        <div className="mb-8 rounded-2xl border border-gold-soft bg-gold-soft/30 p-4 text-sm text-ink">
          <strong>שימו לב:</strong> החבילות שתוסיפו כאן נשמרות רק בדפדפן הזה, ולא יוצגו אוטומטית לגולשים אחרים באתר החי.
          זהו כלי לתצוגה מקדימה מקומית. כדי שהחבילות באמת יתעדכנו לכל הגולשים, צריך לחבר את הדשבורד למסד נתונים/שרת אמיתי -
          נשמח לעזור עם זה בהמשך אם תרצו.
        </div>

        <form onSubmit={onSubmit} className="mb-10 grid grid-cols-1 gap-4 rounded-3xl bg-paper p-7 shadow-sm sm:grid-cols-2">
          <h2 className="font-heading text-xl font-semibold text-ink sm:col-span-2">
            {editingId ? 'עריכת חבילה' : 'הוספת חבילה חדשה'}
          </h2>

          <Field label="יעד" value={form.destination} onChange={update('destination')} required />
          <Field label="דגל (אמוג׳י)" value={form.flag} onChange={update('flag')} />
          <Field label="תאריך יציאה" value={form.dateFrom} onChange={update('dateFrom')} placeholder="6.9.26" />
          <Field label="תאריך חזרה" value={form.dateTo} onChange={update('dateTo')} placeholder="9.9.26" />
          <Field label="פרטי טיסה" value={form.flightInfo} onChange={update('flightInfo')} className="sm:col-span-2" />
          <Field label="כבודה" value={form.baggage} onChange={update('baggage')} />
          <Field label="מלון" value={form.hotel} onChange={update('hotel')} />
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-ink-soft">כוכבים</label>
            <select value={form.stars} onChange={update('stars')} className="min-h-11 rounded-lg border border-border px-3 text-sm">
              {[3, 4, 5].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <Field label="ארוחות" value={form.meal} onChange={update('meal')} />
          <Field label="מחיר (₪)" type="number" value={form.price} onChange={update('price')} required />
          <Field label="הערת מחיר" value={form.priceNote} onChange={update('priceNote')} />

          <div className="flex gap-3 sm:col-span-2">
            <button type="submit" className="min-h-11 rounded-full bg-teal-900 px-6 text-sm font-semibold text-white transition hover:bg-teal-800">
              {editingId ? 'שמירת שינויים' : 'הוספת חבילה'}
            </button>
            {editingId && (
              <button type="button" onClick={resetForm} className="min-h-11 rounded-full border border-border px-6 text-sm font-semibold text-ink">
                ביטול עריכה
              </button>
            )}
          </div>
        </form>

        <div className="flex items-center justify-between">
          <h2 className="font-heading text-xl font-semibold text-ink">חבילות קיימות ({packages.length})</h2>
          <button onClick={onResetAll} className="text-sm font-semibold text-ink-soft hover:text-ink hover:underline">
            איפוס לברירת מחדל
          </button>
        </div>

        <div className="mt-4 flex flex-col gap-3">
          {packages.map((pkg) => (
            <div key={pkg.id} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-paper p-5 shadow-sm">
              <div>
                <p className="font-semibold text-ink">{pkg.flag} {pkg.destination}</p>
                <p className="text-sm text-ink-soft">
                  {pkg.dateFrom}–{pkg.dateTo} · {pkg.hotel} · {pkg.price.toLocaleString()} ₪
                </p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => onEdit(pkg)} className="min-h-9 rounded-full border border-border px-4 text-sm font-semibold text-ink">
                  עריכה
                </button>
                <button onClick={() => onDelete(pkg.id)} className="min-h-9 rounded-full border border-red-200 px-4 text-sm font-semibold text-red-600 hover:bg-red-50">
                  מחיקה
                </button>
              </div>
            </div>
          ))}
          {packages.length === 0 && <p className="text-ink-soft">אין חבילות כרגע. הוסיפו חבילה חדשה למעלה.</p>}
        </div>
      </div>
    </div>
  );
}

function Field({ label, className = '', ...props }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-xs font-bold text-ink-soft">{label}</label>
      <input {...props} className="min-h-11 rounded-lg border border-border px-3 text-sm outline-none focus:ring-2 focus:ring-teal-700" />
    </div>
  );
}
