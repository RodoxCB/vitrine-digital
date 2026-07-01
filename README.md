# Vitrine Digital

Site institucional da Vitrine Digital — sites e presença online para pequenos negócios locais.

## Stack

- HTML, CSS e JavaScript (site estático)
- Deploy: [Vercel](https://vercel.com)
- Repositório: GitHub

## Branches e deploy

| Branch    | Ambiente   | Comportamento                          |
|-----------|------------|----------------------------------------|
| `main`    | Production | Deploy automático em produção          |
| `staging` | Preview    | Deploy automático em URL de preview    |

Fluxo recomendado:

1. Desenvolver e testar em `staging`
2. Validar o preview gerado pela Vercel
3. Fazer merge em `main` para publicar em produção

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
