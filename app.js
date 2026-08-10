const express = require('express');
const rotasEstoque = require('./rotas');
const app = express();

app.use(express.json());
app.use('/estoque', rotasEstoque);

module.exports = app;