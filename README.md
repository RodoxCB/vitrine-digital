# Vitrine Digital

Site institucional da Vitrine Digital — sites e presença online para pequenos negócios locais.

## Stack

- HTML, CSS e JavaScript (site estático)
- Deploy: [Vercel](https://vercel.com)
- Repositório: GitHub

## Branches e deploy

| Branch    | Ambiente   | URL principal                                              |
|-----------|------------|------------------------------------------------------------|
| `main`    | Production | https://vitrine-digital-omega.vercel.app                   |
| `staging` | Preview    | https://vitrine-digital-git-staging-vdveiculos.vercel.app  |

Repositório: https://github.com/RodoxCB/vitrine-digital

Fluxo recomendado:

1. Desenvolver e testar em `staging`
2. Validar o preview gerado pela Vercel
3. Fazer merge em `main` para publicar em produção

Cada push dispara deploy automaticamente via integração Vercel + GitHub.

## Desenvolvimento local

```bash
python3 -m http.server 8080
```

Abra `http://localhost:8080`.

## Deploy

O deploy é automático via integração Vercel + GitHub:

- **Push em `main`** → production
- **Push em `staging`** → preview

### Configuração inicial (uma vez)

1. Conecte o repositório GitHub no painel da Vercel
2. Confirme que a **Production Branch** está como `main`
3. Mantenha **Automatic Preview Deployments** habilitado para as demais branches

### WhatsApp

Edite o número em `js/main.js`:

```js
const CONFIG = {
  whatsappNumber: '5527999042844',
};
```
