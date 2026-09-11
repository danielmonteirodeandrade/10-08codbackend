const express = require('express');
const cors = require('cors');
const rotasprodutos = require('./routes/rotas.js');
const rotas = require('./routes/rotas.js');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


app.use(express.static('./frontend/html'));
app.use('/css', express.static('./frontend/css'));
app.use('/js', express.static('./frontend/js'));

app.use('/', rotas)
app.use('/produtos', rotasprodutos);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;