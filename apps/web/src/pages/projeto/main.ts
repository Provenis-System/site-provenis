// ── Image assets ─────────────────────────────────────────────────────────────
const _prevenaoImgs = import.meta.glob('./imagens_prevenção/*.png', { eager: true, query: '?url', import: 'default' });
const GALLERY_PREVENCAO: string[] = Object.values(_prevenaoImgs) as string[];

// ── Types ─────────────────────────────────────────────────────────────────────

interface ProjectSection {
  label: string;
  title: string;
  desc: string;
  items?: string[];
  visual: string;
}

interface ProjectData {
  name: string;
  category: string;
  tagline: string;
  desc: string;
  tags: string[];
  heroVisual: string;
  gallery?: string[];
  sections: ProjectSection[];
  ctaTitle: string;
  ctaDesc: string;
}

// ── Mockup HTML helpers ────────────────────────────────────────────────────────

const DASH_MOCKUP = `
<div class="proj-mockup dash-mockup">
  <div class="mockup-bar">
    <div class="mockup-dots"><span></span><span></span><span></span></div>
    <span class="mockup-title">Sistema PP — Dashboard</span>
  </div>
  <div class="dash-body">
    <div class="dash-kpis">
      <div class="dash-kpi">
        <span class="dash-kpi-val gold">R$ 2,3M</span>
        <span class="dash-kpi-label">Recuperado</span>
      </div>
      <div class="dash-kpi">
        <span class="dash-kpi-val blue">47</span>
        <span class="dash-kpi-label">Filiais ativas</span>
      </div>
      <div class="dash-kpi">
        <span class="dash-kpi-val green">98,4%</span>
        <span class="dash-kpi-label">Conformidade</span>
      </div>
      <div class="dash-kpi">
        <span class="dash-kpi-val">124</span>
        <span class="dash-kpi-label">Ocorrências</span>
      </div>
    </div>
    <div class="dash-chart-area">
      <div class="dash-chart-label">Recuperados por mês</div>
      <div class="dash-bars">
        <div class="dash-bar-item"></div>
        <div class="dash-bar-item"></div>
        <div class="dash-bar-item"></div>
        <div class="dash-bar-item"></div>
        <div class="dash-bar-item"></div>
        <div class="dash-bar-item"></div>
        <div class="dash-bar-item"></div>
      </div>
    </div>
  </div>
</div>`;

const RISK_MOCKUP = `
<div class="proj-mockup risk-mockup">
  <div class="mockup-bar">
    <div class="mockup-dots"><span></span><span></span><span></span></div>
    <span class="mockup-title">Monitoramento de Riscos</span>
  </div>
  <div class="risk-body">
    <div class="risk-item">
      <div class="risk-dot red"></div>
      <div class="risk-text">
        <div class="risk-title">Falta de rastreabilidade</div>
        <div class="risk-sub">Processos sem registro centralizado</div>
      </div>
      <span class="risk-badge critical">Crítico</span>
    </div>
    <div class="risk-item">
      <div class="risk-dot red"></div>
      <div class="risk-text">
        <div class="risk-title">Controle manual de dados</div>
        <div class="risk-sub">Planilhas desatualizadas e descentralizadas</div>
      </div>
      <span class="risk-badge critical">Crítico</span>
    </div>
    <div class="risk-item">
      <div class="risk-dot yellow"></div>
      <div class="risk-text">
        <div class="risk-title">Sem indicadores em tempo real</div>
        <div class="risk-sub">Decisões baseadas em dados defasados</div>
      </div>
      <span class="risk-badge warn">Alto</span>
    </div>
    <div class="risk-item">
      <div class="risk-dot yellow"></div>
      <div class="risk-text">
        <div class="risk-title">Falhas operacionais recorrentes</div>
        <div class="risk-sub">Sem protocolo padronizado entre filiais</div>
      </div>
      <span class="risk-badge warn">Alto</span>
    </div>
  </div>
</div>`;

