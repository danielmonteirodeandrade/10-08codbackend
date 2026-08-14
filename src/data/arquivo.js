const fs = require('fs');
const path = require('path');

const caminhoArquivo = path.join(__dirname, 'produtos.json');

function lerArquivo() {
  if (!fs.existsSync(caminhoArquivo)) {
    return [];
  }

  const dados = fs.readFileSync(caminhoArquivo, 'utf-8');
  return JSON.parse(dados);
}

function gravarArquivo(dados) {
  fs.writeFileSync(caminhoArquivo, JSON.stringify(dados, null, 2), 'utf-8');
}

module.exports = {
  lerArquivo,
  gravarArquivo
};