import { BATUMI_IMAGE, LIMASSOL_IMAGE } from './media';

const STORAGE_KEY = 'moriah-travel-packages';

export const DEFAULT_PACKAGES = [
  {
    id: 'batumi-2026-09',
    destination: 'בטומי, גאורגיה',
    flag: '🇬🇪',
    dateFrom: '6.9.26',
    dateTo: '9.9.26',
    flightInfo: 'טיסות אל על — הלוך 05:15 · חזור 09:35',
    baggage: 'מזוודה + טרולי',
    hotel: 'Piazza Four Colours',
    stars: 4,
    meal: 'ארוחת בוקר כלולה',
    price: 1834,
    priceNote: 'לאדם בחדר זוגי',
    image: BATUMI_IMAGE,
    gradientFrom: '#2b4d52',
    gradientTo: '#4c7d84',
  },
  {
    id: 'limassol-2026-09',
    destination: 'לימסול, קפריסין',
    flag: '🇨🇾',
    dateFrom: '3.9.26',
    dateTo: '6.9.26',
    flightInfo: 'הלוך 14:00 · חזור 10:30',
    baggage: 'טרולי + תיק גב לכל נוסע',
    hotel: 'Atlantica Miramare Beach',
    stars: 4,
    meal: 'ארוחת בוקר כלולה',
    price: 2700,
    priceNote: 'לאדם בחדר זוגי',
    image: LIMASSOL_IMAGE,
    gradientFrom: '#1f3a3e',
    gradientTo: '#3a636a',
  },
];

export function loadPackages() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PACKAGES;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) return DEFAULT_PACKAGES;
    return parsed;
  } catch {
    return DEFAULT_PACKAGES;
  }
}

export function savePackages(packages) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(packages));
}

export function resetPackages() {
  localStorage.removeItem(STORAGE_KEY);
}
