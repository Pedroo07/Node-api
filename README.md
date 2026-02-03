# API Node - Cidades

Uma API simples para gerenciar cidades, construída com Node.js, Express e TypeScript.

## Funcionalidades

- Criar, listar, buscar, atualizar e deletar cidades.

## Tecnologias

- Node.js
- Express
- TypeScript
- Zod (validação)
- Jest (testes)
- ESLint

## Instalação e Execução Local

1. Clone o repositório.
2. Instale as dependências: `npm install`
3. Execute os testes: `npm test`
4. Para desenvolvimento: `npm run dev`
5. Para produção: `npm run build` e `npm start`

## Deploy no Render

1. Faça push do código para um repositório Git (ex.: GitHub).
2. Acesse [Render](https://render.com) e crie uma nova Web Service.
3. Conecte o repositório Git.
4. Configure:
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Adicione variáveis de ambiente se necessário (ex.: PORT é definido automaticamente pelo Render).
6. Deploy!

## Endpoints

- `POST /cities` - Criar cidade
- `GET /cities` - Listar cidades
- `GET /cities/:id` - Buscar cidade por ID
- `PUT /cities/:id` - Atualizar cidade
- `DELETE /cities/:id` - Deletar cidade

## Testes

Execute `npm test` para rodar os testes com Jest.
