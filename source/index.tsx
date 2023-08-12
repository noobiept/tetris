import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StrictMode } from "react";
import { RootPage } from "./pages/root-page";
import { ErrorPage } from "./pages/error-page";
import { HomePage, homePageLoader } from "./pages/home-page";
import { HelpPage } from "./pages/help-page";
import { RoutePath } from "./core/routes";
import { OptionsPage } from "./pages/options-page";
import { GamePage } from "./pages/game-page";
import { HighScorePage } from "./pages/high-score-page";

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