const HUB_MOCKUP = `
<div class="proj-mockup hub-mockup">
  <div class="mockup-bar">
    <div class="mockup-dots"><span></span><span></span><span></span></div>
    <span class="mockup-title">Plataforma Centralizada</span>
  </div>
  <div class="hub-body">
    <div class="hub-center">SISTEMA<br/>PP</div>
    <div class="hub-nodes">
      <div class="hub-node"><div class="hub-node-icon">📊</div>Dashboard</div>
      <div class="hub-node"><div class="hub-node-icon">👥</div>Usuários</div>
      <div class="hub-node"><div class="hub-node-icon">📝</div>Simulados</div>
      <div class="hub-node"><div class="hub-node-icon">💰</div>Recuperados</div>
      <div class="hub-node"><div class="hub-node-icon">🔍</div>Sindicâncias</div>
      <div class="hub-node"><div class="hub-node-icon">📡</div>Analytics</div>
    </div>
  </div>
</div>`;

const ADMIN_MOCKUP = `
<div class="proj-mockup admin-mockup">
  <div class="mockup-bar">
    <div class="mockup-dots"><span></span><span></span><span></span></div>
    <span class="mockup-title">Gestão de Usuários</span>
  </div>
  <div class="admin-body">
    <div class="admin-row">
      <div class="admin-avatar admin">AD</div>
      <div><div class="admin-info-name">Administrador Geral</div><div class="admin-info-role">Acesso total ao sistema</div></div>
      <span class="admin-badge gold">Admin</span>
    </div>
    <div class="admin-divider"></div>
    <div class="admin-row indent1">
      <div class="admin-avatar manager">GR</div>
      <div><div class="admin-info-name">Gerente Regional</div><div class="admin-info-role">Sul — 12 filiais</div></div>
      <span class="admin-badge blue">Gerente</span>
    </div>
    <div class="admin-row indent2">
      <div class="admin-avatar user">OP</div>
      <div><div class="admin-info-name">Operador Filial 04</div><div class="admin-info-role">Curitiba — PR</div></div>
      <span class="admin-badge gray">Operador</span>
    </div>
    <div class="admin-row indent2">
      <div class="admin-avatar user">OP</div>
      <div><div class="admin-info-name">Operador Filial 07</div><div class="admin-info-role">Florianópolis — SC</div></div>
      <span class="admin-badge gray">Operador</span>
    </div>
    <div class="admin-divider"></div>
    <div class="admin-row indent1">
      <div class="admin-avatar manager">GR</div>
      <div><div class="admin-info-name">Gerente Regional</div><div class="admin-info-role">Nordeste — 9 filiais</div></div>
      <span class="admin-badge blue">Gerente</span>
    </div>
  </div>
</div>`;

const CHART_MOCKUP = `
<div class="proj-mockup chart-mockup">
  <div class="mockup-bar">
    <div class="mockup-dots"><span></span><span></span><span></span></div>
    <span class="mockup-title">Desempenho — Simulados</span>
  </div>
  <div class="chart-body">
    <div class="chart-header">
      <span class="chart-title">Aproveitamento por semana</span>
      <span class="chart-period">Últimas 5 semanas</span>
    </div>
    <div class="chart-legend">
      <div class="legend-item"><div class="legend-dot blue"></div>Acertos</div>
      <div class="legend-item"><div class="legend-dot gold"></div>Meta</div>
    </div>
    <div class="chart-bars-group">
      <div class="bar-pair"><div class="bar-col a"></div><div class="bar-col b"></div></div>
      <div class="bar-pair"><div class="bar-col a"></div><div class="bar-col b"></div></div>
      <div class="bar-pair"><div class="bar-col a"></div><div class="bar-col b"></div></div>
      <div class="bar-pair"><div class="bar-col a"></div><div class="bar-col b"></div></div>
      <div class="bar-pair"><div class="bar-col a"></div><div class="bar-col b"></div></div>
    </div>
    <div class="chart-xaxis">
      <span>Sem 1</span><span>Sem 2</span><span>Sem 3</span><span>Sem 4</span><span>Sem 5</span>
    </div>
    <div class="chart-stats">
      <div class="chart-stat"><span class="chart-stat-val">87%</span><span class="chart-stat-label">Aprovação</span></div>
      <div class="chart-stat"><span class="chart-stat-val">312</span><span class="chart-stat-label">Realizados</span></div>
      <div class="chart-stat"><span class="chart-stat-val">98%</span><span class="chart-stat-label">Cobertura</span></div>
    </div>
  </div>
</div>`;

