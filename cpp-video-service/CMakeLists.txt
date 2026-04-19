cmake_minimum_required(VERSION 3.16)
project(ChirpNetVideoService)

set(CMAKE_CXX_STANDARD 20)
find_packages(Crow REQUIRED)
find_packages(Threads REQUIRED)

add_executable(video_service
    main.cpp
    video_processor.cpp
)

target_link_libraries(video_service
 Crow:Crow
)