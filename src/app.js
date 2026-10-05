const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const express = require('express');
const cors = require('cors');
const rotas = require('./backend/routes/rotas.js');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'API online na Vercel!' });
});


app.use('/', rotas);

module.exports = app;