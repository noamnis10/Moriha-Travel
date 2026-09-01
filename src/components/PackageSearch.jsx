import { useState } from 'react';
import { Airplane, MapPin, Users, X } from '@phosphor-icons/react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { usePackageSearch } from '../context/PackageSearchContext';
import { cn } from '../lib/utils';

/**
 * Adapted from the "Flight Search" component (21st.dev) into a real,
 * wired-up destination search for the packages section below.
 */
export default function PackageSearch({ className }) {
  const { setQuery } = usePackageSearch();
  const [destination, setDestination] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [travelers, setTravelers] = useState('2 מבוגרים');

  const clearDates = () => {
    setDateFrom('');
    setDateTo('');
  };

  const onSearch = (e) => {
    e.preventDefault();
    setQuery({ destination: destination.trim(), dateFrom, dateTo, travelers });
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <form
      onSubmit={onSearch}
      className={cn('w-full max-w-md overflow-hidden rounded-3xl border border-border bg-paper text-ink shadow-2xl', className)}
    >
      <div className="space-y-4 p-6">
        <div className="grid gap-1">
          <label htmlFor="pkg-destination" className="flex items-center gap-1 text-sm text-ink-soft">
            <MapPin className="h-4 w-4" /> יעד
          </label>
          <input
            id="pkg-destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="לאן בא לכם לטוס? (לדוגמה: קפריסין)"
            className="truncate border-0 border-b border-border bg-transparent p-0 pb-1 text-lg font-semibold text-ink outline-none focus:border-teal-700"
          />
        </div>

        <Separator />

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-1">
            <label htmlFor="pkg-date-from" className="text-sm text-ink-soft">תאריך יציאה</label>
            <input
              id="pkg-date-from"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              placeholder="גמיש"
              className="w-full truncate border-0 border-b border-border bg-transparent p-0 pb-1 text-base font-semibold text-ink outline-none focus:border-teal-700"
            />
          </div>
          <div className="relative grid gap-1">
            <label htmlFor="pkg-date-to" className="text-sm text-ink-soft">תאריך חזרה</label>
            <input
              id="pkg-date-to"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              placeholder="גמיש"
              className="w-full truncate border-0 border-b border-border bg-transparent p-0 pb-1 text-base font-semibold text-ink outline-none focus:border-teal-700"
            />
            {(dateFrom || dateTo) && (
              <button
                type="button"
                onClick={clearDates}
                aria-label="ניקוי תאריכים"
                className="absolute -top-1 left-0 flex items-center gap-1 text-xs text-ink-soft hover:text-ink"
              >
                <X className="h-3 w-3" /> ניקוי
              </button>
            )}
          </div>
        </div>

        <Separator />

        <div className="grid gap-1">
          <label htmlFor="pkg-travelers" className="flex items-center gap-1 text-sm text-ink-soft">
            <Users className="h-4 w-4" /> נוסעים
          </label>
          <select
            id="pkg-travelers"
            value={travelers}
            onChange={(e) => setTravelers(e.target.value)}
            className="border-0 border-b border-border bg-transparent p-0 pb-1 text-base font-semibold text-ink outline-none focus:border-teal-700"
          >
            <option>2 מבוגרים</option>
            <option>מבוגר 1</option>
            <option>משפחה עם ילדים</option>
            <option>קבוצה</option>
          </select>
        </div>
      </div>

      <div className="bg-paper-soft p-4">
        <Button type="submit" size="lg" className="w-full">
          <Airplane className="ms-2 h-4 w-4" />
          חיפוש חבילות
        </Button>
      </div>
    </form>
  );
}
