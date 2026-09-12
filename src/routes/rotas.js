const express = require('express');
const produtosController = require('../controllers/produtosController.js');
const authController = require('../controllers/authController.js');
const authmiddleware = require('../middleware/authmiddleware.js');
const rotas = express.Router();

rotas.post('/login', authController.login);

rotas.get('/produtos', produtosController.listar);
rotas.get('/produtos/:id', produtosController.buscar);
rotas.post('/produtos', authmiddleware.AutenticarToken, authmiddleware.AutorizarAdmin, produtosController.cadastrar);

module.exports = rotas;