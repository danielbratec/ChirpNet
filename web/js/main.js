import { initAuth } from './auth.js';
import { initTimeline } from './timeline.js';
import { initProfile } from './profile.js';
import { connectWebSocket } from './websocket.js';
import { apiGet, apiPost } from './api.js';

const app = document.getElementById('app');
const store = {
    token: localStorage.getItem('token'),
    user: null,
    posts: [],
    page: 'timeline',
    theme: localStorage.getItem('theme') || 'light',
};

function setTheme(theme) {
    document.body.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
    store.theme = theme;
}

setTheme(store.theme);

// Roteamento simples
const routes = {
    auth: () => initAuth(),
    timeline: () => initTimeline(),
    profile: () => initProfile(),
};

function navigate(page) {
    store.page = page;
    render();
}

function renderNav() {
    return `
        <div id="nav">
            <button onclick="navigate('timeline')">Timeline</button>
            <button onclick="navigate('profile')">Perfil</button>
            <button id="theme-toggle" onclick="toggleTheme()">${store.theme === 'light' ? '🌙' : '☀️'}</button>
        </div>
    `;
}

window.toggleTheme = () => setTheme(store.theme === 'light' ? 'dark' : 'light');

async function render() {
    app.innerHTML = '';
    if (!store.token) {
        routes.auth();
    } else {
        if (!store.user) {
            try {
                store.user = await apiGet('/api/auth/me'); // Assuma endpoint novo no backend para user info
            } catch (e) {
                localStorage.removeItem('token');
                navigate('auth');
            }
        }
        app.innerHTML = renderNav();
        routes[store.page]();
    }
}

if (store.token) {
    connectWebSocket(); // Conecta WebSocket se logado
}

render();

window.navigate = navigate; // Global para onclick