const FINANCE_MOCKUP = `
<div class="proj-mockup finance-mockup">
  <div class="mockup-bar">
    <div class="mockup-dots"><span></span><span></span><span></span></div>
    <span class="mockup-title">Controle de Recuperados</span>
  </div>
  <div class="finance-body">
    <div class="finance-main">
      <div class="finance-label">Total recuperado — 2026</div>
      <div class="finance-value">R$ 2.347.890</div>
      <div class="finance-delta">↑ 23,4% vs ano anterior</div>
    </div>
    <div class="finance-rows">
      <div class="finance-row">
        <span class="finance-row-label">Filial São Paulo</span>
        <span class="finance-row-val up">R$ 487.200</span>
      </div>
      <div class="finance-row">
        <span class="finance-row-label">Filial Rio de Janeiro</span>
        <span class="finance-row-val up">R$ 362.750</span>
      </div>
      <div class="finance-row">
        <span class="finance-row-label">Filial Curitiba</span>
        <span class="finance-row-val up">R$ 298.100</span>
      </div>
      <div class="finance-row">
        <span class="finance-row-label">Demais filiais</span>
        <span class="finance-row-val">R$ 1.199.840</span>
      </div>
    </div>
  </div>
</div>`;

const AUDIT_MOCKUP = `
<div class="proj-mockup audit-mockup">
  <div class="mockup-bar">
    <div class="mockup-dots"><span></span><span></span><span></span></div>
    <span class="mockup-title">Log de Auditoria</span>
  </div>
  <div class="audit-body">
    <div class="log-line"><span class="log-time">09:14:32</span><span class="log-level ok">OK</span><span class="log-msg">Sindicância #2847 aberta — Filial 12</span></div>
    <div class="log-line"><span class="log-time">09:15:01</span><span class="log-level info">INF</span><span class="log-msg">Responsável atribuído: João M.</span></div>
    <div class="log-line"><span class="log-time">09:22:48</span><span class="log-level info">INF</span><span class="log-msg">Evidência anexada: doc_0921.pdf</span></div>
    <div class="log-line"><span class="log-time">10:03:15</span><span class="log-level warn">AVS</span><span class="log-msg">Prazo de resposta em 24h</span></div>
    <div class="log-line"><span class="log-time">14:30:22</span><span class="log-level ok">OK</span><span class="log-msg">Depoimento registrado e validado</span></div>
    <div class="log-line"><span class="log-time">14:31:00</span><span class="log-level ok">OK</span><span class="log-msg">Sindicância #2847 encerrada <span class="log-cursor"></span></span></div>
  </div>
</div>`;

