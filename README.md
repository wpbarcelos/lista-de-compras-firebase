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

## Usando no React Native (Expo)

- **`produtos.ts`**: copie sem alterações.
- **`firebase.ts`**: troque `import.meta.env.VITE_...` por `process.env.EXPO_PUBLIC_...` (e no `.env`, o prefixo `VITE_` por `EXPO_PUBLIC_`).
- **`main.ts` e `style.css`**: são só da versão web. No app, a tela é feita com componentes (`FlatList`, `TextInput`, `Switch`...).

A conexão começa sozinha na primeira vez que o `firebase.ts` é importado. Não é preciso chamar nada no `App.tsx`.

### ⚠️ Salvaguarda contra inicialização duplicada

No Expo, o recarregamento rápido (Fast Refresh) pode executar o `firebase.ts` de novo e causar o erro:

```
FirebaseError: Firebase App named '[DEFAULT]' already exists
```

Para evitar, só inicialize o Firebase se ele ainda não tiver sido iniciado:

```ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig); // primeira vez: cria
} else {
  app = getApp(); // já existe: reaproveita
}

export const db = getFirestore(app);
```
