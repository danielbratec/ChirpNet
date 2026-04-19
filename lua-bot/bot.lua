#!/usr/bin/env lua5.4

print("========================================")
print("🚀 ChirpNet Lua Bot - Iniciado")
print("========================================")

local config = require("config")
local utils  = require("utils")
local socket = require("socket")

print("Bot configurado:")
print("   API URL: " .. config.api_url)
print("   Username: " .. config.bot_username)
print("   Intervalo: " .. config.post_interval .. " segundos\n")

local counter = 0

-- Loop principal do bot
while true do
    counter = counter + 1
    print(string.format("[%s] Ciclo #%d rodando...", os.date("%H:%M:%S"), counter))

    -- Postagem automática aleatória
    if config.enable_auto_post and math.random(1, 3) == 1 then
        local random_msg = config.random_messages[math.random(#config.random_messages)]
        utils.postChirp(random_msg)
    end

    -- Verificar menções (futuro)
    if config.enable_mentions then
        print("🔍 Verificando menções...")
        -- utils.getRecentPosts(5)  -- pode ser usado para responder menções
    end

    print("⏳ Aguardando " .. config.post_interval .. " segundos...\n")

    -- Espera entre ciclos
    socket.sleep(config.post_interval)
end
