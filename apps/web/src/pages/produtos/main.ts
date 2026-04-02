const menuToggle = document.querySelector('.menu-toggle') as HTMLButtonElement | null
const navLinks = document.querySelector('.nav-links') as HTMLElement | null

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active')
    menuToggle.classList.toggle('active')
  })

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active')
      menuToggle.classList.remove('active')
    })
  })
}

document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', event => {
    const href = anchor.getAttribute('href')
    if (!href || href === '#') return
    const target = document.querySelector(href)
    if (!target) return
    event.preventDefault()
    const headerHeight = 80
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight
    window.scrollTo({ top: targetPosition, behavior: 'smooth' })
  })
})

const header = document.querySelector('.header') as HTMLElement | null
window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset
  if (header) {
    if (currentScroll > 100) {
      header.style.background = 'rgba(10, 10, 10, 0.95)'
      header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)'
    } else {
      header.style.background = 'rgba(10, 10, 10, 0.8)'
      header.style.boxShadow = 'none'
    }
  }
})

const yearEl = document.getElementById('year')
if (yearEl) yearEl.textContent = new Date().getFullYear().toString()

// ── Tipos do Directus ──
interface ProdutoDirectus {
  id: number
  slug: string
  tag: string
  badge: string | null
  titulo: string
  resumo: string
  descricao_completa: string
  funcionalidades: string[]
  funcionalidades_expandaveis: Array<{ titulo: string; subitens: string[] }> | null
  integracoes: string[]
  ordem: number
  ativo: boolean
}

// ── Render dos cards ──
function renderExpandableList(items: Array<{ titulo: string; subitens: string[] }>): string {
  return `<ul class="product-list product-list-expandable">
    ${items.map(item => `
      <li class="pli">
        <button class="pli-toggle" aria-expanded="false">
          <span>${item.titulo}</span>
          <svg class="pli-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <ul class="pli-sub">
          ${(item.subitens || []).map(s => `<li>${s}</li>`).join('')}
        </ul>
      </li>
    `).join('')}
  </ul>`
}

function renderSimpleList(features: string[]): string {
  return `<ul class="product-list">
    ${features.slice(0, 4).map(f => `<li>${f}</li>`).join('')}
  </ul>`
}

const svgPlay = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.8"/>
  <polygon points="10,8 17,12 10,16" fill="currentColor"/>
