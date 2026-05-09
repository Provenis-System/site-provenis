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

function cardMarkup(project: ProjectListItem, index: number) {
  const num = String(index + 1).padStart(2, '0');
  return `
    <article class="project-card">
      <div class="project-title-row">
        <span class="project-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
          </svg>
        </span>
        <h3>${project.title}</h3>
        ${project.slug ? `<a href="/trabalhos/${project.slug}" class="project-link" aria-label="Ver ${project.title}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
        </a>` : ''}
      </div>
    </article>
  `;
}

const BOT_SLUGS = new Set(['bots', 'bots-discord', 'bots discord', 'discord']);

function categoryLabel(slug: string, name: string): string {
  const map: Record<string, string> = {
    sites: 'Plataformas Web Corporativas',
    sistemas: 'Plataformas Web Corporativas',
    'plataformas-web': 'Plataformas Web Corporativas',
    automacoes: 'Automação Inteligente',
    'automações': 'Automação Inteligente',
    automacao: 'Automação Inteligente',
    cloud: 'Infraestrutura e Cloud',
    infra: 'Infraestrutura e Cloud',
    'infraestrutura': 'Infraestrutura e Cloud',
    devops: 'Infraestrutura e Cloud',
  };
  return map[slug.toLowerCase()] ?? map[name.toLowerCase()] ?? name;
}

function groupByCategory(projects: ProjectListItem[]) {
  const order = [
    'Plataformas Web Corporativas',
    'Automação Inteligente',
    'Infraestrutura e Cloud',
  ];
  const map = new Map<string, { label: string; items: ProjectListItem[] }>();

  for (const p of projects) {
    if (BOT_SLUGS.has(p.category.slug.toLowerCase())) continue;
    const label = categoryLabel(p.category.slug, p.category.name);
    if (!map.has(label)) {
      map.set(label, { label, items: [] });
    }
    map.get(label)!.items.push(p);
  }

  return [...map.entries()].sort(([a], [b]) => {
    const ai = order.indexOf(a);
    const bi = order.indexOf(b);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });
}

