# 🚀 Railway Deploy - Guia Rápido (5 Minutos)

## ✅ Tudo que você precisa saber em 5 passos

### 1️⃣ Acesse Railway

Abra seu navegador e vá para: **https://railway.app**

### 2️⃣ Faça Login com GitHub

- Clique em "Login"
- Selecione "Login with GitHub"
- Autorize o Railway

### 3️⃣ Crie um Novo Projeto

- Clique em "New Project"
- Selecione "Deploy from GitHub repo"
- Busque por: **dpb-jornal-admin**
- Clique em "Deploy"

**Railway começará o build automaticamente!** ⏳

### 4️⃣ Configure as Variáveis (enquanto está fazendo build)

1. No painel do Railway, clique em **"Variables"**
2. Clique em **"New Variable"**
3. Adicione estas 3 variáveis:

```
DATABASE_URL
postgresql://neondb_owner:npg_gfyQ8XOPlk2U@ep-blue-tree-ac25bi8m-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

```
SESSION_SECRET
4e72526145dbfc18cfe25e43f899991988413043204913d1d054c869eac9c03f
```

```
NODE_ENV
production
```

4. Clique em **"Save"** para cada uma

### 5️⃣ Aguarde o Deploy

- Clique em **"Deployments"**
- Aguarde até ver **"Live"** (pode levar 2-5 minutos)
- Copie a URL do seu backend (será algo como: `https://seu-projeto.up.railway.app`)

## ✅ Pronto! Seu Backend está Online!

## 🧪 Testar o Sistema

### Acessar o Painel Admin

```
URL: https://ephemeral-dango-5d4f6b.netlify.app/login
Email: admin@dpbjornal.com
Senha: admin123
```

### Criar um Artigo

1. Faça login
2. Clique em "Novo Artigo"
3. Preencha:
   - Título: "Meu Primeiro Artigo"
   - Subtítulo: "Descrição breve"
   - Categoria: "Investigação"
   - Conteúdo: "Seu conteúdo aqui..."
   - Cover URL: "https://via.placeholder.com/600x400"
   - Autor: "Seu Nome"
   - Data: Hoje
4. Clique em "Salvar"

### Visualizar no Frontend

Acesse: **https://ephemeral-dango-5d4f6b.netlify.app**

Você deve ver seu artigo na listagem! 🎉

## 🆘 Se Algo Deu Errado

### Erro: "Build failed"
- Clique em "Deployments"
- Clique no deploy com erro
- Verifique os logs vermelhos

### Erro: "Cannot connect to database"
- Verifique se as 3 variáveis foram adicionadas corretamente
- Copie e cole exatamente como está acima

### Erro: "Login failed"
- Verifique se o email e senha estão corretos
- Email: `admin@dpbjornal.com`
- Senha: `admin123`

## 📊 Monitorar seu Backend

No painel do Railway, você pode:

- **Ver logs**: Clique em "Logs" para ver o que está acontecendo
- **Reiniciar**: Clique em "Restart" se algo der errado
- **Ver métricas**: Clique em "Metrics" para ver CPU, memória, etc.

## 🎯 Próximas Etapas

1. ✅ Deploy no Railway (você está aqui!)
2. ✅ Testar login e criar artigos
3. ✅ Publicar seu primeiro artigo
4. Adicionar mais funcionalidades conforme necessário

---

**Dúvidas?** Consulte: https://docs.railway.app
