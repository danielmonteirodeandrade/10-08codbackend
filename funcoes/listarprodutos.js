const { lerArquivo } = require('../dados/arquivo.js');

function listarProdutos(categoria) {
  const produtos = lerArquivo();

  if (categoria) {
    return produtos.filter(
      (p) => p.categoria.toLowerCase() === categoria.toLowerCase()
    );
  }

  return produtos;
}

module.exports = { listarProdutos };