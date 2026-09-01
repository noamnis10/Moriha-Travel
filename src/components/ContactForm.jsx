import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { waLink } from '../lib/whatsapp';
import { useReveal } from '../hooks/useReveal';
import RevealHeading from './RevealHeading';

export default function ContactForm() {
  const reveal = useReveal();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', phone: '', destination: '', message: '' });

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    const lines = ['שלום, אשמח לקבל הצעת מחיר לטיול.'];
    if (form.name) lines.push(`שם: ${form.name}`);
    if (form.phone) lines.push(`טלפון: ${form.phone}`);
    if (form.destination) lines.push(`יעד מבוקש: ${form.destination}`);
    if (form.message) lines.push(`הודעה: ${form.message}`);
    window.open(waLink(lines.join('\n')), '_blank', 'noopener,noreferrer');
    navigate('/thank-you', { state: { destination: form.destination || undefined } });
  };

  return (
    <section id="contact" className="scroll-mt-24 bg-paper-soft py-24">
      <div ref={reveal.ref} className={`mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] ${reveal.className}`}>
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-teal-700">בואו נתחיל לתכנן</p>
          <RevealHeading className="text-3xl font-semibold text-ink sm:text-4xl">השאירו פרטים ונחזור אליכם</RevealHeading>
          <p className="mt-4 max-w-sm text-ink-soft">ספרו לנו קצת על הטיול שאתם מדמיינים, ואנחנו נחזור עם הצעה מותאמת אישית.</p>

          <div className="mt-6 flex items-baseline gap-2">
            <span className="min-w-20 font-bold text-ink">וואטסאפ</span>
            <a href={waLink('שלום, אשמח לקבל פרטים נוספים')} target="_blank" rel="noopener noreferrer" className="font-semibold text-teal-700 hover:underline">
              050-886-3586
            </a>
          </div>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-4 rounded-3xl bg-paper p-8 shadow-lg">
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-xs font-bold text-ink-soft">שם מלא</label>
            <input id="name" required value={form.name} onChange={update('name')} className="min-h-11 rounded-lg border border-border px-3 text-sm outline-none focus:ring-2 focus:ring-teal-700" />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="phone" className="text-xs font-bold text-ink-soft">טלפון</label>
            <input id="phone" type="tel" required value={form.phone} onChange={update('phone')} className="min-h-11 rounded-lg border border-border px-3 text-sm outline-none focus:ring-2 focus:ring-teal-700" />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="destination" className="text-xs font-bold text-ink-soft">יעד מבוקש</label>
            <input id="destination" value={form.destination} onChange={update('destination')} className="min-h-11 rounded-lg border border-border px-3 text-sm outline-none focus:ring-2 focus:ring-teal-700" />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="message" className="text-xs font-bold text-ink-soft">הודעה</label>
            <textarea id="message" rows={4} value={form.message} onChange={update('message')} placeholder="ספרו לנו קצת על הטיול הרצוי..." className="rounded-lg border border-border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-700" />
          </div>
          <button
            type="submit"
            className="min-h-11 rounded-full bg-teal-900 px-6 text-base font-semibold text-white transition-[color,background-color,border-color,transform,box-shadow] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-teal-800 active:scale-[0.98]"
          >
            שליחה בוואטסאפ
          </button>
        </form>
      </div>
    </section>
  );
}
