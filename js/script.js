const header = document.querySelector('.header');
const menuButton = document.querySelector('.menu');
const mobileNav = document.querySelector('.mobile-nav');

const syncHeader = () => header.classList.toggle('scrolled', window.scrollY > 18);
syncHeader();
window.addEventListener('scroll', syncHeader, { passive: true });

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  menuButton.classList.toggle('open', !open);
  mobileNav.hidden = open;
});

mobileNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.classList.remove('open');
  mobileNav.hidden = true;
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.querySelectorAll('.faq details').forEach(item => {
  item.addEventListener('toggle', () => {
    if (!item.open) return;
    document.querySelectorAll('.faq details').forEach(other => {
      if (other !== item) other.open = false;
    });
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();
