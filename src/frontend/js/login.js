const LOGIN_URL = 'http://localhost:3000/login';

document.addEventListener('DOMContentLoaded', () => {
  // Se já tiver token de sessão ativo, vai direto para a index
  const token = sessionStorage.getItem('token');
  if (token) {
    window.location.href = 'index.html';
    return;
  }

  const formLogin = document.getElementById('form-login');

  if (formLogin) {
    formLogin.addEventListener('submit', async (event) => {
      event.preventDefault();

      const usernameInput = document.getElementById('username').value;
      const passwordInput = document.getElementById('password').value;

      try {
        const resposta = await fetch(LOGIN_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: usernameInput, password: passwordInput })
        });

        const resultado = await resposta.json();

        if (!resposta.ok) {
          alert(resultado.mensagem || resultado.erro || 'Falha na autenticação.');
          return;
        }

        // Salva na sessão (expira ao fechar a aba/navegador)
        sessionStorage.setItem('token', resultado.token);
        sessionStorage.setItem('usuario', usernameInput);

        window.location.href = 'index.html';
      } catch (erro) {
        console.error(erro);
        alert('Erro ao realizar login.');
      }
    });
  }
});