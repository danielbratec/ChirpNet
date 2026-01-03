# Estrutura do Banco de Dados - ChirpNet

Usamos H2 (em memória/desenvolvimento) e planejamos migrar para PostgreSQL em produção.

## Tabelas principais

1. users
   - id          BIGINT PK AUTO_INCREMENT
   - username    VARCHAR(50) UNIQUE NOT NULL
   - password    VARCHAR(255) NOT NULL          (BCrypt hash)

2. posts
   - id          BIGINT PK AUTO_INCREMENT
   - content     VARCHAR(280) NOT NULL
   - user_id     BIGINT NOT NULL
   - created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   - FK: user_id → users(id)

## Relacionamentos futuros (planejados)

- follows (many-to-many)
  - follower_id    BIGINT
  - following_id   BIGINT
  - PK: (follower_id, following_id)

- likes (many-to-many)
  - user_id     BIGINT
  - post_id     BIGINT
  - PK: (user_id, post_id)

## Comandos úteis H2 (durante desenvolvimento)

Acesse console: http://localhost:8080/h2-console
JDBC URL: jdbc:h2:mem:chirpnet
User: sa
Password: (vazio)

SELECT * FROM users;
SELECT * FROM posts ORDER BY id DESC;
