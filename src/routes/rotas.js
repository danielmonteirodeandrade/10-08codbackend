const express = require('express');
const produtosControlador = require('../controladores/produtosControlador');

const rotas = express.Router();

rotas.get('/produtos', produtosControlador.listar);
rotas.get('/produtos/:id', produtosControlador.buscar);
rotas.post('/produtos', produtosControlador.cadastrar);

module.exports = rotas;