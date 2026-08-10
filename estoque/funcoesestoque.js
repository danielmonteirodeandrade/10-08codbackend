const fs = require('fs');

function lerEstoque() {
  const arquivo = fs.readFileSync('./estoque/estoque.json', 'utf-8');
  return JSON.parse(arquivo);
}

function gravarEstoque(estoque) {
  fs.writeFileSync('./estoque/estoque.json', JSON.stringify(estoque, null, 2), 'utf-8');
}

function cadastrarEstoque(dadosEstoque) {
  const estoque = lerEstoque();
  const { id, nome, preco, quantidade } = dadosEstoque;

  if (!id || !nome || preco === undefined || quantidade === undefined) {
    return {
      sucesso: false,
      status: 400,
      mensagem: 'Todos os campos (id, nome, preco, quantidade) são de preenchimento obrigatório.'
    };
  }

  const idJaExiste = estoque.some((item) => item.id === parseInt(id));
  if (idJaExiste) {
    return {
      sucesso: false,
      status: 409,
      mensagem: `Erro: Já existe um item no estoque cadastrado com o ID ${id}.`
    };
  }

  const novoEstoque = {
    id: parseInt(id),
    nome: nome.trim(),
    preco: parseFloat(preco),
    quantidade: parseInt(quantidade)
  };

  estoque.push(novoEstoque);
  gravarEstoque(estoque);

  return {
    sucesso: true,
    status: 201,
    mensagem: 'Item cadastrado no estoque com sucesso!',
    estoque: novoEstoque
  };
}

module.exports = {
  lerEstoque,
  cadastrarEstoque
};