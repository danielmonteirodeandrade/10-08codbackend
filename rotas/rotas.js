const express = require('express');
const router = express.Router();

const { listarProdutos } = require('../funcoes/listarProdutos');
const { buscarProduto } = require('../funcoes/buscarProduto');
const { cadastrarProduto } = require('../funcoes/cadastrarProduto');

// 1. Listar todos e filtro por Query String
router.get('/', (req, res) => {
  const { categoria } = req.query;
  const produtos = listarProdutos(categoria);
  return res.status(200).json(produtos);
});

// 2.Buscar produto por ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const produto = buscarProduto(id);

  if (!produto) {
    return res.status(404).json({ mensagem: 'Produto não encontrado.' });
  }

  return res.status(200).json(produto);
});

// 3. Cadastrar novo produto em req.body
router.post('/', (req, res) => {
  const resultado = cadastrarProduto(req.body);
  return res.status(resultado.status).json(resultado);
});

module.exports = router;