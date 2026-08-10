const express = require('express');
const router = express.Router();
const {
  lerEstoque,
  buscarEstoquePorId,
  cadastrarEstoque,
  atualizarEstoque,
  excluirEstoque
} = require('./estoque/funcoesestoque');

// Listar todos os itens
router.get('/', (req, res) => {
  const estoque = lerEstoque();
  return res.status(200).json(estoque);
});

// Buscar item por ID
router.get('/:id', (req, res) => {
  const resultado = buscarEstoquePorId(req.params.id);
  return res.status(resultado.status).json(resultado);
});

// Cadastrar item
router.post('/', (req, res) => {
  const resultado = cadastrarEstoque(req.body);
  return res.status(resultado.status).json(resultado); 
});

// Atualizar item 
router.put('/:id', (req, res) => {
  const resultado = atualizarEstoque(req.params.id, req.body);
  return res.status(resultado.status).json(resultado);
});

//  Remover item
router.delete('/:id', (req, res) => {
  const resultado = excluirEstoque(req.params.id);
  return res.status(resultado.status).json(resultado);
});

module.exports = router;