const express = require('express');
const rotasprodutos = require('./rotas/rotas.js');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/produtos', rotasprodutos);

module.exports = app;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});