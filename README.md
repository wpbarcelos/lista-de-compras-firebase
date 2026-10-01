# Lista de Compras · Firebase Firestore

Exemplo de CRUD com **Cloud Firestore** em **TypeScript**, feito para as aulas do CEDTEC.
A lógica do banco (`src/firebase.ts` e `src/produtos.ts`) não depende do navegador e pode ser reaproveitada em React Native / Expo.

## Como rodar

1. Crie um projeto no [Console do Firebase](https://console.firebase.google.com), registre um app **Web** e crie o banco **Firestore** (modo de teste).
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Copie o arquivo de exemplo e preencha com as credenciais do **seu** projeto:
   ```bash
   cp .env.example .env
   ```
4. Rode o projeto e abra http://localhost:5173:
   ```bash
   npm run dev
   ```

## Estrutura

```
src/
├── firebase.ts   ← conexão com o Firebase (lê o .env)
├── produtos.ts   ← CRUD: criar, listar, observar, atualizar, remover
├── main.ts       ← tela web (DOM)
└── style.css     ← estilo
```
