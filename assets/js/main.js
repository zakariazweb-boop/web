/* Citadelle Gorges — interactions */
(function () {
  'use strict';
  const WHATSAPP = '212662548923';

  /* ---- Header scroll state ---- */
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- Mobile nav ---- */
  const burger = document.querySelector('.burger');
  const drawer = document.querySelector('.nav__drawer');
  const body = document.body;
  const closeNav = () => body.classList.remove('nav-open');
  if (burger) {
    burger.addEventListener('click', () => body.classList.toggle('nav-open'));
  }
  if (drawer) drawer.addEventListener('click', closeNav);
  document.querySelectorAll('.nav__links a').forEach(a => a.addEventListener('click', closeNav));
  window.addEventListener('keydown', e => { if (e.key === 'Escape') closeNav(); });

  /* ---- Scroll reveal ---- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* ---- Lightbox ---- */
  const figures = Array.from(document.querySelectorAll('[data-lightbox] figure img, img[data-zoom]'));
  if (figures.length) {
    const lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.innerHTML =
      '<button class="lightbox__close" aria-label="Close">&times;</button>' +
      '<button class="lightbox__nav prev" aria-label="Previous">&#8249;</button>' +
      '<img alt="">' +
      '<button class="lightbox__nav next" aria-label="Next">&#8250;</button>';
    document.body.appendChild(lb);
    const lbImg = lb.querySelector('img');
    let idx = 0;
    const show = i => { idx = (i + figures.length) % figures.length; lbImg.src = figures[idx].src; };
    const open = i => { show(i); lb.classList.add('open'); body.style.overflow = 'hidden'; };
    const close = () => { lb.classList.remove('open'); body.style.overflow = ''; };
    figures.forEach((img, i) => img.addEventListener('click', () => open(i)));
    lb.querySelector('.lightbox__close').addEventListener('click', close);
    lb.querySelector('.next').addEventListener('click', e => { e.stopPropagation(); show(idx + 1); });
    lb.querySelector('.prev').addEventListener('click', e => { e.stopPropagation(); show(idx - 1); });
    lb.addEventListener('click', e => { if (e.target === lb) close(); });
    window.addEventListener('keydown', e => {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') show(idx + 1);
      if (e.key === 'ArrowLeft') show(idx - 1);
    });
  }

  /* ---- Toast ---- */
  function toast(msg) {
    let t = document.querySelector('.toast');
    if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
    t.textContent = msg;
    requestAnimationFrame(() => t.classList.add('show'));
    setTimeout(() => t.classList.remove('show'), 4200);
  }

  /* ---- Forms -> WhatsApp (no backend needed) ---- */
  document.querySelectorAll('form[data-wa]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const data = new FormData(form);
      const kind = form.getAttribute('data-wa');
      let lines = [];
      if (kind === 'booking') {
        lines.push('*New booking request — Citadelle Gorges*');
        lines.push('Name: ' + (data.get('name') || ''));
        lines.push('Email: ' + (data.get('email') || ''));
        lines.push('Phone: ' + (data.get('phone') || ''));
        lines.push('Country: ' + (data.get('country') || ''));
        lines.push('Check-in: ' + (data.get('checkin') || ''));
        lines.push('Check-out: ' + (data.get('checkout') || ''));
        lines.push('Guests: ' + (data.get('guests') || ''));
        lines.push('Room type: ' + (data.get('room') || ''));
        lines.push('Board: ' + (data.get('board') || ''));
        if (data.get('message')) lines.push('Notes: ' + data.get('message'));
      } else {
        lines.push('*Message from citadelle-gorges.com*');
        lines.push('Name: ' + (data.get('name') || ''));
        lines.push('Email: ' + (data.get('email') || ''));
        if (data.get('phone')) lines.push('Phone: ' + data.get('phone'));
        lines.push('Message: ' + (data.get('message') || ''));
      }
      const url = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(lines.join('\n'));
      window.open(url, '_blank');
      toast('Opening WhatsApp to send your request…');
      form.reset();
    });
  });

  /* ---- Footer year ---- */
  const yr = document.querySelector('[data-year]');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---- Booking: default dates & min ---- */
  const ci = document.querySelector('input[name="checkin"]');
  const co = document.querySelector('input[name="checkout"]');
  if (ci && co) {
    const today = new Date().toISOString().split('T')[0];
    ci.min = today; co.min = today;
    ci.addEventListener('change', () => { co.min = ci.value || today; });
  }
})();
