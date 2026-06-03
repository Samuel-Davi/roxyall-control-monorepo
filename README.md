# Roxyall Control

> ⚠️ **Projeto em desenvolvimento ativo.** A aplicação está sendo construída e ainda não está disponível para uso.

Sistema de gestão financeira pessoal com foco em controle de gastos, cartões de crédito, reservas e projeção financeira futura.

---

## 🚀 Stack

**Backend**
- Fastify 5 + TypeScript
- Prisma 6 + PostgreSQL
- Zod, JWT, Bcrypt, Nodemailer
- Swagger (documentação da API)
- Docker

**Frontend**
- Next.js 15 + TypeScript
- Tailwind CSS
- TanStack Query + Zustand
- Chart.js

**Infraestrutura**
- Monorepo com pnpm workspaces
- Docker Compose
- AWS (em breve)

---

## 📋 Funcionalidades previstas

- [x] Autenticação (login, cadastro, redefinição de senha)
- [ ] Gerenciamento de contas bancárias
- [ ] Cartões de crédito (limite, fatura por mês)
- [ ] Transações (receitas, despesas, recorrências)
- [ ] Compras parceladas (antecipação e edição em lote)
- [ ] Transações compartilhadas (cartão emprestado, conta dividida)
- [ ] Controle de pessoas e valores devidos
- [ ] Reservas e investimentos
- [ ] Transferências agendadas entre contas
- [ ] Dashboard com projeção de saldo dos próximos meses
- [ ] Painel administrativo
- [ ] Integração com IA para análise de gastos *(futuro)*

---

## 🗂️ Estrutura do projeto

- `apps/web` — Frontend Next.js
- `apps/api` — Backend Fastify
- `packages/types` — Tipos compartilhados
- `docker-compose.yml` — Ambiente local
- `.gitignore` — Arquivos ignorados pelo Git
- `package.json` — Configuração do monorepo
- `pnpm-workspace.yaml` — Configuração do pnpm workspaces
- `tsconfig.json` — Configuração base do TypeScript
- `README.md` — Documentação do projeto

---

## 🔧 Como rodar localmente

**Pré-requisitos:** Docker, Node.js 22+, pnpm

```bash
# Clone o repositório
git clone https://github.com/Samuel-Davi/roxyall-control-monorepo

# Entre na pasta
cd roxyall-control-monorepo

# Suba os containers (migrations e seed rodam automaticamente)
docker compose up -d
```

API disponível em `http://localhost:8080`
Documentação Swagger em `http://localhost:8080/docs`

---

## 📌 Status

| Módulo | Status |
|--------|--------|
| Auth | ✅ Concluído |
| Users | ✅ Concluído |
| Admin | ✅ Concluído |
| Accounts | 🔄 Em desenvolvimento |
| Cards | ⏳ Pendente |
| Transactions | ⏳ Pendente |
| Installments | ⏳ Pendente |
| Persons | ⏳ Pendente |
| Shared Transactions | ⏳ Pendente |
| Reserves | ⏳ Pendente |
| Scheduled Transfers | ⏳ Pendente |
| Dashboard | ⏳ Pendente |
| Frontend | ⏳ Pendente |