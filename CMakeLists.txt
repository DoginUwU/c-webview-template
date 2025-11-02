cmake_minimum_required(VERSION 3.22)

set(CMAKE_CXX_STANDARD 23)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

project(template VERSION "0.0.1")

option(DEV "Build with dev mode enabled" OFF)

add_executable(backend src/main.cpp)

if(DEV)
    message(STATUS "🧩 Building in DEV mode")
else()
    message(STATUS "📦 Building in PROD mode")

    if(WIN32)
        add_custom_target(vite-build ALL
            COMMAND cmd /c "yarn install && yarn build"
            WORKING_DIRECTORY ${CMAKE_SOURCE_DIR}/web
            COMMENT "Building Vite on Windows"
        )

        set_target_properties(backend PROPERTIES
            WIN32_EXECUTABLE TRUE
        )
    else()
        add_custom_target(vite-build ALL
            COMMAND bash -c "yarn install && yarn build"
            WORKING_DIRECTORY ${CMAKE_SOURCE_DIR}/web
            COMMENT "Building Vite on Unix"
        )
    endif()

endif()

set(INDEX_HTML_H ${CMAKE_SOURCE_DIR}/web/dist/index_html.h)

if(NOT EXISTS ${INDEX_HTML_H})
    file(MAKE_DIRECTORY ${CMAKE_SOURCE_DIR}/web/dist)
    file(WRITE ${INDEX_HTML_H} "// placeholder: run vite-build to regenerate\n")
endif()

target_sources(backend PRIVATE ${INDEX_HTML_H})

target_include_directories(backend PRIVATE ${CMAKE_SOURCE_DIR}/include ${CMAKE_SOURCE_DIR}/web/dist)

target_compile_features(backend PRIVATE cxx_std_23)

set_target_properties(backend PROPERTIES CXX_STANDARD 23)
set_target_properties(backend PROPERTIES CXX_STANDARD_REQUIRED ON)

add_subdirectory(libs/webview)
add_subdirectory(libs/json)

target_link_libraries(backend PRIVATE webview::core nlohmann_json::nlohmann_json)
target_compile_definitions(backend PRIVATE
    $<$<BOOL:${DEV}>:DEV_MODE>
)
