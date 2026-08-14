const { lerArquivo, gravarArquivo } = require('../dados/arquivo');

function listarProdutos(categoria) {
  const produtos = lerArquivo();

  if (categoria) {
    return produtos.filter(
      (p) => p.categoria.toLowerCase() === categoria.toLowerCase()
    );
  }

  return produtos;
}

function buscarProdutoPorId(id) {
  const produtos = lerArquivo();
  return produtos.find((p) => p.id === parseInt(id));
}

function cadastrarProduto(dadosProduto) {
  const { id, nome, preco, categoria, estoque } = dadosProduto;
  const produtos = lerArquivo();

  const idExiste = produtos.some((p) => p.id === parseInt(id));
  if (idExiste) {
    return { erro: `Já existe um produto com o ID ${id}.` };
  }

  const novoProduto = {
    id: parseInt(id),
    nome: nome.trim(),
    preco: parseFloat(preco),
    categoria: categoria.trim(),
    estoque: parseInt(estoque)
  };

  produtos.push(novoProduto);
  gravarArquivo(produtos);

  return { produto: novoProduto };
}

module.exports = {
  listarProdutos,
  buscarProdutoPorId,
  cadastrarProduto
};