const { lerArquivo } = require('../dados/arquivo');

function buscarProduto(id) {
  const produtos = lerArquivo();
  return produtos.find((p) => p.id === parseInt(id));
}

module.exports = { buscarProduto };