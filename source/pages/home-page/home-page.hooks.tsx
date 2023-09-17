import { useSetAtom } from "jotai";
import { atomWithReducer, useAtomCallback } from "jotai/utils";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import {
    HomeNavigationAction,
    homeNavigationReducer,
    HomeNavigationState,
    items,
} from "./home-page.store";

export const homeNavigationAtom = atomWithReducer<
    HomeNavigationState,
    HomeNavigationAction
>(0, homeNavigationReducer);

export const useHomeNavigation = () => {
    const navigate = useNavigate();
    const dispatch = useSetAtom(homeNavigationAtom);
    const navigateToSelected = useAtomCallback(
        useCallback(
            (get) => {
                const selected = get(homeNavigationAtom);
                navigate(items[selected].path);
            },
            [navigate]
        )
    );
    const handleKeyPress = useCallback(
        (event: KeyboardEvent) => {
            switch (event.code) {
                case "ArrowDown":
                    dispatch({
                        type: "next-position",
                    });
                    break;

                case "ArrowUp":
                    dispatch({
                        type: "previous-position",
                    });
                    break;

                case "Enter":
                    navigateToSelected();
                    break;
            }
        },
        [dispatch, navigateToSelected]
    );

    return {
        handleKeyPress,
    };
};
