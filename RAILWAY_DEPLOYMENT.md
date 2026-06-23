# 🚀 Guia de Deploy no Railway

Este guia passo a passo mostra como fazer o deploy do backend do DPB Jornal no Railway.

## ✅ Pré-requisitos

- Conta no Railway (https://railway.app)
- Repositório GitHub com o código (✅ Já criado!)
- Credenciais do Neon PostgreSQL (✅ Já configuradas!)

## 📋 Passo a Passo

### 1️⃣ Acessar Railway

1. Acesse https://railway.app
2. Clique em "Login" e faça login com GitHub
3. Autorize o Railway a acessar sua conta GitHub

### 2️⃣ Criar Novo Projeto

1. Clique em "New Project"
2. Selecione "Deploy from GitHub repo"
3. Busque por `dpb-jornal-admin`
4. Clique em "Deploy"

Railway começará a fazer o build automaticamente!

### 3️⃣ Configurar Variáveis de Ambiente

Enquanto o Railway faz o build, configure as variáveis de ambiente:

1. No painel do Railway, clique em "Variables"
2. Adicione as seguintes variáveis:

```
DATABASE_URL=postgresql://neondb_owner:npg_gfyQ8XOPlk2U@ep-blue-tree-ac25bi8m-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require

SESSION_SECRET=4e72526145dbfc18cfe25e43f899991988413043204913d1d054c869eac9c03f

NODE_ENV=production
```

3. Clique em "Save"

### 4️⃣ Configurar Build e Deploy

1. Clique em "Settings"
2. Configure:
   - **Build Command**: `pnpm build`
   - **Start Command**: `node dist/index.js`
3. Clique em "Save"

### 5️⃣ Aguardar Deploy

1. Clique em "Deployments"
2. Aguarde o build e deploy completarem
3. Quando estiver "Live", você verá a URL do seu backend

### 6️⃣ Obter URL do Backend

1. No painel do Railway, clique em "Settings"
2. Procure por "Public URL" ou "Domain"
3. Copie a URL (será algo como: `https://seu-projeto.up.railway.app`)

## 🔗 Atualizar Frontend com URL do Backend

Após obter a URL do Railway, você precisa atualizar o frontend:

### No Netlify:

1. Acesse https://app.netlify.com
2. Selecione o site `ephemeral-dango-5d4f6b`
3. Vá para "Site settings" → "Build & deploy" → "Environment"
4. Adicione a variável:
   ```
   VITE_API_URL=https://seu-projeto.up.railway.app
   ```
5. Clique em "Save"

### Fazer novo deploy no Netlify:

```bash
cd /home/ubuntu/dpb-jornal-admin
pnpm build
netlify deploy --prod --dir=dist/public --auth nfp_jks9zGvG92zDwcY6LvVinP139Ag5NVAm7ab7
```

## 🧪 Testar o Sistema

### 1. Acessar o Painel Admin

```
URL: https://ephemeral-dango-5d4f6b.netlify.app/login
Email: admin@dpbjornal.com
Senha: admin123
```

### 2. Criar um Artigo

1. Faça login
2. Clique em "Novo Artigo"
3. Preencha os dados:
   - **Título**: "Meu Primeiro Artigo"
   - **Subtítulo**: "Descrição breve"
   - **Categoria**: "Investigação"
   - **Conteúdo**: "Conteúdo do artigo..."
   - **Cover URL**: "https://via.placeholder.com/600x400"
   - **Autor**: "Seu Nome"
   - **Data de Publicação**: Hoje
4. Clique em "Salvar"

### 3. Visualizar no Frontend

1. Acesse https://ephemeral-dango-5d4f6b.netlify.app
2. Você deve ver o artigo na listagem
3. Clique no artigo para ver os detalhes

## 🆘 Troubleshooting

### Erro: "Build failed"

**Solução**: Verifique os logs do Railway:
1. Clique em "Deployments"
2. Clique no deploy com erro
3. Verifique os logs para encontrar o problema

### Erro: "Cannot connect to database"

**Solução**: Verifique as variáveis de ambiente:
1. Certifique-se de que `DATABASE_URL` está correta
2. Verifique se o IP do Railway está na whitelist do Neon

### Erro: "Login failed"

**Solução**: Verifique o banco de dados:
1. Acesse o Neon e verifique se as tabelas foram criadas
2. Verifique se o usuário admin foi criado

### Erro: "Articles not loading"

**Solução**: Verifique a URL do backend:
1. Certifique-se de que a URL do Railway está correta no frontend
2. Verifique se o backend está rodando

## 📊 Monitorar o Deployment

No painel do Railway, você pode:

- **Ver logs**: Clique em "Logs" para ver o output do servidor
- **Reiniciar**: Clique em "Restart" para reiniciar o servidor
- **Ver métricas**: Clique em "Metrics" para ver CPU, memória, etc.

## 🎯 Próximas Etapas

1. ✅ Deploy do backend no Railway
2. ✅ Atualizar URL do backend no frontend
3. ✅ Testar login e CRUD de artigos
4. ✅ Publicar primeiro artigo
5. Adicionar mais funcionalidades conforme necessário

## 📚 Documentação Útil

- [Railway Docs](https://docs.railway.app)
- [Railway GitHub Integration](https://docs.railway.app/guides/github)
- [Railway Environment Variables](https://docs.railway.app/reference/environment-variables)

## 💡 Dicas

- **Logs em tempo real**: Use `railway logs` no terminal para ver logs em tempo real
- **Variáveis de ambiente**: Você pode adicionar/editar variáveis a qualquer momento
- **Redeploy**: Qualquer push para o GitHub fará um novo deploy automaticamente
- **Rollback**: Você pode voltar para um deploy anterior clicando em "Rollback"

---

**Precisa de ajuda?** Consulte a documentação do Railway ou entre em contato com o suporte.
