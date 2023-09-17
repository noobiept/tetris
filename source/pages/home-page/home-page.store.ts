import { RoutePath } from "../../core/routes";

export type HomeNavigationState = number;

type NextPositionAction = {
    type: "next-position";
};

type PreviousPositionAction = {
    type: "previous-position";
};

export type HomeNavigationAction = NextPositionAction | PreviousPositionAction;

export const items = [
    {
        translationKey: "home.start",
        path: RoutePath.game,
    },
    {
        translationKey: "home.options",
        path: RoutePath.options,
    },
    {
        translationKey: "home.high-score",
        path: RoutePath.highScore,
    },
    {
        translationKey: "home.help",
        path: RoutePath.help,
    },
];

export function homeNavigationReducer(
    state: HomeNavigationState,
    action: HomeNavigationAction
) {
    switch (action.type) {
        case "next-position":
            return (state + 1) % items.length;

        case "previous-position":
            return (state - 1 + items.length) % items.length;
    }
}
