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

// ── AnimaÃ§Ã£o de entrada dos cards ───────────────────────────────
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

// ══════════════════════════════════════════════════════════════════
// ── Dados dos Segmentos ──────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════

type Category = 'sites' | 'bots' | 'automacoes';

interface Segment {
  id: string;
  category: Category;
  name: string;
  tagline: string;
  icon: string;
  gradient: string;
  heroColor: string;
  description: string[];
  features: string[];
  tech: string[];
}

const SEGMENTS: Segment[] = [
  // ── SITES ────────────────────────────────────────────────────
  {
    id: 'academias',
    category: 'sites',
    name: 'Academias & Fitness',
    tagline: 'Sites que convertem visitantes em alunos matriculados',
    icon: 'ðŸ‹ï¸',
    gradient: 'linear-gradient(135deg, #d4af37 0%, #f4d576 50%, #b8960f 100%)',
    heroColor: '#d4af37',
    description: [
      'Uma academia precisa transmitir energia, resultado e confianÃ§a logo no primeiro acesso. ConstruÃ­mos sites focados em conversÃ£o: da primeira visita Ã  matrÃ­cula concluÃ­da.',
      'Integramos sistemas de agendamento de aulas, planos de assinatura, galeria de antes e depois e depoimentos em vÃ­deo â€” tudo com carregamento rÃ¡pido para reter o visitante.',
    ],
    features: [
      'Landing pages de alta conversÃ£o com foco em captaÃ§Ã£o de leads',
      'Agendamento online de aulas experimentais',
      'ExibiÃ§Ã£o de planos, diferenciais e modalidades',
      'Galeria de resultados de alunos (antes e depois)',
      'IntegraÃ§Ã£o com WhatsApp para contato imediato',
      'SEO local para aparecer em buscas prÃ³ximas',
      'Ãrea de membros com treinos e dicas exclusivas',
    ],
    tech: ['Vite', 'TypeScript', 'Node.js', 'PostgreSQL', 'Nginx'],
  },
  {
    id: 'advocacia',
    category: 'sites',
    name: 'Advocacia & JurÃ­dico',
    tagline: 'PresenÃ§a digital que transmite autoridade e captaÃ§Ã£o de clientes',
    icon: 'âš–ï¸',
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    heroColor: '#4a90d9',
    description: [
      'O mercado jurÃ­dico exige credibilidade e sigilo. Desenvolvemos sites que comunicam especializaÃ§Ã£o, histÃ³rico de casos e diferenciais do escritÃ³rio de forma clara e profissional.',
      'Com foco em SEO e captaÃ§Ã£o local, seu escritÃ³rio aparece na frente quando o cliente pesquisa por um advogado na cidade. FormulÃ¡rio de consulta, chat e WhatsApp integrados.',
    ],
    features: [
      'Design sÃ³brio e profissional alinhado Ã  identidade do escritÃ³rio',
      'ApresentaÃ§Ã£o das Ã¡reas de atuaÃ§Ã£o com linguagem acessÃ­vel',
      'FormulÃ¡rio de prÃ©-consulta com triagem automÃ¡tica',
      'Blog jurÃ­dico para autoridade e SEO',
      'SeÃ§Ã£o de perguntas frequentes por Ã¡rea',
      'Agendamento de consultas online',
      'LGPD e privacidade implementadas corretamente',
    ],
    tech: ['Vite', 'TypeScript', 'Express', 'PostgreSQL', 'Nginx'],
  },
  {
    id: 'clinicas',
    category: 'sites',
    name: 'ClÃ­nicas & Medicina',
    tagline: 'Do agendamento Ã  fidelizaÃ§Ã£o do paciente em um Ãºnico site',
    icon: 'ðŸ¥',
    gradient: 'linear-gradient(135deg, #005c97 0%, #363795 100%)',
    heroColor: '#4fc3f7',
    description: [
      'Pacientes buscam confianÃ§a antes de marcar uma consulta. Apresentamos seus mÃ©dicos, especialidades e estrutura com design moderno e linguagem humanizada que reduz a ansiedade do usuÃ¡rio.',
      'Agendamento online integrado, prontuÃ¡rio eletrÃ´nico bÃ¡sico, lembretes automÃ¡ticos por WhatsApp e Ã¡rea do paciente sÃ£o diferenciais que elevam a qualidade do atendimento.',
    ],
    features: [
      'Perfil detalhado dos mÃ©dicos com formaÃ§Ã£o e especialidades',
      'Agendamento de consultas online com confirmaÃ§Ã£o automÃ¡tica',
      'IntegraÃ§Ã£o de lembretes via WhatsApp',
      'ExibiÃ§Ã£o de convÃªnios aceitos',
      'Blog de saÃºde e conteÃºdo educativo',
      'SEO para aparecer em buscas de especialidades na cidade',
      'Ãrea do paciente com histÃ³rico de consultas',
    ],
    tech: ['Vite', 'TypeScript', 'Node.js', 'PostgreSQL', 'WhatsApp API'],
  },
  {
    id: 'odontologia',
    category: 'sites',
    name: 'Odontologia',
    tagline: 'Sites que transformam cliques em consultas agendadas',
    icon: 'ðŸ¦·',
    gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    heroColor: '#38ef7d',
    description: [
      'O setor odontolÃ³gico Ã© altamente competitivo. ClÃ­nicas com presenÃ§a digital bem trabalhada conseguem atrair pacientes de implantes, clareamentos e ortodontia â€” serviÃ§os de alto ticket.',
      'Criamos sites com galeria de sorrisos transformados, apresentaÃ§Ã£o dos tratamentos, tabela de procedimentos e agendamento online â€” tudo pensado para converter o visitante em paciente.',
    ],
    features: [
      'Galeria de casos clÃ­nicos antes e depois',
      'ApresentaÃ§Ã£o detalhada dos procedimentos e valores',
      'Sistema de agendamento online',
      'Depoimentos em vÃ­deo de pacientes',
      'IntegraÃ§Ã£o com Google Maps e avaliaÃ§Ãµes',
      'WhatsApp direto para dÃºvidas rÃ¡pidas',
      'Blog de saÃºde bucal para SEO',
    ],
    tech: ['Vite', 'TypeScript', 'Express', 'PostgreSQL'],
  },
  {
    id: 'estetica',
    category: 'sites',
    name: 'EstÃ©tica & SalÃµes',
    tagline: 'Beleza tambÃ©m precisa ser vista: sites que preenchem a agenda',
    icon: 'âœ‚ï¸',
    gradient: 'linear-gradient(135deg, #f953c6 0%, #b91d73 100%)',
    heroColor: '#f953c6',
    description: [
      'SalÃµes de beleza, clÃ­nicas de estÃ©tica e barbearias vendem experiÃªncia. Nossos sites comunicam o ambiente, os profissionais e os serviÃ§os de forma visual e atraente.',
      'Sistema de agendamento online 24/7 elimina perda de clientes fora do horÃ¡rio comercial. Galeria de trabalhos, avaliaÃ§Ãµes e integraÃ§Ã£o com redes sociais completam a presenÃ§a digital.',
    ],
    features: [
      'Galeria de trabalhos realizados (cabelos, unhas, pele)',
      'Agendamento online com seleÃ§Ã£o de profissional e horÃ¡rio',
      'ExibiÃ§Ã£o de serviÃ§os com preÃ§os e duraÃ§Ã£o',
      'Perfil dos profissionais com especialidades',
      'IntegraÃ§Ã£o com Instagram para feed automÃ¡tico',
      'Cupom de desconto para primeira visita',
      'Lembretes automÃ¡ticos de agendamento via WhatsApp',
    ],
    tech: ['Vite', 'TypeScript', 'Node.js', 'PostgreSQL', 'WhatsApp API'],
  },
  {
    id: 'restaurantes',
    category: 'sites',
    name: 'Restaurantes & Gastronomia',
    tagline: 'Do cardÃ¡pio digital Ã  reserva online em um clique',
    icon: 'ðŸ½ï¸',
    gradient: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)',
    heroColor: '#f7971e',
    description: [
      'Restaurantes precisam vender experiÃªncia antes mesmo da primeira garfada. Fotos profissionais do ambiente, cardÃ¡pio digital interativo e sistema de reservas sÃ£o o mÃ­nimo para se destacar.',
      'Desenvolvemos soluÃ§Ãµes completas: cardÃ¡pio digital com QR code para mesas, pedidos online com integraÃ§Ã£o Pix, sistema de reservas e fidelizaÃ§Ã£o via WhatsApp.',
    ],
    features: [
      'CardÃ¡pio digital com fotos e categorias filtrÃ¡veis',
      'QR code para cardÃ¡pio nas mesas',
      'Sistema de reservas online com controle de capacidade',
      'Pedidos online com integraÃ§Ã£o de pagamento',
      'Galeria do ambiente e pratos em destaque',
      'Programa de fidelidade digital',
      'SEO local para aparecer em "restaurante perto de mim"',
    ],
    tech: ['Vite', 'TypeScript', 'Node.js', 'PostgreSQL', 'Pix API'],
  },
  {
    id: 'ecommerce',
    category: 'sites',
    name: 'E-commerce & Lojas Virtuais',
    tagline: 'Lojas que vendem 24/7 com gestÃ£o simples e checkout rÃ¡pido',
    icon: 'ðŸ›’',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    heroColor: '#667eea',
    description: [
      'Vendas online exigem confianÃ§a, velocidade e checkout sem fricÃ§Ã£o. ConstruÃ­mos lojas virtuais otimizadas para conversÃ£o, com gestÃ£o de estoque integrada e mÃºltiplos meios de pagamento.',
      'Do catÃ¡logo de produtos ao controle de pedidos, entrega e pÃ³s-venda â€” temos soluÃ§Ãµes para lojas de todos os portes, com painel administrativo intuitivo para vocÃª gerenciar tudo.',
    ],
    features: [
      'CatÃ¡logo de produtos com filtros avanÃ§ados e busca',
      'Checkout rÃ¡pido com Pix, cartÃ£o e boleto',
      'Painel administrativo completo',
      'GestÃ£o de estoque e pedidos em tempo real',
      'CÃ¡lculo automÃ¡tico de frete (Correios e transportadoras)',
      'E-mail e WhatsApp transacional (pedido, envio, entrega)',
      'IntegraÃ§Ã£o com Mercado Livre, Shopee e outros marketplaces',
    ],
    tech: ['Vite', 'TypeScript', 'Node.js', 'PostgreSQL', 'Pix/MP API'],
  },
  {
    id: 'igrejas',
    category: 'sites',
    name: 'Igrejas & OrganizaÃ§Ãµes Religiosas',
    tagline: 'Comunidades digitais que aproximam, engajam e crescem',
    icon: 'â›ª',
    gradient: 'linear-gradient(135deg, #4568dc 0%, #b06ab3 100%)',
    heroColor: '#b06ab3',
    description: [
      'Igrejas e organizaÃ§Ãµes religiosas precisam manter a comunidade conectada alÃ©m dos cultos presenciais. Sites com transmissÃ£o ao vivo, calendÃ¡rio de eventos e Ã¡rea de membros fazem isso.',
      'DÃ­zimos e ofertas online, pedidos de oraÃ§Ã£o, inscriÃ§Ãµes em cÃ©lulas e ministÃ©rios â€” tudo centralizado em um portal digital moderno e acessÃ­vel para todos os membros.',
    ],
    features: [
      'TransmissÃ£o ao vivo e biblioteca de pregaÃ§Ãµes',
      'CalendÃ¡rio de eventos e cultos',
      'Sistema de dÃ­zimos e ofertas online (Pix)',
      'InscriÃ§Ã£o em ministÃ©rios e cÃ©lulas',
      'Ãrea exclusiva para membros',
      'Pedidos de oraÃ§Ã£o e testemunhos',
      'Blog e devocional diÃ¡rio',
    ],
    tech: ['Vite', 'TypeScript', 'Node.js', 'PostgreSQL', 'Pix API'],
  },
  {
    id: 'educacao',
    category: 'sites',
    name: 'ColÃ©gios & EducaÃ§Ã£o',
    tagline: 'Portais educacionais que conectam escola, aluno e famÃ­lia',
    icon: 'ðŸŽ“',
    gradient: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
    heroColor: '#4a90e2',
    description: [
      'InstituiÃ§Ãµes de ensino precisam transmitir credibilidade e facilitar a comunicaÃ§Ã£o entre escola, alunos e responsÃ¡veis. Um portal bem estruturado aumenta captaÃ§Ã£o e retÃ©m famÃ­lias.',
      'Desenvolvemos portais com Ã¡rea do aluno, calendÃ¡rio escolar, comunicados, matrÃ­culas online, cardÃ¡pio da cantina, boletim digital e muito mais â€” tudo em um ambiente seguro.',
    ],
    features: [
      'Portal do aluno e dos responsÃ¡veis',
      'MatrÃ­culas online com documentaÃ§Ã£o digital',
      'CalendÃ¡rio escolar e comunicados',
      'Galeria de eventos e atividades',
      'Blog pedagÃ³gico e boletim informativo',
      'CardÃ¡pio semanal e avisos da cantina',
      'RematrÃ­cula digital com assinatura eletrÃ´nica',
    ],
    tech: ['Vite', 'TypeScript', 'Node.js', 'PostgreSQL', 'Nginx'],
  },
  {
    id: 'petshop',
    category: 'sites',
    name: 'Petshops & VeterinÃ¡rios',
    tagline: 'Sites que cuidam tÃ£o bem dos clientes quanto eles cuidam dos pets',
    icon: 'ðŸ¾',
    gradient: 'linear-gradient(135deg, #56ab2f 0%, #a8e063 100%)',
    heroColor: '#56ab2f',
    description: [
      'Donos de pets sÃ£o extremamente fiÃ©is a profissionais que transmitem cuidado e competÃªncia. Um site bem feito apresenta os serviÃ§os, equipe e diferenciais do seu petshop ou clÃ­nica veterinÃ¡ria.',
      'Agendamento de banho, tosa e consultas online, loja virtual de produtos pets, prontuÃ¡rio do animal e lembretes de vacinas sÃ£o recursos que fidelizam clientes.',
    ],
    features: [
      'Agendamento de banho, tosa e consultas',
      'ProntuÃ¡rio digital do animal',
      'Loja virtual de produtos pets',
      'Lembretes automÃ¡ticos de vacinas e consultas',
      'Galeria de fotos dos pets atendidos',
      'Blog com dicas de saÃºde animal',
      'IntegraÃ§Ã£o WhatsApp para emergÃªncias',
    ],
    tech: ['Vite', 'TypeScript', 'Node.js', 'PostgreSQL', 'WhatsApp API'],
  },
  {
    id: 'transportadoras',
    category: 'sites',
    name: 'Transportadoras & LogÃ­stica',
    tagline: 'Rastreabilidade, credibilidade e captaÃ§Ã£o de novos clientes',
    icon: 'ðŸšš',
    gradient: 'linear-gradient(135deg, #373b44 0%, #4286f4 100%)',
    heroColor: '#4286f4',
    description: [
      'Transportadoras e empresas de logÃ­stica precisam transmitir confianÃ§a, pontualidade e cobertura de rotas. Sites claros com cotaÃ§Ã£o online e rastreamento aumentam a conversÃ£o de novos clientes.',
      'Sistema de cotaÃ§Ã£o de frete em tempo real, rastreamento de encomendas, Ã¡rea do cliente com histÃ³rico de fretes e emissÃ£o de CTE sÃ£o recursos que profissionalizam a operaÃ§Ã£o digital.',
    ],
    features: [
      'Calculadora de frete online',
      'Rastreamento de carga em tempo real',
      'Ãrea do cliente com histÃ³rico de pedidos',
      'Cobertura de rotas interativa no mapa',
      'FormulÃ¡rio de cotaÃ§Ã£o com resposta automÃ¡tica',
      'EmissÃ£o de CTE e documentos digitais',
      'Portal de parceiros e transportadores',
    ],
    tech: ['Vite', 'TypeScript', 'Node.js', 'PostgreSQL', 'Maps API'],
  },
  {
    id: 'industrias',
    category: 'sites',
    name: 'IndÃºstrias & B2B',
    tagline: 'Sites institucionais que geram credibilidade e abrem portas',
    icon: 'âš™ï¸',
    gradient: 'linear-gradient(135deg, #485563 0%, #29323c 100%)',
    heroColor: '#9e9e9e',
    description: [
      'Empresas B2B e indÃºstrias precisam de sites que transmitam escala, capacidade produtiva e confiabilidade. O comprador pesquisa o fornecedor antes de qualquer contato comercial.',
      'PortfÃ³lio de produtos, certificaÃ§Ãµes, capacidade instalada, parceiros homologados e formulÃ¡rio de solicitaÃ§Ã£o de orÃ§amento â€” tudo estruturado para converter o lead corporativo.',
    ],
    features: [
      'CatÃ¡logo de produtos/serviÃ§os com especificaÃ§Ãµes tÃ©cnicas',
      'ApresentaÃ§Ã£o da capacidade produtiva e estrutura',
      'SeÃ§Ã£o de certificaÃ§Ãµes e selos de qualidade',
      'FormulÃ¡rio de solicitaÃ§Ã£o de orÃ§amento corporativo',
      'Ãrea de distribuidores e representantes',
      'Blog tÃ©cnico e cases de sucesso',
      'IntegraÃ§Ã£o com ERP para estoque em tempo real',
    ],
    tech: ['Vite', 'TypeScript', 'Node.js', 'PostgreSQL', 'ERP API'],
  },

  // ── BOTS DISCORD ─────────────────────────────────────────────
  {
    id: 'bot-comunidade',
    category: 'bots',
    name: 'Bot Comunidade',
    tagline: 'Gerencie, engaje e faÃ§a sua comunidade crescer no piloto automÃ¡tico',
    icon: 'ðŸŽ®',
    gradient: 'linear-gradient(135deg, #5865F2 0%, #3d47c9 100%)',
    heroColor: '#5865F2',
    description: [
      'Um servidor de Discord ativo precisa de estrutura. Cargos automÃ¡ticos por tempo de servidor, sistema de boas-vindas personalizado, regras interativas e moderaÃ§Ã£o automatizada â€” tudo em um bot.',
      'Sistemas de nÃ­veis e XP que gamificam a participaÃ§Ã£o, enquetes, sorteios, ranking de membros e comandos customizados para refletir a identidade da sua comunidade.',
    ],
    features: [
      'Sistema de boas-vindas com mensagem e cargo automÃ¡tico',
      'NÃ­veis e XP baseados em atividade',
      'ModeraÃ§Ã£o automatizada (spam, flood, links proibidos)',
      'Sorteios, enquetes e eventos interativos',
      'Cargos de reaÃ§Ã£o (reaction roles)',
      'Log completo de aÃ§Ãµes dos moderadores',
      'Comandos customizados pelo dono do servidor',
    ],
    tech: ['Discord.js', 'Node.js', 'PostgreSQL', 'Redis'],
  },
  {
    id: 'bot-esports',
    category: 'bots',
    name: 'Bot E-sports & Campeonatos',
    tagline: 'Organize torneios, placar ao vivo e ranking automÃ¡tico',
    icon: 'ðŸ†',
    gradient: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)',
    heroColor: '#ffd200',
    description: [
      'Organizar campeonatos no Discord Ã© caÃ³tico sem automaÃ§Ã£o. Nosso bot de e-sports gerencia inscriÃ§Ãµes de times, chaves de torneio, placares ao vivo e rankings em tempo real.',
      'Suporta mÃºltiplos jogos (Free Fire, CS2, Valorant, LOL, Fortnite), formatos variados (eliminatÃ³ria, pontos corridos, mata-mata) e envia atualizaÃ§Ãµes automÃ¡ticas nos canais.',
    ],
    features: [
      'InscriÃ§Ã£o de times com validaÃ§Ã£o automÃ¡tica',
      'GeraÃ§Ã£o de chaves e brackets de torneio',
      'Placar ao vivo com atualizaÃ§Ã£o automÃ¡tica',
      'Ranking de times e jogadores',
      'Canal dedicado a cada partida',
      'VerificaÃ§Ã£o de times em plataformas (Faceit, Battlefy)',
      'Suporte a mÃºltiplos jogos e formatos de campeonato',
    ],
    tech: ['Discord.js', 'Node.js', 'PostgreSQL', 'WebSocket'],
  },
  {
    id: 'bot-apostas',
    category: 'bots',
    name: 'Bot Apostas Esportivas',
    tagline: 'Simulador de apostas com probabilidades, ranking e gestÃ£o de banca',
    icon: 'âš½',
    gradient: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)',
    heroColor: '#71b280',
    description: [
      'Servidores de tips e apostas esportivas ganham engajamento com um bot que simula apostas com moeda virtual, rankeia os melhores apostadores e exibe odds em tempo real.',
      'GestÃ£o de banca virtual, histÃ³rico de apostas, placares ao vivo de partidas e alertas de eventos esportivos programados. Tudo para manter a comunidade ativa durante os jogos.',
    ],
    features: [
      'Sistema de moeda virtual para apostas simuladas',
      'Odds dinÃ¢micas por mercado (resultado, handicap, escanteios)',
      'Ranking de apostadores com histÃ³rico',
      'Alertas de partidas ao vivo e resultados',
      'AnÃ¡lise de desempenho por apostador',
      'Canal de tips com formataÃ§Ã£o automÃ¡tica',
      'IntegraÃ§Ã£o com APIs de dados esportivos',
    ],
    tech: ['Discord.js', 'Node.js', 'PostgreSQL', 'Sports API'],
  },
  {
    id: 'bot-streamers',
    category: 'bots',
    name: 'Bot Streamers',
    tagline: 'NotificaÃ§Ãµes ao vivo, clips automÃ¡ticos e engajamento da fanbase',
    icon: 'ðŸ“º',
    gradient: 'linear-gradient(135deg, #9146ff 0%, #6441a5 100%)',
    heroColor: '#9146ff',
    description: [
      'Streamers precisam manter a comunidade engajada mesmo fora das lives. Nosso bot notifica automaticamente quando o streamer vai ao ar, com preview e link da live no Discord.',
      'Sistema de pontos para espectadores, comandos de clip, counters de follows/subs ao vivo, comandos personalizados que ativam efeitos na live â€” integraÃ§Ãµes Twitch e YouTube.',
    ],
    features: [
      'NotificaÃ§Ã£o automÃ¡tica ao entrar ao vivo (Twitch/YouTube)',
      'PrÃ©via da live com tÃ­tulo, jogo e thumbnail',
      'Sistema de pontos de canal (lealdade da fanbase)',
      'Comandos de clip e highlights automÃ¡ticos',
      'Counter de seguidores e inscritos em tempo real',
      'Comandos customizados para a comunidade',
      'IntegraÃ§Ã£o com OBS para overlays e alertas',
    ],
    tech: ['Discord.js', 'Twitch API', 'YouTube API', 'Node.js', 'WebSocket'],
  },
  {
    id: 'bot-fivem',
    category: 'bots',
    name: 'Bot FiveM & Cidades RP',
    tagline: 'Painel de gestÃ£o, whitelist e vida civil para sua cidade RP',
    icon: 'ðŸŒ†',
    gradient: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
    heroColor: '#4db8ff',
    description: [
      'Cidades de RolePlay no FiveM exigem organizaÃ§Ã£o rigorosa. Um bot dedicado centraliza whitelist, fichas de personagem, sistema judiciÃ¡rio, empregos e muito mais diretamente no Discord.',
      'IntegraÃ§Ã£o entre o servidor FiveM e o Discord em tempo real: players online, status do servidor, logs de aÃ§Ãµes, sistema de cargos por facÃ§Ã£o e comandos exclusivos para staff.',
    ],
    features: [
      'Sistema de whitelist com formulÃ¡rio e aprovaÃ§Ã£o automÃ¡tica',
      'Fichas de personagem com validaÃ§Ã£o de backstory',
      'Painel de empregos e facÃ§Ãµes',
      'Sistema judiciÃ¡rio (mandados, prisÃµes, multas)',
      'Status do servidor FiveM em tempo real',
      'Logs de aÃ§Ãµes e moderaÃ§Ã£o de staff',
      'IntegraÃ§Ã£o banco de dados FiveM â†” Discord',
    ],
    tech: ['Discord.js', 'Node.js', 'PostgreSQL', 'FiveM txAdmin API'],
  },
  {
    id: 'bot-loja',
    category: 'bots',
    name: 'Bot Loja & Vendas',
    tagline: 'Venda produtos e serviÃ§os digitais direto no Discord com Pix',
    icon: 'ðŸ›ï¸',
    gradient: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)',
    heroColor: '#f7971e',
    description: [
      'Lojas digitais dentro do Discord geram vendas sem o cliente precisar sair da plataforma. CatÃ¡logo de produtos, pagamento via Pix automÃ¡tico e entrega instantÃ¢nea de licenÃ§as ou acessos.',
      'Painel de administraÃ§Ã£o para estoque, histÃ³rico de pedidos, gestÃ£o de clientes VIP e sistema de cupons de desconto. Ideal para venda de contas, serviÃ§os e produtos digitais.',
    ],
    features: [
      'CatÃ¡logo interativo de produtos com preÃ§os',
      'Pagamento automÃ¡tico via Pix (confirmaÃ§Ã£o instantÃ¢nea)',
      'Entrega automÃ¡tica de produto/chave apÃ³s pagamento',
      'HistÃ³rico de compras por usuÃ¡rio',
      'Sistema de cupons e descontos',
      'Painel admin para gestÃ£o de estoque',
      'Suporte a produtos fÃ­sicos e digitais',
    ],
    tech: ['Discord.js', 'Node.js', 'PostgreSQL', 'Pix/MP API'],
  },
  {
    id: 'bot-roblox',
    category: 'bots',
    name: 'Bot Roblox',
    tagline: 'VerificaÃ§Ã£o Roblox, ranks automÃ¡ticos e gestÃ£o do grupo',
    icon: 'ðŸŽ²',
    gradient: 'linear-gradient(135deg, #e50000 0%, #ff6b6b 100%)',
    heroColor: '#ff6b6b',
    description: [
      'Comunidades Roblox no Discord precisam de verificaÃ§Ã£o de conta, sincronizaÃ§Ã£o de ranks do grupo e comandos de jogabilidade. Nosso bot faz a ponte perfeita entre as duas plataformas.',
      'Sistema de verificaÃ§Ã£o automÃ¡tico via API do Roblox, sincronizaÃ§Ã£o de cargos por rank do grupo, comandos de jogos, estatÃ­sticas de players e alertas de updates do jogo.',
    ],
    features: [
      'VerificaÃ§Ã£o de conta Roblox vinculada ao Discord',
      'SincronizaÃ§Ã£o de ranks do grupo com cargos do Discord',
      'Comandos de estatÃ­sticas de jogador',
      'Alertas de atualizaÃ§Ãµes e eventos do jogo',
      'ModeraÃ§Ã£o de membros nÃ£o verificados',
      'Sistema de candidaturas para o grupo',
      'Painel de administraÃ§Ã£o do grupo Roblox',
    ],
    tech: ['Discord.js', 'Roblox API', 'Node.js', 'PostgreSQL'],
  },
  {
    id: 'bot-minecraft',
    category: 'bots',
    name: 'Bot Minecraft',
    tagline: 'Status do servidor, ranking de jogadores e eventos automÃ¡ticos',
    icon: 'â›ï¸',
    gradient: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)',
    heroColor: '#71b280',
    description: [
      'Servidores Minecraft ganham vida com um bot que exibe status em tempo real, jogadores online, ranking por conquistas e notificaÃ§Ãµes automÃ¡ticas quando o servidor sobe ou cai.',
      'IntegraÃ§Ã£o via RCON para comandos remotos direto do Discord, sistema de whitelist, votaÃ§Ãµes de temporada e eventos automÃ¡ticos de drops e torneios.',
    ],
    features: [
      'Status do servidor em tempo real (players, TPS, memÃ³ria)',
      'Lista de jogadores online com tempo de sessÃ£o',
      'Ranking por conquistas e tempo de jogo',
      'Whitelist gerenciada pelo Discord',
      'Comandos RCON para admins (kick, ban, give)',
      'Alertas de queda/retorno do servidor',
      'Eventos automÃ¡ticos (drops, torneios, votaÃ§Ãµes)',
    ],
    tech: ['Discord.js', 'Minecraft RCON', 'Node.js', 'PostgreSQL'],
  },
  {
    id: 'bot-facc',
    category: 'bots',
    name: 'Bot FacÃ§Ãµes & FACC',
    tagline: 'Hierarquia, recrutamento e guerras automatizados para sua FACC',
    icon: 'âš”ï¸',
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #e94560 100%)',
    heroColor: '#e94560',
    description: [
      'FacÃ§Ãµes e grupos competitivos no Discord precisam de estrutura para recrutamento, hierarquia, registro de guerras e pontuaÃ§Ã£o. Nosso bot automatiza toda a gestÃ£o operacional da FACC.',
      'Sistema de recrutamento com formulÃ¡rio, aprovaÃ§Ã£o por rank, pontuaÃ§Ã£o de guerras, registro de baixas, sistema de promoÃ§Ãµes e arquivo histÃ³rico de conflitos.',
    ],
    features: [
      'Sistema de recrutamento com formulÃ¡rio e triagem',
      'Hierarquia de cargos com permissÃµes por nÃ­vel',
      'Registro e placar de guerras/conflitos',
      'Sistema de promoÃ§Ãµes e rebaixamentos',
      'Log completo de aÃ§Ãµes da facÃ§Ã£o',
      'MissÃµes e objetivos com recompensa de pontos',
      'AlianÃ§a e rivalidade com outras facÃ§Ãµes',
    ],
    tech: ['Discord.js', 'Node.js', 'PostgreSQL', 'Redis'],
  },

  // ── AUTOMAÃ‡Ã•ES WHATSAPP ──────────────────────────────────────
  {
    id: 'atendimento-auto',
    category: 'automacoes',
    name: 'Atendimento Automatizado',
    tagline: 'Responda clientes 24/7 sem precisar de um atendente online',
    icon: 'ðŸ¤–',
    gradient: 'linear-gradient(135deg, #25d366 0%, #128c7e 100%)',
    heroColor: '#25d366',
    description: [
      'Clientes nÃ£o esperam. Um chatbot bem construÃ­do responde dÃºvidas frequentes, envia cardÃ¡pios, tabelas de preÃ§os e direciona para o atendente humano certo â€” a qualquer hora.',
      'Utilizamos a API oficial do WhatsApp Business para garantir estabilidade, sem risco de banimento. Fluxos de conversa inteligentes que aprendem com as interaÃ§Ãµes mais comuns do seu negÃ³cio.',
    ],
    features: [
      'Respostas automÃ¡ticas 24/7 com menu interativo',
      'Envio automÃ¡tico de catÃ¡logos, cardÃ¡pios e tabelas',
      'TransferÃªncia inteligente para atendente humano',
      'Respostas para as 50 dÃºvidas mais frequentes',
      'Multi-atendente com filas organizadas',
      'RelatÃ³rio de atendimentos e satisfaÃ§Ã£o',
      'IntegraÃ§Ã£o com CRM para histÃ³rico do cliente',
    ],
    tech: ['WhatsApp Business API', 'Node.js', 'PostgreSQL', 'Redis'],
  },
  {
    id: 'agendamento-auto',
    category: 'automacoes',
    name: 'Agendamento de ServiÃ§os',
    tagline: 'Agenda preenchida automaticamente sem uma ligaÃ§Ã£o sequer',
    icon: 'ðŸ“…',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    heroColor: '#4facfe',
    description: [
      'NegÃ³cios baseados em horÃ¡rios (salÃµes, clÃ­nicas, academias, consultÃ³rios) perdem clientes por nÃ£o conseguir agendar fora do horÃ¡rio comercial. Nossa automaÃ§Ã£o resolve isso.',
      'O cliente envia uma mensagem, vÃª os horÃ¡rios disponÃ­veis, escolhe, confirma e recebe o lembrete automÃ¡tico no dia anterior. Zero intervenÃ§Ã£o humana no processo de agendamento.',
    ],
    features: [
      'Consulta de disponibilidade em tempo real',
      'Agendamento por mensagem de texto ou botÃµes',
      'ConfirmaÃ§Ã£o automÃ¡tica com detalhes do serviÃ§o',
      'Lembretes 24h e 1h antes do horÃ¡rio',
      'Reagendamento e cancelamento via WhatsApp',
      'SincronizaÃ§Ã£o com Google Calendar',
      'RelatÃ³rio de agendamentos e ocupaÃ§Ã£o',
    ],
    tech: ['WhatsApp Business API', 'Node.js', 'PostgreSQL', 'Google Calendar API'],
  },
  {
    id: 'vendas-auto',
    category: 'automacoes',
    name: 'Vendas & Follow-up',
    tagline: 'Funil de vendas no WhatsApp que converte leads em clientes',
    icon: 'ðŸ’°',
    gradient: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)',
    heroColor: '#f7971e',
    description: [
      'A maioria das vendas Ã© perdida por falta de follow-up. Nossa automaÃ§Ã£o acompanha cada lead desde o primeiro contato atÃ© o fechamento, enviando mensagens no tempo certo com o conteÃºdo certo.',
      'SequÃªncia de nutriÃ§Ã£o automatizada, envio de propostas, lembretes de pagamento, upsell pÃ³s-compra e reativaÃ§Ã£o de clientes inativos â€” tudo no WhatsApp onde o cliente jÃ¡ estÃ¡.',
    ],
    features: [
      'Funil de vendas automatizado por etapas',
      'SequÃªncia de follow-up por tempo ou aÃ§Ã£o',
      'Envio automÃ¡tico de propostas e orÃ§amentos',
      'Lembretes de pagamento e boleto prÃ³ximo ao vencimento',
      'Upsell e cross-sell automÃ¡tico pÃ³s-compra',
      'ReativaÃ§Ã£o de clientes inativos',
      'RelatÃ³rio de conversÃ£o por etapa do funil',
    ],
    tech: ['WhatsApp Business API', 'Node.js', 'PostgreSQL', 'Pix API'],
  },
  {
    id: 'suporte-faq',
    category: 'automacoes',
    name: 'Suporte & FAQ',
    tagline: 'Resolva 80% dos chamados sem intervenÃ§Ã£o humana',
    icon: 'â“',
    gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    heroColor: '#38ef7d',
    description: [
      'Suporte tÃ©cnico e pÃ³s-venda sÃ£o caros e demorados. Com uma base de conhecimento bem estruturada no bot, a maioria das dÃºvidas Ã© resolvida na hora sem esperar um atendente.',
      'O bot entende a intenÃ§Ã£o da mensagem (nÃ£o precisa de comando exato), consulta a base de conhecimento e responde com a soluÃ§Ã£o ou direciona para o setor correto automaticamente.',
    ],
    features: [
      'Base de conhecimento com busca semÃ¢ntica',
      'CompreensÃ£o de linguagem natural (nÃ£o precisa de menu)',
      'Escalonamento automÃ¡tico para suporte humano',
      'Abertura e acompanhamento de chamados',
      'Pesquisa de satisfaÃ§Ã£o pÃ³s-atendimento',
      'RelatÃ³rio de perguntas mais frequentes',
      'IntegraÃ§Ã£o com sistema de tickets',
    ],
    tech: ['WhatsApp Business API', 'OpenAI API', 'Node.js', 'PostgreSQL'],
  },
  {
    id: 'notificacoes',
    category: 'automacoes',
    name: 'NotificaÃ§Ãµes & Alertas',
    tagline: 'Mantenha clientes informados de forma automÃ¡tica e personalizada',
    icon: 'ðŸ””',
    gradient: 'linear-gradient(135deg, #fc4a1a 0%, #f7b733 100%)',
    heroColor: '#f7b733',
    description: [
      'Clientes informados sÃ£o clientes satisfeitos. Status de pedido, confirmaÃ§Ã£o de pagamento, vencimento de plano, resultado de exame â€” notificaÃ§Ãµes no momento certo eliminam ansiedade.',
      'Disparos em massa segmentados, mensagens de aniversÃ¡rio, avisos de manutenÃ§Ã£o programada, lembrete de renovaÃ§Ã£o de contrato â€” automaÃ§Ãµes de relacionamento que fidelizam.',
    ],
    features: [
      'NotificaÃ§Ãµes de status de pedido/serviÃ§o',
      'ConfirmaÃ§Ãµes automÃ¡ticas de pagamento',
      'Alertas de vencimento e renovaÃ§Ã£o',
      'Mensagens de aniversÃ¡rio e datas especiais',
      'Campanhas segmentadas por perfil de cliente',
      'RelatÃ³rio de entrega e leitura das mensagens',
      'Respeito Ã s janelas de atendimento WhatsApp',
    ],
    tech: ['WhatsApp Business API', 'Node.js', 'PostgreSQL', 'Redis'],
  },
  {
    id: 'crm-leads',
    category: 'automacoes',
    name: 'CRM & GestÃ£o de Leads',
    tagline: 'Todos os seus leads organizados, qualificados e acompanhados',
    icon: 'ðŸ“Š',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    heroColor: '#764ba2',
    description: [
      'Sem organizaÃ§Ã£o, leads viram apenas mensagens perdidas. Integramos o WhatsApp a um CRM que qualifica automaticamente cada contato, registra o histÃ³rico e indica o prÃ³ximo passo.',
      'PontuaÃ§Ã£o automÃ¡tica de leads por comportamento, visualizaÃ§Ã£o do pipeline de vendas em tempo real, alertas de oportunidades quentes e relatÃ³rios de desempenho da equipe comercial.',
    ],
    features: [
      'QualificaÃ§Ã£o automÃ¡tica de leads por perguntas',
      'Pipeline de vendas visual com Kanban',
      'HistÃ³rico completo de conversas por cliente',
      'Score de lead baseado em comportamento',
      'Alertas de follow-up para a equipe',
      'RelatÃ³rio de desempenho comercial',
      'IntegraÃ§Ã£o com planilhas e sistemas existentes',
    ],
    tech: ['WhatsApp Business API', 'Node.js', 'PostgreSQL', 'Sheets API'],
  },
];

