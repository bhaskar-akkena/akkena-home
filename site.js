'use strict';
// Progressive enhancements: content and navigation remain available without JS.
if (window.lucide) window.lucide.createIcons();
document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const header = document.querySelector('.site-header');
let scrollQueued = false;
function updateHeader() {
  header?.classList.toggle('is-scrolled', window.scrollY > 12);
  scrollQueued = false;
}
updateHeader();
window.addEventListener('scroll', () => {
  if (!scrollQueued) { scrollQueued = true; requestAnimationFrame(updateHeader); }
}, { passive: true });
window.addEventListener('pageshow', updateHeader);

const toast = document.querySelector('.toast');
let toastTimer;
function showToast(message) {
  if (!toast) return;
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add('visible');
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 4500);
}
async function copyEmail(email) {
  if (window.isSecureContext && navigator.clipboard?.writeText) {
    try { await navigator.clipboard.writeText(email); return; } catch (_) { /* Try the local-file fallback. */ }
  }
  const previousFocus = document.activeElement;
  const selection = document.getSelection();
  const ranges = selection ? Array.from({ length: selection.rangeCount }, (_, i) => selection.getRangeAt(i).cloneRange()) : [];
  const field = document.createElement('textarea');
  field.value = email;
  field.setAttribute('readonly', '');
  field.style.cssText = 'position:fixed;left:-9999px;top:0;opacity:0';
  document.body.append(field);
  field.select();
  try {
    if (!document.execCommand('copy')) throw new Error('Clipboard unavailable');
  } finally {
    field.remove();
    previousFocus?.focus({ preventScroll: true });
    if (selection) { selection.removeAllRanges(); ranges.forEach(range => selection.addRange(range)); }
  }
}
document.querySelectorAll('[data-copy-email]').forEach(button => {
  let resetTimer;
  const label = button.querySelector('[data-copy-label]');
  button.addEventListener('click', async () => {
    clearTimeout(resetTimer);
    button.disabled = true;
    button.setAttribute('aria-busy', 'true');
    try {
      await copyEmail(button.dataset.copyEmail);
      button.dataset.state = 'copied';
      if (label) label.textContent = 'Copied';
      showToast('Email copied to clipboard.');
      resetTimer = setTimeout(() => {
        delete button.dataset.state;
        if (label) label.textContent = 'Copy email';
      }, 2500);
    } catch (_) {
      delete button.dataset.state;
      if (label) label.textContent = 'Copy email';
      showToast('Couldn’t copy automatically. Select the email address to copy it.');
    } finally {
      button.disabled = false;
      button.removeAttribute('aria-busy');
    }
  });
});

const filters = [...document.querySelectorAll('[data-filter]')];
if (filters.length) document.querySelector('.filters')?.removeAttribute('hidden');
const cards = [...document.querySelectorAll('[data-category]')];
const filterStatus = document.getElementById('filter-status');
const grid = document.querySelector('.catalog .projects-grid');
filters.forEach(button => button.addEventListener('click', () => {
  if (button.getAttribute('aria-pressed') === 'true') return;
  const selected = button.dataset.filter;
  filters.forEach(filter => {
    const active = filter === button;
    filter.classList.toggle('active', active);
    filter.setAttribute('aria-pressed', String(active));
  });
  let count = 0;
  cards.forEach(card => {
    card.getAnimations?.().forEach(animation => animation.cancel());
    card.hidden = selected !== 'all' && card.dataset.category !== selected;
    if (!card.hidden) {
      if (!reducedMotion.matches && typeof card.animate === 'function') {
        card.animate([{ opacity: .35, transform: 'translateY(7px)' }, { opacity: 1, transform: 'translateY(0)' }], {
          duration: 220, delay: Math.min(count, 3) * 25, easing: 'cubic-bezier(.2,.75,.25,1)',
        });
      }
      count++;
    }
  });
  grid?.classList.toggle('is-filtered', selected !== 'all');
  if (filterStatus) filterStatus.textContent = `Showing ${count} ${count === 1 ? 'project' : 'projects'}.`;
}));
// Arrow-key shortcuts supplement the normal Tab order without trapping focus.
filters.forEach((button, index) => button.addEventListener('keydown', event => {
  let target;
  if (event.key === 'ArrowRight') target = (index + 1) % filters.length;
  if (event.key === 'ArrowLeft') target = (index - 1 + filters.length) % filters.length;
  if (event.key === 'Home') target = 0;
  if (event.key === 'End') target = filters.length - 1;
  if (target === undefined) return;
  event.preventDefault();
  filters[target].focus();
  filters[target].click();
}));
reducedMotion.addEventListener('change', event => {
  if (event.matches) cards.forEach(card => card.getAnimations?.().forEach(animation => animation.cancel()));
});