</svg>`

function renderCard(p: ProdutoDirectus): string {
  const isFeatured = Boolean(p.badge)
  const isAccent = p.slug === 'custom'
  const cardClass = `product-card${isFeatured ? ' featured' : ''}${isAccent ? ' accent' : ''}`
  const badgeHtml = p.badge ? `<div class="product-badge">${p.badge}</div>` : ''
  const listHtml = p.funcionalidades_expandaveis && p.funcionalidades_expandaveis.length > 0
    ? renderExpandableList(p.funcionalidades_expandaveis)
    : renderSimpleList(p.funcionalidades || [])

  return `
    <article class="${cardClass}" data-product="${p.slug}">
      ${badgeHtml}
      <div class="product-top">
        <span class="product-tag">${p.tag}</span>
        <h3>${p.titulo}</h3>
        <p>${p.resumo}</p>
      </div>
      ${listHtml}
      <div class="product-actions">
        <button class="btn-preview" data-product="${p.slug}" aria-label="Ver prévia de ${p.titulo}">
          ${svgPlay} Ver prévia
        </button>
        <button class="btn-details" data-product="${p.slug}">Ver tudo →</button>
      </div>
    </article>`
}

// ── Modais ──
const modalPreview = document.getElementById('modal-preview') as HTMLElement | null
const modalDetails = document.getElementById('modal-details') as HTMLElement | null
const previewTagEl = document.getElementById('preview-tag') as HTMLElement | null
const previewTitleEl = document.getElementById('preview-title') as HTMLElement | null
const previewVideoLabelEl = document.getElementById('preview-video-label-text') as HTMLElement | null
const previewScreenListEl = document.getElementById('preview-screen-list') as HTMLElement | null
const detailsContentEl = document.getElementById('details-content') as HTMLElement | null

function openModal(modal: HTMLElement | null) {
  if (!modal) return
  modal.classList.add('open')
  document.body.style.overflow = 'hidden'
}

function closeModal(modal: HTMLElement | null) {
  if (!modal) return
  modal.classList.remove('open')
  document.body.style.overflow = ''
}

function openPreview(p: ProdutoDirectus) {
  if (!modalPreview) return
  if (previewTagEl) previewTagEl.textContent = p.tag
  if (previewTitleEl) previewTitleEl.textContent = p.titulo
  if (previewVideoLabelEl) previewVideoLabelEl.textContent = `Demonstração — ${p.titulo}`
  if (previewScreenListEl) {
    const feats = p.funcionalidades || []
    previewScreenListEl.innerHTML = feats.slice(0, 5).map(f => `
      <div class="preview-screen-item">
        <div class="screen-label">${f}</div>
        <span class="screen-badge">Em breve</span>
      </div>`).join('')
  }
  openModal(modalPreview)
}

function openDetails(p: ProdutoDirectus) {
  if (!modalDetails || !detailsContentEl) return
  const badgeHtml = p.badge ? `<span class="modal-badge">${p.badge}</span>` : ''
  const intHtml = (p.integracoes || []).length
    ? `<div class="details-section-label" style="margin-top:0">Integra com</div>
       <div class="details-integrations-row">
         ${p.integracoes.map(i => `<span class="integration-chip">${i}</span>`).join('')}
       </div>`
    : ''

  detailsContentEl.innerHTML = `
    <div class="details-modal-inner">
      <div><span class="modal-product-tag">${p.tag}</span>${badgeHtml}</div>
      <h2>${p.titulo}</h2>
      <p class="details-modal-summary">${p.resumo}</p>
      <p class="details-modal-full-desc">${p.descricao_completa || ''}</p>
      <div class="details-section-label">Funcionalidades completas</div>
      <div class="details-features-grid">
        ${(p.funcionalidades || []).map(f => `<div class="details-feature-item">${f}</div>`).join('')}
      </div>
      ${intHtml}
      <div class="details-cta-row">
        <a href="/#contact" class="btn btn-primary">Falar com especialista</a>
        <span class="details-cta-note">Resposta em até 24h</span>
      </div>
    </div>`
  openModal(modalDetails)
}

// ── Accordion ──
function initAccordion(container: Element) {
  container.querySelectorAll<HTMLButtonElement>('.pli-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const sub = toggle.nextElementSibling as HTMLElement | null
      const isOpen = toggle.getAttribute('aria-expanded') === 'true'
      const card = toggle.closest('.pli')?.closest('.product-list-expandable')
      if (card) {
        card.querySelectorAll<HTMLButtonElement>('.pli-toggle').forEach(t => {
          if (t !== toggle) {
            t.setAttribute('aria-expanded', 'false')
            ;(t.nextElementSibling as HTMLElement | null)?.classList.remove('open')
          }
        })
      }
      toggle.setAttribute('aria-expanded', isOpen ? 'false' : 'true')
      if (isOpen) sub?.classList.remove('open')
      else sub?.classList.add('open')
    })
  })
}

// ── IntersectionObserver ──
const observer = new IntersectionObserver(
  entries => { entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('animate-in') }) },
  { root: null, rootMargin: '0px', threshold: 0.12 }
)

// ── Fechar modais ──
document.getElementById('modal-preview-close')?.addEventListener('click', () => closeModal(modalPreview))
document.getElementById('modal-details-close')?.addEventListener('click', () => closeModal(modalDetails))
;[modalPreview, modalDetails].forEach(modal => {
  modal?.addEventListener('click', (e: Event) => { if (e.target === modal) closeModal(modal) })
})
document.addEventListener('keydown', (e: KeyboardEvent) => {
  if (e.key === 'Escape') { closeModal(modalPreview); closeModal(modalDetails) }
})

// ── Fetch da API (proxy interno, sem CORS) ──
const DIRECTUS_URL = ''

async function loadProdutos() {
  const grid = document.getElementById('products-grid')
  if (!grid) return

  let produtos: ProdutoDirectus[] = []
  try {
    const res = await fetch('/api/produtos', { headers: { 'Accept': 'application/json' } })
    const json = await res.json()
    produtos = json.data as ProdutoDirectus[]
  } catch {
    grid.innerHTML = '<p style="color:var(--gold);text-align:center">Erro ao carregar produtos.</p>'
    return
  }

  // Renderizar cards
  grid.innerHTML = produtos.map(renderCard).join('')

  // Registrar event listeners nos botões
  const prodMap = new Map(produtos.map(p => [p.slug, p]))

  grid.querySelectorAll<HTMLButtonElement>('.btn-preview').forEach(btn => {
    btn.addEventListener('click', () => {
      const p = prodMap.get(btn.dataset.product || '')
      if (p) openPreview(p)
    })
  })

  grid.querySelectorAll<HTMLButtonElement>('.btn-details').forEach(btn => {
    btn.addEventListener('click', () => {
      const p = prodMap.get(btn.dataset.product || '')
      if (p) openDetails(p)
    })
  })

  // Inicializar acordeão e animação nos novos cards
  grid.querySelectorAll('.product-list-expandable').forEach(initAccordion)
  grid.querySelectorAll('.product-card, .bundle-panel').forEach(el => observer.observe(el))
}

loadProdutos()

