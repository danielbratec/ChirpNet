-- utils.lua - Funções auxiliares para o bot

local http = require("socket.http")
local json = require("dkjson")
local ltn12 = require("ltn12")

local utils = {}

-- Função para fazer POST na API do ChirpNet
function utils.postChirp(content)
    local config = require("config")
    
    if #content > config.max_content_length then
        content = content:sub(1, config.max_content_length - 3) .. "..."
    end

    local body = json.encode({ content = content })

    local response_body = {}
    local res, status = http.request{
        url     = config.api_url .. "/posts",
        method  = "POST",
        headers = {
            ["Content-Type"]    = "application/json",
            ["Authorization"]   = "Bearer " .. config.bot_token,
            ["Content-Length"]  = #body
        },
        source  = ltn12.source.string(body),
        sink    = ltn12.sink.table(response_body)
    }

    if status == 200 or status == 201 then
        print("✅ [BOT] Chirp postado com sucesso: " .. content)
        return true
    else
        print("❌ [BOT] Erro ao postar chirp. Status: " .. tostring(status))
        print("Resposta: " .. table.concat(response_body))
        return false
    end
end

-- Função para pegar posts recentes (útil para responder menções no futuro)
function utils.getRecentPosts(limit)
    local config = require("config")
    limit = limit or 10

    local response_body = {}
    local res, status = http.request{
        url = config.api_url .. "/posts?limit=" .. limit,
        method = "GET",
        headers = {
            ["Authorization"] = "Bearer " .. config.bot_token
        },
        sink = ltn12.sink.table(response_body)
    }

    if status == 200 then
        local data = table.concat(response_body)
        local decoded = json.decode(data)
        return decoded or {}
    else
        print("❌ Erro ao buscar posts. Status:", status)
        return {}
    end
end

return utils