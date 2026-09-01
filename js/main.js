(function () {
  'use strict';

  var WHATSAPP_PHONE = '972508863586';

  // Build WhatsApp links from data-wa-text attributes
  document.querySelectorAll('[data-wa-text]').forEach(function (el) {
    var text = el.getAttribute('data-wa-text');
    el.setAttribute('href', 'https://wa.me/' + WHATSAPP_PHONE + '?text=' + encodeURIComponent(text));
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener noreferrer');
  });

  // Header scroll state
  var header = document.getElementById('siteHeader');
  var onScroll = function () {
    if (window.scrollY > 12) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile nav toggle
  var navToggle = document.getElementById('navToggle');
  var mainNav = document.getElementById('mainNav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Hero search: scroll to packages (no backend yet)
  var heroSearch = document.getElementById('heroSearch');
  if (heroSearch) {
    heroSearch.addEventListener('submit', function (e) {
      e.preventDefault();
      var target = document.getElementById('packages');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Services: click to preview description
  var serviceItems = document.querySelectorAll('.service-item');
  var previewText = document.getElementById('servicePreviewText');
  serviceItems.forEach(function (item) {
    item.addEventListener('click', function () {
      serviceItems.forEach(function (i) { i.classList.remove('active'); });
      item.classList.add('active');
      if (previewText) previewText.textContent = item.getAttribute('data-desc');
    });
  });

  // FAQ accordion
  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      var answer = btn.nextElementSibling;

      document.querySelectorAll('.faq-question').forEach(function (otherBtn) {
        if (otherBtn !== btn) {
          otherBtn.setAttribute('aria-expanded', 'false');
          otherBtn.nextElementSibling.style.maxHeight = null;
        }
      });

      btn.setAttribute('aria-expanded', String(!expanded));
      answer.style.maxHeight = expanded ? null : answer.scrollHeight + 'px';
    });
  });

  // Contact form -> WhatsApp
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = contactForm.name.value.trim();
      var phone = contactForm.phone.value.trim();
      var destination = contactForm.destination.value.trim();
      var message = contactForm.message.value.trim();

      var lines = ['שלום, אשמח לקבל הצעת מחיר לטיול.'];
      if (name) lines.push('שם: ' + name);
      if (phone) lines.push('טלפון: ' + phone);
      if (destination) lines.push('יעד מבוקש: ' + destination);
      if (message) lines.push('הודעה: ' + message);

      var url = 'https://wa.me/' + WHATSAPP_PHONE + '?text=' + encodeURIComponent(lines.join('\n'));
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }

  // Scroll reveal
  var revealTargets = document.querySelectorAll(
    '.about-inner, .services-grid, .packages-grid, .testimonials-grid, .faq-inner, .contact-inner'
  );
  revealTargets.forEach(function (el) { el.classList.add('reveal'); });

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealTargets.forEach(function (el) { observer.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
