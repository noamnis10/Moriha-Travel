import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import TaglineReveal from '../components/TaglineReveal';
import About from '../components/About';
import Services from '../components/Services';
import Pricing from '../components/Pricing';
import Testimonials from '../components/Testimonials';
import Faq from '../components/Faq';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import WhatsAppFab from '../components/WhatsAppFab';
import { PackageSearchProvider } from '../context/PackageSearchContext';

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    const el = document.getElementById(id);
    if (el) requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth' }));
  }, [location.hash]);

  return (
    <PackageSearchProvider>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-0 focus:right-0 focus:z-[100] focus:bg-ink focus:px-5 focus:py-3 focus:text-white">
        דלגו לתוכן הראשי
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <TaglineReveal />
        <About />
        <Services />
        <Pricing />
        <Testimonials />
        <Faq />
        <ContactForm />
      </main>
      <Footer />
      <WhatsAppFab />
    </PackageSearchProvider>
  );
}