const BI_MOCKUP = `
<div class="proj-mockup bi-mockup">
  <div class="mockup-bar">
    <div class="mockup-dots"><span></span><span></span><span></span></div>
    <span class="mockup-title">Inteligência Analítica — BI</span>
  </div>
  <div class="bi-body">
    <div class="bi-kpis">
      <div class="bi-kpi">
        <span class="bi-kpi-val blue">1.284</span>
        <span class="bi-kpi-label">Ocorrências</span>
        <span class="bi-kpi-trend down">↓ 12% vs mês ant.</span>
      </div>
      <div class="bi-kpi">
        <span class="bi-kpi-val green">R$ 2,3M</span>
        <span class="bi-kpi-label">Recuperado</span>
        <span class="bi-kpi-trend up">↑ 23% vs mês ant.</span>
      </div>
      <div class="bi-kpi">
        <span class="bi-kpi-val gold">87%</span>
        <span class="bi-kpi-label">Conformidade</span>
        <span class="bi-kpi-trend up">↑ 5pts vs mês ant.</span>
      </div>
      <div class="bi-kpi">
        <span class="bi-kpi-val">47</span>
        <span class="bi-kpi-label">Filiais ativas</span>
        <span class="bi-kpi-trend up">↑ 3 novas</span>
      </div>
    </div>
    <div class="bi-line-chart">
      <svg viewBox="0 0 280 60" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.4"/>
            <stop offset="100%" stop-color="#3b82f6" stop-opacity="0"/>
          </linearGradient>
        </defs>
        <path class="line-fill" d="M0,55 C40,40 80,25 120,30 S200,15 280,10 L280,60 L0,60 Z"/>
        <path class="line-path" d="M0,55 C40,40 80,25 120,30 S200,15 280,10"/>
      </svg>
    </div>
  </div>
</div>`;

const INFRA_MOCKUP = `
<div class="proj-mockup infra-mockup">
  <div class="mockup-bar">
    <div class="mockup-dots"><span></span><span></span><span></span></div>
    <span class="mockup-title">Infraestrutura — Produção</span>
  </div>
  <div class="infra-body">
    <div class="infra-nodes">
      <div class="infra-node"><div class="infra-icon">☁️</div><div class="infra-label">Cloud</div><div class="infra-status">Online</div></div>
      <div class="infra-node"><div class="infra-icon">🗄️</div><div class="infra-label">Banco de Dados</div><div class="infra-status">Online</div></div>
      <div class="infra-node"><div class="infra-icon">🔒</div><div class="infra-label">Segurança</div><div class="infra-status">Ativo</div></div>
      <div class="infra-node"><div class="infra-icon">💾</div><div class="infra-label">Backup</div><div class="infra-status">Sincronizado</div></div>
      <div class="infra-node"><div class="infra-icon">📡</div><div class="infra-label">API</div><div class="infra-status">Online</div></div>
      <div class="infra-node"><div class="infra-icon">🛡️</div><div class="infra-label">Logs</div><div class="infra-status">Monitorando</div></div>
    </div>
  </div>
</div>`;

const BENEFITS_MOCKUP = `
<div class="proj-mockup benefits-mockup">
  <div class="mockup-bar">
    <div class="mockup-dots"><span></span><span></span><span></span></div>
    <span class="mockup-title">Impacto Operacional</span>
  </div>
  <div class="benefits-body">
    <div class="benefits-grid">
      <div class="benefit-card">
        <span class="benefit-val green">−34%</span>
        <span class="benefit-label">Perdas operacionais</span>
      </div>
      <div class="benefit-card">
        <span class="benefit-val blue">+61%</span>
        <span class="benefit-label">Produtividade</span>
      </div>
      <div class="benefit-card">
        <span class="benefit-val gold">100%</span>
        <span class="benefit-label">Rastreabilidade</span>
      </div>
      <div class="benefit-card">
        <span class="benefit-val">3x</span>
        <span class="benefit-label">Decisões mais rápidas</span>
      </div>
    </div>
  </div>
</div>`;

