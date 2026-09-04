const express = require('express');
const cors = require('cors');
const rotasprodutos = require('./rotas/rotas.js');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use('/produtos', rotasprodutos);

module.exports = app;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});