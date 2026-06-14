// ─── Page Loader ───────────────────────────────────────
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.querySelector('.page-loader');
    if (loader) loader.classList.add('hidden');
  }, 900);
});

// ─── Navbar Scroll Effect ───────────────────────────────
const navbar = document.querySelector('.navbar');
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  if (navbar) {
    navbar.classList.toggle('scrolled', scrollY > 40);
  }

  if (backToTop) {
    backToTop.classList.toggle('visible', scrollY > 400);
  }
});

// ─── Back to Top ───────────────────────────────────────
if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ─── Hamburger / Mobile Menu ────────────────────────────
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ─── Active Nav Link ────────────────────────────────────
function setActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

setActiveNav();

// ─── Intersection Observer (AOS) ────────────────────────
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('aos-animate');
      }, parseInt(delay));
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));

// ─── FAQ Accordion ──────────────────────────────────────
document.querySelectorAll('.faq-item').forEach(item => {
  const question = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');

  if (!question || !answer) return;

  question.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');

    document.querySelectorAll('.faq-item').forEach(other => {
      other.classList.remove('open');
      const otherAnswer = other.querySelector('.faq-answer');
      if (otherAnswer) otherAnswer.classList.remove('open');
    });

    if (!isOpen) {
      item.classList.add('open');
      answer.classList.add('open');
    }
  });
});

// ─── Contact Form ───────────────────────────────────────
const contactForm = document.querySelector('#contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = contactForm.querySelector('.form-btn');
    const successMsg = document.querySelector('.success-msg');

    btn.textContent = 'Sending…';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = 'Message Sent ✓';
      btn.style.background = 'linear-gradient(135deg, #43e8d8 0%, #28c840 100%)';

      if (successMsg) successMsg.classList.add('show');

      contactForm.reset();

      setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.disabled = false;
        btn.style.background = '';
        if (successMsg) successMsg.classList.remove('show');
      }, 4000);
    }, 1500);
  });
}

// ─── Counter Animation ──────────────────────────────────
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;

  const update = () => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current) + (el.dataset.suffix || '');
    if (current < target) requestAnimationFrame(update);
  };

  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('[data-target]').forEach(animateCounter);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.hero-stats, .stats-row').forEach(el => counterObserver.observe(el));

// ─── Pricing Toggle ─────────────────────────────────────
const pricingToggle = document.querySelector('#pricing-toggle');

if (pricingToggle) {
  pricingToggle.addEventListener('change', () => {
    const monthly = document.querySelectorAll('.price-monthly');
    const yearly = document.querySelectorAll('.price-yearly');
    const isYearly = pricingToggle.checked;

    monthly.forEach(el => el.style.display = isYearly ? 'none' : '');
    yearly.forEach(el => el.style.display = isYearly ? '' : 'none');

    const label = document.querySelector('.toggle-label');
    if (label) label.textContent = isYearly ? 'Billed Annually (Save 20%)' : 'Billed Monthly';
  });
}

// ─── Smooth reveal on page load ─────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '0';
  requestAnimationFrame(() => {
    document.body.style.transition = 'opacity 0.4s ease';
    document.body.style.opacity = '1';
  });
});
