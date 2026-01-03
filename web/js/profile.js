export function initProfile() {
    const container = document.createElement('div');
    container.className = 'container';
    container.innerHTML = `
        <h1>Perfil de @${store.user.username}</h1>
        <p>Posts: Carregando...</p>
        <!-- Adicione lista de posts do user, follows, etc -->
    `;
    app.appendChild(container);
    // Carregue dados do perfil via API
}
