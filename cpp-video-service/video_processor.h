#pragma once
#include <string>

class VideoProcessor {
public:
    bool processUpload(const std::string& inputPath, const std::string& outputPath);
    bool generateThumbnail(const std::string& videoPath, const std::string& thumbPath);
    bool startLiveStream(const std::string& streamKey);
};