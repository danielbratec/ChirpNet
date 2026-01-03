
#### 2. `endpoints.md`

```markdown
# Endpoints Principais do ChirpNet (resumo)

| Método | Endpoint              | Descrição                          | Autenticação | Status Codes Esperados       |
|--------|-----------------------|------------------------------------|--------------|------------------------------|
| POST   | /api/auth/register    | Cria novo usuário                  | Não         | 200, 400                     |
| POST   | /api/auth/login       | Autentica e retorna JWT            | Não         | 200, 401                     |
| GET    | /api/posts            | Lista todos os posts               | Sim         | 200, 401                     |
| POST   | /api/posts            | Cria um novo post                  | Sim         | 200, 400, 401                |
| GET    | /ws                   | WebSocket para real-time updates   | Sim         | -                            |

Futuros endpoints planejados:
- GET    /api/users/:id          Perfil de usuário
- POST   /api/follows            Seguir usuário
- POST   /api/posts/:id/like     Curtir post
