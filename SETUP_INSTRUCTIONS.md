# 🚀 DPB Jornal Admin - Instruções de Setup

## ✅ O que foi criado

Um **CMS completo** para o DPB Jornal com:

### Frontend Público (Netlify)
- ✅ **URL**: https://ephemeral-dango-5d4f6b.netlify.app
- ✅ Página inicial com branding
- ✅ Listagem de artigos publicados
- ✅ Visualização de artigos individuais
- ✅ Design responsivo

### Painel Administrativo (Backend)
- ✅ Login com email/senha
- ✅ CRUD completo de artigos (criar, editar, excluir, listar)
- ✅ Upload de imagem de capa
- ✅ Proteção de rotas (apenas admin)
- ✅ Integração com PostgreSQL Neon

### Banco de Dados
- ✅ PostgreSQL Neon (suas credenciais)
- ✅ Tabelas: users, admin_users, articles
- ✅ Migrations automáticas

## 🔐 Credenciais de Teste

```
Email: admin@dpbjornal.com
Senha: admin123
```

## 📋 Próximas Etapas

### 1. Fazer Upload do Código para GitHub

```bash
# Clone o repositório
git clone <seu-repositorio>
cd dpb-jornal-admin

# Configure seu GitHub
git remote set-url origin https://github.com/<seu-usuario>/<seu-repositorio>.git
git push -u origin main
```

### 2. Deploy do Backend no Railway

#### Opção A: Via Interface Web (Recomendado)

1. Acesse https://railway.app
2. Faça login com GitHub
3. Clique em "New Project" → "Deploy from GitHub"
4. Selecione o repositório `dpb-jornal-admin`
5. Railway detectará automaticamente o `package.json`
6. Configure as variáveis de ambiente:

```
DATABASE_URL=postgresql://neondb_owner:npg_gfyQ8XOPlk2U@ep-blue-tree-ac25bi8m-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
SESSION_SECRET=4e72526145dbfc18cfe25e43f899991988413043204913d1d054c869eac9c03f
NODE_ENV=production
```

7. Railway fará o deploy automaticamente

#### Opção B: Via CLI

```bash
# Instale o Railway CLI
npm i -g @railway/cli

# Faça login
railway login

# Crie um novo projeto
railway init

# Configure as variáveis de ambiente
railway variables set DATABASE_URL="postgresql://..."
railway variables set SESSION_SECRET="4e72526145..."
railway variables set NODE_ENV="production"

# Faça deploy
railway up
```

### 3. Atualizar URL do Backend no Frontend

Após o deploy no Railway, você receberá uma URL como: `https://seu-projeto.up.railway.app`

Atualize a URL da API no arquivo `client/src/lib/trpc.ts`:

```typescript
const apiUrl = 'https://seu-projeto.up.railway.app/api/trpc';
```

Depois faça novo deploy no Netlify:

```bash
pnpm build
netlify deploy --prod --dir=dist/public --auth nfp_jks9zGvG92zDwcY6LvVinP139Ag5NVAm7ab7
```

## 🧪 Testando o Sistema

### 1. Acessar o Frontend
- URL: https://ephemeral-dango-5d4f6b.netlify.app
- Você deve ver a página inicial do DPB Jornal

### 2. Acessar o Painel Admin
- URL: https://ephemeral-dango-5d4f6b.netlify.app/login
- Email: `admin@dpbjornal.com`
- Senha: `admin123`

### 3. Criar um Artigo
1. Faça login no painel admin
2. Clique em "Novo Artigo"
3. Preencha os dados:
   - Título
   - Subtítulo
   - Categoria
   - Conteúdo
   - URL da imagem de capa
   - Autor
   - Data de publicação
4. Clique em "Salvar"

### 4. Visualizar Artigos
- Volte para a página inicial
- Você deve ver o artigo criado na listagem
- Clique no artigo para ver os detalhes

## 📁 Estrutura do Projeto

```
dpb-jornal-admin/
├── client/                    # Frontend React (Vite)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.tsx      # Página inicial
│   │   │   ├── Login.tsx     # Login do admin
│   │   │   ├── Admin.tsx     # Painel administrativo
│   │   │   └── Article.tsx   # Visualização de artigo
│   │   ├── components/       # Componentes reutilizáveis
│   │   ├── lib/trpc.ts       # Cliente tRPC
│   │   └── App.tsx           # Roteador principal
│   └── index.html
├── server/                    # Backend Node.js (Express + tRPC)
│   ├── db.ts                 # Queries do banco de dados
│   ├── routers.ts            # Procedimentos tRPC
│   ├── auth.ts               # Autenticação
│   └── _core/                # Núcleo da aplicação
├── drizzle/                   # Schema e migrations
│   ├── schema.ts             # Definição das tabelas
│   └── migrations/           # Arquivos SQL de migração
├── dist/                      # Build de produção
├── package.json
├── netlify.toml              # Configuração do Netlify
├── DEPLOY_RAILWAY.md         # Instruções de deploy
└── README.md
```

## 🔧 Variáveis de Ambiente

| Variável | Descrição | Valor |
|----------|-----------|-------|
| `DATABASE_URL` | Conexão PostgreSQL Neon | `postgresql://neondb_owner:...` |
| `SESSION_SECRET` | Chave para assinar sessões | `4e72526145...` |
| `NODE_ENV` | Ambiente | `production` |
| `PORT` | Porta do servidor | `3000` |

## 🆘 Troubleshooting

### Erro: "Cannot connect to database"
- Verifique se as credenciais do Neon estão corretas
- Verifique se o IP do servidor está na whitelist do Neon

### Erro: "Login failed"
- Verifique se o email e senha estão corretos
- Verifique se as tabelas foram criadas no banco de dados

### Erro: "Articles not loading"
- Verifique se o backend está rodando
- Verifique se a URL da API está correta no frontend
- Verifique os logs do Railway

## 📚 Documentação

- [Railway Docs](https://docs.railway.app)
- [Netlify Docs](https://docs.netlify.com)
- [Neon Docs](https://neon.tech/docs)
- [tRPC Docs](https://trpc.io)
- [Express Docs](https://expressjs.com)

## 🎯 Próximas Melhorias

- [ ] Adicionar upload de imagens para S3
- [ ] Implementar busca de artigos
- [ ] Adicionar categorias de artigos
- [ ] Implementar comentários
- [ ] Adicionar newsletter
- [ ] Implementar SEO
- [ ] Adicionar analytics
- [ ] Implementar cache

## 📞 Suporte

Para dúvidas ou problemas, consulte a documentação dos serviços utilizados ou entre em contato com o time de desenvolvimento.

---

**Projeto criado com ❤️ para DPB Jornal Investigativo**
