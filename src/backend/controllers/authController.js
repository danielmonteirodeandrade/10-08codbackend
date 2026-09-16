const jwt = require('jsonwebtoken');
const { chave_secreta } = require('../middleware/authmiddleware.js');

function login (req, res){
const {username, password} = req.body;


if (username === 'admin' && password === '1234') {
    const token = jwt.sign({username, role: 'admin'}, chave_secreta, {expiresIn: '1h'});
    return res.status(200).json({
        sucesso: true,
        mensagem: 'Login realizado.',
        token
    });
}

return res.status(401).json({
    sucesso: false,
    mensagem: 'Usuário ou senha incorretos.'
});
}

module.exports = {login};