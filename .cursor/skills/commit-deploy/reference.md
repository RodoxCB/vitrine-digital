# Referência — Vitrine Digital CI/CD

## Repositório

- GitHub: `RodoxCB/vitrine-digital`
- Remote: `https://github.com/RodoxCB/vitrine-digital.git`

## Branches

| Branch    | Ambiente   | Deploy automático |
|-----------|------------|-------------------|
| `staging` | Preview    | Sim (Vercel)      |
| `main`    | Production | Sim (Vercel)      |

## URLs

| Ambiente   | URL |
|------------|-----|
| Production | https://vitrine-digital-omega.vercel.app |
| Staging    | https://vitrine-digital-git-staging-vdveiculos.vercel.app |

## Vercel

- Projeto: `vdveiculos/vitrine-digital`
- Scope CLI: `vdveiculos`
- Listar deploys: `vercel ls --scope vdveiculos`

## Verificação típica de portfólio

```bash
curl -sL "https://vitrine-digital-git-staging-vdveiculos.vercel.app/" \
  | grep -E 'Gustavinho|portfolio-card|id="portfolio"'
```

Ajuste o `grep` para o conteúdo específico da alteração.

## Screenshots de portfólio

```bash
npx playwright install chromium   # se necessário
npx playwright screenshot \
  --viewport-size=800,500 \
  --wait-for-timeout=3000 \
  "https://exemplo.vercel.app/" \
  "assets/portfolio/nome-projeto.png"
```

Salvar em `assets/portfolio/`, dimensão 800×500.
