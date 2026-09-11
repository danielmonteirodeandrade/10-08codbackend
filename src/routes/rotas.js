const express = require('express');
const produtosController = require('../controllers/produtosController.js');
const authController = require('../controllers/authController.js');
const autenticarToken = require('../middleware/authmiddleware.js');
const rotas = express.Router();

rotas.post('/login', authController.login);
rotas.post('/a')

rotas.get('/produtos', produtosController.listar);
rotas.get('/produtos/:id', produtosController.buscar);
rotas.post('/produtos', autenticarToken, produtosController.cadastrar);

module.exports = rotas;