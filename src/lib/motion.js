import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** cubic-bezier(0.32, 0.72, 0, 1) as a GSAP-compatible ease. */
export const EASE = 'power3.out';

export { gsap, ScrollTrigger };
