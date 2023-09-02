import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { initI18n } from "./core/i18n";
import { RoutePath } from "./core/routes";
import { ErrorPage } from "./pages/error-page";
import { GamePage } from "./pages/game-page";
import { HelpPage } from "./pages/help-page";
import { HighScorePage } from "./pages/high-score-page";
import { HomePage, homePageLoader } from "./pages/home-page";
import { OptionsPage } from "./pages/options-page";
import { RootPage } from "./pages/root-page";

initI18n();

const router = createBrowserRouter([
    {
        path: RoutePath.root,
        element: <RootPage />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: RoutePath.home,
                element: <HomePage />,
                loader: homePageLoader,
            },
            {
                path: RoutePath.game,
                element: <GamePage />,
            },
            {
                path: RoutePath.options,
                element: <OptionsPage />,
            },
            {
                path: RoutePath.highScore,
                element: <HighScorePage />,
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
