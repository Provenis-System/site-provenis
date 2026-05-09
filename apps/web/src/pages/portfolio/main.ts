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
  return `
    <article class="project-card">
      <h3>${project.title}</h3>
      <p>${project.description}</p>
    </article>
  `;
}

function categoryLabel(slug: string, name: string): string {
  const map: Record<string, string> = {
    sites: 'Sites',
    sistemas: 'Sistemas',
    automacoes: 'Automações',
    'automações': 'Automações',
    'bots-discord': 'Bots Discord',
    bots: 'Bots Discord',
    'bots discord': 'Bots Discord',
  };
  return map[slug.toLowerCase()] ?? map[name.toLowerCase()] ?? name;
}

function groupByCategory(projects: ProjectListItem[]) {
  const order = ['sites', 'sistemas', 'automacoes', 'automações', 'bots-discord', 'bots'];
  const map = new Map<string, { label: string; items: ProjectListItem[] }>();

  for (const p of projects) {
    const key = p.category.slug;
    if (!map.has(key)) {
      map.set(key, { label: categoryLabel(p.category.slug, p.category.name), items: [] });
    }
    map.get(key)!.items.push(p);
  }

  return [...map.entries()].sort(([a], [b]) => {
    const ai = order.indexOf(a.toLowerCase());
    const bi = order.indexOf(b.toLowerCase());
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });
}

async function loadProjects() {
  if (!projectsGrid) return;

  try {
    const projects = await projectsAPI.getProjects();

    if (projectCountEl) {
      projectCountEl.textContent = String(projects.length);
    }

    if (projects.length === 0) {
      projectsGrid.innerHTML = `
        <article class="project-card empty-card">
          <h3>Nenhum projeto publicado ainda</h3>
          <p>Assim que os projetos forem cadastrados, eles aparecem aqui automaticamente.</p>
        </article>
      `;
      return;
    }

    const groups = groupByCategory(projects);

    projectsGrid.innerHTML = groups
      .map(
        ([, group]) => `
          <div class="project-group">
            <div class="project-group-header">
              <span class="project-group-title">${group.label}</span>
              <span class="project-group-count">${group.items.length} projeto${group.items.length !== 1 ? 's' : ''}</span>
            </div>
            <div class="projects-group-grid">
              ${group.items.map(cardMarkup).join('')}
            </div>
          </div>
        `
      )
      .join('');

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
      { threshold: 0.15 }
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
