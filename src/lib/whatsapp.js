export const WHATSAPP_PHONE = '972508863586';

export function waLink(text) {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
}
