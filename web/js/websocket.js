let stompClient = null;

export function connectWebSocket() {
    const socket = new SockJS('http://localhost:8080/ws');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, frame => {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/posts', message => {
            const newPost = JSON.parse(message.body);
            store.posts.unshift(newPost); // Adiciona no topo
            if (store.page === 'timeline') renderPosts();
        });
    });
}
