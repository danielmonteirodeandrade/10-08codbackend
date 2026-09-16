const API_URL = 'http://localhost:3000/produtos';

document.addEventListener('DOMContentLoaded', () => {
  const token = sessionStorage.getItem('token');
  const usuarioLogado = sessionStorage.getItem('usuario');

  // Redireciona para o login caso não haja token na sessão
  if (!token) {
    window.location.href = 'login.html';
    return;
  }

  const elUsuario = document.getElementById('usuario-logado');
  if (elUsuario) {
    elUsuario.textContent = usuarioLogado || 'admin';
  }

  // Lógica de Logout
  const btnLogout = document.getElementById('btn-logout');
  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('usuario');
      window.location.href = 'login.html';
    });
  }

  // Lógica de Cadastro do Produto
  const formProduto = document.getElementById('form-produto');
  const btnCadastrar = document.getElementById('btn-cadastrar');

  if (formProduto) {
    formProduto.addEventListener('submit', async (event) => {
      event.preventDefault();

      if (btnCadastrar) {
        btnCadastrar.disabled = true;
        btnCadastrar.textContent = 'Cadastrando...';
      }

      const novoProduto = {
        id: Number(document.getElementById('id').value),
        nome: document.getElementById('nome').value,
        preco: Number(document.getElementById('preco').value),
        categoria: document.getElementById('categoria').value,
        estoque: Number(document.getElementById('estoque').value)
      };

      try {
        const resposta = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(novoProduto)
        });

        const resultado = await resposta.json();

        if (!resposta.ok) {
          alert(resultado.mensagem || resultado.erro || 'Erro ao cadastrar produto.');
          return;
        }

        alert('Produto cadastrado com sucesso!');
        formProduto.reset();
        carregarProdutos();
      } catch (erro) {
        console.error(erro);
        alert('Erro de conexão com o servidor.');
      } finally {
        if (btnCadastrar) {
          btnCadastrar.disabled = false;
          btnCadastrar.textContent = 'Cadastrar Produto';
        }
      }
    });
  }

  // Lógica da Barra de Pesquisa por ID
  const formBusca = document.getElementById('form-busca');
  if (formBusca) {
    formBusca.addEventListener('submit', (event) => {
      event.preventDefault();
      buscarProdutoPorId();
    });
  }

  carregarProdutos();
});

// Buscar Produto por ID
async function buscarProdutoPorId() {
  const inputBusca = document.getElementById('busca-id');
  if (!inputBusca) return;

  const id = inputBusca.value.trim();

  if (!id) {
    carregarProdutos();
    return;
  }

  try {
    const resposta = await fetch(`${API_URL}/${id}`);
    const produto = await resposta.json();

    if (!resposta.ok) {
      const listaProdutos = document.getElementById('lista-produtos');
      if (listaProdutos) {
        listaProdutos.innerHTML = `<p>${produto.mensagem || 'Produto não encontrado.'}</p>`;
      }
      return;
    }

    exibirProdutos([produto]);
  } catch (erro) {
    console.error('Erro ao buscar produto por ID:', erro);
    alert('Erro de conexão com o servidor.');
  }
}

// Buscar e Renderizar Produtos
async function carregarProdutos() {
  const listaProdutos = document.getElementById('lista-produtos');
  if (!listaProdutos) return;

  try {
    const resposta = await fetch(API_URL);
    if (!resposta.ok) throw new Error('Erro ao obter produtos.');

    const produtos = await resposta.json();
    exibirProdutos(produtos);
  } catch (erro) {
    console.error('Erro ao buscar produtos:', erro);
    listaProdutos.innerHTML = '<p>Erro ao carregar produtos.</p>';
  }
}

function exibirProdutos(produtos) {
  const listaProdutos = document.getElementById('lista-produtos');
  if (!listaProdutos) return;

  listaProdutos.innerHTML = '';

  if (!Array.isArray(produtos) || produtos.length === 0) {
    listaProdutos.innerHTML = '<p>Nenhum produto cadastrado.</p>';
    return;
  }

  produtos.forEach((produto) => {
    const card = document.createElement('div');
    card.classList.add('item-produto');
    card.innerHTML = `
      <h3>${produto.nome}</h3>
      <p><strong>ID:</strong> ${produto.id}</p>
      <p><strong>Categoria:</strong> ${produto.categoria}</p>
      <p><strong>Estoque:</strong> ${produto.estoque} un.</p>
      <p class="preco">R$ ${Number(produto.preco).toFixed(2)}</p>
    `;
    listaProdutos.appendChild(card);
  });
}