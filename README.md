# site_provenis_venda

Estrutura organizada para **site (web)** + **backend (API)** em **TypeScript**.

## Pastas

- `apps/web`: frontend (páginas em pastas próprias)
- `apps/api`: backend/API (módulos/funções em pastas próprias)
- `docs`: documentação extra

## Banco de dados

O guia de Postgres multi-tenant por schema está em [postgres.md](postgres.md).

## Como rodar (depois que instalar deps)

- `npm install`
- Web: `npm run web:dev`
- API: `npm run api:dev`

## Produção (Docker)

Arquivos principais:

- [docker-compose.prod.yml](docker-compose.prod.yml): web (nginx) + api (usa Postgres CENTRAL)
- [Dockerfile.web](Dockerfile.web): build do Vite + nginx (com proxy para `/api`)
- [Dockerfile.api](Dockerfile.api): build TS + start da API

Passos:

1) Copie [\.env.production.example](.env.production.example) para `.env` e ajuste as variáveis.
2) Suba os containers:

`docker compose -f docker-compose.prod.yml up -d --build`

O site fica em `http://SEU_SERVIDOR/`.
