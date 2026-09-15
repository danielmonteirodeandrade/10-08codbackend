const path = require('path');
const fs = require('fs');

require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const supabase = require('../data/supabase');

async function migrar() {
  try {

    const caminhoJson = path.resolve(__dirname, 'produtos.json'); 

    const dados = fs.readFileSync(caminhoJson, 'utf-8');
    const produtos = JSON.parse(dados);

    const { data, error } = await supabase.from('produtos').insert(produtos);

    if (error) {
      console.error('Erro na migração do Supabase:', error);
    } else {
      console.log('Dados migrados com sucesso para o Supabase!');
    }
  } catch (err) {
    console.error('Erro ao ler o arquivo ou conectar:', err.message);
  }
}

migrar();