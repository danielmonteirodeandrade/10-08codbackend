const API_URL = 'http://localhost:3000/produtos';

document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  const usuarioLogado = localStorage.getItem('usuario');

  // Redireciona para o login caso não haja token
  if (!token) {
    window.location.href = 'login.html';
    return;
  }

  // Exibe nome do usuário logado
  const elUsuario = document.getElementById('usuario-logado');
  if (elUsuario) {
    elUsuario.textContent = usuarioLogado || 'admin';
  }

  // Lógica de Logout
  const btnLogout = document.getElementById('btn-logout');
  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      window.location.href = 'login.html';
    });
  }

  // Lógica de Cadastro do Produto (Trata o submit e o feedback do botão juntos)
  const formProduto = document.getElementById('form-produto');
  const btnCadastrar = document.getElementById('btn-cadastrar');

  if (formProduto) {
    formProduto.addEventListener('submit', async (event) => {
      event.preventDefault();

      // Feedback visual no botão
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
          alert(resultado.mensagem || resultado.error || 'Erro ao cadastrar produto.');
          return;
        }

        alert('Produto cadastrado com sucesso!');
        formProduto.reset();
        carregarProdutos(); // Atualiza a lista na tela imediatamente
      } catch (erro) {
        console.error(erro);
        alert('Erro de conexão com o servidor.');
      } finally {
        // Restaura o botão ao estado original
        if (btnCadastrar) {
          btnCadastrar.disabled = false;
          btnCadastrar.textContent = 'Cadastrar Produto';
        }
      }
    });
  }

  // Carrega a listagem de produtos ao iniciar a página
  carregarProdutos();
});

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