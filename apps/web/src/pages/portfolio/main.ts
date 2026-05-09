import { projectsAPI, type ProjectListItem } from '../../lib/api.js';

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

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

const projectCountEl = document.getElementById('project-count');
const projectsGrid = document.getElementById('projects-grid');

function cardMarkup(project: ProjectListItem) {
  const statsMarkup = project.stats.length
    ? `
      <div class="project-stats">
        ${project.stats
          .slice(0, 2)
          .map(
            (stat) => `
              <div class="stat-chip">
                <strong>${stat.value}</strong>
                <span>${stat.label}</span>
              </div>
            `
          )
          .join('')}
      </div>
    `
    : '';

  const tagsMarkup = project.tags.length
    ? `
      <div class="project-tags">
        ${project.tags
          .slice(0, 3)
          .map((tag) => `<span>${tag}</span>`)
          .join('')}
      </div>
    `
    : '';

  return `
    <article class="project-card">
      <div class="project-topline">
        <span class="project-category">${project.category.name}</span>
        ${project.featured ? '<span class="project-badge">Destaque</span>' : ''}
      </div>
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      ${tagsMarkup}
      ${statsMarkup}
    </article>
  `;
}

async function loadProjects() {
  if (!projectsGrid) return;

  try {
    const projects = await projectsAPI.getProjects();
    const visibleProjects = projects.slice(0, 6);

    if (projectCountEl) {
      projectCountEl.textContent = String(projects.length);
    }

    if (visibleProjects.length === 0) {
      projectsGrid.innerHTML = `
        <article class="project-card empty-card">
          <div class="project-category">Sem projetos</div>
          <h3>Nenhum projeto publicado ainda</h3>
          <p>Assim que os projetos forem cadastrados, eles aparecem aqui automaticamente.</p>
        </article>
      `;
      return;
    }

    projectsGrid.innerHTML = visibleProjects.map(cardMarkup).join('');

    document.querySelectorAll<HTMLElement>('.project-card').forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(24px)';
      card.style.transition = `opacity 0.55s ease ${index * 70}ms, transform 0.55s ease ${index * 70}ms`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            observer.unobserve(element);
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll<HTMLElement>('.project-card').forEach((card) => observer.observe(card));
  } catch (error) {
    console.error('Erro ao carregar projetos', error);
    if (projectCountEl) {
      projectCountEl.textContent = '-';
    }
    projectsGrid.innerHTML = `
      <article class="project-card empty-card">
        <div class="project-category">Indisponível</div>
        <h3>Não foi possível carregar os projetos</h3>
        <p>Tente novamente em instantes ou fale com a equipe para ver os trabalhos mais recentes.</p>
      </article>
    `;
  }
}

void loadProjects();
