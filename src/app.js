const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../.env') 
});

const express = require('express');
const cors = require('cors');
const rotas = require('./backend/routes/rotas.js');

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'frontend/html')));
app.use('/css', express.static(path.join(__dirname, 'frontend/css')));
app.use('/js', express.static(path.join(__dirname, 'frontend/js')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/html/login.html'));
});

app.use('/', rotas);

module.exports = app;