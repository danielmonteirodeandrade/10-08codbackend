const fs = require('fs');

function lerArquivo() {
  const dados = fs.readFileSync('./dados/produtos.json', 'utf-8');
  return JSON.parse(dados);
}

function gravarArquivo(dados) {
  fs.writeFileSync('./dados/produtos.json', JSON.stringify(dados, null, 2), 'utf-8');
}

module.exports = { lerArquivo, gravarArquivo };