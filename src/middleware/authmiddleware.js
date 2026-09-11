const jwt = require('jsonwebtoken');
const chave_secreta = 'chave-loja-api-informatica'

function AutenticarToken (req, res, next){
const authHeader = req.headers['authorization']

if (!authHeader || !authHeader.startsWith('Bearer ')) {
return res.status(401).json({ error: 'Token não fornecido' });
}

const token = authHeader.split('')[1];

} 

try {
const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.usuario = decoded;
next();
} catch (err) {
return res.status(401).json({ error: 'Token inválido ou expirado' });
};

function autorizarAdmin (req, res, next){
    if (!req.usuario || req.usuario.role !== 'admin') {
    return res.status(403).json({ error: 'Acesso negado. Apenas administradores podem realizar esta operação.' });
  }
  next();
}

module.exports = AutenticarToken, autorizarAdmin, chave_secreta;