// ══════════════════════════════════════════════════════════════════
// ── RenderizaÃ§Ã£o dos Segmentos ───────────────────────────────────
// ══════════════════════════════════════════════════════════════════

let activeCategory: Category = 'sites';

function renderSegGrid(category: Category) {
  const grid = document.getElementById('seg-grid');
  if (!grid) return;

  const filtered = SEGMENTS.filter(s => s.category === category);
  grid.innerHTML = filtered.map(seg => `
    <button class="seg-card" data-seg-id="${seg.id}" aria-label="Ver detalhes: ${seg.name}">
      <div class="seg-card-icon" style="background:${seg.gradient}">
        <span>${seg.icon}</span>
      </div>
      <div class="seg-card-body">
        <h3>${seg.name}</h3>
        <p>${seg.tagline}</p>
      </div>
      <div class="seg-card-arrow">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </div>
    </button>
  `).join('');

  grid.querySelectorAll<HTMLElement>('.seg-card').forEach((el, i) => observeFade(el, i * 60));

  grid.querySelectorAll<HTMLButtonElement>('.seg-card').forEach(card => {
    card.addEventListener('click', () => {
      const seg = SEGMENTS.find(s => s.id === card.dataset.segId);
      if (seg) openModal(seg);
    });
  });
}

// Tabs
document.querySelectorAll<HTMLButtonElement>('.seg-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.seg-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    activeCategory = tab.dataset.category as Category;
    renderSegGrid(activeCategory);
  });
});