const NETWORK_MOCKUP = `
<div class="proj-mockup network-mockup">
  <div class="mockup-bar">
    <div class="mockup-dots"><span></span><span></span><span></span></div>
    <span class="mockup-title">Cobertura Nacional</span>
  </div>
  <div class="network-body">
    <div class="network-grid">
      <div class="network-node hub">🏢 Matriz — Sistema Central</div>
      <div class="network-node"><div class="network-node-dot"></div>Filial SP</div>
      <div class="network-node"><div class="network-node-dot"></div>Filial RJ</div>
      <div class="network-node"><div class="network-node-dot"></div>Filial MG</div>
      <div class="network-node"><div class="network-node-dot"></div>Filial RS</div>
      <div class="network-node"><div class="network-node-dot"></div>Filial PR</div>
      <div class="network-node"><div class="network-node-dot"></div>Filial SC</div>
      <div class="network-node"><div class="network-node-dot"></div>Filial BA</div>
      <div class="network-node"><div class="network-node-dot"></div>Filial PE</div>
    </div>
    <div class="network-count">47 filiais integradas em tempo real</div>
  </div>
</div>`;

// ── Project Data ───────────────────────────────────────────────────────────────

const PROJECTS: Record<string, ProjectData> = {
  'prevencao-de-perdas': {
    name: 'Plataforma de Prevenção de Perdas',
    category: 'Automação Inteligente',
    tagline: 'Gestão operacional, auditoria e inteligência analítica para o varejo.',
    desc: 'Plataforma corporativa desenvolvida para redes varejistas que precisam de controle centralizado, rastreabilidade total e inteligência analítica em tempo real sobre operações de prevenção de perdas.',
    tags: ['Varejo', 'Prevenção de Perdas', 'Auditoria', 'BI'],
    heroVisual: DASH_MOCKUP,
    gallery: GALLERY_PREVENCAO,
    sections: [
      {
        label: 'Contexto',
        title: 'Os problemas que o setor enfrentava',
        desc: 'Redes varejistas operavam com processos descentralizados, controle manual e sem rastreabilidade. A ausência de indicadores em tempo real tornava difícil identificar desvios e agir com rapidez — gerando perdas financeiras evitáveis.',
        items: ['Falta de rastreabilidade nos processos', 'Dados descentralizados em planilhas', 'Sem indicadores operacionais em tempo real', 'Falhas recorrentes por falta de protocolo'],
        visual: RISK_MOCKUP,
      },
      {
        label: 'Solução',
        title: 'Uma plataforma central para toda a operação',
        desc: 'Desenvolvemos um sistema corporativo que centraliza todos os módulos de prevenção de perdas — do controle de usuários ao BI analítico — em uma única plataforma segura e escalável.',
        items: ['Módulos integrados em uma plataforma', 'Acesso por perfil e hierarquia', 'Dados em tempo real para todas as filiais', 'Escalável para qualquer volume de operação'],
        visual: HUB_MOCKUP,
      },
      {
        label: 'Gestão Operacional',
        title: 'Controle total de usuários e permissões',
        desc: 'O sistema possui hierarquia corporativa completa com administradores, gerentes regionais e operadores por filial. Cada nível tem acesso controlado e logs de todas as ações realizadas.',
        items: ['Organograma corporativo integrado', 'Permissões por perfil de acesso', 'Cadastro de filiais e estados', 'Log completo de auditoria por usuário'],
        visual: ADMIN_MOCKUP,
      },
      {
        label: 'Simulados',
        title: 'Treinamento operacional com controle individual',
        desc: 'Simulados únicos, diários e semanais com relatórios por colaborador e por loja. A plataforma acompanha o desempenho em tempo real e gera alertas para filiais abaixo da meta.',
        items: ['Simulados únicos, diários e semanais', 'Acompanhamento individual por operador', 'Relatórios automatizados por filial', 'Alertas de desempenho em tempo real'],
        visual: CHART_MOCKUP,
      },
      {
        label: 'Recuperados',
        title: 'Histórico e rastreabilidade financeira',
        desc: 'Módulo dedicado ao lançamento e acompanhamento de recuperados, com histórico detalhado por filial, relatórios analíticos e indicadores estratégicos para tomada de decisão.',
        items: ['Lançamento e histórico por filial', 'Relatórios exportáveis', 'Comparativo mensal e anual', 'Indicadores financeiros consolidados'],
        visual: FINANCE_MOCKUP,
      },
      {
        label: 'Sindicâncias',
        title: 'Auditoria interna com rastreabilidade total',
        desc: 'Controle rigoroso de sindicâncias internas com registro de evidências, atribuição de responsáveis, prazos e histórico imutável de todas as ações. Cada evento gera log automático no sistema.',
        items: ['Abertura e acompanhamento de casos', 'Anexo de evidências e documentos', 'Prazo e responsável atribuído', 'Histórico completo e auditável'],
        visual: AUDIT_MOCKUP,
      },
      {
        label: 'Inteligência Analítica',
        title: 'BI operacional para decisões estratégicas',
        desc: 'Dashboards em tempo real com KPIs estratégicos, gráficos avançados e planilhas exportáveis. A liderança tem visão consolidada de todas as filiais sem precisar de ferramentas externas.',
        items: ['Dashboards em tempo real', 'Exportação para Excel e PDF', 'Comparativos por período e filial', 'KPIs estratégicos corporativos'],
        visual: BI_MOCKUP,
      },
      {
        label: 'Infraestrutura',
        title: 'Arquitetura enterprise para alta disponibilidade',
        desc: 'Hospedagem dedicada em nuvem com banco de dados robusto, backups automatizados, logs de segurança e monitoramento 24/7. A plataforma foi projetada para operar em escala corporativa sem instabilidades.',
        items: ['Hospedagem em cloud dedicada', 'Backups automáticos diários', 'Controle avançado de logs', 'Suporte e monitoramento 24/7'],
        visual: INFRA_MOCKUP,
      },
      {
        label: 'Resultados',
        title: 'Impacto real nas operações',
        desc: 'Após a implantação, as redes varejistas que utilizaram a plataforma registraram redução significativa de perdas, maior produtividade das equipes e rastreabilidade completa de todos os processos.',
        items: ['Redução de 34% nas perdas operacionais', 'Aumento de 61% na produtividade', '100% de rastreabilidade dos processos', 'Decisões 3x mais rápidas'],
        visual: BENEFITS_MOCKUP,
      },
      {
        label: 'Escalabilidade',
        title: 'Crescimento sem limite de unidades',
        desc: 'A arquitetura multi-tenant permite adicionar novas filiais, usuários e regiões sem impacto na performance. O sistema já opera com dezenas de filiais integradas e escala conforme a rede cresce.',
        items: ['Suporte a múltiplas filiais e regiões', 'Onboarding de novas unidades em minutos', 'Performance mantida em qualquer escala', 'Expansão sem reconfiguração'],
        visual: NETWORK_MOCKUP,
      },
    ],
    ctaTitle: 'Quer uma plataforma como essa?',
    ctaDesc: 'Desenvolvemos soluções corporativas sob medida para o seu setor. Fale com a gente e transforme sua operação.',
  },
};

