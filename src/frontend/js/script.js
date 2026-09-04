const API_URL = 'http://localhost:3000/produtos';
const $ = (id) => document.getElementById(id);

// Ações dos botões da tela
$('btn-form-toggle').onclick = () => $('section-forms').classList.toggle('hidden');
$('btn-listar').onclick = () => ($('section-listagem').classList.remove('hidden'), buscarProdutos());
$('btn-atualizar').onclick = () => ($('section-listagem').classList.remove('hidden'), buscarProdutos());

// GET: Busca e renderiza a lista no DOM
async function buscarProdutos() {
  try {
    const res = await fetch(API_URL);
    const produtos = await res.json();

    $('lista-produtos').innerHTML = produtos.length ? produtos.map(p => `
      <div class="item-produto">
        <h3>#${p.id} - ${p.nome}</h3>
        <p><strong>Preço:</strong> R$ ${Number(p.preco).toFixed(2)}</p>
        <p><strong>Categoria:</strong> ${p.categoria}</p>
        <p><strong>Estoque:</strong> ${p.estoque} un</p>
      </div>
    `).join('') : '<p>Nenhum produto cadastrado.</p>';
  } catch (err) {
    $('lista-produtos').innerHTML = '<p style="color:red">Erro ao carregar produtos.</p>';
  }
}

// POST: Envia os dados para a API
$('produto').onsubmit = async (e) => {
  e.preventDefault();

  const body = {
    id: Number($('id').value),
    nome: $('nome').value.trim(),
    preco: Number($('preco').value.replace(',', '.')),
    categoria: $('categoria').value.trim(),
    estoque: Number($('estoque').value)
  };

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const data = await res.json();

    alert(data.mensagem);
    if (res.ok) {
      $('produto').reset();
      $('section-forms').classList.add('hidden');
      $('section-listagem').classList.remove('hidden');
      buscarProdutos();
    }
  } catch (err) {
    alert('Erro de conexão com o servidor.');
  }
};