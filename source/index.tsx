import * as AppStorage from "./app_storage";
import * as Options from "./options";
import * as MainMenu from "./main_menu";
import * as Game from "./game";
import * as HighScore from "./high_score";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StrictMode } from "react";
import { RootPage } from "./pages/root-page";
import { ErrorPage } from "./pages/error-page";
import { HomePage } from "./pages/home-page";
import { HelpPage } from "./pages/help-page";
import { RoutePath } from "./core/routes";

const router = createBrowserRouter([
    {
        path: RoutePath.root,
        element: <RootPage />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: RoutePath.home,
                element: <HomePage />,
            },
            {
                path: RoutePath.help,
                element: <HelpPage />,
            },
        ],
    },
]);

const root = createRoot(document.getElementById("App")!);
root.render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);

var CANVAS: HTMLCanvasElement;

// TODO
// window.onload = function () {
//     AppStorage.getData(
//         ["tetris_options", "tetris_high_score", "tetris_has_run_before"],
//         initApp
//     );
// };

function initApp(data: AppStorage.StorageData) {
    Options.load(data["tetris_options"]);
    HighScore.load(data["tetris_high_score"]);

    CANVAS = document.getElementById("mainCanvas") as HTMLCanvasElement;
    CANVAS.width = 600; // the width/height may change later on based on the game options
    CANVAS.height = 450;

    createjs.Ticker.timingMode = createjs.Ticker.RAF;

    MainMenu.init();
    Game.init(CANVAS);

    if (!data["tetris_has_run_before"]) {
        AppStorage.setData({ tetris_has_run_before: true });
        MainMenu.open("help");
    } else {
        MainMenu.open("main");
    }
}

/**
 * Resize the canvas to a different width/height value.
 */
export function resizeCanvas(width: number, height: number) {
    CANVAS.width = width;
    CANVAS.height = height;
}
