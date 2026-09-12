
const API_BASE_URL = 'http://localhost:3000';
const API_URL = `${API_BASE_URL}/produtos`;
const LOGIN_URL = `${API_BASE_URL}/login`;

const formLogin = document.getElementById('form-login');
const formProduto = document.getElementById('form-produto');
const listaProdutos = document.getElementById('lista-produtos');

const cardLogin = document.getElementById('card-login');
const cardSessao = document.getElementById('card-sessao');
const cardCadastro = document.getElementById('card-cadastro');
const btnLogout = document.getElementById('btn-logout');

// Alternar exibição utilizando a classe CSS .oculto
function atualizarInterfaceSessao() {
  const token = localStorage.getItem('token');

  if (token) {
    cardLogin.classList.add('oculto');
    cardSessao.classList.remove('oculto');
    cardCadastro.classList.remove('oculto');
  } else {
    cardLogin.classList.remove('oculto');
    cardSessao.classList.add('oculto');
    cardCadastro.classList.add('oculto');
  }
}

// 1. Processar Login (POST /login)
formLogin.addEventListener('submit', async (event) => {
  event.preventDefault();

  const usernameInput = document.getElementById('username').value;
  const passwordInput = document.getElementById('password').value;

  try {
    const resposta = await fetch(LOGIN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: usernameInput, password: passwordInput })
    });

    const resultado = await resposta.json();

    if (!resposta.ok) {
      alert(resultado.mensagem || resultado.error || 'Falha na autenticação.');
      return;
    }

    localStorage.setItem('token', resultado.token);

    document.getElementById('usuario-logado').textContent = usernameInput;

    formLogin.reset();
    atualizarInterfaceSessao();
  } catch (erro) {
    console.error(erro);
    alert('Erro ao realizar login.');
  }
});

// 2. Encerrar Sessão
btnLogout.addEventListener('click', () => {
  localStorage.removeItem('token');
  atualizarInterfaceSessao();
});

// 3. Buscar Produtos (GET /produtos - Público)
async function carregarProdutos() {
  try {
    const resposta = await fetch(API_URL);
    if (!resposta.ok) throw new Error('Erro ao obter a lista de produtos.');

    const produtos = await resposta.json();
    exibirProdutos(produtos);
  } catch (erro) {
    console.error(erro);
    listaProdutos.innerHTML = '<p>Erro ao carregar produtos.</p>';
  }
}

function exibirProdutos(produtos) {
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

// 4. Cadastrar Produto (POST /produtos - Protegido por Token e Admin)
formProduto.addEventListener('submit', async (event) => {
  event.preventDefault();

  const token = localStorage.getItem('token');
  if (!token) {
    alert('Você precisa estar autenticado para cadastrar produtos.');
    return;
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
      alert(resultado.mensagem || resultado.error || 'Erro ao cadastrar produto.');
      return;
    }

    alert('Produto cadastrado com sucesso!');
    formProduto.reset();
    carregarProdutos();
  } catch (erro) {
    console.error(erro);
    alert('Erro de conexão com o servidor.');
  }
});

// Inicialização
atualizarInterfaceSessao();
carregarProdutos();