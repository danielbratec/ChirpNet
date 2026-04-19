#include "video_processor.h"
#include <cstdlib>
#include <iostream>

bool VideoProcessor::processUpload(const std::string& inputPath, const std::string& outputPath) {
    std::string cmd = "ffmpeg -i " + inputPath + 
                      " -vcodec libx264 -crf 23 -preset medium " +
                      "-acodec aac -movflags +faststart " + 
                      outputPath + " -y";

    std::cout << "🔄 Processando vídeo: " << inputPath << std::endl;
    int result = std::system(cmd.c_str());
    return result == 0;
}

bool VideoProcessor::generateThumbnail(const std::string& videoPath, const std::string& thumbPath) {
    std::string cmd = "ffmpeg -i " + videoPath + " -ss 00:00:05 -vframes 1 " + thumbPath + " -y";
    return std::system(cmd.c_str()) == 0;
}

bool VideoProcessor::startLiveStream(const std::string& streamKey) {
    std::cout << "Iniciando live com chave: " << streamKey << std::endl;
    return true;
}