// CRUD de produtos no Firestore.
// Este arquivo não usa nada do navegador (DOM), então pode ser copiado
// do jeito que está para um projeto React Native / Expo.
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";

export interface Produto {
  id: string;
  nome: string;
  comprado: boolean;
}

const produtosRef = collection(db, "produtos");
const produtosOrdenados = query(produtosRef, orderBy("criadoEm", "asc"));

// CREATE
export async function criarProduto(nome: string) {
  const ref = await addDoc(produtosRef, {
    nome: nome,
    comprado: false,
    criadoEm: serverTimestamp(), // usado só para ordenar a lista
  });
  return ref.id;
}

// READ (uma vez)
export async function listarProdutos() {
  const snapshot = await getDocs(produtosOrdenados);
  const lista: Produto[] = snapshot.docs.map((d) => ({
    id: d.id,
    nome: d.data().nome,
    comprado: d.data().comprado,
  }));
  return lista;
}

// UPDATE: envia o documento todo (nome e comprado)
export async function atualizarProduto(
  id: string,
  nome: string,
  comprado: boolean,
) {
  await updateDoc(doc(db, "produtos", id), {
    nome: nome,
    comprado: comprado,
  });
}

// DELETE
export async function removerProduto(id: string) {
  await deleteDoc(doc(db, "produtos", id));
}

// READ em tempo real: dispara sempre que a coleção muda.
// Retorna a função que cancela a escuta (use no return do useEffect).
export function observarProdutos(callback: (produtos: Produto[]) => void) {
  return onSnapshot(produtosOrdenados, (snapshot) => {
    const lista: Produto[] = snapshot.docs.map((d) => ({
      id: d.id,
      nome: d.data().nome,
      comprado: d.data().comprado,
    }));
    callback(lista);
  });
}
