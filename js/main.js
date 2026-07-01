/**
 * Vitrine Digital — Main Script
 * Configure o número do WhatsApp abaixo (formato: código país + DDD + número, sem espaços)
 */
const CONFIG = {
  whatsappNumber: '5527999042844',
};

document.addEventListener('DOMContentLoaded', () => {
  initYear();
  initNavigation();
  initWhatsAppLinks();
  initContactForm();
  initScrollReveal();
});

function initYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

function initNavigation() {
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.querySelector('.nav__list');
  const links = document.querySelectorAll('.nav__link');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  links.forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

function initWhatsAppLinks() {
  document.querySelectorAll('[data-whatsapp]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const message = el.dataset.message || 'Olá! Quero saber mais sobre a Vitrine Digital.';
      openWhatsApp(message);
    });
  });
}

function openWhatsApp(message) {
  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encoded}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const fields = {
    nome: {
      el: document.getElementById('nome'),
      error: document.getElementById('nome-error'),
      validate: (v) => (v.trim().length >= 2 ? '' : 'Informe seu nome completo.'),
    },
    negocio: {
      el: document.getElementById('negocio'),
      error: document.getElementById('negocio-error'),
      validate: (v) => (v.trim().length >= 2 ? '' : 'Informe o nome do seu negócio.'),
    },
    whatsapp: {
      el: document.getElementById('whatsapp'),
      error: document.getElementById('whatsapp-error'),
      validate: (v) => {
        const digits = v.replace(/\D/g, '');
        return digits.length >= 10 ? '' : 'Informe um WhatsApp válido com DDD.';
      },
    },
  };

  Object.values(fields).forEach(({ el }) => {
    el.addEventListener('input', () => {
      el.classList.remove('is-error');
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    Object.entries(fields).forEach(([key, { el, error, validate }]) => {
      const msg = validate(el.value);
      error.textContent = msg;
      el.classList.toggle('is-error', !!msg);
      if (msg) valid = false;
    });

    if (!valid) return;

    const nome = fields.nome.el.value.trim();
    const negocio = fields.negocio.el.value.trim();
    const whatsapp = fields.whatsapp.el.value.trim();

    const message =
      `Olá! Meu nome é *${nome}*.\n` +
      `Tenho o negócio *${negocio}* e gostaria de um site.\n` +
      `Meu WhatsApp: ${whatsapp}`;

    openWhatsApp(message);
    form.reset();
  });
}

function initScrollReveal() {
  const sections = document.querySelectorAll('.section:not(.hero)');

  if (!('IntersectionObserver' in window)) return;

  sections.forEach((section) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(16px)';
    section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );

  sections.forEach((section) => observer.observe(section));
}
