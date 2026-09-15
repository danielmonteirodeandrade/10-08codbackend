const {listarProdutos, buscarProdutoPorId, cadastrarProduto, atualizarProduto, deletarProduto} = require('../services/produtosServiço.js');

async function listar(req, res) {
  try {
    const { categoria } = req.query;
    const { data, error } = await listarProdutos(categoria);

    if (error) throw error;

    return res.status(200).json(data);
  } catch (erro) {
    return res.status(500).json({ erro: 'Erro ao buscar produtos.', detalhe: erro.message });
  }
}

async function buscar(req, res) {
  try {
    const { id } = req.params;
    const { data, error } = await buscarProdutoPorId(id);

    if (error || !data) {
      return res.status(404).json({ mensagem: 'Produto não encontrado.' });
    }

    return res.status(200).json(data);
  } catch (erro) {
    return res.status(500).json({ erro: 'Erro ao buscar produto.', detalhe: erro.message });
  }
}

async function cadastrar(req, res) {
  try {
    const { id, nome, preco, categoria, estoque } = req.body;

    if (!nome || preco === undefined || !categoria || estoque === undefined) {
      return res.status(400).json({
        mensagem: 'Os campos nome, preco, categoria e estoque são obrigatórios.'
      });
    }

    const { data, error } = await cadastrarProduto({ id, nome, preco, categoria, estoque });

    if (error) throw error;

    return res.status(201).json({
      mensagem: 'Produto cadastrado com sucesso!',
      produto: data[0]
    });
  } catch (erro) {
    return res.status(500).json({ erro: 'Erro ao cadastrar produto.', detalhe: erro.message });
  }
}

async function atualizar(req, res) {
  try {
    const { id } = req.params;
    const { nome, preco, categoria, estoque } = req.body;

    const { data, error } = await atualizarProduto(id, { nome, preco, categoria, estoque });

    if (error) throw error;

    if (!data || data.length === 0) {
      return res.status(404).json({ mensagem: 'Produto não encontrado.' });
    }

    return res.status(200).json({
      mensagem: 'Produto atualizado com sucesso!',
      produto: data[0]
    });
  } catch (erro) {
    return res.status(500).json({ erro: 'Erro ao atualizar produto.', detalhe: erro.message });
  }
}

async function deletar(req, res) {
  try {
    const { id } = req.params;
    const { data, error } = await deletarProduto(id);

    if (error) throw error;

    if (!data || data.length === 0) {
      return res.status(404).json({ mensagem: 'Produto não encontrado para exclusão.' });
    }

    return res.status(200).json({ mensagem: 'Produto excluído com sucesso!' });
  } catch (erro) {
    return res.status(500).json({ erro: 'Erro ao deletar produto.', detalhe: erro.message });
  }
}

module.exports = {
  listar,
  buscar,
  cadastrar,
  atualizar,
  deletar
};