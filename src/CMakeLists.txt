if(DEV)
    add_executable(backend main.cpp)
else()
    add_executable(backend main.cpp)
    target_sources(backend PRIVATE ${CMAKE_SOURCE_DIR}/web/dist/index_html.h)
endif()

if(WIN32)
    set_target_properties(backend PROPERTIES
        WIN32_EXECUTABLE TRUE
    )
endif()

target_include_directories(backend PRIVATE ${CMAKE_SOURCE_DIR}/include ${CMAKE_SOURCE_DIR}/web/dist)

target_compile_features(backend PRIVATE cxx_std_23)

set_target_properties(backend PROPERTIES CXX_STANDARD 23)
set_target_properties(backend PROPERTIES CXX_STANDARD_REQUIRED ON)

target_link_libraries(backend PRIVATE webview::core)
target_compile_definitions(backend PRIVATE
    $<$<BOOL:${DEV}>:DEV_MODE>
)
