#include <stdlib.h>
#include <iostream>
#include <nlohmann/json.hpp>
#include <webview/webview.h>

#include "index_html.h"
#include "error.hpp"


#if defined(_WIN32) && !defined(DEV_MODE)
auto WINAPI WinMain(HINSTANCE /*hInst*/, HINSTANCE /*hPrevInst*/,
                   LPSTR /*lpCmdLine*/, int /*nCmdShow*/) -> int {
#else
auto main() -> int {
#endif
    try {
        auto debug = false;
        #ifdef DEV_MODE
            debug = true;
        #endif

        auto wv = webview::webview(debug, nullptr);
        wv.set_title("Basic Template");
        wv.set_size(480, 320, WEBVIEW_HINT_NONE);

        wv.bind("ping", [&](const std::string &arg) -> std::string {
            std::cout << "ping: " << arg << '\n';
            
            nlohmann::json response;
            response["message"] = "pong";
            return response.dump();
        });

        #ifdef DEV_MODE
            wv.navigate("http://localhost:5173");
        #else
            wv.set_html(INDEX_HTML);
        #endif
        
        wv.run();
    } catch (const webview::exception &e) {
        std::cerr << e.what() << '\n';
        return EXIT_FAILURE;
    }

    return EXIT_SUCCESS;
}
