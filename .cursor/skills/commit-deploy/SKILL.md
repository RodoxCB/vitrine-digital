---
name: commit-deploy
description: >-
  Executa fluxo de commit e deploy CI/CD em staging e production via Git + Vercel.
  Use quando o usuário pedir commit, deploy, publicar, staging, main, production,
  preview ou CI/CD neste projeto.
---

# Commit e Deploy (CI/CD)

Fluxo obrigatório para publicar alterações do **Vitrine Digital**.

## Regras gerais

- **Nunca** pule a verificação de staging antes de production.
- **Nunca** faça push em `main` sem confirmação explícita do usuário após staging OK.
- **Nunca** atualize `git config`, force push ou pule hooks.
- Commits só quando o usuário pedir (ou autorizar na etapa de correção).

## Fluxo

```
Alterações locais
    → commit + push em staging
    → deploy preview automático (Vercel)
    → verificar deploy e site
    → [OK] pedir confirmação para main
    → [falha] diagnosticar + plano de ação + pedir autorização
```

### Etapa 1 — Commit em staging

1. `git status`, `git diff`, `git log -3 --oneline`
2. `git checkout staging`
3. Stage apenas arquivos relevantes (nunca `.env`, credenciais)
4. Commit em português, 1–2 frases focadas no *porquê*
5. `git push origin staging`

### Etapa 2 — Verificar deploy preview

Aguardar deploy **Ready** (poll a cada 15s, máx. ~3 min):

```bash
vercel ls --scope vdveiculos 2>&1 | head -8
vercel inspect <url-do-deploy-preview> --scope vdveiculos
```

Validar o site de preview:

```bash
curl -sI "https://vitrine-digital-git-staging-vdveiculos.vercel.app/" | head -3
curl -sL "https://vitrine-digital-git-staging-vdveiculos.vercel.app/" | grep -E '<marcadores das mudanças>'
```

**Se preview retornar HTTP 302 (Vercel SSO):** o deploy pode estar OK mesmo sem `curl` no HTML. Confirme com `vercel inspect` (status **Ready**) e valide o conteúdo em production após merge em `main`, ou peça ao usuário abrir a URL de preview no navegador.

Critérios de sucesso:
- Deploy Vercel: status **Ready** (Preview)
- HTTP 200 no staging
- Conteúdo alterado presente no HTML
- Sem erros óbvios (páginas em branco, 404 em assets novos)

URL alternativa do deploy: usar a URL do `vercel ls` mais recente com Environment **Preview**.

### Etapa 3a — Staging OK → pedir confirmação para main

Reportar ao usuário:
- Hash e mensagem do commit em staging
- Status do deploy preview
- O que foi verificado no site
- Perguntar: **"Posso fazer merge em main e deploy em production?"**

Aguardar confirmação explícita antes de prosseguir.

### Etapa 3b — Staging com falha → diagnosticar e pedir autorização

1. Identificar o problema (deploy Queued/Error, site sem mudanças, asset 404, etc.)
2. Apresentar **plano de ação** com passos concretos
3. Pedir autorização: **"Posso aplicar a correção?"**
4. Corrigir, recommit em staging e repetir da Etapa 2

### Etapa 4 — Production (só após confirmação)

1. `git checkout main`
2. `git merge staging` (fast-forward esperado)
3. `git push origin main`
4. Aguardar deploy **Ready** (Production)
5. Validar: `curl -sL "https://vitrine-digital-omega.vercel.app/" | grep ...`
6. Reportar URLs e commit final

## Mensagem de commit

```bash
git commit -m "$(cat <<'EOF'
Verbo no imperativo + contexto breve.

Detalhe opcional em segunda frase.
EOF
)"
```

## Configuração do projeto

Ver [reference.md](reference.md) para URLs, branches e escopo Vercel.

## Checklist rápido

```
- [ ] Diff revisado
- [ ] Commit em staging
- [ ] Push staging
- [ ] Deploy preview Ready
- [ ] Site staging verificado
- [ ] Confirmação do usuário para main
- [ ] Merge + push main
- [ ] Deploy production Ready
- [ ] Site production verificado
```
