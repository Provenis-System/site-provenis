// Mobile menu
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
// Ano do footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());
// Count-up animado
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
// Animação de entrada dos cards
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
  '.number-card, .spec-card, .process-step, .stack-group, .growth-panel'
).forEach((el, i) => observeFade(el, i * 80));

// Animar barras de progresso no scroll
const growthBars = document.querySelectorAll<HTMLElement>('.growth-bar span');
growthBars.forEach(bar => {
  const target = bar.style.width;
  bar.style.width = '0';
  bar.dataset.targetWidth = target;
});
const barObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bars = (entry.target as HTMLElement).querySelectorAll<HTMLElement>('.growth-bar span');
        bars.forEach((bar, i) => {
          setTimeout(() => {
            bar.style.width = bar.dataset.targetWidth ?? '0';
          }, i * 150);
        });
        barObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.4 }
);
const growthPanel = document.querySelector('.growth-panel');
if (growthPanel) barObserver.observe(growthPanel);

// Animar entrada dos growth-items com stagger
document.querySelectorAll<HTMLElement>('.growth-items > div').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateX(-16px)';
  el.style.transition = `opacity 0.5s ease ${200 + i * 120}ms, transform 0.5s ease ${200 + i * 120}ms`;
});
const growthItemsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        (entry.target as HTMLElement).querySelectorAll<HTMLElement>('.growth-items > div').forEach(el => {
          el.style.opacity = '1';
          el.style.transform = 'translateX(0)';
        });
        growthItemsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);
