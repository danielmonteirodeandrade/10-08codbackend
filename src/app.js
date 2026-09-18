const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../.env') 
});

const express = require('express');
const cors = require('cors');
const rotas = require('./backend/routes/rotas.js');

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use(express.static('./frontend/html'));
app.use('/css', express.static('./frontend/css'));
app.use('/js', express.static('./frontend/js'));


app.use('/', rotas);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;