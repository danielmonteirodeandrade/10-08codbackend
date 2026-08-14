const produtosServico = require('../servicos/produtosServico');

function listar(req, res) {
  const { categoria } = req.query;
  const produtos = produtosServico.listarProdutos(categoria);
  return res.status(200).json(produtos);
}

function buscar(req, res) {
  const { id } = req.params;
  const produto = produtosServico.buscarProdutoPorId(id);

  if (!produto) {
    return res.status(404).json({ mensagem: 'Produto não encontrado.' });
  }

  return res.status(200).json(produto);
}

function cadastrar(req, res) {
  const { id, nome, preco, categoria, estoque } = req.body;

  if (!id || !nome || preco === undefined || !categoria || estoque === undefined) {
    return res.status(400).json({
      mensagem: 'Todos os campos (id, nome, preco, categoria, estoque) são obrigatórios.'
    });
  }

  const resultado = produtosServico.cadastrarProduto({ id, nome, preco, categoria, estoque });

  if (resultado.erro) {
    return res.status(400).json({ mensagem: resultado.erro });
  }

  return res.status(201).json({
    mensagem: 'Produto cadastrado com sucesso!',
    produto: resultado.produto
  });
}

module.exports = {
  listar,
  buscar,
  cadastrar
};