renderSegGrid('sites');

// ══════════════════════════════════════════════════════════════════
// ── Modal ────────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════

const modal = document.getElementById('seg-modal') as HTMLElement;
const modalOverlay = document.getElementById('seg-modal-overlay') as HTMLElement;
const modalClose = document.getElementById('seg-modal-close') as HTMLButtonElement;
const modalContent = document.getElementById('seg-modal-content') as HTMLElement;

function openModal(seg: Segment) {
  modalContent.innerHTML = `
    <div class="seg-modal-hero" style="background:${seg.gradient}">
      <div class="seg-modal-hero-icon">${seg.icon}</div>
      <div class="seg-modal-hero-text">
        <span class="seg-modal-cat">${catLabel(seg.category)}</span>
        <h2>${seg.name}</h2>
      </div>
    </div>
    <div class="seg-modal-body">
      <p class="seg-modal-tagline">${seg.tagline}</p>
      ${seg.description.map(p => `<p>${p}</p>`).join('')}

      <div class="seg-modal-features">
        <h4>O que entregamos</h4>
        <ul>
          ${seg.features.map(f => `
            <li>
              <span class="check-icon" style="color:${seg.heroColor}">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M20 6L9 17l-5-5"/></svg>
              </span>
              ${f}
            </li>
          `).join('')}
        </ul>
      </div>

      <div class="seg-modal-tech">
        <h4>Tecnologias usadas</h4>
        <div class="tech-badges">
          ${seg.tech.map(t => `<span class="tech-badge" style="border-color:${seg.heroColor}40;color:${seg.heroColor}">${t}</span>`).join('')}
        </div>
      </div>

      <a href="/#contact" class="seg-modal-cta" style="background:${seg.gradient}">
        Quero para meu negÃ³cio
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </a>
    </div>
  `;

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function catLabel(cat: Category) {
  if (cat === 'sites') return 'Site';
  if (cat === 'bots') return 'Bot Discord';
  return 'AutomaÃ§Ã£o WhatsApp';
}

modalOverlay?.addEventListener('click', closeModal);
modalClose?.addEventListener('click', closeModal);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

