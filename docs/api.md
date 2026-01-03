# API Reference - ChirpNet

## Base URL
http://localhost:8080/api

## Autenticação
- Todas as rotas protegidas exigem header: `Authorization: Bearer <token>`
- Token obtido via `/auth/login` ou `/auth/register`

### Endpoints de Autenticação

POST /auth/register
```json
{
  "username": "string",
  "password": "string"
}
