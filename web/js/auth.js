export function initAuth() {
    app.innerHTML = `
        <div class="container">
            <h1>ChirpNet</h1>
            <input id="username" placeholder="Usuário">
            <input id="password" type="password" placeholder="Senha">
            <button onclick="login()">Entrar</button>
            <button onclick="register()">Cadastrar</button>
        </div>
    `;
}

window.register = async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    try {
        await apiPost('/auth/register', { username, password });
        alert('Cadastrado! Faça login.');
    } catch (e) {
        alert(e.message);
    }
};

window.login = async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    try {
        const data = await apiPost('/auth/login', { username, password });
        store.token = data.token;
        localStorage.setItem('token', store.token);
        connectWebSocket();
        navigate('timeline');
    } catch (e) {
        alert(e.message);
    }
};
