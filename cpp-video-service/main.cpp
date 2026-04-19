#include "crow_all.h"
#include "video_processor.h"
#include <iostream>

int main() {
    crow::SimpleApp app;
    VideoProcessor processor;

    // Rota de teste
    CROW_ROUTE(app, "/")([]() {
        return "ChirpNet C++ Video Service está rodando na porta 8081!";
    });

    // Upload de vídeo (simulado por enquanto)
    CROW_ROUTE(app, "/upload/video").methods(crow::HTTPMethod::POST)([&](const crow::request& req) {
        std::string inputPath = "/tmp/uploaded_video.mp4";
        std::string outputPath = "/tmp/processed_video.mp4";

        if (processor.processUpload(inputPath, outputPath)) {
            processor.generateThumbnail(outputPath, "/tmp/thumb.jpg");
            return crow::response(200, "✅ Vídeo processado com sucesso!");
        }
        return crow::response(500, "❌ Erro ao processar o vídeo");
    });

    // Iniciar Live
    CROW_ROUTE(app, "/live/start/<string>")( [&](std::string streamKey) {
        if (processor.startLiveStream(streamKey)) {
            return crow::response(200, "📹 Live iniciada com chave: " + streamKey);
        }
        return crow::response(500, "❌ Falha ao iniciar live");
    });

    std::cout << "🎥 ChirpNet Video Service rodando na porta 8081...\n";
    app.port(8081).multithreaded().run();

    return 0;
}