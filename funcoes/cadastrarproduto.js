function cadastrarproduto(dadosproduto) {
  const produto = lerproduto();
  const { id, nome, preco, quantidade } = dadosproduto;

  if (!id || !nome || preco === undefined || quantidade === undefined) {
    return {
      sucesso: false,
      status: 400,
      mensagem: 'Todos os campos (id, nome, preco, quantidade) são de preenchimento obrigatório.'
    };
  }

  const idJaExiste = produto.some((item) => item.id === parseInt(id));
  if (idJaExiste) {
    return {
      sucesso: false,
      status: 409,
      mensagem: `Erro: Já existe um item no estoque cadastrado com o ID ${id}.`
    };
  }

  const novoproduto = {
    id: parseInt(id),
    nome: nome.trim(),
    preco: parseFloat(preco),
    quantidade: parseInt(quantidade)
  };

  produto.push(novoproduto);
  gravarproduto(produto);

  return {
    sucesso: true,
    status: 201,
    mensagem: 'Item cadastrado no arquivo com sucesso!',
    produto: novoproduto
  };
}

module.exports = {
  cadastrarproduto
};