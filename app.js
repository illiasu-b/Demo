// app.js — dark mode, loader, scroll animations, testimonials, forms, mobile menu
(function () {
  try { if (localStorage.getItem('stylenest_theme') === 'dark') document.documentElement.setAttribute('data-theme', 'dark'); } catch (e) {}
})();

document.addEventListener('DOMContentLoaded', () => {
  // Theme toggle
  const themeBtns = document.querySelectorAll('[data-theme-toggle]');
  const syncIcon = () => themeBtns.forEach(b => b.textContent = document.documentElement.getAttribute('data-theme') === 'dark' ? '☀️' : '🌙');
  syncIcon();
  themeBtns.forEach(b => b.addEventListener('click', () => {
    const dark = document.documentElement.getAttribute('data-theme') !== 'dark';
    if (dark) document.documentElement.setAttribute('data-theme', 'dark'); else document.documentElement.removeAttribute('data-theme');
    try { localStorage.setItem('stylenest_theme', dark ? 'dark' : 'light'); } catch (e) {}
    syncIcon();
  }));

  // Mobile menu
  const menuBtn = document.getElementById('mobileMenuBtn');
  const nav = document.querySelector('.main-nav');
  if (menuBtn && nav) menuBtn.addEventListener('click', () => nav.classList.toggle('open'));

  // Bottom nav active state
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('[data-nav-link]').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });

  // Scroll fade-in
  const fades = document.querySelectorAll('.fade-in-on-scroll:not(.visible)');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    }), { threshold: 0.12 });
    fades.forEach(el => io.observe(el));
  } else fades.forEach(el => el.classList.add('visible'));

  // Testimonials
  const track = document.getElementById('testimonialTrack');
  const dotsBox = document.getElementById('testimonialDots');
  if (track && dotsBox) {
    const n = track.children.length;
    let cur = 0, timer;
    dotsBox.innerHTML = Array.from({ length: n }, (_, i) => `<button class="dot" aria-label="Slide ${i + 1}"></button>`).join('');
    const dots = dotsBox.querySelectorAll('.dot');
    const go = i => {
      cur = i;
      track.style.transform = `translateX(-${cur * 100}%)`;
      dots.forEach((d, k) => d.classList.toggle('active', k === cur));
    };
    const start = () => { clearInterval(timer); timer = setInterval(() => go((cur + 1) % n), 5000); };
    dots.forEach((d, i) => d.addEventListener('click', () => { go(i); start(); }));
    go(0); start();
  }

  // Newsletter
  const news = document.getElementById('newsletterForm');
  if (news) news.addEventListener('submit', e => { e.preventDefault(); news.reset(); showToast('Thanks for subscribing!'); });

  // Contact form: opens WhatsApp with the message (no backend needed)
  const contact = document.getElementById('contactForm');
  if (contact) contact.addEventListener('submit', e => {
    e.preventDefault();
    const v = id => document.getElementById(id).value.trim();
    const msg = `Hello StyleNest, I'm ${v('contactName')} (${v('contactEmail')}).\nSubject: ${v('contactSubject') || 'General enquiry'}\n\n${v('contactMessage')}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
    contact.reset();
    showToast('Opening WhatsApp to send your message…');
  });
});

window.addEventListener('load', () => {
  const l = document.getElementById('pageLoader');
  if (l) { l.classList.add('hide'); setTimeout(() => l.remove(), 500); }
});
