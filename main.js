// ═══════════════════════════════════════════════
//   ANKAH FARMS — Global JS
// ═══════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

  // ── Nav shrink on scroll ──
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    nav && nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  // ── Active nav link ──
  const navLinks = document.querySelectorAll('.nav-links a');
  const current = location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(a => {
    const href = a.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // ── Mobile menu ──
  const toggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileClose = document.querySelector('.mobile-menu-close');
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => mobileMenu.classList.add('open'));
    mobileClose && mobileClose.addEventListener('click', () => mobileMenu.classList.remove('open'));
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
  }

  // ── Intersection Observer for scroll-in animations ──
  const observed = document.querySelectorAll('[data-aos]');
  if (observed.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.animationPlayState = 'running';
          e.target.classList.add('aos-done');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    observed.forEach(el => {
      el.style.animationPlayState = 'paused';
      io.observe(el);
    });
  }

  // ── Counter animation ──
  const counters = document.querySelectorAll('[data-count]');
  const countIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseInt(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      let start = 0;
      const dur = 1800;
      const step = timestamp => {
        if (!start) start = timestamp;
        const prog = Math.min((timestamp - start) / dur, 1);
        const eased = 1 - Math.pow(1 - prog, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if (prog < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      countIO.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => countIO.observe(c));

});
