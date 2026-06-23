# Deploy no Railway

Este projeto é um CMS completo com frontend estático no Netlify e backend Node.js no Railway.

## Arquitetura

- **Frontend**: Netlify (site estático)
  - URL: https://ephemeral-dango-5d4f6b.netlify.app
  - Contém: Página inicial, listagem de artigos, visualização de artigos individuais

- **Backend**: Railway (servidor Node.js)
  - Contém: API tRPC, autenticação admin, CRUD de artigos
  - Banco de dados: PostgreSQL Neon

## Configuração no Railway

### 1. Criar conta no Railway
- Acesse https://railway.app
- Faça login com GitHub

### 2. Criar novo projeto
- Clique em "New Project"
- Selecione "Deploy from GitHub"
- Conecte seu repositório GitHub

### 3. Configurar variáveis de ambiente
No painel do Railway, adicione as seguintes variáveis de ambiente:

```
DATABASE_URL=postgresql://neondb_owner:npg_gfyQ8XOPlk2U@ep-blue-tree-ac25bi8m-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
SESSION_SECRET=4e72526145dbfc18cfe25e43f899991988413043204913d1d054c869eac9c03f
NODE_ENV=production
PORT=3000
```

### 4. Configurar build e start
- **Build Command**: `pnpm build`
- **Start Command**: `node dist/index.js`

### 5. Deploy
O Railway fará o deploy automaticamente quando você fazer push para o repositório.

## Credenciais de Teste

- **Email**: admin@dpbjornal.com
- **Senha**: admin123

## URLs

- **Frontend**: https://ephemeral-dango-5d4f6b.netlify.app
- **Backend API**: https://seu-projeto.up.railway.app/api/trpc

## Estrutura do Projeto

```
dpb-jornal-admin/
├── client/                 # Frontend React (Vite)
│   └── src/
│       ├── pages/         # Páginas da aplicação
│       ├── components/    # Componentes reutilizáveis
│       └── App.tsx        # Roteador principal
├── server/                # Backend Node.js (Express + tRPC)
│   ├── db.ts             # Queries do banco de dados
│   ├── routers.ts        # Procedimentos tRPC
│   └── _core/            # Núcleo da aplicação
├── drizzle/              # Schema e migrations do banco
├── dist/                 # Build de produção
└── netlify.toml          # Configuração do Netlify
```

## Funcionalidades

### Frontend Público
- ✅ Página inicial com branding
- ✅ Listagem de artigos publicados
- ✅ Visualização de artigos individuais
- ✅ Design responsivo

### Painel Administrativo
- ✅ Login com email e senha
- ✅ Listagem de artigos
- ✅ Criar novo artigo
- ✅ Editar artigo
- ✅ Excluir artigo
- ✅ Upload de imagem de capa
- ✅ Proteção de rotas (apenas admin)

### Banco de Dados
- ✅ PostgreSQL Neon
- ✅ Tabelas: users, admin_users, articles
- ✅ Migrations automáticas com Drizzle

## Próximos Passos

1. Criar repositório GitHub e fazer push do código
2. Conectar Railway ao repositório
3. Configurar variáveis de ambiente no Railway
4. Fazer deploy automático
5. Testar login e CRUD de artigos
6. Publicar artigos no painel admin
7. Visualizar artigos no frontend público

## Suporte

Para mais informações, consulte:
- [Railway Docs](https://docs.railway.app)
- [Netlify Docs](https://docs.netlify.com)
- [Neon Docs](https://neon.tech/docs)
