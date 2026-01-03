let page = 0;
const PAGE_SIZE = 10;

export function initTimeline() {
    const container = document.createElement('div');
    container.className = 'container';
    container.innerHTML = `
        <h1>Timeline</h1>
        <textarea id="new-post" placeholder="O que está acontecendo? (max 280 chars)" maxlength="280"></textarea>
        <button onclick="createPost()">Chirpar</button>
        <div id="posts"></div>
    `;
    app.appendChild(container);
    loadPosts();
    window.addEventListener('scroll', handleInfiniteScroll);
}

function handleInfiniteScroll() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        loadPosts(true);
    }
}

async function loadPosts(append = false) {
    try {
        const newPosts = await apiGet(`/posts?page=${page}&size=${PAGE_SIZE}`);
        store.posts = append ? [...store.posts, ...newPosts] : newPosts;
        renderPosts();
        page++;
    } catch (e) {
        console.error(e);
    }
}

function renderPosts() {
    const postsDiv = document.getElementById('posts');
    postsDiv.innerHTML = store.posts.map(p => `
        <div class="post">
            <div class="author">@${p.author.username}</div>
            <div class="content">${p.content}</div>
        </div>
    `).join('');
}

window.createPost = async () => {
    const content = document.getElementById('new-post').value.trim();
    if (!content) return;
    try {
        const post = await apiPost('/posts', { content });
        document.getElementById('new-post').value = '';
        // Broadcast via WebSocket cuidará do update
    } catch (e) {
        alert(e.message);
    }
};
