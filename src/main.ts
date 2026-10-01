// Interface web (DOM). No React Native esta parte é substituída por componentes.
import "./style.css";
import {
  atualizarProduto,
  criarProduto,
  listarProdutos,
  observarProdutos,
  removerProduto,
  type Produto,
} from "./produtos";

const form = document.querySelector<HTMLFormElement>("#form-produto")!;
const inputNome = document.querySelector<HTMLInputElement>("#nome")!;
const ul = document.querySelector<HTMLUListElement>("#lista")!;

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nome = inputNome.value.trim();
  if (!nome) return;
  await criarProduto(nome);
  form.reset();
  inputNome.focus();
});

function renderizar(lista: Produto[]): void {
  ul.innerHTML = "";

  if (lista.length === 0) {
    ul.innerHTML = '<li class="lista-vazia">Nenhum produto na lista.</li>';
    return;
  }

  lista.forEach((produto) => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    if (produto.comprado) li.classList.add("comprado");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = produto.comprado;
    checkbox.addEventListener("change", () =>
      atualizarProduto(produto.id, produto.nome, checkbox.checked),
    );

    const span = document.createElement("span");
    span.className = "nome";
    span.textContent = produto.nome;

    const btnEditar = document.createElement("button");
    btnEditar.className = "btn btn-sm btn-outline-primary";
    btnEditar.textContent = "Editar";
    btnEditar.addEventListener("click", () => {
      const novoNome = prompt("Novo nome:", produto.nome);
      if (novoNome && novoNome.trim()) {
        atualizarProduto(produto.id, novoNome.trim(), produto.comprado);
      }
    });

    const btnExcluir = document.createElement("button");
    btnExcluir.className = "btn btn-sm btn-outline-danger";
    btnExcluir.textContent = "Excluir";
    btnExcluir.addEventListener("click", () => {
      if (confirm(`Excluir "${produto.nome}"?`)) {
        removerProduto(produto.id);
      }
    });

    li.append(checkbox, span, btnEditar, btnExcluir);
    ul.appendChild(li);
  });
}

// Re-renderiza a lista sempre que algo muda no Firestore
observarProdutos(renderizar);

// Expõe as funções no console do navegador para testes
declare global {
  interface Window {
    crud: typeof crud;
  }
}
const crud = {
  criarProduto,
  listarProdutos,
  atualizarProduto,
  removerProduto,
  observarProdutos,
};
window.crud = crud;