const CATEGORY_META: Record<string, { desc: string; label: string; features: { title: string; desc: string; icon: string }[]; visual: string }> = {
  'Plataformas Web Corporativas': {
    label: 'Presença digital',
    desc: 'Sites institucionais, e-commerces e plataformas digitais desenvolvidos para operar em produção com alta performance.',
    features: [
      { title: 'Design que converte', desc: 'UX/UI focado em resultados, não apenas beleza', icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>` },
      { title: 'Performance brutal', desc: 'Carregamento ultrarrápido e Core Web Vitals perfeitos', icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14H12L11 22L21 10H12L13 2Z"/></svg>` },
      { title: 'Responsivo de verdade', desc: 'Experiência perfeita em qualquer dispositivo', icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18H12.01"/></svg>` },
    ],
    visual: `
      <div class="showcase-mockup browser-mockup">
        <div class="browser-header">
          <div class="browser-dots"><span></span><span></span><span></span></div>
          <div class="browser-url">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M10 6C10 8.209 8.209 10 6 10C3.791 10 2 8.209 2 6C2 3.791 3.791 2 6 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
            <span>seunegocio.com.br</span>
          </div>
        </div>
        <div class="browser-content">
          <div class="website-scroll">
            <div class="mock-section hero-mock">
              <div class="mock-nav"><div class="mock-logo"></div><div class="mock-menu"><span></span><span></span><span></span></div></div>
              <div class="mock-hero-content"><div class="mock-title"></div><div class="mock-subtitle"></div><div class="mock-buttons"><div class="mock-btn primary"></div><div class="mock-btn secondary"></div></div></div>
            </div>
            <div class="mock-section cards-mock"><div class="mock-heading"></div><div class="mock-cards"><div class="mock-card"></div><div class="mock-card"></div><div class="mock-card"></div></div></div>
            <div class="mock-section content-mock"><div class="mock-text-block"></div><div class="mock-image"></div></div>
          </div>
        </div>
      </div>`,
  },
  'Automação Inteligente': {
    label: 'Eficiência operacional',
    desc: 'Fluxos automatizados e integrações entre sistemas que rodam 24/7 sem intervenção manual — liberando tempo para o que importa.',
    features: [
      { title: 'Integrações sob medida', desc: 'APIs, webhooks e sistemas conectados de ponta a ponta', icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg>` },
      { title: 'Execução contínua', desc: 'Processos rodando 24/7, sem falha humana', icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>` },
      { title: 'Notificações e alertas', desc: 'Dashboards e relatórios automáticos em tempo real', icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>` },
    ],
    visual: `
      <div class="showcase-mockup terminal-mockup">
        <div class="terminal-header">
          <div class="browser-dots"><span></span><span></span><span></span></div>
          <span class="terminal-title">automation.log</span>
        </div>
        <div class="terminal-body">
          <div class="terminal-line"><span class="t-green">✓</span> <span class="t-gray">[09:14:02]</span> Pedido #4821 processado</div>
          <div class="terminal-line"><span class="t-green">✓</span> <span class="t-gray">[09:14:03]</span> E-mail de confirmação enviado</div>
          <div class="terminal-line"><span class="t-green">✓</span> <span class="t-gray">[09:14:04]</span> Estoque atualizado → 47 un</div>
          <div class="terminal-line"><span class="t-gold">→</span> <span class="t-gray">[09:14:05]</span> Webhook disparado</div>
          <div class="terminal-line"><span class="t-green">✓</span> <span class="t-gray">[09:14:06]</span> CRM sincronizado</div>
          <div class="terminal-line terminal-line-blink"><span class="t-gold">_</span></div>
        </div>
        <div class="terminal-stats">
          <div class="t-stat"><span class="t-stat-val">99.9%</span><span class="t-stat-label">uptime</span></div>
          <div class="t-stat"><span class="t-stat-val">24/7</span><span class="t-stat-label">execução</span></div>
          <div class="t-stat"><span class="t-stat-val">0</span><span class="t-stat-label">falhas</span></div>
        </div>
      </div>`,
  },
  'Infraestrutura e Cloud': {
    label: 'Ambiente de produção',
    desc: 'Arquitetura de servidores, deploys em cloud e ambientes configurados para disponibilidade máxima e custo otimizado.',
    features: [
      { title: 'Alta disponibilidade', desc: 'Arquitetura tolerante a falhas com redundância', icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>` },
      { title: 'Deploy automatizado', desc: 'CI/CD com rollback e ambientes isolados', icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>` },
      { title: 'Monitoramento ativo', desc: 'Alertas, logs e métricas em tempo real', icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>` },
    ],
    visual: `
      <div class="showcase-mockup infra-mockup">
        <div class="infra-header">
          <div class="browser-dots"><span></span><span></span><span></span></div>
          <span class="terminal-title">infrastructure</span>
        </div>
        <div class="infra-body">
          <div class="infra-node infra-node-main">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>
            <span>Cloud</span>
            <span class="infra-badge">Online</span>
          </div>
          <div class="infra-connectors">
            <div class="infra-line"></div>
            <div class="infra-line"></div>
            <div class="infra-line"></div>
          </div>
          <div class="infra-nodes-row">
            <div class="infra-node">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/></svg>
              <span>Web</span>
            </div>
            <div class="infra-node">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></ellipse></svg>
              <span>DB</span>
            </div>
            <div class="infra-node">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
              <span>API</span>
            </div>
          </div>
        </div>
        <div class="terminal-stats">
          <div class="t-stat"><span class="t-stat-val">99.9%</span><span class="t-stat-label">uptime</span></div>
          <div class="t-stat"><span class="t-stat-val">&lt;50ms</span><span class="t-stat-label">latência</span></div>
          <div class="t-stat"><span class="t-stat-val">auto</span><span class="t-stat-label">escala</span></div>
        </div>
      </div>`,
  },
};

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
        ([, group]) => {
          const meta = CATEGORY_META[group.label] ?? { label: '', desc: '', features: [], visual: '' };
          const count = group.items.length;
          return `
            <div class="project-group">
              <div class="group-intro">
                <div class="section-label">${meta.label}</div>
                <h2>${group.label}</h2>
                <p>${meta.desc}</p>
              </div>
              <div class="showcase-split">
                <div class="showcase-split-cards">
                  ${group.items.map((p, i) => cardMarkup(p, i)).join('')}
                </div>
                <div class="showcase-split-visual">${meta.visual}</div>
              </div>
            </div>
          `;
        }
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
