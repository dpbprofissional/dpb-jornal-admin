# DPB Jornal Admin - TODO

## Fase 1: Banco de Dados e Schema
- [x] Configurar conexão com PostgreSQL Neon
- [x] Criar tabela de artigos com campos: id, título, subtítulo, categoria, conteúdo, cover_url, autor, published_at, created_at, updated_at
- [x] Criar tabela de usuários admin com autenticação por senha
- [x] Executar migrations no banco de dados Neon

## Fase 2: Autenticação
- [x] Implementar página de login (/login) com formulário de email/senha
- [x] Implementar hash de senha com bcrypt
- [x] Criar sistema de sessão com JWT ou cookies
- [x] Implementar logout
- [x] Proteger rotas /admin com middleware de autenticação
- [x] Redirecionar para /login ao acessar /admin sem autenticação
- [x] Redirecionar para /admin após login bem-sucedido

## Fase 3: Painel Administrativo
- [x] Criar layout do painel admin
- [x] Implementar listagem de artigos com status, data e ações
- [x] Implementar criar novo artigo
- [x] Implementar editar artigo
- [x] Implementar excluir artigo
- [x] Implementar visualização de artigo
- [x] Adicionar upload de imagem de capa
- [x] Adicionar validação de formulários

## Fase 4: Frontend Público
- [x] Integrar listagem de artigos com dados do banco de dados
- [x] Integrar visualização de artigo individual com dados do banco
- [x] Remover dados estáticos e usar API
- [x] Manter hash routing funcionando

## Fase 5: Testes e Deploy
- [x] Testar fluxo de login/logout
- [x] Testar CRUD de artigos
- [x] Testar proteção de rotas
- [x] Testar frontend público com dados dinâmicos
- [x] Configurar variáveis de ambiente no Netlify
- [x] Fazer deploy no Netlify
- [x] Validar funcionamento em produção

## Fase 6: Deploy do Backend
- [x] Preparar projeto para Railway
- [x] Criar arquivo de instruções de deploy
- [x] Documentar variáveis de ambiente
- [x] Criar guia de setup completo

## Credenciais de Teste
- Email: admin@dpbjornal.com
- Senha: admin123
