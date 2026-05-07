import { projectsAPI, type ProjectListItem } from '../../lib/api.js';

// ── Mobile menu ─────────────────────────────────────────────────
const menuToggle = document.querySelector('.menu-toggle') as HTMLElement | null;
const navLinks = document.querySelector('.nav-links') as HTMLElement | null;

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const spans = menuToggle.querySelectorAll('span') as NodeListOf<HTMLElement>;
    if (navLinks.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translateY(8px)';
      spans[1].style.opacity = '0';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
    }
  });
}

// ── Ano do footer ───────────────────────────────────────────────
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// ── Count-up animado ────────────────────────────────────────────
function animateCountUp(el: HTMLElement) {
  const target = parseInt(el.dataset.target ?? '0', 10);
  const duration = 1400;
  const start = performance.now();

  function update(now: number) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = String(Math.round(eased * target));
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const countUpEls = document.querySelectorAll<HTMLElement>('.count-up');
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCountUp(entry.target as HTMLElement);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);
countUpEls.forEach(el => counterObserver.observe(el));

// ── Animação de entrada dos cards ───────────────────────────────
const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        (entry.target as HTMLElement).style.opacity = '1';
        (entry.target as HTMLElement).style.transform = 'translateY(0)';
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

function observeFade(el: HTMLElement, delay = 0) {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`;
  fadeObserver.observe(el);
}

document.querySelectorAll<HTMLElement>(
  '.number-card, .spec-card, .process-step, .stack-group, .about-card'
).forEach((el, i) => observeFade(el, i * 80));

// ── Carrega projetos em destaque via API ─────────────────────────
async function loadFeaturedProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  try {
    const projects = await projectsAPI.getProjects({ featured: true });
    const shown = projects.slice(0, 6);

    if (shown.length === 0) {
      // Tenta carregar todos (sem filtro de featured) caso nenhum esteja marcado
      const all = await projectsAPI.getProjects();
      renderProjects(grid, all.slice(0, 6));
      return;
    }

    renderProjects(grid, shown);
  } catch {
    grid.innerHTML = `
      <p style="color:var(--gray-light);text-align:center;grid-column:1/-1;padding:4rem 0;">
        Não foi possível carregar os projetos agora.
        <br>
        <a href="/pages/trabalhos/index.html" style="color:var(--gold)">Ver todos os projetos →</a>
      </p>`;
  }
}

function thumbClass(categorySlug: string) {
  if (categorySlug === 'bots') return 'bot';
  if (categorySlug === 'automations' || categorySlug === 'automacoes') return 'automation';
  return '';
}

function renderProjects(grid: HTMLElement, projects: ProjectListItem[]) {
  grid.innerHTML = projects.map(p => `
    <article class="project-card">
      <div class="project-thumb ${thumbClass(p.category.slug)}"></div>
      <div class="project-body">
        <div class="project-tags-row">
          ${p.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}
        </div>
        <h3>${p.title}</h3>
        <p>${p.description}</p>
      </div>
    </article>
  `).join('');

  grid.querySelectorAll<HTMLElement>('.project-card').forEach((el, i) => observeFade(el, i * 100));
}

loadFeaturedProjects();
