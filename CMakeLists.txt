cmake_minimum_required(VERSION 3.22)

set(CMAKE_CXX_STANDARD 23)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

project(template VERSION "0.0.1")

add_subdirectory(libs/webview)
add_subdirectory(libs/json)

option(DEV "Build with dev mode enabled" OFF)

if(DEV)
    message(STATUS "🧩 Building in DEV mode")
else()
    message(STATUS "📦 Building in PROD mode")

    if(WIN32)
        add_custom_target(vite-build ALL
            COMMAND cmd /c "yarn install && yarn build --mode production && yarn postbuild"
            WORKING_DIRECTORY ${CMAKE_SOURCE_DIR}/web
            COMMENT "Building Vite on Windows"
        )
    else()
        add_custom_target(vite-build ALL
            COMMAND bash -c "yarn install && yarn build --mode production && yarn postbuild"
            WORKING_DIRECTORY ${CMAKE_SOURCE_DIR}/web
            COMMENT "Building Vite on Unix"
        )
    endif()
endif()

add_subdirectory(src)
