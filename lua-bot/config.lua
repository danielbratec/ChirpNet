-- config.lua - Configurações do ChirpNet Lua Bot

local config = {}

config.api_url          = "http://localhost:8080/api"   -- URL do backend Spring Boot
config.bot_token        = "SEU_TOKEN_JWT_AQUI"          -- ← Troque pelo token real
config.bot_username     = "chirpnet_bot"
config.post_interval    = 180                           -- segundos entre posts automáticos (3 minutos)

-- Configurações de comportamento
config.enable_auto_post = true
config.enable_mentions  = true
config.max_content_length = 280

-- Mensagens pré-definidas para posts automáticos
config.random_messages = {
    "🐦 ChirpNet está ficando cada vez melhor com lives e vídeos!",
    "Codando no Neovim no Debian é vida! 💻",
    "Alguém mais ama Lua por aqui? #LuaLang",
    "Hoje tem live nova no ChirpNet! Quem vai assistir?",
    "Inteligência Artificial + Rede Social = futuro 🔥",
    "Memes, vídeos e lives... ChirpNet tem de tudo!",
    "Desenvolvendo ChirpNet com Spring Boot, MAUI e Lua 🚀"
}

return config