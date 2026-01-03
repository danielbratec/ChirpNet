const API_URL = 'http://localhost:8080/api';

export async function apiPost(endpoint, body) {
    const res = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${store.token}`
        },
        body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
}

export async function apiGet(endpoint) {
    const res = await fetch(`${API_URL}${endpoint}`, {
        headers: { 'Authorization': `Bearer ${store.token}` }
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
}