// ── Renderer ───────────────────────────────────────────────────────────────────

function galleryMarkup(images: string[]): string {
  const all = [...images, ...images];
  const items = all.map(src => `<div class="gallery-item" data-lightbox="${src}"><img src="${src}" alt="Print do sistema" loading="lazy" /></div>`).join('');
  return `
    <section class="proj-gallery">
      <div class="gallery-label">Galeria do sistema</div>
      <div class="gallery-track-wrapper">
        <div class="gallery-track">${items}</div>
      </div>
    </section>
  `;
}

function sectionMarkup(s: ProjectSection, i: number): string {
  const reverse = i % 2 === 1;
  const itemsHtml = s.items?.length
    ? `<ul class="feature-list">${s.items.map(it => `<li>${it}</li>`).join('')}</ul>`
    : '';
  return `
    <section class="proj-section${reverse ? ' reverse' : ''}">
      <div class="container">
        <div class="proj-split">
          <div class="proj-text">
            <div class="section-label">${s.label}</div>
            <h2>${s.title}</h2>
            <p>${s.desc}</p>
            ${itemsHtml}
          </div>
          <div class="proj-visual">${s.visual}</div>
        </div>
      </div>
    </section>
  `;
}

function render(project: ProjectData): void {
  document.title = `${project.name} — Provenis Sistem`;

  const root = document.getElementById('proj-root')!;
  root.innerHTML = `
    <section class="proj-hero">
      <div class="container">
        <div class="hero-split">
          <div class="hero-copy">
            <div class="hero-breadcrumb">
              <a href="/portfolio">Portfólio</a>
              <span>›</span>
              <span>${project.name}</span>
            </div>
            <div class="hero-category">${project.category}</div>
            <h1>${project.name}</h1>
            <p class="hero-desc">${project.desc}</p>
            <div class="hero-tags">
              ${project.tags.map(t => `<span class="hero-tag">${t}</span>`).join('')}
            </div>
          </div>
          <div>${project.heroVisual}</div>
        </div>
      </div>
    </section>

    ${project.sections.map((s, i) => `
      ${sectionMarkup(s, i)}
      ${i === 0 && project.gallery?.length ? galleryMarkup(project.gallery) : ''}
    `).join('')}

    <section class="proj-cta">
      <div class="container">
        <div class="cta-inner">
          <div class="section-label">Próximo passo</div>
          <h2>${project.ctaTitle}</h2>
          <p>${project.ctaDesc}</p>
          <div class="cta-buttons">
            <a href="/#contact" class="btn-primary">Iniciar projeto</a>
            <a href="/portfolio" class="btn-secondary">Ver portfólio</a>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderNotFound(slug: string): void {
  const root = document.getElementById('proj-root')!;
  root.innerHTML = `
    <div class="proj-404">
      <h1>404</h1>
      <p>Projeto <strong>"${slug}"</strong> não encontrado.</p>
      <a href="/portfolio">← Voltar ao portfólio</a>
    </div>
  `;
}

// ── Init ───────────────────────────────────────────────────────────────────────

const slug = window.location.pathname.split('/').filter(Boolean).pop() ?? '';
const project = PROJECTS[slug];

if (project) {
  render(project);
  initReveal();
} else {
  renderNotFound(slug);
}

function initLightbox(): void {
  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.innerHTML = `<button class="lightbox-close" aria-label="Fechar">&times;</button><img class="lightbox-img" src="" alt="" />`;
  document.body.appendChild(overlay);

  const img = overlay.querySelector<HTMLImageElement>('.lightbox-img')!;
  const closeBtn = overlay.querySelector<HTMLButtonElement>('.lightbox-close')!;

  function open(src: string): void {
    img.src = src;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close(): void {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => { img.src = ''; }, 350);
  }

  document.querySelectorAll<HTMLElement>('[data-lightbox]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const src = el.dataset.lightbox!;
      open(src);
    });
  });

  overlay.addEventListener('click', close);
  closeBtn.addEventListener('click', (e) => { e.stopPropagation(); close(); });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) close();
  });
}

function initReveal(): void {
  // Seleciona todos os blocos que devem animar ao entrar na viewport
  const targets = document.querySelectorAll<HTMLElement>(
    '.proj-section .proj-text, .proj-section .proj-visual, .proj-hero .hero-copy, .proj-hero > .container > .hero-split > div:last-child, .proj-cta .cta-inner, .proj-gallery'
  );

  targets.forEach((el) => {
    el.classList.add('reveal');
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add('revealed');
        } else {
          (entry.target as HTMLElement).classList.remove('revealed');
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach((el) => io.observe(el));

  initLightbox();

  // Hero entra imediatamente (já está na viewport ao carregar)
  requestAnimationFrame(() => {
    document.querySelectorAll<HTMLElement>('.proj-hero .hero-copy, .proj-hero > .container > .hero-split > div:last-child').forEach((el) => {
      el.classList.add('revealed');
    });
  });
}