const growthItems = document.querySelector('.growth-items');
if (growthItems) growthItemsObserver.observe(growthItems);
// ------------------------------------------------------------
// Dados dos segmentos
// ------------------------------------------------------------
type Category = 'sites' | 'bots' | 'automacoes';
interface Segment {
  id: string;
  category: Category;
  name: string;
  tagline: string;
  gradient: string;
  heroColor: string;
  description: string[];
  features: string[];
  tech: string[];
}
const SEGMENTS: Segment[] = [
  // Sites
  {
    id: 'academias',
    category: 'sites',
    name: 'Academias & Fitness',
    tagline: 'Sites que convertem visitantes em alunos matriculados',
    gradient: 'linear-gradient(135deg, #d4af37 0%, #f4d576 50%, #b8960f 100%)',
    heroColor: '#d4af37',
    description: [
      'Uma academia precisa transmitir energia, resultado e confiança logo no primeiro acesso. Construímos sites focados em conversão: da primeira visita à matrícula concluída.',
      'Integramos sistemas de agendamento de aulas, planos de assinatura, galeria de antes e depois e depoimentos em vídeo - tudo com carregamento rápido para reter o visitante.',
    ],
    features: [
      'Landing pages de alta conversão com foco em captação de leads',
      'Agendamento online de aulas experimentais',
      'Exibição de planos, diferenciais e modalidades',
      'Galeria de resultados de alunos (antes e depois)',
      'Integração com WhatsApp para contato imediato',
      'SEO local para aparecer em buscas próximas',
      'Área de membros com treinos e dicas exclusivas',
    ],
    tech: ['Vite', 'TypeScript', 'Node.js', 'PostgreSQL', 'Nginx'],
  },
  {
    id: 'advocacia',
    category: 'sites',
    name: 'Advocacia & Jurídico',
    tagline: 'Presença digital que transmite autoridade e captação de clientes',
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    heroColor: '#4a90d9',
    description: [
      'O mercado jurídico exige credibilidade e sigilo. Desenvolvemos sites que comunicam especialização, histórico de casos e diferenciais do escritório de forma clara e profissional.',
      'Com foco em SEO e captação local, seu escritório aparece na frente quando o cliente pesquisa por um advogado na cidade. Formulário de consulta, chat e WhatsApp integrados.',
    ],
    features: [
      'Design sóbrio e profissional alinhado à identidade do escritório',
      'Apresentação das áreas de atuação com linguagem acessível',
      'Formulário de pré-consulta com triagem automática',
      'Blog jurídico para autoridade e SEO',
      'Seção de perguntas frequentes por área',
      'Agendamento de consultas online',
      'LGPD e privacidade implementadas corretamente',
    ],
    tech: ['Vite', 'TypeScript', 'Express', 'PostgreSQL', 'Nginx'],
  },
  {
    id: 'clinicas',
    category: 'sites',
    name: 'Clínicas & Medicina',
    tagline: 'Do agendamento à fidelização do paciente em um único site',
    gradient: 'linear-gradient(135deg, #005c97 0%, #363795 100%)',
    heroColor: '#4fc3f7',
    description: [
      'Pacientes buscam confiança antes de marcar uma consulta. Apresentamos seus médicos, especialidades e estrutura com design moderno e linguagem humanizada que reduz a ansiedade do usuário.',
      'Agendamento online integrado, prontuário eletrônico básico, lembretes automáticos por WhatsApp e área do paciente são diferenciais que elevam a qualidade do atendimento.',
    ],
    features: [
      'Perfil detalhado dos médicos com formação e especialidades',
      'Agendamento de consultas online com confirmação automática',
      'Integração de lembretes via WhatsApp',
      'Exibição de convênios aceitos',
      'Blog de saúde e conteúdo educativo',
      'SEO para aparecer em buscas de especialidades na cidade',
      'Área do paciente com histórico de consultas',
    ],
    tech: ['Vite', 'TypeScript', 'Node.js', 'PostgreSQL', 'WhatsApp API'],
  },
  {
    id: 'odontologia',
    category: 'sites',
    name: 'Odontologia',
    tagline: 'Sites que transformam cliques em consultas agendadas',
    gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    heroColor: '#38ef7d',
    description: [
      'O setor odontológico é altamente competitivo. Clínicas com presença digital bem trabalhada conseguem atrair pacientes de implantes, clareamentos e ortodontia - serviços de alto ticket.',
      'Criamos sites com galeria de sorrisos transformados, apresentação dos tratamentos, tabela de procedimentos e agendamento online - tudo pensado para converter o visitante em paciente.',
    ],
    features: [
      'Galeria de casos clínicos antes e depois',
      'Apresentação detalhada dos procedimentos e valores',
      'Sistema de agendamento online',
      'Depoimentos em vídeo de pacientes',
      'Integração com Google Maps e avaliações',
      'WhatsApp direto para dúvidas rápidas',
      'Blog de saúde bucal para SEO',
    ],
    tech: ['Vite', 'TypeScript', 'Express', 'PostgreSQL'],
  },
  {
    id: 'estetica',
    category: 'sites',
    name: 'Estética & Salões',
    tagline: 'Beleza também precisa ser vista: sites que preenchem a agenda',
    gradient: 'linear-gradient(135deg, #f953c6 0%, #b91d73 100%)',
    heroColor: '#f953c6',
    description: [
      'Salões de beleza, clínicas de estética e barbearias vendem experiência. Nossos sites comunicam o ambiente, os profissionais e os serviços de forma visual e atraente.',
      'Sistema de agendamento online 24/7 elimina perda de clientes fora do horário comercial. Galeria de trabalhos, avaliações e integração com redes sociais completam a presença digital.',
    ],
    features: [
      'Galeria de trabalhos realizados (cabelos, unhas, pele)',
      'Agendamento online com seleção de profissional e horário',
      'Exibição de serviços com preços e duração',
      'Perfil dos profissionais com especialidades',
      'Integração com Instagram para feed automático',
      'Cupom de desconto para primeira visita',
      'Lembretes automáticos de agendamento via WhatsApp',
    ],
    tech: ['Vite', 'TypeScript', 'Node.js', 'PostgreSQL', 'WhatsApp API'],
  },
  {
    id: 'restaurantes',
    category: 'sites',
    name: 'Restaurantes & Gastronomia',
    tagline: 'Do cardápio digital à reserva online em um clique',
    gradient: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)',
    heroColor: '#f7971e',
    description: [
      'Restaurantes precisam vender experiência antes mesmo da primeira garfada. Fotos profissionais do ambiente, cardápio digital interativo e sistema de reservas são o mínimo para se destacar.',
      'Desenvolvemos soluções completas: cardápio digital com QR code para mesas, pedidos online com integração Pix, sistema de reservas e fidelização via WhatsApp.',
    ],
    features: [
      'Cardápio digital com fotos e categorias filtráveis',
      'QR code para cardápio nas mesas',
      'Sistema de reservas online com controle de capacidade',
      'Pedidos online com integração de pagamento',
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
    tagline: 'Lojas que vendem 24/7 com gestão simples e checkout rápido',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    heroColor: '#667eea',
    description: [
      'Vendas online exigem confiança, velocidade e checkout sem fricção. Construímos lojas virtuais otimizadas para conversão, com gestão de estoque integrada e múltiplos meios de pagamento.',
      'Do catálogo de produtos ao controle de pedidos, entrega e pós-venda - temos soluções para lojas de todos os portes, com painel administrativo intuitivo para você gerenciar tudo.',
    ],
    features: [
      'Catálogo de produtos com filtros avançados e busca',
      'Checkout rápido com Pix, cartão e boleto',
      'Painel administrativo completo',
      'Gestão de estoque e pedidos em tempo real',
      'Cálculo automático de frete (Correios e transportadoras)',
      'E-mail e WhatsApp transacional (pedido, envio, entrega)',
      'Integração com Mercado Livre, Shopee e outros marketplaces',
    ],
    tech: ['Vite', 'TypeScript', 'Node.js', 'PostgreSQL', 'Pix/MP API'],
  },
  {
    id: 'igrejas',
    category: 'sites',
    name: 'Igrejas & Organizações Religiosas',
    tagline: 'Comunidades digitais que aproximam, engajam e crescem',
    gradient: 'linear-gradient(135deg, #4568dc 0%, #b06ab3 100%)',
    heroColor: '#b06ab3',
    description: [
      'Igrejas e organizações religiosas precisam manter a comunidade conectada além dos cultos presenciais. Sites com transmissão ao vivo, calendário de eventos e área de membros fazem isso.',
      'Dízimos e ofertas online, pedidos de oração, inscrições em células e ministérios - tudo centralizado em um portal digital moderno e acessível para todos os membros.',
    ],
    features: [
      'Transmissão ao vivo e biblioteca de pregações',
      'Calendário de eventos e cultos',
      'Sistema de dízimos e ofertas online (Pix)',
      'Inscrição em ministérios e células',
      'Área exclusiva para membros',
      'Pedidos de oração e testemunhos',
      'Blog e devocional diário',
    ],
    tech: ['Vite', 'TypeScript', 'Node.js', 'PostgreSQL', 'Pix API'],
  },
  {
    id: 'educacao',
    category: 'sites',
    name: 'Colégios & Educação',
    tagline: 'Portais educacionais que conectam escola, aluno e família',
    gradient: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
    heroColor: '#4a90e2',
    description: [
      'Instituições de ensino precisam transmitir credibilidade e facilitar a comunicação entre escola, alunos e responsáveis. Um portal bem estruturado aumenta captação e retém famílias.',
      'Desenvolvemos portais com área do aluno, calendário escolar, comunicados, matrículas online, cardápio da cantina, boletim digital e muito mais - tudo em um ambiente seguro.',
    ],
    features: [
      'Portal do aluno e dos responsáveis',
      'Matrículas online com documentação digital',
      'Calendário escolar e comunicados',
      'Galeria de eventos e atividades',
      'Blog pedagógico e boletim informativo',
      'Cardápio semanal e avisos da cantina',
      'Rematrícula digital com assinatura eletrônica',
    ],
    tech: ['Vite', 'TypeScript', 'Node.js', 'PostgreSQL', 'Nginx'],
  },
  {
    id: 'petshop',
    category: 'sites',
    name: 'Petshops & Veterinários',
    tagline: 'Sites que cuidam tão bem dos clientes quanto eles cuidam dos pets',
    gradient: 'linear-gradient(135deg, #56ab2f 0%, #a8e063 100%)',
    heroColor: '#56ab2f',
    description: [
      'Donos de pets são extremamente fiéis a profissionais que transmitem cuidado e competência. Um site bem feito apresenta os serviços, equipe e diferenciais do seu petshop ou clínica veterinária.',
      'Agendamento de banho, tosa e consultas online, loja virtual de produtos pets, prontuário do animal e lembretes de vacinas são recursos que fidelizam clientes.',
    ],
    features: [
      'Agendamento de banho, tosa e consultas',
      'Prontuário digital do animal',
      'Loja virtual de produtos pets',
      'Lembretes automáticos de vacinas e consultas',
      'Galeria de fotos dos pets atendidos',
      'Blog com dicas de saúde animal',
      'Integração WhatsApp para emergências',
    ],
    tech: ['Vite', 'TypeScript', 'Node.js', 'PostgreSQL', 'WhatsApp API'],
  },
  {
    id: 'transportadoras',
    category: 'sites',
    name: 'Transportadoras & Logística',
    tagline: 'Rastreabilidade, credibilidade e captação de novos clientes',
    gradient: 'linear-gradient(135deg, #373b44 0%, #4286f4 100%)',
    heroColor: '#4286f4',
    description: [
      'Transportadoras e empresas de logística precisam transmitir confiança, pontualidade e cobertura de rotas. Sites claros com cotação online e rastreamento aumentam a conversão de novos clientes.',
      'Sistema de cotação de frete em tempo real, rastreamento de encomendas, área do cliente com histórico de fretes e emissão de CTE são recursos que profissionalizam a operação digital.',
    ],
    features: [
      'Calculadora de frete online',
      'Rastreamento de carga em tempo real',
      'Área do cliente com histórico de pedidos',
      'Cobertura de rotas interativa no mapa',
      'Formulário de cotação com resposta automática',
      'Emissão de CTE e documentos digitais',
      'Portal de parceiros e transportadores',
    ],
    tech: ['Vite', 'TypeScript', 'Node.js', 'PostgreSQL', 'Maps API'],
  },
  {
    id: 'industrias',
    category: 'sites',
    name: 'Indústrias & B2B',
    tagline: 'Sites institucionais que geram credibilidade e abrem portas',
    gradient: 'linear-gradient(135deg, #485563 0%, #29323c 100%)',
    heroColor: '#9e9e9e',
    description: [
      'Empresas B2B e indústrias precisam de sites que transmitam escala, capacidade produtiva e confiabilidade. O comprador pesquisa o fornecedor antes de qualquer contato comercial.',
      'Portfólio de produtos, certificações, capacidade instalada, parceiros homologados e formulário de solicitação de orçamento - tudo estruturado para converter o lead corporativo.',
    ],
    features: [
      'Catálogo de produtos/serviços com especificações técnicas',
      'Apresentação da capacidade produtiva e estrutura',
      'Seção de certificações e selos de qualidade',
      'Formulário de solicitação de orçamento corporativo',
      'Área de distribuidores e representantes',
      'Blog técnico e cases de sucesso',
      'Integração com ERP para estoque em tempo real',
    ],
    tech: ['Vite', 'TypeScript', 'Node.js', 'PostgreSQL', 'ERP API'],
  },
  // Bots Discord
  {
    id: 'bot-comunidade',
    category: 'bots',
    name: 'Bot Comunidade',
    tagline: 'Gerencie, engaje e faça sua comunidade crescer no piloto automático',
    gradient: 'linear-gradient(135deg, #5865F2 0%, #3d47c9 100%)',
    heroColor: '#5865F2',
    description: [
      'Um servidor de Discord ativo precisa de estrutura. Cargos automáticos por tempo de servidor, sistema de boas-vindas personalizado, regras interativas e moderação automatizada - tudo em um bot.',
      'Sistemas de níveis e XP que gamificam a participação, enquetes, sorteios, ranking de membros e comandos customizados para refletir a identidade da sua comunidade.',
    ],
    features: [
      'Sistema de boas-vindas com mensagem e cargo automático',
      'Níveis e XP baseados em atividade',
      'Moderação automatizada (spam, flood, links proibidos)',
      'Sorteios, enquetes e eventos interativos',
      'Cargos de reação (reaction roles)',
      'Log completo de ações dos moderadores',
      'Comandos customizados pelo dono do servidor',
    ],
    tech: ['Discord.js', 'Node.js', 'PostgreSQL', 'Redis'],
  },
  {
    id: 'bot-esports',
    category: 'bots',
    name: 'Bot E-sports & Campeonatos',
    tagline: 'Organize torneios, placar ao vivo e ranking automático',
    gradient: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)',
    heroColor: '#ffd200',
    description: [
      'Organizar campeonatos no Discord é caótico sem automação. Nosso bot de e-sports gerencia inscrições de times, chaves de torneio, placares ao vivo e rankings em tempo real.',
      'Suporta múltiplos jogos (Free Fire, CS2, Valorant, LOL, Fortnite), formatos variados (eliminatória, pontos corridos, mata-mata) e envia atualizações automáticas nos canais.',
    ],
    features: [
      'Inscrição de times com validação automática',
      'Geração de chaves e brackets de torneio',
      'Placar ao vivo com atualização automática',
      'Ranking de times e jogadores',
      'Canal dedicado a cada partida',
      'Verificação de times em plataformas (Faceit, Battlefy)',
      'Suporte a múltiplos jogos e formatos de campeonato',
    ],
    tech: ['Discord.js', 'Node.js', 'PostgreSQL', 'WebSocket'],
  },
  {
    id: 'bot-apostas',
    category: 'bots',
    name: 'Bot Apostas Esportivas',
    tagline: 'Simulador de apostas com probabilidades, ranking e gestão de banca',
    gradient: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)',
    heroColor: '#71b280',
    description: [
      'Servidores de tips e apostas esportivas ganham engajamento com um bot que simula apostas com moeda virtual, rankeia os melhores apostadores e exibe odds em tempo real.',
      'Gestão de banca virtual, histórico de apostas, placares ao vivo de partidas e alertas de eventos esportivos programados. Tudo para manter a comunidade ativa durante os jogos.',
    ],
    features: [
      'Sistema de moeda virtual para apostas simuladas',
      'Odds dinâmicas por mercado (resultado, handicap, escanteios)',
      'Ranking de apostadores com histórico',
      'Alertas de partidas ao vivo e resultados',
      'Análise de desempenho por apostador',
      'Canal de tips com formatação automática',
      'Integração com APIs de dados esportivos',
    ],
    tech: ['Discord.js', 'Node.js', 'PostgreSQL', 'Sports API'],
  },
  {
    id: 'bot-streamers',
    category: 'bots',
    name: 'Bot Streamers',
    tagline: 'Notificações ao vivo, clips automáticos e engajamento da fanbase',
    gradient: 'linear-gradient(135deg, #9146ff 0%, #6441a5 100%)',
    heroColor: '#9146ff',
    description: [
      'Streamers precisam manter a comunidade engajada mesmo fora das lives. Nosso bot notifica automaticamente quando o streamer vai ao ar, com preview e link da live no Discord.',
      'Sistema de pontos para espectadores, comandos de clip, counters de follows/subs ao vivo, comandos personalizados que ativam efeitos na live - integrações Twitch e YouTube.',
    ],
    features: [
      'Notificação automática ao entrar ao vivo (Twitch/YouTube)',
      'Prévia da live com título, jogo e thumbnail',
      'Sistema de pontos de canal (lealdade da fanbase)',
      'Comandos de clip e highlights automáticos',
      'Counter de seguidores e inscritos em tempo real',
      'Comandos customizados para a comunidade',
      'Integração com OBS para overlays e alertas',
    ],
    tech: ['Discord.js', 'Twitch API', 'YouTube API', 'Node.js', 'WebSocket'],
  },
  {
    id: 'bot-fivem',
    category: 'bots',
    name: 'Bot FiveM & Cidades RP',
    tagline: 'Painel de gestão, whitelist e vida civil para sua cidade RP',
    gradient: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
    heroColor: '#4db8ff',
    description: [
      'Cidades de RolePlay no FiveM exigem organização rigorosa. Um bot dedicado centraliza whitelist, fichas de personagem, sistema judiciário, empregos e muito mais diretamente no Discord.',
      'Integração entre o servidor FiveM e o Discord em tempo real: players online, status do servidor, logs de ações, sistema de cargos por facção e comandos exclusivos para staff.',
    ],
    features: [
      'Sistema de whitelist com formulário e aprovação automática',
      'Fichas de personagem com validação de backstory',
      'Painel de empregos e facções',
      'Sistema judiciário (mandados, prisões, multas)',
      'Status do servidor FiveM em tempo real',
      'Logs de ações e moderação de staff',
      'Integração banco de dados FiveM - Discord',
    ],
    tech: ['Discord.js', 'Node.js', 'PostgreSQL', 'FiveM txAdmin API'],
  },
  {
    id: 'bot-loja',
    category: 'bots',
    name: 'Bot Loja & Vendas',
    tagline: 'Venda produtos e serviços digitais direto no Discord com Pix',
    gradient: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)',
    heroColor: '#f7971e',
    description: [
      'Lojas digitais dentro do Discord geram vendas sem o cliente precisar sair da plataforma. Catálogo de produtos, pagamento via Pix automático e entrega instantânea de licenças ou acessos.',
      'Painel de administração para estoque, histórico de pedidos, gestão de clientes VIP e sistema de cupons de desconto. Ideal para venda de contas, serviços e produtos digitais.',
    ],
    features: [
      'Catálogo interativo de produtos com preços',
      'Pagamento automático via Pix (confirmação instantânea)',
      'Entrega automática de produto/chave após pagamento',
      'Histórico de compras por usuário',
      'Sistema de cupons e descontos',
      'Painel admin para gestão de estoque',
      'Suporte a produtos físicos e digitais',
    ],
    tech: ['Discord.js', 'Node.js', 'PostgreSQL', 'Pix/MP API'],
  },
  {
    id: 'bot-roblox',
    category: 'bots',
    name: 'Bot Roblox',
    tagline: 'Verificação Roblox, ranks automáticos e gestão do grupo',
    gradient: 'linear-gradient(135deg, #e50000 0%, #ff6b6b 100%)',
    heroColor: '#ff6b6b',
    description: [
      'Comunidades Roblox no Discord precisam de verificação de conta, sincronização de ranks do grupo e comandos de jogabilidade. Nosso bot faz a ponte perfeita entre as duas plataformas.',
      'Sistema de verificação automático via API do Roblox, sincronização de cargos por rank do grupo, comandos de jogos, estatísticas de players e alertas de updates do jogo.',
    ],
    features: [
      'Verificação de conta Roblox vinculada ao Discord',
      'Sincronização de ranks do grupo com cargos do Discord',
      'Comandos de estatísticas de jogador',
      'Alertas de atualizações e eventos do jogo',
      'Moderação de membros não verificados',
      'Sistema de candidaturas para o grupo',
      'Painel de administração do grupo Roblox',
    ],
    tech: ['Discord.js', 'Roblox API', 'Node.js', 'PostgreSQL'],
  },
  {
    id: 'bot-minecraft',
    category: 'bots',
    name: 'Bot Minecraft',
    tagline: 'Status do servidor, ranking de jogadores e eventos automáticos',
    gradient: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)',
    heroColor: '#71b280',
    description: [
      'Servidores Minecraft ganham vida com um bot que exibe status em tempo real, jogadores online, ranking por conquistas e notificações automáticas quando o servidor sobe ou cai.',
      'Integração via RCON para comandos remotos direto do Discord, sistema de whitelist, votações de temporada e eventos automáticos de drops e torneios.',
    ],
    features: [
      'Status do servidor em tempo real (players, TPS, memória)',
      'Lista de jogadores online com tempo de sessão',
      'Ranking por conquistas e tempo de jogo',
      'Whitelist gerenciada pelo Discord',
      'Comandos RCON para admins (kick, ban, give)',
      'Alertas de queda/retorno do servidor',
      'Eventos automáticos (drops, torneios, votações)',
    ],
    tech: ['Discord.js', 'Minecraft RCON', 'Node.js', 'PostgreSQL'],
  },
  {
    id: 'bot-facc',
    category: 'bots',
    name: 'Bot Facções & FACC',
    tagline: 'Hierarquia, recrutamento e guerras automatizados para sua FACC',
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #e94560 100%)',
    heroColor: '#e94560',
    description: [
      'Facções e grupos competitivos no Discord precisam de estrutura para recrutamento, hierarquia, registro de guerras e pontuação. Nosso bot automatiza toda a gestão operacional da FACC.',
      'Sistema de recrutamento com formulário, aprovação por rank, pontuação de guerras, registro de baixas, sistema de promoções e arquivo histórico de conflitos.',
    ],
    features: [
      'Sistema de recrutamento com formulário e triagem',
      'Hierarquia de cargos com permissões por nível',
      'Registro e placar de guerras/conflitos',
      'Sistema de promoções e rebaixamentos',
      'Log completo de ações da facção',
      'Missões e objetivos com recompensa de pontos',
      'Aliança e rivalidade com outras facções',
    ],
    tech: ['Discord.js', 'Node.js', 'PostgreSQL', 'Redis'],
  },
  // Automações WhatsApp
  {
    id: 'atendimento-auto',
    category: 'automacoes',
    name: 'Atendimento Automatizado',
    tagline: 'Responda clientes 24/7 sem precisar de um atendente online',
    gradient: 'linear-gradient(135deg, #25d366 0%, #128c7e 100%)',
    heroColor: '#25d366',
    description: [
      'Clientes não esperam. Um chatbot bem construído responde dúvidas frequentes, envia cardápios, tabelas de preços e direciona para o atendente humano certo - a qualquer hora.',
      'Utilizamos a API oficial do WhatsApp Business para garantir estabilidade, sem risco de banimento. Fluxos de conversa inteligentes que aprendem com as interações mais comuns do seu negócio.',
    ],
    features: [
      'Respostas automáticas 24/7 com menu interativo',
      'Envio automático de catálogos, cardápios e tabelas',
      'Transferência inteligente para atendente humano',
      'Respostas para as 50 dúvidas mais frequentes',
      'Multi-atendente com filas organizadas',
      'Relatório de atendimentos e satisfação',
      'Integração com CRM para histórico do cliente',
    ],
    tech: ['WhatsApp Business API', 'Node.js', 'PostgreSQL', 'Redis'],
  },
  {
    id: 'agendamento-auto',
    category: 'automacoes',
    name: 'Agendamento de Serviços',
    tagline: 'Agenda preenchida automaticamente sem uma ligação sequer',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    heroColor: '#4facfe',
    description: [
      'Negócios baseados em horários (salões, clínicas, academias, consultórios) perdem clientes por não conseguir agendar fora do horário comercial. Nossa automação resolve isso.',
      'O cliente envia uma mensagem, vê os horários disponíveis, escolhe, confirma e recebe o lembrete automático no dia anterior. Zero intervenção humana no processo de agendamento.',
    ],
    features: [
      'Consulta de disponibilidade em tempo real',
      'Agendamento por mensagem de texto ou botões',
      'Confirmação automática com detalhes do serviço',
      'Lembretes 24h e 1h antes do horário',
      'Reagendamento e cancelamento via WhatsApp',
      'Sincronização com Google Calendar',
      'Relatório de agendamentos e ocupação',
    ],
    tech: ['WhatsApp Business API', 'Node.js', 'PostgreSQL', 'Google Calendar API'],
  },
  {
    id: 'vendas-auto',
    category: 'automacoes',
    name: 'Vendas & Follow-up',
    tagline: 'Funil de vendas no WhatsApp que converte leads em clientes',
    gradient: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)',
    heroColor: '#f7971e',
    description: [
      'A maioria das vendas é perdida por falta de follow-up. Nossa automação acompanha cada lead desde o primeiro contato até o fechamento, enviando mensagens no tempo certo com o conteúdo certo.',
      'Sequência de nutrição automatizada, envio de propostas, lembretes de pagamento, upsell pós-compra e reativação de clientes inativos - tudo no WhatsApp onde o cliente já está.',
    ],
    features: [
      'Funil de vendas automatizado por etapas',
      'Sequência de follow-up por tempo ou ação',
      'Envio automático de propostas e orçamentos',
      'Lembretes de pagamento e boleto próximo ao vencimento',
      'Upsell e cross-sell automático pós-compra',
      'Reativação de clientes inativos',
      'Relatório de conversão por etapa do funil',
    ],
    tech: ['WhatsApp Business API', 'Node.js', 'PostgreSQL', 'Pix API'],
  },
  {
    id: 'suporte-faq',
    category: 'automacoes',
    name: 'Suporte & FAQ',
    tagline: 'Resolva 80% dos chamados sem intervenção humana',
    gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    heroColor: '#38ef7d',
    description: [
      'Suporte técnico e pós-venda são caros e demorados. Com uma base de conhecimento bem estruturada no bot, a maioria das dúvidas é resolvida na hora sem esperar um atendente.',
      'O bot entende a intenção da mensagem (não precisa de comando exato), consulta a base de conhecimento e responde com a solução ou direciona para o setor correto automaticamente.',
    ],
    features: [
      'Base de conhecimento com busca semântica',
      'Compreensão de linguagem natural (não precisa de menu)',
      'Escalonamento automático para suporte humano',
      'Abertura e acompanhamento de chamados',
      'Pesquisa de satisfação pós-atendimento',
      'Relatório de perguntas mais frequentes',
      'Integração com sistema de tickets',
    ],
    tech: ['WhatsApp Business API', 'OpenAI API', 'Node.js', 'PostgreSQL'],
  },
  {
    id: 'notificacoes',
    category: 'automacoes',
    name: 'Notificações & Alertas',
    tagline: 'Mantenha clientes informados de forma automática e personalizada',
    gradient: 'linear-gradient(135deg, #fc4a1a 0%, #f7b733 100%)',
    heroColor: '#f7b733',
    description: [
      'Clientes informados são clientes satisfeitos. Status de pedido, confirmação de pagamento, vencimento de plano, resultado de exame - notificações no momento certo eliminam ansiedade.',
      'Disparos em massa segmentados, mensagens de aniversário, avisos de manutenção programada, lembrete de renovação de contrato - automações de relacionamento que fidelizam.',
    ],
    features: [
      'Notificações de status de pedido/serviço',
      'Confirmações automáticas de pagamento',
      'Alertas de vencimento e renovação',
      'Mensagens de aniversário e datas especiais',
      'Campanhas segmentadas por perfil de cliente',
      'Relatório de entrega e leitura das mensagens',
      'Respeito às janelas de atendimento WhatsApp',
    ],
    tech: ['WhatsApp Business API', 'Node.js', 'PostgreSQL', 'Redis'],
  },
  {
    id: 'crm-leads',
    category: 'automacoes',
    name: 'CRM & Gestão de Leads',
    tagline: 'Todos os seus leads organizados, qualificados e acompanhados',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    heroColor: '#764ba2',
    description: [
      'Sem organização, leads viram apenas mensagens perdidas. Integramos o WhatsApp a um CRM que qualifica automaticamente cada contato, registra o histórico e indica o próximo passo.',
      'Pontuação automática de leads por comportamento, visualização do pipeline de vendas em tempo real, alertas de oportunidades quentes e relatórios de desempenho da equipe comercial.',
    ],
    features: [
      'Qualificação automática de leads por perguntas',
      'Pipeline de vendas visual com Kanban',
      'Histórico completo de conversas por cliente',
      'Score de lead baseado em comportamento',
      'Alertas de follow-up para a equipe',
      'Relatório de desempenho comercial',
      'Integração com planilhas e sistemas existentes',
    ],
    tech: ['WhatsApp Business API', 'Node.js', 'PostgreSQL', 'Sheets API'],
  },
];
// ------------------------------------------------------------
// Renderização dos segmentos
// ------------------------------------------------------------
let activeCategory: Category = 'sites';
const SEGMENT_IMAGES: Record<string, string> = {
  academias: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=640&q=80',
  advocacia: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=640&q=80',
  clinicas: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=640&q=80',
  odontologia: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=640&q=80',
  estetica: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=640&q=80',
  restaurantes: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=640&q=80',
  ecommerce: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=640&q=80',
  igrejas: 'https://images.unsplash.com/photo-1438032005730-c779502df39b?auto=format&fit=crop&w=640&q=80',
  educacao: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=640&q=80',
  petshop: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=640&q=80',
  transportadoras: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=640&q=80',
  industrias: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=640&q=80',
  'bot-comunidade': 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=640&q=80',
  'bot-esports': 'https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&w=640&q=80',
  'bot-apostas': 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=640&q=80',
  'bot-streamers': 'https://images.unsplash.com/photo-1497015289639-54688650d173?auto=format&fit=crop&w=640&q=80',
  'bot-fivem': 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=640&q=80',
  'bot-loja': 'https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=640&q=80',
  'bot-roblox': 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=640&q=80',
  'bot-minecraft': 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=640&q=80',
  'bot-facc': 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=640&q=80',
  'atendimento-auto': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=640&q=80',
  'agendamento-auto': 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=640&q=80',
  'vendas-auto': 'https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=640&q=80',
  'suporte-faq': 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=640&q=80',
  notificacoes: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=640&q=80',
  'crm-leads': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=640&q=80',
};
function segmentImage(id: string) {
  return SEGMENT_IMAGES[id] ?? SEGMENT_IMAGES.academias;
}
function renderSegGrid(category: Category) {
  const grid = document.getElementById('seg-grid');
  if (!grid) return;
  const filtered = SEGMENTS.filter(s => s.category === category);
  grid.innerHTML = filtered.map(seg => `
    <button class="seg-card" data-seg-id="${seg.id}" aria-label="Ver detalhes: ${seg.name}">
      <div class="seg-card-media" style="background:${seg.gradient}">
        <img src="${segmentImage(seg.id)}" alt="" loading="lazy" onerror="this.remove()" />
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
// ------------------------------------------------------------
// Modal
// ------------------------------------------------------------
const modal = document.getElementById('seg-modal') as HTMLElement;
const modalOverlay = document.getElementById('seg-modal-overlay') as HTMLElement;
const modalClose = document.getElementById('seg-modal-close') as HTMLButtonElement;
const modalContent = document.getElementById('seg-modal-content') as HTMLElement;
function openModal(seg: Segment) {
  modalContent.innerHTML = `
    <div class="seg-modal-hero" style="background:${seg.gradient}">
      <img class="seg-modal-hero-img" src="${segmentImage(seg.id)}" alt="" onerror="this.remove()" />
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
      <a href="/#contact" class="seg-modal-cta" style="background:${seg.gradient}">
        Quero para meu negócio
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
  return 'Automação WhatsApp';
}
modalOverlay?.addEventListener('click', closeModal);
modalClose?.addEventListener('click', closeModal);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
