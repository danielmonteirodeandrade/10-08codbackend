const { lerArquivo, gravarArquivo } = require('../dados/arquivo.js');

function cadastrarProduto(dadosProduto) {
  const { id, nome, preco, categoria, estoque } = dadosProduto;

  if (!id || !nome || preco === undefined || !categoria || estoque === undefined) {
    return {
      sucesso: false,
      status: 400,
      mensagem: 'Todos os campos (id, nome, preco, categoria, estoque) são obrigatórios.'
    };
  }

  const produtos = lerArquivo();

  const idExiste = produtos.some((p) => p.id === parseInt(id));
  if (idExiste) {
    return {
      sucesso: false,
      status: 400,
      mensagem: `Já existe um produto com o ID ${id}.`
    };
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

  return {
    sucesso: true,
    status: 201,
    mensagem: 'Produto cadastrado com sucesso!',
    produto: novoProduto
  };
}

// CERTIFIQUE-SE DE EXPORTAR COMO OBJETO:
module.exports = { cadastrarProduto };