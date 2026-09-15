const supabase = require('../data/supabase.js');

function listarProdutos(categoria) {
  let query = supabase.from('produtos').select('*');

  if (categoria) {
    query = query.eq('categoria', categoria);
  }

  return query;
}

function buscarProdutoPorId(id) {
  return supabase
    .from('produtos')
    .select('*')
    .eq('id', id)
    .single();
}

function cadastrarProduto(dadosProduto) {
  return supabase
    .from('produtos')
    .insert([dadosProduto])
    .select();
}

function atualizarProduto(id, dadosAtualizados) {
  return supabase
    .from('produtos')
    .update(dadosAtualizados)
    .eq('id', id)
    .select();
}

function deletarProduto(id) {
  return supabase
    .from('produtos')
    .delete()
    .eq('id', id)
    .select();
}

module.exports = {
  listarProdutos,
  buscarProdutoPorId,
  cadastrarProduto,
  atualizarProduto,
  deletarProduto
};