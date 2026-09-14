const LOGIN_URL = 'http://localhost:3000/login';

// Redireciona caso o usuário já esteja autenticado
if (localStorage.getItem('token')) {
  window.location.href = 'index.html';
}

const formLogin = document.getElementById('form-login');

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
      alert(resultado.mensagem || resultado.error || 'Falha na autenticação.');
      return;
    }

    localStorage.setItem('token', resultado.token);
    localStorage.setItem('usuario', usernameInput);
    
    window.location.href = 'index.html';
  } catch (erro) {
    console.error(erro);
    alert('Erro ao realizar login.');
  }
});

// Seleciona o botão de logout
const btnLogout = document.getElementById('btn-logout');

// Função de Logout
function realizarLogout() {
  // Remove o token e os dados da sessão do Local Storage
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');

  // Redireciona o usuário de volta para a tela de login
  window.location.href = 'login.html';
}

// Associa o evento de clique ao botão
if (btnLogout) {
  btnLogout.addEventListener('click', realizarLogout);
}